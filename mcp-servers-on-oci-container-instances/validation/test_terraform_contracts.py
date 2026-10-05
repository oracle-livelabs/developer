#!/usr/bin/env python3
"""Regression tests for the lab's OCI image and network contracts."""

from __future__ import annotations

import re
import unittest

import terraform_contracts as contracts


PUBLISHED_IMAGES = {
    "terraform_mcp_image": "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/terraform-mcp-server@sha256:bd095e2b442a2cb61255fe4db52f9e824f35d307a2044784c95d37a93f18d324",
    "github_mcp_image": "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/github-mcp-server@sha256:a4cbe1568e70a50e44c088c479b0620cfa994d30aaa8ebded048933ea1d9d97b",
    "playwright_mcp_image": "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/playwright-mcp-server@sha256:9befda258ad1b0c940b8f8152383f238057be76e07620d1b04d3b67b53b66822"
}


class OciImageContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.texts, failures = contracts.read_texts()
        self.assertEqual([], failures)
        # Positive image fixture also works before the source migration.
        for name, image in PUBLISHED_IMAGES.items():
            self.texts["variables.tf"] = re.sub(
                rf'(variable "{name}"\s*{{.*?default\s*=\s*")[^"]+',
                lambda match: match[1] + image,
                self.texts["variables.tf"],
                flags=re.DOTALL,
            )
            self.texts["schema.yaml"] = re.sub(
                rf'(  {name}:\n.*?default:\s*")[^"]+',
                lambda match: match[1] + image,
                self.texts["schema.yaml"],
                flags=re.DOTALL,
            )

    def failures(self) -> list[str]:
        failures: list[str] = []
        contracts.validate_variables(self.texts, failures)
        contracts.validate_schema(self.texts, failures)
        return failures

    def test_published_images_are_accepted(self) -> None:
        self.assertEqual([], self.failures())

    def test_external_image_is_rejected_even_when_schema_matches(self) -> None:
        image = PUBLISHED_IMAGES["terraform_mcp_image"]
        for filename in ("variables.tf", "schema.yaml"):
            self.texts[filename] = self.texts[filename].replace(
                image, "docker.io/hashicorp/terraform-mcp-server:1.2.0"
            )
        self.assertTrue(any("terraform_mcp_image" in f for f in self.failures()))

    def test_mutable_ocir_tag_is_rejected(self) -> None:
        for filename in ("variables.tf", "schema.yaml"):
            self.texts[filename] = self.texts[filename].replace(
                PUBLISHED_IMAGES["github_mcp_image"],
                PUBLISHED_IMAGES["github_mcp_image"].split("@")[0] + ":v1.9.0",
            )
        self.assertTrue(any("github_mcp_image" in f for f in self.failures()))

    def test_upstream_digest_is_not_the_published_github_index(self) -> None:
        self.texts["variables.tf"] = self.texts["variables.tf"].replace(
            PUBLISHED_IMAGES["github_mcp_image"].split("@")[1],
            "sha256:881b53d6f75f69bdbc1b5b10fc2f1361717c19054143b3a8529fb5c32061a50e",
        )
        self.assertTrue(any("github_mcp_image" in f for f in self.failures()))

    def test_schema_only_drift_is_rejected(self) -> None:
        self.texts["schema.yaml"] = self.texts["schema.yaml"].replace(
            PUBLISHED_IMAGES["playwright_mcp_image"],
            PUBLISHED_IMAGES["github_mcp_image"],
        )
        self.assertTrue(any("playwright_mcp_image" in f for f in self.failures()))


class OciNetworkContractTests(unittest.TestCase):
    def setUp(self) -> None:
        self.texts, failures = contracts.read_texts()
        self.assertEqual([], failures)

    def check_network(self) -> list[str]:
        failures: list[str] = []
        contracts.validate_network(self.texts, failures)
        return failures

    def change_network(self, before: str, after: str) -> None:
        self.assertIn(before, self.texts["network.tf"])
        self.texts["network.tf"] = self.texts["network.tf"].replace(before, after)

    def test_final_network_is_accepted(self) -> None:
        self.assertEqual([], self.check_network())

    def test_missing_service_gateway_is_rejected(self) -> None:
        # Renaming the resource proves the intended route target must exist.
        self.texts["network.tf"] = self.texts["network.tf"].replace(
            'resource "oci_core_service_gateway" "mcp_lab"',
            'resource "oci_core_service_gateway" "wrong_target"',
        )
        self.assertTrue(any("service_gateway" in f for f in self.check_network()))

    def test_container_cannot_reuse_api_route_table(self) -> None:
        self.change_network(
            "route_table_id             = oci_core_route_table.container_instance.id",
            "route_table_id             = oci_core_route_table.mcp_lab.id",
        )
        self.assertTrue(any("container_instance" in f for f in self.check_network()))

    def test_container_default_route_cannot_target_igw(self) -> None:
        self.change_network(
            "network_entity_id = oci_core_nat_gateway.mcp_lab.id",
            "network_entity_id = oci_core_internet_gateway.mcp_lab.id",
        )
        self.assertTrue(self.check_network())

    def test_service_route_requires_service_cidr_type(self) -> None:
        self.change_network('"SERVICE_CIDR_BLOCK"', '"CIDR_BLOCK"')
        self.assertTrue(self.check_network())

    def test_service_selection_must_reject_missing_or_multiple_matches(self) -> None:
        self.change_network("length(self.services) == 1", "length(self.services) >= 0")
        self.assertTrue(any("exactly one" in f for f in self.check_network()))

    def test_public_container_vnic_is_rejected(self) -> None:
        self.texts["container-instance.tf"] = self.texts["container-instance.tf"].replace(
            "is_public_ip_assigned = false", "is_public_ip_assigned = true"
        )
        failures: list[str] = []
        contracts.validate_container_instance(self.texts, failures)
        self.assertTrue(any("is_public_ip_assigned" in f for f in failures))

    def test_backend_ports_cannot_be_opened_to_world(self) -> None:
        self.change_network(
            "source      = local.api_gateway_subnet_cidr_block",
            'source      = "0.0.0.0/0"',
        )
        self.assertTrue(any("ingress" in f for f in self.check_network()))

    def test_container_resource_principals_remain_disabled(self) -> None:
        self.texts["container-instance.tf"] = self.texts["container-instance.tf"].replace(
            "is_resource_principal_disabled = true",
            "is_resource_principal_disabled = false",
            1,
        )
        failures: list[str] = []
        contracts.validate_container_instance(self.texts, failures)
        self.assertTrue(any("resource_principal" in f for f in failures))

    def test_publisher_resources_cannot_enter_participant_stack(self) -> None:
        self.texts["network.tf"] += '\nresource "oci_objectstorage_bucket" "publisher" {}\n'
        failures: list[str] = []
        contracts.validate_no_secret_samples(self.texts, failures)
        self.assertTrue(any("publisher" in f for f in failures))

    def test_registry_credentials_cannot_enter_participant_stack(self) -> None:
        self.texts["container-instance.tf"] += '\nimage_pull_secrets { secret_type = "BASIC" }\n'
        failures: list[str] = []
        contracts.validate_no_secret_samples(self.texts, failures)
        self.assertTrue(any("image_pull_secrets" in f for f in failures))


if __name__ == "__main__":
    unittest.main()
