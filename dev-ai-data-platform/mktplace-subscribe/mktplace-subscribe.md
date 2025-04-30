# 🛒 Subscribe to Data Products via Data Share Tool

#### Estimated Lab Time: 30 minutes

## Introduction

In this lab, you’ll learn how to **subscribe** to data products published via the **Data Share tool**. Subscribing works like **“following”** a channel, ensuring you receive the **latest updates*(*()) as new information becomes available.

By the end of this lab, you’ll understand how the **Data Share** tool enables teams to easily **access customized data products**, keeping everyone aligned and ready to act on **up-to-date information.**

### Prerequisites

* Requires Completion of Lab 5

## Task 1: Subscribe to Data Product Share as RISK user.

> **Note:** If continuing from lab 5, click on Data Share in bread crumb link and skip to step 4. 

1. Navigate to your assigned ADB Instance.

    * Open Navigation Menu
    * Select Oracle Database
    * Select Autonomous Database

   ![Navigate to Autonomous Database in OCI](./images/navigate-to-adb.png " ")

2. Select the name of your assigned database.

   ![Navigate to Autonomous Database in OCI](./images/oci-adb-select.png " ")

3. Select **Database Actions**, then **View All Database Actions**

   ![Create Data Product Share](./images/subscribe-to-data-share-3.png "Create Data Product Share")

4. Sign-out of **Database Actions Launchpad** as ADMIN user.

   ![Create Data Product Share](./images/subscribe-to-data-share-4.png "Create Data Product Share")

5. Sign-on to **Data Studio** as RISK user.***(See View Login Info Page for Password)***

   ![Create Data Product Share](./images/subscribe-to-data-share-5.png "Create Data Product Share")

6. At the **Database Actions Launchpad**, click **Data Studio**.

   ![Create Data Product Share](./images/subscribe-to-data-share-6.png "Create Data Product Share")

7. On the **Data Share** age, click on the left rail.

    ![Create Data Product Share](./images/subscribe-to-data-share-7.png "Create Data Product Share")

8. Click on **Consume Share** on the **Provider and Consumer** page.

   ![Create Data Product Share](./images/subscribe-to-data-share-8.png "Create Data Product Share")

9. On the Consume Share Page:

   * Click on **Subscribe to Share Provider** dropdown button
   * Select **Subscribe to Delta Share Provider** from the drop-down list

  ![Create Data Product Share](./images/subscribe-to-delta-share-provider.png "Create Data Product Share")

10. This will cause the **Subscribe to Share Provider** wizard will be displayed.

   <u>** * On the page, do the following:**</u>

      * **Share Source:** Accept the default selection: **Delta Share Provider JSON.**
      * **Share Provider JSON:** Accept the default selection: **From File.**
      * **Delta Share Profile JSON:** Click this box. In the Open dialog box, navigate to the location where you downloaded the data share profile named **RISK_Delta_Share_Profile.json**, select it, and then click Open.
      * **Provider Name:** enter **LoanApp_Share_Provider**
      * **Description:** enter **Subscribing to data share of closed mortgage loan details for risk analysis**

   * Click on Next to proceed

11. This will cause the **Add Shares** screen to appear.

* Select the LoanApp_ShareToRisk share in the Available Shares column.

  ![Create Data Product Share](./images/subscribe-to-share-provider.png "Create Data Product Share")

12. Click ">" button to move the share into the Selected Shares column.

  ![Create Data Product Share](./images/subscribe-to-share-provider-2.png "Create Data Product Share")

* Click on Subscribe to proceed.

## Task 2: Link Data: Create External Tables to Data Share

1.	On the Link Data page **select drop-down list**for Select Cloud Store Location or enter a public URL.
2.	Select the **LoanApp_Share_Provider.**

  ![Create Data Product Share](./images/select-shared-data.png "Create Data Product Share")

3.	Expand the drill down tab for the share named **LoanApp_Share_Provider** to display the available data.
4.	Now Let's create an external table based on the **LOAN.Shared_Loan_Data_Risk_VW** file by dragging and dropping this file onto the data linking job section.

  ![Create Data Product Share](./images/select-shared-data-2.png "Create Data Product Share")

   * This causes the external table to be created is displayed in the data linking job section.

  ![Create Data Product Share](./images/select-shared-data-3.png "Create Data Product Share")

5.	Click on the **Settings** (pencil Icon) to display the Link Data from Cloud Store Location panel. You can use the various tabs listed on the left rail to perform actions like change the name of the external table name to be created, view the table's properties, view the table's data, view the SQL code used to create the table and more.

   * Edit Table Name to be **Shared_Loan_Data_Risk**

  ![Create Data Product Share](./images/select-shared-data-4.png "Create Data Product Share")

   *  Click **Close** to proceed

6.	Click **Start**
7.	On the popup box that appears click **Run**

  ![Create Data Product Share](./images/select-shared-data-5.png "Create Data Product Share")

8.	After the link job is completed, make sure that the data link card has the link icon next to it.

  ![Create Data Product Share](./images/select-shared-data-6.png "Create Data Product Share")

## Task 3: Validate ADB Access to Object Storage Data

   1.	Click the Report button for this link job to view a report of the total rows processed successfully and failed for the selected table and the SQL used.

   * Click **Close** when done.

  ![Create Data Product Share](./images/select-shared-data-1a.png "Create Data Product Share")

    2.  In the **Table and View Loads** section:

      * Click the external table link named **Shared_Loan_Data_Risk** to preview its data.

      Remember, that the source data for this external table is from the **Shared_Loan_Data_Risk_VW** data share.

 ![Create Data Product Share](./images/select-shared-data-2a.png "Create Data Product Share")

   The **Shared_Loan_Data_Risk_VW** panel is displayed with the **Preview** tab selected by default that displays the external table's data.

  ![Create Data Product Share](./images/select-shared-data-3a.png "Create Data Product Share")

   2.	Click **Close** to exit the panel and to return to the Data Share Dashboard.
   3.	Click on **Query** button to run a query from ADB against the Linked Shared Data

  ![Create Data Product Share](./images/select-shared-data-4a.png "Create Data Product Share")

  ![Create Data Product Share](./images/select-shared-data-5a.png "Create Data Product Share")

***Congratulations you have now subscribed to the data shared with you from ADB via Data Share and confirmed you can query the data.***

## Learn More

* [Get Started with Data Catalog](https://docs.oracle.com/en-us/iaas/data-catalog/using/index.htm)
* [Data Catalog Overview](https://docs.oracle.com/en-us/iaas/data-catalog/using/overview.htm)
* [Oracle Cloud Infrastructure Documentation](https://docs.cloud.oracle.com/en-us/iaas/Content/GSG/Concepts/baremetalintro.htm)
* [What Is a Data Catalog and Why Do You Need One?](https://www.oracle.com/big-data/what-is-a-data-catalog/)
* [Harvesting Object Storage Files as Logical Data Entities](https://docs.oracle.com/en-us/iaas/data-catalog/using/logical-entities.htm)

## Acknowledgements
* **Authors** -  Eddie Ambler, Otis Barr
* **Contributors** - Mike Matthews, Marty Gubar, Matt Kowalik, Ramona Magadan
* **Last Updated By/Date** - 04-28-2025

Copyright (C) Oracle Corporation.
