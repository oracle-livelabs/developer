# Install Management Agent on non-OCI hosts - Windows

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
* Access to the cloud environment and resources configured in [Lab 2](?lab=setup-a-fleet).

## Task 1: Prepare agent software for Management Agent installation


 1. First, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**. Select the fleet that you have created.
  ![image of console navigation to java management service](/../images/console-navigation-jms.png)

2. Click **Set Up Management Agent**.
  ![image of fleet details page](/../images/fleet-details-page.png)
3. Click **Download management agent software** and download the software for Windows (Windows-x86_64).
  ![image of set up management agent page](/../images/fleet-set-up-management-agent.png)


## Task 2: Install Management Agent

Install Management Agent (If your host is Linux, skip to skip to Lab 5: Install Management Agent on non-OCI Hosts - Linux).

1. To install the management agent software on Windows, perform the following steps:

2. Extract the management agent software.

3. Navigate to the directory where you have downloaded the management agent software `ZIP` file and unzip it to any preferred location.

4. Login as an **Administrator** and open a Command Prompt window.
    To check if you are currently running the Command Prompt as an Administrator, enter the following:
    ```
    <copy>
    SETLOCAL
    PATH=C:\Windows\system32;%PATH%
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


  2. From the Agents list, look for the agent that was recently installed. This Agent should be in the compartment created in [Lab 1](?lab=set-up-oci-for-jms).

      ![image of agents main page](/../images/agents-main-page-new.png)


## Task 4: Configure Java Usage Tracker


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

2. Select the Fleet created in [Lab 2](?lab=setup-a-fleet).

  ![image of fleet page](/../images/check-fleet-ocid-page.png)


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



## Learn More
* Refer to the [Management Agent Concepts](https://docs.oracle.com/en-us/iaas/management-agents/doc/you-begin.html), [Installation of Management Agents](https://docs.oracle.com/en-us/iaas/management-agents/doc/install-management-agent-chapter.html) and
[JMS Plugin for Management Agents](https://docs.oracle.com/en-us/iaas/jms/doc/installing-management-agent-java-management-service.html) sections of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or if the problem you are facing is not listed, please refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section or you may open a support service request using the **Help** menu in the Oracle Cloud Console.

## Acknowledgements

* **Author** - Esther Neoh, Java Management Service
* **Last Updated By** - Xin Yi Tay, April 2022
