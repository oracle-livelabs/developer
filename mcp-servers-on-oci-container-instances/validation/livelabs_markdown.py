#!/usr/bin/env python3
"""Validate project Markdown against parent LiveLabs PR checks.

This is a local, dependency-free validation gate for the current project
folder. It mirrors the CI-relevant Markdown checks from the parent repository
without changing the parent workflow.
"""

from __future__ import annotations

import argparse
import re
import subprocess
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
README_BASENAMES = {"readme.md", "skill.md"}

IMAGE_REFERENCE = re.compile(r"!\[[^\]]*\]\(((?:(?:\.\.?)/)*images/[^\"\s\)]+)")

MARKDOWN_HYGIENE_PATTERNS = [
    (re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"), "private key material"),
    (re.compile(r"ghp_[A-Za-z0-9_]{20,}"), "classic GitHub token-like value"),
    (re.compile(r"github_pat_[A-Za-z0-9_]{20,}"), "fine-grained GitHub token-like value"),
    (re.compile(r"xox[baprs]-[A-Za-z0-9-]{20,}"), "Slack token-like value"),
    (re.compile(r"AKIA[0-9A-Z]{16}"), "AWS access-key-like value"),
    (re.compile(r"ocid1\.[A-Za-z0-9_.-]+"), "live OCI OCID-like value"),
    (re.compile(r"/Users/[^)\s`]+"), "local machine path"),
    (re.compile(r"file\+\.vscode-resource"), "local VS Code file URI"),
    (re.compile(r"docs/references/"), "local reference-cache path"),
    (re.compile(r"(^|[^A-Za-z0-9_.-])PLAN\.md([^A-Za-z0-9_.-]|$)"), "local PLAN.md reference"),
    (re.compile(r"dev-to-prod-workflow-main"), "retired local template reference"),
]

FORBIDDEN_TRACKED_PATHS = [
    re.compile(r"(^|/)PLAN\.md$"),
    re.compile(r"(^|/)AGENTS\.md$"),
    re.compile(r"(^|/)docs(/|$)"),
    re.compile(r"(^|/)\.cache(/|$)"),
    re.compile(r"(^|/)\.tools(/|$)"),
    re.compile(r"(^|/)build(/|$)"),
    re.compile(r"(^|/)\.env(\.|$)"),
    re.compile(r"\.tfstate(\.|$)"),
    re.compile(r"\.tfplan$"),
    re.compile(r"\.tfvars(\.json)?$"),
    re.compile(r"\.pem$"),
    re.compile(r"\.key$"),
    re.compile(r"\.p12$"),
    re.compile(r"\.pfx$"),
    re.compile(r"(^|/)id_rsa$"),
    re.compile(r"(^|/)id_ed25519$"),
]


def run_git(repo_root: Path, args: list[str]) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=repo_root,
        check=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


def resolve_repo_root() -> tuple[Path | None, list[str]]:
    result = subprocess.run(
        ["git", "rev-parse", "--show-toplevel"],
        cwd=PROJECT_ROOT,
        check=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )
    if result.returncode != 0:
        return None, [f"Unable to resolve git repository root: {result.stderr.strip()}"]

    return Path(result.stdout.strip()), []


def project_relpath(repo_root: Path) -> str:
    return PROJECT_ROOT.relative_to(repo_root).as_posix()


def repo_relative(repo_root: Path, path: Path) -> str:
    return path.relative_to(repo_root).as_posix()


def project_relative(path: Path) -> str:
    return path.relative_to(PROJECT_ROOT).as_posix()


def path_exists_with_exact_case(path: Path) -> bool:
    if not path.is_file():
        return False

    try:
        return any(child.name == path.name for child in path.parent.iterdir())
    except FileNotFoundError:
        return False


def changed_markdown_files(
    repo_root: Path,
    base_ref: str,
    head_ref: str | None,
) -> tuple[list[Path], list[str]]:
    diff_args = ["diff", "--name-only", "--diff-filter=AM", base_ref]
    if head_ref:
        diff_args.append(head_ref)
    diff_args.extend(["--", "*.md"])

    result = run_git(repo_root, diff_args)
    if result.returncode != 0:
        command = "git " + " ".join(diff_args)
        return [], [f"Unable to determine changed Markdown files with `{command}`: {result.stderr.strip()}"]

    project_prefix = project_relpath(repo_root) + "/"
    files: set[Path] = set()

    for raw_line in result.stdout.splitlines():
        path_text = raw_line.strip()
        if not path_text:
            continue
        if path_text.startswith(".github/") or "/node_modules/" in path_text:
            continue
        if not path_text.startswith(project_prefix):
            continue

        absolute = repo_root / path_text
        if path_exists_with_exact_case(absolute):
            files.add(absolute)

    untracked_result = run_git(
        repo_root,
        ["ls-files", "--others", "--exclude-standard", "--", project_relpath(repo_root)],
    )
    if untracked_result.returncode != 0:
        return [], [f"Unable to determine untracked project files: {untracked_result.stderr.strip()}"]

    for raw_line in untracked_result.stdout.splitlines():
        path_text = raw_line.strip()
        if not path_text or not path_text.endswith(".md"):
            continue
        absolute = repo_root / path_text
        if path_exists_with_exact_case(absolute):
            files.add(absolute)

    return sorted(files), []


def tracked_project_files(repo_root: Path) -> tuple[list[str], list[str]]:
    result = run_git(repo_root, ["ls-files", "--", project_relpath(repo_root)])
    if result.returncode != 0:
        return [], [f"Unable to list tracked project files: {result.stderr.strip()}"]

    return [line.strip() for line in result.stdout.splitlines() if line.strip()], []


def validate_filename_conventions(files: list[Path]) -> list[str]:
    failures: list[str] = []
    for path in files:
        filename = path.name
        if filename != filename.lower():
            failures.append(f"{project_relative(path)}: Markdown filename must be lowercase")
        if any(character.isspace() for character in filename):
            failures.append(f"{project_relative(path)}: Markdown filename must not contain spaces")
    return failures


def validate_image_references(files: list[Path]) -> list[str]:
    failures: list[str] = []
    for path in files:
        text = path.read_text(encoding="utf-8")
        for line_number, line in enumerate(text.splitlines(), start=1):
            for match in IMAGE_REFERENCE.finditer(line):
                image_reference = match.group(1)
                image_path = path.parent / image_reference
                if not image_path.is_file():
                    failures.append(
                        f"{project_relative(path)}:{line_number}: missing image reference {image_reference}"
                    )
    return failures


def validate_markdown_hygiene(files: list[Path]) -> list[str]:
    failures: list[str] = []
    for path in files:
        text = path.read_text(encoding="utf-8")
        for pattern, label in MARKDOWN_HYGIENE_PATTERNS:
            for match in pattern.finditer(text):
                line_number = text.count("\n", 0, match.start()) + 1
                failures.append(f"{project_relative(path)}:{line_number}: contains {label}")
    return failures


def validate_tracked_path_hygiene(repo_root: Path) -> list[str]:
    tracked_files, failures = tracked_project_files(repo_root)
    if failures:
        return failures

    project_prefix = project_relpath(repo_root) + "/"
    path_failures: list[str] = []
    for tracked_file in tracked_files:
        project_path = tracked_file.removeprefix(project_prefix)
        for pattern in FORBIDDEN_TRACKED_PATHS:
            if pattern.search(project_path):
                path_failures.append(f"{project_path}: forbidden local-only tracked path")
                break

    return path_failures


def livelabs_supported_markdown(files: list[Path]) -> list[Path]:
    supported: list[Path] = []
    for path in files:
        if path.name.lower() in README_BASENAMES:
            continue
        if path.suffix.lower() == ".md":
            supported.append(path)
    return supported


def validate_livelabs_content(repo_root: Path, files: list[Path]) -> list[str]:
    supported_files = livelabs_supported_markdown(files)
    if not supported_files:
        return []

    validator = repo_root / ".github" / "scripts" / "validate-livelabs-markdown.sh"
    if not validator.is_file():
        return [f"Missing parent LiveLabs validator: {validator}"]

    result = subprocess.run(
        ["bash", str(validator), *[repo_relative(repo_root, path) for path in supported_files]],
        cwd=repo_root,
        check=False,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
    )
    if result.returncode == 0:
        return []

    output = result.stdout.strip()
    if not output:
        return ["LiveLabs content validation failed with no output."]
    return ["LiveLabs content validation failed:", output]


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Validate changed project Markdown against parent LiveLabs CI checks."
    )
    parser.add_argument(
        "--base-ref",
        default="origin/main",
        help="Base ref used for changed Markdown detection. Default: origin/main.",
    )
    parser.add_argument(
        "--head-ref",
        default=None,
        help=(
            "Optional head ref for changed Markdown detection. "
            "By default the working tree is compared to --base-ref."
        ),
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    repo_root, root_failures = resolve_repo_root()
    if root_failures or repo_root is None:
        print("LiveLabs Markdown validation failed:")
        for failure in root_failures:
            print(f"- {failure}")
        return 1

    changed_files, failures = changed_markdown_files(repo_root, args.base_ref, args.head_ref)
    failures.extend(validate_tracked_path_hygiene(repo_root))

    if changed_files:
        failures.extend(validate_filename_conventions(changed_files))
        failures.extend(validate_image_references(changed_files))
        failures.extend(validate_markdown_hygiene(changed_files))
        failures.extend(validate_livelabs_content(repo_root, changed_files))

    if failures:
        print("LiveLabs Markdown validation failed:")
        for failure in failures:
            for line in str(failure).splitlines():
                print(f"- {line}")
        return 1

    if changed_files:
        print("LiveLabs Markdown validation passed for changed project Markdown:")
        for path in changed_files:
            print(f"- {project_relative(path)}")
    else:
        print("LiveLabs Markdown validation passed: no changed project Markdown files.")

    return 0


if __name__ == "__main__":
    sys.exit(main())
