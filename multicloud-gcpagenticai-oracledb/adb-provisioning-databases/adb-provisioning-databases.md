# Provisioning Autonomous Database

## Introduction

This lab provisions Oracle Database@Google Cloud Autonomous Database. The sample tables are populated in Lab 2 after the private-network VM is available.

Estimated Time: 10 minutes

### Objectives

As a database user, DBA or application developer:

1. Create an ODBG network.
2. Provision an Autonomous Transaction Processing database.

### Required Artifacts

- A Google Cloud account and an existing VPC network to associate with Oracle Database@Google Cloud. If you still need to create the VPC, complete [Lab 2, Task 1](?lab=gcp-get-started#task1createavirtualprivatecloudvpc) first, then return here. The remaining Lab 2 tasks require the provisioned database.

## Task 1: Create an ODBG Network

In this section, you will create an ODBG Network. **ODBG networks** provide secure and private connectivity to your Oracle Database resources, giving you control over how they connect and communicate.

1. Login to Google Cloud Console (console.cloud.google.com) and search for **Oracle Database** in the **Search Bar** on the top of the page. Click on **Oracle Database@Google Cloud**.

    ![Search Bar](./images/adb-search.png "Search Bar")

2. Click **ODBG network** from the left menu.

    ![ODBG Network](./images/odbg-network-pane.png "ODBG Network")

3. Click **Create** on the ODBG network page.

    ![ODBG Network](./images/odbg-network-create.png "ODBG Network")

4. This will bring up the **Create ODBG network** screen where you specify the configuration of the ODBG network.

5. Enter the following for **ODBG network**:

    * **Associated network** - app-network
    * **Region** - us-east4
    * **ODBG network name** - odbg-network

    Click **Create**.

    ![ODBG Network](./images/create-odbg-network.png "ODBG Network")

6. On the **ODBG network** page click on the ODBG network that we just created **odbg-network**.

    ![ODBG Network](./images/odbg-network-main.png "ODBG Network")

7. On the **ODBG network details** page click **Create** to create a Subnet.

    ![ODBG Network](./images/odbg-network-subnet-create.png "ODBG Network")

8. Enter the following for **ODBG subnet**:

    * **Subnet name** - db-subnet
    * **Subnet range** - 10.2.0.0/24
    * **Subnet type** - Client

    Click **Create**.

    ![ODBG Network](./images/create-odbg-subnet.png "ODBG Network")

9. On the **ODBG network details** page, verify the details of the ODBG Network and confirm the **Status** of subnet **db-subnet** is set to **Available**.

    ![ODBG Network](./images/odbg-network-details.png "ODBG Network")

## Task 2: Create Autonomous Database

In this section, you will be provisioning an Autonomous Database using the Google Cloud Console.

1. Login to Google Cloud Console (console.cloud.google.com) and search for **Oracle Database** in the **Search Bar** on the top of the page. Click on **Oracle Database@Google Cloud**.

    ![Search Bar](./images/adb-search.png "Search Bar")

2. Click **Autonomous Database** from the left menu.

    ![ADB Menu](./images/adb-menu.png "ADB Menu")

3. Click **Create** on the Autonomous Database details page.

    ![Create ADB](./images/adb-create.png "Create ADB")

4. This will bring up the **Create an Autonomous Database** screen where you specify the configuration of the database.

5. Enter the following for **Instance details**:

    * **Instance ID** - adb-gcp
    * **Database name** - adbgcp
    * **Database display name** - Autonomous-Database-GCP
    * **Region** - us-east4

    ![ADB Instance Details](./images/adb-instance-details.png "ADB Instance Details")

6. Select **Transaction Processing** for **Workload configuration**

    ![ADB Instance Details](./images/adb-workload.png "ADB Instance Details")

7. Leave all defaults for **Database configuration**

    ![ADB Instance Details](./images/adb-database-config.png "ADB Instance Details")

8. Enter the password for admin user under **Administrator credentials**

    ![ADB Instance Details](./images/adb-credentials.png "ADB Instance Details")

9. Under the **Networking** section, select **Private endpoint access only** for **Access type**.

10. For **Private endpoint**, enter the following:

    * **Network project** - Select the default project name for the VPC network
    * **ODBG Network** - odbg-network
    * **Client subnet** - db-subnet (10.2.0.0/24)

    ![ADB Instance Details](./images/adb-network.png "ADB Instance Details")

11. Leave the rest as defaults and click **CREATE** to create the Autonomous Database.

    ![ADB Instance Details](./images/adb-default-create.png "ADB Instance Details")

12. Post creation the Autonomous Database will appear on the **Autonomous Database** page.

    ![Autonomous Database](./images/adb-post-create.png "Autonomous Database")

## Task 3: Download the Autonomous Database wallet file

**Oracle Autonomous Database** only accepts secure connections to the database. This requires a **'wallet'** file that contains the SQL\*NET configuration files and the secure connection information. Wallets are used by client utilities such as SQL Developer, SQL\*Plus etc.

1. On the **Autonomous Database** page click the Autonomous Database that was provisioned.

    ![Download zip](./images/vm-adb-details.png "Download zip")

2. Go to the **CONNECTIONS** tab.

    ![Download zip](./images/adb-details-connection.png "Download zip")

3. Click **DOWNLOAD WALLET** on the **Connections** page.

    ![Download zip](./images/adb-download.png "Download zip")

4. Set a password for the wallet on the **Download your wallet** page and click **DOWNLOAD**

    ![Download zip](./images/adb-download-wallet.png "Download zip")

5. Keep the downloaded wallet private. After creating the VM in [Lab 2, Task 2](?lab=gcp-get-started#task2provisiongooglecloudcomputevminstance), follow the runbook's [wallet transfer instructions](?lab=workshop-runbook#3provisionnetworkdatabaseandwallet) to copy and extract it on that VM before connecting with SQLcl.

## Acknowledgements

*All Done! You may proceed to the next lab.*

- **Authors/Contributors** - Paul Parkinson, Architect and Dev Advocate, Oracle AI Database
- **Last Updated By/Date** - Paul Parkinson, October 2026
