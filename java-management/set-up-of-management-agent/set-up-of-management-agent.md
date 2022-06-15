# Set Up of Management Agent

## Introduction

This lab walks you through the steps to install a management agent on your compute instance host and set up tags for the agent and compute instance to allow Java usage tracking by the Java Management Service (JMS).

Estimated Time: 15 minutes

### Objectives

In this lab, you will:

* Configure a response file
* Install a management agent on a Linux / Windows compute instance host
* Verify management agent
* Configure Java Usage Tracker
* Tag Management Agent and Compute Instance
* Monitor the Java runtime(s) and Java application(s) in JMS

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image on your host machine or compute instance for this workshop.
* Access to the cloud environment and resources configured in Lab 2

## Task 1: Prepare agent software and response file for Management Agent installation

Before the set up of the Management Agent, it is important to understand the concepts behind the Java Management Service:

* **Java Management Service (JMS)**: A reporting and management infrastructure integrated with Oracle Cloud Infrastructure Platform services to observe and manage your use of Java SE (on-premises or in the Cloud). It enables you to observe and manage the use of Java in your enterprise.

* **Management Agents**: Can be installed on a host to allow a service plug-in to collect data from the host where you installed the Management Agent. In the case of JMS, the management agent allows the JMS plug-in to collect data about Java Applications, Java Runtimes and Installations from the host which can be either on-premises or in the Cloud. To set up a Management Agent, we will need a **response file**, which contains an **install key**.

* **Install Key**: A token required by the **Management Agent** installation. It authorises the Management Agent to communicate with the Oracle Cloud Infrastructure. You can use a single agent install key for multiple Management Agent installations.
This key has been automatically created for you in Lab 3, where the "Create New Management Agent Configuration" box was checked during Fleet creation.

  ![image of create fleet options page](/../images/create-fleet.png)

* **Response File**: For Management Agent installation to take place, a response file is also required. In Lab 3, we clicked **Download Install Key** during the creation of our fleet. The file that we downloaded is the response file which contains the install key, as observed in the `ManagementAgentInstallKey` field. The last line of our response file `Service.plugin.jms.download=true` will also download and enable the JMS plugin.

  ![image of input rsp file](/../images/input-rsp-updated.png)


In this lab, we will demonstrate the installation of the Management Agent by first downloading the management agent software, followed by preparing the response file downloaded previously in Lab 3.

 >**Note:** During the preparation and installation process, you may refer to the bottom section on **Troubleshoot Management Agent Installation Issues** for tips on troubleshooting errors.

1. Connect to your instance using SSH.

