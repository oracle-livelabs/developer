# Lab 4: Use Terraform MCP

## Introduction

In this lab, you use the Terraform MCP Server through your AI client. This
proves the agent can call a remote tool hosted on OCI rather than relying only
on local files or built-in model knowledge.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:

* identify the Terraform MCP tools exposed by the OCI-hosted server;
* call one safe Terraform Registry lookup tool;
* verify the response came from the `oci_terraform` MCP server.

## Task 1: List Terraform MCP tools

Ask your AI client:

```text
Use the oci_terraform MCP server and list the Terraform tools available to you.
```

Expected Terraform MCP tools include:

* `get_latest_module_version`
* `get_latest_provider_version`
* `get_module_details`
* `get_provider_capabilities`
* `get_provider_details`
* `search_modules`
* `search_providers`

## Task 2: Call a safe Terraform MCP tool

Ask your AI client:

```text
Use oci_terraform to get the latest version of the hashicorp/oci provider.
```

The exact version can change over time. A successful result proves the client
called the remote Terraform MCP server and received live Terraform Registry
information.

## Task 3: Confirm the result

Confirm the response identifies the Terraform provider and version. If your
client shows tool traces, verify the tool call used `oci_terraform`, not a
local MCP server with a similar name.

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
