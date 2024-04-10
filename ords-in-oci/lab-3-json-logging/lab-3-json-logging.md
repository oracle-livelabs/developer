# Send Log Data to an Autonomous Database with Service Connector Hub

## Introduction

In this lab, you will create a service connector to move log data from the Logging service to an Autonomous Database using Functions and Oracle REST Data Services.

*Estimated Lab Time:* 30 Minutes

### Objectives

In this lab, you will:

* Create a JSON collection in the Autonomous Database using SODA/Database Actions
* Create a function to pass log files into a JSON collection
* Connect all the pieces together with Service Connector Hub

### Prerequisites

This lab assumes you have:

* All previous labs successfully completed

## Task 1: Download Lab Files

Download the lab files with the following link.

[Lab Files](https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/developer-library/func2.zip)

To download them in the OCI Cloud Console, use the following command:

```shell
curl -o func2.zip https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/developer-library/func2.zip
```

## Task 2: Creating a Collection

**If this is your first time accessing the JSON Worksheet, you will be presented with a guided tour. Complete the tour or click the X in any tour popup window to quit the tour.**

### **Create a Collection using the Database Actions UI**

1. The first step here is to create a **collection** for our JSON Documents. We can do this two ways. The first method is to use the UI in Database Actions. We can start by selecting **JSON** in the **Database Actions Menu**.

    ![JSON in the Database Actions Menu](./images/JSON-in-the-Database-Actions-Menu.png " ")

2. On the JSON worksheet, left click the **Create Collection** button in the middle of the page.

    ![left click the Create Collection button](./images/left-click-the-Create-Collection-button.png " ")

3. Using the **New Collection** slider

    ![New Collection slider appears](./images/New-Collection-slider-appears.png " ")

    enter **loggingcollection** in the **Collection Name** field

    ```shell
    <copy>
    loggingcollection
    </copy>
    ```

    ![Collection Name field entry](./images/Collection-Name-field-entry.png " ")

4. When your **New Collection** slider looks like the below image, left click the **Create** button.

    ![left click the Create button](./images/left-click-the-Create-button.png " ")

### **Create a Collection using the SODA for REST APIs**

1. We can create a collection with the **SODA for REST APIs** as well. To do this, open an **OCI Cloud Shell**. We can do this by clicking the Cloud Shell icon in the upper right of the OCI web console.

    ![Cloud Console Link in OCI Web Console](./images/Cloud-Console-Link-in-OCI-Web-Console.png " ")

2. We can now use the **OCI Cloud Shell** that appears on the bottom of the OCI Web Console Page.

    ![OCI Cloud Shell appears](./images/OCI-Cloud-Shell-appears.png " ")

3. To use the SODA for REST APIs, we need to construct the URL. To start, we use cURL and pass in the username/password combination. Be sure to use the password that you set for our user back in the User Setups lab.

    ```curl
    curl -u "admin:PASSWORD"
    ```

    Also, we can add the -i which tells the cURL command to include the HTTP response headers in the output. This is helpful with debugging

    ```curl
    curl -u "admin:PASSWORD" -i
    ```

    next, this is going to create a collection, so we will use the **PUT HTTP method**.

    ```curl
    curl -u "admin:PASSWORD" -i -X PUT
    ```

    Lastly, we will add the URL. The URL is built up with the hostname followed by ords, followed by our schema name admin

    ```curl
    https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/
    ```

    then, add soda to indicate we want to use the SODA APIs followed by latest and the name of the collection airportdelayscollection. Your URL should look similar to the below one. (Your hostname will be different then this sample)

    ```curl 
    https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/soda/latest/loggingcollection
    ```

    And when we put it all together, we get the following:

    ```curl
    curl -u "admin:PASSWORD" -i -X PUT https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/soda/latest/loggingcollection
    ```

4. We now can take this cURL command and run it in the OCI Cloud Shell. **REMEMBER to use *your* password in place of PASSWORD**

    ![OCI Cloud Shell with cURL command](./images/OCI-Cloud-Shell-with-cURL-command.png " ")

    ```curl
    curl -u "admin:PASSWORD" -i -X PUT https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/soda/latest/loggingcollection
    HTTP/1.1 201 Created
    Date: Mon, 26 Apr 2021 15:53:46 GMT
    Content-Length: 0
    Connection: keep-alive
    X-Frame-Options: SAMEORIGIN
    Cache-Control: private,must-revalidate,max-age=0
    Location: https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/soda/latest/loggingcollection/
    ```

    If the collection already exists, you will get a message similar to the following:

    ```curl
    HTTP/1.1 200 OK
    Date: Mon, 26 Apr 2021 16:07:38 GMT
    Content-Length: 0
    Connection: keep-alive
    X-Frame-Options: SAMEORIGIN
    Cache-Control: private,must-revalidate,max-age=0
    ```

