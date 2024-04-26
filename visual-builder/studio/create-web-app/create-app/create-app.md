# Create a web app in a visual application

## Introduction

This lab shows you how to create a web app in your visual application and populate it with business objects that store your data.

Estimated Time: 15 minutes

### About this Lab

Web applications in VB Studio take shape within the _Designer_, a rich graphical user interface that lets you design and develop your application by dragging and dropping components on a page. You use these components—all based on the open-source Oracle JavaScript Extension Toolkit (JET)—to create rich UIs that span multiple devices.

Each component depends on a _business object_ for its data. A business object is just a resource—like a purchase order or invoice—that has fields to hold your application's data. It is similar to a database table, as it provides the structure for your data; in fact, business objects are stored in a database. Your application accesses the data in these business objects through REST endpoints that VB Studio generates for you.

In this lab, you'll create the Employee, Department, and Location business objects for the HR web application.

### Objectives

In this lab, you will:

* Create a web app in your visual application
* Create reusable business objects to store data
* Create a diagram to visualize relationships between your business objects

### Prerequisites

This lab assumes you have:

* A Chrome browser
* All previous labs successfully completed

## Task 1: Create a web app

The first thing we'll do is add a web app to the HR visual application you just created. A visual application is a container for all your web applications. In this task, you add a single web app to your visual application, but you can have multiple apps in the same visual application.

1. Under **Create Apps** in the Welcome page, click **Responsive Apps**.

    ![Web Apps pane of the Navigator. There is a plus sign at the top and a + Web Application button at the bottom.](images/web-apps.png "Web Apps pane")

    The Web Apps pane opens in the Navigator.

2. Click **\+ Web Application** (or the **+** sign at the top of the Web Apps pane).

