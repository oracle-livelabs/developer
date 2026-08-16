# Lab 1: Deploy the MCP Servers

## Introduction

In this lab, you create an OCI Resource Manager stack from the workshop package
and run the apply job. Resource Manager creates the OCI networking, API Gateway,
Container Instance, and three MCP server containers.

Estimated Time: 25 minutes

### Objectives

In this lab, you will:

* launch the Resource Manager stack from the Deploy to Oracle Cloud button in
  this lab;
* select the required deployment inputs;
* review the stack configuration;
* run the apply job.

## Task 1: Launch the Resource Manager stack

Select **Deploy to Oracle Cloud**.

[![Deploy to Oracle Cloud](../images/deploy-to-oracle-cloud-centered.svg)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/Phirlly/developer/raw/dev/mcp-servers-on-oci-container-instances/files/resource-manager/mcp-servers-on-oci-container-instances-rm.zip)

![Deploy to Oracle Cloud button](../images/01-create-stack-package.png)

Resource Manager opens the **Create stack** page with the workshop package
loaded.

## Task 2: Complete stack information

On the **Stack information** page:

* keep the package source selected;
* choose the compartment where the stack definition should be stored;
* accept the Oracle terms of use;
* select **Next**.

![Completed stack information page](../images/02-stack-information-complete.png)

## Task 3: Configure variables

On the **Configure variables** page, select the deployment values for your
tenancy.

![Default Resource Manager variables](../images/03-configure-variables-defaults.png)

Required inputs:

* **Target compartment**: the compartment where the lab resources will be
  created.
* **Availability domain**: the availability domain for the Container Instance.
* **Container Instance shape**: one of the shape choices available in the form.
* **Container Instance OCPUs**: prefilled, but editable.
* **Container Instance memory in GB**: prefilled, but editable.

For the validated workshop run, the values were:

* shape: `CI.Standard.E5.Flex`
* OCPUs: `4`
* memory: `16` GB

You may use a different available shape or size if your tenancy requires it.

![Completed Resource Manager variables](../images/04-configure-variables-complete.png)

Select **Next**.

## Task 4: Review and create the stack

Review the stack configuration.

![Review stack configuration](../images/05-review-configuration.png)

Select **Run apply**, then select **Create**.

![Run apply and create stack](../images/06-run-apply-and-create.png)

Resource Manager starts the apply job.

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
