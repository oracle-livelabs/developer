# Access and Utilize REST API via OCI CLI

## Introduction

This lab walks you through the steps to set up the configuration on your local host machine to access Java Management Service (JMS) REST APIs via OCI CLI.

Estimated Time: 10 minutes

### Objectives

In this lab, you will:

* Generate an API Signing Key
* Install Oracle Cloud Interface (OCI)
* Access REST API via OCI CLI

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image on your host machine or compute instance for this workshop.
*  Python version 3.6 and later is installed on your local machine

## Task 1: Generate an API Signing Key

1. If you have generated your own keys, refer to the public documentation on how to [upload them](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm) and the public key fingerprint.

2. Open the Profile menu, click the **Profile icon** and click User Settings.

  ![image of profile menu](/../images/user-profile.png)

  ![image of user settings](/../images/user-settings.png)

3. Click **API Keys**.

  ![image of create api key](/../images/api-key.png)

4. Click **Add API Key**.

  ![image of add api key](/../images/add-api-key.png)

5. Download private and public key. Click **Add**.

  ![image of download api key](/../images/api-key-download.png)

6. The key is added and the **Configuration File Preview** is displayed. Click **Copy** to copy the file snippets and paste it into a text file. Save the file as **config**. 

7. The file snippet includes required parameters and values you'll need to create your configuration file. Refer to [SDK and CLI Configuration File](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdkconfig.htm) to see an example of configuration file and `key_file` entry.

  ![image of configuration file](/../images/config-file-preview.png)

8. Create a folder called **.oci** in the Home directory and save the **config file** and **private key** there.

  ![image of configuration file in .oci folder](/../images/config-file-oci-location.png)

9. Set the root user to have **Read-only** permissions for the config file. No other user should have permissions.

  ![image of configuration file permissions](/../images/config-file-permissions.png)

  Alternatively, you may use the Terminal to change the permissions.

      ```
      <copy>
      sudo chmod 400 <config-file-name>
      </copy>
      ```

10. An API Key is successfully created.

  ![image of successful api key creation](/../images/api-key-created.png)


## Task 2: Install OCI Command Line Interface (CLI)

#### For Linux and Unix

Open a terminal.

To run the installer script, run the following command.
  ```
  <copy>
  bash -c "$(curl -L https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.sh)"
  </copy>
  ```
Respond to the Installation Script prompts.

#### For Oracle Linux 8

Use dnf to install the CLI.
  ```
  <copy>
  sudo dnf -y install oraclelinux-developer-release-el8
  sudo dnf install python36-oci-cli
  </copy>
  ```
#### For Oracle Linux 7

Use yum to install the CLI.
  ```
  <copy>
  sudo yum install python36-oci-cli
  </copy>
  ```

#### Mac OS X
To install the CLI on Mac OS X with [Homebrew](https://docs.brew.sh/Installation):

  ```
  <copy>
  brew update && brew install oci-cli
  </copy>
  ```
#### Windows
Open the PowerShell console using the **Run as Administrator** option.

The installer enables auto-complete by installing and running a script. To allow this script to run, you must enable the RemoteSigned execution policy.

To configure the remote execution policy for PowerShell, run the following command.

  ```
  <copy>
  Set-ExecutionPolicy RemoteSigned
  </copy>
  ```

Force PowerShell to use TLS 1.2 for Windows 2012 and Windows 2016: [Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

Download the installer script:
  ```
  <copy>
  Invoke-WebRequest https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.ps1 -OutFile install.ps1
  </copy>
  ```

Run the installer script with or without prompts:
To run the installer script with prompts, run the following command:
  ```
  <copy>
  iex ((New-Object System.Net.WebClient).DownloadString('https://raw.githubusercontent.com/oracle/oci-cli/master/scripts/install/install.ps1'))
  </copy>
  ```
To run the installer script without prompting the user, accepting the default settings, run the following command:
  ```
  <copy>
  install.ps1 -AcceptAllDefaults
  </copy>
  ```

#### Verify that CLI is installed

To get a namespace, run the following command.
  ```
  <copy>
  oci os ns get
  </copy>
  ```

If successful, the following will be returned, with xx as your unique namespace.

  ```
  {
    "data": "xx"
  }
  ```
## Task 3: Access REST API via OCI CLI

Open a **Terminal** or **Command Prompt**

Find the fleet OCID

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management service](/../images/console-navigation-jms.png)

  * Select the Fleet created in Lab 3.

  ![image of fleet page](/../images/check-fleet-ocid-page.png)

  * Take note of the fleet ocid for steps 2-4.

  ![image of fleet ocid](/../images/check-fleet-ocid.png)
<!--  -->


To get **fleet information**, run the following command.

  ```
  <copy>
  oci jms fleet get --fleet-id "<fleet_OCID>"
  </copy>
  ```

To get **jre usage**, run the following command.

  ```
  <copy>
  oci jms jre-usage summarize --fleet-id "<fleet_OCID>"
  </copy>
  ```

To get **application usage**, run the following command.

  ```
  <copy>
  oci jms application-usage summarize --fleet-id "<fleet_OCID>"
  </copy>
  ```



Refer to the [CLI for JMS](https://docs.oracle.com/en-us/iaas/tools/oci-cli/3.0.5/oci_cli_docs/cmdref/jms.html) for viewing and managing fleets.

## Want to Learn More?

* If you encounter further issues, review the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) page.

* Alternatively, you may seek help for
    * [API Key](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/apisigningkey.htm)
    * [Using the CLI](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/cliusing.htm)
    * You may review [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) in the OCI documentation.
    * If you are still unable to resolve your issue, you may open a a support service request using the **Help** menu in the OCI console.

## Acknowledgements

* **Author** - Esther Neoh, Java Management Service
* **Last Updated By** - Esther Neoh, November 2021
