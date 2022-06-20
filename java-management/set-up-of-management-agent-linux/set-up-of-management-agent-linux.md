# Install Management Agent on non-OCI hosts - Linux

## Introduction

This lab walks you through the steps to install a management agent on your compute instance host and set up tags for the agent and compute instance to allow Java usage tracking by the Java Management Service (JMS).

Estimated Time: 15 minutes

### Objectives

In this lab, you will:

- Configure a response file
- Install a management agent on a Linux compute instance host
- Verify management agent
- Configure Java Usage Tracker
- Tag Management Agent and Compute Instance
- Monitor the Java runtime(s) and Java application(s) in JMS

### Prerequisites

- You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
- You are using an Oracle Linux image on your host machine or compute instance for this workshop.
- Access to the cloud environment and resources configured in [Lab 2](?lab=setup-a-fleet).

## Task 1: Prepare agent software and response file for Management Agent installation

1. Connect to your instance using SSH.

2. Enter the following command to download the management agent software file via wget into the remote host compute instance.

  Download the management agent software using wget:

    ```
    <copy>
    wget https://objectstorage.us-ashburn-1.oraclecloud.com/n/idtskf8cjzhp/b/installer/o/Linux-x86_64/latest/oracle.mgmt_agent.rpm
    </copy>
    ```

3. Create an input.rsp response file on your instance. This will be used by the Management Agent installation script to read the agent parameters specific to your environment.

     ```
     <copy>
     nano /tmp/input.rsp
     </copy>
     ```

   Copy and paste the contents of the response file downloaded in [Lab 2](?lab=setup-a-fleet) into the editor, and enter an Agent name under the **AgentDisplayName** field.

   ![image of input rsp file with agent display name](/../images/input-rsp-add-agent-display-name.png " ")

   To save the file, type **CTRL+x**. Before exiting, nano will ask you if you wish to save the file: Type **y** to save and exit, type **n** to abandon your changes and exit.

## Task 2: Install Management Agent

Install Management Agent (If your host is Windows, skip to Lab 6: Install Management Agent on non-OCI Hosts - Windows).

1. Login as a user with `sudo` privileges.

2. Navigate to the directory where you have downloaded the management agent software RPM file and run the following commands to install the `RPM` file:

     ```
     <copy>
     JDK_DIR=$(find /usr/java/ -name "jdk1.8*" -type d)
     sudo JAVA_HOME="${JDK_DIR}" rpm -ivh <rpm_file_name.rpm>
     </copy>
     ```

3. The output will look similar to the following:

     ```
     Preparing... ################################# [100%]

     Checking pre-requisites
       Checking if any previous agent service exists
       Checking if OS has systemd or initd
       Checking available disk space for agent install
       Checking if /opt/oracle/mgmt_agent directory exists
       Checking if 'mgmt_agent' user exists
         'mgmt_agent' user already exists, the agent will proceed installation without creating a new one.
       Checking Java version
         Trying /usr/java/jdk1.8.0_321-amd64
         Java version: 1.8.0_321 found at /usr/java/jdk1.8.0_321-amd64/bin/java
       Checking agent version
     Updating / installing...
       1:oracle.mgmt_agent-<VERSION>  ################################# [100%]

     Executing install
       Unpacking software zip
       Copying files to destination dir (/opt/oracle/mgmt_agent)
       Initializing software from template
       Checking if JavaScript engine is available to use
       Creating 'mgmt_agent' daemon
       Agent Install Logs: /opt/oracle/mgmt_agent/installer-logs/installer.log.0

       Setup agent using input response file (run as any user with 'sudo' privileges)
       Usage:
         sudo /opt/oracle/mgmt_agent/agent_inst/bin/setup.sh opts=[FULL_PATH_TO_INPUT.RSP]

     Agent install successful
     ```

4. The agent installation process does the following:

    - A new user called `mgmt_agent` is created. This will be the management agent user. If `mgmt_agent` user already exists, the agent installation process will use it to install the agent software.

    - When `mgmt_agent` daemon is created, the hard and soft nofile ulimit are set to 5000.

    - All agent files are copied and installed by mgmt_agent user. The agent install base directory is the directory where the agent is installed. The directory is created as part of the agent installation process under `/opt/oracle/mgmt_agent` directory.
    By default, the `mgmt_agent` service is enabled and started automatically after the agent installation.

5. Configure the management agent by running the `setup.sh` script using a response file.

       ```
       <copy>
       sudo /opt/oracle/mgmt_agent/agent_inst/bin/setup.sh opts=/tmp/input.rsp
       </copy>
       ```

   Sample output:

     ```
     Executing configure

     	Parsing input response file
     	Validating install key
     	Generating communication wallet
     	Generating security artifacts
     	Registering Management Agent
     		Found service plugin(s): [jms, jm]

     Starting agent...
     Agent started successfully

     Starting plugin deployment for: [jm]
     Deploying service plugin(s)...Done.
     	jm : Successfully deployed external plugin
     Starting plugin deployment for: [jms]
     Deploying service plugin(s)...Done.
     	jms : Successfully deployed service plugin

     Agent setup completed and the agent is running.
     In the future agent can be started by directly running: sudo systemctl start mgmt_agent

     Please make sure that you delete /tmp/input.rsp or store it in secure location.
     ```

