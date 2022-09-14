# Install Management Agent on your Managed Instances

## Introduction

This lab walks you through the steps to install a management agent and deploy plug-ins on your Managed Instance to allow Java usage tracking by the Java Management Service (JMS).

Estimated Time: 20 minutes

### Objectives

In this lab, you will:

- Install a Management Agent on a Linux or Windows Managed Instance
- Verify Management Agent and Plug-ins
- Tag Management Agent and Compute Instance
- Monitor the Java runtime(s) and Java application(s) in JMS

### Prerequisites

- You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
- You are using an Oracle Linux image or Windows OS on your Managed Instance for this lab.
- Access to the cloud environment and resources configured in [Lab 2](?lab=setup-a-fleet).

## Task 1: Install Management Agent

**On Linux**

1. Prepare the installation script for Linux downloaded in [Lab 2](?lab=setup-a-fleet). Or enter the following command to transfer the script to the remote Managed Instance.

    ```
    <copy>
    scp -i <your-private-key-file> <path-to-installation-script> <username>@<x.x.x.x>:<copy-to-path>
    </copy>
    ```

2. Connect to your instance using SSH.

3. Enter the following command to change file permissions.

     ```
     <copy>
     chmod +x <copy-to-path>/<installation-script-name>.sh
     </copy>
     ```

4. Enter the following command to run the installation script. The installation may take some time to complete.

     ```
     <copy>
     sudo <copy-to-path>/<installation-script-name>.sh
     </copy>
     ```

5. If installation is successful, you'll see a message similar to the following:

     ```
     <copy>
     ...
     Management Agent installation has been completed.
     Management Agent plugin 'Java Management Service' installation has been completed.
     Management Agent plugin 'Java Usage Tracking' installation has been completed.
     Management Agent was successfully registered using key YourFleetName (ocid1.managementagentinstallkey.oc1.iad.<some ocid hash>).
     Assigned JMS Fleet is YourFleetName (ocid1.jmsfleet.oc1.iad.<some ocid hash>).
     </copy>
     ```

**On Windows**

1. Prepare the installation script for Windows downloaded in [Lab 2](?lab=setup-a-fleet).

2. Run Windows Powershell as administrator.

3. Enter the following command to unblock the installation script.

    ```
    <copy>
    Unblock-File -Path <path-to-installation-script>
    </copy>
    ```

4. Enter the following command to run the installation script. The installation may take some time to complete.

    ```
    <copy>
    & <path-to-installation-script>
    </copy>
    ```

5. If installation is successful, you'll see a message similar to the following:

     ```
     <copy>
     ...
     Management Agent installation has been completed.
     Management Agent plugin 'Java Management Service' installation has been completed.
     Management Agent plugin 'Java Usage Tracking' installation has been completed.
     Management Agent was successfully registered using key YourFleetName (ocid1.managementagentinstallkey.oc1.iad.<some ocid hash>).
     Assigned JMS Fleet is YourFleetName (ocid1.jmsfleet.oc1.iad.<some ocid hash>).
     </copy>
     ```

## Task 2: Verify Management Agent Installation

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Agents** under **Management Agent**.

  ![image of console navigation to access management agent overview](images/management-agent-overview.png)

2. From the Agents list, look for the agent that was recently installed. This agent should be in the compartment created in [Lab 1](?lab=set-up-oci-for-jms).

  ![image of agents main page](images/agents-main-page-new.png)

## Task 3: Verify Plug-in Deployment

**On non-OCI Linux Managed Instances:**

1. In your agent, click **Deploy plug-ins**.

  ![image of agent detail page](images/agent-non-oci.png)

2. The **Java Management Service** and **Java Usage Tracking** plug-ins should be checked.

  ![image of plug-in detail page](images/verify-plugin-non-oci.png)

**On OCI Linux Managed Instances:**

1. For **Java Usage Tracking** plug-in, it should be in the same page as non-OCI Managed Instances.

  ![image of oca plug-in detail page](images/jut-plugin-oci.png)

