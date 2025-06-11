# Load, Link, and Query Object Storage Data from Autonomous Database

## Introduction

This lab is designed to give the Data Engineer/Architect experience utilizing the **Data Load** tools, to gain access to data that resides inside the database on cloud object storage.  

This lab will give you the skills to load, link, and query object storage data directly from your **Autonomous Database** instance.  

You'll learn how to make object storage data locally available for performance optimization or cost reduction while maintaining flexibility for real-time analytics.  

Using **Oracle Data Catalog**, you'll link object storage data to your database and create external tables that allow direct querying without time-consuming transfers.  

Finally, you'll run cross-source queries that combine structured database tables with object storage data to deliver a unified view of financial insights.

By the end of this lab, you will:

   * ***Load Data:*** Understand how to move object storage data into tables in your Autonomous Database when required for improved performance, persistence, or cost savings.

   * ***Link Data:*** Use Oracle Data Catalog to connect object storage assets to your database.

   * ***Query Database & Object Storage Data:*** Query object storage data directly and combine it with data in database tables for unified analytics.

## Task 1: Load Object Storage Data into Autonomous Database using Data Catalog

> **NOTE:** If continuing from lab 3, skip to step 8.

   1. Navigate to your Assigned ADB Instance

    * Open Navigation Menu
    * Select Oracle Database
    * Select Autonomous Database

   ![Navigate to Autonomous Database in OCI](./images/navigate-to-adb.png " ")

   2. Select the name of your assigned database.

   ![Navigate to Autonomous Database in OCI](./images/oci-adb-select.png " ")

   3. Select **Database Actions** then View all database actions.

   ![Create Data Product Share](./images/task1-scrn-3.png "Create Data Product Share")

   4. Logon as the **LOAN** user.
   
      * On the **Database Actions Launchpad**, click the user icon in the top right corner.  Select **Sign Off** from the drop-down options.  

      ![Create Data Product Share](./images/task1-scrn-4.png "Create Data Product Share")

      *  Enter credentials in the popup window below to login as the **LOAN** user.

      >**NOTE:** Use the same **ADMIN** password as shown on View Lab Info page

      ![Create Data Product Share](./images/task1-scrn-5.png "Create Data Product Share")

      🔘 Click **Sign in** button.

   1. Select **Data Studio** from the tab menu, then select **Catalog** from the left rail.

      🔘 The **Catalog** page is displayed with the **Tables and Views** tab highlighted.

      ![Create Data Product Share](./images/task1-scrn-7.png "Create Data Product Share")

   1. Click on the **Data Objects** tab at the top of the **Catalog** page,  to view the contents of the object storage buckets.

      🔘 Select **LoanApp Customer-extention.csv** from the list, this will take you to the **Cloud Object Entity** page.

      ![Create Data Product Share](./images/task1-scrn-8.png "Create Data Product Share")

   1. Select the **Load to Table** button and the **Load Data** page will appear. 

      ![Create Data Product Share](./images/task1-scrn-9.png "Create Data Product Share")  

   1. Click **Edit (pencil)** icon, in the lower right corner.  

      ![Create Data Product Share](./images/task1-scrn-10.png "Create Data Product Share")  

   1. Enter details on the following screen for the data load.  
   
      🔘 In the table section, select **Create Table** from the list of options displayed.  

      ![Create Data Product Share](./images/task1-scrn-11.png "Create Data Product Share")  

      🔘 Enter **Customer_Extention** for the name of the table.  

      ![Create Data Product Share](./images/task1-scrn-12.png "Create Data Product Share")  

      🔘 Click **Close** button.  

   1. Click the **Start** button on the **Data Load** page.  

      ![Create Data Product Share](./images/task1-scrn-13.png "Create Data Product Share")  

   1. Click the **Run** button in the popup window, to start a job that loads data from the Cloud Store.  

   1. The table will appear on the **Table and View Loads** page, once the job is completes.  
 
      🔘 To generate a report and review the SQL used for the job, click on the **Report** button.  

      ![Create Data Product Share](./images/task1-scrn-14.png "Create Data Product Share")  

   1. Click the **Close** button when finished.  

      ![Create Data Product Share](./images/task1-scrn-15.png "Create Data Product Share")  

   1. To review details about the data in the table using SQL Worksheet, click on the **Query** button.  

      ![Create Data Product Share](./images/task1-scrn-16.png "Create Data Product Share")  

   1. The **SQL Worksheet** will appear with the query pre-loaded, the query results available and an analysis of the data set.  

      ![Create Data Product Share](./images/task1-scrn-17.png "Create Data Product Share")  

   1. Select **Catalog** from the left rail rail and take note that the **Customer_Extension** table now appears in the Catalog.

      ![Create Data Product Share](./images/task1-scrn-18.png "Create Data Product Share")

   ***Congratulations you have now loaded your Object Storage discovered in your catalog data into your ADB.***

