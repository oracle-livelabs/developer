# Install Management Agent on OCI computes - Oracle Cloud Agent (OCA)

## Introduction

This lab walks you through the steps to set up a management agent on your OCI compute instance host using the Oracle Cloud Agent to allow Java usage tracking by the Java Management Service (JMS).

Estimated Time: 15 minutes

### Objectives

In this lab, you will:

* Enable Management Agents on Compute Instances
* Deploy the JMS service plug-in on Management Agents
* Associate the management agent with your fleet
* Configure Java Usage Tracker
* Monitor the Java runtime(s) and Java application(s) in JMS

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image on your host machine or compute instance for this workshop.
* Access to the cloud environment and resources configured in [Lab 2](?lab=setup-a-fleet).

## Task 1: Enable Management Agent Plugin on Compute Instances

1. In the Oracle Cloud Console, open the navigation menu, click **Compute**, and then click **Instances**. Select the instance that you are interested in. This instance should be in the compartment created in [Lab 1](?lab=set-up-oci-for-jms).

  ![image of console navigation to compute instances](/../images/console-navigation-instance.png)

2. Click the **Oracle Cloud Agent** (OCA) tab. The list of OCA plugins is displayed. Toggle the Enabled switch for the Management Agent plugin.

  ![image of enable management agent plugin](/../images/enable-management-agent-plugin.png)

3. The status of the Management Agent plugin may be set to **Stopped** initially. It may take 5-10 minutes before the status is changed to **Running**.
Do not disturb the setup in this time and only proceed after the status of the Management Agent plugin is set to **Running**.
  ![image of management agent plugin with running status](/../images/management-agent-plugin-running.png)

5. We will need to verify that our agent is enabled successfully. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and under **Management Agent**, click **Agents**.

  ![image of console navigation to access management agent overview](/../images/management-agent-overview.png)

6. Ensure that your agent is in the list of agents. The name of the Agent should be of the form of  `Agent(<YOUR-INSTANCE-NAME>)`. This Agent should also be in the compartment created in [Lab 1](?lab=set-up-oci-for-jms).

  ![image of agent in agent overview list](/../images/agent-overview-list.png)


## Task 2: Deploy Java Management Service plugin
1. In your agent, click **Deploy plug-ins**.
  ![image of agent with deploy plug-ins button](/../images/agent-deploy-plugins.png)

2. Check the **Java Usage Tracking** box and click **Update**. This will deploy the Java Usage Tracking service plugin.
  ![image of checking java usage tracking box](/../images/agent-check-java-usage-tracking.png)

  You may observe that the Java Management Service service plugin, which is reponsible for enabling advanced Lifecycle Management (LCM) operations, is not deployed here.
  ![image of unchecked java management service service plugin box](/../images/agent-unchecked-java-management-service.png)


  It is important to note that it is not necessary to deploy the JMS service plugin here as users who are interested in enabling LCM operations using OCA can do so using the Oracle Java Management Service plugin in OCA:
  ![image of oracle java management service oca plugin on oca](/../images/oracle-java-management-service-oca-plugin.png)


  If you would like to learn more about Lifecycle Management, you may refer to the set up instructions for OCI hosts at the [Java Lifecycle Management with Java Management Service](../../java-management-lifecycle-management/workshops/freetier/index.html?lab=set-up-and-enable-lcm-on-jms) workshop.


## Task 3: Associate the management agent with your fleet

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management service](/../images/console-navigation-jms.png)

2. Select the fleet you would like to associate your agent with.

3. Take note of the fleet ocid for your fleet.

  ![image of fleet ocid](/../images/check-fleet-ocid.png)

4. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and under **Management Agent**, click **Agents**.

    ![image of console navigation to access management agent overview](/../images/management-agent-overview.png)

5. Select the agent that you have just enabled in Task 1.

6. Click the **Add Tags** button. Alternatively, you can click the **Tags** tab, followed by **Add Tags**.

  ![image of tag tab](/../images/agent-tags.png)

7. Add a `jms` tag to the management agent with the following details and click **Add Tags** once done:
    * **Tag namespace**: jms
    * **Tag key**: fleet_ocid
    * **Tag value**: the OCID of your fleet

  ![image of add tag to agent](/../images/add-agent-tag.png)

## Task 4: Configure Java Usage Tracker
1. Configure Java Usage Tracker by executing the following JMS service plug-in setup scripts:
    ```
    <copy>
    VERSION=$(sudo ls /var/lib/oracle-cloud-agent/plugins/oci-managementagent/polaris/agent_inst/config/destinations/OCI/services/jms/)
    </copy>
    ```
    ```
    <copy>
    sudo bash /var/lib/oracle-cloud-agent/plugins/oci-managementagent/polaris/agent_inst/config/destinations/OCI/services/jms/"${VERSION}"/scripts/setup.sh
    </copy>
    ```

2. This script creates the file `/etc/oracle/java/usagetracker.properties` with appropriate permissions. By default, the file contains the following lines:
    ```
    com.oracle.usagetracker.logToFile = /var/log/java/usagetracker.log
    com.oracle.usagetracker.additionalProperties = java.runtime.name
    ```

## Task 5: Verify detection of Java applications and runtimes
For the logging of applications to be visible, Java applications must be run again after the installation of the Management Agent. Now that the Management Agent has been set up in your compute instance, it will be able to detect new Java applications that have been executed. This can be observed in the Oracle Cloud Console.

We shall demonstrate the detection of the Java compiler and HelloWorld application created in [Lab 3](?lab=deploy-a-java-application).
1. First, compile the HelloWorld.java file:

    ```
    <copy>
    javac HelloWorld.java
    </copy>
    ```

    Then execute the HelloWorld application:

    ```
    <copy>
    java HelloWorld
    </copy>
    ```

2. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management](/../images/console-navigation-jms.png)

3. Select the compartment that the fleet is in and click the fleet.

4. Click **Java Runtimes** under **Resources**. If tagging and installation of management agents is successful, Java Runtimes will be indicated on the Fleet Main Page after 5 minutes.

  You should see only one Java Runtime. This corresponds to the Java 8 installation from [Lab 3](?lab=deploy-a-java-application).

  ![image of successful installation](/../images/successful-installation.png)

12. Click **Applications** under **Resources**. You should now see two applications. The first is from the javac compiler command and the second is from the HelloWorld application.

  ![image of applications after successful installation](/../images/successful-installation-applications.png)

  You may now **proceed to the next lab.**

## Learn More
* Refer to the [Management Agent Concepts](https://docs.oracle.com/en-us/iaas/management-agents/doc/you-begin.html) and
[Configuring a Management Agent on an OCI Compute Instance](https://docs.oracle.com/en-us/iaas/jms/doc/agent-management.html) sections of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or if the problem you are facing is not listed, please refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section or you may open a support service request using the **Help** menu in the Oracle Cloud Console.

## Acknowledgements

* **Author** - Xin Yi Tay, Java Management Service
* **Last Updated By** - Xin Yi Tay, April 2022
