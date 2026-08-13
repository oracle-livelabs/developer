#!/usr/bin/env python3
"""Validate the Terraform / Resource Manager contract for this LiveLab.

This is not application runtime code. The LiveLab implementation stack is
Terraform HCL, OCI Resource Manager YAML, and workshop Markdown. This Python
file is intentionally a lightweight stdlib-only validation gate for static repo
contracts that Terraform/RM cannot fully check before live OCI execution.
"""

from __future__ import annotations

import re
import sys
from pathlib import Path


PROJECT_ROOT = Path(__file__).resolve().parents[1]
TERRAFORM_ROOT = PROJECT_ROOT / "files" / "terraform"

REQUIRED_FILES = [
    "versions.tf",
    "providers.tf",
    "variables.tf",
    "locals.tf",
    "network.tf",
    "container-instance.tf",
    "outputs.tf",
    "schema.yaml",
]

REQUIRED_VARIABLES = [
    "region",
    "compartment_ocid",
    "availability_domain",
    "container_shape",
    "container_ocpus",
    "container_memory_in_gbs",
    "terraform_mcp_image",
    "github_mcp_image",
    "playwright_mcp_image",
    "terraform_mcp_port",
    "github_mcp_port",
    "playwright_mcp_port",
]

FORBIDDEN_VARIABLES = [
    "api_private_key",
    "github_mcp_token",
    "github_pat",
    "github_personal_access_token",
    "github_token",
    "hcp_token",
    "oci_private_key",
    "private_key",
    "ssh_private_key",
    "ssh_public_key",
    "tfe_token",
    "tf_api_token",
    "env_file",
]

SECRET_PATTERNS = [
    re.compile(r"-----BEGIN [A-Z ]*PRIVATE KEY-----"),
    re.compile(r"ghp_[A-Za-z0-9_]{20,}"),
    re.compile(r"github_pat_[A-Za-z0-9_]{20,}"),
    re.compile(r"xox[baprs]-[A-Za-z0-9-]{20,}"),
    re.compile(r"AKIA[0-9A-Z]{16}"),
]


def read_texts() -> tuple[dict[str, str], list[str]]:
    failures: list[str] = []
    texts: dict[str, str] = {}

    if not TERRAFORM_ROOT.is_dir():
        failures.append(f"Missing Terraform root: {TERRAFORM_ROOT.relative_to(PROJECT_ROOT)}")
        return texts, failures

    for filename in REQUIRED_FILES:
        path = TERRAFORM_ROOT / filename
        if not path.is_file():
            failures.append(f"Missing required Terraform file: {path.relative_to(PROJECT_ROOT)}")
            continue
        texts[filename] = path.read_text(encoding="utf-8")

    return texts, failures


def require_contains(
    failures: list[str],
    filename: str,
    text: str,
    needle: str,
    message: str | None = None,
) -> None:
    if needle not in text:
        failures.append(message or f"{filename} must contain {needle!r}")


def require_regex(
    failures: list[str],
    filename: str,
    text: str,
    pattern: str,
    message: str | None = None,
) -> None:
    if not re.search(pattern, text, flags=re.MULTILINE | re.DOTALL):
        failures.append(message or f"{filename} must match /{pattern}/")


