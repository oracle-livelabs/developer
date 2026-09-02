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
  for the Terraform / Resource Manager package.
- [resource_manager_package.py](resource_manager_package.py): create and
  validate the tracked Resource Manager zip package from the Terraform root.
