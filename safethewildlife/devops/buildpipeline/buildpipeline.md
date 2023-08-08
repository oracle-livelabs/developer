# Build Pipeline

## Introduction

OCI DevOps has Build pipelines where you can configure the steps to build the different components that compose your application.

Estimated Time: 20 minutes

### Objectives

In this lab, you are going to build the artifacts from the source code using OCI DevOps build pipeline. As part of the process, you are going to use stages to build and deliver the artifacts built. The outcome will be to have the container images with the application components on Oracle Cloud Image Registry.

### Prerequisites

- Oracle Cloud Account.
- Be an OCI administrator in your account (in Free Tier, you are an administrator by default).
- GitHub Account
- Finish the previous Lab.

## Task 1: Get familiar with OCI DevOps

1. Go to **Menu** > **Developer Services** > **DevOps**.
  
  ![DevOps Menu](images/devops-menu.png)

2. Click on **Projects**

    > NOTE: Make sure you select the compartment, or that the root compartment is selected.
  
  ![DevOps Project List](images/devops-project-list.png)

3. You will see our OCI DevOps Project, click on it.

  ![DevOps Project Click](images/devops-project-click.png)

4. You will find code repositories on the side menu and the main page. Code Repositories contain the mirrored GitHub Repository.

  ![DevOps Code Repositories Menu](images/devops-project-code-repositories.png)

    > NOTE: OCI DevOps can host your code without the need of GitHub or any other git service. This is the preferred and the easiest way, for security and integration.
    > <br>
    > <br>
    > In this workshop, we take the approach of GitHub so you can see a more complex scenario with a minutely synchronized mirroring between OCI DevOps Code Repository and Github.

1. Click on the mirrored repository to take a look at the code.

  ![DevOps Code Repositories Click](images/devops-project-code-repositories-click.png)

    > NOTE: Take into account that the initial code mirroring takes a few minutes. The system will tell you if the process is on-going.

6. Go back to the Main page of OCI DevOps Project, Click on the name of your DevOps Project on the breadcrumbs.

  ![Back to DevOps Project from Code Repository](images/devops-code-repository-back.png)

## Task 2: Run Build Pipeline

1. Scroll down until you see the **Latest Build pipelines** section. Click on the Build Pipeline you created with Terraform.

  ![Build click build pipeline](images/devops-build-click-buildpipeline.png)

2. Take a look, there are two stages: **Build Services** and **Deliver Artifacts**. The first stage will build the Node and Java Applications. The second stage will deliver the container images with the applications on Oracle Cloud Image Registry.

  ![Build Stages](images/build-stages.png)

3. Click **Start manual run**.

  ![Build Start manual Run](images/build-stages-start-manual-run.png)

4. This Build Pipeline has some Parameters, keep them in mind to customize your build pipeline in the future. For the moment, nothing to do here.

  ![Build params](images/build-params.png)

5. Click **Start manual run** to kick off the pipeline.

  ![Build Run button](images/build-run-button.png)

6. Wait until the build pipeline is finished. It might take up to 15 minutes.

  ![Build running](images/build-running.png)

7. You can minimize some of the other panels.

  ![Build Success minimize](images/build-success-minimize.png)

8. Finally, confirm the success and explore the console log.

  ![Build Success](images/build-success.png)

9.  When done, come back to the OCI DevOps Project.

  ![Build back to Project](images/build-back.png)

You may now [proceed to the next lab](#next).

## Acknowledgements

* **Author** - Victor Martin, Tech Product Strategy Director (EMEA)
* **Contributors** - Wojciech Pluta - DevRel, Eli Schilling - DevRel
* **Last Updated By/Date** - July 1st, 2023