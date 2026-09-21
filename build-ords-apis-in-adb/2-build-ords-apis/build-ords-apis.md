# REST-enable tables and add business logic
<!-- WMSID 4602 -->
## Introduction

In this lab, you will use the SQL Worksheet and the REST Workshop to build ORDS REST APIs. The APIs will each expose a parameterized PL/SQL procedure and a SQL statement. You'll also test these APIs in cURL.

Estimated Lab Time: 25 minutes

### Objectives

- Publish RESTs API using Custom SQL and PL/SQL
- Publish REST API using stored PL/SQL procedure
- Explore the ORDS OpenAPI View
- Test ORDS APIs in cURL

### Prerequisites
<if type="tenancy">
- The following lab requires an [Oracle Cloud account](https://www.oracle.com/cloud/free/). You may use your own cloud account, a cloud account that you obtained through a trial, or a training account whose details were given to you by an Oracle instructor.
</if>
- This lab uses the command line application cURL for testing APIs; some familiarity is suggested.
- This lab assumes you have completed all previous Labs. 

## Task 1: Review provided code snippets

1. In this Lab, you'll create two custom APIs. One is based on SQL (which you'll execute shortly) the other based on the PL/SQL Procedure that was created in Lab 1; Task 3.

2. As your development user, navigate back to the SQL Worksheet.

3. Copy and paste the following snippet into a new worksheet: 

    ```sql
    <copy>SELECT PROJ_ID, PROJ_NAME, DEPT_ID, IS_ACTIVE FROM PROJECT WHERE DEPT_ID = 9 AND IS_ACTIVE = TRUE;</copy>
    ```
    ![Pasting the sql in the worksheet](./images/1-testing-sql-in-sql-worksheet.png " ")

4. Execute this sample SQL using either the Run Statement or Run Script button. The query results will appear in either the **Query Result** or **Script Output** tabs (depending no how the SQL was executed). These results contain the same data that will be returned for an API response; from an ORDS API that you'll create shortly. Results returned are: `PROJ_ID`, `PROJ_NAME`, `DEPT_ID`, and `IS_ACTIVE` for the given `DEPT_ID` and `BOOLEAN`. 

    ![SQL execution results](./images/2-sql-execution-results.png " ")

5. Next, select Procedures from the Navigator dropdown menu. Right-click on the `PR_ADD_AND_ASSIGN_EMPLOYEE` procedure, and select **Open**.

    ![Selecting the Plsql procedure](./images/3-selecting-plsql-procedure.png " ")

    ![Right click to open the Plsql procedure](./images/4-right-click-on-plsql-proc.png " ")

6. The definiton for the PL/SQL procedure will be visible in the SQL Worksheet. This produre expects the following parameters: `p_emp_name`, `p_dept_code` (associated with a `dept_id`), and `comments`. It then inserts these values into the `Employee` table.

    ![Reviewing the PLSQL Procedure in the worksheet](./images/5-plsql-definition-in-sql-worksheet.png " ")

7. Next, you'll insert a new row into the `Employee` table, using this procedure. Take note of one of the available, valid Department Codes: `EN003, FN002, HR001, IT007, LG006, LG009, MK005, OP010, SA004, SP008`.

8. Return to the SQL Worksheet. Use the following code snippet to insert a new record into the `Employee` table (replace name with your name, the value for the DEPT_CODE with a valid code, and include a comment describing yourself).: 

    ```sql
    <copy>
    BEGIN
      pr_add_and_assign_employee('Chris', 'HR001', 'Overqualified intern.');
    END;
    </copy> 
    ```

    ![Code snippet to add a record](./images/8-code-snippet-to-add-record.png " ")

10. Use the **Run Script** button; you will see `PL/SQL procedure successfully completed.` in the Script Output.

    ![Executing the code snippet](./images/9-executing-the-code-snippet.png " ")

