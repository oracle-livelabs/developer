# Title of the Lab

## Introduction

In this lab you will become acquainted with Cline, an open-source AI coding Agent, and the SQLcl MCP server. 

The scenarios in this LiveLab consider Cline be the interpreter to your plain language requests and prompts. Those requests and any prompts are then "translated" and sent to the SQLcl MCP server. 

The SQLcl MCP server recieves its directives from the AI Agent, acting upon your requests and intents, communicating with the database on your behalf. This new way of working with your Oracle database allows for a more natural/plain language, conversation-based interaction.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:
* Learn how to:
  - request MCP Server "Tools"
  - review and approve Tool requests
* Observe how the your responses inform an AI Agent's behavior
* Discover how an LLM generates SQL and presents it to the SQLcl MCP Server for execution
* Review the the LLM's results and summaries of findings 
* Review the SQLcl MCP Server's task log in your schema 

### Prerequisites 

This lab assumes you have:
* VS Code installed
* Installed the Cline for VS Code Extension
* Configured an Oracle Database connection using the SQL Developer Extension for VS Code 

<p></p>

> &#9872; **NOTE:** If participating in a workshop, you may optionally use your the credentials provided to you.

## Task 1: Testing your configuration

1. Is the MCP Server working?

   You will need to confirm that the SQLcl MCP Server is working *before* you can begin interacting with it. 

2. Locate the Cline extension. Ensure you see the Agent prompt. Notice the **Plan** and **Act** modes. You will toggle between these two modes depending on your intent or the prompts used. 

   ![cline-1](./images/lab-3/cline-1.png " " )

<p></p>

> &#9888; **IMPORTANT:** For adhering to security best practices, ensure the "Auto-Approve" option is disabled.

<p></p>
 
<!-- You will ask (via a prompt) the Agent (Cline)  to complete a task. The Agent will see that it needs to use one or more tools from our MCP Server to accomplish said task.

It will prompt you for permission to use the tool. You will review the request, and approve (or deny!) it as appropriate. 

The Agent via the configured LLM, will generate SQL as necessary, and prompt you to run it via the run-sql tool, where you will again review it for accuracy, saftey, and performance, and then approve it. 

The results will be analyzed by the LLM and summarized.

When you are done, you will inspect the MCP logging table in your schema to see what has happened in the database, via our MCP Server. -->
  
3. Enable **Plan** mode. Then, in the Task input area of Cline, enter the following prompt:

    ```txt
    <copy>
    connect to my database and run a test query to make sure everything is working as expected
    </copy>
    ```

4. Cline will create a plan and respond by asking permission to use your SQLcl MCP Server via the `list-connections` tool. You should see something like this:

   ![cline-2](./images/lab-3/cline-2.png " ")

> &#9872; **NOTE:** Note the tool name, followed by the arguments. In this case, Cline wants to "see" what database connections are available.

5. Select the **Approve** button to allow the Agent to continue its plan. 

   The Agent will use your Oracle Database connection, and ask to connect to it, via the `connect` tool. 

6. You will again be prompted to approve a request. The message will look something like this: 

    ```json
        {
          "connection_name": "your connection name",
              "mcp_client": "Cline",
                    "model": "claude-3-5-sonnet-20241022"
        }
    ```

7. Approve the request to advance the Agent's plan to the next step.

8. If the connection is successful, you will see two things:

   - the raw feedback from the `connect` tool
   - an LLM-generated summary

   *Example:*

     ```txt
     Excellent! The connection to your database was successful. I can see we're connected to Oracle Database 23.0.0.0.0 in READ WRITE mode with AL32UTF8 character set.
    
     Now let me run a test query to verify everything is working properly. I'll start with a simple query to check the current database time:
     ```

> &#9872; **NOTE:** LLM training data can vary widely among versions and vendors. Thus, an LLM may generate one of several different types of queries to satisfy our request to 'test' the connection and system. 

&#9888; **Warning:** It is very important that you review the SQL, or update your prompt to include the exact SQL you want the Agent to use.

<p></p>

9. Scroll through the "sql" attribute to review the SQL statement. 

   ![cline-3](./images/lab-3/cline-3.png " ")

   In the example the complete SQL statement will resemble the following:

    ```sql
    SELECT /* LLM in use is claude-3-5-sonnet-20241022 */
          SYSDATE as current_time,
          USER as connected_user
    FROM DUAL
    ```

10. Once you've confirmed that the generated SQL is correct, click **Approve** to execute the next task request. The Agent will continue with it's plan.

      <!-- The *run-sql* tool returns query results as CSV, and in the Cline panel, you can see the 'Plain Text' response, followed by the Agent's interpretation of those results.  --> 

      <!-- Think we should omit this ^^, unless we want to show an example flow. -->

      ![cline-4](./images/lab-3/cline-4.png " ")

> &#9872; **NOTE:** "Connected_User" will be the username you provided in the previous lab. 

## Task 2: Closing the connection

1. As a best practice, you should prompt Cline to close your database connection when you are finished. Cline will prompt you for permission to use the `disconnect` tool. Click **Approve**.

2. The Cline Agent will finish its task and provide you with a summary steps used to achieve your original task or prompts.

> &#9872; **NOTE:** The Agent may wish to continue running more queries, in an attempt to provide you with more information about your database. It is up to **YOU** to decide. *What do you do?*
> - allow it to continue
> - deny any follow-up requests, or 
> - provide it with a follow-up prompt to cease operations

<p></p>

3. Before you finish this lab, you can review a log of the queries performed by the SQLcl MCP Server on behalf of the AI Agent. Locate SQL Developer Extension for VS Code in the Activity Panel.

4. Click the connection that the SQLcl MCP Server used to connect to your database.

5. Click the `Tables` object to expand it. Locate the `DBTOOLS$MCP_LOG` table, and click it to open up a new panel. 

6. Click the Data tab to review the interactions from your previous Cline tasks. These logs will capture the SQL, PLSQL, and SQL scripts that were executed on your behalf (via Cline), by the SQLcl MCP Server.

   ![cline-5](./images/lab-3/cline-5.png " ")

7. That's it! You are now ready to start exploring the power of your AI Agent, it's LLMs, and your Oracle Database via the SQLcl MCP Server!

## Learn More

* [MCP Server Introduction](https://blogs.oracle.com/database/post/introducing-mcp-server-for-oracle-database) 
* [Oracle official MCP Server repository](https://github.com/oracle/mcp/tree/main)
* [SQLcl MCP Server Docs](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.2/sqcug/using-oracle-sqlcl-mcp-server.html)

## Acknowledgements

* **Author**<ul><li>Chris Hoina, Senior Product Manager, Database Tools</li></ul>
* **Contributors**<ul><li>Jeff Smith, Distinguished Product Manager, Database Tools</li></ul>
* **Last Updated By/Date**<ul><li>Chris Hoina, September 2025</li></ul>

