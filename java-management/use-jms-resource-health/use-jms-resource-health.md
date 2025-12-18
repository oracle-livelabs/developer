# Use JMS Resource Health

## Introduction  
This appendix walks you through the steps to use Java Management Service (JMS) Resource Health to monitor the health of Java resources.
JMS Resource Health provides a comprehensive list of issues affecting JMS Fleets and a JMS plug-in. It identifies and reports the following types of issues:

For JMS Fleets:
- Fleets that don't have any managed instances.
- JMS plug-in registered to a fleet that encounter errors while attempting to push inventory data to the fleet inventory or operational logs, likely due to missing policies.

For a JMS Plug-in:
- JMS plug-in in instances that cannot register with JMS Fleets due to a missing policy.
- JMS plug-in in instances that encounter errors while attempting to push inventory data to the fleet inventory or operational logs, likely due to missing policies.
- JMS plug-in in instances not associated with any fleet, which may occur if the JMS plug-in is enabled under OCA but registration hasn't been completed.

Estimated Time: 5 minutes

### Objectives
In this lab, you will:
- Access the JMS Resource Health dashboard
- Troubleshoot JMS Fleet Health Issues
- Troubleshoot JMS Plug-in Health Issues


## Task 1: View Resource Health

1. In the Oracle Cloud Console, open the navigation menu, click **Observability & Management**, and then click **Health** under **Java Management**.

    ![image of console navigation to java management service](images/console-navigation-jms.png)

2. Detailed information of the resources with issues in the selected compartment will be displayed.

    ![image of jms resource health dashboard](images/jms-resource-health.png)

33. You can **filter** the displayed information by clicking the **search bar**, which displays **2 options**: **by name** and **by JMS resource types**.
    ![Search bar interface showing filter options for name and resource type](images/search-bar-health.png)
    
    You can choose **by name** and select the **corresponding name**:
    ![Search bar filtered by name option with dropdown selection for specific resource names](images/search-bar-by-name-health.png)
    
    Or choose the **resource type option** and **filter results** based on **resource type**:
    ![Resource type filter dropdown showing available Java Management Service resource types for filtering](images/jms-resource-types.png)

## Task 2: Troubleshoot JMS Fleet Health Issue

1. Click the action menu and select **Review health issue** option to resolve the issue related to the selected fleet.

    ![image of jms resource health menu](images/jms-resource-health-menu.png)

2. You can resolve the issue related to the fleet selected using one of the recommended options:
    * Use the OMA installer provided by JMS or installation script to install agents and deploy the JMS plug-in on hosts you want to monitor within the fleet.

        ![image of the first option to resolve the issue](images/review-fleet-issue-1.png)

    * Register OCI instances with installed agents and the deployed JMS plug-in that aren't currently registered to any JMS fleet.

        ![image of the second option to resolve the issue](images/review-fleet-issue-2.png)

    * If the fleet is no longer needed, delete it.

        ![image of the third option to resolve the issue](images/review-fleet-issue-3.png)

    * Review your policy to verify group definitions, resource type, or compartment in the policy statements.

        ![image of the fourth option to resolve the issue](images/review-fleet-issue-4.png)

## Task 3: Troubleshoot JMS Plug-in Health Issue

1. Click the action menu and select **Review health issue** option to resolve the issue related to the selected plug-in.

    ![image of jms plug-in health menu](images/jms-plugin-health-menu.png)

2. You can resolve the issue related to the plug-in selected using one of the recommended options:
    * Complete the registration of the JMS plug-in to the fleet. Use the Add Managed Instance action in the Managed instance table of the fleet.

        ![image of the first option to resolve the issue](images/review-plugin-issue-1.png)

    * Disable the plug-in from the Oracle Cloud Agent tab if it was enabled by mistake or is no longer needed.

        ![image of the second option to resolve the issue](images/review-plugin-issue-2.png)


---


## Learn More

* Refer to the [JMS Resource Health](https://docs.oracle.com/en-us/iaas/jms/doc/resource-health.html) section of the JMS documentation for more details.

* Refer to the [JMS Fleets Policy Statements](https://docs.oracle.com/en-us/iaas/jms/doc/policy-statements.html) for more details.

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.



## Acknowledgements

* **Author** - El Khaider Amine, Java Management Service
* **Last Updated By** - El Maalmi Ayoub, Jul 2025
