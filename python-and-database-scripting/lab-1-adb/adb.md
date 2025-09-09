# Set up Autonomous Database Instance

## Introduction

This lab will show you how to setup a Free TIER Autonomous Database  instance.

**Oracle Cloud Infrastructure’s Autonomous Database** is a fully managed, preconfigured database environment with two workload types available: Autonomous Transaction Processing and Autonomous Data Warehouse. You don’t need to configure or manage any hardware, or install any software. After provisioning, you can scale the number of CPU cores or the storage capacity of the database at any time without impacting availability or performance.

Estimated Time: 15 minutes

Watch the video below for a quick walk-through of the lab.
[Set up Autonomous Database Instance](videohub:1_dwsfp4a3)

### Objectives

In this lab, you will:

- Create an Oracle Autonomous Database Serverless instance

### Prerequisites

This lab assumes you have: 
- An Oracle Free Tier or Paid Cloud account 


*Note: If you have a **Free Trial** account, when your Free Trial expires your account will be converted to an **Always Free** account. You will not be able to conduct Free Tier workshops unless the Always Free environment is available. **[Click here for the Free Tier FAQ page.](https://www.oracle.com/cloud/free/faq.html)***

## Task 1: Create an Autonomous Database Instance

1.  Login to your Oracle Cloud Account
2.  Click the **Navigation** Menu in the upper left, navigate to **Oracle Database** and select **Autonomous Database**

    ![Create ADB](./images/create_adb25.png " ")

3. Create a new Autonomous Database Serverless as following:
    - Display name: python_adb
    - Database name: pythonadb
    - Compartment: (default compartment (root))
    - Workload type: Transaction Processing

4. Database Configuration

    In the **Database Configuration** section, proceed with the following selections: 
    - Toggle: Always Free
    - DB Version: 23ai

    ![Basic Info](./images/adb_basic25.png " ")

5. In the **Administrator Credentials creation** section, enter the password for the Admin user and make note of it, as this as this will be required in the subsequent labs.

6. In the **Choose Network Access** section, select 'Secure access from everywhere'

    ![Free Tier](./images/adb_free25.png " ")

7. Hit **Create** button
    
    This process might take few minutes. You can check the status of the creation of the Autonomous Database Serverless, by using the Console.

    Once Autonomous Database Serverless is provisioned, it is automatically started and you should see the following summary:

    ![Summary ADB](./images/adb_summary25.png " ")


## Task 2: Download Oracle Autonomous Database Wallet

To connect to the Oracle Autonomous Database, you need the wallet file.

1.  In the Autonomous Database Summary screen, select **Database Connection** section and in the **Database Connection** window, in the **Download client credentials (Wallet)** section,
    -  select Wallet Type: Instance Wallet
    - hit **Download Wallet** button

    ![Wallet](./images/wallet25.png " ")

2. Specify a password for the Wallet

    Hit **Download** button and save the wallet as a zip file to a location on your local laptop, then click Close to close the popup window. We will upload this file on Console Shell in the next task, so please make a note of the location where the .zip wallet is saved.

    ![Wallet password](./images/wallet_password25.png " ")

    Make a note of the password as this will be used for the database connection and it is required in the subsequent labs.

## Task 3: Upload Wallet to the Cloud Shell

**Cloud Shell**  is a web browser-based terminal accessible from the Oracle Cloud Console and available to all Oracle Cloud Infrastructure users. It’s free to use (within monthly tenancy limits), and it provides access to a Linux shell with a pre-authenticated CLI and other useful tools for following Oracle Cloud Infrastructure service tutorials and labs. The Cloud Shell appears in the Console as a persistent frame and stays active as you navigate to different parts of the Console. Cloud Shell is pre-authenticated with your console credentials.

In the Oracle Autonomous Database Summary screen, we're going to launch Cloud Shell (this has Python pre-installed), and in the subsequent labs we're going to connect to the Autonomous Database Serverless using the Wallet downloaded at the previous task.  

1. To launch the Cloud Shell, sign in to your Oracle Cloud Infrastructure tenancy and click the command prompt icon in Console header, then select Cloud Shell from the drop down:

    ![Cloud Shell](./images/cloud_shell25.png " ")

2. When connected, the following should display:

    ![Cloud Shell terminal](./images/cloud_shell_term25.png " ")

3. Drag and drop the Wallet archive from the location where it was saved, to the Console Shell

    ![Cloud shell wallet](./images/cloud_shell_wallet25.png " ")

4. Unzip the wallet
In your home folder, create directory _Wallets_ and move the wallet archive to Wallets folder. We are going to unzip the file in this directory

    ```<copy>
    $ mkdir Wallets
    $ mv Wallet_python_adb.zip ./Wallets
    $ cd Wallets
    $ unzip Wallet_python_adb.zip
    </copy>
    ```
    
![unzip](./images/shell_unzip25.png " ")
.

## Task 4: Copy Oracle Autonomous Database DSN string

One of the arguments used in to connect to the Oracle Autonomous Database is the DSN (data source name).  

1.  In the ADB Summary screen, select **Database Connection** section and in the popup **Database Connection** window, in the **Connection Strings** section, **Copy** the TNS name and the connection string for the high service level TNS name

    ![connection string](./images/conn_string25.png " ")

2. Click 'Cancel' to close the popup window.

3. Paste the clipboard content to a file called DSN_ADB.txt and then save your changes.
    ````
    <copy>
        vi DSN_ADB.txt
    </copy>
    ````

## Conclusion

In this lab, you had an opportunity to create an Oracle Autonomous Database Serverless instance.

## Acknowledgements
- **Authors** - Veronica Dumitriu
- **Contributors** - Chris Jones
- **Last Updated By/Date** - Veronica Dumitriu, Oracle Database Drivers Product Management, Sep 2025