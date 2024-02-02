# Setup environment

## Introduction

In this lab, we will set up Azure Vault and Azure Kubernetes access to it for deployed operators and microservices/applications.

### Objectives

In this lab, you will:

* Setup Azure Vault
* Setup AKS access to the vault.

### Prerequisites

This lab assumes:

* You have an Oracle Cloud account with OCI and Tenancy administration privileges to create policies and compartments.

  > **Note:**  Policies are only required if you cannot create or use a OCI resources. If you are a tenancy administrator, you will have access to all the resources, and you can **optionally skip policy creations in this lab**.

## Task 1: Setup Repos

1. https://github.com/kubernetes-sigs/secrets-store-csi-driver vs https://github.com/external-secrets/external-secrets
2. We use the latter, why... even though the former is part of sig, the later is more popular and widely used currently and so it thus more compatible.
Excellent doc... https://medium.com/p/1d0c31082373

## Task 2: Log into OCI

1. Login into OCI

   To setup environment, you need OCI administrator's privileges. If you've got these privileges, login into OCI at [cloud.oracle.com](https://www.oracle.com/cloud/sign-in.html). the below image indicates SSO Login as an administrative user. If you have administrative privileges and complete access over a tenancy then you need not create any of the policies below steps.

   ![SSO Login](images/sso-login.png)

   If you do not have administrative privileges into tenancy, you might have to login as federated user, that is the user created by the administrator

   ![Federated User Login](images/direct-signin.png)

   In case you haven't got OCI administrator's privileges, you should ask your OCI administrator to perform the rest of the tasks in this lab.


This concludes this lab. You can **proceed now to the next lab**.

## Learn More

* [OCI Documentation](https://docs.oracle.com/en-us/iaas/Content/home.htm)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate, Oracle Database

* **Last Updated By/Date** - 2024.