2. Enter the following command to download the management agent software file via wget into the remote host compute instance.

  ### For **Linux**
  Download the management agent software using wget:

    ```
    <copy>
    wget https://objectstorage.us-ashburn-1.oraclecloud.com/n/idtskf8cjzhp/b/installer/o/Linux-x86_64/latest/oracle.mgmt_agent.rpm
    </copy>
    ```

  ### For **other operating systems**
  Replace the link with the link for your operating system found on the [official documentation](https://docs.oracle.com/en-us/iaas/management-agents/doc/install-management-agent-chapter.html). Under **Download the Agent Software Using a URL**, **right-click** and click **Copy Link Address** to copy the correct link.

  ![image of obtaining link for management agent software](/../images/link-management-agent-software.png)

3. Create an input.rsp response file on your instance. This will be used by the Management Agent installation script to read the agent parameters specific to your environment.

    ```
    <copy>
    nano /tmp/input.rsp
    </copy>
    ```

    Copy and paste the contents of the previously downloaded response file into the editor, and enter an Agent name under the **AgentDisplayName** field.

    ![image of input rsp file with agent display name](/../images/input-rsp-add-agent-display-name.png " ")

    To save the file, type **CTRL+x**. Before exiting, nano will ask you if you wish to save the file: Type **y** to save and exit, type **n** to abandon your changes and exit.

## Task 2: Install Management Agent

Install Management Agent (If your host is Windows, skip to **For Windows** Section)

### For Linux

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
* A new user called `mgmt_agent` is created. This will be the management agent user. If `mgmt_agent` user already exists, the agent installation process will use it to install the agent software.

* When `mgmt_agent` daemon is created, the hard and soft nofile ulimit are set to 5000.

* All agent files are copied and installed by mgmt_agent user. The agent install base directory is the directory where the agent is installed. The directory is created as part of the agent installation process under `/opt/oracle/mgmt_agent` directory.
  By default, the `mgmt_agent` service is enabled and started automatically after the agent installation.
<!--  -->

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
    		Found service plugin(s): [jms]

    Starting agent...
    Agent started successfully

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

  **Skip to the next section Task 3** if the Management Agent has been **successfully** installed on a Linux host.

  If you would like to install the Management software agent on Windows, continue with the following section **For Windows**.

### For Windows

1. To install the management agent software on Windows, perform the following steps:

2. Extract the management agent software.

3. Navigate to the directory where you have downloaded the management agent software `ZIP` file and unzip it to any preferred location.

4. Login as an **Administrator** and open a Command Prompt window.
    To check if you are currently running the Command Prompt as an Administrator, enter the following:
    ```
    <copy>
    ECHO Administrative permissions required for installation of management agent. Detecting permissions...

    NET SESSION >nul 2>&1
    IF %ERRORLEVEL% == 0 (
      ECHO Success: Administrative permissions detected.
    ) ELSE (
      ECHO Failure: Current permissions insufficient. Please reopen the Command Prompt with administrative permissions.
    )
    </copy>
    ```

    If permissions are insufficient, close and reopen the Command Prompt as an Administrator, and perform the check again.

5. Proceed to create a batch installer script in the same location as the unzipped management agent software folder by entering the following command:

    ```
    <copy>
    notepad installer-wrapper.bat
    </copy>
    ```

    In the file, paste the following text:

    ```
    <copy>
    @ECHO off

    REM Temporary prefix path variable with system32 to prefer system commands
    SETLOCAL
    PATH=C:\Windows\system32;%PATH%
    
    REM STEP1: CHECKING FOR ADMINISTRATOR PERMISSIONS
    ECHO Administrative permissions required for installation of management agent. Detecting permissions...
    NET SESSION >nul 2>&1
    IF %ERRORLEVEL% == 0 (
      ECHO Success: Administrative permissions detected. Continuing with installation...
    ) ELSE (
      ECHO Failure: Current permissions insufficient. Please reopen the Command Prompt with administrative permissions.
      EXIT /B 1
    )
    
    SET argC=0
    SET javaHome=%1
    SET rspPath=%2
    
    set rspPath=%rspPath:"=%
    set javaHome=%javaHome:"=%
    
    FOR %%x in (%*) do Set /A argC+=1
    
    IF %argC% LSS 2 (
        ECHO Minimum arguments are missing
        ECHO Usage:- To execute: installer-wrapper.bat "<Java Home path>" "<Full_Path_To_Input.rsp>"
        ECHO Usage:- Use system env variables for paths: "C:\PROGRA~1" instead of "C:\Program Files" and "C:\PROGRA~2" instead of "C:\Program Files (x86)"
        EXIT /b 1
      )
    
    REM ECHO parameters passed : %*
    
    REM STEP2: SET JAVA HOME
    ECHO setting JAVA_HOME to %javaHome%
    REM Check if bin\java exists
    IF EXIST "%javaHome%\bin\java.exe" (
        SET JAVA_HOME=%javaHome%
        ECHO Java home set to %javaHome%
      ) ELSE (
        ECHO Java home is not as expected. bin directory does not exists under %javaHome%
        ECHO Usage:- Use system env variables for paths: "C:\PROGRA~1" instead of "C:\Program Files" and "C:\PROGRA~2" instead of "C:\Program Files (x86)"
        EXIT /b 1
      )
    
    REM STEP3: SET VERSION CHECK
    SET OVERRIDE_VERSION_CHECK=true
    REM STEP4: INSTALL AGENT
    installer.bat %rspPath%

    </copy>
    ```

    The script does the following:

    * Checks if you are currently running the Command Prompt as an Administrator.
    * Creates environment variables for the paths of JAVA_HOME and the response file.
    * Checks if the command for execution in the next step is entered correctly.
    * Checks if Java is accessible after setting JAVA_HOME.
    * Helps to create a system environment variable `OVERRIDE_VERSION_CHECK` with value `true`. This is necessary for the installation of a management agent on **Windows 10**.
    * Executes the `installer.bat` file needed for the installation and configuration of the management agent.

  Save the file by going to the File option and clicking the Save button. Close the notepad window and move to the command prompt window again.


6. Open a Command Prompt window as an **Administrator** and install and configure the management agent by running the `installer-wrapper.bat` script as follows:

    **Note: Use system env variables for paths: "C:\PROGRA~1" instead of "C:\Program Files" and "C:\PROGRA~2" instead of "C:\Program Files (x86)"**

    ```
    <copy>
    installer-wrapper.bat "<full_path_to_java_home>" "<full_path_of_response_file>"
    </copy>
    ```

7. The output will look similar to the following:

    ```
    C:\Users\test_agent>installer-wrapper.bat "C:\PROGRA~1\Java\jdk.1.8.0_261" "C:\Users\input.rsp"
    setting JAVA_HOME to C:\PROGRA~1\Java\jdk1.8.0_261
    Java home set to C:\PROGRA~1\Java\jdk1.8.0_261
    Found OVERRIDE_VERSION_CHECK environment variable. This flag allows to install Agent on non-supported platforms.
    Please remove this environment variable and retry agent install if you want to use only supported platforms.

    Checking pre-requisites

          Checking if previous agent service exists
          Checking if C:\Oracle\mgmt_agent\agent_inst directory exists
          Checking if C:\Oracle\mgmt_agent\200820.0751 directory exists
          Checking available disk space for agent install
          Checking Java version
                  Java version: 1.8.0_261 found at C:\PROGRA~1\Java\jdk1.8.0_261

    Executing install
          Unpacking software zip
          Copying files to destination dir (C:\Oracle\mgmt_agent)
          Initializing software from template
          Creating mgmt_agent service

    Agent install successful

    Executing configure

          Parsing input response file
          Generating communication wallet
          Validating install key
          Generating security artifacts
          Registering Management Agent

    The mgmt_agent service is starting....
    The mgmt_agent service was started successfully.

    Agent setup completed and the agent is running
    In the future agent can be started by directly running: NET START mgmt_agent
    Please make sure that you delete C:\Users\input.rsp or store it in secure location.
    ```

8. The agent installation process does the following:

* A new directory is created as part of the agent installation process: `C:\Oracle\mgmt_agent`.
* The agent install base directory is the directory where the agent will be installed. By default, the agent is installed under `C:\Oracle directory`. This default directory can be changed by setting the `AGENT_INSTALL_BASEDIR` environment variable before running the `installer-wrapper.bat` script.
* Log files from the agent installation are located under `C:\Oracle\mgmt_agent\installer-logs` directory.

## Task 3: Verify Management Agent Installation

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Agents** under **Management Agent**.

  ![image of console navigation to access management agent overview](/../images/management-agent-overview.png)

2. From the Agents list, look for the agent that was recently installed.

  ![image of management agent list](/../images/management-agent-list.png)

## Task 4: Configure Java Usage Tracker

### For Linux:

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

### For Windows:

1. Open a command prompt as an **Administrator**, and create the following script for configuring the usage tracker.

    ```
    <copy>
    notepad jms-configure.bat
    </copy>
    ```

    In the file, paste the following text:

    ```
    <copy>
    @ECHO off

    REM CONFIGURE JMS USAGE TRACKER
    REM Temporary prefix path variable with system32 to prefer system commands
    setlocal EnableDelayedExpansion
    PATH=C:\Windows\system32;%PATH%
    IF exist C:\Oracle\mgmt_agent\agent_inst\config\destinations\OCI\services\jms (
    	ECHO Setting JMS configuration
    	DIR /b C:\Oracle\mgmt_agent\agent_inst\config\destinations\OCI\services\jms >%TEMP%\version.txt
    	SET /p VERSION=<%TEMP%\version.txt
    	POWERSHELL -ep Bypass C:\Oracle\mgmt_agent\agent_inst\config\destinations\OCI\services\jms\!VERSION!\scripts\setup.ps1
    ) ELSE (
    	ECHO JMS Plugin Folder does not exist, please install management agent and try running it again.
    )
    </copy>
    ```
    Go to the File option and click the Save button to save the file. Close the notepad window.

2. Move to the command prompt window again and run the script that you just created to configure the usage tracker.
    ```
    <copy>
    jms-configure.bat
    </copy>
    ```


3. This script creates the file `C:\Program Files\Java\conf\usagetracker.properties` with appropriate permissions. By default, the file contains the following lines:

    ```
    com.oracle.usagetracker.logToFile = C:\ProgramData\Oracle\Java\usagetracker.log
    com.oracle.usagetracker.additionalProperties = java.runtime.name
    ```
4. If successful, you should see a message similar to:
    ```
    [C:\ProgramData\Oracle\Java\] folder has been created.
    [C:\ProgramData\Oracle\Java\usagetracker.log] file has been created.
    [C:\ProgramData\Oracle\Java\usagetracker.log] permissions has been set.
    [C:\Program Files\Java\conf\] folder has been created.
    ```
## Task 5: Check that management agent is tagged with the Fleet OCID

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management service](/../images/console-navigation-jms.png)

  * Select the Fleet created in Lab 3.

  ![image of fleet page](/../images/check-fleet-ocid-page.png)

  * Take note of the fleet ocid for steps 2-4.

  ![image of fleet ocid](/../images/check-fleet-ocid.png)
