# Create pages to display your data

## Introduction

This lab shows you how to create pages to display data from the business object you created in the previous lab and to create new instances of the business object.

Estimated Time:  10 minutes

### About this lab

In Oracle Visual Builder, you create pages in your mobile application by dragging and dropping components. You can use Quick Starts to quickly create pages to display, create, edit, and delete your application's data.

In this lab, we'll use Quick Starts to create a page that displays Departments and another that displays Employees. We'll also create pages that let users add a new department and a new employee - again using Quick Starts.

### Objectives

In this lab, you will:

* Add a page to display data from your business object
* Add a page to create a new instance of your business object

### Prerequisites

This lab assumes you have:

* A Chrome browser
* All previous labs successfully completed

## Task 1: Use the main-start page to display departments

These steps assume that you are already logged in to Oracle Visual Builder and are viewing the HR Application you created in the previous lab.

1. Click the **Mobile Applications** ![Mobile Apps icon](images/mob_icon.png) tab.
2. Expand the **hrmobileapp**, **Flows**, and **main** nodes, then click **main-start**.

    ![Shows the hrmobileapp expanded in the Mobile Apps pane. Under hrmobileapp is the Flows folder called main. Under main, the main-start page is selected.](./images/mobile-apps-treeview.png)

    You're viewing the Page Designer, where you'll use the Components and Structure tabs on the left to design your pages. You'll also use the Properties pane on the right to view and edit a component's properties.

    Click the **Mobile Applications** tab on the left to hide the Mobile Apps pane and create more room for the Page Designer. You may also want to widen your browser window.

3. In the Components palette, scroll down to Collection and drag a **List View** component to the page's Content Placeholder section.

4. In the Properties pane, click **Add Data** to open the Add Data Quick Start.

    ![This image shows the Quick Start menu for a new list. The Add Data quick start is the only option available for selection.](./images/dept-add-data-qs.png)

5. On the Locate Data page of the Quick Start, select the **Department** business object, then click **Next**. (Depending on your Visual Builder instance, you may or may not see Process Objects.)

    ![This image shows part of the Locate Data page of the Add Data quick start. The Department business object is selected](./images/dept-add-data.png)

6. On the Select List Item Template page, select the label - value pairs template, and click **Next**.

    ![Shows the Select Template page of the Add Data quick start, where the label-value pair is selected.](./images/dept-add-data-select-template.png)

7. On the Bind Data page, under **item\[i\]**, select the **id**, **name**, and **location** items. The columns appear in the order selected; if you want to change the order, drag a **Handle** ![Handle icon](./images/handle_icon.png) to reorder the columns as desired. Click **Next**.

    ![This image shows the Bind Data page of the Add Data quick start. The id, location, and name check boxes are selected.](./images/dept-add-data-select-fields.png)

8. On the Define Query page, click **Finish**.

    The empty list view component is displayed with a message that there are no items to display.

## Task 2: Add a Create page for the Department business object

A Create page allows you to create data instances. In this step, you're setting up a Create page that lets your users create new departments.

1. If necessary, click the **List View** component on the page, then click **Quick Start** to display the Quick Start menu again.
2. Click **Add Create Page**.
3. On the Select Endpoint page, select the **Department** business object if necessary, then click **Next**.

    ![Shows the Select Endpoint page of the Add Create Page quick start. The Department business object is selected.](./images/create-page-qs.png)

4. On the Page Detail page, under Endpoint Structure, select the **location** check box. The **name** check box is already selected, because **name** is a required field. These are the only fields the user needs to specify.
5. Change the value in the **Button label** field to `Create`. Leave the other values set to their defaults. Click **Finish**.

    ![Shows the Page Detail page of teh Add Create quick start. The location and name fields are selected. ](./images/create-page-qs-select-fields.png)

    A **+** button appears on the main-start page. Click the **Mobile Applications** tab to view the main-create-department page created in the **main** page flow. You may want to click the **Components** tab to close the Components palette and make room for your view.

    ![Shows the Departments page with a + icon on the top right.](./images/create-page-icon-on-page.png)

6. Click the **main-create-department** page to open it in the Page Designer.
7. In the Page Designer toolbar, click **Live** to make the form active.
8. Enter `Administration` in the **Name** field, and enter `Floor 1` in the **Location** field. Click **Save**.

    ![Shows the Create Department page with the Name (set to Administration) and Location (set to Floor 1) fields. ](./images/create-dept-fields.png)

    Oracle Visual Builder places you in the **main** page flow of your application, where you can see that the main-start page points to the main-create-department page.

    ![This image shows the application's main flow, with the main-start page pointing to the main-create-department page.](./images/mainflow.png)

9. Open the **main-start** page either by clicking the page name in the Navigator or by clicking the tab above the canvas area to see the List View component with the new department  you created. If you don't see it, click **Reload page** ![Reload icon](images/reload_icon.png).

    ![This image shows the Departments page with a new Administration department listed.](./images/depts-new-department.png)

10. Click **Design** to return to Design view.

## Task 3: Change the name of the main-start page

It makes sense at this point to change the name of the main-start page to main-departments.

1. In the Navigator, right-click the **main-start** page and select **Rename**.

    ![Shows the app's tree view, with the main-start's context menu showing the Rename option.](./images/treeview-rename.png)

2. In the Rename dialog box, change `start` to `departments` in the **ID** field and click **Rename**.
3. In the Navigator, click the **main-departments** page to go to that page again.
4. Although you have changed its name, the main-departments page continues to be the page where your application starts when you run it. To find out why, click the **Source View** ![Source view icon](./images/sourceview_icon.png) tab and expand the **mobileApps**, **hrmobileapp**, **flows**, and **main** nodes. Then click **main-flow.json** to open it.

    ![Shows the JSON view of the main-departments page, with defaultPage set to main-departments.](./images/defaultpage.png)

    You can see that the `defaultPage` property has been set to the value `main-departments`, making it the starting page for the mobile application flow.

   You may **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, Visual Builder User Assistance

* **Last Updated By/Date** - Sheryl Manoharan, March 2023
