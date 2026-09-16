# Lab 3: Connect an AI Client

## Introduction

In this lab, you configure an MCP-capable AI client to use the remote MCP
servers that are running on OCI. The examples were validated with the
OCI-hosted endpoints and are provided so you can choose the client harness that
matches your workflow.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:

* configure Streamable HTTP MCP server entries for one MCP-capable AI client;
* confirm the client can see the OCI-hosted MCP servers.

Use one client path for the timed lab. You can use a different option if your
preferred client harness is Codex, Cline, VS Code GitHub Copilot Chat, or Google
Antigravity.

### Prerequisites

Complete Lab 2 and keep the Resource Manager output values available for your
MCP-capable AI client configuration.

## Task 1: Prepare the endpoint values

1. From the Resource Manager outputs, copy:

    * `api_gateway_endpoint`
    * `terraform_mcp_url`
    * `github_mcp_url`
    * `playwright_mcp_url`

2. Use the full `*_mcp_url` values directly, or build the URLs from
    `api_gateway_endpoint`:

    ```text
    <api_gateway_endpoint>/terraform/mcp
    <api_gateway_endpoint>/github/mcp
    <api_gateway_endpoint>/playwright/mcp
    ```

3. Complete Task 2, Task 3, Task 4, or Task 5 for your chosen client.

## Task 2: Option A - Configure Codex

1. Add the remote MCP servers to your Codex `config.toml`.

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

2. For GitHub MCP, set `GITHUB_PAT_TOKEN` in the environment used by your
    client. Do not paste the token value into the config file.

3. Confirm the servers are configured:

    ```bash
    codex mcp list
    codex mcp get oci_terraform
    codex mcp get oci_github
    codex mcp get oci_playwright
    ```

## Task 3: Option B - Configure Cline

1. In Cline, add three remote MCP servers that use Streamable HTTP. The
    following JSON shape was validated with Cline `3.0.3`.

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

2. For GitHub MCP, set `GITHUB_PAT_TOKEN` in the environment used by Cline. Do
    not store a real token in the JSON file.

3. Confirm Cline can see the remote servers:

    ```bash
    cline config mcp --json
    ```

4. Confirm the expected server names are present:

    * `oci_terraform`
    * `oci_github`
    * `oci_playwright`

## Task 4: Option C - Configure VS Code GitHub Copilot Chat

1. In VS Code, open the Command Palette:

    * macOS: **Command+Shift+P**
    * Windows or Linux: **Ctrl+Shift+P**

2. Open one MCP configuration file:

    * For your VS Code user profile, run **MCP: Open User Configuration**.
    * For the current workspace, run
      **MCP: Open Workspace Folder MCP Configuration**.

    Use one location for these `oci_*` server entries.

3. Add the remote MCP servers to the `mcp.json` file that VS Code opens.

    ```json
    {
      "servers": {
        "oci_terraform": {
          "type": "http",
          "url": "<api_gateway_endpoint>/terraform/mcp"
        },
        "oci_github": {
          "type": "http",
          "url": "<api_gateway_endpoint>/github/mcp",
          "headers": {
            "Authorization": "Bearer ${env:GITHUB_PAT_TOKEN}"
          }
        },
        "oci_playwright": {
          "type": "http",
          "url": "<api_gateway_endpoint>/playwright/mcp"
        }
      }
    }
    ```

4. For GitHub MCP, set `GITHUB_PAT_TOKEN` in the environment used by VS Code.
    Do not store a real token in `mcp.json`.

5. Save `mcp.json`, then start the MCP servers from the configuration file
    controls in VS Code.

6. Open GitHub Copilot Chat, select **Agent** mode, and use the tools picker to
    confirm the `oci_*` MCP servers and tools are available.

## Task 5: Option D - Configure Google Antigravity

1. Add the remote MCP servers to one Antigravity MCP configuration file:

    * global configuration: `~/.gemini/config/mcp_config.json`
    * workspace configuration: `.agents/mcp_config.json`

2. Add the remote MCP servers.

    ```json
    {
      "mcpServers": {
        "oci_terraform": {
          "disabled": false,
          "serverUrl": "<api_gateway_endpoint>/terraform/mcp"
        },
        "oci_github": {
          "serverUrl": "<api_gateway_endpoint>/github/mcp",
          "headers": {
            "Authorization": "Bearer <github-token-value>"
          }
        },
        "oci_playwright": {
          "disabled": false,
          "serverUrl": "<api_gateway_endpoint>/playwright/mcp"
        }
      }
    }
    ```

3. For GitHub MCP, replace `<github-token-value>` only in your local
    Antigravity configuration. Do not store a real token in a tracked workspace
    file.

4. Open Antigravity and use `/mcp` to view the MCP server manager.

5. Confirm the expected server names are present:

    * `oci_terraform`
    * `oci_github`
    * `oci_playwright`

## Task 6: Confirm your client is using the OCI-hosted servers

1. Ask your AI client to list the available MCP tools. The remote OCI-hosted
    servers should appear with names or namespaces that include:

    * `oci_terraform`
    * `oci_github`
    * `oci_playwright`

2. If you also have local MCP servers configured, use the `oci_*` names when
    prompting the client so the tool call goes to the OCI-hosted endpoints.

3. You may now **proceed to the next lab**

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
