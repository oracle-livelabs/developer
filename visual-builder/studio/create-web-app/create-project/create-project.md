# Create a Project for a New Visual Application

## Introduction

This lab shows you how to create a project for a new visual application, the foundation to build a web application in Oracle Visual Builder Studio.

Estimated Time: 15 minutes

### About this Lab

In this workshop, you'll build a simple Human Resources visual application, using a _project_ with a _visual application_ template as the starting point. Every project in VB Studio is devoted to a discrete software effort, and the project you create in this lab is exclusive to the HR visual application. The project brings together all the tools you need to create your application: a Git repository to store your source code, a pipeline to provide continuous integration and delivery, an issue tracking system, and more. Because it is based on the visual application template, it will provide everything you need to visually develop an application.

As part of your project, you'll also create a _workspace_, a completely private area where you work on your visual application. All your work within this space is stored in a clone of the project's Git repository, and is not visible to others until you share or publish your changes. A workspace also connects you to the development environment where you plan to host your application, which must be a separate Visual Builder (VB) instance.

### Objectives

In this lab, you will:

* Create a project for a visual application and explore your project's environment
* Add credentials to deploy the visual application to your VB instance
* Add team members to your project

### Prerequisites

This lab assumes you have:

* A Chrome browser
* A VB Studio instance and a separate VB instance

## Task 1: Create a project for a visual application

As someone who creates a project, you'll automatically become the project's owner, responsible for project management. For the purposes of this workshop, we'll assume that you're also the developer who will create the HR web application.

1. On VB Studio's Organization page, click the **Projects** tab, then click **\+ Create**.

    ![The All Projects page that appears when the Organization tab is selected on the main menu. The Projects tab is empty, with the Create button selected.](images/welcome.png "All projects screen")

2. On the Project Details page of the New Project wizard, enter:

    * **Project Name**: `Tutorial HR Project` (you may want to add your name to the project name if you're in a large organization)
    * **Description**: `Tutorial project`
    * **Security**: **Private** (the default)
    * **Preferred Language**: the language of your choice

    Click **Next**.

3. On the Template page, select **Visual Application**. Click **Next**.

4. On the Project Properties page, click **Development VB Instance** to select the VB instance where you plan to deploy and host your application. When you have only one VB instance provisioned, it will be automatically selected as your environment's development instance.

5. Change the **Workspace Name** from the default `Workspace1` to `HR Visual Application`. Also change the **Working Branch Name** from `branch1` to `hrbranch`.

6. Leave other fields to their default settings and click **Finish**.

    Wait for the project to be provisioned. Once provisioning completes, you'll see the Project Home page, which serves as a window to your workspace, your environments, and repositories, as well as a recent activities feed (you'll need to click **Reset Filters** under Recent Activities - Today to see details). On the left are a series of tabs showing all the project components that are available.

    ![The Project Home page includes a Workspaces area with the newly created HR Visual Application workspace. An Environments area shows the Development instance associated with this project. If you click Reset Filters, a Recent Activities feed lists what was done in the project today. On the right, the Repositories tab is selected to show the tutorial-hr-project.git. The Statistics and Team tabs are also visible.](images/project-home.png "Project Home page")

## Task 2: Explore the project environment

Everything you need to start building a visual application is now created for you in this project. Let's step through some key components to better understand your project environment.

1. On the Project Home page, the **tutorial-hr-project.git** repository shows  under Workspaces as well as in the Repositories tab on the right. This Git repo stores your visual application's source files and is known as the project's _remote_ repository. Click the **tutorial-hr-project.git** link in the Workspaces table to see your project's remote branches, `main` and `hrbranch`, created with initial content for your visual application. Select **hrbranch**; the `main` branch is the default branch created when a new repository is generated and is the project's source of truth.

    ![Contents of the tutorial-hr-project.git repository. Both the main and hrbranch branches are visible, with the hrbranch selected.](images/repo.png "Git page")

2. In the left navigator, click **Workspaces**![Workspaces icon](images/vbs-workspaces-icon.png)to view the **HR Visual Application** workspace. This workspace contains a working copy of `hrbranch` and serves as your _local_ repository. The `hrbranch` initially has the same set of source files as the `main` branch, but as you work with your visual application, it will include the changes you make. Your changes can't be seen by others until you save them from the local branch to a remote branch.

    ![The newly created HR Visual Application in the Workspaces table. Its repository is set to tutorial-hr-project.git, current branch is set to hrbranch, and environment is set to Development.](images/workspace.png "Workspaces page")

