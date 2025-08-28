# Build a React app

## Introduction

In this Lab you will use your LLM agent and the SQLcl MCP server to create a starter web application. The sample web application in this lab uses the React library.

Estimated Time: 12 minutes

### Objectives

In this lab, you will:
* Review the included prompt
* Use the provided prompt:
  * to guide you through the creation process, *or*
  * as a reference guide while you improvise your own app

### Prerequisites (Optional)

<mark>Pending</mark>

*List the prerequisites for this lab using the format below. Fill in whatever knowledge, accounts, etc. is needed to complete the lab. **Do NOT list** each previous lab as a prerequisite.*

This lab assumes you have:
* An Oracle account
* All previous labs successfully completed

## Task 1: Review the prompt

1. This Lab includes a sample prompt for your reference. It can be used as-is with your agent while in "Plan" mode. Alternatively you may use it as a reference, while creating your own app. Before you begin, review the sections of the prompt: 

    - Overview
    - CO Schema exploration
    - Create the web application
    - Provide helpful insight
    - Disconnect from the database
    - Launch the web application

   **Sample prompt**

    ```markdown
    # Single Web Page Application example

    ## Overview

    1. You will create a sample single page React application using available information in the SQL_FREESQL_01 schema.
    2. You have access to view the table data in the CO schema. The sample application will use data from these CO tables. 
    3. You will make provisions for dynamically fetching data from the database, but the version 1 of this application will use hard-coded values from the CO table data.
    4. You will follow the instructions in the following steps

    ## CO schema exploration

    1. Connect as the SQL_FREESQL_01 user and explore the CO tables
    2. Provide me with a summary of insights on the CO tables
    3. Recommend to me some potential statistics/metrics in this CO schema that would be interesting for the single page web application. 
    4. Allow me to choose one of these statistics/metrics to use for the single page web application.

    ## Creating the web application

    1. Create a project directory before scaffolding a project.
    2. Once the directory is created, scaffold the single page React application. 
    3. Using what you learned about the CO schema, and the selection I made in the CO schema exploration section, reconnect as the SQL_FREESQL_01 user and query the values you need to populate the React application.
    4. The React application should include a graph or chart to visualize the data. And there should be a table underneath, or next to the visualization that shows the values. 
    5. Share with me what you intend to display on the React page before altering the app source files.

    ## Provide some helpful inight 
    1. Once complete, provide me with a list of next steps, or recommended actions for making this more dynamic.
    2. Answer the following questions: 
      - What options do I have for establishing an Oracle database connection so my app can update in real time? 
      - What options do I have if a user wants to update one of these underlying tables? 
      - What other functions do you recommend this app should have? 
      - What other Oracle database technologies could I use in/with this React application? 

    ## Launch the web application

    1. Launch the web application and review it for accuracy and expected outcome
    2. If the data and visualization are not visible on screen, please debug as needed. 
    ```

2. As you may have seen in other scenarios in this LiveLab, you may save this prompt as a markdown file and execute it in your agent's "Plan" mode. 

3. If you decide to improvise, and use the prompt as a reference, your results may differ from the Lab's expected output. If you get stuck, start over with the provided prompt and let the LLM and the MCP server do the work for you.

## Task 2: Observing the prompt execution

1. The prompt that you have been provided is the result of iterative testing. It is designed to teach you how to prompt your LLM to best utilize the SQLcl MCP Server. Following along with the prompt should result in a repeatable and predictable outcome. 

> Note: You should expect to complete this Lab with a version unique to you; and one that closesly resembles the examples and images in this Lab.

2. Navigate to your Cline extension. Toggle the agent to **Plan** mode. 

3. Click the `+` icon to add files and images to the task. Select the file name you chose for the prompt. 

4. If you decide to use the prompt in its entirety, include some prepatory instructions in additon to the prompt file; something like this:

    ```txt
    <copy>Review the steps in the included markdown file. Detail the steps you intend to take to achieve the desired outcome. And await for my approval before proceeding.</copy>
    ```

5. Carefully follow along with the agent's actions, providing feedback and coaching as needed. 

    ![1-review-plan-in-overview-section](./images/lab-4/1-review-plan-in-overview-section.png " ")

   Should the agent request to transition to **Act** mode, proceed carefully. Only approve actions you know to be safe, and reject those actions which you deem unecessary or risky.

      ![7-opening-up-front-end-of-application](./images/lab-4/7-opening-up-front-end-of-application.png " ")

6. Continue building out your application and review Task 3 once you have successfully launched your application.

    | | | 
    | -- | -- | 
    | ![](./images/lab-4/2-agent-summary-plan-for-overview.png " ") | ![](./images/lab-4/3-agent-response-for-exploring-co-schema.png " ")|
    | ![](./images/lab-4/4-example-of-agent-exploring-co-schema.png " ") | ![](./images/lab-4/5-approve-make-directory-for-react-app.png " ")|
    |![](./images/lab-4/6-approve-to-create-app-jsx-file.png " ")|![](./images/lab-4/6-approve-to-create-app-jsx-file.png " ")|

## Task 3: Comparing notes

1. By now you should have a sample React application. While your values are hard-coded, you might ask the agent to build the app out further.

2. Compare the sample application to your own:

   ![8-reviewing-the-sample-ui-with-hard-coded-values-above-fold](./images/lab-4/8-reviewing-the-sample-ui-with-hard-coded-values-above-fold.png " ")

   ![9-reviewing-the-sample-ui-with-hard-coded-values-below-fold](./images/lab-4/9-reviewing-the-sample-ui-with-hard-coded-values-below-fold.png " ")

## Task 4: Troubleshooting

1. Did you run into any issues? Review these common issues we've encountered, and attempt to resolve the problem.

2. Merge conflict markers. LLMs can sometimes have issues with advanced file creation, preparation, and updating. One common issue is their inability to remove Merge convlict markers, you may need to manually remove and save a file every now and again. 

   ![12-troubleshooting-merge-conflict-marker-errors](./images/lab-4/12-troubleshooting-merge-conflict-marker-errors.png " ")

3. The agent may forget, or narrow its focus too much. You may need to prompt it every now and again. For instance, in this example, we reiterated the request to connect as a specific user: 

   ![13-possible-intervention-of-prompting-to-connect-as-user.](./images/lab-4/13-possible-intervention-of-prompting-to-connect-as-user.png " ")

4. An agent might *convincingly* tell you a task has been accomlished, when in fact it has not. In cases such as these, you may need to provide the agent with quality feedback markers, or actual errors from your application's console log. 

   ![14-troubleshooting-application-networking-issues](./images/lab-4/14-troubleshooting-application-networking-issues.png " ")

## Task 5: Wraping up

1. By now you should have a starter React web application. 

2. If you attempted to create one on your own, try this Lab again, but use the provided prompt verbatim. Compare the results; what worked, what didn't work? 

3. Need more help? Review the **Learn More** section of this Lab for helpful blog posts and tutorials. 

## Learn More

<mark>Pending</mark>

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements

<mark>Pending</mark>

* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Group, Month Year>
