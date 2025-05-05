# Get started - Installation and Setup

## Introduction

The AI Optimizer is available to install in your own environment, which may be a developer’s desktop, on-premises data center environment, or a cloud provider. It can be run either on bare-metal, within a container, or in a Kubernetes Cluster.

This walkthrough will guide you through a basic installation of the Oracle AI Optimizer and Toolkit (the AI Optimizer). It will allow you to experiment with GenAI, using Retrieval-Augmented Generation (RAG) with Oracle Database 23ai at the core.

Estimated Time: 5 minutes

### Objectives

* Perform a full on-premise installation of the **Oracle AI Optimizer and Toolkit**

### Prerequisites

This lab assumes you have:

* An Integrated Development Editor (like Visual Studio Code)
* Python 3.11 (for running Bare-Metal)
* Container Runtime e.g. docker/podman (for running in a Container)
* Internet Access (docker.io and container-registry.oracle.com)
* 100G of free disk space.
* 12G of usable memory.
* Sufficient GPU/CPU resources to run the LLM, embedding model, and database

## Task 1:  Log in to Oracle Cloud

{{% notice style="code" title="Same... but Different" icon="circle-info" %}}
The walkthrough will reference `podman` commands. If applicable to your environment, `podman` can be substituted with `docker`.
If you are using `docker`, make the walkthrough easier by aliasing the `podman` command:

`alias podman=docker`.
{{% /notice %}}

If you've signed out of the Oracle Cloud, use these steps to sign back in.

1. Go to [cloud.oracle.com](https://cloud.oracle.com) and enter your Cloud Account Name and click **Next**. This is the name you chose while creating your account in the previous section. It's NOT your email address. If you've forgotten the name, see the confirmation email.

    ![Cloud Account Name](./images/cloud-oracle.png " ")

2. Choose **Identity Domain**

    ![Click Continue Single Sign-In](./images/cloud-login-default.png " ")


    ![Click Continue Single Sign-In](./images/cloud-login-oracle-identity.png " ")

    Click **Next** to reveal the login input fields.

3. Enter your Cloud Account credentials and click **Sign In**. Your username is your email address. The password is what you chose when you signed up for an account.

    ![Sign in](./images/oci-signin.png " ")

4. Based on the Multi-factor authentication setup for your account, provide authentication to sign into the account. For example, click **Allow** on the app or enter your **authentication code** and click **Verify** based on the authentication setup. For more details, refer the [Managing Multifactor Authentication documentation](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/usingmfa.htm)

    ![Click Allow in the app](./images/sso-multi-factor-authentication.png " ")

    ![Enter authentication code and click Verify](./images/sso2-multi-factor-authentication.png " ")

5. After verification, you will be signed in to Oracle Cloud!

    ![OCI Console Home Page](https://oracle-livelabs.github.io/common/images/console/home-page.png " ")

You may now **proceed to the next lab**.

## Acknowledgements
- **Created By/Date** - Kay Malcolm, Database Product Management, March 2020
- **Contributors** - John Peach, Kamryn Vinson, Rene Fontcha, Madhusudhan Rao, Arabella Yao
- **Last Updated By** - Ramona Magadan, February 2025