3. Click **Environments** ![Environments icon](images/vbs-environments-icon.png) in the left navigator to view the development environment that points to your VB instance. Here, you can view details of your VB instance and all the applications you deploy to this instance.

    ![Development environment, with a single Visual Builder instance in the Service Instances tab. The Details, Certificates, and Deployments tabs are also visible.](images/env.png "Environments page")

4. Click **Builds** ![Builds icon](images/vbs-builds-icon.png) in the left navigator to view the default build jobs that package and deploy your visual application to the development instance. The `Visual-Application-Package` job generates the visual application's artifact files. The `Visual-Application-Deploy` job deploys the artifact files to the development instance.

    ![Jobs tab on the Builds page. It lists two default jobs Visual-Application-Deploy and Visual-Application-Package in the All Jobs tab. Both jobs include Actions on the right to Build, Configure, View Last Build Log, and Delete. Other tabs that you can use to filter are Successful Jobs, Failed Jobs, and Test Failed Jobs. A Create Job button is also visible.](images/build-jobs.png "Jobs tab on Builds page")

5. On the Builds page, click **Pipelines** to view the default Visual Application pipeline that packages and deploys the application to your development instance. From the pipeline's **Actions** ![Actions icon](images/vbs-actions-icon.png) menu, select **View Layout** to view the sequence of build jobs that do this.

    ![This image shows the Pipelines tab on the Builds page, with a diagram showing the sequence of jobs: Visual-Application-Package followed by Visual-Application-Deploy. A Create Pipeline button is also visible. On the right, there are action buttons to view Instances of a pipeline as well as Build, Configure, and Delete a pipeline.](images/build-pipeline.png "Pipelines tab on Builds page")

6. Click **Builds** in the breadcrumbs trail to return to the main Builds page.

## Task 3: Add credentials to deploy the visual application

Now that your project is provisioned, let's set up the credentials that VB Studio will use to deploy your visual application to the VB development instance.

1. Click **Jobs** on the Builds page, then from the **Actions**![Actions icon](images/vbs-actions-icon.png) menu for the `Visual-Application-Deploy` job, click **Configure**.

    ![Jobs tab on the Builds page. The Visual-Application-Deploy job in the table is selected, with its Configure button in focus.](images/build-auth.png "Configure option for Visual-Application-Deploy")

2. On the Job Configuration page, click **Steps**.

3. In the **Username** and **Password** fields, enter the credentials of a user who can deploy to the VB development instance.

    ![Steps tab in the Job Configuration page. Both the Username and Password fields are highlighted to indicate that these fields must be updated.](images/build-auth-credentials.png "Steps tab on Job Configuration page")

   **Tip:** Before you save your changes, take a quick look at some other settings on this page:
    * Take note of the **Include the application version in the URL** check box that's selected by default. This option adds a version to the URL when your application is deployed (for example, <https://host/something-else/>**0.1**/index.html) and is useful to identify multiple versions during development. When your app is ready to go live, you'll want to deselect this option so your application URL is something like https:/host/something-else/**live**/index.html (without a version number in it).
    * Take note of the **Use clean database** option, also selected by default. This option uses a new database by default to store your application's data. To keep your data after initially importing it (which we'll do in a later lab), you'll need to select the **Keep existing environment data** option.

    Click **Save**.

## Task 4: Add team members

For the purposes of this workshop, let's assume that other members of your team will work with you on this visual application—which means you'll need to add them to this project. As the project owner, you can control what others can do in this project by granting them membership as a Developer Full Access, Developer Limited Access, or Contributor.

1. Click **Project Home** ![Project Home icon](images/vbs-project-home-icon.png) in the left navigator.

2. On the Project Home page, click **Team**, then **\+ Add Member**.

    ![Team tab on the Project Home page. The person who creates the project is listed as the Project owner. The Add Member button is also visible.](images/team.png "Team tab")

3. In the Add Member dialog box, enter the username of a teammate, select the new user's membership, and click **Add**. For demonstration purposes, this lab adds Clara Coder with the Developer Limited Access role, which lets her access most project components but limits management actions.

    ![Add Member dialog box, with Membership set to Developer Limited Access and Username set to Clara Coder. The Add button is selected.](images/team-add-member.png "Add Member dialog box")

    An email containing project details is sent to Clara Coder. To receive email notifications, the teammate's email address must be verified and notifications set properly in Preferences.

    You may **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, November 2021
* **Last Updated By/Date** - Sheryl Manoharan, January 2023
