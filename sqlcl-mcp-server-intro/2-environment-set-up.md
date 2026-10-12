# Setting up your development environment

## Introduction

Estimated Time: 10 mins

In this Lab, you will setup your working environment to use the SQLcl MCP Server along with the Cline for VS code extension.

### Objectives
<if type="tenancy">
- Install:
    - SQL Developer for VS Code Extension
    - Cline for VS Code extension  
</if>

- Configure the SQLcl MCP server

### Prerequisites

This lab assumes you have:
<if type="tenancy">
* Access to an LLM Provider (via an API Key or similar authentication method) 
* Oracle Java 17 or 21 (recommended) installed
* A personal computer or access to a workshop-provided workstation
</if>
* Reviewed the prerequisites of the Introduction lab

<if type=sandbox>
**Break Glass in case of emergency** 

Copy and run this in your VM's VS Code terminal:

```sh
<copy>
wget -P ~/Desktop/prompts \
  'https://raw.githubusercontent.com/oracle-livelabs/developer/refs/heads/main/sqlcl-mcp-server-intro/files/create_a_react_app_prompt.md' \
  'https://raw.githubusercontent.com/oracle-livelabs/developer/refs/heads/main/sqlcl-mcp-server-intro/files/create_data_and_views_prompt.md' \
  'https://raw.githubusercontent.com/oracle-livelabs/developer/refs/heads/main/sqlcl-mcp-server-intro/files/create_an_html_dashboard_prompt.md' 
 </copy>
```

<if type="freesql">
## Task 1: Create a FreeSQL account

[](include:freesql-create-freesql-account-with-vscode.md)

1. Navigate to FreeSQL.com and sign in or create a new account <freesql-button>

    ![click-sign-in-for-freesql](./images/lab-2/click-sign-in-for-freesql.png " ")  

     ![click-create-new-account-button](./images/lab-2/click-create-new-account-button.png " ")  

     ![creating-an-oracle-account-form](./images/lab-2/creating-an-oracle-account-form.png " ")

     ![sign-in-with-existing-or-new-credentials](./images/lab-2/sign-in-with-existing-or-new-credentials.png " ")  

     ![oracle-mfa-authorize-in-second-device](./images/lab-2/oracle-mfa-authorize-in-second-device.png " ")

2. Once logged in, click the <strong>Connect with [rotating language option]</strong> button.

    ![click-connect-with-button](./images/lab-2/click-connect-with-button.png " ")

3. Your new FreeSQL connection details will appear. Your password will appear only once. Copy the SQLcl connect string for future use. If you need a new password, click <strong>&circlearrowleft; Regenerate</strong>.

    ![schema-connection-details-for-freesql](./images/lab-2/schema-connection-details-for-freesql.png " ")  
  
    ![regenerating-new-password](./images/lab-2/regenerating-new-password.png " ")

4. SQL Developer for VS Code Extension already installed? Take note of your password, click the <strong><span style="display:inline-block; transform: rotate(90deg);">&#8689;</span> Create a SQL Developer for VSCode connection</strong> button, and continue to the next task. Visual Studio Code should open automatically.

    ![create-a-sql-connection-in-vs-code-button](./images/lab-2/create-a-sql-connection-in-vs-code-button.png " ")  

5. If you do not yet have the SQL Developer for VS Code Extension installed, note your FreeSQL credentials for later use:
    - Username
    - Password
    - Hostname
    - Port
    - Service Name

    ![sqlcl-connection-details-for-later-use](./images/lab-2/sqlcl-connection-details-for-later-use.png " ")

6. You will use this FreeSQL user for the remainder of this LiveLab. Next, you'll create a database connection in SQL Developer for VS Code Extension. 

<if type="tenancy">
## Task 1: Download the Instance Wallet

1. In this Lab, you will use a Cloud Wallet to configure your connection in SQL Developer for VS Code. Return to your Autonomous AI database dashboard.
2. Click on Database Connection.

    ![click-on-database-connection](./images/lab-2/click-on-database-connection.png " ")

3. Ensure Instance wallet is selected, then click Download wallet.

    ![instance-wallet-type-download-wallet](./images/lab-2/instance-wallet-type-download-wallet.png " ")

4. Enter and reconfirm a wallet password, then click Download.

    ![enter-wallet-password-download-button](./images/lab-2/enter-wallet-password-download-button.png " ")

5. Note the complete path of your Cloud Wallet.

    ![take-note-of-complete-path-of-wallet](./images/lab-2/take-note-of-complete-path-of-wallet.png " ")

> &#9872; **Note:** You can drag and drop the .zip file into a terminal to quickly discover the complete path.
</if>
## Task 2: Create a new REST-enabled database user