## Task 3: Create and Deploy a Function

1. The next few steps will be using the **OCI Cloud Shell**. We can do this by clicking the **Cloud Shell icon** in the upper right of the OCI web console.

    ![Cloud Console Link in OCI Web Console](./images/Cloud-Console-Link-in-OCI-Web-Console.png " ")

2. Seeing in the previous lab we set up our context and docker repository, we can start by just logging back into the repository so that we can deploy the next function. As a reminder, the command we will be running will be in the format **docker login -u '<tenancy-namespace>/<user-name>' <region-key>.ocir.io** as seen below:

    ```shell
    docker login -u 'mytenancy/oracleidentitycloudservice/bspendol' fra.ocir.io
    ```

    If your tenancy is federated with Oracle Identity Cloud Service, you will use the above format using oracleidentitycloudservice. If the user you are using is not a federated user, you will use the syntax tenancy_name/user_name. Remember to use the token we created in the setup part of the lab just as we did previously.

    ```shell
    bspendol@cloudshell:~ (eu-frankfurt-1)$ docker login -u 'mytenancy/oracleidentitycloudservice/bspendol' fra.ocir.io
    Password: 

    Login Succeeded
    ```

3. Next, we verify we can see our application by running fn list apps

    ```shell
    bspendol@cloudshell:~ (eu-frankfurt-1)$ fn list apps
    NAME            ID
    functionsApp    ocid1.fnapp.oc1.eu-frankfurt-1.aaaaaaaaa1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4
    ```

    We are now setup to deploy our function.

4. Download the function code in your OCI Cloud Shell with the following command if you have not done so already:

    ```shell
    curl -o func2.zip https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/developer-library/func2.zip
    ```

    Once downloaded, unzip it

    ```shell
    gunzip func2.zip
    ```

    ```shell
    <copy>
    gunzip func2.zip
    </copy>
    ```

5. Move into that directory that was created

    `cd func2`

6. Now we can deploy our function to our application. Use the following command:

    ```shell
    <copy>
    fn -v deploy --app functionsApp
    </copy>
    ```

    The OCI Cloud Shell will report back the progress of the function's deployment

    ```shell
    Pushing fra.ocir.io/mytenancy/livelabsrepo/log-to-adw-with-ords-and-fn:0.0.68 to docker registry...
    The push refers to repository [fra.ocir.io/mytenancy/livelabsrepo/log-to-adw-with-ords-and-fn]
    2775700c8222: Pushed 
    9b50566e770b: Pushed 
    522edf3e7d77: Pushed 
    3613dd225bdd: Pushed 
    c09710e8f799: Pushed 
    43022de19af6: Pushed 
    cdf79d97e316: Pushed 
    88fb2db345cd: Pushed 
    747aa001f428: Pushed 
    f9ef7f1bcb19: Pushed 
    02c055ef67f5: Pushed 
    0.0.68: digest: sha256:2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a2a size: 2623
    Updating function log-to-adw-with-ords-and-fn using image fra.ocir.io/mytenancy/livelabsrepo/log-to-adw-with-ords-and-fn:0.0.68...
    Successfully created function: log-to-adw-with-ords-and-fn with fra.ocir.io/mytenancy/livelabsrepo/log-to-adw-with-ords-and-fn:0.0.68
    ```

