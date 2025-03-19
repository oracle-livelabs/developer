# Publish a web app

## Introduction

This lab shows you how to publish your web app by merging your changes to the project's default branch.

Estimated Time: 15 minutes

### About this Lab

When the process of reviewing your HR web app is done, you are ready to publish the application and make your changes public. Publishing saves your application's code to a remote branch and then to the project's default (**main**) branch. You can use the **Commit** and **Push** Git options in your workspace to save your changes to a remote branch (as we did in a previous lab), then use the **Merge** option to push your changes to **main**. Or, you can do all of this at the click of a single **Publish** button (as we'll do in this lab).

No matter how you decide to save your changes, it's a good idea to always get your code reviewed and approved before you merge it to the project's **main** branch. Because this code base is meant to be stable, it is usually protected, requiring code to be reviewed through a merge request. If your project was set up to protect the **main** branch, merging your changes will require approval. In this lab, you'll create a merge request to review your changes, but for demonstration purposes, you'll merge the code to the **main** branch without approval.

Once your changes are successfully merged, VB Studio automatically deploys the web app to your environment's VB instance and creates a permanent URL to access the application.

### Objectives

In this lab, you will:

* Create a merge request to publish your changes
* Merge your changes and view the deployed application
* Import data to your deployed application

### Prerequisites

This lab assumes you have:

* A Chrome browser
* All previous labs successfully completed

## Task 1: Create a merge request for approval

Now that you are ready to publish your changes to the project's `main` branch, let's create a merge request to get someone to sign off on your changes.

1. Click![Workspaces icon](images/vbs-workspaces-icon.png)**Workspaces**, then **HR Workspace** in the Workspaces table.
2. When your workspace opens, click **Publish** in the header.
3. In the Publish Changes dialog box, click **Merge After Review**.
4. Enter a commit message for your commit, enter a description of all your changes (not just this commit) for the merge request, select another project member as a reviewer, and click **Publish**.

    ![The Publish Changes dialog box is shown, with the Merge After Review tab selected. An example commit message is shown and Clara Coder is set as a reviewer. The Publish Changes button is selected.](images/create-mr.png "")

5. When prompted, add the username and password that allows your visual application to be deployed to the VB development instance, then click **Add Credentials and Continue**.

    ![The Missing Deployment credentials dialog with mary.jane entered as the user name. Password is empty.](images/credentials.png "")

    Once the request to merge your changes from **hrbranch** to **main** is created, click **Close**. Both your reviewer and you will be notified that a new merge request has been created.

    ![The results when you click the Publish Changes button are shown, with the message '1 Merge hrbranch to master merge request has been created' at the end. The Close button is selected.](images/create-mr-result.png "")

6. Return to the project home, then click ![Merge Requests icon](images/vbs-mergerequest-icon.png) **Merge Requests** in the left navigator. You'll see your merge request listed here. For a quick summary of the merge request, click ![Details icon](images/details-icon.png) **Details**.
7. Click **1 Merge Request for branch 'hrbranch'**. All details of the merge request, including its current status and all previous commits, will be shown:

    ![Details of the newly created merge request, #1 Merge Request for branch 'hrbranch', are shown. Its status is shown as OPEN, with a message that the requestor wants to commit 2+ commits to main from hrbranch in tutorial-hr-project.git. The Conversation tab shows an example commit message. The Merge and Close buttons are also visible.](images/create-mr-view.png "")

    You can't create another merge request from your workspace until your changes are merged, but you can use the **Commit** and **Push** options in the header's Git repository menu to update a merge request that's pending approval.

## Task 2: Merge changes to the default branch

Assuming your merge request has been approved, let's now merge your changes to the project's **main** branch in the remote repository.

1. Click **Merge** on the Merge Requests page.
2. In the Merge dialog, enter a message, select **Delete branch** if you want to delete the branch after the merge, and click **Create a Merge Commit**.

    ![The Merge dialog used to create a merge commit is shown. An example commit message is entered with the Create a Merge Commit button selected. A Delete branch checkbox is also shown.](images/merge-mr.png "")

    The merge request shows as Merged. If you didn't choose to delete the branch, you can do so now if you want.

    Once your changes are merged, VB Studio automatically kicks off build jobs that package and deploy your visual application to the development environment. These jobs—**tutorial-hr-project-Package** and **tutorial-hr-project-Deploy**—were automatically generated when your workspace was first created. VB Studio also creates a pipeline, which, by default, runs the package job before the deploy job, so the latest application artifacts are packaged for deployment.

    Now click ![Builds icon](images/vbs-builds-icon.png) **Builds** to view the progress of your build jobs.

    ![The status of the Visual-Application-Package and Visual-Application-Deploy jobs on the Builds page is shown. Both jobs are triggered automatically when your commits are merged to the project's main branch.](images/merge-mr-result.png "")

## Task 3: View the deployed application

After your application is successfully deployed to the development environment, you can view it from your environment's list of deployments.

1. In the left Navigator, click ![Environments icon](images/vbs-environments-icon.png) **Environments**, then **Deployments**.
2. Expand the **tutorial-hr-project** that shows the **Deployed** status, then click the **hrwebapp** application.

    ![The applications deployed to your Development environment are shown. The Deployed version of the hrwebapp application is shown with identifying details.](images/deployed-application.png "")

    The application opens in a new browser tab, but without any data. While you can use an empty database in your development environment, it helps to have some data—we'll see how you can import data to your app in the next step.

## Task 4: Import data to the deployed application

A deployed application does not automatically include its business object data, so you'll need to manually import data for the application in the development environment. You can import the data you used in your workspace or add entirely different data, as we'll do now.

**Note:** These steps apply only when your environment's Visual Builder instance is in the same identity domain as your VB Studio instance. When it is in a different domain, you won't see deployment actions such as export, import, or undeploy (as shown here). Instead, you must add an **Import Data** step to a build job (either as part of your current deployment job or as a brand new import job) to do this action for you. See [Configure a Build Job to Manage Deployed Visual Apps](https://www.oracle.com/pls/topic/lookup?ctx=en/cloud/paas/visual-builder&id=VBBVA-GUID-B466AE27-9924-4A44-954F-5178213ECF65). Optionally, skip this step and complete the workshop  without importing data to the application.

1. Click [this link](https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/developer-library/hr-application.zip) and download the `hr-application.zip` file. The zip file contains CSV files of the Location, Department, and Employee business objects with more records and data.
2. In the Deployments tab, click **Actions** ![Actions icon](images/vbs-actions-icon.png) for the deployed tutorial-hr-project and select **Import Data**.

    ![The Import Data option from the Actions menu of a deployed application is shown.](images/deployed-application-import-data.png "")

3. In the Import Data dialog box, click the upload box, select the `hr-application.zip` file you previously downloaded, and click **Import Data**.

    When the import succeeds, click **Close**.

    ![The Import Data dialog with the hr-application.zip selected for import is shown. The Import Data button is selected.](images/deployed-application-import-data-1.png "")

4. Refresh the **hrwebapp** application that you opened previously in a browser tab.

    The application displays the newly imported data.

    ![The HR web app is displayed with the imported data.](images/deployed-application-live-data.png "")

    You can now make a note of this URL to share with public users.

## Task 5: Install your application as a PWA

You're now ready to install the HR app as a PWA.

1. Click the **Install HR App** ![Install HR App icon](images/install-app-icon.png) icon in the address bar, then **Install** when prompted.

    ![The Install app? prompt that appears when a user clicks the Install HR Application icon in the address bar is shown. Install is selected.](images/install-as-pwa.png "")

    If you access this app on a mobile device, you'll be prompted to add the app to your phone's home screen as well.

2. When the app opens on your device as a standalone app, try it out and test its functionality.

   ![The HR Application is shown when installed as a PWA on a device.](images/pwa-installed.png "")

    When you are done, click **X** to close the app. You can always click ![PWA icon](images/pwa-desktop-icon.png) on your device's home screen or laptop to open the app again. Remember also to close the deployed app's browser tab.

    Now that the HR web app is published, you won't be able to make changes to it. To do that, you'll need to create a new branch off your project's `main` branch. You can do this in your existing workspace using the **Switch Branch** option in the Git repository menu. Or you can clone this repository in a new workspace using the **Clone From Git** option on the Workspaces page and start afresh.

    And that's it for this workshop!

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, November 2021
* **Last Updated By/Date** - Sheryl Manoharan, October 2024