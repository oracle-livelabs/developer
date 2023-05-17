# Test and Publish the Application

## Introduction

Now that we've set up the App UI in our extension, we'll test it to make sure it's working correctly. We'll then publish the extension and view the App UI deployed to your Oracle Cloud Applications instance.

### Objectives

In this lab, you will:

* Test your App UI's pages
* Deploy your App UI's extension to your Oracle Cloud Application instance
* Access the deployed extension

## Task 1: Test the App UI

You can preview your App UI to run it in its own browser tab and see how it will appear to a user.

1. Click **Preview** ![Preview icon](images/icon-preview.png) in the header.

2. When the App UI opens displaying a list of employees, enter criteria, like the first name `David`, in the **Emp Name** field to filter the list:

    ![This image shows a preview of the App UI. The name "David" is entered in the search field and the results of the search are listed underneath.](images/preview.png)

3. Close the browser tab.

## Task 2: Publish the extension

After you've confirmed search is working, you are ready to deploy the extension with its App UI to your Oracle Cloud Applications instance.

1. Click **Publish** in the header.

    ![This image show the Publish button selected in the upper right corner of the Designer.](images/publish.png)

2. In the Publish Changes dialog, enter a description of the changes in the **Commit Message** field, then click **Publish Changes**:

    ![This image shows the Publish Changes dialog with Merge Now selected and the "Search Application for HCM" entered in the Commit Message field.](images/publish-changes-dialog.png)

3. If prompted, provide your user name and password for your development instance. These **must** be Oracle Cloud Application credentials, as opposed to Visual Builder Studio or SSO credentials:

    ![This image shows the Missing Deployment Credentials dialog. The User Name and Password fields are empty.](images/deployment-creds.png)

4. When the changes are published to your project's Git repository, click **Close**.
    ![This image shows the steps taken to deploy changes from your workspace to the project's repository.](images/published.png)

## Task 3: View the deployed extension

Once your changes are successfully merged to your remote repo, VB Studio automatically kicks off the packaging and deployment jobs to deploy the extension to your environment's Oracle Cloud Applications instance.

1. Click ![Go to project page icon](images/icon-gotoprojectpage.png) in the header to go to the Project Home page.

2. In the main navigation, click the **Builds** ![Builds icon](images/icon-builds.png) tab to check the build jobs that package and deploy the extension to your development instance. If the build job is still running, you can view its progress in the **Job Queue** tab. It might take a few minutes for the build to start if an executor isn't immediately available.

    ![This image shows the Builds section Job Queue tab in VB Studio. A progress indicator shows status for the HCMSearch-Package job.](images/job-queue.png)

3. Click the **Environments** tab, then select **Deployments**.

4. Expand the **Demo-HCMSearch** extension:

    ![This image shows The Visual Builder Studio project Environments tab. The Development environment is selected and the Deployments tab is shown. In the Applications Extensions section, HCM Search is highlighted and expanded and hcmsearch is highlighted in the App UIs column.](images/deployment.png)

5. Click **Open** ![Open icon](images/icon-openappui.png) next to your App UI to open it in a new browser tab.

<!-- You may **proceed to the next lab**. -->

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, May 2023
* **Contributors** -  Lisa Dawson, VB Studio User Assistance
* **Last Updated By/Date** - Sheryl Manoharan, May 2023
