# Lab 1: Setup

## Introduction
Welcome to the workshop!
![Development Environment](./images/intro-image.jpg)

In this setup lab, you will be creating your Oracle Autonomous Database and APEX workspace.

APEX instances are located within your Oracle Database schema and the workspace is your "work area" where you create and import applications and can manage supporting components such as your database objects and Oracle REST API modules. 

While this workshop will have you creating your own workspace to then populate with the deployments you'll add in [Lab 2](../workshops/tenancy/?lab=lab2-deploy), you can additionally use SQLcl Liquibase to import entire workspaces to your Oracle Database.



>**Note:** This lab walks you through the steps to get started using the Oracle Autonomous Database (Autonomous Transaction Processing [ATP] and Autonomous Data Warehouse [ADW]) on Oracle Cloud. You will provision a new ATP instance. While this lab uses ATP, the steps are the same for creating an ADW database.

Estimated Time: 10 minutes

Watch the video below for a quick walk-through of the lab.
[Lab 1](videohub:1_5sk13ia3)



### Objectives
In this lab, you will:

-   Create an Oracle Autonomous Database
-   Create an APEX workspace
-   Review your APEX workspace dashboards

### Prerequisites

- This lab requires completion of the [Introduction](../workshops/tenancy/?lab=intro) and [Get Started](../workshops/tenancy/?lab=cloud-login) sections in the Contents menu on the left.


