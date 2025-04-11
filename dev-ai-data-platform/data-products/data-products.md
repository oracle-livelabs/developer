# 🛠️ Create and Share Data Products

## Introduction

In this lab, as a share provider, you will create a data share and add a table to it. Next, you will create a new recipient that will have access to this data share.

Finally, you will publish the data share and send the recipient the activation link needed to access the data share.

In this Lab, you will:

* Utilize a data share provider account (**LOAN user**) that logs in and manages the data shares for the recipients of the data share (**RISK and MARKETING users**)
* Leverage an Object Storage bucket to store the shared data - **MySharedBucket**
* Create and publish data shares - **LoanAppShare2Marketing** & **LoanAppShare2Risk**
* Create and authorize a data share recipient

### Prerequisites

* An Oracle account

* **Prerequisites for Share Providers to use the share tool:**
      * For a versioned share, you must have **read and write access to a bucket** to store or cache your shares.
      * The schema you wish to use to create and publish shares must be **enabled by an ADMIN user**.

* **Prerequisites for Share Recipients**
      * The share recipient must have a **valid email address** a provider can use to register the recipient to use the share tool. Oracle Data Share allows you to share the recipient's activation link by email.

## Task 1: Create Data Product Share

1. Begin on the **Database Actions Launchpad** while logged on as the **ADMIN** user.

   ![Create Data Product Share](./images/create-data-product-share-1.png "Create Data Product Share")

   * Select **Data Studio** from the menu bar
   * Choose **Data Share** from the navigation tree.

1. From the **Provider and Consumer** page, click the **Enable Sharing** icon.

   ![Create Data Product Share](./images/create-data-product-share-2.png "Create Data Product Share")

1. Select the user schemas that will be included in the data product share, in the **Enable Sharing** popup window.

   ![Create Data Product Share](./images/create-data-product-share-3.png "Create Data Product Share")

   * Select user schema listed in the Available Schemas column.
   * Click ">" button to place it in the Selected Schemas column.
   * Click **Save**.

1. On the **Database Actions Launchpad**, click the user icon in the top right corner.

   ![Create Data Product Share](./images/create-data-product-share-1a.png "Create Data Product Share")

   Log out as the **ADMIN** user.

## Task 2: Define a New Recipient for the Data Product Share

1. From the **Database Actions Launchpad**, click the user icon in the top right corner to sign-on as the LOAN user.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-1.png "Define a Data Product Recipient")

   * Enter LOAN user credentials into **Sign-In** page.
   * Press **Sign-In** button.

1. Select **Data Studio** from the menu bar.  Then, choose **Data Share** from the navigation tree.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-2.png "Define a Data Product Recipient")

1. Click **Provider Share** on the **Provider and Consumer** page.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-3.png "Define a Data Product Recipient")

1. Click **Provider Identification** on the **Provide Share** page.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-4.png "Define a Data Product Recipient")
1. Provide details for the provider in the **Provider Identification** popup window.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-5.png "Define a Data Product Recipient")

   * Enter the following:
      * **Name:** LoanApp_Share_Provider
      * **Email:** MyEmail@MyCompany.com
      * **Description:** a meaningful description is required
   * Click **Save**.
1. Click **Share** on the **Provide Share** page, to begin entering details for the new share.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-6.png "Define a Data Product Recipient")

1. The **General** page of the **Create Share** wizard will appear.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-7.png "Define a Data Product Recipient")

   * Enter the following:
      *  **Name:** LoanApp_Share2Marketing
      *  **Description:** a description (optional)
   * Click **Next**.

1. Specify where the share will be published on the **Publish Details** page.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-8.png "Define a Data Product Recipient")

   * Select **DemoSharesBucket** from the drop-down list.
   * Click **Next**.

1. Choose table that will be made available for the Risk Department (via the Share) on the **Select Tables** page.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-9.png "Define a Data Product Recipient")

   * Select the **Clients_To_Loan** table in the Available Tables column.
   * Click the ">" button to list it to the Shared Tables column
   * Click **Next**.
1. There are no recipients are available, click **New Recipent** to create a new one on the **Recipients** page.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-10.png "Define a Data Product Recipient")

1. Define the recipient in the **Create Share Recipient** popup window.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-11.png "Define a Data Product Recipient")

   * Enter the following:
      *  **Name:** Marketing_Dept_Lead
      *  **Description:** a description (optional)
      *  **Email:** a description (optional)
   * Click **Create**.

1. Click the **copy** icon to capture the profile activation link, sending it to the clipboard for the recipient.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-12.png "Define a Data Product Recipient")

   Click **Cancel**.

## Task 3: Manage the Data Product Share

1. On the **Provide Share** page, click **action** icon to manage the data product share.

   ![Define a Data Product Recipient](./images/manage-data-product-share-1.png "Define a Data Product Recipient")

1. Select **Recipients and Profiles** from the dropdown menu.

   ![Define a Data Product Recipient](./images/manage-data-product-share-2.png "Define a Data Product Recipient")

1. Add or remove recipients from the **Recipients and Profiles** page.

   ![Define a Data Product Recipient](./images/manage-data-product-share-3.png "Define a Data Product Recipient")

   Click **Cancel**.

1. From the **Provide Share** page, click **Recipients** to display the recipients for the data share.

   ![Define a Data Product Recipient](./images/manage-data-product-share-4.png "Define a Data Product Recipient")

**Congratulations you have shared your data from ADB to the Marketing Dept Lead.**
#
## Acknowledgements
* **Authors** - Matt Kowalik, Otis Barr
* **Contributors** - Eddie Ambler, Ramona Magadan
* **Last Updated By/Date** - TBC

Copyright (C) Oracle Corporation.
