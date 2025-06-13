# 🏗️ Build your Data Pipeline: Load & Transform Data (optional lab)

## Introduction

As SeerEquities scales its lending operations, speed is becoming a competitive edge. Executives want delinquency alerts as they happen, risk teams want real-time updates on loan applications, and data analysts want to eliminate the delays caused by batch pipelines.

But SeerEquities’ current approach—periodic data loads and manual triggers—can’t keep up. Delays in data ingestion mean missed insights and late decisions.

**That’s where live feeds come in**. In this lab, you’ll bring SeerEquities one step closer to a real-time data ecosystem by enabling continuous data ingestion using Oracle’s event-driven architecture. As new data lands in cloud object storage, it will flow automatically into the Autonomous Database—no waiting, no manual refreshes.

By implementing this live feed, you're not just optimizing a pipeline—you’re unlocking faster reporting, proactive fraud detection, and just-in-time decision making. It’s a vital step in transforming SeerEquities’ data platform from reactive to real-time.

Estimated Time: 45 minutes

### Objectives

* Set up a Notifications Service Topic to receive event messages from Object Storage

* Create an Event Service Rule that monitors new object uploads

* Configure a Live Feed-enabled load job that triggers on new data

* Automate ingestion of new files from cloud object storage into the database

* Enable continuous, real-time data availability for downstream analytics and reporting


> **NOTE:** To complete this lab, you will alternate between **Oracle Cloud Infrastructure Console** pages and **Oracle Database Actions** pages. Selecting **Database Actions** will open a new tab.


## Task 1: Create a Notifications Service Subscription Topic

  1. First we will have to access OCI. Right above the workshop instruction you will find **View Login Info**.  

  ![Click View Login Info](./images/view-login-info.png)

  2. Click **View Login Info** to see detailed reservation information such as user and password. Click **Launch OCI**  

  ![Click On OCI](./images/launch-oci.png)

  3. Follow the instructions provided to log in to your Oracle Cloud account, change your password, if prompted, and complete your login to Oracle Cloud.  

   a. Check the tenancy. If it is different, click on change tenancy.

  ![Check Tenancy](./images/check-tenancy2.png)

   b. Add the user name and the password from the reservation information.

  ![CheckUserPassword](./images/user-password.png)

   c. Change the password, then click on Reset Password.

  ![Password](./images/change-password.png)

  4. Congratulations! You are now connected to an Oracle Cloud Infrastructure tenancy. You can now execute the different tasks and steps in this LiveLabs workshop.

  ![RedwoodOCIConsole](./images/redwood-oci-console.png)

  5. Now, let's navigate to **Developer Services**. Click on the **hamburger menu** on the top left.

  ![HamburgerMenuOCI](./images/hamburger-menu-oci-console.png)

  6. Select **Developer Services** from the Navigation Menu  

  ![Click Developer Service](./images/task-1-scrn-2.png)

  7. Click **Notifications** under the **Application Integration** heading.

  ![Click Notifications](./images/task-1-scrn-3.png)

  8. Click **Create Topic**

  ![Click Create Topic](./images/task-1-scrn-4.png)

  9. You can use the values below, or plug in your own. Just make sure to remember what you choose—you’ll need it again later in the lab!
  
  * **Name**: Live\_Feed\_for_Funding  
  * **Description**: This is to demo LiveFeed for Funding as a topic.  
  
  Click the **Create** button.

  ![Create Topic](./images/topic-livefeed.png)

You’ve now successfully created a Notification Service topic—laying the foundation for event-driven data pipelines. Next, you’ll define the Events Service rule to detect when new data arrives and trigger the live feed automatically.

## Task 2: Create a Events Service Rule.

1. Open the **Navigation Menu** Click the icon in the upper left corner to 

  ![Click Navigation Menu](./images/task-2-scrn-1.png)

2. Select **Observations & Management** from the Navigation Menu

  ![Select O&M](./images/task-2-scrn-2.png)

3. Click **Rules** under the **Events Services** heading.

  ![Select Rules](./images/task-2-scrn-3.png)

4. Click **Create Rule** and enter details.

  ![Create Rule](./images/lab7-task2-step4.png)

