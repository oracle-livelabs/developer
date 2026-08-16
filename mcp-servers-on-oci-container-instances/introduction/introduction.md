# Put AI Agents to Work with MCP and OCI Container Instances

## About this Workshop

Model Context Protocol (MCP) gives AI agents a standard way to connect to
external tools. In this workshop, you deploy three ready-made MCP servers on
Oracle Cloud Infrastructure (OCI) Container Instances and expose them through
OCI API Gateway HTTPS endpoints.

The Container Instance hosts the MCP servers. The large language model does not
run in the Container Instance. Your MCP-capable AI client, such as Codex or
Cline, supplies the model and calls the hosted MCP tools over Streamable HTTP.

Estimated Workshop Time: 90 minutes

### Objectives

In this workshop, you will:

* Deploy Terraform, GitHub, and Playwright MCP servers on OCI Container
  Instances.
* Use OCI Resource Manager to create the lab infrastructure from a package.
* Validate the API Gateway endpoints and Container Instance resources.
* Connect an MCP-capable AI client to the remote MCP servers.
* Run safe tool calls through Terraform MCP, GitHub MCP, and Playwright MCP.
* Clean up the lab resources.

### What You Will Build

The Resource Manager stack creates:

* one VCN for the lab;
* one OCI API Gateway HTTPS endpoint;
* one OCI Container Instance;
* three containers in that Container Instance:
  * Terraform MCP Server;
  * GitHub MCP Server;
  * Playwright MCP Server.

After deployment, Resource Manager returns three MCP URLs:

* `terraform_mcp_url`
* `github_mcp_url`
* `playwright_mcp_url`

### Prerequisites

You need:

* access to an OCI tenancy and a compartment where you can create Resource
  Manager stacks, networking, API Gateway, and Container Instance resources;
* an MCP-capable AI client for the client-connection labs.

You do not need OCI CLI, Terraform CLI, an SSH key, a Terraform Cloud token, or
an HCP token to deploy the Resource Manager stack.

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
