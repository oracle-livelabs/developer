# Lab 5: Use GitHub MCP

## Introduction

In this lab, you use the GitHub MCP Server through your AI client. GitHub MCP
requires a GitHub token for authenticated tool calls. Keep that token in your
client environment.

Estimated Time: 5 minutes

This estimate assumes you already have a least-privilege GitHub token available
for the lab. Creating or approving a new token during the lab can add time.

### Objectives

In this lab, you will:

* confirm the GitHub MCP server is visible to the AI client;
* call one read-only GitHub tool;
* keep the token out of OCI Resource Manager and tracked files.

### Prerequisites

Complete Lab 3. Make sure a least-privilege GitHub token is available in the
environment used by your AI client.

## Task 1: Prepare GitHub authentication

1. Use a least-privilege GitHub token for the lab and expose it to your AI
    client as:

    ```bash
    GITHUB_PAT_TOKEN=<your-token>
    ```

2. Do not store the token in Terraform, Resource Manager variables,
    screenshots, or tracked files.

## Task 2: List GitHub MCP tools

1. Ask your AI client:

    ```text
    Use the oci_github MCP server and list the GitHub tools available to you.
    ```

2. Confirm the expected GitHub MCP tools are listed:

    * `get_me`
    * `search_repositories`
    * `list_pull_requests`
    * `list_issues`
    * `get_file_contents`

## Task 3: Call a read-only GitHub MCP tool

1. Ask your AI client:

    ```text
    Use oci_github to identify the authenticated GitHub user with get_me.
    ```

2. If you do not want to expose user identity in a shared setting, use a
    disposable token created only for the workshop.

3. You may now **proceed to the next lab**

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
