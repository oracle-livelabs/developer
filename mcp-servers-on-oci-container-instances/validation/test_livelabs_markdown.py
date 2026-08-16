#!/usr/bin/env python3
"""Unit tests for the local LiveLabs Markdown validator."""

from __future__ import annotations

import importlib.util
import subprocess
import tempfile
import unittest
from pathlib import Path


VALIDATOR_PATH = Path(__file__).with_name("livelabs_markdown.py")
SPEC = importlib.util.spec_from_file_location("livelabs_markdown", VALIDATOR_PATH)
assert SPEC is not None
assert SPEC.loader is not None
livelabs_markdown = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(livelabs_markdown)


class ImageReferenceValidationTests(unittest.TestCase):
    def test_relative_image_reference_resolves_from_markdown_file(self) -> None:
        with tempfile.TemporaryDirectory() as workspace:
            project_root = Path(workspace)
            module_dir = project_root / "deploy"
            image_dir = project_root / "images"
            module_dir.mkdir()
            image_dir.mkdir()
            (image_dir / "01-create-stack-package.png").write_bytes(b"png")
            markdown_file = module_dir / "deploy.md"
            markdown_file.write_text(
                "![Create stack](../images/01-create-stack-package.png)\n",
                encoding="utf-8",
            )

            original_project_root = livelabs_markdown.PROJECT_ROOT
            livelabs_markdown.PROJECT_ROOT = project_root
            try:
                failures = livelabs_markdown.validate_image_references([markdown_file])
            finally:
                livelabs_markdown.PROJECT_ROOT = original_project_root

            self.assertEqual([], failures)

    def test_missing_relative_image_reference_is_reported(self) -> None:
        with tempfile.TemporaryDirectory() as workspace:
            project_root = Path(workspace)
            module_dir = project_root / "deploy"
            module_dir.mkdir()
            markdown_file = module_dir / "deploy.md"
            markdown_file.write_text(
                "![Missing image](../images/missing.png)\n",
                encoding="utf-8",
            )

            original_project_root = livelabs_markdown.PROJECT_ROOT
            livelabs_markdown.PROJECT_ROOT = project_root
            try:
                failures = livelabs_markdown.validate_image_references([markdown_file])
            finally:
                livelabs_markdown.PROJECT_ROOT = original_project_root

            self.assertEqual(1, len(failures))
            self.assertIn("deploy/deploy.md:1", failures[0])
            self.assertIn("../images/missing.png", failures[0])


class ChangedFileDiscoveryTests(unittest.TestCase):
    def test_untracked_project_markdown_is_included_for_local_validation(self) -> None:
        with tempfile.TemporaryDirectory() as workspace:
            repo_root = Path(workspace)
            project_root = repo_root / "developer" / "mcp"
            module_dir = project_root / "deploy"
            module_dir.mkdir(parents=True)
            markdown_file = module_dir / "deploy.md"
            markdown_file.write_text("# Lab\n", encoding="utf-8")

            subprocess.run(
                ["git", "init"],
                cwd=repo_root,
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
            )
            subprocess.run(
                ["git", "config", "user.email", "test@example.com"],
                cwd=repo_root,
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
            )
            subprocess.run(
                ["git", "config", "user.name", "Validator Test"],
                cwd=repo_root,
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
            )
            subprocess.run(
                ["git", "commit", "--allow-empty", "-m", "init"],
                cwd=repo_root,
                check=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                text=True,
            )

            original_project_root = livelabs_markdown.PROJECT_ROOT
            livelabs_markdown.PROJECT_ROOT = project_root
            try:
                files, failures = livelabs_markdown.changed_markdown_files(
                    repo_root,
                    "HEAD",
                    None,
                )
            finally:
                livelabs_markdown.PROJECT_ROOT = original_project_root

            self.assertEqual([], failures)
            self.assertEqual([markdown_file], files)


if __name__ == "__main__":
    unittest.main()
