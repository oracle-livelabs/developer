# Create an App UI

## Introduction

We're now ready to build a simple App UI that allows users to search for an employee.

Estimated Time: 5 minutes

### Objectives

In this lab, you will:

* Create an App UI
* Change the App UI's page to use a Redwood template
* Add components to the App UI page

### Prerequisites

This lab assumes you have all previous labs successfully completed.

## Task 1: Create an App UI

Start by creating an App UI, which is simply an application that takes the form of VB Studio flows and pages.

1. In the **App UIs** pane, click **+ App UI**:

    ![This image shows the App UIs tab, with the + App UI button selected.](images/create-app.png)

2. In **App UI Name**, enter a name, perhaps something like `EmpSearch`. The App UI ID is automatically filled in, but you can change it if you like.

3. Click **Create**.

    The App UI opens on the Diagram view, which shows the App UI's flows and pages. A flow is just a way to keep related pages together. An application can contain multiple flows, and a flow can contain many pages. In this case, we have one flow, **main**, and one page, **main-start**:
    ![This image shows a new empsearch App UI open on the canvas in the Designer tab. On the left is a Components palette; on the right is the  main tile indicating a flow with the main-search tile indicating a page nested within.](images/newappui.png)

4. Double-click the **main-start** tile in the canvas area to open the page in the Page Designer.

    What you see under the **main-start** tab is your main work area. Just under **main-start** are several horizontal tabs: Page Designer, Action Chains, Event Listeners, and so on. Each tab provides editors to help you examine and modify artifacts used in the page. By default, the page opens in the Page Designer, which is where you'll do the bulk of your work in VB Studio.
    ![This image shows the main-start page with several components labelled. On the left are the Components, Data, and Structure tabs, in the middle is the canvas area, and on the right is the Properties pane.](images/pagedesigner.png)

    Here are the main Page Designer areas you'll use throughout this workshop:
    | # | Tab | Functionality |
    | --- | ---- | --- |
    | 1 | Components | UI components (sorted by categories) that you can drag and drop onto a page|
    | 2 | Data | Endpoints you can work with, based on service connections you create to data objects |
    | 3 | Structure | Hierarchical view of the page's structure  |
    | 4 | Properties | Properties of a component selected on the page |
    | 5 | Canvas | A design, live, or code view of your page's content |
    {: title="Page Designer Work Area"}

    You can collapse and expand tabs to better manage your working area. For example, click **Properties** to hide the Properties pane and expand your work area. You can also move different panes to customize your work area. For example, right-click **Structure** at the bottom of your work area, then select **Move to Top Left** to move the Structure view right under Components and Data. Right-click the tab again and select **Reset All Panels to Default** to revert your change.

    Let's now configure the main-start page to leverage templates based on Redwood, the Oracle standard for user experience.

## Task 2: Change the Page Template

Change the main-start page to use a Redwood template. Redwood page templates include a rich set of user interface elements and provide a consistent look and feel across your app's pages. They also provide a responsive user experience, which means your app will adjust to the device accessing it.

1. In the main-start page's Properties pane, click **Select Page Template**.

   ![This image shows the main-start page's Properties pane. It includes Title, Description, Select Page Template, and Preferred Layout options.](images/select-page-template.png)

2. In the Page Templates dialog, scroll down and select **Welcome Page Template**. (If you don't see this template, go back to the first lab and make sure you set up all the components.) Click **Select**.

   ![This image shows the Page Templates dialog. Besides a No Page Content, it shows several templates such as Advanced Create and Edit Template, Smart Search Page Template, and Welcome Page Template. The Cancel and Select buttons are also shown.](images/page-templates.png)

3. Once the template is applied, click **Welcome Page Template** in Structure view.

   ![This image shows the main-start page with the Welcome Page Template selected in Structure view. The template displayed in the canvas areas shows a blue banner with Overline Text, Page Title, and Description Text. A Default Slot placeholder is also shown under the banner.](images/welcome-page-template.png)

4. In the template's Properties pane, click the **All** tab and modify these properties:

    | # | Property | Value |
    | --- | ---- | --- |
    | 1 | Page Title | **Employees**|
    | 2 | Description | **Search a list of employees** |
    | 3 | Background Color | Remove **[[ $page.variables.backgroundColor ]]**, then select your preferred color: dark-ocean, dark-pine, dark-lilac, dark-teal, dark-rose, dark-pebble, dark-slate, dark-plum, dark-sienna, auto  |
    | 4 | Illustration foreground source URL | https://static.oracle.com/cdn/fnd/gallery/2504.0.0/images/illust-welcome-banner-fg-03.png |
    {: title="Welcome Page Template Properties"}

    Your screen may look something like this:

   ![This image shows the Page Templates dialog. Besides a No Page Content, it shows several templates such as Advanced Create and Edit Template, Smart Search Page Template, and Welcome Page Template. The Cancel and Select buttons are also shown.](images/welcome-page-template-customized.png)

## Task 3: Add a Search component

Let's now add search functionality to the main-start page.

1. In the Components palette, enter **search** in the Filter field to locate the Input Search component.

2. Drag and drop the component onto the banner in the canvas area (you can also drop it onto the Welcome page Template in Structure view). When prompted to pick a slot, select **Search Slot**.

   ![This image shows the Input Search component being dropped onto the banner on the canvas to bring up the Slots pop-up with the options: **Default Slot** and **Search Slot**. **Search Slot** is selected.](images/search-slot.png)

3. In the Input Search component's Properties pane, enter  `Emp Name` as the **Placeholder**. You'll see this text appear as a placeholder in the component on the canvas.

4. Click the **Data** tab in the Properties pane:

    ![This image shows the Input Search component on the canvas area in the banner. The Data tab is selected in the Properties pane.](images/component-properties-data.png)

5. Let's now map the input search field to a variable, which will hold the employee detail that the user will search for. In the Input Search component's Properties pane, hover over the **Value** text, and click ![Select Variable icon](images/icon-selectvariable.png) next to **fx**.

    ![This image shows the Input Search component's Properties pane, with the cursor hovering over the Select Variable icon.](images/select-var.png)

6. When the variable picker opens, click **Create** next to **Page**.

7. In the **ID** field, enter `searchString`, leave the **Type** set to `String`, and click **Create**.

    The component's data is now bound to the newly created variable.

You may now **proceed to the next lab**.

## Acknowledgements

* **Author** - Sheryl Manoharan, VB Studio User Assistance, May 2023
* **Last Updated By/Date** - Sheryl Manoharan, January 2025
