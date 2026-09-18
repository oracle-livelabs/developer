# Lab 7: Clean Up

## Introduction

In this lab, you use Resource Manager to destroy the OCI resources created for
the workshop.

Estimated Time: 5 minutes

### Objectives

In this lab, you will:

* open the Resource Manager stack;
* start the destroy workflow;
* confirm cleanup is complete.

### Prerequisites

Complete the deployment and validation labs. Keep the Resource Manager stack
name and compartment available so you can find the stack to destroy.

## Task 1: Open the stack actions menu

1. Open the Resource Manager stack used for this workshop.

    ![Resource Manager stack details](../images/13-stack-details.png)

2. Open **Stack actions** and select **Destroy**.

    ![Stack actions destroy option](../images/14-stack-actions-destroy.png)

## Task 2: Review the destroy dialog

1. Review the destroy dialog before continuing.

    ![Destroy stack dialog](../images/15-destroy-stack-dialog.png)

2. Select **Destroy** only when you are ready to remove the lab resources.

## Task 3: Confirm cleanup

1. Wait for the destroy job to complete successfully.

2. Confirm the API Gateway endpoints and Container Instance created by this
    workshop are no longer available.

## Task 4: Revoke the GitHub token

1. If you created a GitHub token for the lab, revoke or delete it after the
    workshop.

## Acknowledgements

* **Kevin Liu**, Lead Principal Product Manager
* **Adekola Okunola**, Cloud Solution Engineer
* **Last Updated By/Date** - Adekola Okunola, Cloud Solution Engineer, August 2026