<!--  -->

2. In the Oracle Cloud Console, open the navigation menu and click **Observability & Management**, and then click **Agents**.
  ![image of console navigation to management agents](/../images/console-navigation-agents.png)

3. Select the compartment that the management agent is contained in.

  ![image of agents main page](/../images/agents-main-page-new.png)

4. Select the management agent to view more details

5. Under **Tags**, the `jms` tag will be indicated to show that the management agent is linked to that fleet. The fleet ocid under the jms tag should be the same fleet ocid noted in step 1.

  ![image of agents details page](/../images/tagged-mgmt-agent.png)

6. JMS has been linked to the management agent and will collect information on your Java runtimes. As the management agent will scan the instance periodically, the information may not appear immediately. The scanning frequency can also be changed in the Oracle Cloud Console.

7. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management](/../images/console-navigation-jms.png)

8. Select the compartment that the fleet is in and click the fleet.

9. Click on **Modify Agent Settings**.

  ![image of fleet details page](/../images/fleet-details-page-new.png)

10. Change the **Java Runtime Discovery** and **Java Runtime Usage** to the desired value. For this example, change **Java Runtime Discovery** to **3 hours**, and **Java Runtime Usage** to **5 minutes**.

  ![image of modify agent settings page](/../images/fleet-modify-agent-settings-new.png)

