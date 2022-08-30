# Creating a New Application Extension

## Introduction

Starting in Oracle Fusion Cloud Applications, we'll navigate to Visual Builder Studio and create a new workspace where we can develop our extension.

Estimated Lab Time: 5 minutes

### About Oracle Visual Builder Studio
Oracle Visual Builder Studio is included as one of the configuration tools that come with Oracle Fusion Cloud Apps. We'll use VB Studio to create and manage a project where we develop extensions.

### Objectives

In this lab, you will:
* Access Oracle Visual Builder Studio
* Create a new workspace


## Task 1: Access Visual Builder Studio and Create a Workspace

Users with the right roles can access VB Studio from their Oracle Fusion Cloud Applications' TEST instance.

1. Login to Oracle Cloud Fusion Applications:

	![login screen](images/login.png)

2. From the hamburger menu at the top left, navigate to the **Configuration** section and expand it. Select the **Visual Builder** option (which technically should be "Visual Builder Studio"):

  ![Main menu](images/menu.png)

3. On the Organization page, click the **cloudworld-lab** project:

  ![Projects](images/projects.png)

	VB Studio uses *projects* to manage individual development teams' activities.

4. You are now on the project's home page. From here you can navigate to all your project's components, including environments, Git repositories, CI/CD pipelines, issue tracking system, wikis, and much more. In this lab, we'll focus only on workspaces. A *workspace* is a private area where you can develop your extension. Among other things, the workspace defines your Git repository, your Oracle Fusion Cloud Application environment, and other important details.

	![Home Page](images/homepage.png)

5. Click **Workspaces** in the left navigation menu:

	![Image alt text](images/workspace.png)

6. Click **New**, then select **New Application Extension** to create a new workspace for your extension:

	![Image alt text](images/newWorkspace.png)

7. In the New Application Extension dialog, populate the fields with these values:
| Field | Value | Explanation |
| --- | --- | --- |
| Extension Name | YourName-Accounts | To keep the names distinct, use your first name plus first initial of your last name, as in *MaryC-Accounts* |
| Development Environment |Choose the option available | Mapped to your SaaS instance|
| Base Oracle Cloud Application | None | Not needed in this scenario |
| Use Scratch Repository | Check | For now, you can just work in a private Git repository |
{: title="New App Extension Properties"}

	![workspace settings](images/workspacesettings.png)

8. Click **Create**.  It may take a couple of minutes to create your workspace.  When VB Studio is finished, you'll be taken into the Designer, where you can get to work:

	![visual editor](images/results.png)

## Learn More

* [What Is an Extension](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/basics.html#GUID-A729A4FB-CD2E-48C8-BDE3-577DEE835332)
* [What Is a Workspace](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/basics.html#GUID-8E1EF322-51B5-4411-BAAA-F2AB3796C8FB)

## Acknowledgements
* **Author** - Shay Shmeltzer, Oracle Cloud Development Tools, August 2022
* **Contributors** -  Blaine Carter, Oracle Cloud Development Tools
* **Last Updated By/Date** - Shay Shmeltzer, Oracle Cloud Development Tools, August 2022
