# Create a mobile application

## Introduction

This lab shows you how to create a basic mobile application in Oracle Visual Builder and populate it with data from a business object.

Estimated Time:  10 minutes

### About this lab

Oracle Visual Builder is a development tool for creating web and mobile applications that lets you create an application by dragging and dropping components onto a page. It also allows you to manipulate the application and your business objects through the underlying source code, to create types and variables, to access REST endpoints, and to create action chains.

You’ll create a business object and a mobile application that you'll later use to display, edit, and delete data about departments. You'll also enable the mobile application to run as a Progressive Web App as well as create build configurations that enable Oracle Visual Builder to build mobile applications for installation on Android and iOS devices.

![Image of the mobile app ready to be staged for testing. The Department Detail page shows with the Name and Location fields. On the right is a pane with a Build my App button.](./images/vbmca_dbdiagram.png)

### Objectives

In this lab, you will:

* Create a mobile app
* Create a reusable business object to store data

### Prerequisites

This lab assumes you have:

* A Chrome browser
* All previous labs successfully completed

## Task 1: Create a mobile application

1. In the web browser, sign in to Oracle Visual Builder.

    * If you have no current applications, the landing page appears. Click **\+ New  Application.**
    * If you have one or more current applications, the Visual Applications page appears. Click **New.**

2. In the Create Application dialog box, enter `HR Application` in the **Application Name** field and `Tutorial application` in the **Description** field.

    The **Application ID** text field is automatically populated based on the value that you enter in the **Application Name** field. Make sure the **Empty Application** template is selected in the Application template list, then click **Finish**.

    The new application opens in the Welcome screen. The `DEV` and `1.0` tags next to the application name indicate the status (development) and the version.

    ![This image shows a new application's Welcome page. It contains tiles in three sections: Connect to Data, Create Apps, and Add Artifacts. On the right are Learn and Help sections with references to documentation and other resources.](./images/visual-app-welcome.png)

3. Click **Mobile Apps** and click **\+ Mobile Application** in the Mobile Apps pane.

4. In the General Information screen of the Create Mobile Application wizard, enter `hrmobileapp` in the **Application Name** field, select **None** as the navigation style, and click **Next.**

    ![This image shows the Create Mobile Application dialog. hrmobileapp is entered as the application name and None is selected as Navigation style.](./images/create-app.png)

5. In the Page Template – main page of the Create Mobile Application wizard, select **Custom** and click **Create**.

    Oracle Visual Builder creates the mobile application and opens the main-start page in the Page Designer.

6. Click **Page Title**, then enter `Departments` as the page title in the Properties pane on the right.

    ![Shows Departments page. On the right in the properties pane, the Page Title is set as Departments](./images/departments.png)

## Task 2: Create a Department business object

1. Click the **Business Objects** ![Business Objects icon](./images/bo_icon.png) tab.
2. Click **\+ Business Object**.
3. In the New Business Object window, enter `Department` in the **Label** field and click **Create**.

    The **Name** field is automatically populated based on the value that you enter in the **Label** field. When you create a business object label, use the singular form of the name.

    ![New Business Object dialog with Department set as label. Create button is selected.](./images/new-dept.png)

4. Click the **Fields** tab, then click **\+ Field.**

    ![This image shows the business object page for the Department business object, with the Fields tab open. The other tabs are Overview, Security, Business Rules, Endpoints, and Data. A table shows the current fields, with the Type, Field Name, Display Label, Required, and Description columns visible for each.](./images/department-bo-fields.png)

5. In the pop-up box, enter `Name` in the **Label** field.

    The **name** value is automatically populated in the **Field Name** field, and **String** ![Text field icon](./images/textfield_icon.png) is selected by default in the **Type** field. Click **Create Field**.

    ![This image shows the + Field pop-up box, with Name entered in the Label field, name filled in as the Field Name value, and the String type selected. The Create Field button is selected.](./images/create-new-dept-field.png)

6. In the Name field's Properties pane, select the **Required** check box under **Constraints.**

    ![This image shows part of the Properties pane for the Name field. The Field Name value is name, the Display Label is Name, the Type is String, and the Value Calculation is None. Under Constraints, the Required check box is selected.](./images/dept-name-required.png)

7. Click **\+ Field** again. In the pop-up window, enter `Location` in the **Label** field, and click **Create Field**.

    The **location** value is automatically populated in the **Field Name** field, and **String** ![Text field icon](./images/textfield_icon.png) is selected by default in the **Type** field.

8. Click the **Endpoints** tab and view the REST endpoints created for the Department business object.

    ![This image shows the Endpoints tab for the Department business object. It displays 5 endpoints for the Department. Above the Endpoints node are the Resource APIs and the Resource Cache Control nodes, which are also not expanded.](./images/dept-endpoints.png)

    You may **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, Visual Builder User Assistance

* **Last Updated By/Date** - Sheryl Manoharan, March 2023
