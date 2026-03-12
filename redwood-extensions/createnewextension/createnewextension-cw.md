# Create a New Extension

## Introduction

Starting in Oracle Fusion Cloud Applications, we'll navigate to Visual Builder Studio and create a new workspace where we can develop our extension.

Estimated Lab Time: 5 minutes

### About Oracle Visual Builder Studio
Oracle Visual Builder Studio (which we'll call "VB Studio" from now on) is included as one of the configuration tools that come with Oracle Fusion Cloud Apps. We'll use VB Studio to create and manage a project where we develop extensions.

### Objectives

In this lab, you will:
* Access VB Studio
* Create a new workspace


## Task 1: Access Visual Builder Studio and Create a Workspace

Users with [the right roles](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-administration/configure-oracle-cloud-applications-custom-roles.html) can access VB Studio from their Oracle Fusion Cloud Applications' TEST instance.

1. Log in to Oracle Fusion Cloud Applications:

	![login screen](images/login.png)

2. In the hamburger menu at the top left, navigate to the **Configuration** section and expand it. Select the **Visual Builder** option (in this case, synonymous with "Visual Builder Studio"):

  ![Main menu](images/menu.png)

3. On the Organization page, click the **cloudworld-lab** project:

  ![Projects](images/projects.png)

	VB Studio uses *projects* to manage individual development teams' activities. You are now on the project's home page:

	![Home Page](images/homepage.png)

	From here you can navigate to all your project's components, including environments, Git repositories, CI/CD pipelines, issue tracking system, wikis, and much more. In this lab, we'll focus only on workspaces. A *workspace* is a private area where you can develop your extension. Among other things, the workspace defines your Git repository, your Oracle Fusion Cloud Application environment, and other important details.

4. Click **Workspaces** in the left navigation menu:

	![workspaces](images/workspace.png)

5. Click **New**, then select **New Application Extension** to create a new workspace for your extension:

	![new workspace](images/newworkspace.png)

6. In the New Application Extension dialog, populate the fields with these values:
| Field | Value | Explanation |
| --- | --- | --- |
| Extension Name | YourName-Accounts | To keep the names distinct, use your first name plus the first initial of your last name, as in *MaryC-Accounts* |
| Development Environment |Choose the option available | Mapped to your SaaS instance|
| Root Folder | extension1 | Do not change |
| Sandbox | No sandbox selected | Not needed in this scenario |
| Use scratch repository | Check | For now, you can just work in a private Git repository |
{: title="New App Extension Properties"}

	![workspace settings](images/workspacesettings.png)

7. Click **Create**.  It may take a couple of minutes to create your workspace.  When VB Studio is finished, you'll be taken into the Designer, where you can get to work:

	![visual editor](images/results.png)

## Task 3: Install Components

VB has some of the most commonly used components pre-installed.  Other components are available in the Component Exchange.  In this lab you will load the components you will need for the extension.

1. On the far left side of the Designer's navigator, click the fifth tab, Components:
![Edit values](images/OpenComponentsTab.png)
2. Click Browse:

Clicking the name of any component in the list will open a details page for that component.

Install the **Collection Container** component.
1. In the **Search** field, enter **Collection Container**:
2. If the button under **Collection Container** says **Install**, click the button.  If it says **Installed**, proceed to the next component:
3. In the popup window, check the box to accept the license and click the **Install** button:
![Edit values](images/InstallCollectionContainer.png)

Install the **Foldout Layout Horizontal Template Pattern** component.
1. In the **Search** field, enter **Foldout Layout Horizontal Template Pattern**:
2. If the button under **Foldout Layout Horizontal Template Pattern** says **Install**, click the button.  If it says **Installed**, proceed to the next component:
3. In the popup window, check the box to accept the license and click the **Install** button:
![Edit values](images/InstallFoldoutLayoutHorizontalTemplatePattern.png)

Install the **Summarizing Foldout Panel** component.
1. In the **Search** field, enter **Summarizing Foldout Panel**:
2. If the button under **Summarizing Foldout Panel** says **Install**, click the button.  If it says **Installed**, proceed to the next component:
3. In the popup window, check the box to accept the license and click the **Install** button:
![Edit values](images/InstallSummarizingFoldoutPanel.png)

Install the **Simple Create and Edit Page Template Pattern** component.
1. In the **Search** field, enter **Simple Create and Edit Page Template Pattern**:
2. If the button under **Simple Create and Edit Page Template Pattern** says **Install**, click the button.  If it says **Installed**, proceed to the next component:
3. In the popup window, check the box to accept the license and click the **Install** button:
![Edit values](images/InstallSimpleCreateEditPageTemplatePattern.png)

Install the **Welcome Page Template** component.
1. In the **Search** field, enter **Welcome Page Template**:
2. If the button under **Welcome Page Template** says **Install**, click the button.  If it says **Installed**, verify that you have all 5 components loaded:
3. In the popup window, check the box to accept the license and click the **Install** button:
![Edit values](images/InstallWelcomePageTemplate.png)

You should now have the following components installed.
* Collection Container
* Foldout Layout Horizontal Template Pattern
* Summarizing Foldout Panel
* Simple Create and Edit Page Template Pattern
* Welcome Page Template
![visual editor](images/InstalledComponents.png)

You may now **proceed to the next lab**.

## Learn More

* [What Is an Extension?](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/basics.html#GUID-A729A4FB-CD2E-48C8-BDE3-577DEE835332)
* [What Is a Workspace?](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/basics.html#GUID-8E1EF322-51B5-4411-BAAA-F2AB3796C8FB)

## Acknowledgements
* **Author** - Shay Shmeltzer, Oracle Cloud Development Tools, September 2022
* **Contributors** -  Marcie Caccamo, Blaine Carter, Oracle Cloud Development Tools
* **Last Updated By/Date** - Blaine Carter, Oracle Cloud Development Tools, March 2023
