# Deploy and Run as Microservices in Kubernetes Cluster

## Introduction

This lab will show you how to deploy the AI application created in this workshop to a Kubernetes cluster.

Estimated Time: 15 minutes.

### Objectives

* Build and push microservice containers to OCIR (OCI container registry).
* Create the deployments, services, and wallet for the application.
* Run the full stack microservices application.

### Prerequisites

- Completion of Setup lab
- Verification of application working in other labs (ie outside of Kubernetes)


## Task 1: Build and push microservice containers to OCIR

   1. Setup an OCIR repository as described at https://docs.oracle.com/en-us/iaas/Content/Registry/Concepts/registryoverview.htm and login to it from where you build your application.

   2. Export the value of the `DOCKER_REGISTRY` and run the `./build_and_push.sh` script in the workshop source repos to build and push all images to the repos.


## Task 2: Create the deployments, services, and wallet for the application

   1. Create an OKE cluster and insure connectivity with  `kubectl` as described at https://docs.oracle.com/en-us/iaas/Content/ContEng/Tasks/contengcreatingclusterusingoke.htm

   2. Run the `./deploy_to_k8s.sh` script in the workshop source code directory

   3. Run `kubectl get pods -n healthai` to verify deployments and run `kubectl get services -n healthai` to verify services and obtain address of frontend service.


## Task 3: Run the full stack microservices application

1. Run the application as done in the previous labs, but instead use the frontend service address.



You may now **proceed to the next lab.**..

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate, Oracle Database
* **Last Updated By/Date** - 2024