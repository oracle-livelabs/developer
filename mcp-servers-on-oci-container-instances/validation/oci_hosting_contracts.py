#!/usr/bin/env python3
"""Static contracts for the lab's central OCI download sources and routing.

These checks cover the repository's literal, formatted HCL/YAML declarations.
Terraform validates full syntax and provider schemas; live tests prove reachability.
"""

from __future__ import annotations

import re


PUBLISHED_IMAGES = {
    "terraform_mcp_image": "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/terraform-mcp-server@sha256:bd095e2b442a2cb61255fe4db52f9e824f35d307a2044784c95d37a93f18d324",
    "github_mcp_image": "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/github-mcp-server@sha256:a4cbe1568e70a50e44c088c479b0620cfa994d30aaa8ebded048933ea1d9d97b",
    "playwright_mcp_image": "ocir.ca-toronto-1.oci.oraclecloud.com/yzrh1ull1ess/mcp-servers-on-oci-container-instances/playwright-mcp-server@sha256:9befda258ad1b0c940b8f8152383f238057be76e07620d1b04d3b67b53b66822"
}


def named_block(text: str, header: str) -> str:
    """Read a top-level block in the formatted files owned by this repository."""
    match = re.search(rf"^{re.escape(header)}\s*{{\n(.*?)^}}", text, re.MULTILINE | re.DOTALL)
    return match[1] if match else ""


def require_assignment(
    failures: list[str], label: str, block: str, key: str, value: str
) -> None:
    pattern = rf"^\s*{re.escape(key)}\s*=\s*{re.escape(value)}\s*$"
    if not re.search(pattern, block, re.MULTILINE):
        failures.append(f"{label} must set {key} = {value}")


def validate_image_defaults(
    texts: dict[str, str], failures: list[str], filename: str
) -> None:
    text = texts.get(filename, "")
    for name, expected in PUBLISHED_IMAGES.items():
        if filename == "variables.tf":
            block = named_block(text, f'variable "{name}"')
            match = re.search(r'^\s*default\s*=\s*"([^"]+)"\s*$', block, re.MULTILINE)
        else:
            block_match = re.search(
                rf"^  {name}:\n(.*?)(?=^  \w+:|\Z)", text, re.MULTILINE | re.DOTALL
            )
            block = block_match[1] if block_match else ""
            match = re.search(r'^    default:\s*"([^"]+)"\s*$', block, re.MULTILINE)
        if not match or match[1] != expected:
            failures.append(f"{filename}: {name} must use the published OCIR index {expected}")


def validate_hosting_network(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("network.tf", "")
    service = named_block(text, 'data "oci_core_services" "all_services"')
    require_assignment(failures, "regional service filter", service, "name", '"name"')
    require_assignment(
        failures, "regional service filter", service, "values",
        '["^All .* Services In Oracle Services Network$"]',
    )
    require_assignment(failures, "regional service filter", service, "regex", "true")
    if not re.search(
        r"postcondition\s*{\s*condition\s*=\s*length\(self.services\)\s*==\s*1\b",
        service,
    ):
        failures.append("network.tf must require exactly one regional All-services match")

    for kind in ("nat", "service"):
        label = f"oci_core_{kind}_gateway.mcp_lab"
        block = named_block(text, f'resource "oci_core_{kind}_gateway" "mcp_lab"')
        require_assignment(failures, label, block, "compartment_id", "var.compartment_ocid")
        require_assignment(failures, label, block, "vcn_id", "oci_core_vcn.mcp_lab.id")
        if kind == "service":
            require_assignment(
                failures, label, block, "service_id",
                "one(data.oci_core_services.all_services.services).id",
            )
        else:
            require_assignment(failures, label, block, "block_traffic", "false")

    api_routes = named_block(text, 'resource "oci_core_route_table" "mcp_lab"')
    container_routes = named_block(text, 'resource "oci_core_route_table" "container_instance"')
    expected_routes = [
        ("API route table", api_routes, [
            ('"0.0.0.0/0"', '"CIDR_BLOCK"', "oci_core_internet_gateway.mcp_lab.id"),
        ]),
        ("container route table", container_routes, [
            ('"0.0.0.0/0"', '"CIDR_BLOCK"', "oci_core_nat_gateway.mcp_lab.id"),
            ("one(data.oci_core_services.all_services.services).cidr_block",
             '"SERVICE_CIDR_BLOCK"', "oci_core_service_gateway.mcp_lab.id"),
        ]),
    ]
    for label, block, expected in expected_routes:
        routes = re.findall(r"route_rules\s*{([^{}]*)}", block, re.DOTALL)
        actual: set[tuple[str, ...]] = set()
        for route in routes:
            fields = []
            for key in ("destination", "destination_type", "network_entity_id"):
                match = re.search(rf"^\s*{key}\s*=\s*(.*?)\s*$", route, re.MULTILINE)
                fields.append(match[1] if match else "")
            actual.add(tuple(fields))
        if len(routes) != len(expected) or actual != set(expected):
            failures.append(f"{label} must contain only its documented gateway routes")

    for name, route_table, public in [
        ("api_gateway", "mcp_lab", "false"),
        ("container_instance", "container_instance", "true"),
    ]:
        label = f"oci_core_subnet.{name}"
        block = named_block(text, f'resource "oci_core_subnet" "{name}"')
        require_assignment(failures, label, block, "route_table_id", f"oci_core_route_table.{route_table}.id")
        require_assignment(failures, label, block, "prohibit_public_ip_on_vnic", public)
        require_assignment(failures, label, block, "security_list_ids", f"[oci_core_security_list.{name}.id]")


def validate_publisher_separation(texts: dict[str, str], failures: list[str]) -> None:
    for filename, text in texts.items():
        if re.search(r'resource\s+"oci_(?:objectstorage_[^"]+|artifacts_container_repository)"', text):
            failures.append(f"{filename} must not manage publisher bucket or repository resources")
        if re.search(r"\bimage_pull_secrets\b", text):
            failures.append(f"{filename} must not contain image_pull_secrets for public lab images")
