# Set up and enable Lifecycle Management operations on Java Management Service

## Introduction

Before you can start using Lifecycle Management operations, you must ensure that your Oracle Cloud Infrastructure environment is set up correctly by following the workshop [Manage Java Runtimes, Applications and Managed Instances Inventory with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=912). These OCI Resources allow the communication between all the required components and cloud services.


Estimated Time: 30 minutes

### Objectives

In this lab, you will:

  *  Configure a fleet to enable LCM operations.
  *  Configure an OCI Managed Instance to enable LCM operations.
  *  Configure a non-OCI Managed Instance to enable LCM operations.

### Prerequisites

 * You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
 * You are using an Oracle Linux image or Windows OS on your Managed Instance for this workshop.
 * You have successfully completed the installation of the Management Agent on your OCI or non-OCI Managed Instances following steps in [Manage Java Runtimes, Applications and Managed Instances Inventory with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=912).
 * **Proceed to Task 2 or 3 if the management agent was installed manually (i.e. using the management agent software or enabled using the Management Agent plugin on your OCI compute instance's Oracle Cloud Agent) and not using the installation script.**

## Task 1: Configure a fleet to enable LCM operations

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**. Select the fleet that you are interested in.
  ![image of console navigation to access fleet](images/console-navigation-jms.png)

2. Click **Edit Properties**.

  ![image of edit fleet properties](images/fleet-edit-properties.png)

3. Ensure that the **Enable advanced features** box is checked.

  ![image of edit fleet properties detail](images/fleet-edit-properties-detail.png)

## Task 2: Configure an OCI Managed Instance to enable LCM operations

> **Note:** Please refer to this task if the **installation script was not used** to install the management agent. The management agent should have been enabled using the Management Agent plugin on your OCI compute instance's Oracle Cloud Agent (OCA).

After you have installed the Management Agent, follow the steps below to verify required plugins and enable LCM operations.

### **OCI Compute Instance Managed Instance**
If you are using an OCI compute instance and it already has the Management Agent installed using OCA and `Java Usage Tracking` plugin deployed, then follow the steps to enable Oracle Java Management plugin and Verify the OCA installation package version.

1. There are two ways to verify and enable `Oracle Java Management Service` plugin.

  **Using OCI Console:**
    * In the Oracle Cloud console, click **Instances** under **Compute**, and select the instance that you are interested in.

     ![image of navigate from OCI console menu to computer instances](images/navigate-to-computer-instance.png)

    * Click the **Oracle Cloud Agent** tab. The list of plugins is displayed. Verify that the **Oracle Java Management Service** OCA plugin is enabled. If it is disabled, toggle the switch for the Oracle Java Management Service plugin and ensure that the status is set to **Running**. This may take 5 to 10 minutes. This will enable the LCM operations for the chosen OCI Compute Instance.

      ![image of disabled oracle java management service oca plugin](images/oracle-jms-oca-plugin-disabled.png)

  **Using Cloud Shell:**
    * Alternatively, you can use Cloud Shell to verify and enable `Oracle Java Management Service` plugin. Click the Cloud Shell icon in the Console header. This icon is accessible from mostly all the OCI Console pages.

      ![image of location of Cloud Shell icon](images/oci-cloud-shell-navigate.png)

      The Cloud Shell will open and may look something like this.
      ![image of Cloud Shell terminal](images/oci-cloud-shell-console.png)

      You can use the icons in the upper right corner of the Cloud Shell window to minimize, maximize, and close your Cloud Shell session. 
      ![image of buttons on Cloud Shell](images/oci-cloud-shell-buttons.png)


    * In Cloud Shell add the following to get the Instance details. You can copy the Instance OCID from Instance detail page.
        ```
        <copy>
       oci compute instance get --instance-id <INSTANCE OCID>
        </copy>
        ```

        The response may look like this.

        ![image of entering a command in Cloud Shell](images/oci-cloud-shell-command.png)

    * JMS Agent plugin is controlled through this JSON tag.
        ```
        <copy>
        {
          "desired-state": "DISABLED",
          "name": "Oracle Java Management Service"
        }        </copy>
        ```

        If the `desired-state` is `DISABLED` then proceed to next step to change the state to `ENABLED`, else you can skip to Step 2.
     


     * Create a configuration json file and add the following json code in it.
        ```
        <copy>
        nano config.json  
        </copy>
        ```

        ```
        <copy>
        {
      "are-all-plugins-disabled": false,
      "is-management-disabled": false,
      "is-monitoring-disabled": false,
      "plugins-config": [
        {
          "desired-state": "DISABLED",
          "name": "Vulnerability Scanning"
        },
        {
          "desired-state": "ENABLED",
          "name": "OS Management Service Agent"
        },
        {
          "desired-state": "DISABLED",
          "name": "Custom Logs Monitoring"
        },
        {
          "desired-state": "ENABLED",
          "name": "Compute Instance Run Command"
        },
        {
          "desired-state": "ENABLED",
          "name": "Compute Instance Monitoring"
        },
        {
          "desired-state": "DISABLED",
          "name": "Block Volume Management"
        },
        {
          "desired-state": "DISABLED",
          "name": "Bastion"
        },
        {
          "desired-state": "ENABLED",
          "name": "Management Agent"
        },
        {
          "desired-state": "ENABLED",
          "name": "Oracle Java Management Service"
        }
      ]
}

        </copy>
        ```

        To save the file, press **CTRL+x**. Before exiting, nano will ask you if you wish to save the file: Type **y** to save and exit, type **n** to abandon your changes and exit.
      


     * Now, in Cloud Shell add the following to update the `Oracle Java Management Service` plugin state from `DISABLED` to `ENABLED`.

      ```
      <copy>
      oci compute instance update --instance-id <INSTANCE OCID> --agent-config file://config.json
      </copy>
      ```

      If you see the response like this, the `Oracle Java Management Service` plugin has been enabled. Else in case of any error, please refer to this link [Using CLI](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliusing.htm).

        ![image of entering a command in Cloud Shell](images/oci-cloud-shell-update-instance-command.png)


2. Next, in the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and under **Management Agent**, click **Agents**. Select the agent you are interested in.

  ![image of console navigation to access management agent overview](images/management-agent-overview.png)

  In your agent, click **Deploy plug-ins**.
  ![image of agent with deploy plug-ins button](images/agent-deploy-plugins.png)

  Ensure that the **Java Usage Tracking** box is checked.
  ![image of checking java usage tracking box](images/agent-check-java-usage-tracking.png)

  If you have verified that both the **Oracle Java Management Service OCA plugin** and **Java Usage Tracker service plugin** have been deployed, proceed to verify the OCA installation package version and update it.

3. Access OCI Computer Instance via SSH.

4. Check the version of the current OCA installation package.
    ```
    <copy>
    yum info oracle-cloud-agent
    </copy>
    ```
  If current version of the OCA installation package is the latest one, then no further steps are required. Else you should see output something like this:
    ![image of terminal showing how to check for available oca packages](images/oca-version-checking-console.png)

5. Update the OCA Installation Package.
    ```
    <copy>
    rpm -qa | grep oracle-cloud-agent

    sudo yum update oracle-cloud-agent -y
    </copy>
    ```

## Task 3: Configure a non-OCI Managed Instance to enable LCM operations

> **Note:** Please refer to this task if the **installation script was not used** to install the management agent. The management agent should have been installed using the management agent software.

### **Non-OCI Managed Instance**
If you are using a non-OCI Managed Instance and it has the Management Agent installed following the steps in the workshop [Manage Java Runtimes, Applications and Managed Instances Inventory with Java Management Service](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=912), then you just need to make a few changes to start using LCM features.


1. Open the `/etc/sudoers` file.
    ```
    <copy>
    sudo nano /etc/sudoers
    </copy>
    ```

  Add the following lines to the end of the file:
    ```
    <copy>
    #To change ownership of the Java Management Service plugin to root
    mgmt_agent ALL=(ALL) NOPASSWD:/opt/oracle/mgmt_agent/agent_inst/bin/chown_recursive_ep.sh
    #To run the Java Management Service plugin under root user
    mgmt_agent ALL=(root) NOPASSWD: ALL
    </copy>
    ```

2. To save the file, press **CTRL+x**. Before exiting, nano will ask you if you wish to save the file: Type **y** to save and exit, type **n** to abandon your changes and exit.

3. Login to OCI Console.

4. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Agents** under **Management Agent**.
  ![image of console navigation to access management agent overview](images/management-agent-overview.png)

5. From the Agents list, select for the agent that was recently installed.
   ![image of agents main page](images/agents-main-page.png)

6. In order to enable LCM operations `Java Management Service` Plug-in is required to be enabled. Take note of `Service Plug-ins` field. If `Java Management Service` plug-in missing then follow the next steps, else if `Java Management Service` and `Java Usage Tracker` both plug-ins are available then you can move to the next Task.

  ![image of agent detail page](images/check-deploy-plug-ins.png)


7. To enable `Java Management Service` plug-in, click on **Deploy plug-ins** button.

  ![image of click on deploy plug-in button](images/deploy-plug-in-button.png)

8. Check `Java Management Service` option and click on Update button.
  ![image of updating the plug-in](images/deploy-jms-plug-in.png)

9. After 5-10 minutes, you should see the `Java Management Service` plug-in enabled under `Service Plug-ins` field.
  ![image of updated plug-in](images/deploy-jms-plug-in-done.png)



You may now **proceed to the next lab.**

## Learn More

* Refer to the [Managing Plugins with Oracle Cloud Agent](https://docs.oracle.com/en-us/iaas/Content/Compute/Tasks/manage-plugins.htm#console).
* Refer to the [Installing a Management Agent](https://docs.oracle.com/en-us/iaas/jms/doc/management-agent-chapter.html#GUID-FFC4FD17-B48A-46F2-A77F-7367CF6458F0). It has details of installation of Management Agent on various Operating Systems.
* Refer to the [Viewing a Java Runtime](https://docs.oracle.com/en-us/iaas/jms/doc/fleet-views.html#GUID-F57179D9-C736-4058-B381-9ECAC776895F) for details of all the field shown in Java Runtime table.


## Acknowledgements

* **Author** - Bhuvesh Kumar, Java Management Service
* **Last Updated By** - Yixin Wei, August 2022
