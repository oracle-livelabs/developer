# Application architecture

## Introduction

This section gives you a background of the logical and physical architecture behind the Seer Equities Loan Management Application

Estimated Time: 5 minutes

### Objectives

* Review the loan approval application physical architecture​
* Review the loan approval application logical architecture

## Task 1: Review Physical Architecture

The SeerEquities loan application is deployed in an Oracle Cloud Infrastructure (OCI) Region, with its application layer in a Public Subnet within a VCN. The Application Tier VCN includes an Internet Gateway for outbound access and a Service Gateway for connectivity to Oracle Cloud Services.

A Virtual Machine (VM) in the Public Subnet runs two Docker containers:

1. Streamlit for the Loan Approval Demo.

2. Jupyter Notebook for developers to explore Oracle 23ai Database features & OCI services.

The Application Subnet connects to the Oracle Services Network via the Service Gateway, allowing access to Autonomous Database Serverless, OCI Generative AI Services, OCI Object Storage, and other Oracle Cloud Services.

![Login](./images/physical.png " ")

## Task 2: Review Logical Architecture

![Login](./images/logical.png " ")


## Acknowledgements
* **Authors** - Linda Foinding, Francis Regalado
* **Contributors** - Kamryn Vinson, Eddie Ambler, Kevin Lazarz
* **Last Updated By/Date** - Linda Foinding, April 2025