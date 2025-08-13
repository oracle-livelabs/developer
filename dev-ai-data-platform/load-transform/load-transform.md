# 🏗️ Build your Data Pipeline: Load & Transform Data (optional lab)

## Introduction

In this lab, you’ll practice setting up the live feed capabilities, that can be used to load data that is continuously collected into cloud object storage.  When a load job is enabled for live feed, it can be  connected to the OCI event notification and subscription mechanism, so that every time a new object is created in the object store bucket, it triggers the live feed, loading the contents to the database.

Estimated Lab Time: 45 minutes

### Objectives
  * Login to LiveLabs Sandbox
  * Find your LiveLabs Sandbox reservations

### Prerequisites
  This lab assumes you have:
  * Completed the Get Started lab
  * Successfully launched the hands-on lab environment

## Task 1: Prepare to Build a Data Pipeline

  1. Click **View Login Info**. Copy your **DB ADMIN Password**, and click the **SQL Worksheet** link.
  
      ![Access Data Catalog](./images/start-demo-2.png "Access Local Data Catalog")  
  
  2. For your Username enter **LOAN**. Paste in the password you copied in the previous step  
  
      ![Create Data Product Share](./images/task1-scrn-5.png "Create Data Product Share") 

      Click **Sign-in** button  

  3. Select the Development tab, then click SQL to open the SQL Worksheet.

      ![Click Data Load Button](./images/open-sql-development.png "") 

   4. Copy the following PL/SQL code to your clipboard, then paste it in the SQL Worksheet.  We will be using it to copy objects from one storage bucket to another. 
  

      ```
      <copy>
          DECLARE
            object_name     VARCHAR2(200) := 'funding_commitments1.json';
            credential_name VARCHAR2(200) := 'OCI_API_KEY_CRED';
            folder_name     VARCHAR2(200) := ‘FUNDING/’;
            source_uri      VARCHAR2(200);
            target_uri      VARCHAR2(200);;
           BEGIN
            source_uri := source_uri||object_name;
            target_uri := target_url||folder_name ||object_name;
      
            DBMS_CLOUD.COPY_OBJECT (credential_name, source_uri, target_uri);
           END;
           /
      </copy>
      ```

  5. Right-click on your browser tab and select Duplicate from the context menu to open another browser tab.  Click Database Actions in the top banner of the new tab.

      ![Click Data Load Button](./images/open-another-browser-tab.png "") 

  6. Click Data Studio from the Launchpad page.

      ![Click Data Load Button](./images/open-data-studio.png "") 

  7. Select Data Load from the Launchpad page.

      ![Click Data Load Button](./images/select-data-load.png "") 

  8. Then select the Connections tile.

      ![Click Data Load Button](./images/select-connections-tile.png "") 

  9. Select the LOANAPP_FUNDING panel, on the Connections page.

      ![Click Data Load Button](./images/loanapp-funding-panel.png "") 

10.	Copy the source URI for LOANAPP_FUNDING cloud storage to your clipboard

      ![Click Data Load Button](./images/loanapp-funding-uri.png "") 

11.	Return to SQL | Oracle Database Actions browser tab.  Modify the source_uri definition in the SQL Worksheet, as shown below:

      Before:
      source_uri   VARCHAR2(100);

      After:
      source_uri    VARCHAR2(100) := ‘< the LOANAPP_FUNDING uri you copied >';
      

12.	Return to the Data Load | Oracle Database browser tab.  Select the MyDemoBucket panel.

      ![Click Data Load Button](./images/mydemobucket-panel.png "")  

13.	Copy the URI for MYDEMOBUCKET cloud storage to your clipboard.  

      ![Click Data Load Button](./images/mydemobucket-uri.png "")  

  Click **Close** to exit.  

14.	Return to SQL | Oracle Database Actions browser tab.  Modify the target_uri definition in the SQL Worksheet, as shown below:

        Before:
        target_uri  VARCHAR2(100);

        After:
        target_uri   VARCHAR2(100) := ‘< the MYDEMOBUCKET uri you copied >';

15.	Click the Run Script button.  A message indicating the PL/SQL code completed successfully will appear near the bottom of the screen.

      ![Click Data Load Button](./images/run-move-script.png "")  

16.	Return to Data Load | Oracle Database browser tab.  Click the Actions icon in the MyDemoBucket panel and select Objects from the context menu.

    ![Click Data Load Button](./images/move-data-file1.png "") 

