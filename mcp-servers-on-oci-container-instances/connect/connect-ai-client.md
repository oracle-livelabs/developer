# Lab 3: Connect an AI Client

## Introduction

In this lab, you configure an MCP-capable AI client to use the remote MCP
servers that are running on OCI. The examples use Codex and Cline because both
were validated with the OCI-hosted endpoints.

Estimated Time: 20 minutes

### Objectives

In this lab, you will:

* configure Streamable HTTP MCP server entries;
* confirm the client can see the OCI-hosted MCP servers.

## Task 1: Prepare the endpoint values

From the Resource Manager outputs, copy:

* `api_gateway_endpoint`
* `terraform_mcp_url`
* `github_mcp_url`
* `playwright_mcp_url`

Use the full `*_mcp_url` values directly, or build the URLs from
`api_gateway_endpoint`:

```text
<api_gateway_endpoint>/terraform/mcp
<api_gateway_endpoint>/github/mcp
<api_gateway_endpoint>/playwright/mcp
```

## Task 2: Configure Codex

Add the remote MCP servers to your Codex `config.toml`.

```toml
[mcp_servers.oci_terraform]
type = "streamable_http"
url = "<api_gateway_endpoint>/terraform/mcp"
startup_timeout_sec = 20
tool_timeout_sec = 120
enabled = true

[mcp_servers.oci_github]
type = "streamable_http"
url = "<api_gateway_endpoint>/github/mcp"
startup_timeout_sec = 20
tool_timeout_sec = 120
bearer_token_env_var = "GITHUB_PAT_TOKEN"
enabled = true

[mcp_servers.oci_playwright]
type = "streamable_http"
url = "<api_gateway_endpoint>/playwright/mcp"
startup_timeout_sec = 20
tool_timeout_sec = 120
enabled = true
```

For GitHub MCP, set `GITHUB_PAT_TOKEN` in the environment used by your client.
Do not paste the token value into the config file.

Confirm the servers are configured:

```bash
codex mcp list
codex mcp get oci_terraform
codex mcp get oci_github
codex mcp get oci_playwright
```

## Task 3: Configure Cline

In Cline, add three remote MCP servers that use Streamable HTTP. The following
JSON shape was validated with Cline `3.0.3`.

```json
{
  "mcpServers": {
    "oci_terraform": {
      "transport": {
        "type": "streamableHttp",
        "url": "<api_gateway_endpoint>/terraform/mcp"
      },
      "disabled": false,
      "timeout": 120,
      "autoApprove": []
    },
    "oci_github": {
      "transport": {
        "type": "streamableHttp",
        "url": "<api_gateway_endpoint>/github/mcp",
        "headers": {
          "Authorization": "Bearer ${env:GITHUB_PAT_TOKEN}"
        }
      },
      "disabled": false,
      "timeout": 120,
      "autoApprove": []
    },
    "oci_playwright": {
      "transport": {
        "type": "streamableHttp",
        "url": "<api_gateway_endpoint>/playwright/mcp"
      },
      "disabled": false,
      "timeout": 120,
      "autoApprove": []
    }
  }
}
```

For GitHub MCP, set `GITHUB_PAT_TOKEN` in the environment used by Cline. Do not
store a real token in the JSON file.

Confirm Cline can see the remote servers:

```bash
cline config mcp --json
```

Expected server names:

* `oci_terraform`
* `oci_github`
* `oci_playwright`

## Task 4: Confirm the client is using the OCI-hosted servers

Ask your AI client to list the available MCP tools. The remote OCI-hosted
servers should appear with names or namespaces that include:

* `oci_terraform`
* `oci_github`
* `oci_playwright`

If you also have local MCP servers configured, use the `oci_*` names when
prompting the client so the tool call goes to the OCI-hosted endpoints.

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
