# Create an extension in Visual Builder Studio

## Introduction

Starting in Oracle Cloud Applications, we'll navigate to Visual Builder Studio and access a project where we can develop our extension.

Estimated Time: 5 minutes

### About this lab

To extend Oracle Cloud Applications in VB Studio, you must belong to a *project*. Every project in VB Studio is devoted to a discrete software effort, and the project you use in this lab is exclusive to your Oracle Cloud Application. The project brings together all the tools you need to create your App UI: a Git repository to store your source code, an Oracle Cloud Applications environment to deploy your application, a pipeline to provide continuous integration and delivery, and more.

Within your project, you'll create a *workspace*, a completely private area for you to work on your application. The changes you make in your workspace are stored in a clone of the project's Git repository, and are not visible to others until you share or publish them.

### Objectives

In this lab, you will:

* Access VB Studio from your Oracle Cloud Application environment
* (Optional) Create a project with an Oracle Cloud Apps environment
* Create an extension (also considered a workspace) for your Oracle Cloud App

### Prerequisites

This lab assumes you have:

* An Oracle Cloud account
* All previous labs successfully completed

## Task 1: Access VB Studio from Oracle Cloud Applications

Users with [the right roles](https://docs.oracle.com/pls/topic/lookup?ctx=en/cloud/paas/visual-builder/visualbuilder-administration&id=GUID-3C9A957B-24A5-4CEF-84FF-B7D9D6F1C3CA) can access VB Studio from their Oracle Cloud Applications' TEST instance.

1. Log in to your Oracle Cloud Applications instance.
  ![The Oracle Cloud Applications sign-in page is shown. The User ID field shows john.dunbar, the Password field is empty.](images/login.png)

2. Click the navigation menu ![Hamburger menu icon](images/icon-menu.png) in the upper left corner, navigate to **Configuration**, then select **Visual Builder** (synonymous with VB Studio).
  ![This image shows the left navigator menu in an Oracle Cloud Applications instance. The Configuration submenu item is expanded and the Visual Builder menu item is highlighted.](images/configuration-vb.png)

3. When VB Studio opens on the Organization page, select the project you want to use to develop extensions for your Oracle Cloud Application. If you don't have a project, create one as described in the next task.

## Task 2: Create a project

Create a project to manage the tools and processes you need to develop an extension in VB Studio. If you already have a project, skip this step.

1. On VB Studio's Organization page, click **\+ Create** on the **Projects** tab.

    ![The All Projects page that appears when the Organization tab is selected on the main menu. The Projects tab is empty, with the Create button selected.](images/org-home.png "All projects screen")

2. On the Project Details step of the New Project wizard:

    * Enter **Demo Project** as the **Name**. You may want to add your name to the project name if you're in a large organization.
    * Enter **Demo project** as the **Description**.
    * Leave the **Security** settings as **Private** and **Discoverable** (the default).
    * Leave the **Preferred Language** as **English** (the default).

    Click **Next**.

3. On the Project Template step, leave the Project Template selected as **Empty Project**. Click **Next**.

    ![The New Project wizard with the Empty Project template selected.](images/empty-project.png)

4. On the Project Properties step, leave **Wiki Markup** (the syntax for the project's wiki) as **Markdown** and click **Next**.

5. On the Project Team Members step, accept the default setting assigning you as the project owner. Click **Finish**.

    Wait for the project to be provisioned. Once provisioning completes, you'll see the Project Home page, which serves as a window to your workspaces, environments, and repositories, as well as a recent activities feed. On the left are a series of tabs showing the available project components.

    ![The Project Home page includes a Workspaces area, Environments area, and a Recent Activities feed. On the left, the Organization, Project Home, Workspaces, Git, Merge Requests, Builds, Environments, and other project components show.](images/project-home.png "Project Home page")

      **Tip:** If you want to keep the left navigation menu clutter-free, showing only frequently used items, click ![Edit icon](images/icon-edit.png), select the items you want under User, and click **Save**. This tutorial commonly uses Workspaces, Git, Merge Requests, Builds, and Environments.

    Because we created a project with no preconfigured settings or content, we need to create what we need: an environment that connects to an Oracle Cloud Applications instance and a workspace with a Git repository.

## Task 3: Define an environment

Define an environment that points to your Oracle Cloud Applications development instance, where your extension can be deployed from within the project. If your project already defines this environment, skip this step.

1. On the Project Home page, click **+ Create Environment** under Environments.

    ![The Environments section on the Project Home page, showing the Create Environment button.](images/env-create.png)

2. Enter **DEV** as the **Environment Name**, then optionally, add a description. Click **Create**.

3. On the Environments page, click **+ Add Instance** to add an Oracle Cloud Applications instance to your **DEV** environment.

4. With **Oracle Cloud Applications** selected under Instance Type, select the Oracle Cloud App instance you want in your tenancy, and click **Add**.

    ![The Add Service Instance dialog with Instance Type set to Oracle Cloud Applications and Add Instance Using set to Identity Domain. With these options, a Fusion Applications Cloud Service of type Oracle Cloud Application IDCS Resource is shown. This instance is selected. An Add button is also shown.](images/env-add-service-instances.png "Environments page")

   Wait for the instance's Status to turn green, from 'Unknown' to 'Available'.

5. Click ![Project Home icon](images/vbs-project-home-icon.png) **Project Home** in the navigation menu to see your DEV environment now defined.

## Task 4: Create a workspace

Once you have a project with an Oracle Cloud Apps environment, create a workspace to develop your extension. A workspace is your ticket into the Designer, a visual environment that lets you design and develop your user interface by dragging and dropping components on a page.

1. Click ![Workspaces icon](images/icon-workspaces.png) **Workspaces** in the navigation menu.

2. Click **New** and select **New Application Extension**.
  ![This image shows the Workspaces tab for the project with the New menu expanded. The New Application Extension option is selected in the menu.](images/create-extension.png)

3. In the **New Application Extension** dialog, populate the fields with these values:

  | Field | Value | Explanation |
  | --- | --- | --- |
  | Extension Name | YourName-EmpSearch | To keep the names distinct, use your first name and the initial of your last name, as in `MaryJ-EmpSearch` |
  | Extension Id | site_YourName-EmpSearch | Automatically filled in, but you can change it if you like |
  | Workspace Name | YourName-EmpSearch | Automatically filled in, but you can change it if you like |
  | Root Folder | extension1 | Default folder under which your extension in created in the project's Git repository |
  | Development Environment | Development | Mapped to your current identity domain's Oracle Cloud Applications instance |
  | Sandbox | No sandbox selected | Not needed in this scenario |
  | Git Repository | Create new repository | Creates a Git repository and branch where your extension's files will be stored |
  | Repository Name | YourName-EmpSearch | Name of the extension's Git repository |
  | Working Branch Name | branch1 | Working copy of your Git repository's default branch |
  {: title="New App Extension Fields"}

  Here are the values used for demo purposes in this workshop:
  ![This image shows the New Application Extension dialog, with fields filled as follows: Extension Name: DemoEmpSearch; Extension Id: site_DemoEmpSearch; Workspace Name: DemoEmpSearch; Root folder: extesion1; Development Environment: DEV; Sandbox: No sandbox selected. The Create new repository option is selected. DemoEmpSearch is entered in the Repository Name field and branch1 is entered into the Working Branch field.](images/create-workspace.png)
4. Click **Create**.

  VB Studio opens your workspace in the Designer, where you can get started with developing your App UI.

## Task 5: Explore your extension

When your workspace first opens in the Designer, your screen might look something like this:

![This image shows the designer view that opens right after a workspace is created. The Navigator is on the left side of the page and the welcome page is on the right.](images/welcome.png)

On the left edge is a vertical toolbar with icons representing App UIs, Services, Dependencies, and so on. This toolbar is the Navigator, which helps you move between the artifacts in your extension.

The App UIs pane is where you'd get started with App UIs (entire pages and flows) or fragments (reusable pieces of UI). You'll also see a section called **Unified Application**, which provides global services and a common user interface shell for all App UIs in your extension. You won't need to worry about this underpinning, but suffice to say it is considered a dependency for everything in the Oracle Cloud Applications ecosystem.

Now take a look at the header:

![This image shows the workspace header, with the workspace name, Git repository, and current branch on the left. Other elements on the right include Preview, Notifications, Publish, and a menu.](images/header.png)

* On the left is the name of your current workspace, **DemoEmpSearch**; next to it is the project's Git repository (**DemoEmpSearch.git**) and the branch currently associated with your workspace (**branch1**).

  The **DemoEmpSearch.git** repo stores your extension's files and is known as your project's *remote* repository. If you were to look at your Git repo, you'll see it includes the **main** and **branch1** branches, created with initial content for your extension. The **main** branch is the default branch created when a new repo is generated and is the project's source of truth. The **branch1** you see in your workspace is a working copy of your remote **branch1** and serves as your *local* repository. It initially has the same set of source files as the remote branch, but will include the changes you make as you develop the extension.

* Elements on the right let you perform various other actions, such as undo your recent changes or search the Git repository for a file. This workshop primarily demonstrates the options to preview your App UI and publish changes. If you make a mistake during this workshop, click ![Undo icon](images/icon-undo.png) to back out of the last step you did, or the arrow next to it to undo more than one step.

  Keep in mind that VB Studio saves your changes automatically as you work. A timestamp at the bottom of the page will show the time your work was last saved.

You may now **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, May 2023
* **Last Updated By/Date** - Sheryl Manoharan, July 2025