## Task 6: Verify detection of Java applications and runtimes
For the logging of applications to be visible, Java applications must be run again after the installation of the Management Agent. Now that the Management Agent has been set up in your compute instance, it will be able to detect new Java applications that have been executed. This can be observed in the Oracle Cloud Console.

We shall demonstrate the detection of the Java compiler and HelloWorld application created in Lab 2.
1. First, re-compile the HelloWorld.java file:

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

  You should see only one Java Runtime. This corresponds to the Java 8 installation from Lab 2.

  ![image of successful installation](/../images/successful-installation.png)

12. Click **Applications** under **Resources**. You should now see two applications. The first is from the javac compiler command and the second is from the HelloWorld application.

  ![image of applications after successful installation](/../images/successful-installation-applications.png)

  You may now **proceed to the next lab.**

## Troubleshoot Management Agent Installation Issues

**For Task 1**
* If you are unable to download the management agent software using `wget`, you may download the software from the Oracle Cloud Console to your local machine and transfer it over to your compute using Secure Copy Protocol (SCP).

* First, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**. Select the fleet that you have created.
  ![image of console navigation to java management service](/../images/console-navigation-jms.png)

* Click **Set Up Management Agent**.
  ![image of fleet details page](/../images/fleet-details-page.png)
* Click **Download management agent software**.
  ![image of set up management agent page](/../images/fleet-set-up-management-agent.png)
* Open up a **Terminal** or **Command Prompt** window in the local machine where the management agent software file is saved.
* Enter the following command to transfer the management agent software file via scp into the remote host compute instance.

    ```
    <copy>
    scp <full_path_of_file_to_be_transferred_on_local_host> opc@<public_IP_Address>:<full_path_of_remote_directory_transferred_to>
    </copy>
    ```
  * In your compute instance, verify that the file transfer is successful by entering the following. You should see your management agent software file.
    ```
    <copy>
    ls
    </copy>
    ```

**For Task 2**

* Ensure that /usr/share folder has write permissions.
* Uninstall and reinstall the management agent after permissions for the /usr/share folder have been updated.

**For Task 3**

* Transfer the response file to /tmp folder where read permissions are allowed.

## Want to Learn More?
* Refer to the [Management Agent Concepts](https://docs.oracle.com/en-us/iaas/management-agents/doc/you-begin.html), [Installation of Management Agents](https://docs.oracle.com/en-us/iaas/management-agents/doc/install-management-agent-chapter.html) and
[JMS Plugin for Management Agents](https://docs.oracle.com/en-us/iaas/jms/doc/installing-management-agent-java-management-service.html) sections of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or if the problem you are facing is not listed, please refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section or you may open a a support service request using the **Help** menu in the OCI console.

## Acknowledgements

* **Author** - Esther Neoh, Java Management Service
* **Last Updated By** - Xin Yi Tay, February 2022
