# Introduction

## About this Workshop

This introduction will provide you with a brief overview of the Model Context Protocol (MCP) and where they fit among AI Agents. You'll also learn how MCP Servers, like the SQLcl MCP Server, can safely and securely combine the power of AI/Large-Language Models (LLMs) and SQLcl's SQL, PL/SQL, and SQL scripting tools to: connect inspect, interrogate, uncover insights, create complex database objects, and develop new database SQL and PL/SQL code using plain old, natural-language.

![1-sqlcl-mcp-interaction-graphic-overview](./images/lab-1/1-sqlcl-mcp-interaction-graphic-overview.png " ")

Estimated Time: 1 hours 10 minutes 

### Objectives

<mark>Pending review of the existing draft prompts</mark>

*List concise objectives for the workshop*

In this workshop, you will:
* Learn about the Model Context Protocol (MCP), MCP Servers, the SQLcl MCP Server and its capabilities
* Configure an AI agent, and the SQLcl MCP Server in VS Code
* Gain a basic understanding of the SQLcl MCP Server's "Tools"
* Explore the provided sample prompts to accelerate your usage of the SQLcp MCP server

### Prerequisites (Optional)

This lab assumes you have:
* An Oracle cloud, LiveSQL, or FreeSQL account
* Access to a 23ai Autonomous database (or LiveSQL/FreeSQL account if participating in an instructor-led workshop)
* Organizational Roles/Privileges to install the following software on your employer-provided work station:

  * MS Visual Studio Code 
    * The Oracle SQL Developer for VS Code extension
    * The Cline for VS Code extension
  * Oracle SQLcl 
    
### About

<!-- This introduction will provide you with a brief overview of the Model Context Protocol (MCP) and where they fit among AI Agents. You'll also learn how MCP Servers, like the SQLcl MCP Server, can safely and securely combine the power of AI/Large-Language Models (LLMs) and SQLcl's SQL, PL/SQL, and SQL scripting tools to: connect inspect, interrogate, uncover insights, create complex database objects, and develop new database SQL and PL/SQL code using plain old, natural-language. -->

#### MCP

The Model Context Protocol (MCP) is a proposed standard for communicating with and interaction between you and your information, applications, and data (like an Oracle Database 23ai), through an intermediary called an MCP Server. 

When designed properly, an MCP Server allows you to take your core tech, like SQLcl, and "connect" it to an AI Agent. Once the agent is "aware" of an MCP Server, it can then use whatever MCP Server "Tools" are available to it. 

**What does this mean for you?** Well, you can ask the agentto perform certain functions on or about your data while simultaneously being "connected" to the Large-language Model (LLM) of your choice. So you get to keep using your natural, plain-language and have what feels like a conversation with your Agent; just like you see here:

  ![1-sqlcl-mcp-interaction-graphic-overview](./images/lab-1/1-sqlcl-mcp-interaction-graphic-overview.png " ")

   **What is happening?** Well, lets discuss the sample use case involving the Oracle database and SQLcl:

   1. A user sets a task in natural language. Something like, "Find the top 10 most expensive queries from last week and recommend an index.”
   2.	The agent responds. Building or showing a plan, and selecting the best MCP Server Tools to achieve the goal. 
   3.	The LLM (that underpins an AI Agent) might generate SQL or perhaps choose a prebuilt Tool from an available MCP Server. In this case it might call upon SQLcl to aid in performing a task.
   4.	One of the SQLcl MCP Server's Tools is `connect`. An agent would know of this ahead of time, and use the `connect` Tool to connect to your Oracle database via JDBC using your stored credentials (an LLM never sees your passwords).
   5.	Once connected, all of your standard security and returns results will be enforced since your Agent is actually relying on the SQLcl MCP Server to interact with the Oracle database.
   6.	Once SQLcl has delivered results to the agent, the underlying LLM would summarize, validate, and propose next steps. 
   7.	The user might then approve, decline, or modify the revised action plan, at each step.
   
And that's it! When done correctly, an MCP Server will have been developed to have certain capabilities. These capabilites (technically known as Primitives) can be used or called upon by the AI Agent in the *Context* you are currently in. The "context" in the above example involved connecting to and interacting with an Oracle database via the SQLcl command line interface. 

> **The SQLcl MCP Server helps to solve the following problem:**
> 
> *How can I securely use LLMs in and around my Oracle Database, without having to manually "switch" to using SQLcl?*

##### Protocols

Typically you'll interact with your MCP server through an AI Agent, using natural language queries. You can explicity name the which "Tools" to use from an MCP Server or your Agent might suggest/use them without prompting (depending on the Agent, and what "guardrails" you have in place). This communication between You,the AI agent, and MCP Servers is "the Protocol." 

A lot happens under the covers for MCP to work, but you should know that MCP can support the following communication mechanisms: 

- Stdio
- HTTP (in the form of `POST` requests)

The SQLcl MCP server utilizes the fast, no overhead Stdio communcation mechanism. And to you, the end user, *this* is what makes up the **Protocol** in Model Context Protocol (MCP). 

##### Capabilities

We mentioned Capabilities earlier. Technically speaking an MCP will have a set of "Primitives," they can be any one of the following: 

|  | | 
| -- | -- | 
| **Tools** | Executable functions that AI applications can invoke to perform actions (e.g., file operations, API calls, database queries) | 
|**Resources**| Data sources that provide contextual information to AI applications (e.g., file contents, database records, API responses)|
|**Prompts**| Reusable templates that help structure interactions with language models (e.g., system prompts, few-shot examples)|

