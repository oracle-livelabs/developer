# Setting up your development environment

## Introduction

In this Lab, you will install SQL Developer Extension for VS Code and SQLcl. You will also install Cline for VS Code. 

### Objectives

In this lab, you will:
* Install SQL Developer Extension for VS Code 
* Install SQlcl
* Install the Cline for VS Code extension
* Configure the SQLcl MCP server

### Prerequisites 

This lab assumes you have:
* Access (via an API Key or other means) to an LLM Provider of your choice
* Oracle Java 17 or 21 (*recommended*) installed
* A personal computer or access to a workshop-provided workstation
<!-- * Oracle SSO credentials (existing or workshop provided) -->

* Reviewed the prerequisites of the Introduction lab

<!-- Task 1: Create a FreeSQL account

1. From a new browser window/tab, navigate to [https://freesql.com/?sqlnet=true](https://freesql.com/?sqlnet=true). 

> **NOTE:** You may need to configure your Windows machine, so the default browser is Chrome (applies to LiveLabs-provided workstations only).

2. Sign in with your existing Oracle account, or create a new account. 
3. After logging in to to [freesql.com](https://www.freesql.com) and click the <strong>Connect with [rotating language option]</strong>

   ![1-clicking-connect-with-button.png](./images/lab-2/1-clicking-connect-with-button.png " ")
 
    ![2-copying-your-free-sql-credentials.png](./images/lab-2/2-copying-your-free-sql-credentials.png " ")

<p></p>

4. Take note of your FreeSQL credentials. You will need the following values:

      - Hostname
      - Port
      - Service Name
      - Username
      - Password

<p></p>

> &#9872; **NOTE:** You may click the <strong>&circlearrowleft; Regenerate</strong> button to create a new password. Please save this password, as it will only be displayed once. 
> 
> *Your password will **NOT** be saved or displayed across sessions!* -->


## Task 1: Download the Instance Wallet

1. In this Lab you will use a Cloud Wallet to configure your database connection in Oracle SQL Developer for VS Code (to be completed in a later step). Return to your Autonomous AI database dashboard. 

2. Click on Database Connection.

   ![click-on-database-connection](./images/lab-2/click-on-database-connection.png " ")

3. Ensure Instance wallet is selected for the Wallet Type. Click the Download wallet button.

   ![instance-wallet-type-download-wallet](./images/lab-2/instance-wallet-type-download-wallet.png " ")

4. Enter a Wallet password, and reconfirm. Then click the Download button.

    ![enter-wallet-password-download-button](./images/lab-2/enter-wallet-password-download-button.png " ")

5. Take note of the complete path of where the Cloud Wallet was downloaded to.

    ![take-note-of-complete-path-of-wallet](./images/lab-2/take-note-of-complete-path-of-wallet.png " ")

   > &#9872; **NOTE:** You can drag and drop the .zip file into a terminal window to quickly discover the complete path.

## Task 2: Create a new REST-enabled database user

1. From your Autonomous AI database's console, click **Database Actions** then **View all database actions**.

    ![launching-database-actions-from-console](./images/lab-2/launching-database-actions-from-console.png " ")

2. From the Database Actions LaunchPad, navigate to the **Administration** category. Then select **Database Users**.

   ![admin-category-then-db-users](./images/lab-2/admin-category-then-db-users.png " ")

2. From the User Management dashboard, select the **&plus; Create User** button. 

   ![select-create-user](./images/lab-2/select-create-user.png " ")

3. A *Create User* dialog will appear. Choose a username and password (that conforms to Oracle database password requirements). Use the Radio button to enable **REST, GraphQL, MongoDB API, and Web access**. The REST Alias should remain unchanged. 

   ![create-user-main-settings](./images/lab-2/create-user-main-settings.png " ")

4. The new user will automatically be granted the `CONNECT` and `RESOURCE` roles. However, you can manually enable the new 26ai `DB_DEVELOPER_ROLE`, as this is an easy way to ensure a Developer user has many of the required roles aimed at the Oracle database developer user. Once complete, click the **Create User** button.

   ![choose-db-developer-role](./images/lab-2/choose-db-developer-role.png " ")

5. You may retain your user's unique URL for logging into SQL Developer Web (Database Actions). 

   ![dev-user-new-uri-for-db-actions](./images/lab-2/dev-user-new-uri-for-db-actions.png " ")

6. You will use this new developer user for the remainder of this Lab. Next you'll install SQL Developer for VS Code.

<!-- </if>

<if type="green-btn">

## Task 1: Create a FreeSQL account

</if>

<if type="tenancy"> -->

<!-- ## Task 1: Create a FreeSQL account

</if> -->

## Task 3: Install SQL Developer Extension for VS Code

<!-- > **NOTE:** For today's session, skip to Step 2 of this task (applies to LiveLabs-provided workstation's only). -->

1. Install SQL Developer Extension for VS Code; there are two installation options:

    - VS Code [Marketplace](https://marketplace.visualstudio.com/items?itemName=Oracle.sql-developer)
    
    <!-- <sup id="ref-1"><a href="#fn-1">1</a></sup> -->

    - From within VS Code, navigate to **Extensions**, search for "Oracle," **Oracle SQL Developer Extension for VSCode** will be near the top of the results. Coose <strong>Install</strong>

     ![3-vs-code-extensions-first-visit](./images/lab-2/3-vs-code-extensions-first-visit.png " ")

     ![4-search-for-sql-developer-web-vscode-extension](./images/lab-2/4-search-for-sql-developer-web-vscode-extension.png " ")

2. Once installed, navigate to SQL Developer Extension for VS Code(located in your Activity Bar)

     ![6-creating-your-first-sql-developer-web-extension-connection](./images/lab-2/6-creating-your-first-sql-developer-web-extension-connection.png " ")

3. Click the <strong>Create Connection</strong> button. Enter your database connection details. Choose **Cloud Wallet** as the Connection Type.

   ![click-create-connection-button](./images/lab-2/click-create-connection-button.png " ")

   ![entering-in-connection-details](./images/lab-2/entering-in-connection-details.png " ")

   ![save-password-pre-select-cloud-wallet-location](./images/lab-2/save-password-pre-select-cloud-wallet-location.png " ")

4.  Select the location of your Wallet `.zip` file. Choose the `_low`

    ![selecting-the-wallet-location](./images/lab-2/selecting-the-wallet-location.png " ")

    ![choosing-low-service-level](./images/lab-2/choosing-low-service-level.png " ")

<p></p>

> &#9888; **Important:** Make sure you click the checkbox (&check; Save Password) to save your password. Your SQLcl MCP Server relies on this securely saved password to establish a database connection.

5. Click the **Test** button to test your connection. When the test succeeds, click the **Save** button. This will save your connection, but not connect.

   ![testing-the-new-connection](./images/lab-2/testing-the-new-connection.png " ")

   ![saving-the-new-connection](./images/lab-2/saving-the-new-connection.png " ")

6. Your new connection will appear in the Primary Side Bar. Click the connection name. 

   ![new-dev-user-from-connection-explorer](./images/lab-2/new-dev-user-from-connection-explorer.png " ")

   Clicking a connnection name does two things:
     - Establishes a connection to the target database
     - Reveals the various database objects, links, directories, and other categories in a schema
   
   <!-- <sup id="ref-2"><a href="#fn-2">2</a></sup> -->

7. Continue to the next task to install SQLcl. 

<!-- <br></br>
**Footnotes**
<ol>
  <li id="fn-1">
    Visit the <a href="https://code.visualstudio.com/docs/setup/setup-overview">Setting up Visual Studio Code</a> reference page for available configuration options and features of VS Code. 
    <a href="#ref-1" title="Jump back to the reference">&uarr;</a>
  </li>
   <li id="fn-2">
   You can also right-click on a connection name to reveal the context menu. You can connect, disconnect, and edit connections as well as perform other common actions.
    <a href="#ref-2" title="Jump back to the reference">&uarr;</a>
  </li>
</ol> -->

<br></br>

## Task 4: Installing SQLcl

<!-- > **NOTE:** For today's session, SQLcl has already been downloaded for you. You can locate the SQLcl product folder on your desktop (applies to LiveLabs-provided workstation's only).  -->

1. Download and install SQLcl. Download two ways: 

    - With a package manager such as Homebrew (Mac):

         **Homebrew command:** 

         ```shell
         <copy>
         brew install --cask sqlcl
         </copy>
         ```

    - *or*, directly from the [SQLcl download page](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/download/)

> &#9872; **NOTE:** You must install SQLcl version 25.2 *or later* in order to use the SQLcl MCP Server.

2. Whether downloading from a package manager, or via a manual download, you will need to locate and note the complete path to the SQLcl /bin directory. Some possible locations: 

  **macOS**

    - *Homebrew installation*
  
      ```shell
      /opt/homebrew/Caskroom/sqlcl/[your SQLcl version]/sqlcl/bin
      ```

  **Manual installation**

    ```shell
    complete_file_path_to_your_sqlcldirectory/bin
    ```

## Task 5: Installing the Cline for VS Code Extension

1. Return to the VS Code Extensions tab and search for the Cline extension.

   ![13-searching-for-cline-vs-code-extension](./images/lab-2/13-searching-for-cline-vs-code-extension.png " ")

2.  Install the extension and navigate to the Cline extension (found in the Activity bar)

3. Click the Select Model/API Provider text. Chose your API Provider, enter you API Key, and choose your LLM Model.

    ![clicking-api-provider-text-on-first-accessing-cline](./images/lab-2/clicking-api-provider-text-on-first-accessing-cline.png " ")

    ![api-provider-selection-api-key-and-llm-model-selection](./images/lab-2/api-provider-selection-api-key-and-llm-model-selection.png " ")

<!-- 4. Follow the prompts to enter in a valid API key. In this example Oracle Code Assist is used. In this example the user authenticates with a valid Oracle SSO instead of an API key. 

   ![16-example-showing-logging-in-to-oracle-code-assist-api-provider](./images/lab-2/16-example-showing-logging-in-to-oracle-code-assist-api-provider.png " ")

   You can also click the API name at the bottom of the Cline "Tasks" view, to review your API settings.  
   
   ![17-successful-authentication-detail-of-the-default-model-used](./images/lab-2/17-clicking-on-mcp-servers-two-icon-navigation-options.png " ") -->

5. With your API Provider details confirmed, you'll now configure the SQLcl MCP Server.

## Task 6: SQLcl MCP server

1. Click the &equiv; MCP Servers icon, then on the "Configure" tab.
  
    ![manage-mcp-servers-two-options](./images/lab-2/manage-mcp-servers-two-options.png " ")

   > &#9872; **NOTE:** If selecting the bottom &equiv; icon, click the gear icon in the window that appears, then continue.
   > 
   > ![manage-mcp-servers-if-choosing-bottom-icon-select-gear](./images/lab-2/manage-mcp-servers-if-choosing-bottom-icon-select-gear.png " ")

2. Click the <strong>Configure MCP Servers</strong> botton. An empty `cline_mcp_settings.json` MCP Server configuration file will appear.

   ![20-empty-cline-mcp-servers-json-file](./images/lab-2/20-empty-cline-mcp-servers-json-file.png " ")

3. You will replace the empty JSON object with that of your SQLcl `/bin/sql` directory

   In this example, we have chosen to install SQLcl via Homebrew. Thus our SQLcl's `/bin` directory is located at (yours may differ, only use this as a reference):  
  
      ```sh
      <copy>
      opt/homebrew/Caskroom/sqlcl/25.2.2.199.0918/sqlcl/bin/sql
      </copy>
      ```

4. Update your `cline_mcp_settings.json` so it points to the correct location. Use the following `JSON` as template (include all values, modify only your unique path to the `sqlcl/bin/sql` location): 

    ```JSON
    <copy>
    {
      "mcpServers": {
        "sqlcl": {
          "timeout": 60,
          "type": "stdio",
          "disabled": false,
          "command": "[path to your SQLcl installation]/bin/sql",
          "args": ["-mcp"],
        }
      }
    }
    </copy>
    ```

    ![complete-correct-path-to-sqlcl-bin-sql-executable](./images/lab-2/complete-correct-path-to-sqlcl-bin-sql-executable.png " ")

5. Save your configuration settings. You may notice an "Updating MCP Servers..." message followed by a "MCP Servers updated..." message. This is expected. 

   ![21-updating-the-installed-cline-mcp-servers](./images/lab-2/21-updating-the-installed-cline-mcp-servers.png " ")
      
   You should now see `sqlcl` listed under the Installed MCP Servers tab.

      ![22-focus-on-sqlcl-tools-radio-button](./images/lab-2/22-focus-on-sqlcl-tools-radio-button.png " ")

6. Click anywhere in the SQLcl bar to expand it. You'll see a list of SQLcl MCP Sever "Tools", their parameters, and definitions. The contents of this LiveLab will focus primarily on the available SQLcl MCP Server Tools.

   ![23-expanding-the-installed-mcp-server-to-reveal-tools](./images/lab-2/23-expanding-the-installed-mcp-server-to-reveal-tools.png " ")

    <p></p>

    |Tool | Parameters | Definition |
    | --- | ---------- | ---------- | 
    | `list-connections` | <ul><li>`filter`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>This is the filter that will be used to refine the list of connections</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
    | `connect` | <ul><li>`connection_name`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
    | `disconnect` | <ul><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The name of the saved connection you want to connect to</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
    | `run-sqlcl` | <ul><li>`sqlcl`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The SQLcl command to execute</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
    | `sql` | <ul><li>`sql`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The SQL query to execute</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
    {: title="SQLcl MCP Server Tools"}

7. With your SQLcl MCP Server configured, you may now proceed to the next lab.

<!-- <br></br>

**Footnotes**
<ol>
  <li id="fn-3">
    We recommend naming your SQLcl MCP server with characters of the <a href="https://en.wikipedia.org/wiki/Latin-script_alphabet">Latin-script alphabet</a>, in lower case. Some AI Agents may have trouble with mixed-cases.
    <a href="#ref-3" title="Jump back to the reference">&uarr;</a>
  </li>
</ol> -->

## Troubleshooting 

Some helpful tips if you run into trouble:

|    |    |
| -- | -- |
| ***MCP server not visible*** | Check JSON registration path/quotes; confirm <code>sql --mcp</code> runs locally. |
| ***No connections found*** | Define named connections in VS Code/SQLcl; verify wallet path/tnsnames. |
{: title="Troubleshooting tips"}

## Learn More

* [Introducing the Model Context Protocol](https://www.anthropic.com/news/model-context-protocol)
* [MCP Server Introduction](https://blogs.oracle.com/database/post/introducing-mcp-server-for-oracle-database) 
* [Oracle official MCP Server repository](https://github.com/oracle/mcp/tree/main)
* [SQLcl MCP Server Docs](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/25.2/sqcug/using-oracle-sqlcl-mcp-server.html)

## Acknowledgements

* **Author**<ul><li>Chris Hoina, Senior Product Manager, Database Tools</li></ul>
* **Contributors**<ul><li>Jeff Smith, Distinguished Product Manager, Database Tools</li></ul>
* **Last Updated By/Date**<ul><li>Chris Hoina, September 2025</li></ul>


