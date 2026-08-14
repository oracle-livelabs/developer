# Put AI Agents to Work: MCP Servers on OCI Container Instances

Deploy remote Model Context Protocol (MCP) servers on OCI Container Instances,
then connect an MCP-capable AI client to call those tools over HTTPS.

## What It Demonstrates

- Deploy three ready-made MCP servers on OCI Container Instances.
- Expose the servers through OCI API Gateway HTTPS URLs.
- Connect an MCP-capable AI client over Streamable HTTP.
- Verify that the client can discover tools and call tools from each server.

## MCP Servers Included

- HashiCorp Terraform MCP Server for Terraform Registry, provider, and module
  assistance.
- GitHub MCP Server for repository, issue, pull request, and workflow context.
- Playwright MCP Server for browser automation with AI agents.

## What Gets Deployed

The Terraform / OCI Resource Manager stack is under
[files/terraform/](files/terraform/). It creates:

- one lab VCN with separate API Gateway and Container Instance subnets;
- one public OCI API Gateway HTTPS endpoint;
- one OCI Container Instance;
- three containers in that Container Instance:
  - Terraform MCP on port `8080`;
  - GitHub MCP on port `8082`;
  - Playwright MCP on port `8931`;
- Terraform outputs for the API Gateway MCP URLs:
  - `terraform_mcp_url` at `/terraform/mcp`;
  - `github_mcp_url` at `/github/mcp`;
  - `playwright_mcp_url` at `/playwright/mcp`.

The stack does not deploy an LLM. The LLM or agent runs in the user's chosen
MCP-capable client and calls the hosted MCP server endpoints.

## Resource Manager Inputs

The Resource Manager form asks for:

- target compartment;
- availability domain;
- Container Instance shape: `CI.Standard.E4.Flex`, `CI.Standard.E5.Flex`, or
  `CI.Standard.A1.Flex`;
- OCPU count, prefilled and editable;
- memory in GB, prefilled and editable.

API Gateway, networking, security rules, and container image settings are
created from safe defaults. The stack does not ask users for an SSH key, OCI
API private key, GitHub token, Terraform Cloud token, HCP token, or `.env`
file.

## Deploy to OCI

<p align="center">
  <a href="https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=https://github.com/Phirlly/developer/raw/dev/mcp-servers-on-oci-container-instances/files/resource-manager/mcp-servers-on-oci-container-instances-rm.zip">
    <img src="https://oci-resourcemanager-plugin.plugins.oci.oraclecloud.com/latest/deploy-to-oracle-cloud.svg" alt="Deploy to Oracle Cloud">
  </a>
</p>

Select the target compartment, availability domain, shape, OCPU count, and
memory before applying the stack. Applying the stack creates OCI lab resources.

## After Deployment

Resource Manager returns the remote MCP URLs after the stack is created:

- `terraform_mcp_url`
- `github_mcp_url`
- `playwright_mcp_url`

Use those URLs in an MCP-capable client to confirm the agent can list tools and
call at least one safe tool from each server.

## GitHub Authentication

The stack does not store a GitHub token. For authenticated GitHub MCP tool
calls, configure the token in your MCP client and use the `github_mcp_url`
returned by Resource Manager. Use only a disposable or least-privilege token for
the lab and revoke it when finished.

Do not put a production GitHub token in Terraform variables, Resource Manager
variables, container environment variables, tracked files, or screenshots.

## Security Notes

This lab creates public HTTPS MCP URLs through OCI API Gateway. The Gateway
forwards requests to the Container Instance over the VCN, and the backend MCP
ports are limited to the API Gateway subnet by security rules.

Use this as a temporary lab environment. Do not use production GitHub tokens,
real credentials, private applications, or sensitive browser sessions with this
demo.
