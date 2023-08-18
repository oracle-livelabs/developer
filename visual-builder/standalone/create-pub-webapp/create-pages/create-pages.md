# Create pages to display your data

## Introduction

This lab shows how to create web pages to display the business objects you created in the previous lab.

Estimated Time:  15 minutes

### About this lab

Now that you've created the Location, Department, and Employee business objects, we'll see how you can create web pages to display data from these business objects. You'll create one page to display departments and another to display employees. You'll also add pages that let your users create a new department or a new employee (in other words, create a new instance of the business object in the database). We'll do all this using Quick Starts, a handy set of wizards that work behind the scenes and make it easy for you to create pages and interact with your data.

### Objectives

In this lab, you will:

* Add web pages to display data from business objects
* Add web pages to create new instances of a business object

### Prerequisites

This lab assumes you have:

* A Chrome browser
* All previous labs successfully completed

## Task 1: Use the **main-start** page to display departments

Create a table to display your departments on the main-start page. The Table component is useful when you want to show lots of data in columns.

1. Click the **Web Applications** ![Web Applications icon](images/web-applications-icon.png) tab in the Navigator.
2. Expand the **hrwebapp** and **main** nodes (if necessary), then click **main-start**, the page that was created as the application's default home page. (You can also open the page by clicking the **main-start** tab just below the header.)

    You might want to click the **Web Applications** tab to close the Navigator pane and expand your work area. You can also widen your browser window.

3. Now that you're in the Page Designer, let's give this page a title. Click **main** on the page canvas—notice how the title text uses the Bind Text component.
    ![This image shows the Page Designer tab for the main-start page, with the 'main' text featured in the Bind Text component selected on the canvas.](images/department-heading.png "")

    If you're having trouble selecting the component, you'll need to expand the canvas area to better view its elements. Make sure you select the Bind Text component, not the div element surrounding it.

4. In the Bind Text component's Properties pane (click **Properties** if needed), replace `main` with `Departments` in the **Value** field.

    ![This image shows the Bind Text's Properties pane, with the Value field set to Departments.](images/departments.png "")

5. Click **Components** on the left edge of your work area to open the Components palette. Enter `table` in the Filter field, then drag and drop the Table from the Collections category onto the canvas.

    ![This image shows a Table component being dragged onto the page canvas.](images/department_add_table.png "")

    A table with some sample data is added to the page. We'll use this table to display three columns that map to the Department business object's id, department, and location fields.

6. Select the table if necessary, then click **Add Data** in the Properties pane's Quick Start tab to open the Add Data Quick Start.

    ![This image shows the Quick Start menu for a new Table. The Add Data quick start is the only option available for selection.](images/department-add-data-quick-start.png "")

    Quick Starts simplify things so you can quickly build common functionality that every application provides. Here, we'll use the Add Data Quick Start to connect your table to the Department business object and display that data. The Quick Start wizard will prompt you to select your data source, select the fields from the business object that you want to show in your table, and filter data (which we won't do here).

7. On the Locate Data step of the Quick Start, select **Department** under Business Objects, then click **Next**.

    ![This image shows part of the Locate Data page of the Add Data quick start. The Department business object is selected.](images/department-add-data.png "")

8. On the Bind Data step, under **item\[i\]**, select the **id** and **department** check boxes (in that order). These two fields will show as Columns for your Departments table.

    ![This image shows the Bind Data page of the Add Data quick start. The id and department check boxes are selected.](images/department-add-data-selectfields.png "")

9. Expand the **locationObject** and **items** nodes (**item\[i\]** is expanded automatically) and select **location**. Because we created a reference from the Department business object to the Location business object, the location field is now available to us through the locationObject accessor, which lets us traverse relationships between the two objects. Click **Next**.

    ![This image shows part of the Bind Data page of the Add Data quick start after the location node has been expanded. The location check box is selected. In the Columns list, location appears at the bottom of the list.](images/department-add-data-selectitemfields.png "")

10. On the Define Query step, click **Finish**.

     A Departments table with the Id, Department, and Location columns is displayed on the main-start page.

     ![This image shows three columns added to the Departments table: Id, Department, and Location.](images/departments_table.png "")

## Task 2: Add a page to create departments

Now that we have a way to show departments, we'll add a Create page that lets users create new departments. With the help of the Add Create Page Quick Start, we'll connect to our data source, the Department business object, and select the fields that we want the user to provide values for.

1. With the Departments table on the main-start page selected, click the **Add Create Page** on the **Quick Start** tab.

