# Creating tables, data, and views

## Introduction

In this lab you will use the SQLcl MCP server to create new database tables and objects. You will then populate these tables with sample data. You will later create several views of these tables to use for future projects. 

A sample prompt has been provided for you. This Lab, screenshots, and expected output are based on the instructions provided in the sample prompt. 

Estimated Time: 10 minutes

### Objectives

In this lab, you will:
* Review the sample prompt that has been provided
* Execute the prompt using the available tools of the SQLcl MCP server in:
  - Plan mode and review output
  - Act mode (where needed) and review the output

### Prerequisites 

<mark>PENDING</mark>

This lab assumes you have:
* An Oracle account
* All previous labs successfully completed

## Task 1: Locate the create data and views prompt

1. Sample prompts have been provided for you in the lab's project folder. Locate the `create_data_and_views_prompt.md` file.

2. Open this file in your IDE. You will notice a single heading and several sub-headings. Each sub-heading will serve as a phase or step for this scenario: 

   ```md
   # Creating mock Schema data, and relevant views
   ## Connecting and creating database objects
   ## Inserting data
   ## Create four unique views
   ## Disconnect
   ```

3. You should take time to review the prompt that has been created as it details the sub-tasks that your AI agent will use to call upon the assistance of the SQLcl MCP server and your preferred LLM.

4. Once you have reviewed the prompt, navigate to the Cline extension in VS Code.

5. Before you proceed, make sure you are in **Plan** mode. As a best practice, remaining in **Plan** mode will allow you to "step through" the AI agent's execution. Should the AI agent deviate, you can periodically "nudge" it back on course.

5. Next, click the `+` icon (i.e., Add Files & Images icon) and select the `html_dashboard_prompt.md` file. 

6. Before pressing enter, add in some prepatory text to help guide the agent. An example:

   ```txt
   Review the steps in the included markdown file. Detail the steps you intend to take to achieve the desired outcome. And await for my approval before proceeding.
   ```

7. Once satisfied, press <kbd>Enter</kbd> or the arrow icon.

8. The agent should provide you with its plan and request your consent to proceed. If the plan is acceptable you can click the `Approve` button.

   ![1-initial-plan](./images/lab-5/1-initial-plan.png " ")

   ![2-approve-proposed-plan](./images/lab-5/2-approve-proposed-plan.png " ")

## Database tasks

1. Your agent will establish a collection using the `connect` tool of the SQLcl MCP server. You may also see a plan resembling that in the image. If all appears corect, you may proceed. 

   ![3-plan-when-in-the-database](./images/lab-5/3-plan-when-in-the-database.png " ")

2. You will see the first step of the Agent--using the `run-sql` Tool to create four new tables in your schema: 

   ![4-creating-new-schemas](./images/lab-5/4-creating-new-schemas.png " ")

3. Once satisfied, you may select `Approve` to allow the creation of these objects. 

4. Once the tables have been created for you, the Agent will suggest "fictitious, but plausible data" for populating your tables. You can review the data suggested, and once satisifed, `Approve` the proposed `INSERT` statements. 

   ![5-inserting-data-into-manufacturing-table](./images/lab-5/5-inserting-data-into-manufacturing-table.png " ")

   ![6-inserting-into-vehicle-tables](./images/lab-5/6-inserting-into-vehicle-tables.png " ")

5. At times, your Agent may exhibit unexpected behavior. As in this example, where it asks to enable **Act** mode to complete a task. 

   ![7-inserting-into-vehicle-table-test-insert](./images/lab-5/7-inserting-into-vehicle-table-test-insert.png " ")


   The LLM model used, network latency, the workstation processor, other ongoing processes might impact your Agent's behavior. You will need to review the request and proceed cautiously. In this example, the request is relatively simple:

   ![8-approving-the-insert-of-multiple-values](./images/lab-5/8-approving-the-insert-of-multiple-values.png " ")

6. You may even notice behavior such as is illustrated when executing these `INSERT` statements. Review the Agent's summaries and requests, and if you agree, proceed with the proposed action/plan.

   ![9-experiencing-latency-or-networking-issues](./images/lab-5/9-experiencing-latency-or-networking-issues.png " ")

   ![10-inserting-values-several-at-a-time](./images/lab-5/10-inserting-values-several-at-a-time.png " ")

## Reviewing the new objects

