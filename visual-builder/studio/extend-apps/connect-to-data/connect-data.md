# Connect to data

## Introduction

Now that we've created the UI (frontend) for our App UI, it's time to work with the backend and connect to data that lives in Oracle Cloud Applications, so we can display it on the page.

Estimated Time: 5 minutes

### Objectives

In this lab, you will:

* Connect your extension to Oracle Cloud App data
* Set up the App UI to filter and display data

### Prerequisites

This lab assumes you have all previous labs successfully completed.

## Task 1: Connect to a data source

Create a connection to the Oracle Human Capital Management (HCM) services catalog to display employee data in the App UI's pages.

1. Click ![Services icon](images/icon-services.png) **Services** in the Navigator.

2. In the Services pane, click **+ Service Connection**:

    ![This image shows the Services selected in the Navigator. In the Service Connections tab, the + Service Connection button is selected.](images/services-create-service-connection.png)

3. In the **Select Source** screen of the Service Connection wizard, click **Select from Catalog**.

4. Click the **Human Capital Management** tile:

    ![This image shows the Create Service Connection wizard Service Catalog screen with the Human Capital Management tile selected.](images/hcm-tile.png)

5. In the **Create Service Connection** screen, enter `hcmRest` as the Service Name.

6. In the **Filter Objects/Endpoints** text box, enter `work`, then select **publicWorkers** from the search results:

    ![This image shows the Create Service Connection page with the word "work" entered in the search field and the publicWorkers object selected.](images/publicworkers.png)

7. Click **Create**.

    Now we can use this service connection to create the list of employees we want.

## Task 2: Add data to the page and set up filtering

In this task, we're going to display a list of employees in a table and set up a filtering mechanism for the list based on the employee's display name. We want to compare each name to whatever the user enters as a search string, in order to find the proper match.

1. Switch to the main-start page. Click the **main-start** tab just below the header, or click ![App UIs icon](images/icon-appuis.png) **App UIs** in the Navigator and select **main-start** under the **empsearch** and **main** nodes.

2. Select the **Data** tab in the Page Designer, then expand **Services** and **hcmRest**.

    ![This image shows the Data tab in the Page Designer with Services and hcmRest nodes expanded. The publicWorkers is being dragged and dropped on the canvas.](images/publicworkers-datatab.png)

3. Drag **publicWorkers** into Structure view and drop it on the **Welcome Page Template**, then select **Default** in the slots pop-up:

    ![This image shows the Data tab in the Page Designer with Services and hcmRest nodes expanded. The publicWorkers is being dragged and dropped on the canvas.](images/welcome-page-template-default-slot.png)

4. When prompted with options for presenting the data, select **Table** (not the first Table Dynamic option):

    ![This image shows a "Render as" list of options displayed below the Welcome Page TEmplate component. The second "Table" item is selected.](images/render-as-list-selection.png)

5. In the Add Data wizard, the **Endpoint Structure** panel shows all the fields that are available for us to choose from in the **publicWorkers** object. Use the Filter field and select **DisplayName**, **PhoneNumber** and **LocationTownOrCity**. Click **Next**.

    ![This image shows the Add Data page with the word "LocationTownOrCity" in the Endpoint Structure search field. In the Item Template Fields, DisplayName is in the Default slot, PhoneNumber is in the Secondary slot, and LocationTownOrCity is in the Tertiary slot.](images/add-data-wizard-binddata.png)

6. In the **Define Query** screen, select **filterCriterion** in the **Target** panel.

7. At the bottom of the page, click **Click to add condition**.

8. Set up the condition as follows:

    * **Attribute**: DisplayName (Select the **DisplayName** attribute that's not part of the assignments list.)
    * **Operator**: contains ($co)
    * **Value**: $variables.searchString

    ![This image shows the Define Query page with { } filterCriterion selected in the Target pane. At the bottom of the page, the Builder tab is selected and DisplayName is entered in the IF field, contains ($co) is chosen in the operator field, and $variables.searchString is in the variable field.](images/add-data-wizard-definequery.png)

9. Click **Done**, then **Finish**.

    The main-start page should filter and display a list of employees in a table:
    ![This image shows a list of employees displayed in a table under the Emp Name search  field.](images/empdisplay.png)

You may now **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, May 2023
* **Last Updated By/Date** - Sheryl Manoharan, January 2025