You'll focus on the SQLcl MCP Server's "Tools" in this LiveLab.

#### The SQLcl MCP server

Since SQLcl is an already existing, and powerful command line tool for the Oracle database, it makes sense to "extend" its capabilitites with an MCP server. 

For many users, and scripting tools, SQLcl is the preferred way to interact with an Oracle database. And since you are already interacting with the command line; it makes sense to implement the Stdio means of communicating with the SQLcl MCP server. This means that responses are fast, as they are printed directly to your client's Stdout.

But as an end-user, you probably want to know what you can do with this SQLcl MCP Server. 

##### Tools

The SQLcl MCP server, like other MCP Servers provides you with contextual "Tools." In the case of SQLcl, your MCP server "comes alive" after you've configured your database credentials (Connect String, and/or Cloud Wallet). 

And once saved connections have been configured you can securely explore your Oracle database using natural language with an AI Agent (via SQLcl). If you are just beginning your database journey this means your queries become more of a conversation. The AI Agent, with the right MCP Server, makes ends up becomming more of a soundboard to bounce your ideas and intents off of. 

And if you are an experienced user, you can use a combination of natural language, *and* Oracle SQL and PL/SQL to achieve your goals with ease and even more speed.

**What tools do you have at your disposal?** The practical scenarios in this lab will help you to understand what might be possible, but here is an overview: 

   |Tool | Parameters | Definition |
   | --- | ---------- | ---------- | 
   | `list-connections` | <ul><li>`filter`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>This is the filter that will be used to refine the list of connections</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
   | `connect` | <ul><li>`connection_name`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
   | `disconnect` | <ul><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The name of the saved connection you want to connect to</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
   | `run-sqlcl` | <ul><li>`sqlcl`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The SQLcl command to execute</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
   | `sql` | <ul><li>`sql`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The SQL query to execute</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|

##### Security Considerations

Let's talk about security; here is what and how SQLcl enforces security:

 ![2-trusted-execution-layer](./images/lab-1/2-trusted-execution-layer.jpeg " ")

And here are some things to consider when working with *any* AI Agent and MCP Server: 

- **Least Privileges:** Use read-only accounts for analytic/reporting tasks.
- **Segregation of Duties:** Separate querying from DDL/DML (use different connections).
- **Policies:** Apply existing AI data use policies; add agent specific rules (e.g., “no PII extraction,” “no mass updates”).
- **Avoid Tool Overlap:** Do not ship multiple MCP servers that claim the same capability (e.g., multiple “run SQL” tools) — agents will get confused.
- **Approval Workflow:** Require per step approval for anything that changes data, schema, security, or performance posture.
- **Monitoring:** 
  - Tag queries (model + agent) via SQL comments or logs (SQLcl MCP Server does this by default). 
  - Store agent actions (who/what/when/db/plan) in an audit table.
- **Defense in Depth:** Consider using:
  - SQL Firewall patterns to block risky statements.
  - Data Vault for privileged access management.
  - Resource Manager for runaway queries.
  - Row level security for least data exposure.

> REMEMBER: When an AI Agent uses the SQLcl MCP Server, credentials are never shown to the LLM/agent--its all managed in an Oracle Wallet. Therefore the agent *must* honor database Roles, Privileges, and security safeguards (VPD/Row Level Security, Data Vault, SQL Firewall, Resource Manager).

<!-- ##### Compatability

Compatibility note (from the workshop): JDBC often works against older DBs (even 11g), though only 19c+ is “current/fully supported.” -->

#### MCP Best Practices
| | |
| :--: | -- |
|***Do...***|<ul><li>use read only connections by default.</li><li>keep MCP servers "focused" (no overlapping “run SQL” from multiple servers).</li><li>ensure tools explain themselves (clear descriptions).</li><li>log everything the agent runs (transparency).</li>
|**Do *not...*** | <ul><li>blanket approve session actions.</li><li>expose credentials to the LLM.</li><li>deploy agents into production without strict database controls (Firewall, Vault, RLS, Resource Manager).</li><li>assume the LLM is always correct—review SQL, PL/SQL, plans, and results.</li></ul>|

#### Summary 

| | | 
| -- | -- | 
| **What** | MCP Servers aide AI agents in creating plans and executing workflows and tasks on the Oracle Database. |
| **How** | The SQLcl MCP server exposes tools (connect, run sql, awr, etc.) to your preferred AI agent, using wallet-based credentials and Oracle’s enterprise-grade security features. |
| **Why** | Huge productivity gains (database exploration, reporting, performance triage, etc.) while users remain in control. All while respecting security controls. |

## Learn More

* [MCP Server Introduction](https://blogs.oracle.com/database/post/introducing-mcp-server-for-oracle-database) 
* [Oracle official MCP Server repository](https://github.com/oracle/mcp/tree/main)
* [SQLcl MCP Server Docs](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.2/sqcug/using-oracle-sqlcl-mcp-server.html)

## Acknowledgements
* **Author**<ul><li>Chris Hoina, Senior Product Manager, Database Tools</li></ul>
* **Contributors**<ul><li>Jeff Smith, Distinguished Product Manager, Database Tools</li><li>Linda Foindling</li></ul>
* **Last Updated By/Date**<ul><li>Chris Hoina, August 2025</li></ul>
