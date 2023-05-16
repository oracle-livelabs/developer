# Set up a Fleet

## Introduction

This lab walks you through the steps to set up a new fleet in Java Management Service (JMS).

Estimated Time: 5 minutes

### Objectives

In this lab, you will:

* Set up a Fleet using the Java Management Service user interface
* Download the installation script to be used in [Lab 6: Install Management Agent on your Managed Instances](?lab=set-up-of-management-agent)

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image on your Managed Instance for this workshop.

## Task 1: Set Up Java Management Service Fleet

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**.

  ![image of console navigation to java management service](images/console-navigation-jms.png)

2. Select the compartment created for JMS resources in Lab 1 (Compartment name should be **Fleet_Compartment**) and **Create fleet**.

  ![image of create fleet](images/create-fleet-create-new.png)

3. In the Create fleet dialog box, enter a name for the Fleet Name (for example, `fleet-1`), and a description.

4. Click **Select all advanced features**.

  ![image of create fleet options page](images/create-fleet.png)

  Click **Agree**. This is to enable all the advanced features. You can still edit it after the fleet is created.

  ![image of agree advanced features](images/select-advanced-agree.png)

  There are 6 different advanced features available:
     * Lifecycle management (LCM) - Manage the lifecycle of Java runtimes in your fleet by installing or removing reported Java runtime.
     * Advanced usage tracking - Gain advanced insights into your Java workloads in the fleet by tracking application server, Oracle JDK and openJDK used by applications.
     * Crypto event analysis - Assess the impact of Oracle JRE and JDK Cryptographic roadmap on the applications running in your fleet.
     * Performance analysis - Evaluates applications and provides customized recommendations to improve performance.
     * JDK Flight Recorder (JFR) - Collect information about events in the application running in your fleet using JDK Flight Recorder (JFR), a tool for collecting diagnostic and profiling data about a running Java application.
     * Java migration analysis - Assists in migrating applications from older JDK versions to newer JDK version by providing a detailed analysis that helps to assess the potential efforts and risks of migration.


  To learn more about the advanced features, see [Using Java Management Service Advanced Features](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202).

  ![image of selected create fleet options](images/create-fleet-advanced-feature.png)

5. Click **Next**. You are prompted to review the fleet information and management agent configuration. If you want to modify your choices, click **Previous**.

6. Click **Create**. This creates a new fleet and its configuration.

  ![image of create fleet confirm creation](images/create-fleet-create.png)

7. Click **Download software and installation script**.

  ![image of page to download installation script](images/download-installation-script.png)

  Select an appropriate version of the management agent software according to the operating system on your instance(s).

  Select an appropriate version of the installation script according to the operating system on your instance(s).

  ![image of page to select installation script os](images/download-installation-script-os.png)

  Click **Close** and **Done** once the download is complete. The downloaded file will be used in [Lab 6: Install Management Agent on your Managed Instances](?lab=set-up-of-management-agent) to install the Management Agent. You can still download the installation script after the fleet is created.

  ![image of page to download installation script done](images/download-installation-script-done.png)

8. After JMS is linked to the management agent, it will collect information on your Java runtimes. As the management agent scans the instance periodically, the information may not appear immediately. The scanning frequency can be changed here.

9. Click the fleet. In the detail page, click **Modify agent settings**.

  ![image of fleet details page](images/fleet-details-page-new.png)

10. Change the **Java Runtime Usage**, **Agent Polling Interval**, **Work Request Validity** and  **Java Runtime Discovery** to the desired value. 

    **Java Runtime Usage**: How frequent agents reports Java usage.

    **Agent Polling Interval**: How frequent which agents check for work request to execute.
 
    **Work Request Validity**: The time period for accepting the work request by the agents involved.

    **Java Runtime Discovery**: How frequent agents scan for Java installation.

  For this example, change **Java Runtime Discovery** to **3 hours**, and **Java Runtime Usage** to **5 minutes**.

  ![image of modify agent settings page](images/fleet-modify-agent-settings-new.png)

11. Click **Save changes** to save the new setting.

  ![image of modify agent settings page](images/fleet-modify-agent-settings-save.png)


## Task 2: Verifying policies and Dynamic Groups required for advanced features
1. This task will verify the creation of the policies and Dynamic Groups required for the advanced features when advanced features was enabled during the fleet creation.

2. Navigate to the Dynamic Groups page.

    * In the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Domains**.
        ![image of console navigation to groups](images/console-navigation-domains.png)
        
    * In the Domains page, click **Default**.
        ![image of domains navigation to default domain](images/domains-navigation-default.png)
        
    * In the Overview page, click **Dynamic groups**.
        ![image of domain overview navigation to groups](images/domain-overview-dynamic-groups.png)
        

3. There will be 2 additional dynamic groups created. 
    * **JMS\_Advanced\_Features\_MACS_GROUP** with 2 Matching Rules
    * **JMS\_Advance\_Features\_INSTANCE_PRINCIPALS\_GROUP** with 1 Matching Rule

   ![image of dynamic groups page](images/dynamic-groups-page.png)

   ![image of macs group rules](images/macs-group-rules.png)

   ![image of instance principals group rules](images/instance-principals-group-rules.png)

4. Click on **Identity** to navigate to the Identity page.

  ![image of instance principals group rules navigate to identity](images/instance-principals-group-rules-navigate-identity.png)

5. On the Identity page, click on **Policies** from the Identity menu on the left.

  ![image of identity page policies select](images/identity-page-policies-select.png)

