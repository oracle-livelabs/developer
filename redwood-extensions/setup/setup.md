# Creating a New Application Extension

## Introduction

*Starting from inside Oracle Fusion Cloud Applications, we'll navigate to Visual Builder and create a new workspace where we can develop our new Application Extension.

Estimated Lab Time: 10 minutes

### About <Product/Technology> (Optional)
Oracle Visual Builder Studio is included as one of the configuration tools that come with Oracle Cloud Apps. We'll be using it to create and manage a project where we develop extensions.

### Objectives

*List objectives for this lab using the format below*

In this lab, you will:
* Navigate to Visual Builder
* Create a new workspace

### Prerequisites (Optional)

*List the prerequisites for this lab using the format below. Fill in whatever knowledge, accounts, etc. is necessary to complete the lab. Do NOT list each previous lab as a prerequisite.*

This lab assumes you have:
* An Oracle Cloud account
* All previous labs successfully completed


*This is the "fold" - below items are collapsed by default*

## Task 1: Open Visual Builder

Users with the right roles can access Visual Builder Studio from the TEST instance of their Oracle Cloud Applications.

1. Login to Oracle Cloud Applications

	![Image alt text](images/sample1.png)

2. From the hamburger menu at the top right, navigate to the configuration section and expand it. Select the Visual Builder option.

  ![Image alt text](images/sample1.png)

3. When prompted to select a project choose the CloudWorld project. Visual Builder Studio uses projects to manage development teams activities.

	  ![Image alt text](images/sample1.png)

4. You'll be taken into the project home page. From here you can navigate to all the components of your project. Including Environments, Git repositories, CI/CD pipelines, Issue tracking system, wiki and much more. In this lab we'll only focus on the Workspace part.

			  ![Image alt text](images/sample1.png)

5. Click the **Workspaces** section on the left navigation menu ![Image alt text](images/sample2.png) click **Navigation**.

6. Click the **New** button and select **New Application Extension** to create a new workspace for your own extension.

7. In the creation dialog that pops up populate the fields with these values
| Field | Value | Explanation |
| --- | --- | --- |
| Extension Name | YourName-Accounts | To keep a distinct name use your name  |
| Development Environment |Choose the option available | This is mapped to your SaaS instance|
| Base Oracle Cloud Application | None | We are creating a new app without dependencies |
| Use Scratch Repository | Checked | For now we just want your personal copy of the code |
Click Create - this might take a couple of minutes to complete and then you'll be taken into the Visual Editor.


## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [What is an Extension](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/basics.html#GUID-A729A4FB-CD2E-48C8-BDE3-577DEE835332)
* [What is a Workspace](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/basics.html#GUID-8E1EF322-51B5-4411-BAAA-F2AB3796C8FB)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
