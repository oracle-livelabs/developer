#!/usr/bin/env python3
"""Create and validate the local OCI Resource Manager Terraform package.

This is a dependency-free validation gate. It intentionally packages only the
approved Terraform/RM root files from files/terraform/ and rejects local state,
plans, tfvars, tooling, caches, docs, and duplicate or stale zip entries.
"""

from __future__ import annotations

import argparse
import hashlib
import re
import sys
import zipfile
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
TERRAFORM_ROOT = PROJECT_ROOT / "files" / "terraform"

APPROVED_ROOT_FILES = [
    "versions.tf",
    "providers.tf",
    "variables.tf",
    "locals.tf",
    "network.tf",
    "container-instance.tf",
    "outputs.tf",
    "schema.yaml",
]

FORBIDDEN_ENTRY_PATTERNS = [
    re.compile(r"(^|/)\.terraform(/|$)"),
    re.compile(r"(^|/)\.terraform\.lock\.hcl$"),
    re.compile(r"(^|/)PLAN\.md$"),
    re.compile(r"(^|/)AGENTS\.md$"),
    re.compile(r"(^|/)docs(/|$)"),
    re.compile(r"(^|/)\.cache(/|$)"),
    re.compile(r"(^|/)\.playwright-mcp(/|$)"),
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

SECRET_PATTERNS = [
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"ghp_[A-Za-z0-9_]{20,}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{20,}"),
    re.compile(r"xox[baprs]-[A-Za-z0-9-]{20,}"),
    re.compile(r"AKIA[0-9A-Z]{16}"),
]


def sha256_bytes(data: bytes) -> str:
    return hashlib.sha256(data).hexdigest()


def sha256_file(path: Path) -> str:
    return sha256_bytes(path.read_bytes())


def relative_to_project(path: Path) -> str:
    try:
        return str(path.relative_to(PROJECT_ROOT))
    except ValueError:
        return str(path)


def validate_source_files() -> list[str]:
    failures: list[str] = []

    if not TERRAFORM_ROOT.is_dir():
        return [f"Missing Terraform root: {relative_to_project(TERRAFORM_ROOT)}"]

    for filename in APPROVED_ROOT_FILES:
        path = TERRAFORM_ROOT / filename
        if not path.is_file():
            failures.append(f"Missing required source file: {relative_to_project(path)}")

    return failures


def create_package(package_path: Path) -> list[str]:
    failures = validate_source_files()
    if failures:
        return failures

    package_path.parent.mkdir(parents=True, exist_ok=True)

    with zipfile.ZipFile(package_path, "w", compression=zipfile.ZIP_DEFLATED) as package:
        for filename in APPROVED_ROOT_FILES:
            source_path = TERRAFORM_ROOT / filename
            package.write(source_path, arcname=filename)

    return []


def validate_entry_name(name: str, failures: list[str]) -> None:
    if name.startswith("/") or name.startswith("\\"):
        failures.append(f"Zip entry must not be absolute: {name}")
    if ".." in Path(name).parts:
        failures.append(f"Zip entry must not contain path traversal: {name}")
    if name.endswith("/"):
        failures.append(f"Zip package must not contain directory entries: {name}")
    if "/" in name or "\\" in name:
        failures.append(f"Zip entry must be at package root, not nested: {name}")

    for pattern in FORBIDDEN_ENTRY_PATTERNS:
        if pattern.search(name):
            failures.append(f"Forbidden package entry: {name}")


def validate_package(package_path: Path) -> list[str]:
    failures: list[str] = []

    if not package_path.is_file():
        return [f"Missing Resource Manager package: {relative_to_project(package_path)}"]

    source_failures = validate_source_files()
    failures.extend(source_failures)
    if source_failures:
        return failures

    try:
        with zipfile.ZipFile(package_path, "r") as package:
            names = package.namelist()
            duplicates = sorted({name for name in names if names.count(name) > 1})
            if duplicates:
                failures.append("Duplicate package entries: " + ", ".join(duplicates))

            for name in names:
                validate_entry_name(name, failures)

            approved_set = set(APPROVED_ROOT_FILES)
            actual_set = set(names)
            if actual_set != approved_set:
                missing = sorted(approved_set - actual_set)
                extra = sorted(actual_set - approved_set)
                if missing:
                    failures.append("Package missing approved root files: " + ", ".join(missing))
                if extra:
                    failures.append("Package contains unapproved entries: " + ", ".join(extra))

            for filename in APPROVED_ROOT_FILES:
                if filename not in actual_set:
                    continue

                packaged_bytes = package.read(filename)
                source_path = TERRAFORM_ROOT / filename
                packaged_hash = sha256_bytes(packaged_bytes)
                source_hash = sha256_file(source_path)
                if packaged_hash != source_hash:
                    failures.append(
                        f"Stale package entry {filename}: package SHA-256 {packaged_hash} "
                        f"does not match source SHA-256 {source_hash}"
                    )

                try:
                    text = packaged_bytes.decode("utf-8")
                except UnicodeDecodeError:
                    failures.append(f"Package entry must be UTF-8 text: {filename}")
                    continue

                for pattern in SECRET_PATTERNS:
                    if pattern.search(text):
                        failures.append(
                            f"Package entry {filename} contains secret-like sample matching {pattern.pattern}"
                        )
    except zipfile.BadZipFile:
        failures.append(f"Package is not a valid zip file: {relative_to_project(package_path)}")

    return failures


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Create and validate the OCI Resource Manager Terraform zip package."
    )
    parser.add_argument(
        "--package",
        required=True,
        type=Path,
        help="Path to the Resource Manager zip package to create or validate.",
    )
    parser.add_argument(
        "--create",
        action="store_true",
        help="Create the package before validating it.",
    )
    return parser.parse_args()


def main() -> int:
    args = parse_args()
    package_path = args.package
    if not package_path.is_absolute():
        package_path = PROJECT_ROOT / package_path

    if args.create:
        create_failures = create_package(package_path)
        if create_failures:
            print("Resource Manager package creation failed:")
            for failure in create_failures:
                print(f"- {failure}")
            return 1

    failures = validate_package(package_path)
    if failures:
        print("Resource Manager package validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print(f"Resource Manager package validation passed: {relative_to_project(package_path)}")
    for filename in APPROVED_ROOT_FILES:
        print(f"- {filename}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
