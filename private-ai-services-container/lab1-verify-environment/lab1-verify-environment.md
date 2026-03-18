# Lab 1: Verify the Runtime Environment

## Introduction

In this lab you verify that all the Oracle Private AI Services API endpoint is reachable on the netwokk.
You will also learn how to list all the models available in the container.
All checks are executed from a **JupyterLab Terminal**.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:
- Verify internal container DNS resolution from JupyterLab
- Validate Private AI health and model list
- Confirm Oracle AI Database and ORDS reachability from JupyterLab
- Confirm `/home/.env` is available to the notebook

### Prerequisites

This lab assumes:
- You can open a terminal in JupyterLab (`File` -> `New` -> `Terminal`)

## Task 1: Verify Internal Hostname Resolution

1. In JupyterLab, open a new terminal.

2. Verify that runtime service names resolve:

    ```bash
    <copy>getent hosts privateai aidbfree ords</copy>
    ```

    Expected: one IP entry for each service name.

## Task 2: Validate Private AI REST Endpoints and list available models

1. Health endpoint:

    ```bash
    <copy>curl -sS -i http://privateai:8080/health</copy>
    ```

    Expected: HTTP `200`.

2. List deployed models:

    ```bash
    <copy>curl -sS http://privateai:8080/v1/models | jq .</copy>
    ```

    Expected: JSON payload with a `data` array of model IDs.


## Acknowledgements
- **Author** - Oracle LiveLabs Team
- **Last Updated By/Date** - Oracle LiveLabs Team, March 2026
