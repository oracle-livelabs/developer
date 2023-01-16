# View and monitor work request

## Introduction

This lab walks you through the steps to view and monitor the Work Requests you have created.

Estimated Time: 5 minutes

### Objectives

In this lab, you will:

* Understand the different components of a Work Request view
* View and monitor the status of Work Requests created using the Java Management Service console interface
* Cancel a Work Request using the the Java Management Service console interface


### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have requested workshop reservation on LiveLabs.
* A running compute instance with preloaded Java Runtimes and Java applications (already created for you) that you will be monitoring.
* Access to the cloud environment and resources configured in [Lab 1](?lab=setup-a-fleet) and [Lab 2](?lab=install-management-agent-script).

## Task 1: View work request details

1. Open the navigation menu, click **Observability & Management**. Click **Fleets** under **Java Management**. Select the fleet that was created in [Lab 1](?lab=setup-a-fleet).

   ![image of console navigation to java management service](images/console-navigation-jms.png)

2. Under **Resources**, select **Work Requests**. You should see a list of the Work Requests that you have created. Select a **Work Request** that you are interested to view in detail.

   ![image of fleet details page](images/fleet-details-page-view-monitor.png)

3. The detailed view of a Work Request is divided into two sections:
    * Information about the Work Request, including:
        * The **OCID** of the Work Request.
        * **Date and time** when the Work Request **started**, **accepted** and **last updated**.
        * **Number of sub-tasks** completed for the Work Request.
    * A list of resources from which you can view the individual metrics for the Work Requests:
        * Associated Resources
        * Log Messages
        * Error Messages

   ![image of detailed view of work request page](images/work-request-detailed-view.png)

4. For the list of resources which include **Associated Resources**, **Log Messages** and **Error Messages**, each list displays **50** rows at a time. You may click the header of a column to sort the list based on the title of the column, or use the text field to search the contents of the table.

   For the list of **Associated Resources**, you may find the following information:
   * **Managed instance**: Name of the managed instance affected by the Work Request.
   * **Path**: The Java Runtime installation path in the managed instance affected by the operation.
   * **Status**: Operational status of the associated resource.
   * **Last updated**: Date and time when the status for this associated resource was last updated.

   ![image of work request associated resources view](images/work-request-associated-resources-view-monitor.png)


   For the list of **Log Messages**, you may find the following information:
   * **Message**: Log message reported by the agent while carrying out the Work Request.
   * **Timestamp**: Date and time when the message was generated.

   ![image of work request log messages view](images/work-request-log-messages.png)


   For the list of **Error Messages**, you may find the following information. Note that error messages can be observed if your Work Request was not successful.
   * **Message**: Error message reported by the agent while carrying out the Work Request.
   * **Timestamp**: Date and time when the message was generated.

   ![image of work request error messages view](images/work-request-error-messages.png)

## Task 2: View status and logs of work request

1. In the **Fleet** page, under **Resources**, select **Work Requests**. Click on the Work Request you are interested in to view its details.
   ![image of work request summary page](images/work-request-summary-page-view-monitor.png)

2. If your request was successful, you should see that the **Status** of the request is marked as **Succeeded** and **Completed without errors**.
   ![image of successful work request](images/delete-java-runtime-succeeded-view-monitor.png)

3. If you would like to view the log messages for the Work Request, select **Log Messages** under **Resources**. You should see the log messages in detail.
   ![image of work request log messages](images/delete-work-request-log-messages-view-monitor.png)

4. If your Work Request was unsuccessful, you may view the error messages by selecting **Error Messages** under **Resources**. You should see the status as **Failed** and the corresponding error messages.
   ![image of work request failed error messages](images/delete-work-request-failed-error-message.png)

## Task 3: Cancel work request

1. In the **Fleet** page, under **Resources**, select **Work Requests**. You should see the Work Requests you submitted. Click on the Work Request to view its details.
  ![image of work request summary page](images/work-request-summary-page.png)

2. If your Work Request is still in progress and you would like to cancel it, click **Cancel Work Request**.
  ![image of work request details page](images/delete-work-request-details-page.png)

3. Click **Cancel work request** again to confirm.
  ![image of cancel work request](images/cancel-delete-work-request.png)

4. If your request has been canceled successfully, you should see that the **Status** of the request is marked as **Canceled**.
  ![image of cancelled work request](images/canceled-delete-work-request.png)


## Learn More
* Refer to [Work Request](https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html#GUID-47C63464-BC0C-4059-B552-ED9F33E77ED3) and [Viewing a Work Request](https://docs.oracle.com/en-us/iaas/jms/doc/fleet-views.html#GUID-F649F0E5-DD54-4DEC-A0F1-942FE3552C93) sections of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.


## Acknowledgements

* **Author** - Bao Jin Lee, Java Management Service
* **Last Updated By** - Bao Jin Lee, January 2023
