# 🛠️ Create and Share Data Products

## Introduction

In this lab, we will create and share data products that includes information on recently closed loans.  You will also create a new data share recipient that will have access to this data share.

Finally, you will publish the data share and send the recipient the activation link needed to access the data share.

In this Lab, you will:

* Utilize a data share provider account (**LOAN user**) that logs in and manages the data shares for the recipients of the data share (**RISK and MARKETING users**)
* Leverage an Object Storage bucket to store the shared data - **MyDemoBucket**
* Create and publish data shares - **LoanApp\_ShareToMarketing & LoanApp\_ShareToRisk**
* Create and authorize a data share recipient

### Prerequisites

* **Prerequisites for Share Providers to use the share tool:**
      * For a versioned share, you must have **read and write access to a bucket** to store or cache your shares.
      * The schema you wish to use to create and publish shares must be **enabled for Data Sharing by an ADMIN user.**
      * You should have completed the creation a Cloud Location to Publish Share (Lab 3 task 2)

* **Prerequisites for Share Recipients**
      * The share recipient must have a **valid email address** a provider can use to register the recipient to use the share tool. Oracle Data Share allows you to share the recipient's activation link by email.

## Task 1: Create Data Product Share

   >**NOTE:** If continuing from lab 4, click on **Database Actions** link and skip to step 6.

   1. Navigate to your Assigned ADB Instance

      * Open Navigation Menu
      * Select Oracle Database
      * Select Autonomous Database

   ![Navigate to Autonomous Database in OCI](./images/navigate-to-adb.png)

   2. Select the name of your assigned database.

   ![Navigate to Autonomous Database in OCI](./images/oci-adb-select.png)

   3. Select **Database Actions** then View all database actions.

   ![Create Data Product Share](./images/task1-scrn-3.png "Create Data Product Share")

   4. Sign-out of **Database Actions Launchpad** as ADMIN user.

   ![Create Data Product Share](./images/task1-scrn-4.png "Create Data Product Share")

   5.	On the **Database Actions Launchpad**, click the user icon in the top right
   Corner.  Select **Sign Off** from the drop-down options. Enter credentials in the popup window shown below, to login as the LOAN user.
   
   >**NOTE:** Use the same **ADMIN** password as shown on View Lab Info page

      ![Create Data Product Share](./images/task1-scrn-5.png "Create Data Product Share")

      * Enter LOAN user credentials. 
      * Press Sign-In button. 

   6. Select Data Studio from the menu bar. Then, choose Data Share from the left rail.

      ![Create Data Product Share](./images/select-data-share.png "Create Data Product Share")

   7. Click Provide Share on the Provider and Consumer page. 

      ![Create Data Product Share](./images/select-provider-share.png "Create Data Product Share")

   8. Click **Provider Identification** on the **Provide Share** page.

      ![Define a Data Product Recipient](./images/set-provider-id.png "Define a Data Product Recipient")

   9.	Enter the details below for the provider, in the **Provider Identification** popup window.

   ! [Define a Data Product Recipient](./images/define-data-product-share-recipient-5.png "Define a Data Product Recipient")

      * **Enter the following:**
         * **Name:** LoanApp\_Share\_Provider
         * **Email:** MyEmail@MyCompany.com
         * **Description:** a meaningful description is required

      * Click **Save**.

   10. Click **Shares** on the **Provide Share** page, to begin entering details for the new share.  Then, click the Create Share button to launch the Create Share wizard screen.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-6.png "Define a Data Product Recipient")

   11.	On the first page of the **Create Share** wizard, enter the following:

      * Enter the following:
         *  **Name:** LoanApp\_ShareToRisk
         *  **Description:** a meaningful description

   ![Define a Data Product Recipient](./images/create-share-general-risk.png "Define a Data Product Recipient")

      * Click **Next**.

   12. In the **Publish Details section of the wizard,** specify the cloud location where the share will be published.

      * Select **MyDemoBucket** from the drop-down list.

   ![Create Share](./images/create-share-bucket.png "Define a Data Product Recipient")

      * Click **Next**.

   13. Choose the table (or view) that will be made available for the Risk Department (via the Share) on the **Select Tables** page.

   ![Define a Data Product Recipient](./images/create-share-select-table-risk.png "Define a Data Product Recipient")

      *  Select the **Share\_Loan\_Data\_Risk\_VW** table in the Available Tables column.
      *  Click the **move (>)** button to list it to the Shared Tables column

   ![Define a Data Product Recipient](./images/select-items-for-share.png "Define a Data Product Recipient")

      *  Click **Next**.

   14. In Recipients section of wizard, Click on **New Recipients** button.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-10.png "Define a Data Product Recipient")

   15. In the **Create Share Recipient** window that is displayed, enter the recipient details.

      <u>** * Enter the following:** </u>  
         *  **Name:** Risk\_Dept\_Lead  
         *  **Description:** Risk Department Data Engineering Lead (optional)  
         *  **Email:** a description (optional)  

   ![Define a Data Product Recipient](./images/create-share-recipient-risk.png "Define a Data Product Recipient")

      * Click **Create**.

   16. On the **Create Share** page, Click on the **copy** icon to capture the recipient’s profile activation link to the clipboard. 

   ![Define a Data Product Recipient](./images/create-risk-recipient.png "Define a Data Product Recipient")

      * Click **Create**.

   17. Paste activation link URL in browser window.

   ![Define a Data Product Recipient](./images/paste-activation-link-in-window.png "Define a Data Product Recipient")

   18. Click on **Get Profile Information** to invoke download.

   19. Rename file to **Risk\_Delta\_Share\_Profile.json**.

## Task 2: Manage the Data Product Share

   1. On the **Provide Share** page, click **action** icon to manage the data product share.

      ![Define a Data Product Recipient](./images/manage-data-product-share-risk-1.png "Define a Data Product Recipient")

   2. Select **Recipients and Profiles** from the dropdown menu.

      ![Define a Data Product Recipient](./images/manage-data-product-share-risk-2.png "Define a Data Product Recipient")

   3. From here, you can add or remove recipients from the **Recipients and Profiles** page.

      ![Define a Data Product Recipient](./images/manage-data-product-share-risk-3.png "Define a Data Product Recipient")

      Click **Cancel** to proceed to next lab steps.

   4. From the **Provide Share** page, click **Recipients** to display the recipients for the data share.

      ![Define a Data Product Recipient](./images/create-risk-dept-recipient.png "Define a Data Product Recipient")

   ***Congratulations you have shared your data from ADB to the Risk Dept Lead.***  

## Acknowledgements
* **Authors** - Eddie Ambler, Otis Barr
* **Contributors** - Mike Matthews, Marty Gubar, Francis Regalado
* **Last Updated By/Date** - 04-28-2025
Copyright (C) Oracle Corporation.
