# Perform Java Lifecycle Management with Java Management Service

## Introduction

Lifecycle Management (LCM) is a part of JMS's reporting and management infrastructure. JMS enables users to observe and manage the lifecycles of their Java SE runtimes (on-premises or in the Cloud) by performing LCM operations such as installing or removing Java runtimes.

As a customer, you can:
  * View and identify the Java runtimes.
  * Install Java runtimes.
  * Remove unwanted Java runtimes.
  * View and understand various status and logs of LCM work requests.

Estimated Time: 40 minutes

[Lab 9](videohub:1_qdahpt8r)

### Objectives

In this lab, you will:

* Understand LCM operations
* Remove Java runtime
* Create a set of post Java installation actions
* Install Java runtimes
* View and monitor LCM work requests

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have requested workshop reservation on LiveLabs.
* A running compute instance with preloaded Java runtimes and Java applications (already created for you) that you will be monitoring.
* Access to the cloud environment and resources configured in [Lab 1](?lab=setup-a-fleet) and [Lab 2](?lab=install-management-agent-script).

## Task 1: Remove Java Runtimes

**Submit Delete Java Runtime Work Request**

1. Open the navigation menu, click **Observability & Management**. Click **Fleets** under **Java Management**. Select the fleet that was created in [Lab 1](?lab=setup-a-fleet).
 ![image of console navigation to java management service](images/console-navigation-jms.png)

2. Under **Resources**, select **Java runtimes**. You should see a list of the Java runtimes that are currently in your Fleet.
 ![image of fleet details page](images/fleet-details-page-delete.png)

3. Select the runtime (e.g. jdk-9) that you would like to remove from your fleet and click **Delete**. Do not select jdk-1.8 and jdk-11 as they are required to run JMS and the Java servers.

    > **Note:** Currently, OpenJDKs cannot be removed through Lifecycle Management.

   ![image of select runtime to delete](images/select-java-runtime-to-delete.png)

4. The Delete Java runtimes panel will open. You will see a message with a link to the Java Download page. You will also see a Summary table that lists the affected resources, including **Runtime version, Applications, Managed Instances** and **Installations**. By default, the Summary table is sorted by applications, so the runtimes are presented in the order of least invoked to most invoked in the timeframe selected. You may also click the link under Runtime version to open its details page in a new window.

    Click **Delete** to confirm the deletion and submit a request for removal. This request is termed as a **Work Request**.

    ![image of delete runtime popup window](images/delete-runtime-popup-window.png)

    If your request is submitted successfully, you should receive a notification in green as seen below:
    ![image of submitted delete java runtime work request](images/delete-java-runtime-work-request-submitted.png)

**Verify Java Runtime Deletion**

> **Note:** The Delete Java runtime Work Request will take around 10 minutes to complete.

1. In the same **Java Management** page, under **Resources**, select **Work requests**. You should see the **Delete Java runtime** work request you submitted in Task 1. Click on the Work Request to view its details.
 ![image of work request summary page](images/work-request-summary-page-delete.png)

2. If your request has been accepted, the status will change to **In Progress**. It will take some time to complete.
    ![image of pending work request](images/delete-pending-work-request.png)

3. If your request has completed successfully, the status will change to **Completed without Errors**.
    ![image of install completed without errors](images/delete-complete-without-errors.png)

4. Return to your fleet page, under **Java runtimes**, the deleted Java runtime should not be reported in the subsequent scanning.
    ![image of verify java runtime installation](images/verify-java-runtime-deletion.png)

5. Alternatively, you may use SSH command to connect to the compute instance and enter the following command to check the deletion manually. 

    ```
    <copy>
    ls /usr/java
    </copy>
    ```


## Task 2: Setup post Java installation actions

1. Open the navigation menu, click **Observability & Management**. Click **Fleets** under **Java Management**. Select the fleet that was created in [Lab 1](?lab=setup-a-fleet).
    ![image of console navigation to java management service](images/console-navigation-jms.png)

2. On the Fleet details page, click **More actions** and select **Configure Java runtime lifecycle management settings**. This opens the **Lifecycle management settings** panel.
    ![image of fleet details page lifecycle management](images/fleet-details-page-lifecycle-management.png)

3. In the **Lifecycle management settings**, there is a combo box containing the placeholder "Select an action".

   ![image of post java install action](images/post-java-install-action-security.png)

