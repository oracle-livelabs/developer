# 🔍 Discover and View your Database and Data Lake Assets from your Data Catalog

## Introduction

This lab is designed to give the Data Engineer/Architect experience utilizing the **Data Catalog** and **Data Load Connections** tools, to simply access of data that resides inside the database and on cloud object storage.  

To create the loan products issued by the Loan Officer in the demo, the Data Engineer first needed to access external funding data and combine it with Bank business rules to create the end loan products that were sold to customers.  

In this lab, you’ll learn how to find, connect, and use data from **Object Storage** via **Oracle’s Data Catalog** and **Autonomous Database (ADB)**. Follow these steps to set up everything you need for seamless, real-time data access—without jumping through complicated hoops. After these steps, you’ll have a smooth setup that lets you **discover**, **connect**, and **query** data no matter where it lives—in Oracle Database or in Object Storage—giving you a powerful, unified view of all your information. 🌐📊  

Enjoy exploring! 🚀

Estimated Time: 30 minutes

<!-- Comments -->
<!-- liveLabs section starts on line 466 (big monitor) -->
<!-- Comments -->
<!-- Comments -->
<!-- Comments -->

## Task 1: Access Local Data Catalog

First, you’ll log into your Autonomous Database and connect to your local Data Catalog, so you can discover and manage all the data you have access to all from one location.

1. Click **View Login Info**. Copy your DB ADMIN Password and click the **SQL Worksheet** link.

    ![Access Data Catalog](./images/sql-worksheet.png "Access Local Data Catalog")  

2. For your Username enter **LOAN**. Paste in the password you copied in the previous step.

    ![Access Local Data Catalog](./images/sql-sign-in.png "Access Local Data Catalog")  

3. Click on **Data Studio**.  

    ![Access Local Data Catalog](./images/access-local-data-catalog-3.png "Access Local Data Catalog")  

4. Click on **Catalog** on left rail for the **ADB Catalog** to be displayed.  

    ![Access Local Data Catalog](./images/access-local-data-catalog-4.png "Access Local Data Catalog")  

    **Congratulations you can now see your data objects from your Catalog!**  

## Task 2: Add Connections to Catalog for Object Storage Buckets & Data Shares  

🚀 Let’s continue our data discovery journey by visiting how to set up a connection between the Data Catalog and your specific buckets of data and available data shares.  

1. On the left rail of the Database Actions page, select **Data Load**.  

    ![Add Connections to Catalog](./images/select-data-load.png "Add Connections to Catalog")  

2. Then select the **Connections** tile.  

    ![Add Connections to Catalog](./images/add-connections-to-catalog-1.png "Add Connections to Catalog")  

3. On the connections page you will note that this lab already has 4 bucket connections established.  

    ![Add Connections to Catalog](./images/add-connections-to-catalog-2.png "Add Connections to Catalog")  

4. Now Let’s add our own connection for an Object Storage bucket named MyDemoBucket. On the Connections Page, click **Create**. Then select **New Cloud Store Location**.  

    ![Add Connections to Catalog](./images/add-connections-to-catalog-3.png "Add Connections to Catalog")  

5. On the Add Cloud Store Location page displayed:

    - For Name, enter: **MyDemoBucket**  
    - For Description, enter: **My Demo Object Storage Bucket**  
    - For Credential, select **OCI\_API\_KEY_CRED**  
    - Choose the **Select Bucket** radio button  
    - From the DropDown List choose the Bucket Named: **MyDemoBucket**

    ![Add Connections to Catalog](./images/add-connections-to-catalog-4-w-select-bucket.png "Add Connections to Catalog")  

6. Click the **Create** button to proceed.  

    ![Add Connections to Catalog](./images/add-connections-to-catalog-5.png "Add Connections to Catalog")  


7. Congratulations you have successfully added your own object storage connection to the Catalog! 

    ![Add Connections to Catalog](./images/add-connections-to-catalog-6.png "Add Connections to Catalog")  

## Task 3: Search for items discovered by your Catalog  

With our Connections in place, we will explore how to search the catalog for the items you want to see, by selecting what schemas, and what entity types to display  

1. On the left rail, select **Catalog**.  

    ![Search Items in Catalog](./images/search-items-in-catalog-1.png "Search Items in Catalog")  

    >**NOTE** On the landing page, you will note that the Catalog has quick filters to help display the results of your customized searches in the main area. If you do not select a quick filter, the Tables and Views filter is selected by default.  The output of the object shown can be limited to all or a selected schema.  

2. Select the **Connections** quick filter. This displays available connections in the Catalog accessible to the LOAN schema. From here we can validate that our catalog sees the defined connections we made.  Take notice that our MyDemoBucket is displayed.  

    ![Search Items in Catalog](./images/search-items-in-catalog-2.png "Search Items in Catalog")  

3. Select the **Data Objects** quick filter to display available items in the Catalog visible to the LOAN schema. Notice that this view shows us the available database objects and the listing of the files available in our object storage.  

    >**NOTE:** that this view shows us the available database objects and the listing of the files available in our object storage.  These files will be used in upcoming exercises.  

    ![Data Catalog Data Objects](./images/data-catalog-data-objects.png "Data Catalog Data Objects")  

## Task 4: Preview Data in Catalog  

Check out the list of discovered data inside the Catalog. From this view we can see the available files that reside in the Object storage buckets.  

1. Click the preview icon for the file named **LoanAppCustomer_segment.csv**.  

    ![Data Catalog Data Objects](./images/preview-icon.png "Data Catalog Data Objects")  

1. This displays the contents of the file being previewed without needing to first load it into the database.  

    ![Data Catalog CSV preview](./images/data-catalog-csv-preview.png "Data Catalog CSV Preview")  

1. Click on the **Close** button to return to Data Catalog listings  

    **Congratulations you have successfully previewed the contents of your Object Storage Data!**  

    **You may now proceed to the next lab.**  

## Learn More

* [Get Started with Data Catalog](https://docs.oracle.com/en-us/iaas/data-catalog/using/index.htm)
* [Data Catalog Overview](https://docs.oracle.com/en-us/iaas/data-catalog/using/overview.htm)
* [Oracle Cloud Infrastructure Documentation](https://docs.cloud.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
* [What Is a Data Catalog and Why Do You Need One?](https://www.oracle.com/big-data/what-is-a-data-catalog/)
* [Harvesting Object Storage Files as Logical Data Entities](https://docs.oracle.com/en-us/iaas/data-catalog/using/logical-entities.htm)

## Acknowledgements

* **Author:** Eddie Ambler, Otis Barr
* **Contributors:** Mike Matthews, Marty Gubar, Matt Kowalik, Kamryn Vinson
* **Last Updated By/Date:** Kamryn Vinson, June 2025