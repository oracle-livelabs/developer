# Monitoring Java applications in your Kubernetes cluster 

## Introduction

This guide will walk you through setting up and using Oracle Java Management Service (JMS) to monitor and manage Java applications running in Kubernetes clusters. JMS Kubernetes support extends your existing fleet management capabilities to containerized environments.

**Estimated Time:** 35 minutes

### Objectives

In this guide, you will:

* Set up JMS monitoring for Kubernetes clusters
* Monitor Java applications running in containers
* Manage your Kubernetes-based Java workloads through JMS

### Prerequisites

* Oracle Cloud Infrastructure account with appropriate permissions
* Access to a Kubernetes cluster 
* Java applications running in containers with JDK 
* Basic familiarity with Kubernetes concepts

## Task 1: Install the Kubernetes Agent

1. Open the navigation menu, navigate to **Observability & Management**. Under **Java Management**, click **Fleets**. Select the fleet that you have configured in [Lab 3](?lab=setup-a-fleet)

  ![Console navigation to Java Management Service](images/console-navigation-jms.png)

2. In your fleet details page, click **Download Agent Installer**.

   ![Download Agent Installer](images/download-agent-installer.png)

3. Select **Kubernetes Agent Installation**, and follow the steps provided in the panel.

   ![Kubernetes Agent Installation](images/kubernetes-agent-installation.png)

4. Under **Managed Instances**,once the installation is successfully completed, an entry for the newly added agent should appear.

   ![Kubernetes Agent Installation Verification](images/kubernetes-agent-installation-verification.png)

5. On the Managed instance details page, you can view cluster information, including the **type**, **container count** and **pod count**. The container count includes both Active Java and non-Java containers.

    > **Note:** Currently JMS has ability to detect Oracle Kubernetes Engine cluster(OKE). All other managed and unmanaged clusters will be listed as "Other".

   ![Cluster Information](images/cluster-information.png)

6. Under **Active Java Containers**, you can see a list of all running Java containers. This list will be refreshed if any change is detected in the Kubernetes cluster.

   ![Active Java Container List](images/active-java-container-list.png)

## Task 2: Verify Management Agent installation

1. In your agent, click **Deploy plug-ins**.

   ![image of agent detail page](images/agent-details-page.png)

2. The **Java Management Service For Kubernetes** plug-in should be checked.

  ![image of plug-in detail page](images/verify-kubernetes-plugin.png)

## Task 3: Verify the successful association of Managed Instance to your fleet

1. Navigate to the fleet that you have created in [Lab 3](?lab=setup-a-fleet), and click on the inventory log object.

   ![image of fleet with inventory log](images/fleet-navigate-inventorylog.png)

2. Inside the Fleet Inventory log page under the Explore Log section, you should see a new log entry **jms.agent.plugin.start.log** which has been emitted from your newly associated Managed Instance to your Fleet Inventory log.

   ![image of agent plugin start log](images/agent-start-log.png)

## Task 4: Verify detection of Java applications and runtimes

Before proceeding, make sure that the Java applications you want to verify are actually running inside containers in your Kubernetes cluster.

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

   ![image of console navigation to java management](images/console-navigation-jms.png)

2. Select the compartment containing the fleet, click on the fleet, and then select the managed instance under the fleet where the agent is deployed.

3. Click **Java Runtime Installations** in the navigation. You should now see Java runtimes belonging to your Managed Instances showing up in the Java runtimes table.

   ![image of runtimes after successful installation on oci host](images/runtimes-oci.png)

4. Click **Applications** in the navigation. You should see the application running inside your containres.

  ![image of applications after successful installation](images/successful-installation-applications-views.png)

5. Click on the application to view its details. Click on **Application installations** to see the paths where the  application is installed, which will be displayed under **Application installation path**.

  ![image of application installation path](images/application-installation-path.png)

## Learn More

* [JMS Advanced Features Documentation](https://docs.oracle.com/en-us/iaas/jms/doc/advanced-features.html)
* [Kubernetes Monitoring Best Practices](https://docs.oracle.com/en-us/iaas/Content/ContEng/home.htm)
* [Java Flight Recorder Guide](https://docs.oracle.com/javacomponents/jmc-5-4/jfr-runtime-guide/)

## Acknowledgements

* **Author** - EL-MANANI Fatima, Java Management Service 
* **Last Updated By** - Fatima EL-MANANI, September 2025