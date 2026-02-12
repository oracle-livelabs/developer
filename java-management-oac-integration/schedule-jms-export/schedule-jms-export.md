# Lab 7: Schedule JMS Export to Execute Periodically

## Introduction

In this lab, you will schedule the Java Management Service (JMS) export process to run automatically on a periodic basis, ensuring up-to-date Java inventory and usage data flows to downstream analytics.

*Estimated Time:* 10 minutes

### Objectives

* Configure scheduled execution for JMS export using Oracle Cloud Infrastructure (OCI) tools.
* Validate successful schedule and confirm automatic runs.

### Prerequisites

* Completed prior labs, including initial JMS export configuration.
* OCI permissions to manage schedules for JMS or associated services.
* An existing JMS export job you want to schedule.

## Task 1: Schedule the JMS Export

1. On the OAC home page, click page menu in the upper left side.
2. Select **Data**.
   ![image of analytics cloud config data](../common/images/analytics-cloud-config-data.png)
3. Over the imported dataset, on the right side, click actions menu and click **New Schedule**.
   ![image of analytics cloud data connection new schedule](./images/analytics-cloud-data-connection-new-schedule.png)
4. Specify schedule details to run dataset:
   * **Name**
   * **Start**, **Time** and **End**
   * **Repeat** (e.g., daily, weekly, ...), **Every**.
   ![image of analytics cloud data connection schedule details](./images/analytics-cloud-data-connection-schedule-details.png)
5. Click **OK** to schedule it.

## Task 2: Validate the Scheduled Export

1. Wait for the next scheduled interval and monitor the activity.
2. On the OAC home page, click page menu in the upper left side.
3. Select **Jobs**.
   ![image of analytics cloud data jobs](./images/analytics-cloud-data-jobs.png)
4. Select **Schedules** and localize your schedule.
5. Go to actions menu and click **Inspect**.
   ![image of analytics cloud data jobs schedules inspect](./images/analytics-cloud-data-jobs-schedules-inspect.png)
6. On left side select **History** and check the status of the runs.
   ![image of analytics cloud data jobs schedule history](./images/analytics-cloud-data-jobs-schedule-history.png)

## Task 3: Validate the data

1. Log in to your Oracle Analytics Cloud (OAC) environment.
2. From the home page, click **Catalog** in the navigation menu.
   ![image of analytics cloud config catalog](../common/images/analytics-cloud-config-catalog.png)
3. Find and open the JMS Inventory workbook you previously imported,let's double-click on it or click, select actions menu and then **Open**.
   ![image of catalog jms data viewer](../common/images/catalog-jms-data-viewer.png)

## Next Steps

* Monitor exports regularly and adjust the schedule as needed for your analytics SLAs.
* Continue refining automation and monitoring according to organizational requirements.

## Acknowledgements

* **Author** - Maria Antonia Merino, Java Management Service
* **Last Updated By/Date** - Maria Antonia Merino, January 2026