4. Click on the combo box. A drop-down list of available security configurations will be shown.

   ![image of list of post java install action](images/post-java-install-action-security-list.png)

   There are a total of 5 different security configurations to choose from.
   | Actions                                | Options   |
   |----------------------------------------|-----------|
   | Replace JDK root certificates with default operating system certificates | None |
   | Change minimum key length for EC       | 256 |
   | Change minimum key length for RSA      | 2048 |
   | Change minimum key length for DSA      | 2048 |
   | Change minimum key length for Diffie-Hellman | 2048 |
   {: title="Available Security Configurations"}


5. This lab will simulate the setting up of 1 installation action as follows:
      * Minimum key length for RSA > 2048 bits (e.g. for signed jars)

6. Select the  **Change minimum key length for RSA** option from the drop-down list. Another combo box will appear to the right. This contains the new minimum key length (in bits) that will be set for RSA signed jars.

   ![image of LCM minimimum-rsa-key-length](images/lcm-minimum-rsa-key-length.png)

   Click on the combo box that appeared on the right. Select **2048**.

   ![image of LCM minimimum-rsa-key-length](images/post-install-rsa-select.png)

7. Click on the combo box under **Network configuration**. Select **Default to System Proxy settings when they do exist**.

   ![image of default to system proxy](images/lcm-system-proxy.png)

   There are a total of 5 different network configurations to choose from.
    | Actions                                | Options   |
    |----------------------------------------|-----------|
    | Default to System Proxy settings when they do exist| None |
    | Set HTTP Proxy                         | Host, Port (default is 80)|
    | Set HTTPS Proxy                        | Host, Port (default is 80)|
    | Set FTP Proxy                          | Host, Port (default is 80)|
    | Set Socks Proxy                        | Host, Port (default is 80)|
    {: title="Available Network Configurations"}

8.  Click on the combo box under **Logging configuration**

   ![image of lcm logging configuration](images/lcm-logging-config.png)

9.  Add the following actions:

      * **Add FileHandler to Log Handler classes**.
      * **Change global logging level**, select **ALL** option.

   There are a total of 2 different logging configurations to choose from.
   | Actions                                | Options   |
   |----------------------------------------|-----------|
   | Add FileHandler to Log Handler classes | None |
   | Change global logging level            | ALL, SEVERE, WARNING, INFO, CONFIG, FINE, FINER, FINEST (lowest value), OFF |
   {: title="Available Logging Configurations"}

10. Click on the **Save** button below. This should save all the defined post Java installation actions.

    ![image of LCM post install action save](images/lcm-post-install-action-save.png)

11. Return to the fleet details page, click on the tab **Lifecycle management settings**. The post Java installation actions that had been defined earlier will be shown.

    ![image of fleet page post install action view](images/fleet-page-post-install-action-view.png)

## Task 3: Install Java Runtimes

> **Note:** Installing Java runtimes can be performed **30 minutes** after the Java Management Service plugin status changes to **RUNNING**.

**Submit Install Java Runtime Work Request**

1. Open the navigation menu, click **Observability & Management**. Click **Fleets** under **Java Management**. Select the fleet that was created in [Lab 1](?lab=setup-a-fleet).
 ![image of console navigation to java management service](images/console-navigation-jms.png)

2. Under **Resources**, select **Java runtimes**. You should see a list of the Java runtimes that are currently in your Fleet.
 ![image of fleet details page](images/fleet-details-page.png)

3. Click **Install Java runtime**.
    ![image of install java runtime](images/install-java-runtime.png)

4. You will see an Install Java runtime panel with current and archive releases of the Oracle Java Runtimes. You will also see a Summary table that lists the metadata, including **Release versions**, **Security state**, **End of service life**, **Release date** and **Release notes**. You may click the link under Release notes to open the details page in a new window.

    ![image of install java runtime selection](images/install-java-runtime-list.png)

5. Select the Java runtime version you want to install. Click **Next**.

   ![image of install java runtime selected next](images/install-java-runtime-selected-next.png)

6. The next page should display the advanced options for installing Java. There are two options for installing Java.

      * To install using the Java installer to standard locations, follow **Step 7**.
      * If you prefer to extract Java to a customized location, skip to **Step 9**.

7. Click **Install Java using Installer**, which will install Java to standard locations using executable installers.

   ![image of install java advanced options](images/install-java-advanced-options.png)

8. You can choose the type of Java installation by selecting the drop-down list. Select **Headful**. Click **Next**.

   ![image of select headful java](images/install-java-advanced-select-headful.png)

