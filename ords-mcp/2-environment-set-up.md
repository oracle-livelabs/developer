# Title of the Lab

## Introduction

*Describe the lab in one or two sentences, for example:* This lab walks you through the steps to ...

Estimated Time: n minutes

### About Product/Technology (Optional)
Enter background information here about the technology/feature or product used in this lab - no need to repeat what you covered in the introduction.

### Objectives

*List objectives for this lab*

In this lab, you will:
* Objective 1
* Objective 2
* Objective 3

### Prerequisites (Optional)

*List the prerequisites for this lab using the format below. Fill in whatever knowledge, accounts, etc. is needed to complete the lab. **Do NOT list** each previous lab as a prerequisite.*

This lab assumes you have:
* An Oracle account
* All previous labs successfully completed

*This is the "fold" - below items are collapsed by default*

<mark>Highlighting indicates To-Do/Pending</mark>

## Task 1: Create a FreeSQL account

1. In a separate tab, navigate to [freesql.com](https://www.freesql.com).
2. Sign in with your existing Oracle account, or create a new account. 
3. Log in to [freesql.com](https://www.freesql.com) and click the <button styles="color: white; background-color: DarkSlateGray;>Connect with [rotating language option]<button> button.

   ![1-clicking-connect-with-button.png](./images/lab-2/1-clicking-connect-with-button.png " ")

4. Take note of your FreeSQL credentials. You will need the following: 

   - Hostname
   - Port
   - Service Name
   - Username
   - Password

        ![2-copying-your-free-sql-credentials.png](./images/lab-2/2-copying-your-free-sql-credentials.png " ")


> ![NOTE]
> You must click the Regenerate button to create a new password. Please save this password, as it will only be displayed once. It will not be saved or displayed across sessions.

## Task 2: Oracle SQL Developer for VS Code

1. Install Oracle the SQL Develeoper for VS Code extension. There are two installation options:

   1. [Install](https://marketplace.visualstudio.com/items?itemName=Oracle.sql-developer) the latest Oracle SQL Developer for VS Code Extension.[^1]
   2. From within VS Code, navigate to **Extensions**, search for "Oracle" and choose <kbd>Install</kbd>

     ![3-vs-code-extensions-first-visit](./images/lab-2/3-vs-code-extensions-first-visit.png " ")

     ![4-search-for-sql-developer-web-vscode-extension](./images/lab-2/4-search-for-sql-developer-web-vscode-extension.png " ")

     ![5-post-installation-sql-developer-web-extension](./images/lab-2/5-post-installation-sql-developer-web-extension.png " ")

[^1]: Visit the [Setting up Visual Studio Code](https://code.visualstudio.com/docs/setup/setup-overview) reference page for available configuration options and features of VS Code.  

2. Restart your VS Code session
3. Navigate to the Oracle SQL Developer for VS Code extension (located in your Activity Bar)

   ![6-creating-your-first-sql-developer-web-extension-connection](./images/lab-2/6-creating-your-first-sql-developer-web-extension-connection.png " ")

4. Click the <kbd>Create Connection</kbd> button, begin entering in your FreeSQL connection details.

   ![7-entering-your-free-sql-credentials-for-new-connection](./images/lab-2/7-entering-your-free-sql-credentials-for-new-connection.png " ")

>[!IMPORTANT]
>Make sure you click the checkbox to "Save Password." The MCP server requires this saved password to establish a SQLcl connection on your behalf.

5. Choose **Basic** as the Connection Type, enter in your details. 

6. Click the <kbd>Test</kbd> button to test your connection. When the test succeeds, click the <kdb>Save</kbd> button. This will save your connection, but not connect.

   ![8-entering-your-free-sql-connection-type-information](./images/lab-2/8-entering-your-free-sql-connection-type-information.png " ")

7. Your new connection will appear in the Primary Side Bar. Click the connection name. 

   ![11-navigating-to-sql-developer-connections-for-connecting-to-freesql-schema](./images/lab-2/11-navigating-to-sql-developer-connections-for-connecting-to-freesql-schema.png " ")

   Clicking the connnection name will do two things:[^2]

   1. Establish a connection to the FreeSQL database
   2. Reveal the various database objects, links, directories, and other categories

      ![12-expanding-connection-to-reveal-database-objects.png](./images/lab-2/12-expanding-connection-to-reveal-database-objects.png " ")

[^2]: You can also right-click on a connection name to reveal the context menu. You can connect, disconnect, and edit connections as well as perform other common actions.

8. Continue to the next task to install SQLcl. 

## Task 4: Installing SQLcl

1. Download and install SQLcl. Two possible options include: 

    1. With a package manager such as Homebrew (Mac)
    2. Directly from the [SQLcl download page](https://www.oracle.com/database/sqldeveloper/technologies/sqlcl/download/)
  
2. Whether downloading from a package manager, or via a manual download, you must set the SQLcl `/bin` directory to your `$PATH`.

  **macOS**

  *Homebrew installation*

    ```sh
     cat << EOF >> ~/.zprofile
     # Add SQLcl via Homebrew
     export PATH="$PATH:/opt/homebrew/Caskroom/sqlcl/[your SQLcl version]/sqlcl/bin"
     EOF
    ```

  *Manual installation*

    ```sh
    cat << EOF >> ~/.zprofile
    # Add SQLcl via manual installation
    export PATH="$PATH:/complete_file_path_to_your_sqlcldirectory/bin"
    EOF
    ```

  **Windows**

    1. In Search, search for and then select: System (Control Panel)
    2. Click the Advanced system settings link.
    3. Click Environment Variables.
    4. In the section System Variables find the PATH environment variable and select it.
    5. Click Edit.
    6. If the PATH environment variable does not exist, click New.
    7. In the Edit System Variable (or New System Variable) window, specify the value of the PATH environment variable.
    
        - *Example:* `/complete_file_path_to_your_sqlcl_directory/bin`

    8. Click OK. 
    9. Close all remaining windows by clicking OK.

> [!NOTE]
> Take note of this path, as you will need it for a later step.

3. Close out any shell sessions, to pick up your changes. 

## Task 5: Installing the Cline for VS Code Extension

1. Return to the Extensions tab. And search for the Cline extension.

   ![13-searching-for-cline-vs-code-extension](./images/lab-2/13-searching-for-cline-vs-code-extension.png " ")

2.  Install the extension. Once installed, navigate to the Cline extension (found in the Activity bar)

3. Click the "Scale" icon to select an API provider. 

   ![14-clicking-the-api-provider-icon-for-choosing-api-provider](./images/lab-2/14-clicking-the-api-provider-icon-for-choosing-api-provider.png " ")

   ![15-available-api-providers-from-the-drop-down-menu](./images/lab-2/15-available-api-providers-from-the-drop-down-menu.png " ")

4. Follow the prompts to enter in a valid API key. In this example Oracle Code Assist is used. A user authenticates with a valid Oracle SSO instead of an API key. 

   ![16-example-showing-logging-in-to-oracle-code-assist-api-provider](./images/lab-2/16-example-showing-logging-in-to-oracle-code-assist-api-provider.png " ")

   You can also click the API name at the bottom of the Cline "Tasks" view, to review your API settings. 

      ![17-successful-authentication-detail-of-the-default-model-used](./images/lab-2/17-successful-authentication-detail-of-the-default-model-used.png " ")

5. Next, you'll configure the SQLcl MCP Server. 

## Task 6: Configuring the SQLcl MCP server

1. Click the MCP Servers icon, then on the Installed tab.

   <!-- Needs edit, to highlight both icons. -->
  
   ![18-successful-authentication-detail-of-the-default-model-used](./images/lab-2/18-successful-authentication-detail-of-the-default-model-used.png " ")

   ![19-navigating-to-installed-mcp-servers-tab](./images/lab-2/19-navigating-to-installed-mcp-servers-tab.png " ")

2. Click the <button style="color: Gainsboro; background-color: DimGray;">Configure MCP Servers</button> botton. The `cline_mcp_settings.json` MCP Server configuration file will appear.

   ![20-empty-cline-mcp-servers-json-file](./images/lab-2/20-empty-cline-mcp-servers-json-file.png " ")

3. You will replace the empty JSON object with that of your SQLcl `/bin/sql` directory

In this example, we have chosen to install SQLcl via Homebrew. Thus our SQLcl's `/bin` directory is located at:  
  
  ```sh
  opt/homebrew/Caskroom/sqlcl/25.2.2.199.0918/sqlcl/bin/sql
  ```

4. Update your `cline_mcp_settings.json` so it points to the correct location. Use the following `JSON` as template: 

    ```JSON
    <copy>
    {
      "mcpServers": {
        "sqlcl": {
          "command": "[path to your SQLcl installation]/bin/sql",
          "args": ["-mcp"],
          "disabled": false
        }
        
      }
    }
    </copy>
    ```

5. Save your configuration settings. In doing so, you may notice an "Updating MCP Servers..." message following by a "MCP Servers updated..." message.  

   ![21-updating-the-installed-cline-mcp-servers](./images/lab-2/21-updating-the-installed-cline-mcp-servers.png " ")
    
      
   You should now see `sqlcl` listed under the Installed MCP Servers tab.

   ![22-focus-on-sqlcl-tools-radio-button](./images/lab-2/22-focus-on-sqlcl-tools-radio-button.png " ")

6. Click the anywhere in the SQLcl bar to expand it. You'll see a list of SQLcl MCP Sever "Tools", their parameters, and definitions.

   ![23-expanding-the-installed-mcp-server-to-reveal-tools](./images/lab-2/23-expanding-the-installed-mcp-server-to-reveal-tools.png " ")

   Available tools summary: 

   |Tool | Parameters | Definition |
   | --- | ---------- | ---------- | 
   | `list-connections` | <ul><li>`filter`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>This is the filter that will be used to refine the list of connections</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
   | `connect` | <ul><li>`connection_name`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
   | `disconnect` | <ul><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The name of the saved connection you want to connect to</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
   | `run-sqlcl` | <ul><li>`sqlcl`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The SQLcl command to execute</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|
   | `sql` | <ul><li>`sql`</li><li>`mcp_client`</li><li>`model`</li></ul> | <ul><li>The SQL query to execute</li><li>Specify the name and version of the MCP client implementation being used (e.g. Copilot, Claude, Cline...)</li><li>The name (and version) of the language model being used by the MCP client to process requests (e.g. gpt-4.1, claude-sonnet-4, llama4...</li></ul>|

7. With your SQLcl MCP Server configured, you may now proceed to the next lab.


<!-- (optional) Step 1 opening paragraph.

1. Sub step 1

		![Image alt text](images/sample1.png)

  To create a link to local file you want the reader to download, use the following format.

	> **Note:** _The filename must be in lowercase letters and CANNOT include any spaces._

  Download the [starter file](files/starter-file.sql) SQL code.

	When the file type is recognized by the browser, it will attempt to render it. So you can use the following format to force the download dialog box.

	> **Note:** _The filename must be in lowercase letters and CANNOT include any spaces._

	Download the [sample JSON code](files/sample.json?download=1).

  *IMPORTANT: do not include zip files, CSV, PDF, PSD, JAR, WAR, EAR, bin or exe files - you must have those objects stored somewhere else. We highly recommend using Oracle Cloud Object Store and creating a PAR URL instead. See [Using Pre-Authenticated Requests](https://docs.cloud.oracle.com/en-us/iaas/Content/Object/Tasks/usingpreauthenticatedrequests.htm)*

2. Sub step 2

    ![Image alt text](images/sample1.png)

4. Example with inline navigation icon ![Image alt text](images/sample2.png) click **Navigation**.

5. Example with bold **text**.

  If you add another paragraph, add 3 spaces before the line.

## Task 2: <what is the action in this step>

1. Sub step 1 - tables sample

  Use tables sparingly:

  | Column 1 | Column 2 | Column 3 |
  | --- | --- | --- |
  | 1 | Some text or a link | More text  |
  | 2 |Some text or a link | More text |
  | 3 | Some text or a link | More text |

2. You can also include bulleted lists - make sure to indent 4 spaces:

    - List item 1
    - List item 2

3. Code examples

    ```
    Adding code examples
  	Indentation is important for the code example to appear inside the step
    Multiple lines of code
  	<copy>Enclose the text you want to copy in <copy></copy>.</copy>
    ```

4. Code examples that include variables

	```
  <copy>ssh -i <ssh-key-file></copy>
  ```

## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Group, Month Year> -->
