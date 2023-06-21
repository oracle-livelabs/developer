# Edit Account Page

## Introduction

In this lab we'll complete the edit account page, so your users can manipulate the data coming from Oracle Fusion Cloud Apps.  We created this page earlier using the **Simple Create and Edit Page Template**.

Estimated Time: 10 minutes

### Objectives


In this lab, you will:
* Set some page template properties
* Add data to the page
* Re-Configure the save button
* Modify an action chain


## Task 1: Update Template Properties

When your account managers locate an account using our new page, it's quite possible that they may need to update the account data or insert new information as well. In this task we'll modify the page created earlier to let them do that.

1. Starting in the main-start page in the **Page Designer** tab, click the **Live** button:

	![Live view](images/liveview.png)

	Live mode allows you to interact with your app as if it were actually running.

2. Click the edit icon for one of the rows.

	The edit account page opens.  This page uses the Redwood **Simple Create and Edit Page Template**.

A pattern or template applies more than just a new look and feel to the user interface; it can add variables and actions to your page as well. We will set some of the values in the **Properties** pane to update the user interface.

3. In the **Page Designer** tab, click **Design** so you can edit the page:

  ![Design view](images/emptydetailspage.png)

4. In the Structure pane, click on **Simple Create and Edit Page Template**:

  ![Design view](images/selecttemplate.png)

5. In the Properties pane, set these properties to customize the template:

	|Property |Value |
	| --- | --- |
	|Page Title | Edit Account |
	|Page Subtitle | Add missing information |
	|Primary action label | Save |
	{: title="Template Properties"}

Your screen should look similar to this:
	  ![template properties](images/editproperties.png)

Now that the template is set, let's add the FA data to the page.

## Task 2: Add FA data to the page

1. In the Designer, click the **Data** tab on the left and expand the Services node until you can see the **accounts** service. (If you don't see any services, click the Refresh icon next to the Filter box at the top of the pane.)
	  ![Data Palette](images/datapalette.png)

2. Drag the accounts service to the Structure pane and drop it onto the **Simple Create and Edit Page Template**:
	  ![Drag service](images/drag1.png)

3. In the **Render as** pop-up, choose **Edit Form** (not Edit Form Dynamic, the first option):
	  ![Drop as table](images/editform.png)

3. Select **update /accounts/{accounts_Id}**:
	  ![Drop as table](images/updateendpoint.png)


2. In the **Configure as Edit Form** page, filter on **name**, then **revenue**, and select the following fields:
	* OrganizationName
	* CEOName
	* CurrentFiscalYearPotentialRevenueAmount
	* NextFiscalYearPotentialRevenueAmount

	  ![Selected fields](images/selectfields.png)

3. Click **Next**

4. Drag **objectId** from the left onto **accounts\_id** in both the **get\_accounts** and **update\_accounts** objects on the right.

	  ![Edit button](images/mapobjectid.png)

3. Click **Finish**.

	Your page should now look like this:

	  ![Edit button](images/addeddata.png)

## Task 3: Configure the Save Button

When you added the Edit Form containing the **Form Layout** to the template it automatically created a save button with an action chain that includes all of the actions needed to correctly save changes.

Next you will modify the **Primary Action** (Save button) included with the **Simple Create and Edit Page Template** to use the action chain from the form's save button.

1. In the **Structure** section, click on the **Simple Create and Edit Page Template**

	  ![Edit button](images/clicktemplate.png)

2. In the **Properties** panel, open the **Events** tab

	  ![Edit button](images/clickevents.png)

3. Locate the **spPrimaryAction** section and click **Select** next to **Action Chain**

	  ![Edit button](images/selectactionchain.png)

4. Choose the **saveAccountsChain** and click **Select Action Chain**

	  ![Edit button](images/selectactionchain2.png)

5. Under the **Input Parameters** for the Action Chain, locate **accountsId** and click the **Select Variable** icon

	  ![Edit button](images/accountidclickselectvar.png)

6. Choose **Page/Variables/objectId** (use the filter if you have trouble locating the objectId)

	  ![Edit button](images/chooseobjectid.png)

## Task 4: Add Navigation to the Action Chain

Now that the save button is configured, you will add an action to navigate back to the search page.

1. In the **spPrimaryAction** section, click on the action chain link **saveAccountsChain**

	  ![Edit button](images/openactionchain.png)

2. In the **Actions** panel on the left, locate the **Navigate Back** action

	  ![Edit button](images/locatenavigateback.png)

3. Drag the **Navigate Back** action onto the diagram and drop it when you see a green line on the bottom of **Call Action Chain loadAccountsChain**.

	  ![Edit button](images/dropnavigateback.png)

4. The action chain should look like this

	  ![Edit button](images/addednavigateback.png)

5. Switch back to the **Page Designer** tab

## Task 5: Cleanup

You can now remove the unneeded objects from the page.

1. In the **Structure** tab, right-click on the Dynamic Form and click **Delete**

	  ![Edit button](images/deleteform.png)

2. In the **Confirm Delete** window, click **Delete**

	  ![Edit button](images/confirmdeleteform.png)

3. In the **Structure** tab, right-click on the Button in the toolbar and click **Delete**

	  ![Edit button](images/deletebutton.png)

4. In the **Confirm Delete** window, click **Delete**

	  ![Edit button](images/confirmdeletebutton.png)

## Task 6: Test your Application

1. Switch to Live mode

2. Make a modification

3. Press the **Save** button

	  ![Edit button](images/testedit.png)

The record should be modified and you will navigate back to the **main-start** page.

4. Click **Preview** in the header to see your completed application live and experiment with its functionality.

Your work is finished! In the real world, at this point you would likely do more testing, then deploy your extension to your Oracle Fusion Cloud Applications instance. Thanks for completing this workshop!

## Learn More


* [Work with JavaScript Action Chains](https://docs.oracle.com/en/cloud/paas/visual-builder/visualbuilder-building-appui/jsac-work-javascript-action-chains.html#GUID-3ED147D5-8152-4586-B228-C283BF7EE8A6)


## Acknowledgements
* **Author** - Shay Shmeltzer, Oracle Cloud Development Tools, September 2022
* **Contributors** -  Marcie Caccamo, Blaine Carter, Oracle Cloud Development Tools
* **Last Updated By/Date** - Blaine Carter, Oracle Cloud Development Tools, March 2023
