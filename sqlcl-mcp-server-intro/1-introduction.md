# Introduction

## About this Workshop

In this workshop, you’ll learn how to connect an AI Agent (Cline) to the SQLcl MCP Server.

**Estimated Time:** 1 hour 10 minutes

### Objectives

- Explore the Model Context Protocol (MCP)
- Review capabilities and tools of the SQLcl MCP Server
- Register the SQLcl MCP Server with an AI Agent
- Perform agent-driven Oracle AI Database tasks using sample prompts

[](include:test)

<br>

### What is MCP?

The Model Context Protocol (MCP) is a proposed standard that lets AI Agents interact securely with your data and applications via an intermediary called an MCP Server.

An MCP Server integrates your technology (like SQLcl) with AI Agents. Agents registered with an MCP server can access "Tools" to build complex, context-aware workflows (e.g., database object creation, web apps, dashboards).

#### Benefits:

Users can request and perform database tasks from the Agent interface in plain language, shifting from basic prompts ("single-shot") to continuous, guided collaboration ("Agentic Workflow").

### Single-shot AI vs. Agentic Workflows

![Workflow comparison](./images/lab-1/3-single-shot-vs-agentic-ai.jpeg " ")

- **Single-Shot:** A user prompts &#8594; LLM responds &#8594; Done. *Step-by-step manual interaction.*
- **Agentic Workflow:** A user prompts &#8594; the Agent creates a plan &#8594; the user approves/edits &#8594; the Agent uses tools to execute &#8594; Results are presented for approval/consumption/iteration to the user. *Transparent, iterative, and controlled.*

#### A Practical Example

1. User asks, "Find the top 10 most expensive queries from last week and recommend an index.”
2. Agent creates a plan and chooses MCP Server Tools.
3. LLM generates SQL or invokes a prebuilt tool (e.g., SQLcl).
4. Agent uses SQLcl MCP Server’s `connect` tool (credentials never exposed to LLM) to connect and execute SQL queries.
5. Standard database security applies.
6. Results provided by the AI Agent; user can review/approve next steps.

<br>

### Protocols & Capabilities

You interact with MCP Servers through AI Agents; using natural language to invoke tools. The Agent might also use tools autonomously within "protocol" guidelines.

#### Key MCP Server "Primitives"

| Primitive  | Description                                                                           |
|------------|---------------------------------------------------------------------------------------|
| **Tools**      | Executable functions (e.g., file ops, API calls, SQL)                              |
| **Resources**  | Data sources (e.g., file contents, DB records)                                    |
| **Prompts**    | Reusable templates for structured LLM/agent interactions                          |
{: title="MCP Server Primitives"}

### The SQLcl MCP Server

SQLcl is a powerful CLI for the Oracle AI Database. By extending it with an MCP Server, we can enable secure, natural-language database interaction through an AI Agent. In the next few labs you'll explore your database using an AI Agent along with the SQLcl MCP Server. 
</br>

#### Security Considerations when using the SQLcl MCP Server

Some key principles to consider: 

- **Least Privilege:** Use read-only accounts where possible.
- **Segregation of Duties:** Separate querying from admin tasks.
- **Policies:** Apply corporate/agent-specific data policies.
- **Avoid Overlap:** Do not run multiple MCP Servers with overlapping capabilities.
- **Approval Workflow:** Require "stepwise" approval for data/schema changes.
- **Monitoring:** 
    - Tag and log all agent activity (model + user) ***SQLcl MCP Server does this by default.***
    - Audit actions in a database table
    - Use <emp>defense-in-depth</emp>: SQL Firewall, Data Vault, Resource Manager, Row Level Security

> &#8505; **Note:** SQLcl MCP Server stores credentials securely in an Oracle Wallet—never exposed to the LLM/Agent. All database roles, privileges, and safeguards apply.

### General MCP Best Practices

| **Do**                                                      | **Do Not**                                      |
|:------------------------------------------------------------|:-------------------------------------------------|
| Use read-only connections by default                        | Blanket approve session actions                  |
| Keep MCP servers focused (no overlapping functionality)     | Expose credentials to the LLM                    |
| Ensure all tools and actions are logged/documented          | Deploy agents in production without strict controls |
| Provide clear, descriptive tool documentation               | Assume LLMs are always correct without review    |
{: title="MCP Server Best Practices"}

### Summary

- *What?* MCP Servers allow AI Agents to safely execute plans/workflows on Oracle Databases.  
- *How?* The SQLcl MCP Server provides tools to AI Agents using database authentication and Oracle security features.  
- *Why?* Boost productivity for database exploration, reporting, and diagnostics — secure, controlled, and efficient. 

You may now [proceed to the next lab](#next).

**Learn More:**
- [MCP Server Introduction](https://blogs.oracle.com/database/post/introducing-mcp-server-for-oracle-database)
- [Oracle official MCP Server repository](https://github.com/oracle/mcp/tree/main)
- [SQLcl MCP Server Docs](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.2/sqcug/using-oracle-sqlcl-mcp-server.html)

**Acknowledgements:**
- Author: Chris Hoina, Senior Product Manager, Database Tools
- Contributors: Jeff Smith, Linda Foindling
- Last updated: Chris Hoina, February 2026

<!-- WMS ID 11914 -->