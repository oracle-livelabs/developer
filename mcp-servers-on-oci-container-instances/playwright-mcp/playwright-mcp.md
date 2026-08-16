# Lab 6: Use Playwright MCP

## Introduction

In this lab, you use the Playwright MCP Server through your AI client. The
server runs in the OCI Container Instance and lets the AI client request browser
automation actions through MCP tools.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:

* confirm the Playwright MCP server is visible to the AI client;
* navigate to a safe public page;
* inspect the browser snapshot returned through MCP.

## Task 1: List Playwright MCP tools

Ask your AI client:

```text
Use the oci_playwright MCP server and list the Playwright browser tools available to you.
```

Expected Playwright MCP tools include:

* `browser_navigate`
* `browser_snapshot`
* `browser_click`
* `browser_take_screenshot`
* `browser_close`

## Task 2: Navigate to a safe public page

Ask your AI client:

```text
Use oci_playwright to navigate to https://example.com and return a browser snapshot.
```

A successful result should identify the page title or visible text from the
public page.

## Task 3: Keep the demo safe

For this workshop, use only public demo pages. Do not use Playwright MCP with
real credentials, private applications, or sensitive browser sessions during
the lab.

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
