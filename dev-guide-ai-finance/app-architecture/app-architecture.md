# Application architecture

## Introduction

This section gives you a background of the logical and physical architecture behind the Seer Equities Loan Management Application

Estimated Time: 5 minutes

### Objectives

* Review the loan approval application physical architecture​
* Review the loan approval application logical architecture

## Task 1: Review Physical Architecture

The SeerEquities loan application is deployed in an Oracle Cloud Infrastructure (OCI) Region, with its application layer in a Public Subnet within a Virtual Cloud Network (VCN). The Application Tier VCN includes an Internet Gateway for outbound access and a Service Gateway for connectivity to Oracle Cloud Services.

A Virtual Machine (VM) in the Public Subnet runs two Docker containers:

1. Streamlit for the Loan Approval Demo.

2. Jupyter Notebook for developers to explore Oracle 23ai Database features & OCI services.

The Application Subnet connects to the Oracle Services Network via the Service Gateway, allowing access to Autonomous Database Serverless, OCI Generative AI Services, OCI Object Storage, and other Oracle Cloud Services. This architecture ensures seamless, scalable, and secure operation of the application with high availability and access to Oracle’s cloud-native features.

![Login](./images/physical.png " ")

* **Public Subnet**: A Public Subnet is a segment of a Virtual Cloud Network (VCN) in Oracle Cloud Infrastructure (OCI) where resources, like virtual machines (VMs), are placed and can directly communicate with the internet. Resources in a public subnet are assigned public IP addresses, allowing them to be accessible from outside the VCN.

* **Virtual Cloud Network (VCN**): A VCN is a private network in Oracle Cloud that you create to host your cloud resources. It acts as the backbone of your infrastructure, providing isolation and control over the flow of traffic between resources, both within OCI and to the outside world.

* **Internet Gateway**: The Internet Gateway is a component of a VCN that provides a path for outbound and inbound traffic between the VCN and the internet. In your setup, the Internet Gateway allows the application layer to have outbound access to the internet.

* **Service Gateway**: A Service Gateway enables private connectivity between your VCN and Oracle Cloud Services like Autonomous Database, Oracle AI services, and Object Storage, without going through the public internet. This ensures secure, fast, and reliable communication between the VCN and Oracle’s cloud-native services.

* **Virtual Machine (VM)**: A Virtual Machine is an emulation of a physical computer within Oracle Cloud. It runs an operating system and applications, just like a physical server. In your setup, the VM runs two Docker containers that host specific applications—Streamlit and Jupyter Notebook.

* **Autonomous Database Serverless**: Autonomous Database Serverless is a fully managed, scalable, and self-driving database service provided by Oracle. It automatically handles performance tuning, patching, and scaling. This service is typically used for applications that need robust, scalable, and self-managed database capabilities without manual intervention.

* **OCI Generative AI Services**: OCI Generative AI Services provide cloud-based tools and services powered by artificial intelligence models to generate new content, such as images, text, or insights. These services are integrated with other OCI resources to enable smart applications, like generating loan approvals or analyzing data.

* **OCI Object Storage**: OCI Object Storage is a service that allows you to store large amounts of unstructured data, such as images, videos, backups, or application logs. It is scalable, durable, and accessible from anywhere, and is often used to store files that need to be accessed by applications and services within OCI.

## Task 2: Review Logical Architecture

![Login](./images/logical.png " ")


## Acknowledgements
* **Authors** - Linda Foinding, Francis Regalado
* **Contributors** - Kamryn Vinson, Eddie Ambler, Kevin Lazarz
* **Last Updated By/Date** - Linda Foinding, April 2025