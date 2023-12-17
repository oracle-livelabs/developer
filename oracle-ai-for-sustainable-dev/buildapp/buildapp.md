# Use Oracle Database JavaScript support and JSON features such as JSON Duality

## Introduction

This lab will show you how to use Oracle Database JSON features to story, analyze, etc. your Open AI other data.

Estimated Time:  3 minutes

[](youtube:JVrJx9_tnoI)

### Objectives

-   Use Oracle Database JSON features to story, analyze, etc. your Open AI other data.

### Prerequisites

- Completion of Setup lab

## Task 1: Verify env.properties file content and decide whether to use maven and Java build or docker image.

After having completed the setup lab, you should now have a fully populated env.properties file with all values populated

the env.properties file in the root directory in a text editor. You will populate the values in this file as part of this lab. It will look something like this:

`OCICONFIG_FILE=~/.oci/config
OCICONFIG_PROFILE=DEFAULT
COMPARTMENT_ID=ocid1.compartment.oc1..mycompartmentvalue
OBJECTSTORAGE_NAMESPACE=myobjectstorenamespacename
OBJECTSTORAGE_BUCKETNAME=myobjectstorebucketname
ORDS_ENDPOINT_URL=https://myordsendpointurl
ORDS_ENDPOINT_URL=https://rddainsuh6u1okc-aidatabaseworkshop.adb.us-ashburn-1.oraclecloudapps.com/ords/aiuser/_sdw/
OCI_VISION_SERVICE_ENDPOINT=https://vision.aiservice.myregion.oci.oraclecloud.com
OCI_SPEECH_SERVICE_ENDPOINT=https://speech.aiservice.myregion.oci.oraclecloud.com
OCI_GENAI_SERVICE_ENDPOINT=https://genai.aiservice.us-chicago-1.oci.oraclecloud.com`

* Note that you populate the OCI_GENAI_SERVICE_ENDPOINT for image generation functionality only and can use other services such Stable Diffusion, Deep Floyd IF, etc. on platforms such as Hugging Face or on OCI itself as is shown in Lab 10 of this workshop.

The application can be built and run in a couple ways:
    
1. Built and run as a Java application directly using Maven. This requires Java and Maven exist on your machine.  Please see Task 2.
2. Built and run as a Docker image. This only requires Docker exist on your machine. Please see Task 3. 

You can of course also run these within a VM/Compute Instance on the cloud.

## Task 2: Build and run as a Java application directly using Maven

1. Open a terminal/shell.
2. cd to the directory where the workshop src (and thus `env.properties`) exists, ie `cd [workspace_src_directory]`.
3. Issue the following to build the application

     ```text
     <copy>./build.sh</copy>
     ```

4. Issue the following to run the application

     ```text
     <copy>./run.sh</copy>
     ```


## Task 3: Build and run as a Docker image

1. Open a terminal/shell.
2. cd to the directory where the workshop src (and thus `env.properties`) exists, ie `cd [workspace_src_directory]`.
3. Issue the following to build the application

     ```text
     <copy>./build_docker.sh</copy>
     ```

4. Issue the following to run the application

     ```text
     <copy>./run_docker.sh</copy>
     ```

You may now **proceed to the next lab.**..

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Evangelist
* **Last Updated By/Date** - Paul Parkinson, 2023
