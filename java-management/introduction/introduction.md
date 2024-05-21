# Introduction

## About Java Management Service

Java Management Service (JMS) is a reporting and management infrastructure integrated with Oracle Cloud Infrastructure Platform services to observe and manage your use of Java SE (on-premises or in the Cloud).

Watch the video below for an introduction to Java Management Service and a brief demo.

[video of introduction to Java Management Service](youtube:YCgJxqvglCI)


As the stewards of Java, Oracle uniquely leverages its expertise to help enterprises gain critical insights into Java application behavior, compliance, and performance through JMS and equips you to:

* Use insights from JMS to optimize your workloads across your enterprise (desktop, server, cloud); and
* Protect your Java SE investments by identifying outdated Java installations, unauthorized applications, and Java runtime and application mismatches. For example, your application is using JDK 11, but you learn it's also using JDK 14, which is no longer supported.


## About this Workshop

This workshop is designed to guide you through the setup and utilization of Java Management Service (JMS) on Oracle Cloud Infrastructure (OCI). Initially, it covers the setup process, including creating essential OCI resources like Tagging, User Groups, Dynamic Groups, and Policies needed to initiate JMS functionality. Subsequently, it provides a step-by-step guide on creating a fleet, which serves as the primary collection for JMS operations and encompasses Managed Instances with a unified management approach. Following this, it walks you through creating a simple Java Application on an OCI compute instance or Windows OS. You'll then learn how to configure the Management Agent on your local machine (referred to as a Managed Instance in JMS) to monitor your Java application and view it within a fleet in JMS. Later, the workshop will cover the installation and configuration of the Management Gateway on an on-premises host, enabling another on-premises host to proxy through it for communication with the OCI network and JMS. Furthermore, it introduces the setup of a Java Application in a Docker container for monitoring using JMS. Finally, it will offer guidance on downloading Java artifacts via JMS and utilizing script-friendly URLs for monitoring Java downloads.

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
* Download Java Artifacts and monitor Java downloads


### Prerequisites

* This workshop requires an Oracle Cloud account. You may use your **own cloud account** or you can get a **Free Trial** account as described in *Get Started*.
* A host (desktop/laptop/server/virtual machine) with Linux/Windows Operating System
* A host machine running macOS can also be used but it is not recommended as not all of the advanced features in JMS are supported.

## Extension Workshops

After the completion of this workshop, you may proceed to explore further workshops that demonstrate the advanced features that JMS has to offer with [Use Java Management Service Advanced Features](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202).

If you would like to learn more about using JMS together with other OCI services, you may explore [Integrate OCI Services with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3203).


## Learn More

* [Java Management](https://docs.oracle.com/en-us/iaas/jms/index.html)
* [Announcing Java Management Service](https://blogs.oracle.com/java/post/announcing-java-management-service)
* [Oracle University](https://mylearn.oracle.com/ou/home)


## Acknowledgements

* **Author** - Alvin Lam, Java Management Service
* **Last Updated By/Date** - Chan Wei Quan, October 2023
