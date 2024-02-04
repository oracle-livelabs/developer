# Verify Tests

## Introduction

In this lab, we will verify tests.

### Objectives

In this lab, you will:

* Setup the pipeline
* Test the pipeline

### Prerequisites

This lab assumes:

* You have an Oracle Cloud account with OCI and Tenancy administration privileges to create policies and compartments.


## Task 1: asdf

1. asdf

   asdfy default it is easiest to simply download the src to a location on your computer using the follow git clone command:

     ```text
     <copy>git clone https://github.com/oracle-devrel/oracle-ai-for-sustainable-dev.git</copy>
     ```

   or download and extract the zip code from https://github.com/oracle-devrel/oracle-ai-for-sustainable-dev/zipball/master

2. Open the env.properties file in the root directory in a text editor. You will populate the values in this file as part of this lab. It will look something like this:

   ```code
      OCICONFIG_FILE=~/.oci/config
      OCICONFIG_PROFILE=DEFAULT
      COMPARTMENT_ID=ocid1.compartment.oc1..mycompartmentvalue
      OBJECTSTORAGE_NAMESPACE=myobjectstorenamespacename
      OBJECTSTORAGE_BUCKETNAME=myobjectstorebucketname
      ORDS_ENDPOINT_URL=https://myordsendpointurl
      ORDS_ENDPOINT_URL=https://rddainsuh6u1okc-aidatabaseworkshop.adb.us-ashburn-1.oraclecloudapps.com/ords/aiuser/_sdw/
      OCI_VISION_SERVICE_ENDPOINT=https://vision.aiservice.myregion.oci.oraclecloud.com
      OCI_SPEECH_SERVICE_ENDPOINT=https://speech.aiservice.myregion.oci.oraclecloud.com
      OCI_GENAI_SERVICE_ENDPOINT=https://genai.aiservice.us-chicago-1.oci.oraclecloud.com
      ```

## Task 2: Log into OCI

1. Login into OCI

   To setup environment, you need OCI administrator's privileges. If you've got these privileges, login into OCI at [cloud.oracle.com](https://www.oracle.com/cloud/sign-in.html). the below image indicates SSO Login as an administrative user. If you have administrative privileges and complete access over a tenancy then you need not create any of the policies below steps.

   ![SSO Login](images/sso-login.png)

   If you do not have administrative privileges into tenancy, you might have to login as federated user, that is the user created by the administrator

   ![Federated User Login](images/direct-signin.png)

   In case you haven't got OCI administrator's privileges, you should ask your OCI administrator to perform the rest of the tasks in this lab.


This concludes this lab. You can **proceed now to the next lab**.

## Learn More

* [OCI Documentation](https://docs.oracle.com/en-us/iaas/Content/home.htm)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate, Oracle Database

* **Last Updated By/Date** - 2024.