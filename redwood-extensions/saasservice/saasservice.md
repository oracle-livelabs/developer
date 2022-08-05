# Connecting to Oracle Fusion Apps Data

## Introduction

This lab walks you through creating a connection to data from Oracle Fusion Cloud Applications. We'll work with the service catalog in Visual Builder to browse available REST services, pick one up and show data from it in our page.

Estimated Time: 5 minutes

### About <Product/Technology> (Optional)
Oracle Cloud Apps provide REST based access to information in the system. Visual Builder is built to use these endpoints leveraging a service catalog, single-sign-on and knowledge of advnced functionality of the services such as filtering and pagination.

### Objectives

*List objectives for this lab using the format below*

In this lab, you will:
* Work with service catalog
* Leverage the data palette
* Define filtering on data
* Previewing your application

*This is the "fold" - below items are collapsed by default*

## Task 1: Browser the service catalog

Up until now we worked on the UI (front end) of your application, now we turn to work with the backend. Visual Builder Studio comes with a built in catalog that connects to your Oracle Fusion Apps catalog of services. This simplifies creating connection to use data from the apps.

1. On the left side application navigator click on the third tab "Services"

	![Image alt text](images/sample1.png)

	> **Note:** Use this format for notes, hints, tips. Only use one "Note" at a time in a step.

2. Click + to create a new service connection.

  ![Image alt text](images/sample1.png)
3. You get three options for the source of your REST service connection. We'll use the first one and **Select from Catalog**, but just so you'll know the two other options let you define connection to:
 * REST services based on their OpenAPI/Swagger description (which can be useful for working with custom objects you created with the Application Composer that comes with Oracle SaaS)
* REST services based on their endpoints - this let you connect to any REST service available over the internet, which can be useful for integrating with third party apps.
	  ![Image alt text](images/sample1.png)


4. Click **Select from Catalog** and once loaded choose the catalog for **Sales and Services**. Note that you can use the same approach to access services from your HCM, ERP and SCM apps too. We encourage you to explore the other catalogs to see other business objects that are available in other areas of interest.

5. From the list of objects available for you in the Oracle CX system choose **Accounts** (you can use the search box at the top to help locate the service). Then click **Create** button. This create a connection to the data object and adds it to your app.

6. A tab with information about the service shows up. We'll keep all the default definition so you can close the tab and return to the tab for the main-start page.


## Task 2: Add Data to your Page

1. In the page designer click the **Data** tab on the left and expend the services nodes until you can see the **Accounts** service.

2. Drag and drop the Accounts service to the structure pane and drop it on the **collection container**.

3. The Render As popup shows up. Visual Builder knows how to show data in multiple ways including various type of forms that let you modify data. For now we just want to show a table of the data. From the Render As choose the **Table** option (not the Table Dynamic).

4. From the list of endpoints choose the first one **getMany** which shows the top object (an account).

5. The Add Data dialog shows up and VB queries to find out which fields are available in the business object - as you'll see it is a long list of fields.

6. Use the Filter field at the top to locate and choose the following fields (use name, and then revenue as filters to find the fields):
* OrganizationName
* CEOName
* CurrentFiscalYearPotentialRevenueAmount
* NextFisicalYearPotentialRevenueAmount

Once the four fields are selected click Next once to get to the query definition step.

7. We are going to let the user filter the list of accounts. We do this by defining a filterCriterion for the REST endpoint. Click **FilterCriterion** on the right. This will show up the filter builder at the bottom of the dialog.

8. **Click to Add Condition** in the Attribute field choose OrganizationName, keep the operator as **Contains ($co)**, and on the right side locate your search variable (type searchString) to get **$variable.searchString**. When done click **done** and then **Finish** to close the dialog.

A table with the selected fields is added to your page and the data for it will be fetched live from Oracle SaaS.

9. To leverage the pagination capabilities of the service (and not fetch all the records available on startup) we'll add a scroll policy to the table.
10. Switch to the code view by pressing the **Code** button at the top of the preview. Locate the line that starts with <oj-table... that's the definition of the table. Stand in an empty space in the line click space and start typing **sc** note how code completion helps you choose the right property. Choose **scroll-policy-option.scroller** and in the value for the attribute use **"html"**.

The result code for the line should look similar to this:
```
<oj-table scroll-policy-option.scorller="html" scroll-policy="loadMoreOnScroll" data....>
```
  Use tables sparingly:

  | #| Tab | Functionality |
  | --- | --- | --- |
  | 1 | Components | Contain UI components you can add to a page  |
  | 2 |Data | List data objects you can work with - based on connections you created to SaaS objects |
  | 3 | Structure | Hierarchical view of the structure of your page |
	  | 4 | Properties | A declarative way to define the properties of the selected component in your page |
	  | 5 | Visual Editor | Shows you a design/live and code view of your page content |

2. The components palette contains over a hundred UI components that you can drag and drop to your page to design your interfaces. We are going to leverage page templates designed by the Oracle Design team for the Redwood apps so accelerate our application development. The templates provide a responsive user experience and will adjust your application to the device accessing it.


3. Use the search box at the top of the components palette to search for **welcome** which will find the **welcome page template**. Drag the component from the component palette and drop it on the visual editor.  

4. Let's set some properties of the template. Click the **All** tab in the component palette and modify the following properties:

| # | Property | Value |
| --- | --- | --- |
| 1 | Background Color | Choose your preferred color  |
| 2 |Page Title | Accounts |
| 3 | Description Text| Search and edit accounts |
| 4 | Illustration Foreground | https://static.oracle.com/cdn/fnd/gallery/2107.1.0/images/illust-welcome-banner-fg-03.png |

## Task 3: Adding a search component and defining a variable

1. In the search box for the components palette type **search**. This will locate a component called **input search**.
2. Drag the input search and drop it on the page in the visual editor. A popup will let you choose into which slot of the template to drop the component. Drop it into the **search slot**.
3. We need to keep track of the term the user is searching for. To do that we'll use a page variable.
While the input search is selected in the visual editor, click the **data** tab in the properties palette.

4. Click the little arrow at the top right of the value field to popup a list of variables.

5. Click the create **create variable** next to the page to create a page level variable. Note that we have multiple scopes for variables which makes it easy to share the values of these variables across pages and flow in the application when needed.

6. For the id of the variable type **searchString** and keep the type as String and click create. The value property now has a reference to the variable in it.

## Task 4: Adding a collection container and working with the structure pane

1. In the search box for the components palette type **collection**. This will locate a component called **collection container**.
2. Drag the collection container to the structure pane onto the Welcome Page template.

3. Select the **default** slot as the location for the collection container.

The layout of our first page is ready now, and the next step is to add some data to the page from Oracle Fusion Cloud Apps.
Note how so far all the design of the page was done with simple drag and drop functionality and setting properties. This visual development approach is key to the productivity offered by Visual Builder. Note however that there is a code button at the top right of the visual preview area. If you'll click on it you'll be able to see the actual HTML code used in your page. The code can be modified directly if needed, but for now we'll return to the design view by clicking the design button.

## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
