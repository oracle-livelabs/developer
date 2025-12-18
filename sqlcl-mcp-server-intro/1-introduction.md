# Introduction

## About this Workshop

In this workshop you will discover how to use the SQLcl MCP Server with your AI Agent to enhance your workflows. You'll explore how the SQLcl MCP Server can safely and securely compliment AI Agents so they may deliver meaningful and relevant results from your Oracle Database.

Estimated Time: 1 hours 10 minutes 

### Objectives

In this workshop, you will:
+ Learn about Model Context Protocol (MCP) and our MCP Server for Oracle Database
+ Register the SQLcl MCP Server with an Agent
+ Explore SQLcl MCP Server "Tools"
+ Use our prompts to perform various Agentic tasks involving your Oracle Database

### About

#### MCP

The Model Context Protocol (MCP) is a proposed standard for how AI Agents communicate with you and your data, applications, and data, through an intermediary called an MCP Server.

An MCP Server allows you to take your core tech, like SQLcl, and "connect" it to an AI Agent. Once the Agent is "aware" of an MCP Server, it can then use whatever MCP Server "Tools" are available to it to create highly-developed workflows. This workflows would focus on the context you are in, like in this workshop: database object creation, simple web applictions driven by your data, simple monitoring dashboards, and more.

**What does this mean for you?** You can ask the Agent to perform certain functions in and around your database, its objects, or data while simultaneously being "connected" to the Large-language Model (LLM) of your choice. Communicate using natural, plain-language; in what feels more like a collaboration with you and an AI Agent. This makes working with AI Agents less question-and-answer (Single-shot), and more continuous and iterative (Agentic Workflow).

**Single-shot GenAI vs Agentic Workflows**

Single-Shot AIs rely on constant user intervention; very manual. Whereas Agentic Workflows enable an Agent to orchestrate a complete workflow. But the user is still in control. These workflows are not only fully-fleshed out plans, but they are persistent, observable, and safe.

  ![1-sqlcl-mcp-interaction-graphic-overview](./images/lab-1/3-single-shot-vs-agentic-ai.jpeg " ")

  <p></p>

  |   |  | 
  | -- | -- | 
  | **Single-Shot GenAI** | Issue a request/prompt &#8594; LLM performs task &#8594; Done | 
  | **Agentic Workflow** | User issues prompt &#8594; Agent builds a plan &#8594; User approves/declines/amends plan &#8594; Agent uses available tools to achieve goals &#8594; Agent delivers results &#8594; User iterates on existing/new plan|
  {: title="Single-shot vs Agentic"}

**An example Agentic Workflow:**

Here is a sample use case involving the Oracle database, an AI Agent, and the SQLcl MCP Server:

![1-sqlcl-mcp-interaction-graphic-overview](./images/lab-1/1-sqlcl-mcp-interaction-graphic-overview.png " ")

<p></p>

   1. A user sets a task in natural language. Something like, "Find the top 10 most expensive queries from last week and recommend an index.”
   2.	The Agent responds; building or showing a plan, and selecting the best MCP Server Tools to achieve the goal. 
   3.	The LLM (that underpins an AI Agent) might generate SQL or perhaps choose a prebuilt Tool from available MCP Servers. In this case it might call upon SQLcl to aid in performing a task.
   4.	One of the SQLcl MCP Server's Tools is `connect`<sup id="ref-1"><a href="#fn-1">1</a></sup>. An Agent would know of this ahead of time, and use the `connect` Tool to connect to your Oracle database via JDBC using your stored credentials (an LLM never sees your passwords).
   5.	Once connected, all of your standard security settings and rules will be enforced since your Agent is actually relying on the SQLcl MCP Server to interact with the Oracle database.
   6.	Once SQLcl has delivered results to the Agent, the underlying LLM would summarize, validate, and propose next steps. 
   7.	The user might then approve, decline, or modify the revised action plan, at each step.

#### Protocols

Typically you'll interact with your MCP server through an AI Agent, using natural language queries. You can indicate which "Tools" to use from an MCP Server. Or, your Agent might suggest using them with zero prompting (depending on the Agent, and what "guardrails" you have in place). This communication between you, the AI Agent, and MCP Servers is "the Protocol." 

#### Capabilities

Also known as "Primitives," these are the key capabilities of every MCP Server: 

|  | | 
| -- | -- | 
| **Tools** | Executable functions that AI applications can invoke to perform actions (e.g., file operations, API calls, database queries) | 
|**Resources**| Data sources that provide contextual information to AI applications (e.g., file contents, database records, API responses)|
|**Prompts**| Reusable templates that help structure interactions with language models (e.g., system prompts, few-shot examples)|
{: title="MCP Server Primitives"}

> &#9888; **Important:** You'll use SQLcl MCP Server's "Tools" in this LiveLab.

<p></p>

### The SQLcl MCP server

Since SQLcl is an already existing, and powerful command line tool for the Oracle database, it makes sense to "extend" its capabilitites with an MCP server. 

For many users, and scripting tools, SQLcl is the preferred way to interact with an Oracle database. 

But as an end-user, you probably want to know what you can do with this SQLcl MCP Server. 

#### Tools