2. For **Java Management Service** plug-in, go to compute instance page.

  ![image of navigation to instance](images/nav-compute-instance.png)

3. Select your instance, click the **Oracle Cloud Agent** tab.

  ![image of instance details](images/instance-detail.png)

4. The status of **Oracle Java Management Service** plug-in should be **Running**.

  ![image of JMS plugin on OCI instance](images/jms-plugin-oci.png)

**On Windows Managed Instances:**

1. In your agent, click **Deploy plug-ins**.

  ![image of agent detail page](images/windows-agent-details.png)

2. The **Java Management Service** and **Java Usage Tracking** plug-ins should be checked.

  ![image of plug-in detail page](images/windows-plugin.png)

## Task 4: Check that management agent is tagged with the Fleet OCID

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management service](images/console-navigation-jms.png)

2. Select the Fleet created in [Lab 2](?lab=setup-a-fleet).


3. Take note of the fleet ocid.

  ![image of fleet ocid](images/check-fleet-ocid.png)

4. In the Oracle Cloud Console, open the navigation menu and click **Observability & Management**, and then click **Agents**.
   ![image of console navigation to management agents](images/console-navigation-agents.png)

5. Select the compartment that the management agent is contained in.

  ![image of agents main page](images/agents-main-page-new.png)

6. Select the management agent to view more details

7. Under **Tags**, the `jms` tag will be indicated to show that the management agent is linked to that fleet. The fleet ocid under the jms tag should be the same fleet ocid noted in Step 3.

  ![image of agents details page](images/tagged-mgmt-agent.png)

8. The management agent has been associated to your fleet in JMS. It will now collect information on your Java runtimes and Java Usage based on the scanning frequency defined in [Lab 2: Set Up a Fleet](?lab=setup-a-fleet).

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

  ![image of console navigation to java management](images/console-navigation-jms.png)

3. Select the compartment that the fleet is in and click the fleet.

4. Click **Java Runtimes** under **Resources**. If tagging and installation of management agents is successful, Java Runtimes will be indicated on the Fleet Main Page after 5 minutes.

  You should see only one Java Runtime. This corresponds to the Java 8 installation from [Lab 3](?lab=deploy-a-java-application).

  ![image of runtimes after successful installation](images/successful-installation.png)

5. Click **Applications** under **Resources**. You should now see two applications. The first is from the javac compiler command and the second is from the HelloWorld application.

  ![image of applications after successful installation](images/successful-installation-applications.png)

You may now **proceed to the next lab.**

## Troubleshoot Management Agent installation issues

**For Task 1**

- If you are using a free-tier tenancy and encounter an error similar to the following:

  ![image of connection closed](images/troubleshoot-connection-closed-by-remote.png)

  Please reconnect to your instance and rerun the installation script.

- If you encounter an error similar to the following:

  ![image of installation script unable to find error](images/troubleshoot-unable-to-find-jdk.png)

  Please manually download and install Oracle JDK 1.8 from [official Oracle page](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html).

- If you encounter an error similar to the following:

  ![image of installation script no directory](images/troubleshoot-no-directory.png)

  Please enter the following command to delete management agent and run the installation script again:

    ```
     <copy>
     sudo rpm -e oracle.mgmt_agent
     </copy>
     ```

## Learn More

- Refer to the [Management Agent Concepts](https://docs.oracle.com/en-us/iaas/management-agents/doc/you-begin.html) and [Installation of Management Agents](https://docs.oracle.com/en-us/iaas/management-agents/doc/install-management-agent-chapter.html) sections of the JMS documentation for more details.

- Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

- If the problem still persists or if the problem you are facing is not listed, please refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section or you may open a support service request using the **Help** menu in the Oracle Cloud Console.

## Acknowledgements

- **Author** - Esther Neoh, Java Management Service
- **Last Updated By** - Yixin Wei, August 2022
