# Introduction

## About Java Management Service

Java Management Service (JMS) is a reporting and management infrastructure integrated with Oracle Cloud Infrastructure Platform services to observe and manage your use of Java SE (on-premises or in the Cloud).

As a customer, you can:

* Use insights from JMS to optimize your workloads across your enterprise (desktop, server, cloud); and
* Protect your Java SE investments by identifying outdated Java installations and unauthorized applications.

JMS helps systems administrators to answer questions such as:

* What are all the versions of Java I have running in development and production?
* Which vendors are providing the Java installations in my environment?
* Are my applications using their intended Java installations?
* Are unauthorized applications running?
* How many outdated Java installations do I have?

As the stewards of Java, Oracle can provide answers to these questions. Oracle uniquely leverages its expertise to gain critical insights into Java application behavior, compliance, and performance.

## About this Workshop

 This workshop will walk you through the process of setting up and using Java Management Service (JMS) on Oracle Cloud Infrastructure (OCI). It will first walk you through how to set up the environment and create the necessary OCI resources such as Tagging, User Groups, Dynamic Groups and Policies in order to start using JMS. It will then guide you through the process of deploying a simple Java Application in an OCI compute instance, followed by creating a fleet, which is the primary collection with which you interact when using JMS and contains Managed Instances that share a common management approach. Next, you will learn how to set up the Management Agent on your host machine to monitor your Java application and view it inside a fleet in JMS. Later, you will learn how to get set up and access Java Management Service using REST APIs via OCI Command Line Interface (CLI) and Software Development Kit (SDK). Finally, the workshop will show you a simple example of setting up a Java Application in a Docker container and monitoring it using JMS.

*Estimated Time:* 100 minutes

### Objectives

* Setting Up Oracle Cloud Infrastructure for JMS
* Creating a Fleet and installing management agent on your host
* Deploy Java application and view usage in JMS
* Access and Utilise JMS SDKs
* Track Java Usage in a Container

### Prerequisites

* An Oracle Cloud Infrastructure account with valid credentials
* A host(desktop/laptop/server/virtual machine) with Linux/Windows Operating System

## Learn More

* [Getting Started with Java Management Service](https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html)
* [Announcing Java Management Service](https://blogs.oracle.com/java/post/announcing-java-management-service)

## Acknowledgements

* **Author** - Alvin Lam, Java Management Service
* **Last Updated By/Date** - Teck Kian Choo, November 2021
