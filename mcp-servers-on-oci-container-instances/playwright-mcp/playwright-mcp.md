# Lab 6: Use Playwright MCP

## Introduction

In this lab, you use the Playwright MCP Server through your AI client. The
server runs in the OCI Container Instance and lets the AI client request browser
automation actions through MCP tools.

Estimated Time: 5 minutes

### Objectives

In this lab, you will:

* confirm the Playwright MCP server is visible to the AI client;
* navigate to a safe public page;
* inspect the browser snapshot returned through MCP.

### Prerequisites

Complete Lab 3 and confirm your AI client can see the `oci_playwright` MCP
server.

## Task 1: List Playwright MCP tools

1. Ask your AI client:

    ```text
    Use the oci_playwright MCP server and list the Playwright browser tools available to you.
    ```

2. Confirm the expected Playwright MCP tools are listed:

    * `browser_navigate`
    * `browser_snapshot`
    * `browser_click`
    * `browser_take_screenshot`
    * `browser_close`

## Task 2: Navigate to a safe public page

1. Ask your AI client:

    ```text
    Use oci_playwright to navigate to https://example.com and return a browser snapshot.
    ```

2. Confirm the result identifies the page title or visible text from the public
    page.

## Task 3: Keep the demo safe

1. For this workshop, use only public demo pages.

2. Do not use Playwright MCP with real credentials, private applications, or
    sensitive browser sessions during the lab.

3. You may now **proceed to the next lab**

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
