# Lab 1: Deploy the MCP Servers

## Introduction

In this lab, you create an OCI Resource Manager stack from the workshop package
and run the apply job. Resource Manager creates the OCI networking, API Gateway,
Container Instance, and three MCP server containers.

Estimated Time: 15 minutes

### Objectives

In this lab, you will:

* launch the Resource Manager stack from the Deploy to Oracle Cloud button in
  this lab;
* select the required deployment inputs;
* review the stack configuration;
* run the apply job.

### Prerequisites

Complete the workshop introduction and the Get Started lab. Make sure you can
access an OCI tenancy and a compartment where you can create Resource Manager,
networking, API Gateway, and Container Instance resources.

Your permissions and service limits must also allow the stack's Internet, NAT,
and Service Gateways. Use a new stack for this package. If you have a stack from
an earlier workshop version, clean it up using that stack before starting again;
the updated network and Container Instance settings can require replacement.

## Task 1: Launch the Resource Manager stack

1. Select **Deploy to Oracle Cloud**.

    <style>
    .oci-deploy-button { text-align: center; }
    .oci-deploy-button a { display: inline-block; max-width: 100%; }
    .oci-deploy-button figure { margin: 0; }
    .oci-deploy-button img {
        width: 207px;
        max-width: 100%;
        padding: 0;
        box-shadow: none;
        pointer-events: none;
    }
    </style>

    <div class="oci-deploy-button" markdown="1">

    [![Deploy to Oracle Cloud](../images/deploy-to-oracle-cloud.svg)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https%3A%2F%2Fobjectstorage.ca-toronto-1.oraclecloud.com%2Fn%2Fyzrh1ull1ess%2Fb%2Flivelabs-mcp-container-instances%2Fo%2Freleases%2F1c17ce85f0d36a1a816e7db1426e0c5b2b7412811146c2db5ae5905989f0512c%2Fmcp-servers-on-oci-container-instances-rm.zip "Deploy to Oracle Cloud")

    </div>

2. Confirm Resource Manager opens the **Create stack** page with the workshop
    package loaded from `objectstorage.ca-toronto-1.oraclecloud.com`.

    The ZIP is publicly readable. You do not need a bucket login, and bucket
    listing is disabled.

3. Check the OCI Console region selector before creating the stack. This is
    the region where your lab resources will run. The ZIP and images stay
    hosted in Toronto when you select another deployment region.

## Task 2: Complete stack information

1. On the **Stack information** page:

    * keep the package source selected;
    * choose the compartment where the stack definition should be stored;
    * accept the Oracle terms of use.

    ![Completed stack information page](../images/02-stack-information-complete.png)

2. Select **Next**.

## Task 3: Configure variables

1. On the **Configure variables** page, select the deployment values for your
    tenancy.

    ![Default Resource Manager variables](../images/03-configure-variables-defaults.png)

2. Review the required inputs:

    * **Target compartment**: the compartment where the lab resources will be
      created.
    * **Availability domain**: the availability domain for the Container
      Instance.
    * **Container Instance shape**: one of the shape choices available in the
      form.
    * **Container Instance OCPUs**: prefilled, but editable.
    * **Container Instance memory in GB**: prefilled, but editable.

3. The following screenshot illustrates one shape and size selection:

    * shape: `CI.Standard.E5.Flex`
    * OCPUs: `4`
    * memory: `16` GB

    The form defaults to `CI.Standard.E4.Flex`, 2 OCPUs, and 8 GB. Choose a
    shape available in your selected availability domain and sufficient capacity
    for your tenancy. Terraform checks the selected shape and sizing limits.

    ![Completed Resource Manager variables](../images/04-configure-variables-complete.png)

4. Select **Next**.

## Task 4: Review and create the stack

1. Review the stack configuration.

    ![Review stack configuration](../images/05-review-configuration.png)

2. Select **Run apply**, then select **Create**.

    ![Run apply and create stack](../images/06-run-apply-and-create.png)

3. Confirm Resource Manager starts the apply job.

4. You may now **proceed to the next lab**

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
