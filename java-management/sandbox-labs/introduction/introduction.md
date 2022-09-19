# Introduction

## About Java Management Service

Java Management Service (JMS) is a reporting and management infrastructure integrated with Oracle Cloud Infrastructure (OCI) Platform services to observe and manage your use of Java SE (on-premises or in the Cloud). Lifecycle Management (LCM) is a part of JMS's reporting and management infrastructure. JMS enables users to observe and manage the lifecycles of their Java SE Runtimes (on-premises or in the Cloud) by performing LCM operations such as Installing and Removing Java Runtimes.

Watch the video below for an introduction to Java Management Service and a brief demo.

[video of introduction to Java Management Service](youtube:YCgJxqvglCI)



As a customer, you can:

* Use insights from JMS to optimize your workloads across your enterprise (desktop, server, cloud).
* Protect your Java SE investments by identifying outdated Java installations and unauthorized applications.
* View and identify Java Runtimes.
* Install and remove Java Runtimes.
* View and understand various status and logs related to LCM work requests.

JMS helps systems administrators to answer questions such as:

<<<<<<< HEAD
* Which versions of Java are running in my development and production environment?
* Which vendors are providing the Java installations in my environment?
* Are my applications using their intended Java installations?
* Are there any unauthorized applications running?
=======
* What are all the versions of Java I have running in development and production?
* Which vendors are providing the Java installations in my environment?
* Are my applications using their intended Java installations?
* Are unauthorized applications running?
>>>>>>> upstream/main
* How many outdated Java installations do I have?

As the stewards of Java, Oracle can provide answers to these questions. Oracle uniquely leverages its expertise to gain critical insights into Java application behavior, compliance, and performance.

## About this Workshop

<<<<<<< HEAD
 This workshop will walk you through the process of setting up and using Java Management Service (JMS) on Oracle Cloud Infrastructure (OCI). The first step is to create a fleet, which is the primary collection that you work with when using JMS. A fleet consists of Managed Instances that share a common management approach. You will then learn the process of setting up the Management Agent (also known as Managed Instance in JMS) on a host machine to monitor and view Java applications inside a fleet. Next, you will learn how to install and remove a Java Runtime using OCI console. You will also get to view the status and logs of the work requests. Finally, in the workshop, you will learn how to view and monitor Lifecycle Management requests.

 In this workshop, we have created an Oracle Linux compute instance with preloaded Java Runtimes and running Java applications. To view this compute instance, in the navigation menu, click **Compute**, and then click **Instances**.

![image of console navigation to compute instances](images/console-navigation-instance-short.png)

 In the following labs, we will setup JMS and install management agent on this compute instance to monitor and manage the Java Runtimes and Java applications.
=======
 This workshop will walk you through the process of setting up and using Java Management Service (JMS) on Oracle Cloud Infrastructure (OCI). It will first walk you through the process of creating a fleet, which is the primary collection with which you interact when using JMS and contains Managed Instances that share a common management approach. It will then guide you through the process of setting up the Management Agent on a host machine (also known as a Managed Instance in JMS) to monitor Java applications and view them inside a fleet in JMS. Next, you will learn how to install and remove a Java Runtime using OCI console. You will also get to view status and logs of the work requests. Finally, the workshop will show you how to view and monitor Lifecycle Management requests.

 In this workshop, we have created an Oracle Linux compute instance with preloaded Java Runtimes and running Java applications. You can view this compute instance by going to the navigation menu, click **Compute**, and then click **Instances**.

![image of console navigation to compute instances](images/console-navigation-instance-short.png)

 You will then setup JMS and install management agent on this compute instance in the following labs to observe and manage the Java Runtimes and Java applications.
>>>>>>> upstream/main

*Estimated Time:* 60 minutes

### Objectives

* Set up a Fleet
* Install Management Agent on Managed Instances
* Understand and perform LCM operations with JMS

### Prerequisites

* This workshop requires an Oracle Cloud account. You may use your existing account or create one in the following lab.

## Extension Workshops

<<<<<<< HEAD
To try JMS on your own tenancy, see:
=======
If you would like to try JMS on your own tenancy, you may explore:
>>>>>>> upstream/main

* [Manage Java Runtimes, Applications and Managed Instances Inventory with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=912)
* [Perform Java Lifecycle Management with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202)
* [Integrate OCI Services with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3203)


## Learn More

* [Getting Started with Java Management Service](https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html)
* [Java Runtime Lifecycle Management](https://docs.oracle.com/en-us/iaas/jms/doc/java-runtime-lifecycle-management.html)
* [Announcing Java Management Service](https://blogs.oracle.com/java/post/announcing-java-management-service)


## Acknowledgements

* **Author** - Yixin Wei, Java Management Service
<<<<<<< HEAD
* **Last Updated By/Date** - Yixin Wei, September 2022
=======
* **Last Updated By/Date** - Yixin Wei, August 2022
>>>>>>> upstream/main
