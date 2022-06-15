# Stage and Publish an Oracle Visual Builder Web Application

## Introduction

This lab shows you how to stage and publish your web app.

Estimated Time:  10 minutes

### About this lab

So far in this workshop, you've built the HR web application to show employees, their departments, and locations. Now that your work designing the app is more or less complete, you can stage it to allow team members to test it thoroughly. After testing is complete, you can publish the application and make it available to users.

Visual Builder provides different databases for the development, staging, and live phases of an application. You can use an empty database for the staging or live phase, you can transfer data from one to another, or you can import specific data for each.

This lab shows you how to stage, publish, and access those apps within the Designer. You can also perform these operations from the application's Options menu on the Visual Applications page.

## Task 1: Stage the Application

Stage the application so that other users can test its behavior.

1.  Click the **Menu** ![Menu icon](./images/vbcssp_menu3_icon.png) icon in the header and select **Stage**.

    ![](./images/vbcssp_sta_s2.png)

2.  In the Stage Application dialog box, select the **Populate Stage with Development data** option and click **Stage**.

    ![](./images/vbcssp_sta_s3.png)

    The application is staged, and its status in the header changes from `DEV` to `STAGE`.

3.  From the header **Menu** ![Menu icon](./images/vbcssp_menu3_icon.png), click **Open Staged Application**.

    ![](./images/vbcssp_sta_s4.png)

    The staged application opens in a new browser tab. The tables are populated with the data from Development.

    ![](./images/open_shared_application_result.png)

4.  Make a note of the application's URL to share with your team.

    When you have finished using the application, close the browser tab to return to the application in the Designer.

## Task 2: Import Data Into the Application

To add more records to your data in the staging database, let's import data for the Department and Employee business objects from a zip file.

1.  Click [this link](https://objectstorage.us-ashburn-1.oraclecloud.com/p/CSv7IOyvydHG3smC6R5EGtI3gc1vA3t-68MnKgq99ivKAbwNf8BVnXVQ2V3H2ZnM/n/c4u04/b/livelabsfiles/o/solutions-library/HR_Application_Stage.zip) and save the `HR_Application_Stage.zip` file. The zip file contains CSV files of the Department and Employee business objects of the HR Application schema, with more records and data.

2.  In the Navigator, click the **Business Objects** ![Business Objects icon](./images/vbcssp_bo_icon.png) tab, then click **Menu** ![Menu icon](./images/vbcssp_menu2_icon.png) and select **Data Manager**.

    ![](./images/vbcssp_imp_s3.png)

3.  From the drop-down list in the upper right corner, select **Staging** to import the data into the staging database.  

    ![](./images/vbcssp_imp_s4.png)

4.  Click **Import from File**.

5.  In the Import Data dialog box, click the import box, select `HR_Application_Stage.zip`, and click **Import**. When the import succeeds, click **Close**.

    ![](./images/vbcssp_imp_s6.png)

6.  In the Business Objects pane, click **Department**.

7.  Click the **Data** tab if necessary, then select **Staging** from the drop-down list to view the new departments.

    ![](./images/vbcssp_imp_s8.png)

8.  Click **Employee**, then click the **Data** tab and select **Staging** to view the new employees.

    ![](./images/vbcssp_imp_s9.png)

## Task 3: Publish the Application

After you have successfully tested the staged application, you can publish it and make the application live. The live application is visible to users with proper credentials.

1.  Click the **Menu** ![Menu icon](./images/vbcssp_menu3_icon.png) icon in the header and select **Publish**.

2.  In the Publish Application dialog box, select the **Include data from Stage** option and click **Publish**.  

    ![](./images/vbcssp_pub_s2.png)

    The application is now live. Notice the status change in the header next to the application name.

3.  From the header **Menu** ![Menu icon](./images/vbcssp_menu3_icon.png), click **Open Published Application**.

    ![](./images/vbcssp_pub_s3.png)

    The application opens in a new browser tab. The schema and the data from the staging database are copied to the live database.

    To open your live app from the Visual Builder Home page, click **ORACLE Visual Builder** in the header to go to the Visual Applications page. Locate the HR Application, click **Live** in the Status column, then select **hrwebapp** to open the app.

    ![](./images/vbcssp_pub_s4_result.png)

4.  Make a note of your application's URL. You can now share this URL with public users. Remember to close the browser tab when you're done using the application.

    After your application is published, you will no longer be able to make changes to it. To do that, you'll need to create a new version from the application's Options menu on the Visual Applications page. This creates a development version of the app for you to work on while the published version stays live. Once you are ready to go live with your updates, you'll need to re-stage and re-publish the new version.

    And that's it for this workshop! If you want, click the user menu in the top-right corner and select Sign Out from the menu.

## Acknowledgements

* **Author** - Sheryl Manoharan, Visual Builder User Assistance
* **Last Updated By** - February 2022
