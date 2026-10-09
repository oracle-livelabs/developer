# Secure REST-enabled endpoints

## Introduction

In this lab you secure the REST endpoints created in the previous lab, and test ORDS's built-in OAuth2.0 security with the Client Credentials grant type.

Estimated Lab Time: 10 minutes

### Objectives

- Secure REST endpoints
- Create an OAuth2 token
- Test the secure end-to-end flow

### Prerequisites

<if type="tenancy">
- The following lab requires an [Oracle Cloud account](https://www.oracle.com/cloud/free/). You may use your own cloud account, a cloud account obtained through a trial, or a training account whose details were given to you by an Oracle instructor.
</if>
- This lab uses the command line application cURL for testing APIs; some familiarity is suggested.
- This lab assumes you have completed all previous Labs. 

## Task 1: Create a Role

1. From the REST Workshop, select **Roles** from the **Security** dropdown menu.

    ![Roles from the security menu](./images/1-roles-from-security-menu.png " ")

2. Next, click the **+ Create Role** button.

    ![click create role button](./images/2-create-role-button.png " ")

3. In the Role Definition modal, enter in a **Role Name**, such as: `my.test.role`, then click **Create**.

    ![The role definition modal](./images/3-role-definition-modal.png " ")

## Task 2: Create a Privilege

1. Next, you'll create a Privilege. Select **Privileges** from the **Security** dropdown menu. 

    ![Selecting privileges from security menu](./images/4-select-privileges-option.png " ")

2. Click the **+ Create Privilege** button, and enter in values for this privilege. 

    ![Create privilege button](./images/5-create-privilege-button.png " ")

    To better follow along, choose values similar to the examples: 

    For **Privilege Definition** choose:

    - **Label:** `my.test.priv`
    - **Name:** `my.test.priv`
    - **Description:** `my.test.priv` (You can alter this as needed)
    - **Comments:** optional 

       ![create-priv-priv-definition](./images/6-create-priv-priv-definition.png " ")

3. Click the **Roles** tab, and use the following:
    
    - Move the `my.test.role` (i.e., the role you created in Task 1 of this Lab) from the **Available Roles** column to the **Selected Roles** column.

        ![create-priv-roles](./images/7-create-priv-roles.png " ")

4. Click the **Protected Modules** tab and move `records.module` from the **Available Modules** column to the **Selected Modules** column.

    ![create-priv-selected-modules](./images/8-create-priv-protected-modules.png " ")

       > **TIP:** Move a Module into the Selected Modules column by dragging, or using the arrow buttons.

3. Once complete, click the **Create** button. 

4. Your `records.module` is now protected by the `my.test.priv` and the `my.test.role`. 

5. In the next task, you will create an OAuth client.

## Task 3: Create an ORDS OAuth Client

1. Select **OAuth Clients** from the **Security Tab**.

    ![selecting OAuth Clients](./images/9-oauth-clients-menu.png " ")

2. Then, click the **+ Create OAuth Client** button.

    ![Click the Create OAuth Client button](./images/10-create-oauth-client-button.png " ")

3. In the Create OAuth Client slider, enter in the following values:

    **Client Definition**
    - **Grant type:** `CLIENT_CRED`
    - **Name:** `my_test_oauth_client`
    - **Description:** Your choice (mandatory field)
    - **Support email:** your choice (mandatory field)
    - **Support URI:** https://www.my-company.com/support (can be fictitious)

     ![Description Field](./images/11-create-oauth-client-definition.png " ")

4. Click the **Roles** tab, and select the previously created role: `my.test.role` (or your unique role, if it differs).

    ![choose-roles-tB](./images/12-create-oauth-client-roles.png " ")

5. Next, select the **Privileges** tab. Choose the privilege: `my.test.priv` (or your unique privilege, if it differs).

    ![choose-ouath-privs](./images/13-create-oauth-client-privs.png " ")

5. Finally, click the **Create** button when complete. 

6. After clicking **Create**, a Client Secret modal will appear. Copy the Secret Client value to your clipboard or a text editor. 

    ![Copy my client secret](./images/14-my-oauth-client-secret.png " ")

    > **NOTE:** If you click OK prior to copying, you can also Rotate in a new Client Secret value.

    > ![Rotate in new secret](./images/15-mistake-rotate-secret.png " ")

## Task 4: Testing the OAuth  protected resource

1. You will first request an Access token from the ORDS OAuth2.0 `/token` endpoint. The simpliest way to retrive this endpoint, along with a fully-formed curl command, is by clicking the OAuth client's kebab menu, then selecting the **Get Bearer Token** menu option. 

    ![select-get-bearer-token](./images/16-select-get-bearer-token.png " ")

2. Next, paste your Client Secret value into the text field and click **Get New Token**. A new token will appear, along with a now complete cURL command. *Select the appropriate shell (i.e., Command Prompt, PowerShell, or Bash)* and copy the complete command.

    ![clicking-get-new-token-to-produce-complete-oauth-curl-command](./images/clicking-get-new-token-to-produce-complete-oauth-curl-command.png " ")

    ![copying-the-new-bearer-token](./images/copying-the-new-bearer-token.png " ")

3. Paste the curl command into your terminal and execute the cURL command. You will receive a valid Access Token. 

    ![curl-command-in-terminal-to-retrieve-valid-token](./images/curl-command-in-terminal-to-retrieve-valid-token.png " ")

4. In this example, you can use the `GET` endpoint that you created in **Lab 2, Task 3: Building an ORDS GET API** as your target endpoint.

    <details><summary>Steps for retrieving the `GET` URI.</summary>

    1. Navigate back to the Modules page.

        ![navigating-back-to-module-page](./images/navigating-back-to-module-page.png " ")

    2. Click on your Resource Module.

        ![clicking-the-module-to-view-template](./images/clicking-the-module-to-view-template.png " ")

    3. Click the kebab menu of the `:dept_id/:is_active?` Template.

        ![clicking-kebab-on-handler-to-reveal-curl-command-option](./images/clicking-kebab-on-handler-to-reveal-curl-command-option.png " ")

    4. Enter in a value for `dept_id`, select the proper terminal for your OS, then copy the command.

        ![entering-in-substitution-value-for-curl-command](./images/entering-in-substitution-value-for-curl-command.png " ")

    </details>

5. In a text editor, add in the Bearer Token you obtained in the previous step for the `Bearer` value. Example: `--header 'Authorization: Bearer [Token Value]'`. Next, remove the `<VALUE>?` placeholder. Copy this new cUrl command.

    ![before-and-after-complete-curl-with-new-bearer-token](./images/before-and-after-complete-curl-with-new-bearer-token.png " ")

6. Paste the new cURL command into a Terminal session, press enter. With a valid Access Tokeny you can now perform a `GET` request on your target endpoint.

    ![response-from-curl-command-from-protected-resource](./images/response-from-curl-command-from-protected-resource.png " ")

12. What you should see is the successful response from your `/ords101/v1/dept_active/:is_active?` endpoint. If you remove the `--header 'Authorization: Bearer [Token Value]'` from a curl command and try again, you'll notice how the request is unauthorized.

    ![unauthorized-curl-command](./images/unauthorized-curl-command.png " ")

13. In this lab, you secured your custom REST APIs with OAuth2 authentication. Congratulations, you've just completed the ORDS 101 Workshop!

You may now [proceed to the next lab](#next).

## Acknowledgements

### Author

- Jeff Smith, Distinguished Product Manager
- Chris Hoina, Lead Principal Product Manager

### Last Updated By/Date

- Chris Hoina, October 2026