7. With the function deployed, we need to configure some of the parameters needed so that it can find and login to the database. Configuring function parameters is in the following syntax:

    ```shell
    fn config function <app-name> <function-name> <parameter> <parameter-value>
    ```

    We have the following values to supply:

    ```shell
    fn config function <app-name> <function-name> ords_base_url <ORDS Base URL>
    fn config function <app-name> <function-name> db_schema <DB schema>
    fn config function <app-name> <function-name> db_user <DB user name>
    fn config function <app-name> <function-name> secret_ocid <secret ocid>
    fn config function <app-name> <function-name> collection <input bucket name>
    ```

    And with the values we need with our **app-name** and **function-name** filled in for you:

    ```shell
    <copy>
    fn config function functionsApp log-to-adw-with-ords-and-fn ords_base_url "https://xxxxxx-xxxxxx/ords/"
    fn config function functionsApp log-to-adw-with-ords-and-fn db_schema "admin"
    fn config function functionsApp log-to-adw-with-ords-and-fn db_user "admin"
    fn config function functionsApp log-to-adw-with-ords-and-fn secret_ocid "xxxxxxxxx"
    fn config function functionsApp log-to-adw-with-ords-and-fn collection "loggingcollection"
    </copy>
    ```

    The above commands need some values specified before running them. First, we need to change the **ords_base_url** with the one you recorded after creating the table earlier in this lab. If you remember, the example was `https://myadbhostname-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/sql-developer` 
    
    Using that example, we'll set this parameter to:

    ```shell
    fn config function functionsApp log-to-adw-with-ords-and-fn ords_base_url "https://myadbhostname-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/"
    ```

    Your value will be similar (but unique to you).

    For the **secret_ocid** parameter, use the OCID of the password you entered in the secrets service during the setup.

    ```shell
    fn config function functionsApp log-to-adw-with-ords-and-fn secret_ocid "ocid1.vaultsecret.oc1.eu-frankfurt-1.a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4"
    ```

    Once the values are entered, run them in the OCI Cloud Shell. Be sure to press enter/return after each configuration and that you see the confirmation that the function was updated.

    ```shell
    bspendol@cloudshell:~ (eu-frankfurt-1)$ fn config function functionsApp log-to-adw-with-ords-and-fn ords_base_url "https://myadbhostname-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/"
    functionsApp log-to-adw-with-ords-and-fn updated ords_base_url with https://myadbhostname-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/
    
    bspendol@cloudshell:~ (eu-frankfurt-1)$ fn config function functionsApp log-to-adw-with-ords-and-fn db_schema "admin"
    functionsApp log-to-adw-with-ords-and-fn updated db_schema with admin
    
    bspendol@cloudshell:~ (eu-frankfurt-1)$ fn config function functionsApp log-to-adw-with-ords-and-fn db_user "admin"
    functionsApp log-to-adw-with-ords-and-fn updated db_user with admin
    
    bspendol@cloudshell:~ (eu-frankfurt-1)$ fn config function functionsApp log-to-adw-with-ords-and-fn secret_ocid "ocid1.vaultsecret.oc1.eu-frankfurt-1.a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4"
    functionsApp log-to-adw-with-ords-and-fn updated dbpwd_cipher with ocid1.vaultsecret.oc1.eu-frankfurt-1.a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4a1a2a3a4
    
    bspendol@cloudshell:~ (eu-frankfurt-1)$ fn config function functionsApp log-to-adw-with-ords-and-fn collection "loggingcollection"
    functionsApp log-to-adw-with-ords-and-fn updated input_bucket with loggingcollection
    ```

    Our function is now configured. At any time you can list the configuration parameters in a function with the command:

    ```shell
    fn list config fn <application-name> <function-name>
    ```

    so for our function and application it would be

    ```shell
    fn list config fn functionsApp log-to-adw-with-ords-and-fn
    ```

    The Application Details page will also reflect this function has been created.

    ![Deployed Function](./images/Deployed-Function.png " ")

## Task 4: Create a Service Connector

1. Use the OCI web console drop down menu to go to **Observability & Management** and then **Service Connectors**.

    ![Observability & Management and then Service Connectors](./images/Observability-and-Management-and-then-Service-Connectors.png " ")

2. Next, ensure we are using the livelabs compartment for this **Service Connector** we are about to create. Use the **Compartments** drop down on the left side of the page to select **livelabs**.

    ![choose compartment for service connector](./images/choose-compartment-for-service-connector.png " ")

3. Click the **Create Service Connector** button.

    ![Click the Create Service Connector button](./images/Click-the-Create-Service-Connector-button.png " ")

4. On the Create Service Connector page, start by giving the Service Connector a name. Use the **Connector Name** field and enter **Send Logs to My Autonomous Database**.

    **Connector Name:** Send Logs to My Autonomous Database

    ```shell
    <copy>
    Send Logs to My Autonomous Database
    </copy>
    ```

    ![Connector Name Field entry](./images/Connector-Name-Field-entry.png " ")

5. For the **Description** field, use the same value as the Connector Name.

    **Description:** Send Logs to My Autonomous Database

    ```shell
    <copy>
    Send Logs to My Autonomous Database
    </copy>
    ```

    ![Description Field send logs](./images/Description-Field-send-logs.png " ")

6. Ensure the **Resource Compartment** is set to **livelabs**

    ![Resource Compartment livelabs](./images/Resource-Compartment-livelabs.png " ")

    And the top naming section should look like the following image:

    ![top naming section for service connector](./images/top-naming-section-for-service-connector.png " ")

7. Now, in the **Configure Service Connector** section, we will be selecting our source and target services to move log data to the database. Starting with the **Source** dropdown.

    ![source dropdown configure](./images/source-dropdown-configure.png " ")

    select **Logging** as the **Source**

    ![select Logging as the Source](./images/select-Logging-as-the-Source.png " ")

8. In the **Configure source connection** section, ensure the **Compartment Name** is livelabs

    ![compartment name is livelabs](./images/compartment-name-is-livelabs.png)

9. For **Log Group**, select **Default_Group**

    ![Log Group is Default Group](./images/Log-Group-is-Default-Group.png " ")

