# Run Java Migration Analysis

## Introduction

This lab walks you through the steps to run Java Migration Analysis on any Java application on your Fleet.

Estimated Time: 30 mins

[Lab 5](videohub:1_7ukaux6w)

### Objectives

In this lab, you will:

* Create a Java Migration Analysis work request using the Java Management Service console interface.
* View and monitor the status of the work request created using the Java Management Service console interface.
* View/download the generated Java Migration Analysis report.

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have requested workshop reservation on LiveLabs.
* A running compute instance with preloaded Java runtimes and Java applications (already created for you) that you will be monitoring.
* Access to the cloud environment and resources configured in [Lab 1](?lab=setup-a-fleet) and [Lab 2](?lab=install-management-agent-script).

## Task 1: Submit Java Migration Analysis Work Request

1. First, open the navigation menu, click **Observability & Management**, and then click **Fleets** under **Java Management**. Select the fleet that you have configured in [Lab 1](?lab=setup-a-fleet).
  
    ![image of console navigation to java management service](images/console-navigation-jms.png)

2. Scroll down the **Fleet** details page. Under the **Resources** menu, select **Managed instances**.

    You should see the managed instance set up in [Lab 2](?lab=install-management-agent-script). Click on the managed instance.

    ![image of fleet managed instance](images/fleet-managed-instance.png)

3. Scroll down the **Managed instance** page. Under the **Resources** menu, select **Applications**. A list of Java applications running in this instance is shown. Check the box beside **JMigrate_Application.jar**, select the **Actions** drop-down menu and click the **Start Java migration analysis** button.

    ![image of select java application to run java migrate analysis](images/select-app-run-java-migrate.png)

4. In the **Java migration analysis** panel, the source JDK is auto-populated to JDK 11, which was used to compile and run this Java application.

   Under the **Target JDK for migration analysis**, click on the drop-down menu and select **JDK 21**. Click **Analyze** to start the Java migration analysis.

    ![image of java migration configs before starting](images/java-migration-analysis-config-start.png)

    If your request is submitted successfully, you should receive a notification in green as seen below:

    ![image of run java migration analysis notification](images/run-java-migration-analysis-notification.png)

5. Click on the **fleet** name at the top of the **Managed Instance** page. This should navigate back to the **Fleet** details page.

    ![image of work request](images/java-migration-fleet-details-breadcrumb.png)

6. Scroll down to the **Resources** menu and select **Work requests**. You should see a list of the work requests that are currently in your Fleet.

   **Java migration analysis** that was started should be at the top of the list.
  
    ![image of work request](images/java-migration-analysis-work-request-started.png)

7. Wait for the work request to be processed. If the work request has been completed successfully, the status will change to **Completed without Errors**.

    >**Note:** It will take approximately 15 minutes for the request to be completed.  
    
![image of work request completed](images/java-migration-analysis-work-request-completed.png)    

8. Once the work request status shows **Completed without Errors**, scroll down to the **Resources** menu and select **Migration analysis reports**.

   You should see a list of Java migration analysis reports that have been conducted in your Fleet. The latest **Java migration analysis** that has been completed should be displayed at the top of the list.

    The entire report can be downloaded for offline viewing by clicking on the arrow hyperlink of the zip file under Report column. More information about the downloaded report will be explained under Task 2.

    ![image of java migration analysis report](images/java-migration-analysis-result-final.png)

9. Click on the **Name** of the **Java Migration Analysis report** to view the report. You should see the Report Summary Page indicating an assessment outcome of the migration effort. 

   If there are no changes required, the assessment outcome should be **None**. Otherwise, it will be Minor or Major, depending on the percentage of mandatory changes required.

    ![image of java migration analysis report](images/java-migration-analysis-result-final-details.png)

10. Select **Detailed Summary** under **Resources** to view the detailed breakdown of the type of the change, category, class count and diagnostic counts in the report . You may hover over the information icon to see the definitions of type of change, class count and diagnostics count.

   ![image of java migration analysis report](images/java-migration-analysis-result-final-1.png)