2. On the Select Endpoint step of the Add Create Page Quick Start, select **Department** under Business Objects (if necessary) and click **Next**.

3. On the Page Detail step, under Endpoint Structure, select the **location** check box (**department** is already selected because it's a required field). Department and Location are the only fields the user needs to specify to create a department.

    ![This image shows the Page Detail page of the Add Create Page quick start. Under the request check box, the location and department check boxes are selected. The Button label field is set to Create Department. The Page title is Create Department, and the Page name is main-create-department.](images/department_add_create.png "")

4. Leave the other values set to their defaults. Click **Finish**.

    A **Create Department** button appears in a Toolbar component above the table on the main-start page. (You might need to click next to the button to see the Toolbar component.) Click the **Web Applications** tab to see the main-create-department page created in the pages list under **main**.

    ![This image shows the result of the Add Create Page quick start. The main-start page has a button with the label Create in a Toolbar component below the heading and above the table. In the Navigator, the main-create-department page has been added to the pages list under the main flow.](images/department-add-create-result.png "")

5. Let's now quickly test whether we can create departments. Click the **main-create-department** page to open it in the Page Designer.

    The page has a form for you to enter the fields you specified. It also has two buttons: Cancel and Save.

6. In the Page Designer toolbar, click **Live** to make the form active. (Click **Properties** if you need to make room for the form.)

    To indicate that you are in Live view, the **Live** button now has a green background, and a green line appears around the page.

7. Enter `IT` in the **Department** field, and select **Floor 4** from the **Location** drop-down list.

    ![This image shows the use of the Create Department page when you run the application. IT has been entered in the Department field, and Floor 4 has been selected from the Location list.](images/department-add-create-live.png "")

    Click **Save**. A message appears briefly and you are taken to the application's **Diagram** tab, which displays the application's **main** flow and navigational relationships between pages in the flow.

    ![This image shows the web application's main flow, with the main-start page pointing to the main-create-department page.](images/department-add-create-mainflow.png "")

   **Tip:** A page that's marked with a warning triangle usually indicates that the page's code has issues that you might want to review. For example, the warnings for the main-start and main-create-department pages here relate to a translation issue, which you can safely ignore. If you want, click **Audits** at the bottom of the screen to review and resolve issues in the Audits pane. You can also select warnings you don't want flagged and disable reporting for those messages in the Audits Menu ![Audits Menu icon](images/audits-menu-icon.png).

8. Double-click the **main-start** tile to open the page (you can also click the **main-start** tab just below the header or click the page in the Web Apps pane), then click **Reload Design Preview** ![Reload design preview icon](images/reload-icon.png) to see the department you created.

    ![This image shows the Departments page with the Create Department button and the table. The Reload Design Preview icon is selected.](images/department-add-create-reload.png "")

## Task 3: Add a page to display employees

We'll now create a page to display employees, similar to the one you created to show departments. In addition to a table that lists employees, we'll add a chart that lets you display employee salary  visually.

1. In the Web Apps tree, under **hrwebapp**, click **\+** next to the **main** node and select **Create Page**.

    ![This image shows the web application with the main node expanded. The + sign next to main is selected to show the Create Page and Create Flow options.](images/create-page.png "")

2. In the Create Page dialog box, add `employees` in the **Page ID** field after `main-` and click **Create**.

    ![This image shows the Create Page dialog box, with main-employees entered in the Page ID field, and the Create button selected.](images/employees-create-page.png "")

    The main-employees page opens in the Page Designer.

3. Click **main employees** on the page to select the Bind Text component, then in the Properties pane (click **Properties** if you need to), replace `main employees` with `Employees` in the **Value** field.

4. Because we want to show a table as well as a chart, it might help to split the page into two distinct areas, which we'll do using panels. A panel encapsulates content with a border and padding. To add a panel to the page, enter `panel` in the Components Filter field, then drag and drop the **Panel** component onto the page.

5. Select the panel on the page (if necessary) and use the resize cursor to shrink it to seven columns.

    ![This image shows a panel component on the page, with the pane's resize cursor being dragged to resize it to seven columns.](images/panel-on-page-resize.png "")

6. Now let's add our table. This time, instead of using the Components palette, let's use the Data palette, which provides a *data-first approach* to UI design. The Data palette provides access to your business objects, so you can drag and drop them onto the canvas and readily map them to UI components. To see this in action, click the **Data** tab, then expand **Business Objects** and **Employee**.

    ![This image shows the Data palette. The Employee business object under Business Objects is expanded to show its REST endpoints.](images/data-palette-employee-object.png "")

    You see the REST endpoints that Visual Builder created for you when the Employee business object was created.

7. Drag and drop the **Get Many** endpoint (which fetches a list of employees) into the Panel component on the canvas.

    ![The image shows the Render as pop-up with the following options: Table Dynamic, List Dynamic, Table, and List.](images/data-palette-employee-object-table.png " ")

8. Select **Table** in the pop-up menu (the second Table option, not Table Dynamic) to open the Add Data quick start. This quick start is similar to the one you used before to create the departments table, except that you don't need to associate a data source.

9. On the Bind Data step of the Add Data Quick Start, select the **picture** and **name** check boxes under **item\[i\]**.

    ![This image shows part of the Bind Data page of the Add Data quick start. The name and picture check boxes are selected.](images/employees-add-data-1.png "")

10. Expand the **departmentObject** and **items** nodes (**item\[i\]** is expanded automatically) and select **department**.

    ![This image shows part of the Bind Data page of the Add Data quick start after the departmentObject node has been expanded. The department check box is selected. In the Columns list, department appears at the bottom.](images/employees-add-data-2.png "")

    The columns appear in the order selected; if you want to change the order, drag a **Handle** ![Handle icon](images/handle-icon.png) to reorder the columns as desired.

11. For the picture column, change **Text** to **Image**, so the picture displays. Click **Next**.

    ![This image shows the user control element for the picture column in the Columns list. Image is highlighted.](images/picture-text-to-image.png "")

12. On the Define Query step, click **Finish**.

    An Employees table with the Picture, Name, and Department columns is displayed with data. Resize the table to take up all available space within the panel.

    ![This image shows the Employees table on the main-employees page with three columns: Picture, Name, and Department.](images/employees_table.png "")

## Task 4: Add a chart to display employees

Now that you've displayed some employee data in a table, let's add a chart to visually display employee salary. The table and chart both use the Employee business object as their data source, they only display the data differently.

1. Click **Components**, then drag another Panel component onto the page, next to the existing table.

2. Enter `chart` in the Components Filter field, then from the **Chart** section, drag a **Bar Chart** into the panel on the page:

    ![This image shows a Bar Chart component being dropped into the panel component next to the Employee table.](images/panel-on-page-chart.png "")

3. When the Bar Chart is added to the page, resize it to fit the panel.

    ![This image shows the sample Bar Chart expanded to take up the entire panel. With the Bar Chart selected, its Properties pane shows on the right on the Quick Start tab.](images/panel-on-page-chart-resize.png " ")

4. In the Properties pane's Quick Start tab, click **Add Data** to open the Add Data Quick Start.

5. On the Locate Data step of the Quick Start, select **Employee** under Business Objects and click **Next**.

6. On the Map Fields step, select **salary** to add it to the **Values (Y Axis)** field, then **name** to add it to the **Categories (X Axis)** field. Leave the **Colors (Series)** field blank, and click **Next**.

    ![This image shows the Map Fields page of the Add Data quick start with the name and salary check boxes selected.](images/panel-on-page-chart-adddata-fields.png " ")

7. On the Define Query step, click **Finish**.

    The chart displays the salary for each employee.

    ![This image shows the Bar Chart populated with employee data, with name as the X Axis and salary as the Y Axis.](images/panel-on-page-chart-data.png "")

8. Click the chart's General tab in the Properties pane. In the **X Axis, Title** field, change **name** to **Employee Name**. In the **Y Axis, Title** field, change **salary** to **Salary**. Change the Orientation from **Vertical** to **Horizontal**.

    ![This image shows the Bar Chart's properties. X Axis Title is set to Employee Name, Y Axis Title is set to Salary, Orientation is set to Horizontal.](images/panel-on-page-chart-properties.png "")

## Task 5: Add a page to create employees

Add a Create page that lets your users create new employees.

1. Select the table component within the panel on the main-employees page, click the **Quick Start** tab in the Properties pane, and click **Add Create Page**.
2. On the Select Endpoint step of the Add Create Page Quick Start, select **Employee** under Business Objects (if necessary) and click **Next**.

3. On the Page Detail page, select the **picture**, **hireDate**, **email**, **department**, **salary**, and **country** check boxes in that order (**name** is already selected, because it's a required field). Because our employee images are stored in a database elsewhere and we only reference their paths, change the **picture** field's type to **URL** for validation. Change the **email** field's control type from **Input Text** to **Email**.

    ![This image shows the Select Endpoint page of the Add Create Page quick start. Under request, the country, department, email, hireDate, name, picture, and salary check boxes are selected, and those fields are shown under Fields. The Button label field is set to Create Employee. The Page title is Create Employee, and the Page name is main-create-employee.](images/employees-add-create.png "")

4. Leave the **Button label** field and other values to their default values. Click **Finish**.

    A **Create Employee** button appears above the table, and the main-create-employee page appears in the pages list.

5. Click the **main-create-employee** page to open it in the Page Designer.

6. Click within the form on the page but outside of a component (that is, in the **Form Layout** component on the page). In the **General** tab of the Form Layout's properties, set the **Columns** value to **2**.

    ![This image shows the Form Layout component selected on the main-create-employee page. The Columns field in the General tab of the Properties pane is set to 2, so that the employee fields show in two columns on the page.](images/employees_add_create_max_columns.png "")

    The fields now appear in two columns. If you don't see the change, click **Properties** to hide the Properties pane and expand your view.

7. Click **Live** to make the form active. Enter or select the following (you can use other data if you wish):
    * **Name**: `Walter`
    * **Picture**: `https://www.oracle.com/webfolder/technetwork/jet/content/images/hcm/placeholder-male-05.png`
    * **Hire Date**:  Select today's date
    * **Email**: `walter@example.com`
    * **Department**: `IT`
    * **Salary**: `2500`
    * **Country**: `CA`

    Click **Save**.

    Visual Builder briefly displays a message and then places you in your application's **main** flow.

    ![This image shows the page flow for the application's main flow. The main-employees page points to the main-create-employee page, and  the main-start page points to the main-create-department page.](images/employees-add-create-mainflow.png "")

8. Return to the main-employees page. (You can double-click the page tile, in addition to using other navigation mechanisms.) If necessary, click **Reload Design Preview** ![Reload design preview icon](images/reload-icon.png) to display the new employee, both in the table and bar chart.

9. Click **Code** (next to **Design** in the Page Designer toolbar) to view the HTML code for the main-employees page. You can see the code for the title, the table, and the chart within `div` elements. The components and classes all begin with `oj-`, indicating that they are Oracle JavaScript Extension Toolkit (JET) components.

    ![This image shows the HTML code for the main-employees page.](images/employees-add-create-code.png "")

    Select the **oj-bind-text** value in line 34 and change `Employees` to `My Employees`, then click **Design** to see your changes reflected in the page's visual editor.

    ![This image shows the oj-bind-text component code, with its value changed to My Employees. ](images/employees-code-view-changetitle.png "")

     Whichever mode you choose to work in (visual or source code), your changes are synced to keep both views consistent.

10. Now click **Structure** to view the structure of components on the main-employees page. Components that aren't currently visible on the page fade into the background to allow you to focus on parts of a page, a section at a time.

11. Click **Structure** again to close the structure view.

## Task 6: Change the name of the **main-start** page

It makes sense at this point to change the name of the main-start page to main-departments, to match the name of the main-employees page.

1. In the Web Apps pane of the Navigator, right-click the **main-start** page and select **Rename**.

    ![This image shows the hrwebapp and main nodes expanded in the Navigator. The right-click menu for the main-start page is open, and the Rename menu item is selected.](images/main-start-rename.png "")

2. In the Rename dialog box, replace `start` with `departments` in the **ID** field and click **Rename**.

3. Click the **main** node. The page flow Diagram shows the now renamed page. Note how the main-departments page is still badged ![Default and Flow Entry badge](images/default-badge.png), indicating it as the page where your application starts when you run it.

    ![This image shows the page flow of the main flow after main-start has been renamed. The main-departments page still points to the main-create-department page, and the main-employees page points to the main-create-employee page.](images/main-start-rename-mainflow.png "")

4. To find out why, click **Source** ![Source icon](images/sourceview-icon.png) in the Navigator and expand the **webApps**, **hrwebapp**, **flows**, and **main** nodes, then click **main-flow.json**.

    ![This image shows the Source view pane, with the webApps, hrwebapp, flows, and main nodes expanded. The main-flow.json file has been selected and is open. In it, the 'defaultPage' property is set to the value 'main-departments'.](images/mainflow-json.png "")

    You can see that the `defaultPage` property is set to the value `main-departments`, making it the starting page for the web application flow. (If we'd looked before, it would have been set to `main-start`.)

    You may **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, Visual Builder User Assistance, August 2021
* **Last Updated By** - August 2023