6. Delete the input.rsp file after successful configuration.
     ```
     <copy>
     rm /tmp/input.rsp
     </copy>
     ```

## Task 3: Verify Management Agent Installation

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Agents** under **Management Agent**.

  ![image of console navigation to access management agent overview](/../images/management-agent-overview.png)

2. From the Agents list, look for the agent that was recently installed. This agent should be in the compartment created in [Lab 1](?lab=set-up-oci-for-jms).

   ![image of agents main page](/../images/agents-main-page-new.png)

## Task 4: Configure Java Usage Tracker

1. Execute the following commands:

     ```
     <copy>
     VERSION=$(sudo ls /opt/oracle/mgmt_agent/agent_inst/config/destinations/OCI/services/jms/)
     </copy>
     ```

     ```
     <copy>
     sudo bash /opt/oracle/mgmt_agent/agent_inst/config/destinations/OCI/services/jms/"${VERSION}"/scripts/setup.sh
     </copy>
     ```

2. This script creates the file `/etc/oracle/java/usagetracker.properties` with appropriate permissions. By default, the file contains the following lines:
     ```
     com.oracle.usagetracker.logToFile = /var/log/java/usagetracker.log
     com.oracle.usagetracker.additionalProperties = java.runtime.name
     ```

## Task 5: Check that management agent is tagged with the Fleet OCID

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management service](/../images/console-navigation-jms.png)

2. Select the Fleet created in [Lab 2](?lab=setup-a-fleet).


3. Take note of the fleet ocid.

  ![image of fleet ocid](/../images/check-fleet-ocid.png)

4. In the Oracle Cloud Console, open the navigation menu and click **Observability & Management**, and then click **Agents**.
   ![image of console navigation to management agents](/../images/console-navigation-agents.png)

5. Select the compartment that the management agent is contained in.

  ![image of agents main page](/../images/agents-main-page-new.png)

6. Select the management agent to view more details

7. Under **Tags**, the `jms` tag will be indicated to show that the management agent is linked to that fleet. The fleet ocid under the jms tag should be the same fleet ocid noted in Step 3.

  ![image of agents details page](/../images/tagged-mgmt-agent.png)

8. JMS has been linked to the management agent and will collect information on your Java runtimes. As the management agent will scan the instance periodically, the information may not appear immediately. The scanning frequency can also be changed in the Oracle Cloud Console.

9. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management](/../images/console-navigation-jms.png)

10. Select the compartment that the fleet is in and click the fleet.

11. Click on **Modify Agent Settings**.

  ![image of fleet details page](/../images/fleet-details-page-new.png)

12. Change the **Java Runtime Discovery** and **Java Runtime Usage** to the desired value. For this example, change **Java Runtime Discovery** to **3 hours**, and **Java Runtime Usage** to **5 minutes**.

  ![image of modify agent settings page](/../images/fleet-modify-agent-settings-new.png)

## Task 6: Verify detection of Java applications and runtimes

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

  ![image of runtimes after successful installation](/../images/successful-installation.png)

12. Click **Applications** under **Resources**. You should now see two applications. The first is from the javac compiler command and the second is from the HelloWorld application.

  ![image of applications after successful installation](/../images/successful-installation-applications.png)

You may now **proceed to the next lab.**

## Troubleshoot Management Agent installation issues

**For Task 1**

- If you are unable to download the management agent software using `wget`, you may download the software from the Oracle Cloud Console to your local machine and transfer it over to your compute using Secure Copy Protocol (SCP).

- First, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**. Select the fleet that you have created.
  ![image of console navigation to java management service](/../images/console-navigation-jms.png)

- Click **Set Up Management Agent**.
  ![image of fleet details page](/../images/fleet-details-page.png)
- Click **Download management agent software**.
  ![image of set up management agent page](/../images/fleet-set-up-management-agent.png)
- Open up a **Terminal** window in the local machine where the management agent software file is saved.
- Enter the following command to transfer the management agent software file via scp into the remote host compute instance.

    ```
    <copy>
    scp <full_path_of_file_to_be_transferred_on_local_host> opc@<public_IP_Address>:<full_path_of_remote_directory_transferred_to>
    </copy>
    ```

  - In your compute instance, verify that the file transfer is successful by entering the following. You should see your management agent software file.
    ```
    <copy>
    ls
    </copy>
    ```

**For Task 2**

- Ensure that /usr/share folder has write permissions.
- Uninstall and reinstall the management agent after permissions for the /usr/share folder have been updated.

**For Task 3**

- Transfer the response file to /tmp folder where read permissions are allowed.

## Learn More

- Refer to the [Management Agent Concepts](https://docs.oracle.com/en-us/iaas/management-agents/doc/you-begin.html), [Installation of Management Agents](https://docs.oracle.com/en-us/iaas/management-agents/doc/install-management-agent-chapter.html) and
  [JMS Plugin for Management Agents](https://docs.oracle.com/en-us/iaas/jms/doc/installing-management-agent-java-management-service.html) sections of the JMS documentation for more details.

- Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

- If the problem still persists or if the problem you are facing is not listed, please refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section or you may open a support service request using the **Help** menu in the Oracle Cloud Console.

## Acknowledgements

- **Author** - Esther Neoh, Java Management Service
- **Last Updated By** - Xin Yi Tay, April 2022
