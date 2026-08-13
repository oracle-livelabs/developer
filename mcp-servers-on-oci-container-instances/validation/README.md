# Validation

This directory contains local validation gates for the LiveLab repository.

It does not define the runtime implementation language for the solution. The
deployable lab stack is Terraform HCL and OCI Resource Manager YAML. Python is
used here only where a small dependency-free checker is useful before live OCI
Resource Manager execution is available.

Current checks:

- [terraform_contracts.py](terraform_contracts.py): static contract validation
  for the Terraform / Resource Manager package.
- [resource_manager_package.py](resource_manager_package.py): create and
  validate the ignored local Resource Manager zip package from the Terraform
  root.