## Task 2: Link Object Storage Data from Data Catalog to ADB.

   1. From the Data Catalog page with Data Objects selected.

      🔘 Make sure the Cloud Object filter is selected, then select **LoanAppCustomer-segments.csv** from the list for the Cloud Object Entity page.

      ![Create Data Product Share](./images/task2-scrn-1a.png "Create Data Product Share")

   2. Select the Link to Table button and the Load Data page will appear.

   ![Create Data Product Share](./images/task2-scrn-10a.png "Create Data Product Share")

   3. Click the **Edit (pencil)** icon, in the lower right corner.

   ![Create Data Product Share](./images/task2-scrn-10b.png "Create Data Product Share")

   4. In the table section, select **Create External Table** from the list of options.

   ![Create Data Product Share](./images/task2-scrn-11.png "Create Data Product Share")

   5. Enter the name **Customer_Segment** for the table.  Click **Close** button.

   ![Create Data Product Share](./images/task2-scrn-12.png "Create Data Product Share")

   6. Click the **Start** button on the **Link Data** page.

   ![Create Data Product Share](./images/task2-scrn-12a.png "Create Data Product Share")

   7. Click the **Run** button in the popup window, to start a job that loads data from the Cloud Store.

   ![Create Data Product Share](./images/task2-scrn-13.png "Create Data Product Share")

   8. The table will appear on the **Table and View Loads** page, once the job is completes.

   ![Create Data Product Share](./images/task2-scrn-14.png "Create Data Product Share")

   9.	To review details about the data in the table using SQL Worksheet, click on the **Query** button.

   ![Create Data Product Share](./images/task2-scrn-17.png "Create Data Product Share")

   ***Congratulations you have now Linked your Object Storage discovered in your catalog and can query it from your ADB..***

## Task 3: Query Data in Object Storage and ADB Database.

   1.	Click Database Actions in the banner to display the Launchpad page. Click the **Development** tab, and then click the **SQL** tab to display the SQL Worksheet

  ![Query Data in Object Storage](./images/task3-scrn-1.png "Query Data in Object Storage")

   2.	Let's query the CUSTOMER_EXTENSION table. Copy and paste the following code into your SQL Worksheet, and then click the Run Statement icon in the Worksheet toolbar.

      ```
      <copy>
      select * from CUSTOMER_EXTENSION e;
      </copy>
      ```

   The output shows information about customers.

  ![Query Data in Object Storage](./images/task3-scrn-2.png "Query Data in Object Storage")

   3.	Let's query the CUSTOMER_SEGMENTS external table. In the SQL Worksheet, copy and paste the following code into your SQL Worksheet to query the data, and then click the Run Statement icon in the Worksheet toolbar.

      ```
      <copy>
     select * from CUSTOMER_SEGMENT s;
      </copy>
      ```

   The output shows defined customer segments.

  ![Query Data in Object Storage](./images/task3-scrn-3.png "Query Data in Object Storage")

   4.	Create a join combining data from the CUSTOMER_EXTENSION table with data a then click the Run Statement icon in the Worksheet toolbar.

      ```
      <copy>
        select cust_id, first_name, last_name, s.name segment
         from loan.customer_extension e,
               loan.customer_segment  s
         where e.segment_id = s.segment_id;
      </copy>
      ```

   The output shows combined customer information.

  ![Query Data in Object Storage](./images/task3-scrn-4a.png "Query Data in Object Storage")


   ***Congratulations you have now combined data stored in Object Storage with data stored in the ADB database.***

## Acknowledgements
* **Authors** - Eddie Ambler, Otis Barr
* **Contributors** - Mike Matthews, Marty Gubar
* **Last Updated By/Date** - 04-28-2025
