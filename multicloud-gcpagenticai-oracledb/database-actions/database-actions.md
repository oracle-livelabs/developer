# Oracle Database Actions

## Introduction
Database Actions brings you your favorite Oracle Database desktop tool’s features and experience to your browser! Delivered as a single-page web application, Database Actions is powered by Oracle REST Data Services (ORDS). Database Actions offers, a worksheet for running queries and scripts, the ability to manage and browse your data dictionary, a REST development environment for your REST APIs and AUTOREST enabled objects, an interface for Oracle’s JSON Document Store (SODA), a DBA console for managing the database, a data model reporting solution, and access to PerfHub.

Database Actions provides a web-based interface with development, data tools, administration, monitoring, and download features for Autonomous Database. 

The following table lists the main features of Database Actions.

![Database actions features](./images/database-actions-features.png " ") 

Estimated Time: 15 minutes

### Objectives

As a database admin or user:
1. Provision a Windows Compute VM in Google Cloud.
2. Access Database Actions under Autonomous Database.

### Required Artifacts
- Access to a pre-provisioned Autonomous Database instance.

## Task 1: Provision Windows Compute VM instance in Google Cloud

1. From the Google Cloud Console (console.cloud.google.com), click on the **Navigation Menu**. Then click on **VM instances** under **Compute Engine**.

    ![Compute VM](./images/compute-vm-navigate.png " ")

2. On the **VM instances** page click **CREATE INSTANCE**

    ![Compute VM](./images/compute-vm-create.png " ")

3. Under **Machine configuration** enter the following -

    * **Name** - windows-instance
    * **Region** - us-east4
    * Leave the rest as default.

    ![Compute VM](./images/compute-win-machine-config.png " ")

5.  Click **OS and storage** on the left tab and click **Change** to change the Operating System to Windows. Under the drop down for **Operating system** select **Windows Server**. Leave others as default.

    ![Compute VM](./images/os-win-machine-config.png " ")

6.  Click **Networking** on the left tab and enter the following -

    * **Allow HTTP traffic** - Checkmark
    * **Allow HTTPS traffic** - Checkmark

    ![Compute VM](./images/compute-vm-networking.png " ")

    Click the drop down for **Network interfaces**

    ![Compute VM](./images/compute-vm-network-default.png " ")

    Enter the following under **Edit network interface**

    * **Network** - app-network
    * **Subnetwork** - public-subnet

    ![Compute VM](./images/compute-vm-network-config.png " ")

7.  Click **Security** on the left tab and enter the following. Click **MANAGE ACCESS** and click **ADD ITEM** under **Add manually generated SSH keys**. Enter the public ssh key. Click **CREATE** to create the VM instance.

    ![Compute VM](./images/compute-vm-ssh-create.png " ")

8.	The created VM instance will show up on the **VM instances** page -

    ![Compute VM](./images/compute-win-instance.png " ")

9. Set the Windows VM login password by clicking on **Set Windows password**.

    ![Compute VM](./images/set-win-pass.png " ")

10. RDP to the VM instance using the External IP address and login using the username and password set in above step.

    We will use this Windows Compute VM to launch **Autonomos Database** - **Database Actions**.

## Task 2: Oracle Database Actions Overview

You can access Database Actions from Autonomous Database. Database Actions provides development tools, data tools, administration, and monitoring features for Autonomous Database. Using Database Actions you can run SQL statements, queries, and scripts in a worksheet. 

To launch Database Actions:

1. From the **Autonomous Database Details** page, click **MANAGE ON OCI** to go to the OCI Console.

    ![Cloud Metrics Explorer](./images/manage-in-oci.png " ")

2. Login to the OCI Console using your OCI crendentials.

    ![Login to OCI](./images/login-to-oci.png " ")

3. Post login you will reach the **Autonomous Database details** page on OCI.

    ![ADB Page OCI](./images/adb-page-oci.png " ")

4. Click **Database actions** and launch **View all database actions**.

    ![All Database Actions](./images/all-database-actions.png " ")

5. Click **Open** to launch **SQL Worksheet**.

    ![SQL Worksheet](./images/sql-worksheet.png " ")

