# Put AI Agents to Work: MCP Servers on OCI Container Instances

This project is a hands-on LiveLab for deploying remote Model Context Protocol
(MCP) servers on OCI Container Instances and connecting AI agents to those
servers.

## Who This Is For

This workshop is intended for developers, cloud architects, sales engineers,
customers, and internal teams who want to understand how AI agents can use MCP
tools hosted on OCI.

## What It Demonstrates

- Deploying ready-made MCP servers on OCI Container Instances.
- Exposing MCP servers over remote Streamable HTTP.
- Connecting an AI agent or MCP-capable client to a hosted MCP endpoint.
- Validating that the agent can discover tools and call those tools.
- Comparing more than one practical MCP server pattern.

## MCP Servers Included

- HashiCorp Terraform MCP Server for Terraform Registry, provider, and module
  assistance.
- GitHub MCP Server for repository, issue, pull request, and workflow context.
- Playwright MCP Server for browser automation with AI agents.
- Optional future OpenAPI MCP Server to show how REST APIs can become MCP
  tools.

## Current Stack

This is not a Python application project. The deployable lab stack is
Terraform HCL plus an OCI Resource Manager schema. Python, when present, is
used only for local repository validation.

The first Terraform / OCI Resource Manager stack is under
[files/terraform/](files/terraform/). It creates:

- one lab VCN with separate API Gateway and Container Instance subnets;
- one public OCI API Gateway HTTPS endpoint;
- one OCI Container Instance;
- three containers in that Container Instance:
  - Terraform MCP on port `8080`;
  - GitHub MCP on port `8082`;
  - Playwright MCP on port `8931`;
- Terraform outputs for the API Gateway MCP URLs:
  - `/terraform/mcp`;
  - `/github/mcp`;
  - `/playwright/mcp`.

The stack does not deploy an LLM. The LLM or agent runs in the user's chosen
MCP-capable client and calls the hosted MCP server endpoints.

## Resource Manager Inputs

The Resource Manager schema keeps the required user inputs minimal:

- target compartment;
- availability domain;
- Container Instance shape;
- OCPU count;
- memory in GB.

API Gateway, networking, security rules, and container image settings are
created from safe defaults. The stack does not ask users for an SSH key, OCI
API private key, GitHub token, Terraform Cloud token, HCP token, or `.env`
file.

## Deploying From Source Control

For OCI Resource Manager validation from GitHub, create the stack from this
repository and point Resource Manager at:

```text
mcp-servers-on-oci-container-instances/files/terraform
```

Use Terraform version `1.5.x`. During development validation, use branch `dev`.
For a published workshop release, use the reviewed release branch after the lab
has passed Resource Manager apply/destroy and remote MCP smoke validation.

## Deploy to OCI

<p align="center">
  <a href="https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/Phirlly/developer/raw/dev/mcp-servers-on-oci-container-instances/files/resource-manager/mcp-servers-on-oci-container-instances-rm.zip">
    <img src="https://oci-resourcemanager-plugin.plugins.oci.oraclecloud.com/latest/deploy-to-oracle-cloud.svg" alt="Deploy to Oracle Cloud">
  </a>
</p>

Review the Resource Manager variables before creating the stack. The OCI
Resource Manager flow can run apply by default, which creates lab resources.

## GitHub Authentication

The Terraform stack does not store a GitHub token.

After the Gateway path is live-validated, authenticated GitHub MCP tool calls
use a client-supplied GitHub bearer token sent to the GitHub MCP URL returned by
Resource Manager. Use only a disposable or least-privilege token for the lab and
revoke it when finished.

Do not put a production GitHub token in Terraform variables, Resource Manager
variables, container environment variables, tracked files, or screenshots.

## Demo Security Posture

This stack is intentionally optimized for a frictionless lab demo. The MCP
servers are reached through OCI API Gateway HTTPS URLs. The Container Instance
keeps a public IP for simple image pulls, but the MCP backend ports are intended
to accept ingress only from the API Gateway subnet through the stack security
rules.

Before production use, add an approved authentication and access-control layer,
such as API Gateway authorizers, usage plans, WAF, private endpoints, or another
organization-approved pattern.

Use Playwright MCP only with safe public demo pages in this lab. Do not use it
with real credentials, private applications, or persistent browser profiles.

## Status

The Terraform / Resource Manager deployment slice is in place. Live OCI
deployment, Resource Manager apply/destroy validation, and remote MCP tool-call
smoke testing are required before this is treated as a complete LiveLab.
