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

- one public VCN/subnet path for a lab deployment;
- one OCI Container Instance;
- three containers in that Container Instance:
  - Terraform MCP on port `8080`;
  - GitHub MCP on port `8082`;
  - Playwright MCP on port `8931`;
- Terraform outputs for the public MCP URLs.

The stack does not deploy an LLM. The LLM or agent runs in the user's chosen
MCP-capable client and calls the hosted MCP server endpoints.

## Resource Manager Inputs

The Resource Manager schema keeps the required user inputs minimal:

- target compartment;
- availability domain;
- Container Instance shape;
- OCPU count;
- memory in GB.

The stack does not ask users for an SSH key, OCI API private key, GitHub token,
Terraform Cloud token, HCP token, or `.env` file.

## Deploying From Source Control

For OCI Resource Manager validation from GitHub, create the stack from this
repository and point Resource Manager at:

```text
mcp-servers-on-oci-container-instances/files/terraform
```

Use Terraform version `1.5.x`. During development validation, use branch `dev`.
For a published workshop release, use the reviewed release branch after the lab
has passed Resource Manager apply/destroy and remote MCP smoke validation.

## Click-to-Deploy Status

OCI Resource Manager supports a **Deploy to Oracle Cloud** button for Terraform
configuration zip packages. This project can support that flow, but an active
button is intentionally not enabled yet because the Terraform-only package has
not been published at a stable unauthenticated URL.

Do not use the full `developer` branch zip as the button target. This lab's
Terraform root is nested under
`mcp-servers-on-oci-container-instances/files/terraform`, while the
click-to-deploy URL accepts a `zipUrl` package. Use the source-control path
above until a release package exists.

For the release path, publish the generated Resource Manager package as:

```text
mcp-servers-on-oci-container-instances-rm.zip
```

The zip must contain these files at the archive root:

```text
versions.tf
providers.tf
variables.tf
locals.tf
network.tf
container-instance.tf
outputs.tf
schema.yaml
```

After that zip is published and validated as a GitHub release asset or OCI
Object Storage pre-authenticated request URL, enable the button with:

```markdown
[![Deploy to Oracle Cloud](https://oci-resourcemanager-plugin.plugins.oci.oraclecloud.com/latest/deploy-to-oracle-cloud.svg)](https://cloud.oracle.com/resourcemanager/stacks/create?zipUrl=<public-terraform-zip-url>)
```

Lab participants should not need to build or upload this zip manually. The
package should be generated and published by the release process, then users
can launch the Resource Manager Create Stack flow from the button. Review the
stack variables before creating the stack because Resource Manager may run
apply from the Create Stack flow.

## GitHub Authentication

The Terraform stack does not store a GitHub token.

Do not send a real GitHub bearer token to the public HTTP endpoint created by
this first demo stack. For the public HTTP validation path, verify that the
GitHub MCP endpoint is reachable and returns the expected unauthenticated
authorization challenge.

Authenticated GitHub MCP tool calls require one of the following safer paths:

- a TLS-protected and authenticated front door;
- a private endpoint or trusted client path;
- an explicitly approved disposable least-privilege lab token that is revoked
  immediately after the smoke test.

Do not use a production or broad-scope token for a public demo endpoint.

## Demo Security Posture

This first stack is intentionally optimized for a frictionless lab demo. The MCP
ports are public HTTP endpoints. That is useful for showing how AI agents can
connect to MCP servers running on OCI Container Instances, but it is not a
production security posture.

Before production use, add an authenticated and TLS-protected front door such as
an API gateway, load balancer, WAF, private endpoint pattern, or another
approved access-control layer.

## Status

The first Terraform / Resource Manager implementation slice is in place. Live
OCI deployment, Resource Manager apply/destroy validation, and remote MCP
tool-call smoke testing are still required before this is treated as a complete
LiveLab.
