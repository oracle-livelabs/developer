
# Provisioning Google Cloud resources

## Introduction

This lab walks you through the prerequisites to get started with Oracle Database@Google Cloud - Autonomous Database. This involves creating a Virtual Private Cloud (VPC) Network in Google Cloud that will be associated with the Autonomous Database and a Compute VM instance that will be used to connect to the Autonomous Database.

Estimated Time: 30 minutes

### Objectives

As a database user, DBA, or application developer:

1. Create a Virtual Private Cloud (VPC) Network in Google Cloud Portal.
2. Provision a Compute VM instance in Google Cloud.
3. Setup the Python environment

## Task 1: Create a Virtual Private Cloud (VPC)

In this section, you will create a VPC which will have two subnets: 

* A private subnet where you Autonomous Database is deployed (this will be created as part of your ADB deployment). A private subnet will protect your database endpoint from internet access.
* A public subnet where you will deploy a virtual machine. You will use this VM to access Autonomous Database.

1.  Login to Google Cloud Console (console.cloud.google.com) and click on the **Navigation Menu**. Then click on **VPC Networks** under **VPC Network**..

    ![Navigation](./images/navigation-menu2.png " ")

2.	On the **VPC networks** page, click on the **CREATE VPC NETWORK** button.

    ![Create VPC](./images/create-vpc.png " ")

3.	On **Create a VPC Network** provide details as mentioned below. 
    
    * **VPC Name** - app-network
    * **Description** - Application Database Network

    ![VPC Name](./images/vpc-name.png " ")

    Under **Subnets** enter the details of the Subnet -

    * **Subnet Name** - public-subnet
    * **Description** - Public Subnet
    * **Region** - us-east4
    * **IPv4 range** - 10.1.0.0/24
    * Leave the rest as defaults under **Subnets**

    ![VPC Subnet](./images/vpc-subnet.png " ")

    Under **Firewall rules** select all rules -

    ![VPC Firewall](./images/vpc-firewall.png " ")

    Click **CREATE** to create the VPC Network.

    ![VPC Create](./images/vpc-create.png " ")

4.	The created VPC will show up on the **VPC networks** page -

    ![App Network](./images/vpc-app-network.png " ")

## Task 2:  Provision Google Cloud Compute VM Instance

1.  Generating ssh key pairs
    
    SSH keys are required to access a running compute VM instance securely. You can use an existing SSH-2 RSA key pair or create a new one. Instructions for creating SSH keys can also be found on the [OCI documentation page](https://docs.cloud.oracle.com/iaas/Content/GSG/Tasks/creatingkeys.htm). For Linux instances you can generate SSH keys [here](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/managingkeypairs.htm#Managing_Key_Pairs_on_Linux_Instances).

2. From the Google Cloud Console (console.cloud.google.com), click on the **Navigation Menu**. Then click on **VM instances** under **Compute Engine**.

    ![Compute VM](./images/compute-vm-navigate.png " ")

3. On the **VM instances** page click **CREATE INSTANCE**

    ![Create VM](./images/compute-vm-create.png " ")

4. Under **Machine configuration** enter the following -

    * **Name** - app-instance
    * **Region** - us-east4
    * Leave the rest as default.

    ![VM Config](./images/compute-vm-machine-config.png " ")

5.  Under **OS and storage**, click **Change** to update the **Storage** from 10 GB to 20 GB.

    ![Create VM](./images/compute-storage.png " ")

6.  Click **Networking** on the left tab and enter the following -

    * **Allow HTTP traffic** - Checkmark
    * **Allow HTTPS traffic** - Checkmark

    ![VM Networking](./images/compute-vm-networking.png " ")

    Click the drop down for **Network interfaces**

    ![VM Default Network](./images/compute-vm-network-default.png " ")

    Enter the following under **Edit network interface**

    * **Network** - app-network
    * **Subnetwork** - public-subnet

    ![VM Network Config](./images/compute-vm-network-config.png " ")

7.  Click **Security** on the left tab and enter the following. Click **MANAGE ACCESS** and click **ADD ITEM** under **Add manually generated SSH keys**. Enter the public ssh key. Click **CREATE** to create the VM instance.

    ![VM ssh create](./images/compute-vm-ssh-create.png " ")

8.	The created VM instance will show up on the **VM instances** page -

    ![VM instance create](./images/compute-vm-instance.png " ")

You may now **proceed to the next lab** to provision Autonomous Database.

## Acknowledgements

*All Done! You have successfully created a VPC Network and Compute VM instance.*

- **Authors/Contributors** - Vivek Verma, Master Principal Cloud Architect, North America Cloud Engineering
- **Last Updated By/Date** - Vivek Verma, July 2025