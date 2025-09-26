# Secure REST-enabled endpoints

## Introduction

In this lab you secure the REST endpoints created in the previous lab, and test ORDS's built-in OAuth2.0 security with the Client Credentials grant type.

Estimated Lab Time: 10 minutes

### Objectives

- Secure REST endpoints
- Create an OAuth2 token
- Test the secure end-to-end flow

### Prerequisites

- The following lab requires an [Oracle Cloud account](https://www.oracle.com/cloud/free/). You may use your own cloud account, a cloud account that you obtained through a trial, or a training account whose details were given to you by an Oracle instructor.
- This lab uses the command line application cURL for testing APIs; some familiarity is suggested.
- This lab assumes you have completed all previous Labs. 

## Task 1: Create a Role for an OAuth2.0 client

1. From the REST Workshop, select **Roles** from the **Security** dropdown menu.

    ![Roles from the security menu](./images-new/1-roles-from-security-menu.png " ")

2. Next, click the **+ Create Role** button.

    ![click create role button](./images-new/2-create-role-button.png " ")

3. In the Role Definition modal, enter in a **Role Name**, such as: `my.test.role`, then click **Create**.

    ![The role definition modal](./images-new/3-role-definition-modal.png " ")

## Task 2: Create a Privilege for an OAuth2.0 client

1. Next, you'll create a Privilege for the OAuth2.0 client. Select **Privileges** from the **Security** dropdown menu. 

    ![Selecting privileges from security menu](./images-new/4-select-privileges-option.png " ")

2. Click the **+ Create Privilege** button, and enter in values for this privilege. 

   ![Create privilege button](./images-new/5-create-privilege-button.png " ")

   To better follow along, choose values similar to the examples: 

   **Privilege Definition**
   - **Label:** `my.test.priv`
   - **Name:** `my.test.priv`
   - **Description:** `my.test.priv` (You can alter this as needed)
   - **Comments:** optional 

     ![create-priv-priv-definition](./images-new/6-create-priv-priv-definition.png " ")

    **Roles**
    - **Roles:** `my.test.role` (or your unique role, if it differs)

       ![create-priv-roles](./images-new/7-create-priv-roles.png " ")

    **Protected Modules**
    - **Selected Modules**: `records.module`

      ![create-priv-selected-modules](./images-new/8-create-priv-protected-modules.png " ")

    > **TIP:** Move a Module into the Selected Modules column by dragging, or using the arrow buttons.

3. Once complete, click the **Create** button.

## Task 3: Create an ORDS OAuth Client

1. Select **OAuth Clients** from the **Security Tab**.

    ![selecting OAuth Clients](./images-new/9-oauth-clients-menu.png " ")

2. Then, click the **+ Create OAuth Client** button.

    ![Click the Create OAuth Client button](./images-new/10-create-oauth-client-button.png " ")

3. In the Create OAuth Client slider, enter in the following values and click the **Create** button when complete:

   **Client Definition**
   - **Grant type:** `CLIENT_CRED`
   - **Name:** `my_test_oauth_client`
   - **Description:** Your choice (mandatory field)
   - **Support email:** your choice (mandatory field)
   - **Support URI:** https://www.my-company.com/support (can be fictitious)

     ![Description Field](./images-new/11-create-oauth-client-definition.png " ")

   **Roles**
   - **Roles:** `my.test.role` (or your unique role, if it differs)

       ![choose-roles-tB](./images-new/12-create-oauth-client-roles.png " ")

   **Privileges**
   - **Roles:** `my.test.role` (or your unique role, if it differs)

       ![choose-ouath-privs](./images-new/13-create-oauth-client-privs.png " ")

## Task 4: Testing the OAuth2.0 client

1. After clicking **Create**, a Client Secret modal will appear. Copy this value to your clipboard or a text editor. 

     > **NOTE:** If you click OK prior to copying, you can also Rotate in a new Client Secret value.

     ![Copy my client secret](./images-new/14-my-oauth-client-secret.png " ")

     ![Rotate in new secret](./images-new/15-mistake-rotate-secret.png " ")

2. You will next need to copy your Client ID.

    ![Client ID value](./images-new/16-copy-client-id-value.png " ")

3. You will first request an Access token from the ORDS OAuth2.0 `/token` endpoint. It is located at the following URL, where `server.com` is the location of your database server. This example assumes your schema is also `ords101`:

  ```http
  <copy>https://[MY ADB's OCI]-[My ADB Name].adb.[My-Region].oraclecloudapps.com/ords/ords101/oauth/token</copy>
  ```

3. The **Create OAuth Client** slider will emerge from the right of the page. 

    ![Create OAuth Client slider](./images/create-oauth-client-slider.png)

4. In this form we first need to name our OAuth Client. Enter **oauthclient** into the **Name** field. 

    ````na
    <copy>oauthclient</copy>
    ````

    ![Name Field](./images/oauth-client-name-field.png)

5. Next we can provide a description. We'll use **Security on my REST Service** as a value in the **Description Field**.

    ````na
    <copy>Security on my REST Service</copy>
    ````

    ![Description Field](./images/oauth-client-description-field.png)


## Task 4: Obtain a Bearer Token for accessing a secure REST Endpoint

1. Before we secure the REST endpoint, we need to obtain a token to pass to the secured REST service once its enabled. To obtain this token, we can click the pop out menu icon ![pop out menu icon](./images/three-dot-pop.png) on our OAuth tile and select **Get Bearer Token**.

    ![click the pop out menu icon on our OAuth tile and select Get Bearer Token](./images/get-bearer-token-for-oauth-client.png)

2. The OAuth Token modal will provide the token text in the **Current Token** field. You can use the copy icon ![copy icon](./images/copy-copy.png) to copy this token text. Save it to a text document or notes application as you'll need it when calling the secured REST service. The modal will also provide us with a cURL command to obtain a token should we need to include it in our applications.

    ![Click the copy icon to save the Token Text](./images/click-copy-icon-to-copy-token-text.png)

    Left click the **OK** button when you are done getting and saving the token text.

    ![Left click the OK button](./images/click-ok-when-finished-in-oauth-slider.png)

3. Next, we'll secure the REST service. It is in fact *already* secure. When we created the OAuth client with the role, the modules we protected were secured. Test this by running a previously unsecure REST API. (**NOTE: your URL hostname will be different than the below command**)

    Remember in the last lab, we created a REST API for our bizlogic? Let's take that cURL command again...

    ```sh
    <copy>curl --location --request POST \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": "" 
    }'</copy>
    ```

   ...and after running this command again, using the Oracle Cloud Infrastructure Cloud Shell, the following response will be returned:

    ``` json
    <copy>
    >{
        "code": "Unauthorized",
        "message": "Unauthorized",
        "type": "tag:oracle.com,2020:error/Unauthorized",
        "instance": "tag:oracle.com,2020:ecid/8576f44b797d6adfbe7b21e3718bf3b6"
    }%  
    </copy>
    ```

    We are not authorized to use this REST endpoint any longer.

4. To get this REST API working again, we need to add **--header 'Authorization: Bearer VALUE'** to our cURL command. The **VALUE** will be taken from the token text we saved from earlier. (**NOTE: your URL hostname will be different than the below command**)

    We can add this to our cURL command as follows:

    ```sh
    <copy>curl -X POST --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": "" 
    }'</copy>
    ```

5. Now using the Oracle Cloud Infrastructure Cloud Shell and your new cURL command with the **--header 'Authorization: Bearer VALUE'** section added with your token text, run the new cURL command. (**NOTE: your URL hostname will be different than the below command**)

    ```sn
    <copy>curl -X POST --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": ""
    }'</copy>
    ```

    We now see a value from the REST API is returned.

    ```sh
    <copy>
    {"output":8204}% 
    </copy>
    ```

6. We can also use this on our other REST API that takes in a value and returns a report. (**NOTE: your URL hostname will be different than the below command**)

    The endpoint for that REST API was:

    ```html
    <copy>https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/<VALUE></copy>
    ```

    So we can try out the following (**NOTE: your URL hostname will be different than the below command**):

    ```sh
    <copy>curl -X GET  'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1'</copy>
    ```

    and as expected, we get **Unauthorized**.

7. Now lets add the token (**--header 'Authorization: Bearer VALUE'**) to this command. (**NOTE: your URL hostname will be different than the below command**)

    ```sh
    <copy>curl -X GET --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' 'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1'</copy>
    ```

    and we see the our expected results

    ```sh
    <copy>
    {"items":[{"col1":"798812df","col2":"a1","col3":"4166997"},{"col1":"59fd433c","col2":"a1","col3":"32470891"},{"col1":"6c1298ef","col2":"a1",
    "col3":"506747"},{"col1":"243f5660","col2":"a1","col3":"87300261"},{"col1":"f62af3d4","col2":"a1","col3":"31094545"},{"col1":"af2fc686","col2":"a1",
    "col3":"48206518"},{"col1":"9d4f725e","col2":"a1","col3":"36224185"},{"col1":"041d6b03","col2":"a1","col3":"23890702"},{"col1":"f8c87baa","col2":"a1",
    "col3":"852530"},{"col1":"d98f3e5b","col2":"a1","col3":"9864895"},{"col1":"5cbb6ddc","col2":"a1","col3":"60428923"},{"col1":"474c024a","col2":"a1",
    "col3":"85183686"},{"col1":"a0707a73","col2":"a1","col3":"167176502"},{"col1":"3447e214","col2":"a1","col3":"110333373"},{"col1":"69face01",
    "col2":"a1","col3":"18449519"},{"col1":"9198731a","col2":"a1","col3":"150740437"},{"col1":"55789f0a","col2":"a1","col3":"119272860"},
    {"col1":"03801afd","col2":"a1","col3":"75179648"},{"col1":"dbdf5867","col2":"a1","col3":"91475805"},{"col1":"93adc64d","col2":"a1","col3":"39287205"},
    {"col1":"2b130ef8","col2":"a1","col3":"206753925"},{"col1":"1f6bec10","col2":"a1","col3":"17745238"},{"col1":"81f46a8d","col2":"a1","col3":"54692392"}
    ,{"col1":"2ebd5ecb","col2":"a1","col3":"94437756"},{"col1":"4d514c12","col2":"a1","col3":"145885382"}],"hasMore":true,"limit":25,"offset":0,
    "count":25,"links":[{"rel":"self","href":"https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1"},
    {"rel":"describedby","href":"https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/metadata-catalog/api/sqlreport/item"},
    {"rel":"first","href":"https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1"},{"rel":"next",
    "href":"https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1?offset=25"}]}% 
    </copy>
    ```

8. In this lab, you secured your custom REST APIs with OAuth2 authentication.

You may now [proceed to the next lab](#next).

## Acknowledgements

### Author

- Jeff Smith, Distinguished Product Manager
- Chris Hoina, Senior Product Manager

### Last Updated By/Date

- Chris Hoina, September 2023
