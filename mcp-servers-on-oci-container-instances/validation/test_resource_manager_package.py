#!/usr/bin/env python3
"""Tests binding participant deploy buttons to the reviewed ZIP bytes."""

from __future__ import annotations

import tempfile
import unittest
from pathlib import Path
from urllib.parse import quote

import resource_manager_package as package


class DeployLinkContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.workspace = tempfile.TemporaryDirectory()
        self.addCleanup(self.workspace.cleanup)
        self.zip_path = Path(self.workspace.name) / "package.zip"
        self.zip_path.write_bytes(b"reviewed package bytes")
        self.digest = package.sha256_file(self.zip_path)
        self.object_url = (
            "https://objectstorage.ca-toronto-1.oraclecloud.com/n/yzrh1ull1ess/"
            "b/livelabs-mcp-container-instances/o/releases/"
            + self.digest + "/mcp-servers-on-oci-container-instances-rm.zip"
        )
        self.documents = self.documents_for(self.object_url)

    def documents_for(self, object_url: str) -> dict[str, str]:
        button = "https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=" + quote(object_url, safe="")
        return {
            "readme.md": f'<a href="{button}">Deploy</a>',
            "deploy/deploy.md": f'[Deploy]({button} "Deploy to Oracle Cloud")',
        }

    def failures(self) -> list[str]:
        return package.validate_deploy_links(self.zip_path, self.documents)

    def test_encoded_matching_links_to_current_zip_are_accepted(self) -> None:
        self.assertEqual([], self.failures())

    def test_both_matching_links_to_old_zip_are_rejected(self) -> None:
        self.documents = self.documents_for(self.object_url.replace(self.digest, "0" * 64))
        self.assertEqual(2, len(self.failures()))

    def test_changing_package_bytes_invalidates_both_links(self) -> None:
        self.zip_path.write_bytes(b"new package bytes")
        self.assertEqual(2, len(self.failures()))

    def test_one_outdated_link_is_rejected(self) -> None:
        self.documents["readme.md"] = self.documents["readme.md"].replace(self.digest, "0" * 64)
        self.assertEqual(1, len(self.failures()))

    def test_external_package_url_is_rejected(self) -> None:
        self.documents = self.documents_for("https://github.com/example/lab.zip")
        self.assertEqual(2, len(self.failures()))

    def test_other_bucket_is_rejected(self) -> None:
        self.documents = self.documents_for(self.object_url.replace("b/livelabs-mcp-container-instances/", "b/other/"))
        self.assertEqual(2, len(self.failures()))

    def test_missing_button_is_rejected(self) -> None:
        self.documents["deploy/deploy.md"] = "No button"
        self.assertEqual(1, len(self.failures()))

    def test_duplicate_zip_parameter_is_rejected(self) -> None:
        self.documents["readme.md"] = self.documents["readme.md"].replace(
            '">Deploy', '&amp;zipUrl=https%3A%2F%2Fexample.com%2Fother.zip">Deploy'
        )
        self.assertEqual(1, len(self.failures()))


if __name__ == "__main__":
    unittest.main()