1. With the new objects created and populated, your prompt includes a next step of Fetching the first five rows of each of your tables. Your tables might return information similar to those in the images below. 

   ![11-fetch-first-five-car](./images/lab-5/11-fetch-first-five-car.png " ")

   ![12-fetch-first-five-truck](./images/lab-5/12-fetch-first-five-truck.png " ")

   ![13-fetch-first-five-moto](./images/lab-5/13-fetch-first-five-moto.png " ")

2. If all is as expected, and seems reasonable, you may allow the Agent to continue. 

> [!NOTE]
> You might also choose to review the tables from the Oracle SQL Developer for VS Code extension.

## Creating new views

1. Your prompt contains a section for creating views for these new tables. The prompts of this section are designed to emulate prompts you might use independently. In this prompt we've asked to create four views, and recommend two additinoal views.

2. The views we request: 

    | View Name | Descriptions | 
    | --- | --- | 
    | Vehicle Count by Manufacturer | The view shows the count of vehicles (cars, trucks, motorcycles) for each manufacturer. For example, Toyota, Ford, Honda, and Rivian have entries in all three vehicle categories, while Yamaha, Ram, Kawasaki, Harley-Davidson, GMC, and Ducati have entries in one or two categories.| 
    | Average Engine Displacement by Vehicle Type | The average engine displacement for cars is approximately 1.87 liters, for trucks it's about 4.07 liters, and for motorcycles, it's significantly higher at 43.74 liters. |
    |Vehicles by Year of Manufacture| The view shows the count of vehicles manufactured each year. The years 2020, 2021, and 2022 have 7, 9, and 10 vehicles respectively.|
    |Manufacturer Details with Vehicle Counts| This view provides detailed information about each manufacturer along with the count of vehicles they manufacture. For instance, Toyota, Ford, Honda, and Rivian are listed with their respective vehicle counts |

   ![14-vehicle-count-by-manu-view](./images/lab-5/14-vehicle-count-by-manu-view.png " ")

   ![15-approving-vehicle-count-by-manu-view](./images/lab-5/15-approving-vehicle-count-by-manu-view.png " ")

   ![16-avg-engine-displacement-view.png](./images/lab-5/16-avg-engine-displacement-view.png " ")

   ![17-vehicles-by-year-view.png](./images/lab-5/17-vehicles-by-year-view.png " ")

4. If you agree with the proposed views, you can click `Approve`, or suggest edits to the views and then approve. 

3. In this next step, we allow the Agent to propose two unique views for the schema. Yours may be the same, they may even differ. Here is an example of two propsed views: 

   ![18-recommended-additional-views](./images/lab-5/18-recommended-additional-views.png " ")

   ![19-avg-vehicle-age-by-manu-view](./images/lab-5/19-avg-vehicle-age-by-manu-view.png " ")

   ![20-vehicle-dist-by-country-view](./images/lab-5/20-vehicle-dist-by-country-view.png " ")

4. If you agree with the proposed views, you may click the **Approve** button. Otherwise, suggest some modifications, and the click Approve.

## Disconnecting

1. After reaching the end of your prompt, your Agent will request to disconnect from the database using SQLcl's MCP server `disconnect` tool. 

   ![21-request-approval-to-disconnect](./images/lab-5/21-request-approval-to-disconnect.png " ")

2. You might see a summary of the actions performed once you disconnect.

   ![22-summary-of-actions-performed](./images/lab-5/22-summary-of-actions-performed.png " ")


## Wrap-up

1. Like the previous labs, you will notice that we rely upon a pre-defined script, or prompt to guide the AI agent. While not mandatory, it is a good practice as it allows you to refine your prompts and achieve more predictable outcomes. 

2. Use the provided prompt as a reference tool. You'll notice certain patterns and characteristics in the prompt such as:

   - A "preamble" that defines certain global assumptions, limitations, and actions
  - Tasks are clearly defined and broken into sub-tasks
  - Idiosyncracies are addressed throughout the prompt
  - For edge cases, or for where training data may not exist, examples are provided to help guide the agent
  - SQLcl's MCP Tools are explicitly mentioned
  - There is a clear delineation between your schema and that belonging to another user

3. Once you have completed your review of the prompt, you may continue to the next Lab.

## Learn More

<mark>Pending</mark>

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
<mark>Pending</mark>
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Group, Month Year>
