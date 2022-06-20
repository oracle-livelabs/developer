# Set up Oracle Cloud Infrastructure for Java Management Service

## Introduction
Before you can use Java Management Service, you must ensure that your Oracle Cloud Infrastructure environment is set up correctly to allow the communication flow between all required components and cloud services.

This section describes the steps to set up Oracle Cloud Infrastructure for Java Management Service. To set up your OCI resources, you may choose to use either the **Onboarding Wizard** or perform the steps **manually**. We recommend users new to OCI to use the **Onboarding Wizard** option.

Before you begin, review the prerequisites and the overview of the steps.

Estimated Time: 15 min

### Objectives
In this lab, you will:

* Set up Oracle Cloud Infrastructure for new Java Management Service users by configuring the prerequisite OCI resources to get started including:
    * Create a compartment for your JMS resources.
    * Create a new tag namespace.
    * Create a new tag key.
    * Create a user group for your JMS users.
    * Create one or more user accounts for your JMS users.
    * Create a dynamic group of all agents.
    * Create policies.
 
### Prerequisites
You will need an OCI account with administrative privileges to complete this lab. If you do not have one, you may sign up [here](https://www.oracle.com/cloud/free/) for a free-tier account.

## Task 1: Create OCI Resources using Onboarding Wizard
The Onboarding Wizard helps to create the necessary resources automatically. We recommend this option for users new to OCI.

1. Sign in to the Oracle Cloud Console as an administrator using the credentials provided by Oracle, as described in [Signing into the Console](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingin.htm). See [Using the Console](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/console.htm) for more information.
&nbsp;

2. In the Oracle Cloud Console, open the navigation menu and click **Observability & Management**. Click **Java Management**.
    ![image of console navigation to java management](/../images/console-navigation-java-management.png)
    &nbsp;
3. Select the root compartment under which the Onboarding Wizard will create a new compartment for JMS fleets.
    &nbsp;

4. Click on the **Inspect Prerequisites** button. This launches the Onboarding Wizard.
        ![image of fleets main page](/../images/fleets-main-page.png)
    &nbsp;

5. Click **Details** to view details of the resources that will be created by the Onboarding Wizard. The resources created are a new compartment, user group, dynamic group, policy and tag namespace.
    ![image of onboarding wizard buttons](/../images/fleets-setup-jms.png)
    &nbsp;

6. Scroll down to the bottom of the page and click **Set up JMS** to start the Onboarding Wizard.
    ![image of onboarding wizard window](/../images/fleets-setup-details.png)

7. You will see a screen informing you that the prerequisites have been successfully set-up. Click **Done** to close the window.
    ![image of onboarding wizard success window](/../images/fleets-setup-success.png)
    > **Note:** If an error occurs in the creation process, you will see the error message being displayed. Resolve the error and restart the Onboarding Wizard to continue.
    &nbsp;

8. Verify creation of prerequisite resources (Optional)

    You can confirm the prerequisite resources have been created through your OCI console.
    &nbsp;
    * In the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Compartments**.
        ![image of console navigation to compartments](/../images/console-navigation-compartments.png)
    &nbsp;
    * Confirm the creation of new compartment labelled `Fleet_Compartment`.
        ![image of new compartment](/../images/new-compartment.png)
    &nbsp;
    * In the Oracle Cloud Console, open the navigation menu and click **Governance & Administration**. Under **Governance**, click **Tag Namespaces**.
        ![image of console navigation to tag namespaces](/../images/console-navigation-tag-namespaces.png)
    &nbsp;
    * Confirm the creation of new tag namespace and tag key.
        ![image of new tag namespace and tag key](/../images/new-tag-namespace.png)
    &nbsp;
    * In the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Groups**.
        ![image of console navigation to groups](/../images/console-navigation-groups.png)
    &nbsp;
    * You can see the new user group labelled `FLEET_MANAGERS`.
        ![image of new group](/../images/new-group.png)
    &nbsp;
    * In the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Dynamic Groups**.
        ![image of console navigation to dynamic groups](/../images/console-navigation-dynamic-groups.png)
    &nbsp;
    * Confirm the creation of new dynamic group labelled `JMS_DYNAMIC_GROUP`.
        ![image of new dynamic group](/../images/new-dynamic-group.png)
    &nbsp;
    * In the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Policies**.
        ![image of console navigation to policies](/../images/console-navigation-policies.png)
    &nbsp;
    * Confirm the creation of new policy labelled `JMS_Policy`.
        ![image of new jms policy](/../images/new-jms-policy.png)
    

## Task 2: Create OCI Resources manually

If you would like to customize your OCI resources, you may do so manually with the following steps.

Sign in to the Oracle Cloud Console as an administrator using the credentials provided by Oracle, as described in [Signing into the Console](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/signingin.htm). See [Using the Console](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/console.htm) for more information.

1. Create a compartment for your JMS resources.

    When you sign up for OCI, Oracle creates your tenancy with a root compartment that holds all of your cloud resources. You can think of the root compartment like the root folder in a file system. Oracle recommends that you set up a dedicated compartment for each project so you can associate a compartment with a particular activity or task.
    &nbsp;
    * In the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Compartments**.
        ![image of console navigation to compartments](/../images/console-navigation-compartments.png)
    &nbsp;
    * Click **Create Compartment**.
        ![image of compartments main page](/../images/compartments-main-page.png)
    &nbsp;
    * In the Create Compartment dialog box, enter a name for the compartment (for example, `Fleet_Compartment`), and a description. The compartment name is required when you create policies. (See later.)
        &nbsp;
    * Specify the parent compartment: select the root compartment for your tenancy from the drop-down list.
        ![image of create compartments page](/../images/compartment-create-example.png)
        &nbsp;
    * Click **Create Compartment**.
        &nbsp;
    * Find your new compartment in the table of compartments, then hover over the compartment's OCID. Click **Copy** to copy the OCID into the clipboard and then paste it into a text editor. You will require it in a later step.
        &nbsp;
        ![image of compartments main page after creation](/../images/compartment-main-page-after-create.png)
        &nbsp;
    For more information, see [Setting Up Your Tenancy](https://docs.oracle.com/en-us/iaas/Content/GSG/Concepts/settinguptenancy.htm) and [Managing Compartments](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingcompartments.htm).
    &nbsp;

2. Create a new tag namespace.

    * In the Oracle Cloud Console, open the navigation menu and click **Governance & Administration**. Under **Governance**, click **Tag Namespaces**.
        ![image of console navigation to tag namespaces](/../images/console-navigation-tag-namespaces.png)
    &nbsp;
    * Click **Create Namespace Definition**.
        ![image of tag namespaces main page](/../images/tag-namespaces-main-page.png)
    &nbsp;
    * In the Create Namespace Definition dialog box select the root compartment for your tenancy from the drop-down list.
        &nbsp;
    * In the Namespace Definition Name field, enter `jms`.
        &nbsp;
    * In the Description field, enter `For OCI Java Management use only`.
        ![image of tag namespaces create page](/../images/tag-namespaces-create-example.png)
        &nbsp;
    * Click **Create Namespace Definition**.
        &nbsp;
    For more information, see [Managing Tags and Tag Namespaces](https://docs.oracle.com/en-us/iaas/Content/Tagging/Tasks/managingtagsandtagnamespaces.htm).
    &nbsp;

3. Create a new tag key definition in the new tag namespace.

    * In the Oracle Cloud Console, open the navigation menu and click **Governance & Administration**. Under **Governance**, click **Tag Namespaces**.
        &nbsp;
    * From the list of namespaces, click **jms**.
        ![image of tag namespaces main page after creation](/../images/tag-namespaces-main-page-after-creating.png)
        &nbsp;
    * Click **Create Tag Key Definition**.
        &nbsp;
    * In the Create Tag Key Definition dialog box, enter the name for the new tag key: `fleet_ocid` and its description: `Use to tag a management agent with JMS fleet membership.`.
        ![image of tag key create page](/../images/tag-namespaces-jms-tag-key-definition.png)
        &nbsp;
    * Click **Create Tag Key Definition**.
        &nbsp;

4. Create a user group.

    * In the Oracle Cloud Console, open the navigation menu and click Identity & Security. Under Identity, click Groups.
        ![image of console navigation to groups](/../images/console-navigation-groups.png)
        &nbsp;
    * Click **Create Group**.
        ![image of groups main page](/../images/groups-main-page.png)
        &nbsp;
    * In the Create Group dialog box, enter a name for the group (for example, `FLEET_MANAGERS`), and a description.
        ![image of groups create page](/../images/groups-create-example.png)
        &nbsp;
    * Click **Create**.
        &nbsp;
        For more information, see [Managing Groups](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managinggroups.htm).
        &nbsp;

5. Create user accounts for each of your users by following these instructions: [Adding Users](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/addingusers.htm).
    For more information, see [Managing Users](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingusers.htm).
    &nbsp;



6. Create Dynamic Group.

    Create a dynamic group of all agents. To interact with the Oracle Cloud Infrastructure service end-points, users must explicitly consent to let the management agents work with JMS.

    * In the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Dynamic Groups**.
        ![image of console navigation to dynamic groups](/../images/console-navigation-dynamic-groups.png)
        &nbsp;
    * Click **Create Dynamic Group**.
        ![image of dynamic groups main page](/../images/dynamic-groups-main-page.png)
        &nbsp;
    * In the Create Dynamic Group dialog box, enter a name for the dynamic group (for example, `JMS_DYNAMIC_GROUP`), a description, and a matching rule.

        For **Rule 1**, enter
        ```
        <copy>
        ALL {resource.type='managementagent', resource.compartment.id='<fleet_compartment_ocid>'}
        </copy>
        ```
        Then click on `Additional Rule` button and add **Rule 2**
        ```
        <copy>
        ANY {instance.compartment.id = '<fleet_compartment_ocid>'}
        </copy>
        ```

        Replace `<fleet_compartment_ocid>` with the OCID of the compartment that you created in step 1. (You should have pasted it into a text editor.)
        ![image of dynamic groups create page](/../images/dynamic-groups-create-example.png)
        &nbsp;
    * Click **Create**.
        &nbsp;
        For more information, see [Managing Dynamic Groups](https://docs.oracle.com/en-us/iaas/Content/Identity/Tasks/managingdynamicgroups.htm).
        &nbsp;


7. Create Policies.

    **Policy**: A policy is a document that specifies who can access which Oracle Cloud Infrastructure resources that your company has, and how. A policy simply allows a group to work in certain ways with specific types of resources  in a particular compartment.

    Create policies for the user group to access and manage JMS fleets, management agents, agent install keys, metrics, tag namespaces, logging and LCM operations.
    &nbsp;
    * In the Oracle Cloud Console, open the navigation menu and click **Identity & Security**. Under **Identity**, click **Policies**.
    &nbsp;
    * Click **Create Policy**.
    &nbsp;
    * In the Create Policy dialog box, enter a name for the policy (for example, `JMS_Policy`), and a description.
    &nbsp;
    * Select the root compartment for your tenancy from the drop-down list.
    &nbsp;
    * Click **Show manual editor**.
    &nbsp;
    * In the text box, enter the following statements:
    ```
    <copy>
        ALLOW GROUP FLEET_MANAGERS TO MANAGE fleet IN COMPARTMENT Fleet_Compartment
        ALLOW GROUP FLEET_MANAGERS TO MANAGE management-agents IN COMPARTMENT Fleet_Compartment
        ALLOW GROUP FLEET_MANAGERS TO MANAGE management-agent-install-keys IN COMPARTMENT Fleet_Compartment
        ALLOW GROUP FLEET_MANAGERS TO READ METRICS IN COMPARTMENT Fleet_Compartment
        ALLOW GROUP FLEET_MANAGERS TO MANAGE tag-namespaces IN TENANCY
        ALLOW GROUP FLEET_MANAGERS TO MANAGE instance-family IN COMPARTMENT Fleet_Compartment
        ALLOW GROUP FLEET_MANAGERS TO READ instance-agent-plugins IN COMPARTMENT Fleet_Compartment
        ALLOW DYNAMIC-GROUP JMS_DYNAMIC_GROUP TO MANAGE management-agents IN COMPARTMENT Fleet_Compartment  
        ALLOW SERVICE javamanagementservice TO MANAGE metrics IN COMPARTMENT  Fleet_Compartment WHERE  target.metrics.namespace='java_management_service' 
        ALLOW DYNAMIC-GROUP JMS_DYNAMIC_GROUP TO USE tag-namespaces IN TENANCY
        ALLOW DYNAMIC-GROUP JMS_DYNAMIC_GROUP TO USE METRICS IN COMPARTMENT Fleet_Compartment
        ALLOW SERVICE javamanagementservice TO MANAGE log-groups IN COMPARTMENT Fleet_Compartment
        ALLOW SERVICE javamanagementservice TO MANAGE log-content IN COMPARTMENT Fleet_Compartment
        ALLOW DYNAMIC-GROUP JMS_DYNAMIC_GROUP TO MANAGE log-content IN COMPARTMENT Fleet_Compartment
        ALLOW SERVICE javamanagementservice TO READ instances IN tenancy
        ALLOW SERVICE javamanagementservice TO INSPECT instance-agent-plugins IN tenancy
    </copy>
    ```
    ![image of policies create page](/../images/policies-create-example.png)



    &nbsp;
    * Click **Create**.
    &nbsp;


You may now **proceed to the next lab**.



## Learn More

* Refer to the [Getting Started with Java Management Service](https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html) section of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or if the problem you are facing is not listed, please refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section or you may open a a support service request using the **Help** menu in the OCI console.

* Refer to the [How Policies Work](https://docs.oracle.com/en-us/iaas/Content/Identity/Concepts/policies.htm#How_Policies_Work) section of OCI documentation for more details.

## Acknowledgements

* **Author** - Alvin Lam, Java Management Service
* **Last Updated By/Date** - Bhuvesh Kumar, April 2022
