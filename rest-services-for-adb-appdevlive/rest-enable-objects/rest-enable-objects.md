# REST-enable tables and add business logic

## Introduction

In this lab, you will use Database Actions and the REST console to build a REST API using a parameterized PL/SQL procedure and SQL statement. 

Estimated Lab Time: 20 minutes

Watch the video below for a quick walk-through of the lab.
[REST-enable tables and add business logic](videohub:1_y8l03s43)

### Objectives

- Publish REST API using Custom SQL
- Publish REST API using stored PL/SQL procedure
- Explore the OpenAPI View created by ORDS

### Prerequisites

- The following lab requires an [Oracle Cloud account](https://www.oracle.com/cloud/free/). You may use your own cloud account, a cloud account that you obtained through a trial, or a training account whose details were given to you by an Oracle instructor.

- This lab assumes you have completed all previous Labs. 

## Task 1: REST Enable a custom SQL Statement

:bulb: <*If this is your first time accessing the REST Workshop, you will be presented with a guided tour. Complete the tour or click the `X` in any tour popup window to quit the tour.*

1. Start by navigating to the **Database Actions Menu** in the upper left of the page and select **REST**.

    ![DB Actions Menus, choose REST](./images/choose-rest-db-actions-menu.png)

2. Once on the **REST page**, use the upper tab bar to select **Modules**.

    ![REST Tab Menu, choose Modules](./images/choose-modules-actions-menu.png)

3. On the Modules page, left click the **+ Create Module** button in the upper right.

    ![Left click the + Create Modules button](./images/create-module-action.png)

4. The **Create Module** slider appears from the right of the page.

    ![Create Modules slider](./images/create-new-module-slider.png)

5. Using the **Create Module** slider, begin by adding a Module name. Use the following: **com.oracle.livelab.api**

    ````
    <copy>com.oracle.livelab.api</copy>
    ````
    :bulb: *A module is an organizational unit used to group related resource templates. Templates will have handlers, which are responsible for providing the logic required to service a specific HTTP method (e.g., GET, POST, PUT, DELETE, UPDATE, etc.).*

    ![Create Modules slider](./images/module-name-field.png) 

6. For the **Base Path** field, use the default of **/api/**. Enter **/api/** in the **base path field**:

    ````
    <copy>/api/</copy>
    ````

    ![Create Modules slider](./images/base-path-field.png)

    Next, select **Not Protected** from the **Protected By Privilege** dropdown list.

    ![Protected By Privilege** select list](./images/setting-privileges-field.png)

7. When the **Create Module** slider looks like the below image (**NOTE: your URL hostname will be different than the below image**), left click the **Create** button.

    ![Create Modules slider](./images/create-module-submit.png)

    :bulb: *Here you can toggle "Show Code" to review what module creation might look like if it was performed manually.*

    ![Toggle Show Code to review what is happening under the covers](./images/toggle-show-code-option.png)

8. Our module has now been created.

    ![The Modules page](./images/module-overview-page.png) 

    Next we'll create a **Template** for our newly created module. Start by left clicking the **+ Create Template** button on the right side of the page, located directly under the module we just created.

    ![Left click the + Create Template button](./images/create-template-action.png)

9. The **Create Template** slider emerges from the right of the page. 

    ![Create Template slider](./images/create-template-slider.png)
    
    Here we will create the endpoint, or URL location, for our REST enabled SQL Statement. This statement will expect a value.

10. In the **URI Template** template field, enter **sqlreport/:id**

    ````
    <copy>sqlreport/:id</copy>
    ````

    ![URI Template field](./images/enter-uri-template-field.png)

11. When the **URI Template** slider looks like the below image (**NOTE: your URL hostname will be different than the below image**), left click the **Create** button.

    ![Create Modules slider with all info, left click create](./images/create-template-finish.png)

    **Toggle "Show Code" to review what template creation might look like if it was performed manually.**

    ![Toggle Show Code to review what is happening under the covers](./images/show-template-code-toggle.png)


12. Now that the template has been created

    ![Templates Page](./images/template-page-overview.png)

    we need to create the **Handler** that will contain the SQL Statement. Click the **+ Create Handler** button on the right of the page, just below our newly created template.

    ![Left click the + Create Handler button](./images/create-handler-action.png)

13. The **Create Handler** slider comes out of the right of the page. 

    ![Create Handler slider](./images/create-handler-slider.png)

    Here we will enter the SQL used by our REST endpoint.

14. Enter **select * from csv_data where col2 = :id** in the **Source** section of the **Create Handler** slider:

    ````
    <copy>select * from csv_data where col2 = :id</copy>
    ````

    ![Source Field](./images/adding-source-field.png)

    **Toggle "Show Code" to review the code for fields in the GUI.**

    ![Source Field Toggle](images/adding-source-field-code-toggle.png)

15. When the **Create Handler** slider looks like the below image (**NOTE: your URL hostname will be different than the below image**), left click the **Create** button.

    ![Create Handler slider with all info, left click create](./images/create-handler-final-action.png)

16. We can test our Handler on the Template page. Click the **execute** button ![execute query button](./images/execute-button.png) in the **Source** section of the page.

    ![Execute button in source section of the page](./images/execute-button-in-source.png)

17. After clicking the **execute** button ![execute query button](./images/execute-button.png), a **Bind Variables** modal will appear. Enter **a1** for the value in **id field** and then left click **OK** on the modal.

    ![Bind Variables modal](./images/bind-variable-modal.png)

18. You can see the results of the query just below the **Source** section. (You may need to scroll the page down):

    ![Source query results](./images/source-query-results.png)

19. We can try test the REST endpoint by clicking the pop out icon in the Template region on the top of the page.

    ![pop out icon in the Template region on the top of the page](./images/pop-out-icon-template-region.png)

20. In the new browser tab/window with the REST endpoint URL...

    ![URL with bind variable](./images/url-with-bind-variable.png)

    ...replace the :id with a1 and submit the URL.

    ![submitted URL and working REST service](./images/updated-url-with-bind-variable.png)

## Task 2: REST Enable Business Logic (PL/SQL procedure)

1. Next, we'll REST enable our Business Logic, or PL/SQL procedure, created in the previous lab. Begin by left clicking the `com.oracle.livelab.api` Module in the Database Actions breadcrumbs in the upper left of the page.

    ![Database Actions breadcrumbs](./images/db-actions-breadcrumbs.png)

2. We'll again create a new **Template**. Left click the **+ Create Template** button on the right side of the page (located under our Module).

    ![Left click the + Create Template button](./images/create-template-action.png)

3. The **Create Template** appears from the right of the page. 

    ![Create Template slider](./images/create-template-slider.png)
    
4. In the **URI Template** template field, enter `bizlogic`

    ````
    <copy>bizlogic</copy>
    ````

    ![URI Template field](./images/uri-template-field.png)

5. When the **URI Template** slider looks like the below image (**NOTE: your URL hostname will be different than the below image**), left click the **Create** button.

    ![Create Template slider with all info, left click create](./images/creat-template-finish.png)

6. Click the **+ Create Handler** button on the right of the page, located below our newly created Template.

    ![Left click the + Create Handler button](./images/create-handler-bizlogic.png)

7. The **Create Handler** slider appears from the right of the page. 

    ![Create Handler slider](./images/handler-slider-for-bizlogic.png)

8. We need to change the **Method** from `GET` to `POST` since we are <i>submitting</i> a value to the REST Service. Use the dropdown in the **Method** field to select **POST**.

    ![Selecting POST using the dropdown in the Method field](./images/select-post-for-handler.png)

    Upon changing the **Method** to post, we see the **Source Type** change to PL/SQL.

9. Now, in the **Source** field, enter the following PL/SQL:

    ````
    <copy>
    BEGIN
        return_count(p_input => :id, p_output => :output);
    end;
    </copy>
    ````

    ![Create Handler slider](./images/source-entered-in-handler-slider.png)

10. When the **Create Handler** slider looks like the below image (**NOTE: your URL hostname will be different than the below image**), left click the **Create** button.

    ![Create Handler slider with all info, left click create](./images/create-final-handler-slider.png)

11. Next we'll create an output parameter so we can return a result. 
    
    :bulb: *We should expect the count or rows where the passed in value is equal to the values in col2 in our table.*
        
    On the bottom on the bizlogic details page, under the **Source** area, locate the **+ Create Parameter** button. Left click the **+ Create Parameter** button.
   
    ![Left click the + Create Parameter button](./images/create-parameter-button.png)

12. The **Create Parameter** slider appears from the right of the page:

    ![Create Parameter slider](./images/create-parameter-slider.png)

13. For the **Parameter Name** field and the **Bind Variable Name** field, enter **output**

    ````
    <copy>output</copy>
    ````

    ![Create Parameter name field](./images/create-parameter-input-fields.png)

14. For the **Source Type** field, use the dropdown and select **Response**

    ![Source Type field](./images/parameter-source-type.png)

15. For the **Parameter Type** field, use the dropdown and select **INT**. (Remember, we are returning a number)

    ![Parameter Type field](./images/parameter-parameter-type-field.png)

16. Lastly, for the **Access Method**, use the dropdown and select **Output**

    ![Access Method field](./images/parameter-access-method-field.png)

17. When the **Create Parameter** slider looks like the below image (**NOTE: your URL hostname will be different than the below image**), left click the **Create** button.

    ![Create Parameter slider with all info, left click create](./images/final-create-parameter-action.png)

18. You will see the newly created parameter in the parameters table on the bottom of the page.

    ![Parameter created in report](./images/parameter-in-report-table.png)

    We are now ready to test this REST API.

19. Left click **bizlogic** in the Database Actions breadcrumbs in the upper left of the page.

    ![bizlogic breadcrumb](./images/bizlogic-breadcrum-action.png)

20. Now, using the popout menu icon ![popout menu icon](./images/pop-menu.png) on our **bizlogic POST tile**, select **Get cURL command**.

    ![selecting Get cURL command](./images/select-bizlogic-handler-curl-command.png)

21. The cURL Command modal appears:

    ![cURL Command modal](./images/curl-command-modal-bizlogic.png)

    :bulb: <i>Remember to select the appropriate cURL command for your environment!</i>

    ![cURL Command reminder](./images/curl-command-reminder.png)

    Click the `Substitutions` icon, a modal will appear.

    ![Substitutions icon](images/substitutions-icon-for-bizlogic.png)
    
    Enter `a1` into the **id** field, and place a :heavy_check_mark: in the `Null` option for the `Output` field. Then click `OK` when done.

    ![Substitutions modal](images/adding-substitution-value-null-output.png)

22. Click the copy icon to copy the cURL command with the added Substitution value.

    ![Copied cURL command](./images/copied-curl-command-bizlogic.png)

23. Then, using the Oracle Cloud Infrastructure Cloud Shell, paste and run the cURL command to confirm that the count is returned as the output variable.

    ```
    <copy>curl -X POST \
    'https://coolrestlab-adb21.adb.eu-frankfurt-1.oraclecloudapps.com/ords/admin/api/bizlogic' \
    --header 'Content-Type: application/json' \
    --data-binary '{
    "id": "a1",
    "output": "" 
    }'</copy>                                                                
    ```

    ![Cloud shell and cURL](./images/curl-command-in-cloud-shell.png)

    You can test other values by changing the id variable. Valid combinations are: 

    | Variable position | Valid characters | Case      | 
    | ----------------- | ---------------- | --------- | 
    | First character   | `a` through `f`  | lower-case|
    | Second character  | `1` through `9`  | n/a       |

    - *Some valid examples are: a1, e9, d3, b6*

## Task 3: Explore the OpenAPI View created by ORDS

1. Return to the Module's main page. This can be done by clicking the module's name in the breadcrumbs in the upper left of the page.

    ![breadcrumbs in the upper left of the page](./images/return-to-main-with-breadcrumb.png)

2. Click the the pop out icon ![pop out icon](./images/pop-menu.png) in the Module region and select **OpenAPI View**.

    ![The pop out icon and select OpenAPI View](./images/open-api-select-module.png)

3. The OpenAPI View page displays your REST services as a Swagger UI implementation.

    ![OpenAPI View](./images/open-api-as-swagger-view.png)

    You can explore the APIs you created and try them out *directly* in the browser window.
    
    ![OpenAPI explore](./images/explore-apis-in-open-api-view.png)

    You can also export this page as an OpenAPI doc for use in other tools and services using the pop out icon. ![pop out icon](./images/pop-menu.png) Select **Export Module** then **OpenAPI**.

    ![OpenAPI doc export](./images/export-open-apis-action.png)

    **An example of what the OpenAPI export will look like.**

    ![OpenAPI example export](./images/open-api-example-export.png)

4. In this lab, you published a REST API using custom SQL to accept an input as well as published a REST API using a stored PL/SQL procedure.

You may now [proceed to the next lab](#next).

## Acknowledgements

 - **Author** 
    - Jeff Smith, Distinguished Product Manager
    - Chris Hoina, Senior Product Manager 
    - Brian Spendolini
 - **Last Updated By/Date** 
    - Chris Hoina, September 2022