1. In your Autonomous AI database console, click **Database Actions** then **View all database actions**.

    ![launching-database-actions-from-console](./images/lab-2/launching-database-actions-from-console.png " ")

2. From the LaunchPad, go to **Administration** > **Database Users**.

    ![admin-category-then-db-users](./images/lab-2/admin-category-then-db-users.png " ")

3. From the User Management dashboard, select <strong>+ Create User</strong>.

    ![select-create-user](./images/lab-2/select-create-user.png " ")

4. In the create dialog, choose a username and password, enable **REST, GraphQL, MongoDB API, and Web access**.

    ![create-user-main-settings](./images/lab-2/create-user-main-settings.png " ")

5. You can enable the `DB_DEVELOPER_ROLE` role to grant developer permissions. Click **Create User** to finish.

    ![choose-db-developer-role](./images/lab-2/choose-db-developer-role.png " ")

6. Optionally, retain your user's unique SQL Developer Web login URL.

    ![dev-user-new-uri-for-db-actions](./images/lab-2/dev-user-new-uri-for-db-actions.png " ")

7. You will use this DB user for the rest of this Lab.

</if>

<if type="freesql">

## Task 2: Install SQL Developer for VS Code Extension 

</if>

> &#8505; **Note:** If you've pre-installed SQL Developer for VS Code or were redirected from FreeSQL.com you may proceed to Step 3.

