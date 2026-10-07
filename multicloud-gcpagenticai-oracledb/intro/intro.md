# Introduction

## About this Workshop

Build and test an inventory workflow in Gemini Enterprise using Oracle AI
Database on Google Cloud. Provision the database and private connectivity,
configure the managed Oracle AI Database Agent, and deploy the application
services in GCP. An optional lab also introduces SQLcl MCP through Gemini CLI.

The application has two distinct paths:

- **Read and explore:** an MCP server calls the managed Oracle agent through
  a server-side Java gateway and A2A relay. Plain questions return tables;
  explicit graph and map requests open Cytoscape.js and MapLibre MCP Apps.
- **Review and act:** a separate A2A service returns native A2UI transfer-review
  controls. A database write requires explicit approval through the governed
  Oracle Database MCP Java Toolkit operation.

The examples query seeded Oracle demo data at request time. Database
authorization and transaction controls remain outside the model.

Estimated Workshop Time: 3-4 hours

### Objectives

* Deploy Oracle AI Database and compute resources on Google Cloud Platform
* Access Oracle AI Database from Gemini CLI using SQLcl MCP
* Register and test Oracle AI Database agents in Gemini Enterprise
* Deploy private A2A connectivity, the Java gateway and read-only MCP server
* Test graph and spatial MCP Apps and separate A2UI form actions
* Verify Oracle-side evidence and preserve explicit approval boundaries

### Prerequisites

- This workshop requires an Oracle Cloud account as well as a Google Cloud Platform account with access to Vertex AI
- Basic familiarity with command-line tools, SQL and application deployment
- Familiarity with AI/ML concepts is helpful but not required

### Let's Get Started

You may now **proceed to the next lab.**

## Want to Learn More?

* [Oracle AI Vector Search Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/)
* [Google Vertex AI Agent Builder](https://docs.cloud.google.com/agent-builder)
* [Oracle Select AI](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/dbms-cloud-ai-package.html)
* [Building AI Agents with Vertex AI](https://codelabs.developers.google.com/devsite/codelabs/building-ai-agents-vertexai)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, October 2026
