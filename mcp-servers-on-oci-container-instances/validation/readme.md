# Validation

This directory contains repository validation helpers for the LiveLab Terraform
and OCI Resource Manager assets.

Current checks:

- [livelabs_markdown.py](livelabs_markdown.py): local Markdown/LiveLabs CI
  validation for changed project Markdown files.
- [terraform_contracts.py](terraform_contracts.py): static contract validation
  for the Terraform / Resource Manager package.
- [resource_manager_package.py](resource_manager_package.py): create and
  validate the tracked Resource Manager zip package from the Terraform root.
