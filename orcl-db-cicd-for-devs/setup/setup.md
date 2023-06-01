# Setup

## Introduction
Now that you're logged into your cloud account and have your Autonomous Database started, let's get set up for the labs!


*Estimated Time:* 15 Minutes


### Objectives
In this section you will:
* Create two database users.
* Create the database objects that will be used in the labs.


### Prerequisites
Completion of:
* [Introduction](../workshops/freetier/?lab=intro)
* [Get Started](../workshops/freetier/?lab=cloud-login)
* [Create Your Autonomous Database](../workshops/freetier/?lab=adb-provision-conditional)


## Task 1: Create your workshop database users
Let’s create the database users you will need for this workshop. Oracle Cloud and the Autonomous Database make this process simple.

 1. From the dashboard of your freshly created database, select “Database Actions” in the top left.
    
    ![Click DB Actions](./images/1clickdbactions.png)

 2. This brings you to a page with a list of Autonomous Database features available from your Oracle Cloud user interface (UI). Select “SQL” under Development.
    ![DB Actions Menu](./images/2dbactionsmenu.png)

 3. From the SQL Worksheet, copy and paste the following script. This will create the two database users you will need for the workshop: MOVIESTREAM\_MANAGER and MOVIESTREAM\_DEV.
    * Before running the script, remove the brackets and add a password for each user in the `CREATE USER` lines after `IDENTIFIED BY`.
       * The password must be between 12 and 30 characters long and must include at least one uppercase letter, one lowercase letter, and one numeric character.
         - The password cannot contain the username.
         - The password cannot contain the double quote (") character.
         - The password must be different from the last 4 passwords used.
         - The password must not be the same password that you set less than 24 hours ago.
    * You can then select the Run Script icon

         <details>
         <summary>[EXPAND] Create MOVIESTREAM\_MANAGER and MOVIESTREAM\_DEV Code</summary>

         ```na

         <copy>
         -- USER SQL
         CREATE USER MOVIESTREAM_MANAGER IDENTIFIED BY [Insert Password];

         -- ADD ROLES
         GRANT CONNECT TO MOVIESTREAM_MANAGER;
         GRANT CONSOLE_DEVELOPER TO MOVIESTREAM_MANAGER;
         GRANT DWROLE TO MOVIESTREAM_MANAGER;
         GRANT GRAPH_DEVELOPER TO MOVIESTREAM_MANAGER;
         GRANT OML_DEVELOPER TO MOVIESTREAM_MANAGER;
         GRANT RESOURCE TO MOVIESTREAM_MANAGER;
         ALTER USER MOVIESTREAM_MANAGER DEFAULT ROLE CONNECT,CONSOLE_DEVELOPER,DWROLE,GRAPH_DEVELOPER,OML_DEVELOPER,RESOURCE;

         -- ENABLE REST
         BEGIN
            ORDS.ENABLE_SCHEMA(
               p_enabled => TRUE,
               p_schema => 'MOVIESTREAM_MANAGER',
               p_url_mapping_type => 'BASE_PATH',
               p_url_mapping_pattern => 'moviestream_manager',
               p_auto_rest_auth=> TRUE
            );
            commit;
         END;
         /

         -- ENABLE GRAPH
         ALTER USER MOVIESTREAM_MANAGER GRANT CONNECT THROUGH GRAPH$PROXY_USER;

         -- ENABLE OML
         ALTER USER MOVIESTREAM_MANAGER GRANT CONNECT THROUGH OML$PROXY;

         -- QUOTA
         ALTER USER MOVIESTREAM_MANAGER QUOTA UNLIMITED ON DATA;

         -- USER SQL
         CREATE USER MOVIESTREAM_DEV IDENTIFIED BY [Insert Password];

         -- ADD ROLES
         GRANT CONNECT TO MOVIESTREAM_DEV;
         GRANT CONSOLE_DEVELOPER TO MOVIESTREAM_DEV;
         GRANT DWROLE TO MOVIESTREAM_DEV;
         GRANT GRAPH_DEVELOPER TO MOVIESTREAM_DEV;
         GRANT OML_DEVELOPER TO MOVIESTREAM_DEV;
         GRANT RESOURCE TO MOVIESTREAM_DEV;
         ALTER USER MOVIESTREAM_DEV DEFAULT ROLE CONNECT,CONSOLE_DEVELOPER,DWROLE,GRAPH_DEVELOPER,OML_DEVELOPER,RESOURCE;

         -- ENABLE REST
         BEGIN
            ORDS.ENABLE_SCHEMA(
               p_enabled => TRUE,
               p_schema => 'MOVIESTREAM_DEV',
               p_url_mapping_type => 'BASE_PATH',
               p_url_mapping_pattern => 'moviestream_dev',
               p_auto_rest_auth=> TRUE
            );
            commit;
         END;
         /

         -- ENABLE GRAPH
         ALTER USER MOVIESTREAM_DEV GRANT CONNECT THROUGH GRAPH$PROXY_USER;

         -- ENABLE OML
         ALTER USER MOVIESTREAM_DEV GRANT CONNECT THROUGH OML$PROXY;

         -- QUOTA
         ALTER USER MOVIESTREAM_DEV QUOTA UNLIMITED ON DATA;


         </copy>

         ```
         </details>

   ![Run User Script](./images/3runuserscript.png)

 4. You now have both of the database users you will need for the labs created. Return to your `Liquibase_Workshop` Autonomous Database dashboard by selecting the original tab in your web browser and navigating off your Database Actions tab.
    ![Change Tab](./images/4changetab.png)
    * If you accidently closed out of this tab, you can relog in to OCI on the [Sign-in Page](https://www.oracle.com/cloud/sign-in.html) and navigate back to your dashboard
       * Hamburger menu in top left -> Oracle Database -> Autonomous Database -> Liquibase_Workshop
    ![Navigate To Database](./images/5navigatetodb.png)

## Task 2: Create database objects for the labs
With your database users created, next you will be creating the database objects you will be working with in the labs. Database objects are the different types of “things” you have in your database. Examples include:
   * Tables - the basic way to store data. A grid organized into columns and rows just like an Excel spreadsheet.  
   * Views - custom tables you can create from parts of one or more tables. Helpful for focusing on only certain areas of your data.
   * Constraints - rules you can set on the data in your tables.
   * Triggers - code that executes if a specified event occurs in your database. “If X occurs do Y”.

Just as you can create and have different tables in your database (`employees`, `departments`, etc.), the same applies to the other database object types.

### **Setting up your connection credentials and files**
 1. First let's set up your connection credentials to your database. Cloud Shell makes this easy.
    * Cloud Shell provides a Linux terminal in your Oracle Cloud webpage with a pre-authenticated Oracle Cloud Infrastructure (OCI) Command Line Interface (CLI) connected to it.
    * Select the < > icon in the top right corner of your Oracle Cloud menu and then select “Cloud Shell”
    ![Select Cloud Shell](./images/6selectcloudshell.png)

 2. On the bottom of your screen you’ll see the Cloud Shell interface appear.
    ![Cloud Shell Opened](./images/7cloudshellopened.png)

 3. You can fetch your wallet with the following command. Before you paste the command in the Cloud Shell command prompt, place it in a text editor and edit the following areas (make sure to remove the brackets):
    * Replace [Insert Password] with a password of your choice for your wallet
       * The wallet password cannot contain special characters such as $
    * Replace [Insert OCID] with your Autonomous Database OCID
       * This can be found under your "Autonomous Database information" tab
   
    ![Copy OCID](./images/8copyocid.png)

    ```na
    <copy>
    oci db autonomous-database generate-wallet --generate-type ALL --file Wallet_lbworkshop.zip --password [Insert Password] --autonomous-database-id [Insert OCID]
    </copy>
    ```
    

 4. Now you can place the command into Cloud Shell and generate your wallet.
    ![Fetch Wallet](./images/9fetchwallet.png)

 5. Before you connect to your database, let's upload some files you'll need for the workshop. Select the settings gear in the top right of the Cloud Shell interface then click “Upload”.
    ![Select Upload Cloud Shell](./images/10selectuploadcloudshell.png)

 6. Download [setup_changelogs.zip](https://objectstorage.us-ashburn-1.oraclecloud.com/p/VEaopGvnBQgotbj8iHpFEKSUZQhnszZJtFQpT_EOviGNRWhY21qeq0itQe3f_ykZ/n/c4u04/b/livelabsfiles/o/developer-library/setup_changelogs.zip) by clicking the link.
    * The files in this zip folder will be used to automatically create the database objects you will use in the workshop

 7. Once that zip file has downloaded to your computer, select it in the "File Upload to your Home Directory" menu and click Upload.
    ![Select File To Upload](./images/11selectfilesupload.png)

 8. There will be a notification in the top right “File Transfers” window when the upload is complete.
    ![File Transfer](./images/12filetransfer.png)

 9. Let’s now unzip the setup_changelogs folder in the Cloud Shell command line using the `unzip` Linux command.
    * `unzip` decompresses your files in the zip folder/directory. The -d option you will use extracts those files and subdirectories to a different directory in the format of `unzip -d [new/existing directory to extract to] [zip file/folder to extract from]`.

    ```na
    <copy>
    unzip -d setup_changelogs setup_changelogs.zip
    </copy>
    ```
    ![Unzip Folder](./images/13unzip.png)

 10. Next, change your current working directory to the newly created setup\_changelogs folder. You’ll be using the `cd` (change directory) command and entering it twice due to the folder unzipping in such a way that the structure is setup\_changelogs -> setup\_changelogs -> [files]
    * The reason you want to change your directory to setup\_changelogs is because SQLcl Liquibase by default reads and writes files to and from your current directory.

    ```na
    <copy>
    cd setup_changelogs
    cd setup_changelogs
    </copy>
    ```

### **Connect To MOVIESTREAM_MANAGER user and create database objects**
 1. Now that your wallet and setup files are downloaded, it's time to connect to SQLcl.

    ```na
    <copy>
    sql /nolog
    </copy>
    ```

 2. Set cloudconfig to Wallet_lbworkshop.zip so SQLcl knows to read your credentials from this wallet. In the `set cloudconfig` command below replace [OCI CLI Profile Name] with your profile name.
    * This is the name to the left of `@cloudshell` in your command prompt before you logged in to SQLcl.  
   
    ```na
    <copy>
    set cloudconfig /home/[OCI CLI Profile Name]/Wallet_lbworkshop.zip
    </copy>
    ```

    ![Set Cloudconfig](./images/14cloudconfig.png)

 3. Use the command `show tns` to show connection information. 
    * Transparent Network Substrate (TNS) is an Oracle networking technology that serves as the foundational component for all of our network products.
   
    ```na
    <copy>
    show tns
    </copy>
    ```
    
    ![Show TNS](./images/15showtns.png)

 4. It is now time to connect to MOVIESTREAM\_MANAGER and create some database objects in this user.
    * Under the "Available TNS Entries" section of the `show tns` command, there are 3 connections by default for Autonomous Data Warehouse (ADW) and 5 for Autonomous Transaction Processing (ATP). The names are designated by `[database name]_[connection level]`.
    * These workshop instructions will use lbworkshop\_high in the command below.
    * If you prefer to use a different connection, simply replace the command with that connection. Enter your MOVIESTREAM\_MANAGER password at the prompt.
       * lbworkshop_high
           * High priority application connection service for reporting and batch operations. All operations run in parallel and are subject to queuing.
       * lbworkshop_medium
           * A typical application connection service for reporting and batch operations. All operations run in parallel and are subject to queuing. Using this service, the degree of parallelism is limited to four.
       * lbworkshop_low
           * A lowest priority application connection service for reporting or batch processing operations. This connection service does not run with parallelism.
       * lbworkshop_tpurgent (ATP only)
           * The highest priority application connection service for time critical transaction processing operations. This connection service supports manual parallelism.  
       * lbworkshop_tp (ATP only)
           * A typical application connection service for transaction processing operations. This connection service does not run with parallelism.

    ```na
    <copy>
    connect moviestream_manager@lbworkshop_high
    </copy>
    ```
    ![Connect MOVIESTREAM_MANAGER](./images/16connectmanager.png)

 5. You are now connected to your moviestream_manager user. If you run the `tables` SQL command you’ll see by the “no rows selected” result that you don’t have any tables yet. So let’s create some database objects to use in your workshop!
    ```na
    <copy>
    tables;
    </copy>
    ```

 6. Run the following command.
    ```na
    <copy>
    liquibase update -changelog-file controller.xml
    </copy>
    ```
    ![Update Environment](./images/17updateenvironment.png)

 7. Congratulations! You just populated an entire Oracle Database schema by running one simple command and used SQLcl Liquibase to do so before the workshop even started. We’ll break down what you just did there in the labs! For now, you can check out the tables you just created with the `tables` command.
    ```na
    <copy>
    tables;
    </copy>
    ```
    ![Setup Table](./images/18setuptable.png)

 8. You can now log out of SQLcl with the `exit` command.
    ```na
    <copy>
    exit
    </copy>
    ```

 9. You are all set to start! You may now **proceed to the first lab**.

## Learn More
* [Product Page (SQLcl)](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/)
* [Documentation (SQLcl & SQLcl Liquibase)](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/)
* Blog Posts/Articles
    * [CI/CD With Oracle Database and APEX](https://www.thatjeffsmith.com/archive/2021/04/ci-cd-with-oracle-database-and-apex/)
    * [SQLcl Liquibase in 6 Minutes](https://www.talke.tech/blog/learn-sqlcl-liquibase-in-6-minutes)
    * [Data Definition Language (DDL) Settings with SQLcl & Liquibase](https://www.thatjeffsmith.com/archive/2023/01/physical-properties-in-oracle-table-liquibase-changesets/)
    * [How to Run SQLcl Liquibase Updates in Different Target Schemas](https://www.thatjeffsmith.com/archive/2022/12/run-liquibase-updates-for-a-specific-schema-with-sqlcl/)
    * [Use JSON, XML, and YAML Formats With SQLcl Liquibase](https://www.thatjeffsmith.com/archive/2022/12/how-to-use-json-xml-yaml-liquibase-changesets-in-sqlcl/)
    * [What's The Difference Between An Oracle Database Schema & User](https://www.talke.tech/blog/whats-the-difference-between-a-db-schema-and-db-user)
## Acknowledgements

- **Author** - Zachary Talke, Product Manager
- **Last Updated By/Date** - Zachary Talke, May 2023