def validate_versions(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("versions.tf", "")
    require_contains(failures, "versions.tf", text, 'source  = "oracle/oci"')
    require_contains(failures, "versions.tf", text, 'version = "= 8.27.0"')
    require_regex(
        failures,
        "versions.tf",
        text,
        r'required_version\s*=\s*">= 1\.5\.0, < 1\.6\.0"',
        "versions.tf must target OCI Resource Manager Terraform 1.5.x",
    )
    if "hashicorp/oci" in text:
        failures.append("versions.tf must not use legacy provider source hashicorp/oci")


def validate_provider(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("providers.tf", "")
    require_regex(failures, "providers.tf", text, r'provider\s+"oci"\s*{')
    require_contains(
        failures,
        "providers.tf",
        text,
        "region = var.region",
        "providers.tf must use Resource Manager region context via var.region",
    )


def validate_variables(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("variables.tf", "")
    declared = set(re.findall(r'variable\s+"([^"]+)"', text))

    for variable in REQUIRED_VARIABLES:
        if variable not in declared:
            failures.append(f"variables.tf missing variable {variable!r}")

    forbidden_present = sorted(set(FORBIDDEN_VARIABLES) & declared)
    if forbidden_present:
        failures.append(
            "variables.tf must not define secret/key inputs: "
            + ", ".join(forbidden_present)
        )

    for unsafe_name in [
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "GITHUB_PAT_TOKEN",
        "TFE_TOKEN",
        "HCP_TOKEN",
        "OCI_PRIVATE_KEY",
    ]:
        if unsafe_name in text:
            failures.append(f"variables.tf must not mention secret environment name {unsafe_name}")

    require_contains(
        failures,
        "variables.tf",
        text,
        "var.container_ocpus <= 94",
        "variables.tf must enforce the broad documented maximum Container Instance OCPU value",
    )
    require_contains(
        failures,
        "variables.tf",
        text,
        "var.container_memory_in_gbs <= 1504",
        "variables.tf must enforce the broad documented maximum Container Instance memory value",
    )


def validate_locals(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("locals.tf", "")
    require_contains(failures, "locals.tf", text, 'mcp_endpoint_path = "/mcp"')
    require_contains(failures, "locals.tf", text, "available_container_shape_names")
    require_contains(
        failures,
        "locals.tf",
        text,
        "container_instance_shape_collection[0].items",
        "locals.tf must derive available Container Instance shape names from the OCI shape data source",
    )


def validate_schema(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("schema.yaml", "")
    require_contains(failures, "schema.yaml", text, "schemaVersion: 1.1.0")

    for variable in [
        "compartment_ocid:",
        "availability_domain:",
        "container_shape:",
        "container_ocpus:",
        "container_memory_in_gbs:",
    ]:
        require_contains(failures, "schema.yaml", text, variable)

    for allowed_shape in [
        "CI.Standard.E4.Flex",
        "CI.Standard.E5.Flex",
        "CI.Standard.A1.Flex",
    ]:
        require_contains(failures, "schema.yaml", text, allowed_shape)

    require_contains(failures, "schema.yaml", text, "maximum: 94")
    require_contains(failures, "schema.yaml", text, "maximum: 1504")

    forbidden_terms = [
        "oci:core:ssh:publickey",
        "type: password",
        "ssh_public_key",
        "ssh_private_key",
        "github_pat",
        "github_token",
        "github_personal_access_token",
        "tfe_token",
        "hcp_token",
        "private_key",
        "env_file",
    ]
    for term in forbidden_terms:
        if term.lower() in text.lower():
            failures.append(f"schema.yaml must not expose forbidden input {term!r}")


def validate_network(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("network.tf", "")
    for resource_type in [
        "oci_core_vcn",
        "oci_core_subnet",
        "oci_core_internet_gateway",
        "oci_core_route_table",
        "oci_core_security_list",
    ]:
        require_contains(failures, "network.tf", text, f'resource "{resource_type}"')

    require_contains(failures, "network.tf", text, "0.0.0.0/0")
    require_contains(failures, "network.tf", text, "var.terraform_mcp_port")
    require_contains(failures, "network.tf", text, "var.github_mcp_port")
    require_contains(failures, "network.tf", text, "var.playwright_mcp_port")
    require_contains(failures, "network.tf", text, "prohibit_public_ip_on_vnic = false")


def validate_container_instance(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("container-instance.tf", "")

    require_contains(
        failures,
        "container-instance.tf",
        text,
        'data "oci_container_instances_container_instance_shapes"',
    )
    require_contains(
        failures,
        "container-instance.tf",
        text,
        'resource "oci_container_instances_container_instance"',
    )
    require_contains(failures, "container-instance.tf", text, 'data "oci_core_vnic"')
    require_contains(failures, "container-instance.tf", text, "available_container_shape_names")
    require_contains(failures, "container-instance.tf", text, "precondition")
    require_contains(failures, "container-instance.tf", text, "is_public_ip_assigned = true")
    require_contains(failures, "container-instance.tf", text, "var.container_ocpus <= 64")
    require_contains(failures, "container-instance.tf", text, "var.container_ocpus <= 94")
    require_contains(failures, "container-instance.tf", text, "var.container_ocpus <= 76")
    require_contains(failures, "container-instance.tf", text, "min(1024, var.container_ocpus * 64)")
    require_contains(failures, "container-instance.tf", text, "var.container_memory_in_gbs <= 1504")
    require_contains(failures, "container-instance.tf", text, "min(488, var.container_ocpus * 64)")

    container_blocks = len(re.findall(r"(?m)^\s+containers\s+{", text))
    if container_blocks < 3:
        failures.append("container-instance.tf must define at least three containers blocks")

    for expected in [
        "terraform-mcp-server",
        "github-mcp-server",
        "playwright-mcp-server",
        "var.terraform_mcp_image",
        "var.github_mcp_image",
        "var.playwright_mcp_image",
        "TRANSPORT_MODE",
        "streamable-http",
        "ENABLE_TF_OPERATIONS",
        '"false"',
        "--read-only",
        "--base-path",
        "local.mcp_endpoint_path",
        "--allowed-hosts",
        '"*"',
        "--isolated",
        "--headless",
        "--browser",
        "chromium",
    ]:
        require_contains(failures, "container-instance.tf", text, expected)

    for unsafe_name in [
        "GITHUB_PERSONAL_ACCESS_TOKEN",
        "GITHUB_PAT_TOKEN",
        "TFE_TOKEN",
        "HCP_TOKEN",
        "OCI_PRIVATE_KEY",
    ]:
        if unsafe_name in text:
            failures.append(
                f"container-instance.tf must not configure secret environment name {unsafe_name}"
            )


def validate_outputs(texts: dict[str, str], failures: list[str]) -> None:
    text = texts.get("outputs.tf", "")
    for output in [
        "container_instance_public_ip",
        "terraform_mcp_url",
        "github_mcp_url",
        "playwright_mcp_url",
        "available_container_instance_shapes",
        "github_mcp_client_header_note",
    ]:
        require_contains(failures, "outputs.tf", text, f'output "{output}"')

    require_contains(failures, "outputs.tf", text, "local.mcp_endpoint_path")


def validate_no_secret_samples(texts: dict[str, str], failures: list[str]) -> None:
    for filename, text in texts.items():
        for pattern in SECRET_PATTERNS:
            if pattern.search(text):
                failures.append(f"{filename} contains secret-like sample matching {pattern.pattern}")


def main() -> int:
    texts, failures = read_texts()
    if len(texts) == len(REQUIRED_FILES):
        validate_versions(texts, failures)
        validate_provider(texts, failures)
        validate_variables(texts, failures)
        validate_locals(texts, failures)
        validate_schema(texts, failures)
        validate_network(texts, failures)
        validate_container_instance(texts, failures)
        validate_outputs(texts, failures)
        validate_no_secret_samples(texts, failures)

    if failures:
        print("Terraform contract validation failed:")
        for failure in failures:
            print(f"- {failure}")
        return 1

    print("Terraform contract validation passed.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
