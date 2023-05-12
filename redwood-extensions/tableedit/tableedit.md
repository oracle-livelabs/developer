# Add Buttons and Action Chains

## Introduction

In this lab we'll learn how to work with events and action chains to add functionality to our application.

Estimated Time: 10 minutes

### About Action Chains
In VB Studio, you use a visual editor to create business logic that responds to events occurring in the user interface.  Each sequence of business logic is called an *action chain*.  For example, an action chain might dictate what happens when a user clicks a button on a page.

### Objectives


In this lab, you will:
* Add user interfaces components to your page
* Define action chains that respond to UI events
* Work with variables


## Task 1: Add Empty Columns To the Table

Earlier, you created pages for displaying and editing the accounts data.  You will configure those later.  Now you will add buttons in each row of the table that will be used to navigate to those pages. Let's see how we can make that happen.

First we'll add two columns to the table, to hold each of the buttons.

1. Back in Design view, select the table in either the Structure pane or the canvas:

	![Image alt text](images/tableproperties.png)

2. In the Properties pane, click the **Data** tab, then click the **Edit Columns** icon next to the Table Columns heading:  

  ![Image alt text](images/emptycolumn.png)

3. Click **New Empty Column** twice to add two empty columns to your table, then click anywhere outside the pop-up to dismiss it:
	  ![Image alt text](images/columnsadded.png)

	The new columns are represented by the horizontal lines at the far left in the Table Columns area (in this example, under the word **Revenue**).

4. Click the horizontal line for the first empty column, then click the arrow on the right to see this column's details.

5. In the **Columns, Header Text** field, type **Edit**, then click the **Table Columns** back arrow to go back to the Data tab:
	  ![Image alt text](images/editcolumn.png)

6. Repeat step 5 for the second empty column, this time setting **Columns, Header Text** to **Info**:
	  ![Image alt text](images/infocolumn.png)

Your screen should now look something like this:  

  ![Image alt text](images/columnsset.png)

We've now added two more columns to our table, which you can see in the canvas area.  (You may need to close some tabs or resize some areas to see them.)

## Task 2: Add Icon Buttons

Let's use the empty columns we just created to add some icon-based buttons that look like a pencil (for Edit) and a circled 'i' (for Details).  Then we'll wire up these buttons to some actions so that they'll do something when the user clicks on them.

1. In Design view, click **Components** to display the Components palette, then search for the **Button** component:

	![Image alt text](images/button.png)


2. Drag the Button component and drop it into the empty Edit column in your table. The editor highlights the location you can drop the button into; make sure you drop it into the middle of the column:
	![Image alt text](images/drag1.png)

3. Drag another Button component into the Info column:
	![Image alt text](images/drag2.png)

4. Back in the Components palette, locate the Icon component:
	![Image alt text](images/icon.png)

5. Drag the Icon component and drop it on to the first button (the one for the Edit column). You can do this either in the visual editor or in the Structure pane. When prompted, choose **startIcon** as the slot for the icon:
	![Image alt text](images/dragicon1.png)

6. In the Properties pane, click the image under Icon to choose a different image:
	![Image alt text](images/iconproperties.png)

7. In the Icon Gallery, search for **Edit**, then click **Select**:
	![Image alt text](images/editicon.png)

8. Repeat steps 5-7, this time dragging the Icon component onto the second button in Structure view:

	![Image alt text](images/dragicon2.png)

9. Use the Properties palette to select the **Information** icon from the Icon Gallery:
	![Image alt text](images/infoicon.png)

10. In the canvas area, click any **Edit** button, then use the Properties pane to set these properties:


| Property | Value |
| --- | --- |
| Display | Icons |
| Chroming |Borderless |
{: title="Button Properties"}

![Image alt text](images/buttonproperties.png)

11. Repeat step 10 for the **Information** button.

We now have nice-looking icon-based buttons for each row, but so far they don't do anything. We'll change that in the next task.
	![Image alt text](images/buttonsformatted.png)

## Task 3: Define Action Chains

VB Studio apps are event-driven, which means that an event is fired when an end user performs an operation in the user interface. As a developer, you can create an *action chain* that kicks off a series of actions in response to an event. Let's see how to create an action chain visually using the Action Chains editor.

1. In Design view, select the Edit button, then click **Events** in the Properties pane:

	![Events tab](images/eventproperties2.png)

2. Click **+ New Event**, then **On ojAction**. Note if you see an onClick event instead, it means you selected the icon instead of the button - switch to select the button in the structure panel.:
	![New event](images/newevent2.png)

	You're now in the Action Chain Editor.

	On the left side, you can see all the actions you can define, including calling REST endpoints, invoking JavaScript functions, and many more.

3. From the list of actions on the left, drag **Navigate**
	![Dragging actions](images/actiondrag.png)
  and drop it onto the + sign:
	![Dropping actions](images/actiondrop.png)

4. In the Properties pane, click the arrow in the **Page** field and select **main-edit-accounts** from the drop-down:
	![Action properties](images/actionedit.png)

 Let's take a step back.  We've set things up so that when the Edit button is clicked, we will navigate to the Edit page we created earlier. However, as we can see from the Properties pane, this action chain expects a value for the input parameter **objectId**.

5. Click the **Not Mapped** label:
	![Input parameter](images/inputparam.png)

 The Assign Input Parameters dialog allows us to easily map values to variables using drag and drop.

6. Under Sources->Action Chain on the left, drag the action chain variable **key** and drop it on the **objectId** parameter in the Target area on the right:
	![Mapping variables](images/valuemap.png)

7. Click **Save**.

8. Click **Page Designer** to go back to the visual view of the main-start page:
	![Page designer](images/pagedesigner.png)

9. Repeat steps 1-8, this time for the **Info** button. When creating your **On ojAction** action chain, use the **Navigate** action, and select **main-accounts-detail** in the **Page** field.

10. Map the **key** variable to the **rowIndex** input parameter.

11. Map the **Flow/System/currentPage** variable to the **parentPage** parameter.  This will enable the return to parent page functionality in the **Foldout Layout Horizontal Template Pattern**.

	![Action Chain](images/mapdetailvariables.png)

12. Click **Save**.
	![Action Chain](images/action2.png)

	Let's take another look at the app to see our changes in action.

10. Click **Preview** in the header, then open the new browser tab.

 You can now click the Edit and Info icons in a row to open the Edit and Detail pages for the organization selected. Pretty cool!

Your table now has buttons that are attractively rendered and that work as expected. The next step is to configure the pages you created earlier to display and edit data using Oracle's SaaS business object behind the scenes.

You may now close the preview browser tab and **proceed to the next lab**.

## Learn More

* [Action Chains](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/work-action-chains.html)

## Acknowledgements
* **Author** - Shay Shmeltzer, Oracle Cloud Development Tools, September 2022
* **Contributors** -  Marcie Caccamo, Blaine Carter, Oracle Cloud Development Tools
* **Last Updated By/Date** - Blaine Carter, Oracle Cloud Development Tools, May 2023