17.	Click the folder icon to confirm that the funding_commitments1.json file in the LOANAPP_FUNDING bucket has been successfully copied here.  

    ![Click Data Load Button](./images/confirm-move-data-file1.png "") 

  Click **Close** to exit.  

## Task 2: Build Initial Table Feed

  1. Navigate to the Data Load | Oracle Database tab.  Select Feed Data.

      ![Click Data Load Button](./images/navigate-to-data-load.png "") 


  2.  Click the **Create Live Table Feed** button to enter the Create Live Feed wizard  
<<<<<<< Updated upstream

      ![Click Data Load Button](./images/open-another-browser-tab.png "") 

  6. Click Data Studio from the Launchpad page.

      ![Click Data Load Button](./images/open-data-studio.png "") 

  7. Select Data Load from the Launchpad page.

      ![Click Data Load Button](./images/select-data-load.png "") 

  8. Then select the Connections tile.

      ![Click Data Load Button](./images/select-connections-tile.png "") 

  9. Select the LOANAPP_FUNDING panel, on the Connections page.

      ![Click Data Load Button](./images/loanapp-funding-panel.png "") 

10.	Copy the source URI for LOANAPP_FUNDING cloud storage to your clipboard

      ![Click Data Load Button](./images/loanapp-funding-uri.png "") 

11.	Return to SQL | Oracle Database Actions browser tab.  Modify the source_uri definition in the SQL Worksheet, following the format shown below:

      ```
      source_uri      VARCHAR2(200) := ' <paste the LOANAPP_FUNDING uri here>';
      ```
12.	Return to the Data Load | Oracle Database browser tab.  Select the MyDemoBucket panel.

      ![Click Data Load Button](./images/mydemobucket-panel.png "")  

13.	Copy the URI for MYDEMOBUCKET cloud storage to your clipboard.  

      ![Click Data Load Button](./images/mydemobucket-uri.png "")  

  Click **Close** to exit.  

14.	Return to SQL | Oracle Database Actions browser tab.  Modify the target_uri definition in the SQL Worksheet, following the format shown below:

      ```
      target_uri      VARCHAR2(200) := ' <paste the MYDEMOBUCKET uri here>';
      ```
  
15.	Click the Run Script button.  A message indicating the PL/SQL code completed successfully will appear near the bottom of the screen.

      ![Click Data Load Button](./images/run-move-script.png "")  

16.	Return to Data Load | Oracle Database browser tab.  Click the Actions icon in the MyDemoBucket panel and select Objects from the context menu.

    ![Click Data Load Button](./images/move-data-file1.png "") 

17.	Click the folder icon to confirm that the funding\_commitments1.json file in the LOANAPP_FUNDING bucket has been successfully copied here.  

    ![Click Data Load Button](./images/confirm-move-data-file1.png "") 

  Click **Close** to exit.  

## Task 2: Build Initial Table Feed

  1. Navigate to the Data Load | Oracle Database tab.  Select Feed Data.

      ![Click Data Load Button](./images/navigate-to-data-load.png "") 


  2.  Click the **Create Live Table Feed** button to enter the Create Live Feed wizard  

  3.  Select desired **Cloud Store location**, then click **Next**  

      ![Live Feed Wizard - step 2](./images/select-cloud-storage-location.png "")  

  3.  Accept the default Table Settings, then click **Next**  

      ![Live Feed Wizard - step 2](./images/live-feed-wizard-step2.png "") 

  4.  Review the information shown on the Preview page, then click **Next**  

      ![Live Feed Wizard - step 3](./images/live-feed-wizard-step3.png "") 

  5. Review the information shown on the Preview page.  

      a. Enter the **Live Table Feed Name**  
      b. Check box to **Enable for Scheduling**.  
      c. Select every **2 minutes** for the polling time interval  

      ![Live Feed Wizard - step 4](./images/live-feed-wizard-step4.png "")  

      Click **Create**  

  6. When the popup box appears, select **Yes** to run the Live Feed.

      ![Run Live Table Feed](./images/run-live-table-feed.png)

  7. **Review** the details for the newly created Live Feed.  

  ![Load Data from Object Storage](./images/task-3-scrn-10.png)

## Learn More

* [The Catalog Tool](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/catalog-entities.html)
* [Autonomous Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/index.html)

## Acknowledgements

* **Authors** - Eddie Ambler, Otis Barr, Matt Kowalik
* **Contributors** - Mike Matthews, Marty Gubar, Francis Regalado, Ramona Magadan
* **Last Updated By/Date** - 04-28-2025

Copyright (C) Oracle Corporation.