11. You can then query for your record in the Employee table. Use the following code snippet (edit where needed):

    ```sql
    <copy>Select * from Employee where emp_name='Your name';</copy>
    ```

    ![Reviewing the results of the procedure](./images/10-reviewing-the-latest-insert.png " ")

12. Now that you have a general idea of what the sample code accomplishes, its time to build your own ORDS endpoints.

## Task 2: Exploring the REST Workshop

1. Click the Hamburger menu in the upper left hand corner of your browser, then select **REST**.

    ![Click hamburger then rest](./images/11-click-hamburger-then-rest.png " ")

2. You are now in the **REST** Workshop. Here is where you build and test your ORDS APIs. Click the **AUTOREST** card.

    ![Click the autorest card](./images/12-click-the-autorest-card.png " ")

3. This is the table you AutoREST-enabled in a previous lab. Before you continue, take a look at the resources available to you (these apply to all of your modules). Right-click the kebab menu, then select **Export OpenAPI**.

    ![Export OpenAPI on the project table](./images/13-autorest-table-project-export-open-api.png " ")

4. You'll see a downloadable version of your API in the OpenAPI specification. This makes it easy for you to review, and share definitions. 

    ![The downloadable OpenAPI Export](./images/14-open-api-export-download.png " ")

5. Close the Export OpenAPI slider, click the kebab menu again and select **OpenAPI View**. 

    ![The OpenAPI view on Project table](./images/15-openapi-view-on-project.png " ")

6. You will see an in-browser testing dashboard based on the OpenAPI specification. Here you can test your APIs without having to log into, or open a separate application. When satisfied, click the **Modules** tab at the top of the REST Workshop page. 

    ![OpenAPI view dashboard](./images/16-open-api-view-dashboard.png " ")

## Task 3: Building an ORDS GET API

1. You'll now build your first two custom ORDS APIs. Click the **Create Module** button. 

    ![resource-modules-dashboard](./images/17-resource-modules-dashboard.png " ")

2. Next, enter in values of the Create Module slider. and click the **Create** button. Use the same values provided to make following along easier:

    - **Module Name:** `records.module`
    - **Base Path:** `v1`
    - **Protected By Privilege:** `Not Protected` (Select from drop-down)
    - **Comments:** `An employee records management module consisting of various templates and handlers for performing operations on the following target tables: Department, Project, Employee.`

     ![create-new-resource-module](./images/18-create-new-resource-module.png " ")

