# Introduction

## About Java Management Service

Java Management Service (JMS) is a reporting and management infrastructure integrated with Oracle Cloud Infrastructure Platform services to observe and manage your use of Java SE (on-premises or in the Cloud).

Watch the video below for an introduction to Java Management Service and a brief demo.

[video of introduction to Java Management Service](youtube:YCgJxqvglCI)


As the stewards of Java, Oracle uniquely leverages its expertise to help enterprises gain critical insights into Java application behavior, compliance, and performance through JMS and equips you to:

* Use insights from JMS to optimize your workloads across your enterprise (desktop, server, cloud); and
* Protect your Java SE investments by identifying outdated Java installations, unauthorized applications, and Java runtime and application mismatches. For example, your application is using JDK 11, but you learn it's also using JDK 14, which is no longer supported.


## About this Workshop

 This workshop will walk you through the process of setting up and using Java Management Service (JMS) on Oracle Cloud Infrastructure (OCI). It will first walk you through how to set up the environment and create the necessary OCI resources such as Tagging, User Groups, Dynamic Groups and Policies in order to start using JMS. It will then guide you through the process of creating a fleet, which is the primary collection that you work with when using JMS. A fleet consists of Managed Instances that share a common management approach. You will then go through the process of creating a simple Java Application in an OCI compute instance or Windows OS. Next, you will learn how to set up the Management Agent on your host machine (also known as a Managed Instance in JMS) to monitor your Java application and view it inside a fleet in JMS. Later, you will learn how to install and configure Management Gateway on an on-premises host and have another on-premises host proxy through it to communicate with OCI network and JMS. Finally, you will see a simple example of setting up a Java Application in a Docker container and monitoring it using JMS.

*Estimated Time:* 180 minutes

### Objectives

* Understand concepts related to Oracle Cloud Infrastructure resources and services in JMS
* Set Up Oracle Cloud Infrastructure for JMS
* Set up a Fleet
* Deploy Java application and view usage in JMS
* Understand vital concepts related to Management Agent installation
* Install Management Agent on Managed Instances
* Set up multiple Managed Instances and Management Gateway
* Track Java Usage in a Container


### Prerequisites

* This workshop requires an Oracle Cloud account. You may use your **own cloud account** or you can get a **Free Trial** account as described in *Get Started*.
* A host(desktop/laptop/server/virtual machine) with Linux/Windows Operating System

## Extension Workshops

After the completion of this workshop, you may proceed to explore further workshops that demonstrate the advanced features that JMS has to offer with [Using Java Management Service Advanced Features](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202).

If you would like to learn more about using JMS together with other OCI services, you may explore [Integrate OCI Services with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3203).


## Learn More

* [Getting Started with Java Management Service](https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html)
* [Announcing Java Management Service](https://blogs.oracle.com/java/post/announcing-java-management-service)


## Acknowledgements

* **Author** - Alvin Lam, Java Management Service
* **Last Updated By/Date** - Ivan Eng, June 2023