3. In the Create Web Application window, enter `hrwebapp` as the **Application Name**. (You can specify uppercase as well as lowercase characters in the application name, but the name is converted to lowercase.) Leave the **Navigation Style** set to the default, **None**, and click **Create**.

    The application opens on the **main-start** page, which is your application's default home page created automatically for you. (Ignore the **This dot says that you have made some changes** dialog that appears in the header for now; we'll explore Git changes in a later lab.)

    What you see under the **main-start** tab is your application's main work area. Just under main-start are several horizontal tabs: **Page Designer**, **Action Chains**, **Event Listeners**, and so on. Each tab provides editors to help you examine and modify artifacts used in the page. By default, the page opens in the Page Designer, which is where you'll do the bulk of your work in VB Studio.

    ![Web Apps pane after the hrwebapp has been created. The app itself is open on the right, on the main-start page, showing the Components Palette. On the far right, the Properties tab shows the Page view.](images/designer.png "Web Apps pane with the hrwebapp")

    Here are the main Page Designer areas you'll use throughout this workshop:
    | #   | Tab        | Functionality                                                                                                                                                           |
    | --- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
    | 1   | Components | UI components (sorted by categories) that you can drag and drop onto a page                                                                                             |
    | 2   | Data       | Data endpoints exposed when you create business objects or service connections                                                                                          |
    | 3   | Structure  | Hierarchical view of the page's structure                                                                                                                               |
    | 4   | Properties | Properties of a component selected on the page. When the entire page is selected (as it is now), you'll see the Page view where you can choose a preferred page layout. |
    | 5   | Canvas     | A design, live, or code view of your page's content                                                                                                                     |
    {: title="Page Designer Work Area"}

    You can collapse and expand tabs to better manage your working area. For example, click **Properties** to hide the Properties pane and expand your work area. You can also move different panes to customize your work area. For example, right-click **Structure** at the bottom of your work area, then select **Move to Top Left** to move the Structure view right under **Components** and **Data**.

    ![Structure view's right-click menu, with the option to 'Move to Top Left' selected. Other options are 'Move to Bottom Left', 'Move to Top Right', 'Move to Bottom Right', and 'Reset All Panels to Default'.](images/structure-view-move.png "Structure view right-click menu")

    When collapsed, each tab will show as a vertical tab on the side of the editor. Click the tab again to expand it.

    See also how you can manage tabs that open in the tab bar. Right-click the **main-start** tab to see the available options. Note that the active tab always stays in focus.

     ![The main-start page tab's right-click menu, with options to 'Close Tab', 'Close Other Tabs', 'Close Tabs to the Right', 'Close All Tabs', and 'Select in Navigator'.](images/tab.png "main-start page tab right-click menu")

    Look in the Web Apps pane to get a tree view of your web application:

     ![The Web Apps pane shows the hrwebapp's tree view. Under hrwebapp, main is expanded with main-start nested under. At the same level as main are the Fragments, Resources, and Root Pages nodes.](images/treeview.png "")

    You'll notice the **hrwebapp** node contains the **main** node, which in turn contains the **main-start** node. The **main** node is the application's default _flow_ containing the default **main-start** page that users first see when the app is run. An application can have multiple flows, each of which can be used to group related pages. This simple application has only one flow and one page, though we'll add more pages later on. By convention, a page takes its flow name as a prefix.

## Task 2: Create a Location business object and import data

Let's now create your first business object and add data to it by importing a CSV file. Every business object needs data associated with it, and there are many ways to do that, as you'll see.

1. Click ![Business Objects icon](images/bo-icon.png) **Business Objects** in the Navigator.
2. Click **\+ Business Object**.
3. In the New Business Object dialog box, enter `Location` in the **Name** field. **Location** is also filled in automatically as the **Display Label**. Click **Create**.
4. Click **Fields** for the newly created Location business object.

    Every business object you create has six default fields: an id, plus fields that provide information on who created and updated the object and when.

    ![Business object page for the Location business object, with the Fields tab open. The other tabs are Overview, Security, Business Rules, Endpoints, and Data. A table shows the current fields, with the Type, Field Name, Display Label, Required, and Description columns visible for each.](images/location-bo-fields.png "Location business object page")

5. Click **\+ Field** and select **Field** to add a field specific to this business object. This is a very simple business object, so we'll only add one new field.
6. In the pop-up box, enter `Location` as the **Label**. The **Field Name** is automatically populated as **location** and the **Type** set to **String** ![String](images/bo-string-icon.png) by default.

    ![The + Field pop-up box, with Location entered in the Label field, location filled in as the Field Name value, and the String type selected. The Create Field button is selected.](images/location-bo-location-field.png "Create Field pop-up box")

    Click **Create Field**.

7. For the newly created **location** field, select the check box in the **Required** column.

8. Click [this link](https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/developer-library/location.csv) to download the `location.csv` file to your file system. This file contains four locations and provides the data for the Location business object.

9. Click the **Data** tab, then **Import from File** ![Import from File icon](images/import_icon.png).

    ![Data tab of the Location business objects. No data is displayed.](images/location-data.png "Data tab of the Location business object")

10. In the Import Data dialog box,  click the drag and drop box, browse to select the `location.csv` file, and click **Import**.

    ![Import from File dialog box after the Location.csv file has been imported. The Close button is selected.](images/location-data-import.png "Import from File dialog box")

    When the import succeeds, click **Close**. You'll see a list of locations.

    ![Data tab for the Location business object after its data has been imported.](images/location-data-import-result.png "Data tab for the Location business object with data")

## Task 3: Create the Department and Employee business objects

Let's now create the Department and Employee business objects. But instead of creating the business objects and fields one by one and importing data for them, you'll import a ZIP file that defines the two business objects with their fields and data all at once.

1. Click [this link](https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/developer-library/other-bos.zip) and download the `other-bos.zip` file. This ZIP file contains CSV files for the Department and Employee business objects. Feel free to review the contents.

2. In the Navigator's Business Object pane, click **Menu** ![Menu icon](images/menu-icon.png) and select **Data Manager**. The Data Manager is what you use to import data from a variety of sources.

    ![Data Manager option in Business Objects menu](images/data-mgr.png "Data Manager menu option")

3. On the Manage Application Data page, select **Import Business Objects**.

     ![Manage Application Data page, also known as the Data Manager. Import Business Objects is selected.](images/import-bos.png "Manage Application Data page")

4. On the Upload File step of the Import New Business Objects wizard, click the drag and drop box, select the `other-bos.zip` file, and click **Upload**.

    When the upload succeeds, you'll see a message that the import contains records for the Department and Employee business objects. Click **Next**.

    ![Import New Business Objects wizard on the Upload File screen. A zip file has been uploaded and the results show at the bottom.](images/import-bos-upload-result.png "Upload File Screen in the Import New Business Objects wizard")

5. On the Business Objects step, you'll see the definitions that will be used to create the **department** and **employee** business objects. Leave them as is and click **Next**.

6. On the Fields step, you'll need to make some changes. For the **department** business object (selected by default), look for the `location` field in the second row and click **#** in the Type column. Change the type setting as follows:

      * Select the **Type** as **Reference** ![Reference icon](images/reference-icon.png). A Reference field is like a foreign key in a database table: it's a field that refers to the key (the Id field) of another business object to link the two business objects together.
      * Select **Location** as the **Referenced Business Object**. The default for a **Referenced Business Object** is always the current business object (in this case, Department), so make sure you select **Location** from the drop-down list. Now when you create a department, you'll be able to specify one of the floors as the department's location.
      * Leave the **Display Field** as **Location** (automatically populated).

    ![Type option of the location field selected. A pop-up box shows the Type set to Reference, the Referenced Business Object set as Location, and the Default Field shown as Location.](images/import-bos-upload-fields-deptlocationfield.png "Type option of the location field")

    Click **OK**.

7. For the same **location** field, click **Required** to deselect the setting (**department** and **id** are the only required fields for the **department** object).

8. Now click the **employee** tab and change the **department** field to a reference. Click **#** in the **department** field's Type column and change the Type setting as follows:

    * Select the **Type** as **Reference** ![Reference icon](images/reference-icon.png).
    * Select **Department** as the **Referenced Business Object**.
    * Leave the **Display Field** as **Department** (automatically populated).

    Click **OK**.

9. Remove **Required** for all Employee fields, except **name** and **id**.

    ![Employee object's fields. The Required column is highlighted and deselected for all fields, except Name.](images/import-bos-upload-fields-employee.png "Employee object's fields")

10. Click **Finish**. When the import completes successfully, click **Close**.

    ![The Applying Changes dialog, stating that data import finished successfully.](images/import-bos-result.png "Applying Changes dialog")

11. In the Business Objects pane, you'll now see two new business objects, each of which becomes a table in VB Studio's embedded database. Click **Department**, then **Data** to view four departments imported from the spreadsheet. See how the **location** column shows each department's floor, as defined in the referenced Location object.

    ![The newly created Department and Employee objects on the Business Objects page. Department is open on the Data tab, showing four departments.](images/new-bos.png "Department and Employee objects")

12. Click **Employee** in the Business Objects pane, then **Data** to view six employees imported from the spreadsheet. See how the **picture** column uses paths to images stored elsewhere. If you want to change the data, select a row and click ![Edit row icon](images/edit-row-icon.png).

13. Now click **Endpoints** to view the Employee object's REST endpoints. These endpoints expose the object's data and let you perform operations to create, read, update, delete as well as query this data in your pages.

    ![Endpoints tab for the Employee business object. It displays 5 endpoints for the Employee; the referenced departmentObject is not expanded. Above the Endpoints node are the Resource APIs and the Resource Cache Control nodes, which are also not expanded.](images/employee-bo-endpoints.png "Endpoints tab for the Employee business object")

     Because the Employee object refers to the Department object, you'll see the Department endpoints also listed here under **departmentObject**.

    If you click an endpoint, an endpoint viewer displays details of endpoint settings and headers sent in a request. You can also test requests and view responses. To do this, click the **getall_Employee** endpoint, then in the Test tab, click **Send Request** (you can supply your own parameter values if you want):

    ![Test tab for the getall_Employee endpoint. When you click Send Request, the Response section shows the results in the Body tab.](images/employee-bo-endpoints-getall.png "Test tab for the getall_Employee endpoint")

    Click **Endpoints** to return to the main Endpoints page.

## Task 4: Create a business object diagram

Now that you have your business objects, create a diagram that visualizes the business objects and their relationships.

1. In the Business Objects pane, click **Diagrams**, then **\+ Business Object Diagram**.

    ![Diagrams tab of the Business Objects pane. The + Business Object Diagram button is selected.](images/bo-diagram.png "Diagrams tab")

2. In the Create Business Object Diagram dialog box, enter `HRDiagram` in the **Diagram name** field and click **Create**.

    An empty diagram page opens.

3. In the Properties pane, click **Select All** next to Business Objects.

    ![Properties pane for the HRDiagram, with all three business objects selected.](images/bo-diagram-selectall.png "Properties pane for the HRDiagram")

    You'll see a diagram representing the three business objects you created and their relationships:
    ![Database schema for the HR visual web application. Every table has a system-defined Id field. The Location table has one user-defined field, Location. The Department table has two user-defined fields, Department and Location. The Employee table has seven user-defined fields: Country, Department, Email, Hire Date, Name, Picture, and Salary.](images/dbdiagram.png "Database schema")

    You may **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, November 2021
* **Last Updated By/Date** - Sheryl Manoharan, April 2024
