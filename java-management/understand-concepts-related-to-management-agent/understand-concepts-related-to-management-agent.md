# Understand Concepts related to Management Agent installation

## Introduction

This lab walks you through the key concepts that need to be understood before installing a management agent on your compute instance host as part of the set up for Java Management Service (JMS) on Oracle Cloud Infrastructure (OCI).

If you are using **non-OCI hosts** such as on-premises hosts, or hosts from other cloud providers, the management agent can be installed using the management agent software only. Please refer to the segment related to installation using the **management agent software**.

If you are using **OCI Compute Instance hosts**, the management agent can be installed using either the management agent software or the Oracle Cloud Agent (OCA).
* If you have previously installed the Management Agent using the management agent software, the instructions for non-OCI hosts will also work on your Compute Instance host. Please refer to the segment related to installation using the **management agent software**.
* If you opt to install a new Management Agent using OCA, please refer to the segment related to installation using **OCA**.

Installation using management agent software:
- [Task 1: Understand Concepts related to Management Agent Installation on non-OCI hosts](?lab=understand-concepts-related-to-management-agent#task1understandconceptsrelatedtomanagementagentinstallationonnonocihosts)
- [Install Management Agent on non-OCI Hosts - Linux](?lab=set-up-of-management-agent-linux)
- [Install Management Agent on non-OCI Hosts - Windows](?lab=set-up-of-management-agent-windows)

Installation using OCA:
- [Task 2: Understand Concepts related to Management Agent Installation on OCI Compute Instance hosts](?lab=understand-concepts-related-to-management-agent#task2understandconceptsrelatedtomanagementagentinstallationonocicomputeinstancehosts)
- [Install Management Agent on OCI computes - Oracle Cloud Agent (OCA)](?lab=install-management-agent-oca)


Estimated Time: 15 minutes

### Objectives

In this lab, you will:

- Understand important concepts in preparation for installation of Management agents on non-OCI hosts that are either on-premises or from other cloud providers
- Understand important concepts in preparation for installation of Management agents on OCI Compute Instance hosts

### Prerequisites
- You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
- You are using an Oracle Linux image on your host machine or compute instance for this workshop.
- Access to the cloud environment and resources configured in [Lab 2](?lab=setup-a-fleet).

## Task 1: Understand Concepts related to Management Agent installation on non-OCI hosts

Before the set up of the Management Agent, it is important to understand the concepts behind the Java Management Service:

- **Java Management Service (JMS)**: A reporting and management infrastructure integrated with Oracle Cloud Infrastructure Platform services to observe and manage your use of Java SE (on-premises or in the Cloud) in your enterprise.

- **Management Agents**: Can be installed on a host to allow a service plug-in to collect data from the host where you installed the Management Agent. In the case of JMS, the management agent allows the JMS plug-in to collect data about Java Applications, Java Runtimes and Installations from the host which can be either on-premises or from other cloud providers. If you are using a **non-OCI compute instance**, we will need a **response file** to set up a Management Agent. This response file contains an **install key**.

* **Install Key**: A token required by the **Management Agent** installation. It authorises the Management Agent to communicate with the Oracle Cloud Infrastructure. You can use a single agent install key for multiple Management Agent installations.
  This key has been automatically created for you in [Lab 2](?lab=setup-a-fleet), where the "Create New Management Agent Configuration" box was checked during Fleet creation.

  ![image of create fleet options page](/../images/create-fleet.png)

* **Response File**: For Management Agent installation to take place, a response file is also required. In [Lab 2](?lab=setup-a-fleet), we clicked **Download Install Key** during the creation of our fleet. The file that we downloaded is the response file which contains the install key, as observed in the `ManagementAgentInstallKey` field. The line in our response file `Service.plugin.jms.download=true` will help to download and enable the JMS plugin for Java runtime discovery and reporting.

  The line `Service.plugin.jm.download=true` will also help to download and enable the JMS plugin for Java runtime Lifecycle Management. Lifecycle Management is an advanced feature of JMS, and you may refer to the [Perform Java Lifecycle Management with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202) workshop to learn more about it.

  ![image of response file](/../images/input-rsp-updated.png)

## Task 2: Understand Concepts related to Management Agent installation on OCI Compute Instance hosts

Before the set up of the Management Agent, it is important to understand the concepts behind the Java Management Service:

- **Java Management Service (JMS)**: A reporting and management infrastructure integrated with Oracle Cloud Infrastructure Platform services to observe and manage your use of Java SE (on-premises or in the Cloud). It enables you to observe and manage the use of Java in your enterprise.

- **Management Agents**: Can be installed on a host to allow a service plug-in to collect data from the host where you installed the Management Agent. In the case of JMS, the management agent allows the **Java Usage Tracking service plugin** to track your use of Java.

- **Oracle Cloud Agent (OCA)**: A lightweight process that manages **OCA plugins** running on compute instances. When you are using compute instances, you can deploy Management Agents by using the Oracle Cloud Agent.

  As part of the set up of JMS on an OCI compute instance, the Management Agent will be deployed through the **Management Agent plugin** in OCA.
  In addition, it is important to note that the **Oracle Java Management Service OCA plugin** is responsible for enabling Java runtime Lifecycle Management, which is an advanced feature of JMS. This workshop will focus on the basics of JMS, and thus focus on only the Management Agent OCA plugin. If you would like to learn more about the Lifecycle Management feature, you may refer to the [Perform Java Lifecycle Management with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202).
  ![image of oca with management agent plugin](/../images/oca-plugins.png)

- **Management Agent OCA plugin**: Helps to collect data from resources such as OSs, applications, and infrastructure resources for Oracle Cloud Infrastructure services that are integrated with Management Agent. Data can include observability, log, configuration, capacity, and health data.

- **Java Usage Tracking service plugin**: A Service Plugin allows Management Agents to interact with data sources and send the data back to the cloud service. In the case of the Java Usage Tracking service plugin, data about Java Applications, Java Runtimes and Installations is collected from the host which can be either on-premises or from other cloud providers. It is important to note that this is a service plugin that is deployed to interact with the Management Agent, and is different from OCA plugins.
  ![image of java usage tracking service plugin](/../images/java-usage-tracking-service-plugin.png)

  You may now **proceed to the next lab.**

## Learn More

* Refer to the [Management Agent Concepts](https://docs.oracle.com/en-us/iaas/management-agents/doc/you-begin.html),
  [Configuring a Management Agent on an OCI Compute Instance](https://docs.oracle.com/en-us/iaas/jms/doc/agent-management.html), [Installation of Management Agents](https://docs.oracle.com/en-us/iaas/management-agents/doc/install-management-agent-chapter.html) and
  [JMS Plugin for Management Agents](https://docs.oracle.com/en-us/iaas/jms/doc/installing-management-agent-java-management-service.html) sections of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or if the problem you are facing is not listed, please refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section or you may open a support service request using the **Help** menu in the Oracle Cloud Console.

## Acknowledgements

- **Author** - Xin Yi Tay, Java Management Service
- **Last Updated By** - Xin Yi Tay, April 2022
