# Create Pages from Templates

## Introduction

In this lab we'll create a new application and add pages built from Redwood Page Templates.

Estimated Time: 5 minutes

### Objectives

In this lab, you will:

* Create a welcome page using the Redwood Welcome Page Template
* Create an account details page using the Horizontal Foldout Layout Page Template
* Create an account edit page using the Simple Create and Edit Page Template

**Tip:** In the header area (the black bar along the top), you'll also find the Undo and Redo buttons, which look like this:

  ![Undo button](images/undo.png)

If you make a mistake during this lab, click Undo to back out of the last step you did.

## Task 1: Create an App UI

You should now be in the Designer, VB Studio's visual editor. We'll start by creating an *App UI*, which is simply an application that includes a user interface component in the form of Visual Builder pages and flows. With App UIs, you can create new interfaces that address specific business needs for your company.

1. On the left side of the Designer's navigator, click the first tab, App UIs, click **+ App UI**:

  ![App UI button](images/results.png)

2. In the Create App UI dialog, provide a name in the form **YourName-Accounts**, then click **Create**:

  ![App UI properties](images/wssettings.png)

In the Diagram view on the right, you can see the flows and pages for this App UI. A flow contains pages that relate to each other. An application can contain multiple flows, and a flow can contain many pages. In this case we have one flow, *main*, and one page, *main-start*:

  ![Flow diagram](images/appflow.png)

## Task 2: Add a Welcome Page as the New Default Page

You should be in the Diagram tab with the Components open.

1. Double-click  **main** to open its flow diagram:

  ![Double-Click Main](images/doubleclickmain.png)

You are going to replace the main-start page with one that uses a Redwood template, so the existing one can be deleted.

2. Right-click on the main-start page, select **Delete**:

  ![Set Default page](images/deletemainstart.png)

In the Components tab you will see a page named **Welcome Page Template**.  If you do not see this template, go back to the first lab and make sure you have all of the components installed.

  ![Welcome page template](images/welcomepagetemplate.png)

3. Drag the **Welcome Page Template** into the diagram editor:

  ![Drag Welcome page template](images/dropwelcometemplate.png)

4. Name the new page **main-start**, then click **Create**:

  ![Name Welcome page](images/namewelcomepage.png)

## Task 3: Add a Details Page

You should be in the Diagram tab with the Components open.

In the Components tab you will see a page named **Horizontal Foldout Layout Page Template**.  If you do not see this template, go back to the first lab and make sure you have all of the components installed.

  ![Horizontal Foldout page template](images/horizontalfoldoutpage.png)

1. Drag the **Horizontal Foldout Layout Page Template** into the diagram editor:

  ![Drag Detail page template](images/dropfoldouttemplate.png)

2. Name the new page **main-accounts-detail**, then click **Create**:

  ![Name Details page](images/namedetailspage.png)

## Task 4: Add an Edit Page

You should be in the Diagram tab with the Components open.

In the Components tab you will see a page named **Simple Create and Edit Page Template**.  If you do not see this template, go back to the first lab and make sure you have all of the components installed.

  ![Simple Create and Edit page template](images/simplecreateeditpage.png)

1. Drag the **Simple Create and Edit Page Template** into the diagram editor:

  ![Drag Edit page template](images/dropedittemplate.png)

2. Name the new page **main-edit-accounts**, then click **Create**:

  ![Name Edit page](images/nameeditpage.png)

Next you will configure a variable to work as an input parameter for the edit page.

3. Double-click **main-edit** to open the page:

  ![Open Edit page](images/openmain-edit.png)

4. Switch to the **variables** tab:

  ![Variables tab](images/variablestab.png)

5. In the list of variables, click on **objectId**:

  ![Select objectId](images/selectobjectid.png)

6. In the properties on the right set **Input Parameter** to **Required**:

  ![Set input parameter](images/setobjectidrequired.png)

You now have three pages created for your application.

Let's move on to the next lab, where we'll learn how to configure the Welcome page.

You may now **proceed to the next lab**.

## Learn More

* [Use the Page Designer](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/get-started1.html#GUID-CC2B203D-51D3-4408-8D0B-4E26C86BCBC0)
* [Oracle JET](http://oracle.com/jet)

## Acknowledgements
* **Author** - Shay Shmeltzer, Oracle Cloud Development Tools, August 2022
* **Contributors** -  Marcie Caccamo, Blaine Carter, Oracle Cloud Development Tools
* **Last Updated By/Date** - Blaine Carter, Oracle Cloud Development Tools, May 2023
