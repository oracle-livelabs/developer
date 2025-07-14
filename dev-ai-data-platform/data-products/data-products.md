# 🛠️ Create and Share Trusted Data Products

## Introduction

At SeersEquities, making smart credit decisions doesn't stop at creating great data—it depends on getting that data into the right hands, fast. The loan team may close deals, but it’s the risk team that needs to evaluate those deals in near real time.

In this lab, you’ll act as a data provider, creating and sharing a data product that includes recently closed loans. You’ll publish this share and authorize a recipient account (used by the risk team) to access it securely.

By the end of this lab, you’ll know how to build, share, and govern data products using Autonomous Database and Object Storage—so SeersEquities can collaborate across teams without duplicating data or compromising security.

Estimated Time: 30 minutes

### Objectives

In this Lab, you will:

* Use a **data provider** account to manage data shares for a **recipient** 

* **Store shared data** in an Object Storage bucket

* **Create and publish** a data share

* **Create and authorize** a data share recipient

### Prerequisites

* **For Share Providers**

    * You have read and write access to an Object Storage bucket for storing or caching shared data (required for versioned shares).

    * The schema you'll use to publish the share has been enabled for Data Sharing by an ADMIN user.

    * You’ve already created a **Cloud Location** to **Publish the Share** (covered in **Discover and View your Database and Data Lake Assets from your Data Catalog**, Task 2).

* **For Share Recipients**

    * The recipient must have a valid email address that the provider can use to register them. Oracle Data Share sends the activation link to this address.

## Task 1: Create Data Product Share

1. Click **View Login Info**. Copy your **DB ADMIN Password**, and click the **SQL Worksheet** link.

   ![Access Data Catalog](./images/start-demo.png "Access Local Data Catalog")  

2. For your Username enter **LOAN**. Paste in the password you copied in the previous step.

   ![Access Local Data Catalog](./images/sql-sign-in.png "Access Local Data Catalog")  

3. From the top menu, select **Data Studio**, then click **Data Share** from the left rail.

   ![Create Data Product Share](./images/select-data-share.png "Create Data Product Share")

4. On the **Provider and Consumer** page, click **Provide Share**.

   ![Create Data Product Share](./images/select-provider-share.png "Create Data Product Share")

5. Click **Provider Identification**.

   ![Define a Data Product Recipient](./images/set-provider-id.png "Define a Data Product Recipient")

6.	In the **Provider Identification** popup, enter the following:

      * **Name:** LoanApp\_Share\_Provider
      * **Email:** myemail@mycompany.com
      * **Description:** Provide a meaningful description

      * Click **Save**.

      ![Define a Data Product Recipient](./images/define-data-product-share-recipient-5.png "Define a Data Product Recipient")

7. Back on the **Provide Share** page, click **Shares**, then click **Create Share** to launch the **Create Share wizard**.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-6.png "Define a Data Product Recipient")

8. On the first page of the wizard, enter:

      *  **Name:** LoanApp\_ShareToRisk
      *  **Description:** Provide a meaningful description

   ![Define a Data Product Recipient](./images/create-share-general-risk.png "Define a Data Product Recipient")

      * Click **Next**.

9. In the **Publish Details** section, select the cloud location for publishing:

      * Select **MyDemoBucket** from the drop-down list.

   ![Create Share](./images/create-share-bucket.png "Define a Data Product Recipient")

      * Click **Next**.

10. On the **Select Tables** page, choose the table to share with the **Risk Department**:

      *  Select the **Share\_Loan\_Data\_Risk\_VW** table in the **Available Tables** column.
      *  Click the **move (>)** button to add it to the **Shared Tables** column

      ![Define a Data Product Recipient](./images/select-items-for-share.png "Define a Data Product Recipient")

      *  Click **Next**.

11. In the **Recipients** section, click **New Recipients**.

   ![Define a Data Product Recipient](./images/define-data-product-share-recipient-10.png "Define a Data Product Recipient")

12. In the **Create Share Recipient** window, enter the following:

    *  **Name:** Risk\_Dept\_Lead  
    *  **Description:** Risk Department Data Engineering Lead
    *  **Email:** risk@mycompany.com

   ![Define a Data Product Recipient](./images/create-share-recipient-risk.png "Define a Data Product Recipient")

    * Click **Create**.

13. Back on the **Create Share** page, select the newly created recipient from the list of recipients.

   ![Define a Data Product Recipient](./images/selectrecipientdrop.png "Define")

14. Click the **Copy** icon to copy the recipient's activation link to your clipboard.

   ![Define a Data Product Recipient](./images/create-risk-recipient.png "Define a Data Product Recipient")

      * Click **Create**.
  
15. Now, publish your share by clicking the **Publish** button from the options menu.

   ![publish Data Product ](./images/publishshare.png "")

16. It's published!

   ![created Data Product ](./images/sharecreated.png "")

17. Paste the activation link you copied earlier into your browser and click **Get Profile Information** to download the recipient profile file (The default name is `delta_share_profile.json`).

   ![Data Product activation link](./images/Paste-activation-link-in-window.png "")

You’ve just **created and published a data product share**—making curated loan data securely available to the Risk team. By defining the share, selecting the right data, and authorizing a recipient, you’ve set up a **governed, reusable pipeline for cross-team collaboration**.

This step is critical for SeersEquities: it ensures the **right data reaches the right teams** at the right time—without duplication, delays, or manual handoffs.

## Task 2: Manage the Data Product Share

1. On the **Provide Share** page, click the **Actions** icon next to your data product share. Select **Recipients and Profiles**.

   ![created Data Product ](./images/manageshare.png "")

2. From here, you can add or remove recipients from the **Recipients and Profiles** page.

      ![Define a Data Product Recipient](./images/manage-data-product-share-risk-3.png "Define a Data Product Recipient")

      Click **Cancel** to proceed to next lab steps.

3. From the **Provide Share** page, click **Recipients** to display the recipients for the data share.

      ![Define a Data Product Recipient](./images/create-risk-dept-recipient.png "Define a Data Product Recipient")

You’ve now successfully shared a governed, ready-to-query dataset from Autonomous Database with the Risk Department Lead—empowering them with the data they need to make informed decisions.

## Conclusion

In this lab, you **created and shared a live, query-ready data product**—giving the Risk team secure, timely access to critical loan insights. You defined the data provider, configured the share, added a recipient, and managed access—all without moving or duplicating data.

At SeersEquities, this means **smoother handoffs, faster risk evaluation, and better cross-team alignment**. For you, it means **mastering a modern data-sharing workflow that’s secure, scalable, and built for collaboration**.

## Acknowledgements
* **Authors** - Eddie Ambler, Otis Barr
* **Last Updated By/Date** - June 2025, Otis Barr

