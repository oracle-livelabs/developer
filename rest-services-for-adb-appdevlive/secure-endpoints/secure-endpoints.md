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

**If this is your first time accessing the REST Workshop, you will be presented with a guided tour. Complete the tour or click the `X` in any tour popup window to quit the tour.**

1. If not there already, navigate to the **REST Database Actions** page. Do this by navigating to the **Database Actions menu** in the upper left of the page. Choose **REST** in the Development list.

    ![Database Actions Menu, Development then REST](./images/select-rest-dbactions-menu.png)

2. Next, select the **Security Tab** on the top of the page and then select **Roles**.

    ![On the Top Menu Bar, click Security Tab then select Roles](./images/select-roles-security-tab.png)


3. Once on the **Roles** page, left click the **+ Create Role** button in the upper right of the page.

    ![Click the Create Role button](./images/create-roll-button.png)

4. The **Role Definition** modal will appear.

    ![Role Definition Modal](./images/role-definition-role-name-field.png)

5.  Use the **Role Name** field to name our role. We'll use **oracle.livelabs.role.admin**.

     ````
    <copy>oracle.livelabs.role.admin</copy>
    ````

    ![Role Name Field](./images/role-name-field.png)

6.  When your **Role Definition** modal looks like the below image, click the **Create** button.

    ![Click the Create button](./images/create-role-action.png)

## Task 2: Create a Privilege to secure a REST Endpoint

1. We'll now assign **Privileges** to this role. Again using the REST Tab Bar on the top of the page, left click **Security** and select **Privileges**

    ![On the Top Menu Bar, click Security Tab then select privileges](./images/select-privilege-security-tab.png)

2. Once on the **Privileges** page, left click the **+ Create Privilege** button in the upper right of the page.

    ![Click the Create Privilege button](./images/create-privilege-button.png)

3. The **Create Privilege** slider appears from the right.

    ![Create Privilege slider](./images/create-privilege-slider.png)

4. In the **Label** field, we'll name this privilege **Livelabs REST Privilege**.

     ````
    <copy>Livelabs REST Privilege</copy>
    ````

    ![Label Field](./images/privilege-label-input.png)

5. For the **Name** field, we can enter this **oracle.livelabs.privilege.admin**.

     ````
    <copy>oracle.livelabs.privilege.admin</copy>
    ````

    ![Name Field](./images/privilege-name-input-field.png)

6. Next, in the **Description** field, enter **Livelabs Privilege for Business Logic REST Services**.

     ````
    <copy>Livelabs Privilege for Business Logic REST Services</copy>
    ````

    ![Description Field](./images/privilege-description-input-field.png)

7. When your **Create Privilege** slider looks like the following image...

    ![Completed Create Privilege** slider](./images/completed-created-privilege-slider.png)

    ...left click the **Roles** tab on the top of the slider.

    ![Roles tab on the top of the slider](./images/create-privilege-roles-tab.png)

8. On the **Roles** tab, use the shuttle to move (the role we created) **oracle.livelabs.role.admin** to the right side. We can do this by double left clicking the role or by left clicking it and then clicking the single arrow pointing to the right. Ensure the shuttle looks like the below image where **oracle.livelabs.role.admin** is on the right side.

    ![Roles shuttle](./images/roles-shuttle-window.png)

    You can see that when we auto-REST enabled our table, privileges and roles were automatically created for us (oracle.dbtools.role.autorest.ADMIN.CSV_DATA)

9. When the single role has been moved to the right of the shuttle, left click the **Protected Modules** tab on the top of the **Create Privilege** slider.

    ![Protected Modules tab](./images/protected-modules-tab-option.png)

10. We see the module name we created in the previous lab, **com.oracle.livelab.api**, on the **Protected Modules tab**. Like we did with the previous shuttle, move **com.oracle.livelab.api** from the left side to the right side. 

    ![Protected Modules shuttle](./images/protected-modules-shuttle.png)

    When complete, left click the **Create** button on the **Create Privilege** slider.

    ![click the Create button on the Create Privilege slider](./images/click-create-for-privilege.png)

## Task 3: Create an OAuth Client for secure REST Endpoint

1. Next, we'll select the **Security Tab** on the top of the page and then select **OAuth Clients**.

    ![On the Top Menu Bar, click Security Tab then select OAuth Clients](./images/oauth-client-security-tab.png)

2. To create our OAuth client we will secure our REST endpoints. Click the **+ Create OAuth Client** button in the upper right of the page.

    ![Click the Create OAuth Client button](./images/oauth-client-create-button.png)

3. The **Create OAuth Client** slider will emerge from the right of the page. 

    ![Create OAuth Client slider](./images/create-oauth-client-slider.png)

4. In this form we first need to name our OAuth Client. Enter **oauthclient** into the **Name** field. 

    ````
    <copy>oauthclient</copy>
    ````

    ![Name Field](./images/oauth-client-name-field.png)
    
5. Next we can provide a description. We'll use **Security on my REST Service** as a value in the **Description Field**.
    
    ````
    <copy>Security on my REST Service</copy>
    ````

    ![Description Field](./images/oauth-client-description-field.png)