3. Now, click the Template button; this will ultimately be the URI for your ORDS API (where clients issue HTTP requests to). 

    ![Click create template](./images/19-click-create-template.png " ")

    Enter in the values provided and click **Create**: 

    - **URI Template:** `:dept_id/:is_active?`
    - **Comments:** `An example template that will accept the query parameters dept_id and is_active. Relies on ORDS Automatic Binding to take the path parameters and use them in the provided handler code. The is_active bind paramater is an optional query parameter.`
  
      ![Enter-template-details](./images/20-enter-template-details.png " ")

    > **NOTE:** This Template illustrates two important ORDS features: Route Patterns (i.e., `/:dept_id/:is_active?`) and optional bind parameters (e.g. `:is_active?`). This pattern allows developers to pass parameters directly in the URI. Additionally, because an optional modifier (`?`) is used, this endpoint can either return all results matching a particular :dept_id, and/or those matching `true` or `false` for the `:is_active` parameter. [Learn More](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/26.2/orddg/extending-ords-functionality-plugins.html#GUID-2F072246-B593-48A0-B47E-8605F7A1F725)

4. Next, click the **Create Handler** button. When the Slider appears, select `GET`, `Collection Query`. 

    ![New handler button](./images/21-new-handlers-screen.png " ")

    ![Adding details to the handler code](./images/22-adding-sql-to.png " ")

5. Use the following snippet for the Source, and click the **Create** button. 

    ```sql
    <copy>
    SELECT PROJ_ID, PROJ_NAME, DEPT_ID, IS_ACTIVE FROM PROJECT WHERE DEPT_ID = :dept_id AND (:is_active IS NULL OR IS_ACTIVE = :is_active);
    </copy>
    ```

    > **NOTE:** Notice how the the values for the Route Pattern are included in the Handler's source code. ORDS will automatically *bind* these to the parameters in the Handler code.

6. You have just created your first ORDS API, a `GET` handler. Click the Open in new Tab button, you'll be prompted to enter in values for the Route Parameters. ORDS will bind these values of the URI to those in the Handler's SQL source code, satisfying the conditions of the `WHERE` clause. 

      ![Adding details to the handler code](./images/23-finished-handler-code.png " ")

7. Enter a value between `1` and `10` for `dept_id`, and use`true`, `false`, or `Null` for the `is_active` parameter. Then, select **OK**.

      ![Pressing OK for a new tab](./images/24-enter-substitution-pressing-enter.png " ")

8. A new browser tab will appear, with the results of your `GET` request. You can review the Response in the Object Tree format using your browser's developer/inspect tools. Notice the `links:Array` property; specifically the `self` link. Also, notice the URI includes those parameters you selected in the previous step (the same parameters that ORDS uses in the Handler source code).

    ![GET results in the browser](./images/25-new-browser-window-sql-get-results.png " ")

9. When you are ready, return the the Handler dashboard. You can test this API in cURL too. Click the kebab menu of your Handler, and select **Get cURL command**.

    ![curl-command-test](./images/26-curl-command-test.png " ")

10. Press the **+ plus** button, and enter in Substitution values for the cURL command; this time select `Null` for the `:is_active` value. Then press **OK**.

    ![Press plus for substitution values](./images/27-press-plus-button-get.png " ")

    ![Press OK for substitution values](./images/28-new-values-before-press-ok.png " ")

11. Copy the cURL command, and paste it into a new Terminal window. Remove the `<VALUE>?` placeholder. Execute the cURL command.

    ![Copying the curl command](./images/29-copying-the-curl-command-for-get.png " ")

    ![Removing the value placeholder](./images/30-1-removing-value-placeholder.png " ")

    ![curl command in terminal](./images/30-curl-command-in-terminal.png " ")

    > **NOTE:** You can optionally pipe in the `jq` processer to pretty print your `JSON` response.

12. You should see the response payload in your terminal. Because the optional `:is_active` parameter was removed, all relevant projects are returned. 

    ![Get response part one](./images/31-get-response-one.png " ")

13. Scroll down, and you will see the remainder of the payload. Because this is a large results set, you'll see a `next` link in the `links` array.

    ![Get response part two](./images/32-get-response-two.png " ")

14. In the next task you'll create a slightly more advanced `POST` endpoint.

## Task 4: Building an ORDS POST API

1. In this example, you'll build a slightly more advanced ORDS API. You'll use an Anonymous Block in your ORDS Handler code to execute the `PR_ADD_AND_ASSIGN_EMPLOYEE` PL/SL procedure. Using the breadcrumbs in the REST Workshop, return to the `records.module` Resource.

    ![Resource module breadcrumbs](./images/33-breadcrumbs.png " ")

2. Click the **+ Create Template** button. Use `emp_recs` as the value for the **URI Template**, and click **Create**.

    ![Creating the next template](./images/34-create-second-template-button.png " ")

    ![New values for the template](./images/35-entering-values-for-new-template.png " ")

3. Click the **+ Create Handler** button, and in the Create Handler slider enter/select `POST` for the Method and the below source, then click the **Create** button.

    ```sql
    <copy>
        DECLARE
        L_SQLCODE PLS_INTEGER;
    BEGIN
        DEMO_USER.PR_ADD_AND_ASSIGN_EMPLOYEE(
            P_EMP_NAME  => :EMP_NAME,
            P_DEPT_CODE => :DEPT_CODE,
            P_COMMENTS  => :COMMENTS
        );

        COMMIT;
        :STATUS_CODE := 201;
        :RESPONSE_STATUS := 'success';
        :RESPONSE_MESSAGE := 'Employee added.';
    EXCEPTION
        WHEN OTHERS THEN
            L_SQLCODE := SQLCODE;
            ROLLBACK;
            :STATUS_CODE :=
                CASE
                    WHEN L_SQLCODE = - 20001 THEN
                        400
                    ELSE
                        500
                END;
            :RESPONSE_STATUS := 'error';
            :RESPONSE_MESSAGE :=
                CASE
                    WHEN L_SQLCODE = - 20001 THEN
                        'Department code not found.'
                    ELSE
                        SQLERRM
                END;
    END;
    </copy>
    ```
    ![Values for the post handler](./images/36-creating-handler-for-post.png " ")

4. For this example, you'll create an output Bind Parameter. Press the Parameters tab, then the **+ Create Parameter** button.

    ![Clicking the parameter tab](./images/37-click-parameter-tab.png " ")

    ![Clicking create parameter button](./images/38-click-create-parameter-button.png " ")

5. Enter the following values for the `response_status` parameter, and click the **Create** button: 
    - **Parameter name:** `response_status`
    - **Bind Variable Name:** `response_status`
    - **Source Type:** `Response`
    - **Parameter Type:** `STRING`
    - **Access Method:** `Output`

    ![New parameter values](./images/39-parameter-values.png " ")

6. Create a second parameter, called `response_message`. Use the following values: 
    - **Parameter name:** `response_message`
    - **Bind Variable Name:** `response_message`
    - **Source Type:** `Response`
    - **Parameter Type:** `STRING`
    - **Access Method:** `Output`

6. Once created, the new parameters will be visible in the Parameter tab.

    ![A new parameter row](./images/40-new-parameter-rows.png " ")

7. You'll use these Bind Parameters (aka Handler Parameter) to send the responses/results of your ORDS API to your client application. 

    ![Locating the new parameters](./images/41-locating-the-parameters.png " ")

    > **NOTE:** The values have already been included in the sample Anonymous Block snippet, but simply clicking the Handler Parameter name will place the parameter value at the current location of your cursor.

8. Now, you can test this new POST API. From the Handler's kebab menu, select **Get cURL command**, then the **+ plus** button of the curl Command modal. A Substitutions modal will appear. Enter in values for `EMP_NAME`, `DEPT_CODE`, `COMMENTS`, and check Null for the `response_status` and `response_message`. Be sure to review and select valid values for the `DEPT_CODE`. Once finished, click **OK**.

    ![Retrieving the curl command](./images/42-getting-the-post-curl.png " ")

    ![clicking the plus button](./images/27-press-plus-button-get.png " ")

    ![Adding substitution details](./images/43-entering-substitution-details.png " ")

9. Copy the curl command into a clipboard, and remove the `response_status` and `response_message` key:value pairs, and the no-longer-required comma. Then, paste the updated command in a Terminal window and execute the curl command.
   
    ![Copying the post request](./images/44-clicking-copy-for-post.png " ")

    ![Empty key value pairs](./images/44-1-empty-key-value-pairs.png " ")

    ![Empty key value pairs removed](./images/44-2-key-value-pairs-removed.png " ")

10. You should see the success response message in your terminal. 

    ![Reviewing the response in terminal](./images/45-response-in-terminal.png " ")

11. You can also perform a simple query to review that latest INSERT using the following code snippet: 

    ```sql
    <copy>Select * from Employee where emp_name='The name you used in the POST request';</copy>
    ```

    ![Querying the latest insert in sql worksheet](./images/46-querying-latest-post-in-sql-worksheet.png " ")

12. And that's it, you've just successfully created your first two custom ORDS APIs. But you've probably noticed, no security? Continue to the next lab to learn more about securing your ORDS APIs.

You may now [proceed to the next lab](#next).

## Acknowledgements

### Author

- Jeff "el jefe" Smith, Distinguished Product Manager
- Chris Hoina, Senior Product Manager

### Last Updated By/Date

- Chris Hoina, September 2026