5. Enter Rule details.

  ![Create Rule](./images/task-2-scrn-5.png)

    * Enter the following Details under **Rule Conditions**:
         * **Condition:** Event Type
         * **Service Name:** Object Storage
         * **Event Type:** Object – Create
         * **Action Type:** Notifications

    * Click **Create Rule**.

## Task 3: Create a Live Table Feed and Copy the notification URL

1. Click **View Login Info**. Click the **SQL Worksheet** link.

    ![Access Data Catalog](./images/sql-worksheet.png "Access Local Data Catalog")   

    >**NOTE:** Use the same **ADMIN** password as shown on View Lab Info page

    ![Create Data Product Share](./images/task1-scrn-5.png "Create Data Product Share")

    \* Enter LOAN user credentials.  
    \* Press Sign-In button.  

5. Select **Feed Data** from the options listed at top of page.

  ![Select Feed Data](./images/task-3-scrn-3.png)

6. Click the **Create Live Table Feed** button to enter the **Create Live Feed** wizard.

  ![Create Live Feed](./images/task-3-scrn-4.png)

7. Select desired Cloud Store location, then click **Next**.

      ![SElect Cloud Store Location](./images/task-3-scrn-5.png)

8. Enter desired Table Settings, then click **Next**.

  ![Load Data from Object Storage](./images/task-3-scrn-6a.png)

9. Review the information shown on the Preview page, then click **Next**.

  ![Load Data from Object Storage](./images/task-3-scrn-7.png)

10. Complete the creation of the Live Table Feed 
  
  \* Take the following actions \...
    \* Enter the **Live Table Feed Name:**
    \* Check box to **Enable for Notification**
    \* Uncheck box to **Enable for Scheduling**
  \* Click **Create**

  ![Load Data from Object Storage](./images/task-3-scrn-8.png)

11. When the popup box appears, select **Yes** to run the Live Feed.

  ![Load Data from Object Storage](./images/task-3-scrn-9.png)

12. **Review** the details for the newly created Live Feed.  Then click the hamburger button in the upper right corner of the panel.

  ![Load Data from Object Storage](./images/task-3-scrn-10.png)

13. Select **Show Notification URL** from the dropdown list.

  ![Load Data from Object Storage](./images/task-3-scrn-11.png)

14. Copy the notification URL for the live table feed and click OK to proceed to next task.

  ![Load Data from Object Storage](./images/task-3-scrn-12.png)

  >**NOTE:** The notification URL will be used later in Task #4.

## Task 4: Create a Notifications Service Subscription

  1. Click on the **Navigation Menu**, then select **Developer Services**.

  ![Access the Object Storage Bucket](./images/task-1-scrn-2.png)

  2. Click **Notifications** under the **Application Integration** heading.

  ![Access the Object Storage Bucket](./images/task-1-scrn-3.png)

  3. Select **Subscriptions** (on the left side of the page, just below Topics).  The status will be **Active**.

  ![Access the Object Storage Bucket](./images/lab7-task4-step3.png)

  4. Click **Create Subscription**.

  5. Enter the Subscription details.

  ![Access the Object Storage Bucket](./images/lab7-task4-step5.png)

    * Provide the following:
    * **Subscription topic:** Select the subscription topic you created in Task 2
    * **Protocol:** Email
    * **URL** Paste in the URL you copied in Task 3

    * Click **Create**

  6. Switch to the Database Actions tab to review the card for the live table feed you are configuring for a notification-based feed.  It should reflect an **Active** notification status..

  ![Load Data from Object Storage](./images/task-5-scrn-4.png)

  * You will receive email notifications when specific live feed events occur and any new files uploaded to the bucket will automatically be loaded into the live feed table.

## Learn More

* [The Catalog Tool](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/catalog-entities.html)
* [Autonomous Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/index.html)

## Acknowledgements

* **Authors** - Eddie Ambler, Otis Barr, Matt Kowalik
* **Contributors** - Mike Matthews, Marty Gubar, Francis Regalado, Ramona Magadan
* **Last Updated By/Date** - 04-28-2025

Copyright (C) Oracle Corporation.