6. Select the compartment where the fleet was created in Task 1 (Compartment name should be **Fleet_Compartment**). You should see the policy name **JMS-Advanced-Features**. Click on the policy name **JMS-Advanced-Features**.

  ![image of policies page](images/policies-page.png)

7. The **JMS-Advanced-Features** policy contains 4 policy statements.

    ```
    <copy>
    ALLOW dynamic-group JMS_Advanced_Features_INSTANCE_PRINCIPALS_GROUP to MANAGE object-family in compartment Fleet_Compartment
    ALLOW dynamic-group JMS_Advanced_Features_MACS_GROUP to MANAGE objects in compartment Fleet_Compartment
    ALLOW resource jms server-components to MANAGE object-family in compartment Fleet_Compartment
    ALLOW group FLEET_MANAGERS to MANAGE object-family in compartment Fleet_Compartment
    </copy>
    ```

    ![image of policy details page](images/policy-details-page.png)
  

## Task 3: Understanding the Oracle Cloud Infrastructure Services which Java Management Service leverages on

JMS taps into the following OCI services to generate logs, object storage information and metrics of the fleet for the users to view. These are the details of these services:

1. Logging Service
  
    - These logs are event logs contributed by Java Management Service and by the service plugins deployed on the management agent of the host machine.

    - All the different log objects will belong to the fleet log group.

    - Each log object will contain its own category of logs e.g. Inventory log will contain logs of the scanning of Java installations in the Managed Instance.

    - Note that the Inventory log is crucial as a fleet cannot be successfully created without it.

    To access the fleet logs, you may click on the respective log object displayed on the fleet main page.

    ![image of log configuration in fleet overview page](images/fleet-log-configuration.png)

    As we proceed with the subsequent labs, you will be able to see logs here.

    To view the logs in detail, click on the drop-down arrow.

    ![image of fleet inventory log page](images/fleet-inventory-log.png)

    An example of a log event:

    ![image of jvm installation log](images/jvm-installation-log.png)

    - See [Logging in JMS](https://docs.oracle.com/en-us/iaas/jms/doc/appendix.html#GUID-559AECF8-4FAD-45CC-AE3B-69CA0DC9BDDD) to learn more details about the logs managed by JMS.

2. Object Storage Service

    - This is required for some of the advanced features of JMS and will be explained in the next workshop: [Using Java Management Service Advanced Features](https://apexapps.oracle.com/pls/apex/dbpm/r/livelabs/view-workshop?wid=3202)

3. Monitoring Service

    - This service processes the information generated by JMS and displays it as graphs of Managed Instances, Java runtimes and applications.

    - You may create your own alarms for notifications based on these metrics.

    You may view the fleet metrics on the fleet overview page, by clicking **Metrics** under Resources.

    ![image of metrics in fleet main page](images/fleet-metrics.png)

    - See [Java Management Metrics](https://docs.oracle.com/en-us/iaas/jms/doc/appendix.html#GUID-E7908768-AE97-4BB9-85CB-17A1BD87A271) to learn more about metrics in JMS.


You may now **proceed to the next lab**.


## Troubleshoot fleet creation issues

If you encounter any errors similar to the following, check policy statements in your root compartment:

**For Task 1 Step 6: Create fleet**
![image of create fleet errors](images/create-fleet-errors.png =50%x*)
    ```
    <copy>
    ALLOW GROUP <user_group> TO MANAGE fleet IN COMPARTMENT <compartment_name>
    ALLOW GROUP <user_group> TO MANAGE tag-namespaces IN TENANCY
    ALLOW GROUP <user_group> TO MANAGE log-groups IN COMPARTMENT <compartment_name>
    ALLOW GROUP <user_group> TO MANAGE log-content IN COMPARTMENT <compartment_name>
    ALLOW GROUP <user_group> TO MANAGE management-agents IN COMPARTMENT <compartment_name>
    ALLOW GROUP <user_group> TO MANAGE management-agent-install-keys IN COMPARTMENT <compartment_name>
    ALLOW GROUP <user_group> TO MANAGE dynamic-groups IN TENANCY
    ALLOW GROUP <user_group> TO MANAGE policies IN COMPARTMENT <compartment_name>
    ALLOW GROUP <user_group> TO READ metrics IN COMPARTMENT <compartment_name>
    ALLOW GROUP <user_group> TO READ instance-agent-plugins IN COMPARTMENT <compartment_name>
    </copy>
    ```

**Fleet state failed**
![image of failed fleet](images/failed-fleet.png)
    ```
    <copy>
    ALLOW resource jms server-components TO MANAGE log-groups IN COMPARTMENT <compartment_name>
    ALLOW resource jms server-components TO MANAGE log-content IN COMPARTMENT <compartment_name>
    ALLOW resource jms server-components TO USE management-agent-install-keys IN COMPARTMENT <compartment_name>
    ALLOW resource jms server-components TO MANAGE metrics IN COMPARTMENT <compartment_name> WHERE target.metrics.namespace='java_management_service'
    ALLOW resource jms server-components TO READ instances IN tenancy
    ALLOW resource jms server-components TO INSPECT instance-agent-plugins IN tenancy
    </copy>
    ```

## Learn More

* Refer to the [Fleet Management](https://docs.oracle.com/en-us/iaas/jms/doc/fleet-management.html) section of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.



## Acknowledgements

* **Author** - Esther Neoh, Java Management Service
* **Last Updated By** - Ivan Eng, June 2023
