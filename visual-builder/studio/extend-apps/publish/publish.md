# Publish the extension

## Introduction

Now that we've tested the App UI in our extension, we're ready to publish the extension and view the App UI deployed to your Oracle Cloud Applications instance.

Estimated Time: 5 minutes

### About this lab

Publishing saves your application's code from the local branch in your workspace to the remote branch in the project's Git repository, then to the project's default (main) branch. While it's possible to complete each of these Git operations separately, it's simplest to do all of this at the click of a single Publish button—as we'll do in this lab.

### Objectives

In this lab, you will:

* Deploy your App UI's extension to your Oracle Cloud Application instance
* Access the deployed extension

### Prerequisites

This lab assumes you have all previous labs successfully completed.

## Task 1: Publish the extension

After you've confirmed search is working, you are ready to deploy the extension with its App UI to your Oracle Cloud Applications instance.

1. Click **Publish** in the header.

    ![This image show the Publish button selected in the upper right corner of the workspace.](images/publish.png)

2. In the Publish dialog, enter a description of the changes in the **Commit Message** field, then click **Publish**:

    ![This image shows the Publish Changes dialog with Merge Now selected and the "Employee Search Application" entered in the Commit Message field.](images/publish-changes-dialog.png)

3. If you're prompted to authorize your environment, click **OK** in the Authorization Required dialog, then click **Authorize** in the Authorize Jobs page. If additionally prompted to set up OAuth, enter the credentials of a user who can access your Oracle Cloud Applications instance and click **Authorize**.

    Once you've provided authorization, return to your workspace and click **Publish** again to restart the publishing process.

4. When the changes are published to your project's Git repository, click **Close**.
    ![This image shows Publish Changes dialog detailing the steps taken to deploy changes from your workspace to the project's repository in this order: Checking environments and build jobs, git commit branch1, git fetch, git merge main to branch1, git merge branch1 to main, and git push. There's also a message asking the user not to use the current branch as changes are being deployed and that a new branch maryjane-timestamp has been temporarily created for the user.](images/published.png)

    What you're seeing are the Git steps taken to push your changes from the local **branch1** to the remote **branch1**, then to merge them to the project's **main** branch.

## Task 2: View the deployed extension

Once your changes are successfully merged to your project's repo, VB Studio automatically kicks off the default build jobs that deploy the extension to your environment's Oracle Cloud Applications instance. Notifications to that effect appear in the bottom right corner.

1. Click ![Go to project page icon](images/icon-gotoprojectpage.png) in the header to go to the Project Home page.

2. In the main navigation, click the ![Builds icon](images/icon-builds.png) **Builds** tab to check the packaging and deployments jobs.

    If the build job is still running, you can view its progress in the **Job Queue** tab. It might take a few minutes for the build to start if an executor isn't immediately available.

    ![This image shows the Builds section Job Queue tab in VB Studio. A progress indicator shows status for the DemoEmpSearch-Package job.](images/job-queue.png)

3. When the status of both jobs in the Jobs tab is green, click the ![Environments icon](images/icon-environments.png) **Environments** tab to open your project's Environments page and click **Extension Lifecycle**.

4. Expand the environment to which the DemoEmpSearch extension was deployed, then click ![Extension Details icon](images/manageextensionlifecycle-details-icon.png) to view extension details.

    ![This image shows the Environments tab. The Development environment is selected and the Deployments tab is shown. In the Applications Extensions section, DemoEmpSearch is highlighted and expanded and empsearch is highlighted in the App UIs column.](images/deployment.png)

5. Click ![Open icon](images/icon-openappui.png) next to **empsearch** to open the App UI in a new browser tab:

    ![This image shows the Extension Details pane with details such as extension name, ID, version, App UIs, Dependencies, and Version History. The empsearch App UI is highlighted.](images/deployment-appui.png)

    You can now view the App UI deployed to your environment's Oracle Cloud Applications instance.

<!-- You may now **proceed to the next lab**. -->

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, May 2023
* **Last Updated By/Date** - Sheryl Manoharan, January 2025
