# Validation

This directory contains repository validation helpers for the LiveLab Terraform
and OCI Resource Manager assets.

Current checks:

- [livelabs_markdown.py](livelabs_markdown.py): local Markdown/LiveLabs CI
  validation for changed and untracked project Markdown files, tracked
  local-only path hygiene, workshop timing consistency, and manifest help email
  metadata. It also checks WMS Self QA manifest order expectations and the
  manifest-linked Markdown files for the rendered LiveLabs QA lint rule that
  requires the second H2 heading to start with `Task`.
- [test_livelabs_markdown.py](test_livelabs_markdown.py): unit tests for the
  local Markdown validator.
- [terraform_contracts.py](terraform_contracts.py): static contract validation
  for the Terraform / Resource Manager package, with OCI image and routing
  checks in [oci_hosting_contracts.py](oci_hosting_contracts.py).
- [test_terraform_contracts.py](test_terraform_contracts.py): regression checks
  for published image digests, schema parity, routing, and publisher separation.
- [resource_manager_package.py](resource_manager_package.py): create and
  validate the tracked Resource Manager zip package from the Terraform root.
  Its `--check-deploy-links` option also requires both deploy buttons to point
  to the OCI object whose name contains the current ZIP's SHA-256.
- [test_resource_manager_package.py](test_resource_manager_package.py): rejects
  missing, external, mismatched, or stale package links, including when both
  buttons point to the same older ZIP.