6. The following field, **Support URI**, is where a client will be taken upon an authorization error or failure. For this lab, we will use "https://www.oracle.com/rest/"
    
     ````
    <copy>https://www.oracle.com/rest/</copy>
    ````
    
    ![Support URI Field](./images/oauth-client-support-uri.png)

7. Finally, we need a **support email** for contacting someone. You can enter your email address or use support@support.com in the **Support Email** field of the form.

     ````
    <copy>support@support.com</copy>
    ````

    ![Support Email Field](./images/support-email-field.png)

8. Once your form looks similar to the image below...

    ![Completed OAuth Slider](./images/completed-oauth-slider.png)    
    
    ...left click the **Roles Tab** on the top of the Create OAuth Client slider.

    ![Roles Tab on the OAuth Client Slide Out Panel](./images/roles-tab-oauth-slider.png)

9. Use the **shuttle** to move the **oracle.livelabs.role.admin** role to the right side.

    ![Use the shuttle to move the oracle.livelabs.role.admin role to the right side](./images/oauth-shuttle.png)

10. When your **Roles Tab** looks like the below image in the  Create OAuth Client slider, left click the **Create** button.

    ![left click the create button](./images/oauth-create-button-action.png)

11. You'll now see the newly created **OAuth Client** tile on the OAuth Clients page.

    ![OAuth Client tile on the OAuth Clients page](./images/oauth-clients-page.png)

## Task 4: Obtain a Bearer Token for accessing a secure REST Endpoint

1. Before we secure the REST endpoint, we need to obtain a token to pass to the secured REST service once its enabled. To obtain this token, we can click the pop out menu icon ![pop out menu icon](./images/three-dot-pop.png) on our OAuth tile and select **Get Bearer Token**.

    ![click the pop out menu icon on our OAuth tile and select Get Bearer Token](./images/get-bearer-token-for-oauth-client.png)

2. The OAuth Token modal will provide the token text in the **Current Token** field. You can use the copy icon ![copy icon](./images/copy-copy.png) to copy this token text. Save it to a text document or notes application as you'll need it when calling the secured REST service. The modal will also provide us with a cURL command to obtain a token should we need to include it in our applications.

    ![Click the copy icon to save the Token Text](./images/click-copy-icon-to-copy-token-text.png)

    Left click the **OK** button when you are done getting and saving the token text. 

    ![Left click the OK button](./images/click-ok-when-finished-in-oauth-slider.png)

3. Next, we'll secure the REST service. It is in fact *already* secure. When we created the OAuth client with the role, the modules we protected were secured. Test this by running a previously unsecure REST API. (**NOTE: your URL hostname will be different than the below command**)

    Remember in the last lab, we created a REST API for our bizlogic? Let's take that cURL command again...

    ```
    <copy>curl --location --request POST \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": "" 
    }'</copy>
    ```
   ...and after running this command again, using the Oracle Cloud Infrastructure Cloud Shell, the following response will be returned:

    ```
    >{
        "code": "Unauthorized",
        "message": "Unauthorized",
        "type": "tag:oracle.com,2020:error/Unauthorized",
        "instance": "tag:oracle.com,2020:ecid/8576f44b797d6adfbe7b21e3718bf3b6"
    }%  
    ```
    We are not authorized to use this REST endpoint any longer.

4. To get this REST API working again, we need to add **--header 'Authorization: Bearer VALUE'** to our cURL command. The **VALUE** will be taken from the token text we saved from earlier. (**NOTE: your URL hostname will be different than the below command**)

    We can add this to our cURL command as follows:

    ```
    <copy>curl -X POST --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": "" 
    }'</copy>
    ```    

5. Now using the Oracle Cloud Infrastructure Cloud Shell and your new cURL command with the **--header 'Authorization: Bearer VALUE'** section added with your token text, run the new cURL command. (**NOTE: your URL hostname will be different than the below command**)

    ```
    <copy>curl -X POST --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": ""
    }'</copy>
    ``` 

    We now see a value from the REST API is returned.
    ```
    {"output":8204}% 
    ```
6. We can also use this on our other REST API that takes in a value and returns a report. (**NOTE: your URL hostname will be different than the below command**)

    The endpoint for that REST API was:

    ```
    <copy>https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/<VALUE></copy>
    ```

    So we can try out the following (**NOTE: your URL hostname will be different than the below command**):
    
    ```
    <copy>curl -X GET  'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1'</copy>
    ```

    and as expected, we get **Unauthorized**.

7. Now lets add the token (**--header 'Authorization: Bearer VALUE'**) to this command. (**NOTE: your URL hostname will be different than the below command**)

    ```
    <copy>curl -X GET --header 'Authorization: Bearer tW-AM_cDQu0l8oAsh707vw' 'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/sqlreport/a1'</copy>
    ```

    and we see the our expected results

    ```
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
    ```

8. In this lab, you secured your custom REST APIs with OAuth2 authentication.

You may now [proceed to the next lab](#next).

## Acknowledgements

 - **Author** 
    - Jeff Smith, Distinguished Product Manager
    - Chris Hoina, Senior Product Manager 
    - Brian Spendolini 
 - **Last Updated By/Date** 
    - Chris Hoina, August 2022

