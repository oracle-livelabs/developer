# Export JMS Fleet Data to Object Storage

## Introduction

This comprehensive lab guides you through:

* Create an Object Storage bucket.
* Configure data export from JMS Fleet to Object Storage.

Export JMS fleet data to Object Storage allows for easy analysis and collaboration, especially with administrators who do not have direct access to OCI or JMS. This feature streamlines data sharing and enables convenient loading of exported data into an Autonomous Database for further processing.

*Estimated Time:* 15 minutes

### Objectives

* Create and verify an Object Storage bucket for exports.
* Configure Fleet export policies and export settings.
* Validate the setup with troubleshooting steps.

### Prerequisites

* OCI account with required permissions.
* Access to necessary compartments for JMS, Object Storage, and policy management.
* (Optional) Management Agent deployed on instance.

## Task 1:  Create a Bucket

1. In the Oracle Cloud Console, open the navigation menu, click **Storage**, then select **Buckets** under **Object Storage & Archive Storage**.
   ![image of configure buckets](./images/configure-buckets.png)
2. Choose the compartment where you wish to store JMS export data (e.g., `Fleet_Compartment`).
   ![image of buckets create bucket](./images/buckets-create-bucket.png)
3. Click the **Create bucket** button.
4. In the form, enter a **Bucket name** following your team's naming policy (e.g., jms-export)
   ![image of create bucket](./images/create-bucket.png)
5. Click **Create bucket** to confirm creation.
   ![image of create bucket save](./images/create-bucket-save.png)

## Task 2: Verify Bucket Creation

1. Ensure your new bucket appears in the bucket listing for the selected compartment.
  ![image of bucket list](./images/bucket-list.png)

## Task 3: Set up Policies for Fleet Data Export

1. In the Console, open the navigation menu, click **Identity & Security**. Under Identity, click **Policies**.
   ![image of configure policies](../common/images/configure-policies.png)
2. Click **Create policy** and complete:
   * **Name:** a descriptive name for your export (e.g., export-storage-bucket).
   * **Description:** a brief description of the policy (e.g., Policy required for JMS Fleets to export data to object storage).
   * **Compartment:** Select your own compartment.
3. Click **Show Manual Editor**.
   ![image of create policy step1](../common/images/create-policy-step1.png)
4. Copy and paste the following policy (edit placeholders accordingly):
   ![image of create policy step2](../common/images/create-policy-step2.png)

    ```text
   <copy>
    Allow RESOURCE jms server-components TO MANAGE objects in compartment [compartment_name] where target.bucket.name = [bucket_name]
    Allow RESOURCE jms server-components TO READ buckets in compartment [compartment_name] where target.bucket.name = [bucket_name]
   </copy>
   ```

   > Replace `[compartment_name]` and `[bucket_name]` as appropriate.

   ![image of create policy step3](../common/images/create-policy-step3.png)
5. Click **Create**.

## Task 4: Configure Data Export for your fleet

1. In the Console, open the navigation menu, click **Observability & Management**, and then **Fleets** under **Java Management**.
   ![image of configure fleets](./../common/images/configure-fleets.png)
2. Select the compartment for JMS resources.
   ![image of select compartment](./../common/images/select-compartment.png)
3. Select your fleet.
   ![image of select fleet](./../common/images/select-fleet.png)
4. In the **Fleet properties** tab, go to **Data Export Settings**.
   * If export settings are unconfigured, click the **Configure** link.
   ![image of configure export](./images/configure-export.png)
5. In the export settings, configure:
   * **Enable Export Settings**
   * **Resources:** Managed instances, Java runtimes, applications
   * **Duration:** 30, 60, or 90 days
   * **Target:** Select the previously created object storage bucket
   * **Schedule:** Daily, Weekly, or Monthly
   ![image of configure export details](./images/configure-export-details.png)
6. Click **Save changes**.
   ![image of configure export details save](./images/configure-export-details-save.png)
7. Download the pipeline script from Fleet settings (if prompted) to help automate or process exported data.
   ![image of download script](./images/download-script.png)

## Learn More

* [Configure Data Export Settings](https://docs.oracle.com/en-us/iaas/jms/doc/configure-export-settings.html)

## Next Steps

* If not already done, proceed to set up an Autonomous Database for deeper integration and export options.

Congratulations, you completed the lab! You may now [proceed to the next lab](#next).

## Acknowledgements

* **Author** - Maria Antonia Merino, Java Management Service
* **Last Updated By/Date** - Maria Antonia Merino, January 2026
