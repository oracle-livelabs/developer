# Introduction

## About Java Management Service

Java Management Service (JMS) is a reporting and management infrastructure integrated with Oracle Cloud Infrastructure Platform services to observe and manage your use of Java SE (on-premises or in the Cloud).

Watch the video below for an introduction to Java Management Service and a brief demo.

[video of introduction to Java Management Service](youtube:YCgJxqvglCI)



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

 This workshop will walk you through the process of setting up and using Java Management Service (JMS) on Oracle Cloud Infrastructure (OCI). It will first walk you through how to set up the environment and create the necessary OCI resources such as Tagging, User Groups, Dynamic Groups and Policies in order to start using JMS. It will then guide you through the process of creating a fleet,  which is the primary collection with which you interact when using JMS and contains Managed Instances that share a common management approach, followed by the process of deploying a simple Java Application in an OCI compute instance and Windows OS. Next, you will learn how to set up the Management Agent on your host machine to monitor your Java application and view it inside a fleet in JMS. Later, you will see a simple example of setting up a Java Application in a Docker container and monitoring it using JMS. Finally, the workshop will show how to setup Logrotate on Linux OS.

*Estimated Time:* 100 minutes

### Objectives

* Setting Up Oracle Cloud Infrastructure for JMS
* Creating a Fleet and installing Management Agent on your host
* Deploy Java application and view usage in JMS
* Understand vital concepts related to Management Agent installation
* Installing Management Agent on non-OCI hosts
* Installing Management Agent on OCI computes using Oracle Cloud Agent (OCA)
* Track Java Usage in a Container
* Setup logrotate on Linux

### Prerequisites

* This workshop requires an Oracle Cloud account. You may use your existing account or create one in the following lab.
* A host(desktop/laptop/server/virtual machine) with Linux/Windows Operating System

## Extension Workshops
After the completion of this workshop, you may proceed to explore further workshops that demonstrate the advanced features that JMS has to offer with [Perform Java Lifecycle Management with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202).

If you would like to learn more about using JMS together with other OCI services, you may explore [Integrate OCI Services with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3203).


## Learn More

* [Getting Started with Java Management Service](https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html)
* [Announcing Java Management Service](https://blogs.oracle.com/java/post/announcing-java-management-service)


## Acknowledgements

* **Author** - Alvin Lam, Java Management Service
* **Last Updated By/Date** - Xin Yi Tay, March 2022
