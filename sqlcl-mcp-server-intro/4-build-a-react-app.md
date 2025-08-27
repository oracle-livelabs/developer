# Build a React app

## Introduction

In this Lab you will use your LLM agent and the SQLcl MCP server to create a starter web application. The sample web application in this lab uses the React library.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:
* Review the included prompt
* Use the provided prompt to:
  * guide you through the creation process, *or*
  * use as a reference guide as you improvise
* Use the provided prompt in "Plan" mode to recreate the sample web application as seen in the example images and output

### Prerequisites (Optional)

<mark>Pending</mark>

*List the prerequisites for this lab using the format below. Fill in whatever knowledge, accounts, etc. is needed to complete the lab. **Do NOT list** each previous lab as a prerequisite.*

This lab assumes you have:
* An Oracle account
* All previous labs successfully completed

*This is the "fold" - below items are collapsed by default*

## Task 1: Review the prompt

1. Included is a prompt that can be used with your agent while in "Plan" mode. Notice the sections of the prompt: 

    - Overview
    - CO Schema exploration
    - Create the web application
    - Provide helpful insight
    - Disconnect from the database
    - Launch the web application

2. As you may have seen in other scenarios in this LiveLab, you may save this prompt as a markdown file and execute it in your agent's "Plan" mode. 

```markdown
<copy># Single Web Page Application example

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

## Create the web application

1. Create a project directory before scaffolding a project.
2. Once the directory is created, scaffold the single page React application. 
3. Using what you learned about the CO schema, and the selection I made in the CO schema exploration section, reconnect as the SQL_FREESQL_01 user and query the values you need to populate the React application.
4. The React application should include a graph or chart to visualize the data. And there should be a table underneath, or next to the visualization that shows the values. 
5. Share with me what you intend to display on the React page before altering the app source files.

## Provide helpful inight 
1. Once complete, provide me with a list of next steps, or recommended actions for making this more dynamic.
2. Answer the following questions: 
  - What options do I have for establishing an Oracle database connection so my app can update in real time? 
  - What options do I have if a user wants to update one of these underlying tables? 
  - What other functions do you recommend this app should have? 
  - What other Oracle database technologies could I use in/with this React application? 

## Disconnect

1. Use the SQLcl MCP server "disconnect" tool, to disconnect from the database.

## Launch the web application

1. Launch the web application and review it for accuracy and expected outcome
2. If the data and visualization are not visible on screen, please debug as needed.</copy>
```

3. If you have decided to improvise, and use the prompt as a "jumping-off" point, then explore on your own. And if you run into trouble, start over with the prompt and let the LLM and the MCP server do the work for you.

4. If you intend to execute this prompt in "Plan" mode while following along as the Agent and SQLcl MCP server create a sample app, then continue to the next task.

## Task 2: Observing the prompt execution

1. The prompt that you have been provided is the result of iterative testing. It is designed to teach you how to prompt your LLM to best utilize the SQLcl MCP Server, and to end up with a repeatable and predictable outcome. You should expect to complete this Lab with your own version of the sample application; one that closesly resembles the examples and images in this Lab. 

2. Navigate to your Cline extension. Toggle the mode to **Plan** mode. 

3. Click the `+` icon to add files and images to the task. Select the file name you chose for the prompt. 

4. Alternatively, you can use the prompt as a guide for creating your own prompts. While your LLM may deviate from the planned path, you'll have more creative freedom to explore the SQLcl MCP server.

5. If you decide to use the prompt in its entirety, include some prepatory instructions in additon to the prompt file; something like this:

    ```txt
    <copy>Review the steps in the included markdown file. Detail the steps you intend to take to achieve the desired outcome. And await for my approval before proceeding.</copy>
    ```

  To create a link to local file you want the reader to download, use the following format.

	> **Note:** _The filename must be in lowercase letters and CANNOT include any spaces._

  Download the [starter file](files/starter-file.sql) SQL code.

	When the file type is recognized by the browser, it will attempt to render it. So you can use the following format to force the download dialog box.

	> **Note:** _The filename must be in lowercase letters and CANNOT include any spaces._

	Download the [sample JSON code](files/sample.json?download=1).

  *IMPORTANT: do not include zip files, CSV, PDF, PSD, JAR, WAR, EAR, bin or exe files - you must have those objects stored somewhere else. We highly recommend using Oracle Cloud Object Store and creating a PAR URL instead. See [Using Pre-Authenticated Requests](https://docs.cloud.oracle.com/en-us/iaas/Content/Object/Tasks/usingpreauthenticatedrequests.htm)*

2. Sub step 2

    ![Image alt text](images/sample1.png)

4. Example with inline navigation icon ![Image alt text](images/sample2.png) click **Navigation**.

5. Example with bold **text**.

  If you add another paragraph, add 3 spaces before the line.

## Task 2: <what is the action in this step>

1. Sub step 1 - tables sample

  Use tables sparingly:

  | Column 1 | Column 2 | Column 3 |
  | --- | --- | --- |
  | 1 | Some text or a link | More text  |
  | 2 |Some text or a link | More text |
  | 3 | Some text or a link | More text |

2. You can also include bulleted lists - make sure to indent 4 spaces:

    - List item 1
    - List item 2

3. Code examples

    ```
    Adding code examples
  	Indentation is important for the code example to appear inside the step
    Multiple lines of code
  	<copy>Enclose the text you want to copy in <copy></copy>.</copy>
    ```

4. Code examples that include variables

	```
  <copy>ssh -i <ssh-key-file></copy>
  ```

## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Group, Month Year>