## Task 1: Create Your Autonomous Database
 1. Log in to the Oracle Cloud.

    ![Oracle home page](./images/1cloudhomepage.png " ")

 2. Once you log in, the cloud services dashboard shows all the services available to you. Click the navigation menu in the upper left to show top level navigation choices.
    
    ![Dashboard Navigation](./images/2navigation.png " ")
    

 3. Click **Oracle Database**, then **Autonomous Database**.

     ![Click Autonomous Database](./images/3select-adb.png " ")

 4. Use the __List Scope__ drop-down menu to select a compartment. Make sure your Workload Type is __All__ or __Transaction Processing__. 

    * If you are completing this workshop as a part of an event and were assigned a compartment, select that one. Otherwise select a compartment of your choice. This workshop was built on an Always Free Oracle Cloud account and uses the default of the root compartment.
    * This console shows that no databases yet exist. If there were a long list of databases, you could filter the list by the **State** of the databases (Available, Stopped, Terminated). You can also sort by __Workload Type__.

    ![Check the workload type on the left](images/4workloadtype.png " ")

 5. Click **Create Autonomus Database** to start the instance creation process. This brings up the **Create Autonomous Database** screen where you will specify the configuration of the database instance.

     ![Click Create Autonomous Database](./images/5create-autonomous.png " ")

 6. Specify basic information for the Autonomous Database:

    * **Compartment** - Choose the compartment you would like to use or assigned to you. This workshop was built on an Always Free Oracle Cloud account and uses the default of the root compartment. 
    * **Display Name** - Assign as **APEX\_Liquibase\_Workshop**
    * **Database Name** - Assign as **apexlbworkshop**
    * **Workload Type** - Assign as **Transaction Processing**
    * **Deployment Type** - Assign as **Serverless**

    ![Specify Basic Database Info](./images/6basic-info.png " ")

 7. Configure the database:

    * __Always Free__ - If your Cloud Account is an Always Free account, or your Cloud Account is a paid account but you want to avoid any charges, you can select this option to create an *Always Free Autonomous Database*. An always free database comes with 1 CPU and 20 GB of storage. 
    * __Choose database version__ - Select a database version from the available versions.
    * __OCPU count__ - Number of CPUs for your service. For this lab, specify __1 CPU__. If you choose an Always Free database, it comes with 1 CPU.
    * __Storage (TB)__ - Select your storage capacity in terabytes. For this lab, specify __1 TB__ of storage. Or, if you choose an Always Free database, it comes with 20 GB of storage.
    * __Compute auto scaling__ - For this lab, there is no need to enable OCPU auto scaling, which enables the system to automatically use up to three times more CPU and IO resources to meet workload demand. 
    * __Storage auto scaling__ - For this lab, there is no need to enable storage auto scaling, which would allow the system to expand up to three times the reserved storage.

    > **Note:** You cannot scale up/down an Always Free autonomous database.

    ![Select Configuration Options](./images/7config-options.png " ")

 8. Create administrator credentials:

    * __Password and Confirm Password__ - Specify the password for ADMIN user of the database instance. The password must meet the following requirements:
        * The password must be between 12 and 30 characters long and must include at least one uppercase letter, one lowercase letter, and one numeric character.
        * The password cannot contain the username.
        * The password cannot contain the double quote (") character.
        * The password must be different from the last 4 passwords used.
        * The password must not be the same password that you set less than 24 hours ago.
        * Re-enter the password to confirm it. Make a note of this password.

    ![Set Admin Credentials](./images/8admin-credentials.png " ")

 9. Choose network access:
    * These instructions use the default, **Secure access from everywhere**.
        * If you want to allow traffic only from the IP addresses and VCNs you specify - where access to the database from all public IPs or VCNs is blocked, select **Secure access from allowed IPs and VCNs only** in the Choose network access area.
        * If you want to restrict access to a private endpoint within an OCI VCN, select **Private endpoint access only** in the Choose network access area.
    * If the **Require mutual TLS (mTLS) authentication** option is selected, mTLS will be required to authenticate connections to your Autonomous Database. TLS connections allow you to connect to your Autonomous Database without a wallet, if you use a JDBC thin driver with JDK8 or above. See the [documentation for network options](https://docs.oracle.com/en/cloud/paas/autonomous-database/adbsa/support-tls-mtls-authentication.html#GUID-3F3F1FA4-DD7D-4211-A1D3-A74ED35C0AF5) for options to allow TLS, or to require only mutual TLS (mTLS) authentication.
        * Either option works for this workshop. These instructions keep it selected.

    ![Choose Network Access](./images/9choose-network-access.png " ")

 13. Choose a license type. 

    * __Bring Your Own License (BYOL)__ - Select this type when your organization has existing database licenses.
    * __License Included__ - Select this type when you want to subscribe to new database software licenses and the database cloud service. If using an Always Free Autonomous Database, this will be the option you will use.

    ![Choose Database License](./images/10choose-license.png " ")

 14. The **Contact Email** field is optional and allows you to list contacts to receive operational notices and announcements as well as unplanned maintenance notifications.

    ![Email Notification Option](./images/11email-notifications.png " ")

 15. Click __Create Autonomous Database__. 

    ![Click Create Button](./images/12click-create.png " ")

 16. Your instance will begin provisioning. In a few minutes, the state will turn from Provisioning to Available. At this point, your Autonomous Transaction Processing database is ready to use! Have a look at your instance's details here including its name, database version, OCPU count, and storage size.

    ![Database Provisioning](./images/13database-provisioning.png " ")

## Task 2: Create Your APEX Workspace 

 1. Once your Autonomous Database is available, right click the instance name **APEX\_Liquibase\_Workshop** under the APEX instance section of your Autonomous Database information and select "open link in new tab".

    ![Select APEX Instance](./images/14select-apex-instance.png " ")

 2. This will take you to the overview dashboard of the APEX instance embedded in your Autonomous Database. Click the **Launch APEX** button in the upper left area of the dashboard.

    ![Click Launch APEX](./images/15launch-apex.png " ")

 3. On the Administration Services sign-in page, enter the ADMIN password for your database that you set on the Create Autonomous Database page. Then click **Sign In to Administration**

    ![Sign In to APEX Admin](./images/16apex-admin-signin.png " ")

 4. You are now in APEX. Click the **Create Workspace** button to begin creating the APEX Workspace where you will be importing your application.

    ![Click Create Workspace](./images/17create-workspace.png " ")

 5. Select **New Schema**.

    ![Select New Schema](./images/18select-new-schema.png " ")

 6. On the Create Workspace page fill out the following information, then select **Create Workspace**.
    * **Workspace Name** - Assign as **Liquibase\_Demo**.
    * **Workspace Username** - Assign as **Liquibase\_Demo**. 
    * **Workspace Password** - Set a password of your choice.
    * **Database Password** - Expand the Advanced option and set a password of your choice.
        * The workspace password is for accessing the workspace in your APEX instance.
        * The database password is for accessing the database user that will be created. The APEX workspace gets created on this database user's schema 

    ![Fill Out Workspace Info](./images/19workspace-info.png " ")

 7. Your APEX Workspace is now created! Click the name **Liquibase\_Demo** in the green banner at the top of the dashboard to sign in to the workspace.

    ![Click Workspace Name](./images/20click-workspace-name.png " ")

 8. Fill out your workspace name and username with **Liquibase\_Demo** and enter your workspace password (not your database password). Then click **Sign In**.

    ![Sign In To Workspace](./images/21workspace-login.png " ")

## Task 3: Review APEX Workspace Dashboards

 1. You are now signed in to your APEX workspace! From this area let's take a glance at the different locations where you will be importing components for your APEX application. First let's check out the Database Objects section:
    * Select the **SQL Workshop** dropdown at the top and then click **Object Browser**.

    ![Select Object Browser](./images/22select-object-browser.png " ")

 2. This is your database object browser page! The left hand section lists the different database object types. 
    * As this is a fresh APEX Workspace and Autonomous Database that you created, this list is currently empty. 
    * After you import database objects to your schema, dropdown icons will appear with lists underneath containing all your objects. 

    ![View Object Browser](./images/23view-object-browser.png " ")

 3. Next let's check out the REST API dashboard. Select the **SQL Workshop** dropdown again, this time selecting **RESTful Services**.

    ![Select RESTful Services](./images/24select-restful-services.png " ")

 4. Similar to the database object dashboard, the left hand section lists your REST API components.
    * This section is additionally empty and will be populated with dropdown icons and lists of items when your REST API schema objects are imported.

    ![View RESTful Services](./images/25view-restful-services.png " ")

 5. Finally let's view the application dashboard. Click **App Builder** in the top menu.

    ![Select App Builder](./images/26select-app-builder.png " ")

 6. This is your app builder dashboard. When you create or import APEX applications they will be listed on this page. As you currently don't have any applications, there are none displayed.

    ![View App Builder](./images/27view-app-builder.png " ")

 7. You can now navigate back to your Autonomous Database dashbaord by selecting the tab in your web browser.
    * If you closed out of it, you can navigate back from the Oracle Cloud home page by selecting the hamburger menu in the top left -> Oracle Database -> Autonomous Database -> and selecting your **APEX\_Liquibase\_Workshop** database.

    ![Select Autonomous Database Tab](./images/28select-adb-tab.png " ")

 8. Congratulations! You have completed the setup lab. You may now **proceed to the next lab**.


## Learn more

* [SQLcl Liquibase 101 LiveLabs Workshop](https://apexapps.oracle.com/pls/apex/f?p=133:180:1722441206322::::wid:3692)
* [Download (SQLcl)](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/download/)
* [Product Page (SQLcl)](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/)
* [Documentation (SQLcl & SQLcl Liquibase)](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/)
* [Get Started (APEX)](https://apex.oracle.com/en/learn/getting-started/)
* [Product Page (APEX)](https://apex.oracle.com/en/)
* [Documentation (APEX)](https://apex.oracle.com/en/learn/documentation/)
* [Download (Oracle REST Data Services)](https://www.oracle.com/database/sqldeveloper/technologies/db-actions/download/)
* [Product Page (Oracle REST Data Services)](https://www.oracle.com/dk/database/technologies/appdev/rest.html)
* [Documentation (Oracle REST Data Services)](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/)
* Blog Posts/Articles
    * [CI/CD With Oracle Database and APEX](https://www.thatjeffsmith.com/archive/2021/04/ci-cd-with-oracle-database-and-apex/)
    * [SQLcl Liquibase in 6 Minutes](https://www.talke.tech/blog/learn-sqlcl-liquibase-in-6-minutes)
    * [Data Definition Language (DDL) Settings with SQLcl & Liquibase](https://www.thatjeffsmith.com/archive/2023/01/physical-properties-in-oracle-table-liquibase-changesets/)
    * [How to Run SQLcl Liquibase Updates in Different Target Schemas](https://www.thatjeffsmith.com/archive/2022/12/run-liquibase-updates-for-a-specific-schema-with-sqlcl/)
    * [Use JSON, XML, and YAML Formats With SQLcl Liquibase](https://www.thatjeffsmith.com/archive/2022/12/how-to-use-json-xml-yaml-liquibase-changesets-in-sqlcl/)
    * [What's The Difference Between An Oracle Database Schema & User](https://www.talke.tech/blog/whats-the-difference-between-a-db-schema-and-db-user)

## Acknowledgements

- **Author** - Zachary Talke, Senior Product Manager
- **Last Updated By/Date** - Zachary Talke, August 2023
