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
- You have installed the latest version of Oracle JDK 8 in your machine according to [Lab 3 Task 3](?lab=deploy-a-java-application#Task3:InstallJava8andcreateasimpleJavaapplication).

## Task 1: Install Management Agent on an OCI Host

This task is for the installation of Management Agent in an OCI Host (OCI Compute Instance). If you are installing the agent on a non-OCI host (e.g. on premise, other cloud computes) please skip to Task 2.

**Pre-installation Policy Requirement**

  >**Note:** If you are installing the agent on an OCI compute instance, you need to add this policy. You can remove the policy after you've installed the management agent.

  1. To add a policy, in the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Policies**.

  ![image of console navigation to java management](images/navigate-policies.png)

  2. Click **JMS_Policy**.
  
  ![image of console navigation to java management](images/root-compartment-jms-policy.png)

  3. Click **Edit Policy Statements**
  
  ![image of console navigation to java management](images/edit-jms-policy.png)
  
  4. Click **+Another Statement** at the bottom right. 
  
  ![image of console navigation to java management](images/jms-policy-add.png)
  
  5. Add the following policy. Click **Save** to save the policy.

  ```
  <copy>
  ALLOW dynamic-group JMS_DYNAMIC_GROUP TO MANAGE instances IN COMPARTMENT Fleet_Compartment
  </copy>
  ```

  ![image of console navigation to java management](images/save-jms-policy.png)

**On Linux (on OCI)**

1. Prepare the **installation script** for Linux downloaded in [Lab 2](?lab=setup-a-fleet). Enter the following command to transfer the script to the remote Managed Instance.

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
      ...
      Oracle Cloud Agent plugin 'Oracle Java Management Service' installation has been completed.
      Oracle Cloud Agent plugin 'Management Agent' installation has been completed.
      Management Agent plugin 'Java Usage Tracking' installation has been completed.
      Management Agent was successfully registered using key YourFleetName (ocid1.managementagentinstallkey.oc1.<region>.<some ocid hash>).
      Assigned JMS Fleet is YourFleetName (ocid1.jmsfleet.oc1.<region>.<some ocid hash>).
      ```

**On Windows (on OCI)**

1. Prepare the **installation script** for Windows downloaded in [Lab 2](?lab=setup-a-fleet).

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
      ...
      Oracle Cloud Agent plugin 'Oracle Java Management Service' installation has been completed.
      Oracle Cloud Agent plugin 'Management Agent' installation has been completed.
      Management Agent plugin 'Java Usage Tracking' installation has been completed.
      Management Agent was successfully registered using key YourFleetName (ocid1.managementagentinstallkey.oc1.<region>.<some ocid hash>).
      Assigned JMS Fleet is YourFleetName (ocid1.jmsfleet.oc1.<region>.<some ocid hash>).
      ```


## Task 2: Install Management Agent on a non-OCI Host

This task is for the installation of Management Agent in a non-OCI host(e.g. on premise, other cloud compute). 

>**Note:** If you have installed the management agent on an OCI instance in Task 1, please skip this task and proceed to Task 3.

For installation of Management agent on non-OCI hosts, you need to have both the installation script and the management agent software from [Lab 2](?lab=setup-a-fleet). 

Both files need to be placed in the same directory before you proceed.

>**Note:** Ensure that you have installed the latest Oracle JDK 8 on your machine before you proceed according to [Lab 3 Task 3](?lab=deploy-a-java-application#Task3:InstallJava8andcreateasimpleJavaapplication). Management Agents require Oracle JDK 8 to be installed.

**On Linux (Non-OCI Host)**

1. Prepare the **installation script** for Linux downloaded in [Lab 2](?lab=setup-a-fleet). Or enter the following command to transfer the script to the remote Managed Instance.

    ```
    <copy>
    scp -i <your-private-key-file> <path-to-installation-script> <username>@<x.x.x.x>:<copy-to-path>
    </copy>
    ```
2. Prepare the **management agent** software for linux downloaded in [Lab 2](?lab=setup-a-fleet) or enter the following command to transfer the script to the remote instance. Both the **management agent** software and the **installation script** must be placed in the same directory.

    ```
    <copy>
    scp -i <your-private-key-file> <path-to-management-agent-software> <username>@<x.x.x.x>:<copy-to-path>
    </copy>
    ```
3. Connect to your instance using SSH.

4. Enter the following command to change file permissions.

     ```
     <copy>
     chmod +x <copy-to-path>/<installation-script-name>.sh
     </copy>
     ```

5. Enter the following command to run the installation script. The installation may take some time to complete.

     ```
     <copy>
     sudo <copy-to-path>/<installation-script-name>.sh
     </copy>
     ```

6. If installation is successful, you'll see a message similar to the following:

     ```
     ...
     Management Agent installation has been completed.
     Management Agent plugin 'Java Management Service' installation has been completed.
     Management Agent plugin 'Java Usage Tracking' installation has been completed.
     Management Agent was successfully registered using key YourFleetName (ocid1.managementagentinstallkey.oc1.iad.<some ocid hash>).
     Assigned JMS Fleet is YourFleetName (ocid1.jmsfleet.oc1.iad.<some ocid hash>).
     ```

**On Windows (Non-OCI Host)**

1. Prepare the **installation script** for Windows downloaded in [Lab 2](?lab=setup-a-fleet).

2. Prepare the **management agent** software for Windows downloaded in [Lab 2](?lab=setup-a-fleet). Both the **management agent** software and the **installation script** must be placed in the same directory.

3. Run Windows Powershell as administrator.

4. Enter the following command to unblock the installation script.

    ```
    <copy>
    Unblock-File -Path <path-to-installation-script>
    </copy>
    ```

5. To ensure you have the correct permissions to run the script, type Set-ExecutionPolicy RemoteSigned and answer A.

    It should look similar to the following:
    ![setting execution policy in windows powershell](images/set-execution-policy.png)

6. Enter the following command to run the installation script. The installation may take some time to complete.

    ```
    <copy>
    & <path-to-installation-script>
    </copy>
    ```

7. If installation is successful, you'll see a message similar to the following:

     ```
     ...
     Management Agent installation has been completed.
     Management Agent plugin 'Java Management Service' installation has been completed.
     Management Agent plugin 'Java Usage Tracking' installation has been completed.
     Management Agent was successfully registered using key YourFleetName (ocid1.managementagentinstallkey.oc1.iad.<some ocid hash>).
     Assigned JMS Fleet is YourFleetName (ocid1.jmsfleet.oc1.iad.<some ocid hash>).
     ```


## Task 3: Verify Management Agent Installation

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Agents** under **Management Agent**.

  ![image of console navigation to access management agent overview](images/management-agent-overview.png)

2. From the Agents list, look for the agent that was recently installed. This agent should be in the compartment created in [Lab 1](?lab=set-up-oci-for-jms). The Availability of the Agent should be Active.

  ![image of agents main page](images/agents-main-page-new.png)

## Task 4: Verify Plug-in Deployment

**On non-OCI Linux Managed Instances:**

1. In your agent, click **Deploy plug-ins**.

  ![image of agent detail page](images/agent-non-oci.png)

2. The **Java Management Service** and **Java Usage Tracking** plug-ins should be checked.

  ![image of plug-in detail page](images/verify-plugin-non-oci.png)

**On OCI Linux Managed Instances:**

1. For **Java Usage Tracking** plug-in, it should be in the same page as non-OCI Managed Instances.

  ![image of oca plug-in detail page](images/jut-plugin-oci.png)

2. For **Java Management Service** plug-in, go to Compute Instance page.

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

## Task 5: Check that management agent is tagged with the Fleet OCID

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

  ![image of console navigation to java management](images/console-navigation-jms.png)

3. Select the compartment that the fleet is in and click the fleet.

4. Click **Java Runtimes** under **Resources**. If tagging and installation of management agents is successful, Java Runtimes will be indicated on the Fleet Main Page after 5 minutes.

  **For Non-OCI Hosts:**
  You should see only one Java Runtime. This corresponds to the Java 8 installation from [Lab 3](?lab=deploy-a-java-application).

  ![image of runtimes after successful installation on non-oci host](images/successful-installation-non-oci.png)

  **For OCI Hosts:**
  You should see two Java Runtimes. This corresponds to the Java 8 installation from [Lab 3](?lab=deploy-a-java-application), and Java 11 installation from the installation script at [Lab 5 Task 1](?lab=set-up-of-management-agent#task1installmanagementagentonanocihost).

  ![image of runtimes after successful installation on oci host](images/successful-installation-oci.png)

5. Click **Applications** under **Resources**. You should now see two applications. The first is from the HelloWorld application and the second is from the javac compiler command.

  ![image of applications after successful installation](images/successful-installation-applications.png)

You may now **proceed to the next lab.**

## Troubleshoot Management Agent installation issues

**For Task 1**

- If you are using a free-tier tenancy and encounter an error similar to the following:

  ![image of connection closed](images/troubleshoot-connection-closed-by-remote.png)

  Please reconnect to your instance and rerun the installation script.

- If you encounter an error similar to the following:

  ![image of installation script unable to find error](images/troubleshoot-unable-to-find-jdk.png)

  Please manually download and install Oracle JDK 8 from [official Oracle page](https://www.oracle.com/java/technologies/javase/javase8u211-later-archive-downloads.html).

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

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.


## Acknowledgements

- **Author** - Esther Neoh, Java Management Service
- **Last Updated By** - Ivan Eng, March 2023