11. Select **Mandatory changes** under **Resources** to view the classes associated with this change type and the specific counts for removed API(s) as well as unsupported internal API(s).

   ![image of java migration analysis report](images/java-migration-analysis-result-final-2.png)

12. Click on any of the hyperlinks displaying the **Removed API(s)** or **Unsupported internal API(s)** count to view the details of all the selected APIs under the specific class such as location, line number and description with a link for more information.

   ![image of java migration analysis report](images/java-migration-analysis-result-final-3.png)

13. Click on the **Migration report details** at the top of the page to navigate back to the migration report.

    ![image of java migration analysis report](images/migration-report-breadcrumb.png)

14. Select **Recommended changes** under **Resources** to view the classes associated with this change type and the specific counts for terminally deprecated as well as deprecated API(s).

   You may click on any of the hyperlinks displaying the **Terminally deprecated API(s)** or **Deprecated API(s)** count to view more details.

![image of java migration analysis report](images/java-migration-analysis-result-final-4.png)

15. Navigate back to the migration report. Select **Archive summary** under **Resources** to view the details of each analysed archive that contains at least one diagnostic count of changes.

    ![image of java migration analysis report](images/java-migration-analysis-result-final-5.png)

16. Select **API view** under **Resources** to view the details of the changes. Click on any of the hyperlinks displaying the **Removed API(s)** or **Unsupported internal API(s)** or **Terminally deprecated API(s)** or **Deprecated API(s)** diagnostics count to view the API occurrence details.

    ![image of java migration analysis report](images/java-migration-analysis-result-final-6.png)

    ![image of java migration analysis report](images/java-migration-analysis-result-final-7.png)

17. Click on any of the hyperlinks displaying the **Occurrence count** to view all references for a specific API.

   ![image of java migration analysis report](images/java-migration-analysis-result-final-8.png)

## Task 2: (Optional) Download Java Migration Analysis Report

1. To access the consolidated report and the raw results in multiple json files, navigate to the **Fleet** details page and click on the **Object storage bucket** name under **Object storage**.

   ![image of java migration analysis bucket object](images/object-storage-bucket-link.png)

2. The **Java Migration Analysis** HTML report for the application is stored in the zip file: **JMS** > **JAVA_MIGRATION** > **fleet-ocid** > **managed-instance-ocid** > **workrequest-ocid** > **unique-id** > **application-name.zip**. 
   
   The raw results that make up the zip file are available in json file format.

    ![image of java migration analysis bucket object](images/java-migration-analysis-download.png)

3. You can view the HTML report by opening the index.html file located in the folder, extracted from the zip file. A sample view of the report is shown below.

   ![image of java migration analysis html report](images/java-migration-analysis-html-report-1.png)

4. The report is divided into various sections.  You can go to a section by hovering on the **Go To Section** at the top right of the page and select a specific section.

   The information displayed in each section is similar to what is shown on the Oracle Cloud user console.

   ![image of java migration analysis html report](images/java-migration-analysis-html-report-2.png)


You may now **proceed to the next lab.**

## Learn More
 * Refer to the [Java Migration Analysis](https://docs.oracle.com/en-us/iaas/jms/doc/advanced-features.html#GUID-964AEA8E-BAE9-4DD0-83F8-999A158860B9), [Work Request](https://docs.oracle.com/en-us/iaas/jms/doc/using-java-management-service.html#GUID-77AEEBC0-93A5-4E99-96D6-BEE0FEE4539F) sections of the JMS documentation for more details.

 * Use the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) chapter for explanations on how to diagnose and resolve common problems encountered when installing or using Java Management Service.

 * If the problem still persists or it is not listed, then refer to the [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) section. You can also open a support service request using the **Help** menu in the OCI console.

## Acknowledgements

* **Author** - Sherlin Yeo, Java Management Service
* **Last Updated By** - Chan Wei Quan, October 2023

