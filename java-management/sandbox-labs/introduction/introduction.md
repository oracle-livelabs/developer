# Introduction

## About Java Management Service

Java Management Service (JMS) is a reporting and management infrastructure integrated with Oracle Cloud Infrastructure (OCI) Platform services to observe and manage your use of Java SE (on-premises or in the Cloud).

Additionally, JMS offers a series of advanced features which enables a deeper observation and management of the Java SE Runtime and applications, track the Java servers and libraries, performing the Java Flight Recorder and the cryptographic analysis on the Java applications.

Watch the video below for an introduction to Java Management Service and a brief demo.

[video of introduction to Java Management Service](youtube:YCgJxqvglCI)


As a customer, you can:

* Use insights from JMS to optimize your workloads across your enterprise (desktop, server, cloud).
* Protect your Java SE investments by identifying outdated Java installations and unauthorized applications.
* View and identify Java Runtimes.
* Install Java Runtimes and perform post java installation actions.
* Remove unwanted Java Runtimes.
* Track Java servers and libraries.
* Perform cryptographic analysis of Java applications.
* Perform Java Flight Recording on Java applications.

JMS helps systems administrators to answer questions such as:

* Which versions of Java are running in my development and production environment?
* Which vendors are providing the Java installations in my environment?
* Are my applications using their intended Java installations?
* Are there any unauthorized applications running?
* How many outdated Java installations do I have?
* Which Java Servers are running in my environment
* Which applications are running on the Java Servers
* Which libraries are being used on the applications in my environment
* Are there any crypto event that needs to be addressed

As the stewards of Java, Oracle can provide answers to these questions. Oracle uniquely leverages its expertise to gain critical insights into Java application behavior, compliance, and performance.

## About this Workshop

 This workshop will walk you through the process of setting up and using Java Management Service (JMS) on Oracle Cloud Infrastructure (OCI).
 
 The first step is to create a fleet, which is the primary collection that you work with when using JMS. A fleet consists of Managed Instances that share a common management approach. You will then learn the process of setting up the Management Agent (also known as Managed Instance in JMS) on a host machine to monitor and view Java applications inside a fleet. 
 
 Next, you will proceed to use the advanced features available in JMS, which consist of:
 - Using Advanced Usage Tracking to identify Java servers such as Weblogic that are running in your fleet and the applications that are deployed by these Java servers.
 - Using Advanced Usage Tracking to find the libraries in the running applications identify potential vulnerabilities associated with the Java libraries used by your application
 - Perform a cyrpto event analysis to access the impact of Oracle JRE and JDK Cryptographic roadmap on the applications running in your fleet. 
 - Running the Java Flight Recorder (JFR) on a Java application which is running on the fleet to collect diagnostic and profiling data on the application.
 - Using the Lifecycle Management (LCM) operation to remove a Java runtime
 - Using the Lifecycle Management (LCM) operation to install a Java runtime and run the post Java installation actions
 
Finally, you will learn how to view and monitor work requests, understand the logs and cancel unwanted request.

 In this workshop, we have created an Oracle Linux compute instance with preloaded Java Runtimes, running Java servers and different running Java applications. To view this compute instance, in the navigation menu, click **Compute**, and then click **Instances**.

![image of console navigation to compute instances](images/console-navigation-instance-short.png)

 In the following labs, we will setup JMS and install management agent on this compute instance to monitor and manage the Java Runtimes and Java applications.

*Estimated Time:* 170 minutes

### Objectives

* Set up a Fleet
* Install Management Agent on Managed Instances
* Scan for Java servers
* Scan for Java libraries
* Perform cryptographic analysis of Java applications
* Run a Java Flight Recorder (JFR) for a Java application
* Understand and perform LCM operations with JMS

### Prerequisites

* This workshop requires an Oracle Cloud account. You may use your existing account or create one in the following lab.

## Extension Workshops

To try JMS on your own tenancy, see:

* [Manage Java Runtimes, Applications and Managed Instances Inventory with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=912)
* [Using Java Management Service Advanced Features](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202)
* [Integrate OCI Services with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3203)


## Learn More

* [Getting Started with Java Management Service](https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html)
* [JMS Advanced Features](https://docs.oracle.com/en-us/iaas/jms/doc/java-runtime-lifecycle-management.html)
* [Announcing Java Management Service](https://blogs.oracle.com/java/post/announcing-java-management-service)


## Acknowledgements

* **Author** - Yixin Wei, Java Management Service
* **Last Updated By/Date** - Bao Jin Lee, January 2023