The SQLcl MCP server, like other MCP Servers provides you with contextual "Tools." In the case of SQLcl, your MCP server "comes alive" after you've configured your database credentials (Connect String, and/or Cloud Wallet). 

And once saved connections have been configured you can securely explore your Oracle database using natural language with an AI Agent (relying on the SQLcl MCP Sever Tools). If you are just beginning your database journey this means your queries become more of a conversation. The AI Agent, with the right MCP Server, ends up becomming more of a soundboard to bounce your ideas and intents off of. 

And if you are an experienced user, you can use a combination of natural language, *and* Oracle SQL and PL/SQL to achieve your goals with ease and even more speed.

#### SQLcl MCP Server Tools

|Tool | Parameters | Definition |
| --- | ---------- | ---------- | 
| `list-connections` | <ul><li>`filter`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>This is the filter that will be used to refine the list of connections</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
| `connect` | <ul><li>`connection_name`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
| `disconnect` | <ul><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The name of the saved connection you want to connect to</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
| `run-sqlcl` | <ul><li>`sqlcl`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The SQLcl command to execute</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
| `sql` | <ul><li>`sql`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The SQL query to execute</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
{: title="SQLcl MCP Server Tools"}

#### Security Considerations

Let's talk about security; here is what and how SQLcl enforces security:

 ![2-trusted-execution-layer](./images/lab-1/2-trusted-execution-layer.jpeg " ")

Some things to consider when working with *any* AI Agent and/or MCP Server: 

- **Least Privileges:** Use read-only accounts for analytic/reporting tasks.
- **Segregation of Duties:** Separate querying from DDL/DML (use different connections).
- **Policies:** Apply existing AI data use policies; add Agent specific rules (e.g., “no PII extraction,” “no mass updates”).
- **Avoid Tool Overlap:** Do not ship multiple MCP servers that claim the same capability (e.g., multiple “run SQL” tools) — Agents will get confused.
- **Approval Workflow:** Require per step approval for anything that changes data, schema, security, or performance posture.
- **Monitoring:** 
    - Tag queries (model + Agent) via SQL comments or logs (SQLcl MCP Server does this by default). 
    - Store Agent actions (who/what/when/db/plan) in an audit table.
- **Defense in Depth:** Consider using:
    - SQL Firewall patterns to block risky statements.
    - Data Vault for privileged access management.
    - Resource Manager for runaway queries.
    - Row level security for least data exposure.

<p></p>

> &#9888; **REMEMBER:** When an AI Agent uses the SQLcl MCP Server, credentials are never shown to the LLM/Agent--its all managed in an Oracle Wallet. Therefore the Agent *must* honor database Roles, Privileges, and security safeguards (VPD/Row Level Security, Data Vault, SQL Firewall, Resource Manager).

#### MCP Best Practices
| | |
| :--: | -- |
|***Do...***|<ul><li>use read only connections by default.</li><li>keep MCP servers "focused" (no overlapping “run SQL” from multiple servers).</li><li>ensure tools explain themselves (clear descriptions).</li><li>log everything the Agent runs (transparency).</li>
|**Do *not...*** | <ul><li>blanket approve session actions.</li><li>expose credentials to the LLM.</li><li>deploy Agents into production without strict database controls (Firewall, Vault, RLS, Resource Manager).</li><li>assume the LLM is always correct—review SQL, PL/SQL, plans, and results.</li></ul>|
{: title="MCP Server Best Practices"}

### Summary 

| | | 
| -- | -- | 
| **What** | MCP Servers aide AI Agents in creating plans and executing workflows and tasks on the Oracle Database. |
| **How** | The SQLcl MCP server provides tools (connect, run sql, awr, etc.) to your preferred AI Agent, using wallet-based credentials and Oracle’s enterprise-grade security features. |
| **Why** | Huge productivity gains (database exploration, reporting, performance triage, etc.) while users remain in control. All while respecting security controls. |
{: title="MCP Server Wrap-up"}
 
<br></br>

**Footnotes**
<ol>
  <li id="fn-1">
    An MCP Server will have been developed to have certain capabilities. These capabilites (technically known as Primitives) can be used or called upon by the AI Agent in the *Context* you are currently in. The "context" in the above example involved connecting to and interacting with an Oracle database via the SQLcl command line interface. You'll learn more about these Primitives in a later section.
    <a href="#ref-1" title="Jump back to the reference">&uarr;</a>
  </li>
</ol>

## Learn More

* [MCP Server Introduction](https://blogs.oracle.com/database/post/introducing-mcp-server-for-oracle-database) 
* [Oracle official MCP Server repository](https://github.com/oracle/mcp/tree/main)
* [SQLcl MCP Server Docs](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.2/sqcug/using-oracle-sqlcl-mcp-server.html)

You may now [proceed to the next lab](#next).

## Acknowledgements

* **Author**<ul><li>Chris Hoina, Senior Product Manager, Database Tools</li></ul>
* **Contributors**<ul><li>Jeff Smith, Distinguished Product Manager, Database Tools</li><li>Linda Foindling</li></ul>
* **Last Updated By/Date**<ul><li>Chris Hoina, September 2025</li></ul>

<!-- WMS ID 11914 -->