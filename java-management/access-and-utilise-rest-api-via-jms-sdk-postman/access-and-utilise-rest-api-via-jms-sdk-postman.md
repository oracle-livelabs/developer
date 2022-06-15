# Access and Utilize REST API via JMS SDKs and Postman

## Introduction

This lab walks you through the steps to set up the configuration on your local host machine to access Java Management Service (JMS) REST APIs via SDKs and Postman.

Estimated Time: 15 minutes

### Objectives

In this lab, you will:

* Access API via SDK for JMS (Java and Python Examples)
* Access REST API via Postman for JMS

### Prerequisites

* You have signed up for an account with Oracle Cloud Infrastructure and have received your sign-in credentials.
* You are using an Oracle Linux image on your host machine or compute instance for this workshop.
* Access to the cloud environment and resources configured in Lab 5

## Task 1: Access SDKs for JMS

### Access Java SDK for JMS
1. Download the [SDK](https://github.com/oracle/oci-java-sdk/releases) and extract it.

2. Access the sample [API](https://docs.oracle.com/en-us/iaas/api/#/en/jms/20210610/Fleet/GetFleet).

    ![image of java sdk example code](/../images/java-sdk-own.png)

3. Copy the example SDK code into a .java File in the SDK downloaded. Ensure the file path for the newly created file adheres to the sample SDK code.

    ![image of java sdk filepath](/../images/java-sdk-filepath.png)

4. Run it.

    ![image of java sdk run](/../images/java-sdk-run.png)

5. A response is generated.

    ![image of java sdk output](/../images/java-sdk-response.png)

### Access Python SDK for JMS

1. Set up a virtual environment.

  Oracle recommends that you run the SDK in a virtual environment with virtualenv. This allows you to isolate the dependencies for the SDK and avoids any potential conflicts with other Python packages which may already be installed (e.g. in your system-wide Python).
  With Linux, virtualenv is usually in a separate package from the main Python package. If you need to install virtualenv, use `pip install virtualenv`.

  Start by creating a new directory to work with:

      ```
      <copy>
      mkdir testpy && cd testpy
      </copy>
      ```

  To create and activate a virtual environment:

      ```
      <copy>
      virtualenv <environment name>
      source <environment name>/bin/activatelab
      </copy>
      ```

  For example:

      ```
      <copy>
      virtualenv env
      source env/bin/activate
      </copy>
      ```   

2. Download the [SDK](https://github.com/oracle/oci-python-sdk/releases) and extract it. Delete the 'venv' folder and copy the rest of the contents to the `testpy` directory created in step 1.

    ![image of python sdk ](/../images/python-sdk-contents.png)

3. 'testpy' directory should contain the following:

    ![image of python sdk example code](/../images/folder-structure.png)


4. Access the sample [API](https://docs.oracle.com/en-us/iaas/api/#/en/jms/20210610/Fleet/GetFleet) lab.
    ![image of python sdk example code](/../images/python-sample-code.png)

5. Create a `get_fleet_example.py` file in the SDK downloaded and copy the example SDK code into it.

    ![image of python sdk example code](/../images/get-fleet.png)

6. Ensure the file path for the newly created file adheres to the sample SDK code.

    ![image of python sdk example code](/../images/python-sdk-response.png)

7. Run it in the virtual environment created.

    ```
    <copy>
    python get_fleet_example.py
    </copy>
    ```

    ![image of python sdk example code](/../images/python-sdk-success.png)

### Download SDKs

The steps above can be applied for the Typescript, .NET, Ruby and GO SDKs.
- [Typescript SDK](https://github.com/oracle/oci-typescript-sdk/releases)
- [.NET SDK](https://github.com/oracle/oci-dotnet-sdk/releases)
- [Ruby SDK](https://github.com/oracle/oci-ruby-sdk/releases)
- [GO SDK](https://github.com/oracle/oci-go-sdk/releases)

## Task 2: Access REST APIs by Postman for JMS

### Set Up Postman Environment

1. Download and install [Postman](https://www.postman.com/downloads/).

2. Download [JSON Set Up Files](https://github.com/ashishksingh/postman_collection_for_oci_rest).

    ![image of postman github](/../images/github-postman.png)

3. Login to Postman and Click **Import** to import JSON Set up files.

    ![image of Postman import](/../images/postman-import-json.png)

4. Select JSON Files after unzipping download.

    ![image of Postman import](/../images/json-import.png)

5. Click **Import**.

    ![image of Postman import files](/../images/import-github-json-postman.png)

6. Click **Environments** and **OCI_Environment**.

    ![image of environment Variable](/../images/env-click.png)

7. Input the **tenancyId, authUserID, keyFingerprint** from the ~/.oci/config file created in Lab 5 and fill in **Initial Value** and **Current Value** Columns.

    ![image of environment config file](/../images/env-configfile.png)

8. Fill in the **privateKey** from the private key file downloaded in Lab 5. Type the following command to extract the private key.
    ```
    <copy>
    sudo cat <full_path_of_private_key_file>
    </copy>
    ```
9. Click **Save** once done.

    ![image of configure OCI environment](/../images/env-config.png)


### Initialise Environment

1. Click **Collections** and then **`ONE_TIME_INITIALIZATION_CALL`**. Select **OCI_Environment** as saved previously.

    ![image of initialisation script](/../images/initialise-postman.png)

2. Click **Send**.

    ![image of initialisation script](/../images/initialise-post.png)

3. A 200 response will appear.

    ![image of initialisation confirmation](/../images/initialise-confirmation.png)

### Send a Get Fleet Request

1. Add a request under **`OCI_REST_COLLECTION`**.

    ![image of add request](/../images/add-request.png)

2. Input the desired GET request in the desired format with the tenancy region and fleet ocid.
    ```
    <copy>
    https://javamanagement.<tenancy-region>.oci.oraclecloud.com/20210610/fleets/ocid1.jmsfleet.oc1.<...unique_fleet_ocid>
    </copy>
    ```

    ![image of get fleet](/../images/get-fleet-postman.png)

3. Fleet information will be retrieved and a 200 response reported.

    ![image of get fleet response](/../images/get-fleet-200.png)

You may now **proceed to the next lab.**

## Troubleshoot Postman Issues

**For Task 2**
* If you encounter a Pre-request Script error similar to the following:

  ![image of postman pre-request script error](/../images/postman-pre-request-script-error.png)

  Check that the Pre-request script for the Get Fleet request is empty:
  ![image of postman empty pre-request script](/../images/postman-pre-request-script-empty.png)
  If the problem still persists, check the Pre-request Script in `OCI_REST_COLLECTION` and ensure that line 90 is commented:
  ![image of postman pre-request script commented](/../images/postman-pre-request-script-code-comment.png)


## Want to Learn More?

* If you encounter further issues, review the [Troubleshooting](https://docs.oracle.com/en-us/iaas/jms/doc/troubleshooting.html#GUID-2D613C72-10F3-4905-A306-4F2673FB1CD3) page.

* Alternatively, you may seek help for
    * [SDK Configuration](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/sdkconfig.htm)
    * [Java SDK](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/javasdk.htm)
    * [Python SDK](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/pythonsdk.htm)
    * [.NET SDK](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/dotnetsdk.htm)
    * [Ruby SDK](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/rubysdk.htm)
    * [GO SDK](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/gosdk.htm)
    * [Typescript SDK](https://docs.oracle.com/en-us/iaas/Content/API/SDKDocs/gosdk.htm)
    * [JMS REST APIs](https://docs.oracle.com/en-us/iaas/api/#/en/jms/20210610/)

* You may review [Getting Help and Contacting Support](https://docs.oracle.com/en-us/iaas/Content/GSG/Tasks/contactingsupport.htm) in the OCI documentation.

* If you are still unable to resolve your issue, you may open a a support service request using the **Help** menu in the OCI console.

## Acknowledgements

* **Author** - Esther Neoh, Java Management Service
* **Last Updated By** - Xin Yi Tay, February 2022
