# Introduction

## Automating the software lifecycle with OCI devops and OCI functions.

You will learn how to build your infrastructure and automate the build and deployment of a Cloud Native Python  application to Oracle functions  using Oracle Cloud Infrastructure (OCI) DevOps. 

Estimated time: 30 minutes


## Cloud Native Applications Overview

Here is the definition of Cloud Native Applications accordingly to [Cloud Native Computing Foundation (CNCF)](https://github.com/cncf/foundation/blob/master/charter.md):

"Cloud native technologies empower organizations to build and run scalable applications in modern, dynamic environments such as public, private, and hybrid clouds. Containers, service meshes, microservices, immutable infrastructure, and declarative APIs exemplify this approach.

These techniques enable loosely coupled systems that are resilient, manageable, and observable. Combined with robust automation, they allow engineers to make high-impact changes frequently and predictably with minimal toil."


## Oracle DevOps

Oracle Cloud Infrastructure DevOps service provides an end-to-end CI/CD platform for developers. OCI Devops services broadly  covers all the essential needs for a software lifecycle .Such as 

- OCI Deployment pipelines  – automate releases with declarative Pipeline release strategies to OCI Platforms like VM and Baremetals,Oracle Container Engine for Kubernetes (OKE) and OCI Functions
- OCI Artifact repositories – A place to store versioned artifact,including immutable ones.
- OCI Code repositories – OCI provided scalable code repository service.
- OCI Build pipelines – A serverless, scalable service to automate build ,test ,artifacts and deployment invokations.


![](images/oci-devops.png)


## Role Play Scenario

In this LiveLab, you will build and deploy python application by using OCI DevOps and OCI Function services.

The application source code is hosted on a DevOps code repository. The end user commits the code into the code repository. A new commit to the code repository will trigger the start of a build pipeline. The build pipeline follows a user-defined flow to build the function artifacts to deploy to OCI Function services. The output of the build is stored in the container registry as Docker images. The deployment pipeline then uses the built image from the container registry to deploy to the OCI Functions environment. The following architecture diagram shows how an application is built and deployed by using a default image and a custom image (by using a Dockerfile).

To simplify the setup of this example CI/CD workflow, this sample application uses Terraform to automate creation and configuration of DevOps resources.

The following diagram illustrates this reference architecture.


![](images/roleplay-reference.png)


### Objectives

In this lab, you will:

* Provisioning Infrastructure using IaC and OCI Resource Manager.
* Build and deploy a sample python application to OCI Functions.
* This will also cover deployment using default and custome function docker images.

### Prerequisites

1. An Oracle Free Tier(Trial), Paid or LiveLabs Cloud Account
1. [Familiarity with OCI console](https://docs.us-phoenix-1.oraclecloud.com/Content/GSG/Concepts/console.htm)
1. [Overview of Networking](https://docs.us-phoenix-1.oraclecloud.com/Content/Network/Concepts/overview.htm)
1. [Familiarity with Compartments](https://docs.us-phoenix-1.oraclecloud.com/Content/GSG/Concepts/concepts.htm)
1. [OCI Function service.](https://docs.oracle.com/en-us/iaas/Content/Functions/home.htm)

You may now **proceed to the next lab**.


## Learn More

* [Cloud Native on OCI using MuShop sample](https://oracle-quickstart.github.io/oci-cloudnative/)
* [Reference Architecture: Build a CI/CD pipeline by using Oracle Cloud Infrastructure DevOps service and OCI Functions](https://docs.oracle.com/en/solutions/build-cicd-pipelines-devops-function/index.html#GUID-C4F10A64-2EC5-44C8-BFC9-BF20A387EE70)


## Acknowledgements

* **Author** - Rahul M R
* **Contributors** -  
* **Last Updated By/Date** - Rahul M R - Feb 2022
