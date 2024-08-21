# REST-enable tables and add business logic

## Introduction

In this lab, you will use Database Actions and the REST Workshop to turn a PL/SQL procedure and a SQL statement into REST APIs.

Estimated Lab Time: 20 minutes

Watch the video below for a quick walk-through of the lab.
[REST-enable tables and add business logic](videohub:1_y8l03s43)

### Objectives

- Publish REST API using Custom SQL
- Publish REST API using stored PL/SQL procedure
- Explore the OpenAPI View

### Prerequisites

- The following lab requires an [Oracle Cloud account](https://www.oracle.com/cloud/free/). You may use your own cloud account, a cloud account that you obtained through a trial, or a training account whose details were given to you by an Oracle instructor.

- This lab assumes you have completed all previous Labs.

## Task 1: REST Enable a SQL Statement

1. Navigate to the **Database Actions Menu** in the upper left of the page and select **REST**.

   ![DB Actions Menus, choose REST](./images/choose-rest-db-actions-menu.png " ")

2. Once on the **REST page**, use the upper tab bar to select **Modules**.

    ![REST Tab Menu, choose Modules](./images/choose-modules-actions-menu.png " ")

3. On the Modules page, left click the **+Create Module** button in the upper right.

    ![Left click the + Create Modules button](./images/create-module-action.png " ")

4. The **Create Module** slider appears from the right of the page.

    ![Create Modules slider](./images/create-new-module-slider.png " ")

5. Using the **Create Module** slider, enter the following Module name: `com.oracle.livelab.api`

    ```sh
    <copy>com.oracle.livelab.api</copy>
    ```

    <details>
    <summary>*About Resource Modules*</summary>

    A module is an organizational unit used to group related resource templates. Templates will have handlers, which are responsible for providing the logic required to service a specific HTTP method (e.g., GET, POST, PUT, DELETE, UPDATE, etc.).

    </details>

    ![Create Modules slider](./images/module-name-field.png " ")

6. Enter **/api/** in the **base path field**:

    ```sh
    <copy>/api/</copy>
    ```

    ![Create Modules slider](./images/base-path-field.png " ")

7. Select **Not Protected** from the **Protected By Privilege** dropdown list.

    ![Protected By Privilege** select list](./images/setting-privileges-field.png " ")

8. Once complete (**your URL hostname will be different than the below image**), click the **Create** button.

    ![Create Modules slider](./images/create-module-submit.png " ")

    > **INFO:** Here you can toggle "Show Code" to review what module creation might look like if it were performed manually.
    >
    > ![Toggle Show Code to review what is happening under the covers](./images/toggle-show-code-option.png " ")

9. Next we'll create a **Template** for our newly created module. Begin by clicking the **+ Create Template** button on the right side of the page.

    ![Left click the + Create Template button](./images/create-template-action.png " ")

10. The **Create Template** slider will appear. Here we will create the endpoint, or URL location, for our REST enabled SQL statement. This statement will expect a value. In the **URI Template** template field, enter:

    ```sh
    <copy>sqlreport/:id
    </copy>
    ```  

    <details>
    <summary>*What does the **`/:id`** in **`sqlreport/:id`** mean?*</summary>

    This is called a "Route Pattern." You can use route patterns for required parameters in the URI to specify parameters for REST requests such as the GET method (which does not have a body) and in other special cases.

    **Want to learn more?** Read the full specification for ORDS Route Pattern syntax [here](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.2/ordjv/doc-files/route-patterns.html).
    </details>

    ![URI Template field](./images/enter-uri-template-field.png " ")  

11. When complete (**your URL hostname will be different than the below image**), click the **Create** button.

    ![Create Modules slider with all info, left click create](./images/create-template-finish.png " ")

12. Next we will create the **Handler**; which contains the actual SQL statement. Click the **+ Create Handler** button.

    ![Left click the Create Handler button](./images/create-handler-action.png " ")

13. The **Create Handler** appears from the right of the page.

    ![Create Handler slider](./images/create-handler-slider.png " ")

14. Enter **select * from csv_data where col2 = :id** in the **Source** section of the **Create Handler** slider:

    ```sh
    <copy>select * from csv_data where col2 = :id</copy>
    ```

    ![Source Field](./images/adding-source-field.png " ")

15. When complete (**your URL hostname will be different than the below image**), click the **Create** button.

    ![Create Handler slider with all info, left click create](./images/create-handler-final-action.png " ")

16. We can test our Handler on the Template page. Click the **Execute** button in the **Source** section of the page.

    ![Execute button in source section of the page](./images/execute-button-in-source.png " ")

17. After clicking the **execute** button a **Bind Variables** modal will appear. Enter **a1** for the value in **id field** and then click **OK**.

    ![Bind Variables modal](./images/bind-variable-modal.png " ")

18. You can see the results of the query just below the **Source** section. (You may need to scroll the page down):

    ![Source query results](./images/source-query-results.png " ")

19. We can also test this endpoint in a browser. Click the pop out button.

    ![pop out icon in the Template region on the top of the page](./images/pop-out-icon-template-region.png " ")

20. In the new browser tab/window with the REST endpoint URL replace the :id with a1 and submit the URL..

    ![URL with bind variable](./images/url-with-bind-variable.png " ")

    ![submitted URL and working REST service](./images/updated-url-with-bind-variable.png " ")

## Task 2: REST Enable Business Logic (PL/SQL procedure)

1. Next, we'll REST enable our business logic, or PL/SQL procedure. Click `com.oracle.livelab.api` found in the Database Actions breadcrumbs.

    ![Database Actions breadcrumbs](./images/db-actions-breadcrumbs.png " ")

2. Next click the **+ Create Template** button on the right side of the page.

    ![Left click the + Create Template button](./images/create-template-action.png " ")

3. The **Create Template** appears from the right of the page.

    ![Create Template slider](./images/create-template-slider.png " ")

4. In the **URI Template** template field, enter `bizlogic`

    ```sh
    <copy>bizlogic</copy>
    ```

    ![URI Template field](./images/uri-template-field.png " ")

5. When complete (**your URL hostname will be different than the below image**), click the **Create** button.

    ![Create Template slider with all info, left click create](./images/creat-template-finish.png " ")

6. Click the **+ Create Handler** button.

    ![Left click the + Create Handler button](./images/create-handler-bizlogic.png " ")

7. Change the **Method** from `GET` to `POST` since we are *submitting* a value to the REST Service. Use the dropdown in the **Method** field to select **POST**.

    ![Selecting POST using the dropdown in the Method field](./images/select-post-for-handler.png " ")

    > Upon changing the **Method** to post, we see the **Source Type** change to PL/SQL.

8. Enter the following PL/SQL into the **Source** field:

    ```sql
    <copy>
    BEGIN
        return_count(p_input => :id, p_output => :output);
    end;
    </copy>
    ```

    ![Create Handler slider](./images/source-entered-in-handler-slider.png " ")

9. When complete (**your URL hostname will be different than the below image**), click the **Create** button.

    ![Create Handler slider with all info, left click create](./images/create-final-handler-slider.png " ")

10. Next we'll create an output parameter so we can return a result.

    > 💡 **NOTE:** We should expect the count or rows where the passed in value is equal to the values in col2 in our table.*

11. Under the **Source** area, locate the **+ Create Parameter** button. Click the **+ Create Parameter** button.

    ![Left click the + Create Parameter button](./images/create-parameter-button.png " ")

12. The **Create Parameter** slider will appear.

    ![Create Parameter slider](./images/create-parameter-slider.png " ")

13. For the **Parameter Name** field and the **Bind Variable Name** field, enter **output**

    ```sh
    <copy>output</copy>
    ```

    ![Create Parameter name field](./images/create-parameter-input-fields.png " ")

14. Select `Response` from the **Source Type** dropdown field.

    ![Source Type field](./images/parameter-source-type.png)

15. Select `INT` for the **Parameter Type** field (recall, we are returning a number, or integer).

    ![Parameter Type field](./images/parameter-parameter-type-field.png " ")

16. Choose `Output` as the **Access Method**.

    ![Access Method field](./images/parameter-access-method-field.png " ")

17. When complete (**your URL hostname will be different than the below image**), click the **Create** button.

    ![Create Parameter slider with all info, left click create](./images/final-create-parameter-action.png " ")

18. You will see the newly created parameter in the parameters table on the bottom of the page.

    ![Parameter created in report](./images/parameter-in-report-table.png " ")

## Task 3: Test an ORDS APIs

1. Next we will test our API. Click **bizlogic** from the Database Actions breadcrumbs.

    ![bizlogic breadcrumb](./images/bizlogic-breadcrum-action.png " ")

2. Click the kebab menu icon ![popout menu icon](./images/pop-menu.png " ") on the **bizlogic POST tile**. Then select **Get cURL command**.

    ![selecting Get cURL command](./images/select-bizlogic-handler-curl-command.png " ")

3. The cURL Command modal appears:

    ![cURL Command modal](./images/curl-command-modal-bizlogic.png " ")

    > 💡 Choose the appropriate cURL command for your environment!
    > ![cURL Command reminder](./images/curl-command-reminder.png " ")

4. Click the `Substitutions` icon, a modal will appear.

    ![Substitutions icon](images/substitutions-icon-for-bizlogic.png " ")

5. Enter `a1` into the **id** field, and place a ✔️ in the `Null` option for the `Output` field. Then click `OK`.

    ![Substitutions modal](images/adding-substitution-value-null-output.png " ")

6. Copy the cURL command with the added Substitution value.

    ![Copied cURL command](./images/copied-curl-command-bizlogic.png " ")

7. Then, using the Oracle Cloud Infrastructure Cloud Shell, paste and run the cURL command to confirm that the count is returned as the output variable.

    ```sh
    <copy>curl -X POST \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": "" 
    }'</copy>
    ```

    ![Cloud shell and cURL](./images/curl-command-in-cloud-shell.png " ")

    > You can test other values by changing the id variable. Valid combinations are:
    >
    >| Variable position | Valid characters | Case      |
    >| ----------------- | ---------------- | --------- |
    >| First character   | `a` through `f`  | lower-case|
    >| Second character  | `1` through `9`  | n/a       |
    >
    > *Some valid examples are: a1, e9, d3, b6*

## Task 4: Explore the OpenAPI View created by ORDS

1. Return to the Module's main page. This can be done by clicking the module's name in the breadcrumbs in the upper left of the page.

    ![breadcrumbs in the upper left of the page](./images/return-to-main-with-breadcrumb.png " ")

2. Click the the kebab icon ![pop out icon](./images/pop-menu.png " ") in the Module region and select **OpenAPI View**.

    ![The pop out icon and select OpenAPI View](./images/open-api-select-module.png " ")

3. The OpenAPI View page displays your REST services as a Swagger UI implementation.

    ![OpenAPI View](./images/open-api-as-swagger-view.png " ")

    You can explore the APIs you created and try them out *directly* in the browser window.

    ![OpenAPI explore](./images/explore-apis-in-open-api-view.png " ")

    You can also export this page as an OpenAPI doc for use in other tools and services using the pop out icon. ![pop out icon](./images/pop-menu.png) Select **Export Module** then **OpenAPI**.

    ![OpenAPI doc export](./images/export-open-apis-action.png " ")

    **An example of what the OpenAPI export will look like.**

    ![OpenAPI example export](./images/open-api-example-export.png " ")

4. In this lab, you published a REST API using custom SQL to accept an input as well as published a REST API using a stored PL/SQL procedure.

You may now [proceed to the next lab](#next).

## Acknowledgements

### Author

- Jeff Smith, Distinguished Product Manager
- Chris Hoina, Senior Product Manager

### Last Updated By/Date

- Chris Hoina, May 2024