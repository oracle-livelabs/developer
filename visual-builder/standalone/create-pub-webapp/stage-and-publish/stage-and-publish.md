# Stage and Publish Your Web App

## Introduction

This lab shows you how to stage and publish your web app.

Estimated Time:  10 minutes

### About this lab

At this point, your work designing the app is more or less complete. You can now stage your app to allow team members to test it thoroughly. After testing is complete, you can publish the application and make it available to users.

Visual Builder provides different databases for the development, staging, and live phases of an application. You can use an empty database for the staging or live phase, you can transfer data from one to another, or you can import specific data for each.

This lab shows you how to stage, publish, and access those apps within the Designer. You can also perform these operations from the application's Options menu on the Visual Applications page.

## Task 1: Enable the Web App as a PWA

As a final step before you stage the app, enable it to run as a Progressive Web App—or PWA for short. PWAs are designed to be capable, reliable, and provide a platform-specific look and feel. When you enable a web app as a PWA, it can be installed directly from a browser on a user's device, including Android and iOS mobile devices.

1.  In the Web Apps pane, click the **hrwebapp** node and click the **Settings** tab.

2.  Click the **PWA** tab, then click **Enable Progressive Web App (PWA)**.

    ![](images/enable.png "This image shows the PWA tab of the Settings editor, with the Enable Progressive Web App switched enabled. ")

3.  Review the **Manifest Settings** included with the PWA's web manifest, a JSON file that contains information about your application:

    -   **Application Name:** Accept the default value or specify another name to be displayed when you are prompted to install the application.  

    -   **Short Name:** Accept the default value. When both the application name and short name are specified, the short name is used on the Home screen, launcher, and other places where space is limited.

    -   **Theme Color**: Accept the default background and theme colors.
4. Under **Resources**, click **Create** next to **Offline Fallback Page** to add a page that is displayed when the user performs an action in the PWA that requires a connection, but the device is offline.

    ![](images/offlinepage.png "This image shows an offlinePage.html created under the Offline Fallback Page option in the Resources section. ")

  A default `offlinePage.html` is created for you. You can click this page to customize its code, if you want. For demonstration purposes, we'll accept the default settings.

## Task 2: Stage the Application

Let's now stage the application, so other users can test its behavior.

1.  Click the **Menu** ![Menu icon](images/vbcssp_menu3_icon.png) icon in the header and select **Stage**.

    ![](images/vbcssp_sta_s2.png "This image shows the Menu options in the header. Stage is selected.")

2.  In the Stage Application dialog box, select the **Populate Stage with Development data** option and click **Stage**.

    ![](images/vbcssp_sta_s3.png "This image shows the Stage application dialog. The Populate Stage with Development data option and the Stage button is selected.")

    The application is staged, and its status in the header changes from `DEV` to `STAGE`.

3.  From the header **Menu** ![Menu icon](images/vbcssp_menu3_icon.png), click **Open Staged Application**.

    ![](images/vbcssp_sta_s4.png "This image shows the Menu option with a new Open Staged Application option.")

    The staged application opens in a new browser tab. The tables are populated with the data from Development. Also, an **Install HR Application** ![Install HR Application icon](images/install-app-icon.png) icon that lets you install the app as a PWA shows up on the address bar—we'll test this functionality in a later step.

    ![](images/open-shared-application-result.png "This image shows the staged version of the HR web app open in a browser tab. The Install HR Application icon is highlighted.")

4.  Make a note of the application's URL to share with your team.

    When you have finished using the application, close the browser tab to return to the application in the Designer.

## Task 3: Import Data Into the Application

To add more records to your data in the staging database, let's import data for the Department and Employee business objects from a zip file.

1.  Click [this link](https://objectstorage.us-ashburn-1.oraclecloud.com/p/LNAcA6wNFvhkvHGPcWIbKlyGkicSOVCIgWLIu6t7W2BQfwq2NSLCsXpTL9wVzjuP/n/c4u04/b/livelabsfiles/o/developer-library/HR_Application_Stage.zip ) and save the `HR_Application_Stage.zip` file. The ZIP file contains CSV files of the Department and Employee business objects of the HR Application schema with a few more records.

2.  In the Navigator, click the **Business Objects** ![Business Objects icon](images/bo-icon.png) tab, then click **Menu** ![Menu icon](images/vbcssp_menu2_icon.png) and select **Data Manager**.

    ![](images/vbcssp_imp_s3.png "This image shows the Data Manager option selected from the Menu in the Business Objects pane.")

3.  From the drop-down list in the upper right corner, select **Staging** to import the data into the staging database.  

    ![](images/vbcssp_imp_s4.png "This image shows the Manage Application Data page. The Development option is selected in the drop-down.")

4.  Click **Import from File**.

5.  In the Import Data dialog box, click the import box, select `HR_Application_Stage.zip`, and click **Import**. When the import succeeds, click **Close**.

    ![](images/vbcssp_imp_s6.png "This image shows the Import from File dialog following a successful import.")

6.  In the Business Objects pane, switch to the **Objects** tab and click **Department**.

7.  Click the **Data** tab if necessary, then select **Staging** from the drop-down list to view the new departments.

    ![](images/vbcssp_imp_s8.png "This image shows the data of the Staging database for the Department object.")

8.  Click **Employee** and **Data**, then select **Staging** to view the new employees.

    ![](images/vbcssp_imp_s9.png "This image shows the data of the staging database for the Employee object.")

## Task 4: Publish the Application

After you have successfully tested the staged application, you can publish it and make the application live. The live application is visible to users with proper credentials.

1.  Click the **Menu** ![Menu icon](images/vbcssp_menu3_icon.png) icon in the header and select **Publish**.

2.  In the Publish Application dialog box, select the **Include data from Stage** option and click **Publish**.  

    ![](images/vbcssp_pub_s2.png "This image shows the Publish Application dialog. The Include data from Stage option and the Publish button are selected.")

    The application is now live. Notice the status change in the header next to the application name.

3.  Click **ORACLE Visual Builder** in the header to go to the Visual Applications page. Locate the HR Application, click **Live** in the Status column, then select **hrwebapp** to open the app.

    ![](images/vbcssp_pub_s4_result.png "This image shows the hrwebapp selected under Live in the Status column for the HR Application. ")

    The application opens in a new browser tab, with the schema and data from the staging database copied to the live database.

    ![](images/published-view.png "This image shows the HR web app with data from the staging database.")

    You can make a note of this URL to share with public users.

4.  To install the app as a PWA, click the **Install HR Application** ![Install HR Application icon](images/install-app-icon.png) icon in the address bar, then **Install** when prompted.

    ![](images/install-as-pwa.png "This image shows the Install app? prompt that appears when a user click the Install HR Application icon in the address bar. Install is selected.")

    If you access this app on a mobile device, you'll be prompted to add the app to your phone's home screen as well.

5. When the app opens on your device as a standalone app, try it out and test its functionality.

    ![](images/pwa-installed.png "This image shows the HR Application installed as a PWA on a device.")

    When you are done, click **X** to close the app. You can always click ![](images/pwa-desktop-icon.png) on your device's home screen or laptop to open the app again.

    Now that the HR app is published, you won't be able to make changes to it. To do that, you'll need to create a new version from the application's Options menu on the Visual Applications page. This creates a development version of the app for you to work on while the published version stays live. Once you are ready to go live with your updates, you'll need to re-stage and re-publish the new version.

    And that's it for this workshop! If you want, click the user menu in the top-right corner and select Sign Out from the menu.

## Acknowledgements

* **Author** - Sheryl Manoharan, Visual Builder User Assistance, June 2021
* **Last Updated By** - June 2022
