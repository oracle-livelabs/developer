# Provision and Connect to an Oracle Autonomous Database

## Introduction

This lab guides you through the steps for provisioning an Oracle Autonomous database 23ai. This workshop uses a Free Tier Autonomous Data Warehouse (ADW) on Oracle Cloud Infrastructure. All examples in this workshop assume a 23ai ADB. 

Estimated lab time: 10 minutes

### Objectives

- Provision a new Autonomous AI Transaction Processing instance.

### Prerequisites

- This lab requires completion of the **Register for Free Tier** lab.

## Task 1: Choosing an Autonomous AI Database from the Services Menu

1. Log in to the Oracle Cloud, as shown in the previous lab. Once you are logged in, click the navigation menu in the upper left of the Cloud Console.

   ![Navigate to OCI menu](./images/1-oci-dashboard.png " ")

2. Select Oracle AI Database, then Autonomous AI Database. 
 
   ![Choose Oracle Database](./images/2-navigate-oracle-database.png " ")

3. Ensure you are in your Root compartment; select the **Create Autonomous AI Database** button.

   ![Create Autonomous Database Button](./images/3-click-create-adb.png " ")

## Task 2: Creating the Autonomous AI Database Serverless Instance

1. Begin by entering in a unique Display name and Database name. Ensure you are in your Root compartment, choose Lakehouse or Transaction Processing as the Workload type.

   ![Entering in db details, above the fold](./images/5-create-ai-db-root-compartment.png " ")

2. Toggle the Always Free radio button to the on position. Choose 26ai as the database version.

   ![Entering in db details, below the fold](./images/6-select-type-and-version.png " ")

3. Enter in a password for your ADB's Administrator.

   ![Admin password and network settings](./images/7-admin-password.png " ")

> NOTE:  For security purposes, this password should differ from your Tenany Administrator password.<br></br>
> NOTE: The password must meet the following requirements:
>   - The password must be between 12 and 30 characters long and must include at least one uppercase letter, one lowercase letter, and one numeric character.
>   - The password cannot contain the username.
>   - The password cannot contain the double quote (") character.

4. Keep the default Network access settings: Secure access from everywhere. Finally, enter in your valid email address, and click **Create**.

   ![Admin password and network settings](./images/8-secure-access-email-create.png " ")

5. You will automatically be redirected to your new Autonomous AI Database shboard. In a few moments the Autonomous AI Database will transition from a **Provisioning** state to an **Available** state.

   ![New ADB in available status and into database actions](./images/9-provisioning-status.png " ")

## Task 3: Accessing Database Actions

1. Once the Autonomous AI DB reaches an Available state, click the **Database actions** button, and selecet **View all database actions** from the dropdown menu.

   ![New ADB in provisioning status](./images/10-available-status-to-database-actions.png " ")

2. A new browser tab or window will appear, revealing the Database Actions LaunchPad. If you are not automatically logged in, sign in with username Admin, and the password you created when you created your ADB (see step 7 above). 

   ![First time accessing Database Actions LaunchPad](./images//11-admin-lanuchpad-optional-tour.png " ")

### Let's Get Started

You may now [proceed to the next lab](#next).

## Acknowledgements

### Authors

- Jeff Smith, Distinguished Product Manager
- Chris Hoina, Senior Product Manager

## Last Updated By/Date

- Chris Hoina, September 2025