1. Install SQL Developer for VS Code Extension:
     - [VS Code Marketplace](https://marketplace.visualstudio.com/items?itemName=Oracle.sql-developer), or
     - From VS Code, navigate to Extensions, search with keyword "Oracle", and install the **Oracle SQL Developer for VS Code Extension**

     ![3-vs-code-extensions-first-visit](./images/lab-2/3-vs-code-extensions-first-visit.png " ")
     ![4-search-for-sql-developer-web-vscode-extension](./images/lab-2/4-search-for-sql-developer-web-vscode-extension.png " ")

2. Once installed, open the SQL Developer Extension (accessible from the Activity Bar).

     ![6-creating-your-first-sql-developer-web-extension-connection](./images/lab-2/6-creating-your-first-sql-developer-web-extension-connection.png " ")

<if type="freesql">

3. Click <strong>Create Connection</strong> and enter your FreeSQL connection details. 

    ![click-sql-developer-extension-icon-then-create-connection-icon](./images/lab-2/click-sql-developer-extension-icon-then-create-connection-icon.png " ")
    ![complete-connection-details-in-sql-dev-connection-dialog](./images/lab-2/complete-connection-details-in-sql-dev-connection-dialog.png " ")
    ![save-password-check](./images/lab-2/save-password-check.png " ")
   
    > &#9888; **Important:** Check <strong>Save Password</strong>. The SQLcl MCP Server needs this to connect.
 
 <details>
  <summary style="color:DodgerBlue;"><i><b>( &#9756; click to expand) Redirected from FreeSQL.com?</b></i></summary>
  
    1. You may be prompted to allow the application to proceed.
   
    ![freesql-connection-details-pre-populated](./images/lab-2/from-freesql-allow-vs-code-to-open.png " ")

    2. Once VS Code has opened, you may need to grant additional permissions to the application. 
  
     ![freesql-connection-details-pre-populated](./images/lab-2/allow-vs-code-to-redirect-to-sql-dev-download-link.png " ")
     ![freesql-connection-details-pre-populated](./images/lab-2/allowing-vs-code-extension-to-install.png " ")

    4. Your FreeSQL credentails are pre-populated for you. Enter in your password, and save your password before saving the connection. 
  
      ![freesql-connection-details-pre-populated](./images/lab-2/freesql-connection-details-pre-populated.png " ")

      > &#9888; **Important:** Check <strong>Save Password</strong>. The SQLcl MCP Server needs this to connect.

</details>

</if>

<if type="freetier">

3. Click <strong>Create Connection</strong>, enter your DB details, and select **Cloud Wallet** as Connection Type.

    ![click-create-connection-button](./images/lab-2/click-create-connection-button.png " ")
    ![entering-in-connection-details](./images/lab-2/entering-in-connection-details.png " ")

</if>

4. Click **Test** to check the connection. When successful, click **Save**.

    ![testing-new-freesql-connection-and-success-message](./images/lab-2/testing-new-freesql-connection-and-success-message.png " ")
    ![saving-new-freesql-db-connection](./images/lab-2/saving-new-freesql-db-connection.png " ")

6. Your new connection will appear in the sidebar. Click the connection name.

    ![expanding-newly-created-freesql-connection-in-sql-dev-vscode](./images/lab-2/expanding-newly-created-freesql-connection-in-sql-dev-vscode.png " ")

    > &phone; **Info:** Clicking a connection establishes a connection and reveals schema objects, links, directories, and other categories.

7. Next, you'll <if type="freesql">install the Cline for VS Code Extension.</if><if type="freetier">install SQLcl.</if>

<if type="freetier">

## Task 4: Installing SQLcl

1. Download and install SQLcl:
    - With Homebrew (Mac):
     ```shell
     brew install --cask sqlcl
     ```
    - Or [download directly](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/download/)

    > &#9872; **Note:** Use SQLcl version 25.2 or later to use the MCP Server.

2. Note the path to the SQLcl /bin directory. Examples:

   **macOS (Homebrew):**

    - *Homebrew installation*
  
      ```shell
      /opt/homebrew/Caskroom/sqlcl/[your SQLcl version]/sqlcl/bin
      ```

  **Manual installation**

    ```shell
    complete_file_path_to_your_sqlcldirectory/bin
    ```


</if>

## Task 5: Installing the Cline for VS Code Extension

1. In the VS Code Extensions tab, search for the Cline extension.

    ![13-searching-for-cline-vs-code-extension](./images/lab-2/13-searching-for-cline-vs-code-extension.png " ")

2. Install and open the extension from the Activity bar.

3. Choose how you will use Cline (this LiveLab assumes you are providing your own LLM Provider API key).

    ![bring-my-own-api-key-cline](./images/lab-2/bring-my-own-api-key-cline-on-pc.jpg " ")

4. Choose from the list of available API Providers. Enter your API Key, and pick your LLM model (if bringing your own API Key).

    ![selecting-api-provider-and-model](./images/lab-2/selecting-api-provider-and-model.jpg " ")

5. Click Continue to complete registration.

    ![select-continue-after-selecting-api-provider](./images/lab-2/select-continue-after-selecting-api-provider-on-pc.jpg " ")

    <!-- ![clicking-api-provider-text-on-first-accessing-cline](./images/lab-2/clicking-api-provider-text-on-first-accessing-cline.png " ")
    ![api-provider-selection-api-key-and-llm-model-selection](./images/lab-2/api-provider-selection-api-key-and-llm-model-selection.png " ") -->

6. With your provider settings complete, you’re ready to configure the SQLcl MCP Server.

</if>

## Task 6: Configuring the SQLcl MCP server

1. In VS Code, open the Command Palette and search for: <kbd>Configure Cline SQLcl MCP</kbd>. 

    **On Mac**
 
    ![command-palette-on-mac](./images/lab-2/command-palette-on-mac.png "Command Palette on Mac")

    **On Windows**

    ![view-command-palette-on-windows](./images/lab-2/view-command-palette-on-windows.jpg "Command Pallette on PC")

2. Once located, select the **Configure Cline SQLcl MCP** option. A preconfigured Cline configuration settings JSON file will appear. The details of your SQLcl installation will be preopulated; to include all required MCP Server settings and parameters

    ![configure-cline-sqlcl-mcp-server-option](./images/lab-2/search-for-sqlcl-mcp-by-keyword-on-pc.jpg " ")

    > &#9872; **Note:** Update to the latest version of SQL Developer for VS Code to use the embedded SQLcl that ships with Oracle SQL Developer for VS Code.

3. Preview the `cline_mcp_settings.json` configuration file. No updates are needed.

    ![preview-cline-mcp-settings-json-file](./images/lab-2/preview-cline-mcp-settings-json-file.png " ")

4. Save and close the file. You might see an "Updating MCP Servers..." notification followed by "MCP Servers updated..." notification. This is expected.

    ![21-updating-the-installed-cline-mcp-servers](./images/lab-2/21-updating-the-installed-cline-mcp-servers.png " ")

5. You should now see `SQLcl - SQL Developer` (the default name) under the Installed MCP Servers tab of the MCP Servers view.

    ![sqlcl-now-in-installed-servers-tab](./images/lab-2/sqlcl-now-in-installed-servers-tab.png " ")

6. Click the SQLcl MCP server frame to expand. You’ll see a list of SQLcl MCP Server tools, parameters, and definitions.

   | Tool | Purpose | Parameters | Parameter Definitions |
   |---|---|---|---|
   | `connections_list` | Lists saved Oracle database connections. | <ul><li>name</li><li>username</li><li>model</li><li>definition\_type</li><li>show\_details</li></ul> | <ul><li>Optional, case-insensitive filter for connection names</li><li>Optional username filter</li><li>LLM name and version</li><li>Optional filter: all, OCI, or non-OCI connections</li><li>Whether to include connect string and username details</li></ul> |
   | `connect` | Connects to a saved Oracle database connection. | <ul><li>connection_name\*</li><li>model</li></ul> | <ul><li>Case-sensitive saved connection name</li><li>LLM name and version</li></ul> |
   | `disconnect` | Closes the current database connection. | <ul><li>model</li></ul> | <ul><li>LLM name and version</li></ul> |
   | `sqlcl_run` | Executes SQLcl-specific commands. | <ul><li>sqlcl\*</li><li>model</li><li>execution_type</li></ul> | <ul><li>SQLcl command to execute</li><li>LLM name and version</li><li>Execution mode; asynchronous calls return a request ID to poll with `request_status`</li></ul> |
   | `sql_run` | Executes SQL, DML, DDL, or PL/SQL and returns CSV-formatted results. | <ul><li>sql\*</li><li>model</li><li>execution_type</li></ul> | <ul><li>SQL statement or PL/SQL block</li><li>LLM name and version</li><li>Execution mode; use asynchronous execution for longer queries and poll the request ID with `request_status`</li></ul> |
   | `schema_information` | Describes objects in the connected schema. | <ul><li>schema</li><li>level</li><li>objects\_list</li><li>filter</li><li>model</li><li>execution\_type</li></ul> | <ul><li>Schema to describe; defaults to the connected schema</li><li>Detail level: BRIEF (default), DETAILED, OVERVIEW, or TABLE_DETAILS</li><li>Comma-separated objects to include; defaults to all objects</li><li>SQL LIKE pattern for object names; defaults to `%`</li><li>LLM name and version</li><li>SYNCHRONOUS (default) or ASYNCHRONOUS execution</li></ul> |
   | `skills_sync` | Installs or refreshes Oracle-maintained skills in detected AI assistant skill directories. | <ul><li>skill_names</li><li>version</li><li>force</li><li>model</li></ul> | <ul><li>Optional Oracle skill root directory names; empty installs all available skills</li><li>Blessed skills version; defaults to latest</li><li>Whether to overwrite selected existing skill directories</li><li>LLM name and version</li></ul> |
   | `annotation_generate` | Previews or persists DESCRIPTION annotations for schema tables and columns. | <ul><li>annotations\*</li><li>execution\_mode</li><li>model</li><li>execution\_type</li></ul> | <ul><li>Annotation objects, each with type, name, and generated DESCRIPTION; may include current annotations and confidence</li><li>PREVIEW or PERSIST</li><li>LLM name and version</li><li>Execution mode for the tool request</li></ul> |
   | `context_retrieve` | Retrieves relevant context from vector tables in the active database. | <ul><li>model</li><li>concise\_user\_prompt\*</li></ul> | <ul><li>LLM name and version</li><li>Concise, keyword-focused semantic query with key entities, topic, and requested attributes</li></ul> |
   | `request_status` | Retrieves the status and available result of an asynchronous tool request. | <ul><li>tool\_request\_id\* </li><li>model</li></ul> | <ul><li>Request ID returned by an asynchronous tool</li><li>LLM name and version</li></ul> |
   {: title="SQLcl MCP Server Tools"}

    Note: Parameters marked with an asterisk (`*`) are required.

7. Your SQLcl MCP Server is configured. You may now [proceed to the next lab](#next).

## Troubleshooting

|    |    |
|----|----|
| ***MCP server not visible*** | Update SQLcl MCP configuration settings in Cline (may be necessary after recent SQL Developer for VS Code update). |
| ***No connections found*** | Define named connections in VS Code/SQLcl; check wallet path/tnsnames |

**Managing MCP Servers**

*Need to review your MCP Server settings in Cline?* From the Cline Task view, click the `Manage MCP Servers` icon, followed by the gear icon. 

  ![click-manage-servers-icon-below-task-prompt](./images/lab-2/click-manage-servers-icon-below-task-prompt.jpg " ")
  ![select-gear-icon-to-view-servers-tab](./images/lab-2/select-gear-icon-to-view-servers-tab-on-pc.jpg " ")

Click the Configure tab to review your currently configured MCP Servers and to edit configuration properties. 

  ![click-configure-mcp-servers-to-reveal-settings-json](./images/lab-2/click-configure-mcp-servers-to-reveal-settings-json-on-pc.jpg " ")

## Learn More

* [Model Context Protocol Overview](https://www.anthropic.com/news/model-context-protocol)
* [Oracle MCP Server Blog](https://blogs.oracle.com/database/post/introducing-mcp-server-for-oracle-database)
* [Oracle official MCP Server repository](https://github.com/oracle/mcp/tree/main)
* [SQLcl MCP Server Docs](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.2/sqcug/using-oracle-sqlcl-mcp-server.html)

## Acknowledgements

* **Author:** Chris Hoina, Lead Principal Product Manager, Database Tools
* **Contributors:** Jeff Smith, Distinguished Product Manager, Database Tools
* **Last Updated:** Chris Hoina, October 2026

<!-- WMS ID 11914 -->