10. And for the **Logs** dropdown, select **functionsApp_invoke**, the log we created in the previous lab to track the batch load insert.

    ![Log is functionsApp_invoke](./images/Log-is-functionsApp_invoke.png " ")

    The **Configure source connection** section should look like the following image:

    ![Completed Configure source connection section](./images/Completed-Configure-source-connection-section.png " ") 

11. The **Target** section is next. Use the **Target** dropdown to select **Functions**.

    ![Target dropdown to select Functions](./images/Target-dropdown-to-select-Functions.png " ")

12. Once **Functions** has been selected using the **Target** dropdown, scroll down the page to find the **Configure target connection** section, just below the **Configure Function Task (Optional)** section.

    ![Configure target connection section](./images/Configure-target-connection-section.png " ")

13. Ensure the **Compartment** dropdown is set to **livelabs**

    ![Resource Compartment set correctly](./images/Resource-Compartment-set-correctly.png " ")

14. Using the **Function Application** dropdown, select **functionsApp**.

    ![Resource Compartment function application](./images/Resource-Compartment-function-application.png " ")

15. Using the **Function** dropdown, select **log-to-adw-with-ords-and-fn**

    ![Function dropdown, select log-to-adw-with-ords-and-fn](./images/Function-dropdown-select-log-to-adw-with-ords-and-fn.png " ")

    Your **Configure target connection** section should look like the following image:

    ![Completed target connection section](./images/Completed-target-connection-section.png " ")

    If you scroll the page up, you can see the mini-topology map has our services and green checks indicating we are ready to create.

    ![mini-topology map](./images/mini-topology-map.png " ")

16. On the lower part of the page, you may see a prompt to create a policy (required for access to create or update a service connector). If you do, click the **Create** button for this policy to be auto-created.

    ![prompted to create a policy](./images/prompted-to-create-a-policy.png " ")

17. When done reviewing, click the **Create** button in the lower left of the page.

    ![click the lower left create button](./images/click-the-lower-left-create-button.png " ")

18. Our Service Connector is created and ready to be used.

    ![Created Service Connector](./images/Created-Service-Connector.png " ")

## Task 5: Testing the Flow

1. To test the entire flow, we need to put the file1.csv csv file into the input-bucket bucket just as we did in the previous lab. Use the OCI web console drop down menu to go to **Storage** and then **Buckets**.

    ![Storage then Buckets](./images/Storage-then-Buckets.png " ")

2. Click the **input-bucket** link in the **Name Column**.

    ![Click the input-bucket link](./images/Click-the-input-bucket-link.png " ")

3. In the **Objects Section**, click the **Upload** button.

    ![click the Upload button for objects](./images/click-the-Upload-button-for-objects.png " ")

4. On the **Upload Objects** form, use the **Choose Files from your Computer** section to drag and drop or file browse to the file1.csv file we used when creating the table earlier in this lab.

    ![Find and upload the file to objects](./images/Find-and-upload-the-file-to-objects.png " ")

5. Once selected, click the **Upload** button.

    ![click the Upload button for csv upload](./images/click-the-Upload-button-for-csv-upload.png " ")

6. To see the logs uploaded to the database, we need to go back to the JSON worksheet. Back in **Database Actions**, choose **JSON** in the **Database Actions Menu**.

    ![JSON in the Database Actions Menu](./images/JSON-in-the-Database-Actions-Menu.png " ")

   or select the JSON tile on the **Database Actions** homepage.

   ![JSON in the Database Actions launchpad](./images/JSON-in-the-Database-Actions-launchpad.png " ")

7. Click on our collection **loggingcollection** on the left side of the page in the **Collections Navigator**

    ![JSON collections in sql worksheet](./images/JSON-collections-in-sql-worksheet.png " ")

8. Now using the worksheet, issue a **Query by Example** that will bring back all records. We can do this by typing **{}** in the worksheet.

    ```json
    <copy>
    {}
    </copy>
    ```

    ![All records Query by Example](./images/All-records-Query-by-Example.png " ")

    Then click the **Run Query** button.

    ![All records Query by Example results](./images/All-records-Query-by-Example-results.png " ")

9. We can filter our search to just logs that deal with our CSV file insert. Issue the following **Query by Example**

    ```json
    <copy>
    {"subject": "csv-to-adw-with-ords-and-fn"}
    </copy>
    ```

    ![filtered Query by Example](./images/filtered-Query-by-Example.png " ")

    and then clicking the **Run Query** button.

    ![filtered Query by Example results](./images/filtered-Query-by-Example-results.png " ")

## Conclusion

In this section, you created a function to automate the loading of logs into a database using the service connector.

## Acknowledgements

* **Authors**

  * Jeff Smith, Distinguished Product Manager
  * Chris Hoina, Senior Product Manager

* **Contributors** - Brian Spendolini

* **Last Updated By/Date** - Chris Hoina, March 2023
