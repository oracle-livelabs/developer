# Adding Buttons and Action Chains

## Introduction

This lab shows you how to work with components, events, and action chains to add functionality to your application.

Estimated Time: 10 minutes

### About <Product/Technology> (Optional)
Visual Builder simplifies the way you handle user interface events enabling you to create business logic in a visual way with action chains.

### Objectives

*List objectives for this lab using the format below*

In this lab, you will:
* Add user interfaces components to your page
* Define action chains that respond to UI events
* Work with variables

*This is the "fold" - below items are collapsed by default*

## Task 1: Add Empty Columns to the table

While the default UI that was created for us includes buttons at the top of the page - it would be nicer to have buttons at each row of the table that will allow us to choose a record and edit or show details. Let's see how we can modify the button and use icon based buttons for that.

1. Back in the Design view of the main-start page, select the table of accounts in either the structure pane or the visual editor.

	![Image alt text](images/sample1.png)

	> **Note:** Use this format for notes, hints, tips. Only use one "Note" at a time in a step.

2. In the properties palette, select the data tab. Then click the little table icon at the top right of the list of columns.

  ![Image alt text](images/sample1.png)
3. Click the **New Empty Column** twice to add two empty columns to your table.
	  ![Image alt text](images/sample1.png)


4. Click to select one of the empty columns and then click the arrow on the right to go into the column details.

5. Set the **Columns, Header Text** attribute to **Edit**. Then click the **Table Columns** back arrow at the top of the property palette to go back to the properties of the table.

6. Go into the properties of the second empty column, and set the **Columns, Header Text** to **info**.

7. You'll see the new titles reflected in the visual editor too. Note that you can expand your visual editor area by collapsing the application navigator tab.





## Task 2: Adding Icon Buttons

Now let's add content to the empty columns we just created.

1. In the Design view of the application, make sure that the components palette is visible and use the search at the top to locate the button component.

	![Image alt text](images/sample1.png)

	> **Note:** Use this format for notes, hints, tips. Only use one "Note" at a time in a step.

2. Drag and drop a button into the empty edit column of your table in the visual editor. Note that the editor highlights the location you can drop the button into. Make sure you drop it into the middle of the column.

3. Repeat the process and drag another button into the info column.

4. Back in the components palette, use the filter to locate the icon component.

5. drag the icon into the structure pane and onto the first button (the one in the edit column). When prompted choose the **startIcon** as the slot for the icon.

6. In the properties palette for the icon, click the icon to bring up the dialog for choosing a different icon image.

7. Search and locate an **Edit** icon and **Select** it from the list.

8. Drag another icon onto the second button, and then switch the icon for that button to be the **information** icon.

9. Pick each of the buttons in the visual editor, and then change the following properties:


| Property | Value |
| --- | --- |
| Display | icons |
| Chroming |Borderless |

Your table now has action buttons that look good. The next step is to tell Visual Builder what these buttons should do when the user clicks on them.



  ![Image alt text](images/sample1.png)
3. This time pick the **Add Detail Page**, this will create a page that will let us edit the details of a row we selected from the table.
	  ![Image alt text](images/sample1.png)


4. In the dialog that pops up for selecting the object from which we pick a specific record the **Accounts** object is already selected, keep it that way and click **next**.

5. In the field selection page use the Filter at the top of list of fields to locate specific fields.

6. Select the following fields:
* OrganizationName
* CEOName
* OwnerName
* AddressLine1
* AddressLine2
* AddressLine3
* AddressLine4
* City
* County
* Country

7. Click **Finish** to complete the quick start and create the page.

8. Let's preview the updated app. Click the Preview button to run the new app, and navigate to the other browser tab to see the updated page loaded.

9. When the page loads, search to locate a specific record, then select that record in the table and click the **edit accounts** button, this takes you to the edit page. Update information such as the CEO Name and revenue for the account and click the **Save** button. The data is submitted to Oracle Cloud Apps and is saved there. It will show up in your table too.

10. Click on another record and then click the "account Details" button to find out the address of the account. Use the browser's back button to return to the list page.

Our application is functioning well. The next step would be to fine tune the look and feel of the pages and apply some of the Redwood page templates.

## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
