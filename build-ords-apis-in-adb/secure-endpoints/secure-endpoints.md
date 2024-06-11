# Secure REST-enabled endpoints

## Introduction

In this lab you secure the REST endpoints created in the previous lab.

Estimated Lab Time: 10 minutes

Watch the video below for a quick walk-through of the lab.
[Secure REST-enabled endpoints](videohub:1_6ox6rq26)

### Objectives

- Create an OAuth2 token
- Secure REST endpoints
- Test the secure end-to-end flow

### Prerequisites

- The following lab requires an [Oracle Cloud account](https://www.oracle.com/cloud/free/). You may use your own cloud account, a cloud account that you obtained through a trial, or a training account whose details were given to you by an Oracle instructor.

- This lab assumes you have completed all previous Labs.

## Task 1: Create a Role to secure a REST Endpoint

1. Navigate to the **REST Database Actions** page. You may do this by navigating to the **Database Actions menu** in the upper left of the page. Choose **REST** in the Development list.

    ![Database Actions Menu, Development then REST](./images/select-rest-dbactions-menu.png " ")

2. Next, select the **Security Tab**, then **Roles**.

    ![On the Top Menu Bar, click Security Tab then select Roles](./images/select-roles-security-tab.png " ")

3. From the **Roles** page, click the **+ Create Role** button.

    ![Click the Create Role button](./images/create-roll-button.png " ")

4. A **Role Definition** modal will appear. Use **oracle.livelabs.role.admin** for the Role Name.

    ![Role Definition Modal](./images/role-definition-role-name-field.png " ")

     ```sh
    <copy>oracle.livelabs.role.admin</copy>
    ```

    ![Role Name Field](./images/role-name-field.png " ")

5. When complete, click the **Create** button.

    ![Click the Create button](./images/create-role-action.png " ")

## Task 2: Create a Privilege to secure a REST Endpoint

1. Next, we'll assign **Privileges** to this role. From the **Security** menu, select **Privileges**.

    ![On the Top Menu Bar, click Security Tab then select privileges](./images/select-privilege-security-tab.png " ")

2. Click the **+ Create Privilege** button.

    ![Click the Create Privilege button](./images/create-privilege-button.png " ")

3. Enter `Livelabs REST Privilege` in the **Create Privilege** Label field.

    ![Create Privilege slider](./images/create-privilege-slider.png " ")

     ```sh
    <copy>Livelabs REST Privilege</copy>
    ```

    ![Label Field](./images/privilege-label-input.png " ")

4. Use `oracle.livelabs.privilege.admin` for the Name field.

     ```sh
    <copy>oracle.livelabs.privilege.admin</copy>
    ```

    ![Name Field](./images/privilege-name-input-field.png " ")

5. In the Description field enter `Livelabs Privilege for Business Logic REST Services`.

     ```sh
    <copy>Livelabs Privilege for Business Logic REST Services</copy>
    ```

    ![Description Field](./images/privilege-description-input-field.png " ")

6. When complete, click the **Roles** tab near the top of the slider.

    ![Completed Create Privilege** slider](./images/completed-created-privilege-slider.png " ")

    ![Roles tab on the top of the slider](./images/create-privilege-roles-tab.png " ")

7. On the **Roles** tab, use the shuttle to move the `oracle.livelabs.role.admin` role to the right column. Either double click the role or highlight it then click the single arrow (that points to the right column).

    ![Roles shuttle](./images/roles-shuttle-window.png " ")

    > 💡 **NOTE:** Privileges and roles were automatically created (oracle.dbtools.role.autorest.ADMIN.CSV_DATA) when the table is auto-REST enabled.

8. Once the role has been moved, click the **Protected Modules** tab near the top of the **Create Privilege** slider.

    ![Protected Modules tab](./images/protected-modules-tab-option.png " ")

9. Move the `com.oracle.livelab.api` privilege from the left column to the right. When complete, click the **Create** button on the **Create Privilege** slider.

    ![Protected Modules shuttle](./images/protected-modules-shuttle.png " ")

    ![click the Create button on the Create Privilege slider](./images/click-create-for-privilege.png " ")

## Task 3: Create an OAuth Client for secure REST Endpoint

1. Select **OAuth Clients** from the **Security Tab**.

    ![On the Top Menu Bar, click Security Tab then select OAuth Clients](./images/oauth-client-security-tab.png " ")

2. Next, click the **+ Create OAuth Client** button.

    ![Click the Create OAuth Client button](./images/oauth-client-create-button.png " ")

3. The **Create OAuth Client** slider will appear.

    ![Create OAuth Client slider](./images/create-oauth-client-slider.png " ")

4. Enter `oauthclient` into the **Name** field.

    ```sh
    <copy>oauthclient</copy>
    ```

    ![Name Field](./images/oauth-client-name-field.png " ")

5. Enter `Security on my REST Service` in the **Description Field**.

    ```sh
    <copy>Security on my REST Service</copy>
    ```

    ![Description Field](./images/oauth-client-description-field.png " ")

6. The **Support URI** is a required field. This is where a client will be redirected to should an authorization error or failure occur. For this lab, use `https://www.oracle.com/rest/`

     ```sh
    <copy>https://www.oracle.com/rest/</copy>
    ```

    ![Support URI Field](./images/oauth-client-support-uri.png " ")

7. You may enter your email address or use `support@support.com` in the **Support Email** field.

     ```sh
    <copy>support@support.com</copy>
    ```

    ![Support Email Field](./images/support-email-field.png " ")

8. Once complete, left click the **Roles Tab** on the top of the Create OAuth Client slider.

    ![Completed OAuth Slider](./images/completed-oauth-slider.png " ")

    ![Roles Tab on the OAuth Client Slide Out Panel](./images/roles-tab-oauth-slider.png " ")

9. Move the `oracle.livelabs.role.admin` role to the right column.

    ![Use the shuttle to move the oracle.livelabs.role.admin role to the right side](./images/oauth-shuttle.png " ")

10. Once complete, click the **Create** button.

    ![left click the create button](./images/oauth-create-button-action.png " ")

11. The newly created **OAuth Client** tile will appear on the OAuth Clients page.

    ![OAuth Client tile on the OAuth Clients page](./images/oauth-clients-page.png " ")

## Task 4: Obtain a Bearer Token for accessing a secure REST Endpoint

1. Before accessing an OAuth-protected REST endpoint, you must first obtain a token to pass to the secured REST service for authentication. To obtain this token, we can click the kebab menu icon ![pop out menu icon](./images/three-dot-pop.png " ") on our OAuth tile and select **Get Bearer Token**.

    ![click the pop out menu icon on our OAuth tile and select Get Bearer Token](./images/get-bearer-token-for-oauth-client.png " ")

2. The OAuth Token modal will provide the token text in the **Current Token** field. You can use the copy icon ![copy icon](./images/copy-copy.png) to copy this token text. Save this to a text document or notes application. The modal will also provide us with a cURL command to obtain a token should we need to include it in our applications.

    ![Click the copy icon to save the Token Text](./images/click-copy-icon-to-copy-token-text.png " ")

    Click **OK** when you havve copied the cURL command.

    ![Left click the OK button](./images/click-ok-when-finished-in-oauth-slider.png " ")

3. Next, we'll test the secure REST service . Recall in the previous Lab lab, where we created a REST API for our `bizlogic`? Attempt to access this REST endpoint with the following cURL command (**your URL hostname will be different than the below command**):

    ```sh
    <copy>curl --location --request POST \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": "" 
    }'</copy>
    ```

4. Since the endpoint is now secure, you should see the following response:

    ```sh
    <copy>
    >{
        "code": "Unauthorized",
        "message": "Unauthorized",
        "type": "tag:oracle.com,2020:error/Unauthorized",
        "instance": "tag:oracle.com,2020:ecid/8576f44b797d6adfbe7b21e3718bf3b6"
    }%</copy>
    ```

5. In order to access this REST API, you must include a `--header 'Authorization: Bearer [The Access Token value]'` header to the cURL command. The `Access Token value` is the same Access Token you saved in Step 2( **your URL hostname will be different than the below command**). Your updated cURL command should resemble the following:

    ```sh
    <copy>curl -X POST --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": "" 
    }'</copy>
    ```

6. Using the Cloud Shell, or local environment, execute *your* version of the cURL command (**your URL hostname and Bearer Token will differ from the one below**)

    ```sh
    <copy>curl -X POST --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": ""
    }'</copy>
    ```

    You should see a similar value, returned from the REST API is returned.

    ```sh
    <copy>
    {"output":8204}%</copy>
    ```

7. We can also apply this Access Token to the other API we created in the previous Lab (**your URL hostname will differ from the one below**)

8. With an endpoint similar to the one below, issuing an unauthenticated cURL request will result in an `Unauthorized` response.

    ```sh
    <copy>https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/<VALUE></copy>
    ```

9. This time, execute a cURL request (**using your URL hostname**) with the Access Token from the previous test (i.e., `--header 'Authorization: Bearer [VALUE]`).

    ```sh
    <copy>curl -X GET --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' 'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1'</copy>
    ```

10. Your response should appear, much like the one below:

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
    "href":"https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1?offset=25"}]}%</copy>
    ```

11. In this lab, you secured your custom REST APIs with OAuth2 authentication.

You may now [proceed to the next lab](#next).

## Acknowledgements

### Author

- Jeff Smith, Distinguished Product Manager
- Chris Hoina, Senior Product Manager

## Last Updated By/Date

- Chris Hoina, May 2024