6. Under **Navigator** on the left, click on the **ADMIN** schema and select **SOE** that was installed during the Swingbench lab.

    ![SOE Schema](./images/soe-schema.png " ")

7. This will list all the tables under **SOE** schema. Right click on the **ADDRESS** table and click **Open** to see table details.

    ![Table details](./images/table-details.png " ")

    Click **Close** to go back to **SQL Worksheet**.

    On the SQL Worksheet you can use the **Consumer Group** drop-down list to select the consumer group to run your SQL or PL/SQL code. See [Executing SQL Statements in the Worksheet Editor](https://docs.oracle.com/en/database/oracle/sql-developer-web/sdwad/sql-page.html#SDWAD-GUID-1BE36B0F-4D2B-4CC2-B705-4D8794D8FC8C) for more information.

8. Click **Database actions** to go back to the **Database actions** main page and click **Data Studio**.

    ![Table details](./images/data-studio.png " ")

9. Click **Open** to launch the **Data Studio Overview** page.

    ![Table details](./images/data-studio-overview.png " ")

    The Data Studio comprises of the Data Load, the Data Analysis, the Data Insights, Catalog, Data Marketplace and the Data Share tool.

    The Data Studio Tools enables you to load data from cloud and other diverse sources, analyzes it and gain insights from it. You can share the result of the analysis with other users. It is a one-stop application of your analytics tool from multiple data sources. This tool makes sure that there is seamless transition between different applications. The multiple ways of navigation do not impact the progress of your work. For instance, if you are working on data analysis and decide you need some additional data, you can navigate to the Data Load page, bring in the new contents, and return to your analysis in progress. 

10. Click **Data Load** to go to the **Data Load** page which lists various options to load data into the Autonomous Database.

    ![Table details](./images/data-load-overview.png " ")

11. Click **Database actions** to go back to the **Database actions** main page and click **Administration**.

    ![Table details](./images/administration.png " ")

12. Click **Open** to launch the **Database Users** page.

    ![Table details](./images/database-users.png " ")

     The Database Users page enables you to perform user management tasks such as create, edit, enable REST, and delete, and create and manage self service schemas. For user management, the actions available are based on the user privileges (CREATE, ALTER, DROP) granted to you. Users with no assigned privileges can still access the Database Users page to browse all users. However, the only action available to them is changing their password.

13. Click **Database actions** to go back to the **Database actions** main page and click **Downloads**.

    ![Table details](./images/downloads.png " ")

    From the **Downloads** page you can -

    * Download Oracle Instant Client
    * Download SODA Drivers
    * Download Microsoft Excel/Google Sheets add-in

14. Click **Database actions** to go back to the **Database actions** main page and click **Monitoring**.

    ![Table details](./images/monitoring.png " ")

15. Click **Open** to launch **Performance Hub**.

    ![Table details](./images/performance-hub.png " ")

    The Database Dashboard card in Database Actions provides the Overview and Monitor tabs where you can find information about the performance of an Autonomous Database instance.

    Review [Monitor the Performance of Autonomous Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/monitor-performance-intro.html) to check how you can leverage Performance Hub to monitor the performance of your database.

16. Click **Database actions** to go back to the **Database actions** main page and click **Related Services**.

    ![Table details](./images/related-services.png " ")

    SODA - Oracle REST Data Services (ORDS) provides HTTPS interfaces for working with the contents of your Oracle Database in one or more REST enabled schemas.
    
    Oracle Machine Learning RESTful services -  Oracle Machine Learning provides REST APIs for OML4Py Embedded Python Execution and OML Services.

17. Click **Open** and **Copy** the URL.

    ![Table details](./images/soda.png " ")

18. Open the URL in a separate tab to launch the **ORACLE REST Data Services** page.

    ![Table details](./images/apex.png " ")

    Refer [Developing RESTful Services in Autonomous Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/ords-autonomous-database.html) for more details.

## Acknowledgements
- **Authors/Contributors** - Vivek Verma, Master Principal Cloud Architect, North America Cloud Engineering
- **Last Updated By/Date** - Vivek Verma, Jan 2025