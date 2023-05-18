# Create an Extension in Visual Builder Studio

## Introduction

Starting in Oracle Cloud Applications, we'll navigate to Visual Builder Studio and access a project where we can develop our extension.

Estimated Time: 5 minutes

### About this lab

To extend Oracle Cloud Applications in VB Studio, you must belong to a *project*. Every project in VB Studio is devoted to a discrete software effort, and the project you use in this lab is exclusive to your Oracle Cloud Application. The project brings together all the tools you need to create your App UI: a Git repository to store your source code, a pipeline to provide continuous integration and delivery, and more.

Within your project, you'll create a *workspace*, a completely private area for you to work on your application. The changes you make in your workspace are stored in a clone of the project's Git repository, and are not visible to others until you share or publish them.

### Objectives

In this lab, you will:

* Access VB Studio from your Oracle Cloud Application environment
* Create an extension (also considered a workspace) for your Oracle Cloud App

### Prerequisites

This lab assumes you have:

* An Oracle Cloud account
* All previous labs successfully completed

## Task 1: Access VB Studio from Oracle Cloud Applications

Users with [the right roles](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-administration/set-vb-studio-extend-oracle-cloud-applications.html#GUID-DF0D4F76-D26A-46B5-B8E5-68D7FDD1E475) can access VB Studio from their Oracle Cloud Applications' TEST instance.

1. Log in to your Oracle Cloud Applications instance.
  ![The Oracle Cloud Applications sign-in page is shown. The User ID field shows mary.jane, the Password field is empty.](images/login.png)

2. Click the menu ![Hamburger menu icon](images/icon-menu.png) in the upper left corner, navigate to **Configuration**, then select **Visual Builder** (synonymous with VB Studio):
  ![This image shows the left navigator menu in an Oracle Cloud Applications instance. The Configuration submenu item is expanded and the Visual Builder menu item is highlighted.](images/configuration-vb.png)

3. When VB Studio opens on the Organization page, select the project you want to use to develop extensions for your Oracle Cloud Application.

  If you don't have a project, [follow these instructions](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-administration/set-vb-studio-extend-oracle-cloud-applications.html#GUID-E1303FFC-767A-4D87-B914-DE7B520AE799) to create one.

## Task 2: Create a workspace for your extension

Once you have your project, create a workspace where you can develop your extension. This workspace is your ticket into the Designer, a visual environment that lets you design and develop your user interface by dragging and dropping components on a page.

1. In the VB Studio navigation menu, click the **Workspaces** ![Workspaces icon](images/icon-workspaces.png) tab.

2. Click **New** and select **New Application Extension**:
  ![This image shows the Workspaces tab for the project with the New menu expanded. The New Application Extension option is selected in the menu.](images/create-extension.png)

3. In the **New Application Extension** dialog, populate the fields with these values:

  | Field | Value | Explanation |
  | --- | --- | --- |
  | Extension Name | YourName-HCMSearch | To keep the names distinct, use your first name and the initial of your last name, as in `JohnD-HCMSearch` |
  | Extension ID | site_YourName-HCMSearch | Automatically filled in, but you can change it if you like |
  | Workspace Name | YourName-HCMSearch | Automatically filled in, but you can change it if you like |
  | Development Environment | Development | Mapped to your current identity domain's Oracle Cloud Applications instance |
  | Base Oracle Cloud Application | None | Not needed in this scenario |
  | Sandbox | No sandbox selected | Not needed in this scenario |
  | Create new repository | Select | Creates a Git repository and branch where your extension's files will be stored |
  | Repository Name | YourName-HCMSearch | Name of the Git repository |
  | Working branch Name | branch1 | Working copy of your Git repository default branch |
  {: title="New App Extension Fields"}

  Here are the values used for demo purposes in this workshop:
  ![This image shows the New Application Extension dialog, with fields filled as follows: Extension Name: HCM Search; Extension Id: site_HCM Search; Workspace Name: HCM Search; Development Environment: Development; Base Oracle Application: None; Sandbox: No sandbox selected. The Create new repository option is selected. HCMSearch is entered in the Repository Name field and branch1 is entered into the Working Branch field.](images/create-workspace.png)
4. Click **Create**.

  VB Studio opens your workspace in the Designer, where you can get started with developing your App UI.

## Task 3: Explore your extension

1. When your workspace first opens in the Designer, your screen might look something like this:
  ![Shows the New App Extension Project dialog with blank Project Name and Add Members fields](images/welcome.png)

  On the far left are icons representing App UIs, Services, Dependencies, and so on. This vertical toolbar is the Navigator, which helps you move between the artifacts in your extension.
2. Take a look at the header:
  ![Shows the New App Extension Project dialog with blank Project Name and Add Members fields](images/header.png)

    * On the left is the name of your current workspace, **DemoHCMSearch**; next to it is the project's Git repository (**DemoHCMSearch.git**) and the branch currently associated with your workspace (**branch1**).

     The **DemoHCMSearch.git** repo stores your extension's files and is known as your project's *remote* repository. It includes the **main** and **branch1** branches, created with initial content for your extension. The **main** branch is the default branch created when a new repo is generated and is the project's source of truth. The **branch1** you see in your workspace is a working copy of your project's repo and serves as your *local* repository. It initially has the same set of source files as the remote branch, but as you develop your extension, it will include the changes you make.

    * Elements on the right let you perform various other actions, such as undo a change or search the Git repository for a file. This workshop primarily demonstrates the options to preview your App UI and publish changes. If you make a mistake during this workshop, click ![Undo icon](images/icon-undo.png) to back out of the last step you did.

  Keep in mind that VB Studio saves your changes automatically as you work. A timestamp at the bottom of the page will show the time your work was last saved.

You may now **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, May 2023
* **Contributors** -  Lisa Dawson, VB Studio User Assistance
* **Last Updated By/Date** - Sheryl Manoharan, May 2023
