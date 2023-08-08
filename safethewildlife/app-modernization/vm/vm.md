# Initial App Deployment - Virtual Machines

## Introduction

[Terraform](https://www.terraform.io/) is an Open Source tool to deploy resources in the cloud using code. This method is typically referred to as Infrastructure as Code (IaC). Terraform configuration is declarative; you simply define what you want in the Oracle Cloud and it ensures the resources are created to your specifications.

[Ansible](https://www.ansible.com/) is an Open Source tool that provides automation in software deployment. For this workshop, we leverage the configuration management functionality. Once Terraform deploys the infrastructure, Ansible will establish a remote SSH connection to the servers and apply the requisite configuration (app install, file downloads, configuration settings, etc.)

Estimated Time: 15 minutes

Watch the video below for a quick walk-through of this lab.
[AppDev Multiplayer Lab 1](videohub:xxx)

### Objectives

In this lab, you will complete the process of deploying the first form of the [Three.js](https://threejs.org/) app to the [Oracle Cloud](https://www.oracle.com/cloud/). The deployment process utilizes Terraform and Ansible, however, we've provided a script to help streamline the process.

### Prerequisites

- Oracle Cloud Account.
- Be an OCI administrator in your account (in Free Tier, you are an administrator by default).

## Task 1: Cloud Shell

1. From the Oracle Cloud Console, click on **Cloud Shell**

    ![Cloud Shell](images/cloud-shell-button.png)

2. As soon as the Cloud Shell is loaded, you can clone the workshop assets for this workshop. Run the command:

    ```
    <copy>git clone https://github.com/vmleon/oci-multiplayer</copy>
    ```

  ![Git Clone](images/git-clone.png)

4. Change directory with `cd` to `oci-multiplayer` directory:

    ```
    <copy>cd oci-multiplayer</copy>
    ```

5. Terraform uses a file called `terraform.tfvars` that contains variables used to communicate with the Oracle Cloud. You are going to generate that file by running the following command:

    ```
    <copy>npx zx scripts/tfvars.mjs vm</copy>
    ```

6. During the execution of the script, you will have to answer a question. The _VM Deployment Compartment Name_. You just press _**ENTER**_ to select the root compartment. If you are familiar with [OCI compartments](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcompartments.htm), then feel free to pick an existing compartment name.

  ![TFvars vm command](images/tfvars-vm-command.png)

## Task 2: Initiate Deployment

1. Run the deployment script which is stored in the _`scripts`_ folder. It might take up to 15 minutes.

    ```
    <copy>./scripts/start_VM.sh</copy>
    ```

2. The script will begin by building the web server packages:

    ![Start 01](images/script-01.png)

3. Once that finishes, it will move on to the Terraform deployment:

    ![Terraform deployment](images/script-02.png)

4. Note that once the Terraform deployment is complete, it will print the public IP addresses of the two servers and the load balancer that was created. No need to capture these now, we'll print them on the screen at the end.

    ![Ansible configuration](images/script-03.png)

5. Copy the _`lb_public_ip`_ value

    ![Start vm Output](images/start_vm_output.png)

6. Open a new browser tab, paste the load balancer public IP address (_`lb_public_ip`_) and check it out.

    ![Game landing](images/game-landing.png)

You may now [proceed to the next lab](#next).

## Acknowledgements

* **Author** - Victor Martin - Technology Product Strategy Director - EMEA
* **Author** - Wojciech (Vojtech) Pluta - Developer Relations - Immersive Technology Lead
* **Author** - Eli Schilling - Developer Advocate - Cloud Native and DevOps
* **Last Updated By/Date** - August, 2023
