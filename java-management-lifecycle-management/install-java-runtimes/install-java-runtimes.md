# Install Java Runtimes

## Introduction

This lab walks you through the steps to install Java Runtimes on your Fleet.

Estimated Time: 15 minutes

### Objectives

In this lab, you will:

* Create a Install Java Runtime Work Request using the Java Management Service console interface.
* Verify Java Runtime installation.


### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image or Windows OS on your Managed Instance for this workshop.
* Access to the cloud environment and resources configured in [Lab 1](?lab=set-up-and-enable-lcm-on-jms).

## Task 1: Submit Install Java Runtime Work Request

1. First, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**. Select the fleet that you are interested in.
 ![image of console navigation to java management service](images/console-navigation-jms.png)

2. Under **Resources**, select **Java Runtimes**. You should see a list of the Java Runtimes that are currently in your Fleet.
 ![image of fleet details page](images/fleet-details-page.png)

3. Click **Install Java Runtime**.

  ![image of install java runtime](images/install-java-runtime.png)

4. You will see an Install Java runtime window with current and archive releases of the Oracle Java Runtimes. You will also see a Summary table that lists the metadata, including **Runtime versions**, **Security State**, **Release date**, **End of service life** and **Release notes**. You may click the link under Release notes to open the details page in a new window.

  Select the Java Runtime version you want to install, click **Install** to confirm the installation and submit a request for installation. This request is termed as a **Work Request**.

  ![image of install runtime popup window](images/install-runtime-popup-window.png)

  If your request is submitted successfully, you should receive a notification in green as seen below:
  ![image of submitted install java runtime work request](images/install-java-runtime-work-request-submitted.png)

## Task 2: Verify Java Runtime Installation

1. In the same **Java Management** page, under **Resources**, select **Work Requests**. You should see the Install Java Runtime Work Request you submitted in Task 1. Click on the Work Request to view its details.
 ![image of work request summary page](images/work-request-summary-page.png)


2. If your request has been accepted, the status will change to **In Progress**. It will take some time to complete.
  ![image of pending work request](images/pending-work-request.png)

3. If your request has completed successfully, the status will change to **Completed without Errors**.
  ![image of install completed without errors](images/install-complete-without-errors.png)

4. Return to your fleet page, under **Java Runtimes**, the installed java runtime should be indicated after next scanning. You can also check the installation manually on your Managed Instance.
  ![image of verify java runtime installation](images/verify-java-runtime-installation.png)


 You may now **proceed to the next lab.**

## Learn More
* Refer to the [Java Runtime Lifecycle Management](https://docs.oracle.com/en-us/iaas/jms/doc/advanced-features.html#GUID-08673CB1-D87D-4BC5-A61D-E59DCC879ABB), [Work Request](https://docs.oracle.com/en-us/iaas/jms/doc/getting-started-java-management-service.html#GUID-47C63464-BC0C-4059-B552-ED9F33E77ED3) and [Viewing a Work Request](https://docs.oracle.com/en-us/iaas/jms/doc/fleet-views.html#GUID-F649F0E5-DD54-4DEC-A0F1-942FE3552C93) sections of the JMS documentation for more details.

* Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

* If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.

## Acknowledgements

* **Author** - Yixin Wei, Java Management Service
* **Last Updated By** - Yixin Wei, September 2022