9. You can also choose to extract Java to a customized location. Click **Extract Java from compressed archive**.

   ![image of extract java](images/install-java-advanced-with-extract.png)

   Enter a valid and absolute directory path without any environment variables, for example /opt/for-demo. Click **Next**.

   ![image of extract java with customized path](images/install-java-advanced-customized-path.png)

10. The next page should display a list of post Java installation actions which had been defined previously in [Task 2](#Task2:SetuppostJavainstallationactions). Select the post Java installation actions you want to perform.

   ![image of install java runtime select post install action](images/install-java-runtime-select-post-install-action.png)

   >**Note:** If no post Java installation action is selected, no post-install action will be executed after the Java installation

11. Click **Install Java runtime** to confirm the installation and submit a request for installation. This request is termed as a **Work request**.

   ![image of install java runtime confirm](images/install-java-runtime-confirm.png)

   If your request is submitted successfully, you should receive a notification in green as seen below:
   ![image of submitted install java runtime work request](images/install-java-runtime-work-request-submitted.png)


**Verify Java Runtime Installation**

> **Note:** The Install Java runtime Work Request will take around 10 minutes to complete.

1. In the same **Java Management** page, under **Resources**, select **Work requests**. You should see the **Install Java runtime** work request you submitted in Task 1. Click on the work request to view its details.
 ![image of work request summary page](images/work-request-summary-page.png)


2. If your request has been accepted, the status will change to **In Progress**. It will take some time to complete.
    ![image of pending work request](images/pending-work-request.png)

3. If your request has completed successfully, the status will change to **Completed without Errors**.
    ![image of install completed without errors](images/install-complete-without-errors.png)

4. Click on the work request. Under the **Resources** menu, click on the **Log messages**. Verify that the post Java installation actions has been executed.
   ![image of install runtime log message](images/install-runtime-log-message.png)

5. Return to your fleet page, under **Java runtimes**, the installed Java runtime should be indicated after next scanning. 

   The pre-build compute instance is designed to detect the new runtime and run some applications on it to speed up the detection.

    >**Note:** The installed Java runtime may take up to 180 minutes to show up in the console if no application was run with it

    ![image of verify java runtime installation](images/verify-java-runtime-installation.png)

6. Alternatively, you may use SSH command to connect to the compute instance and enter the following command to check the installation manually. 

    ```
    <copy>
    ls /usr/java
    </copy>
    ```

## Task 4: (Optional) Modifying/Removing Post Java Installation Action
1. This task is applicable if changes are to be made to the post Java installation action.

2. On the fleet details page, click on **More actions** and select **Configure Java runtime lifecycle management setting**. 

   ![image of fleet details post install action](images/fleet-details-page-lifecycle-management.png)

   The **Lifecycle management settings** panel should appear. It should show a list of actions defined earlier in [Task 2](#Task2:SetuppostJavainstallationactions). To add another action, click on the **+ another action** button. Another combo box with the placeholder "Select an action" should appear in the next line.
   ![image of post install action two actions](images/post-install-action-two-actions.png)

3. Select an action from the drop-down list.

   ![image of LCM add another action third](images/lcm-add-another-action-third.png)


4. To modify an existing action, click on the combo box of the action and select a new action. A list of available actions should appear.

   ![image of LCM modify existing action](images/lcm-modify-existing-action.png)

   Select a new action to replace the existing action.

   ![image of LCM modify existing action list](images/lcm-modify-existing-action-list.png)

5. To remove an existing action, click on the **X** beside the action to remove it.

   ![image of post install action cross button](images/post-install-action-cross-button.png)

   >**Note:** To remove all existing action, click on the **X** beside all of the actions until no action remains

6. Once all the modifications are made, click on the **Save** button below to save all the changes

7. Return to the fleet details page, click on the tab **Lifecycle management settings** to view the updated post Java installation actions.

You may now **proceed to the next lab**.

## Learn More
* Refer to the [Java Runtime Lifecycle Management](https://docs.oracle.com/en-us/iaas/jms/doc/advanced-features.html#GUID-08673CB1-D87D-4BC5-A61D-E59DCC879ABB), [Work Request](https://docs.oracle.com/en-us/iaas/jms/doc/using-java-management-service.html#GUID-77AEEBC0-93A5-4E99-96D6-BEE0FEE4539F) sections of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.


## Acknowledgements

* **Author** - Yixin Wei, Java Management Service
* **Last Updated By** - Siqi Liu, November 2023
