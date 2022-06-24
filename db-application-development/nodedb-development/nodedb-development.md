# Developing Node.js Applications for Oracle Autonomous Database

## Introduction

Node.js an asynchronous event-driven JavaScript runtime, It is designed to build scalable network applications. Thread-based networking is relatively inefficient and very difficult to use. Furthermore, users of Node.js are free from worries of dead-locking the process, since there are no locks. Almost no function in Node.js directly performs I/O, so the process never blocks except when the I/O is performed using synchronous methods of Node.js standard library. Because nothing blocks, scalable systems are very reasonable to develop in Node.js.

### About this Lab

This lab uses node-oracledb module, which lets you do SQL, PL/SQL, and Oracle's document storage, SODA calls. Node-oracledb can be used with TypeScript or directly with Node.js. 

Estimated Time: 20 minutes
 
### Objectives
 
In this lab, you will: 

* Write Node.js code to access Oracle Database 
* Run the code

### Prerequisites 
This lab assumes you have:
 
* An Autonomous Database has been created.
* A wallet has been downloaded. 
 
## Task 1: Install the Oracle Instant Client Basic Package
 
### macOS
 
Download the free Oracle Instant Client Basic DMG file from [Instant Client Downloads for macOS (Intel x86).](https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html)  

Mount the DMG and run its install_ic.sh script. [More details are in the Instant Client installation instructions](https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html#ic_osx_inst).

> **Note:** This Lab does not work on Apple M1 Chip. You can use [Rosetta] (https://en.wikipedia.org/wiki/Rosetta_(software)) which is not shown in this Lab. 

```
<copy>
      $ ./install_ic.sh
</copy>
```  

### Microsoft Windows

Download the free Oracle Instant Client Basic zip file from [Oracle Instant Client for Microsoft Windows (x64) 64-bit](https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html) . (If your Node.js is 32-bit, then you will need to download the 32-bit Basic package from here instead). Remember to install the matching VS Re distributable, as shown on the download page.

Extract the libraries to an accessible directory, for example the libraries could be in C:\oracle\instantclient\_19\_8

### Oracle Linux
 
If you are using Oracle Linux 7 run these commands

```
<copy>
sudo yum install oracle-instantclient-release-el7
sudo yum install oracle-instantclient-basic
</copy>
```   

If you are using Oracle Linux 8 run these commands

```
<copy>
sudo dnf install oracle-instantclient-release-el8 
sudo dnf install oracle-instantclient-basic
</copy>
```   

For other Linux flavors, install the Instant Client zip files and follow the instructions from the download page: [Instant Client for Linux x86-64 (64-bit)](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html). If you use zip files, make sure to run ldconfig or set LD\_LIBRARY\_PATH as shown in the instructions.

You can also refer [Database Client Installation Guide for Linux](https://docs.oracle.com/en/database/oracle/oracle-database/21/lacli/install-instant-client-using-zip.html#GUID-D3DCB4FB-D3CA-4C25-BE48-3A1FB5A22E84)
   
## Task 2: Extract Autonomous Database wallet under the Instant Client network/admin folder
 
### macOS
   
Move the Autonomous Database wallet zip file that you had downloaded in Lab 1 under /instantclient\_19\_8/network/admin directory

```
<copy>
      mv Wallet_*.zip $HOME/Downloads/instantclient_19_8/network/admin 
</copy>
``` 

```
<copy> 
      cd $HOME/Downloads/instantclient_19_8/network/admin 
</copy>
``` 

Extract the wallet zip file under **/network/admin** folder of **Instant Client**

```
<copy> 
      unzip Wallet_*.zip
</copy>
``` 

### Microsoft Windows 
 
Move the Autonomous Database wallet zip file that you downloaded in Lab 1 into the network\admin directory of Instant Client.
 
Make a network\admin sub-directory in your Instant Client directory, for example, C:\oracle\instantclient\_19\_8\network\admin.
 
### Oracle Linux

Move the credentials zip file to the network/admin sub-directory of your Instant Client directory and unzip it.  
  
```
<copy> 
sudo cp Wallet_*.zip /usr/lib/oracle/21/client64/lib/network/admin/
sudo sh -c 'cd /usr/lib/oracle/21/client64/lib/network/admin/ && unzip -B Wallet_*.zip'
</copy>
``` 
 
## Task 3: Install Node.js

### macOS

Install [Node.js](https://nodejs.org/en/download/) by downloading and installing the macOS installer package.
 
### Microsoft Windows 
 
Install Node.js by downloading the MSI package, clicking it, and following the prompts.

Restart terminal windows, if necessary, so that the new Node.js binary is found.

### Linux

Install Node.js. If you are using Oracle Linux 8 run these commands.

```
<copy> 
sudo yum install oracle-nodejs-release-el8
sudo yum install nodejs
</copy>
``` 
   
For generic installation steps, see [Node.js Downloads](https://nodejs.org/en/download/).

## Task 4: Install node-oracledb
 

1. Using your favourite editor, create a new file *package.json* in a directory of your choice. It should contain:
 
      ```
      <copy>
      {
            "name": "Demo",
            "version": "1.0.0",
            "private": true,
            "description": "Demo app",
            "keywords": [
                  "myapp"
            ],
            "dependencies": {
                  "oracledb": "^5.4.0"
            },
            "author": "You",
            "license": "MIT"
      }
      </copy>
      ``` 

      Run npm installation command.

      ```
      <copy>
            npm install
      </copy>
      ```  
 
## Task 5: Node.js Application to select data from a table

1. In this example, you create a Node.js application that connects to the database using Oracle Instant Client. Create __customers360.js__ in the same directory as **package.json**

      ```
      <copy>
      const oracledb = require("oracledb");

      // On Windows and macOS, you can specify the directory containing the Oracle
      // Client Libraries at runtime, or before Node.js starts.  On other platforms
      // the system library search path must always be set before Node.js is started.
      // See the node-oracledb installation documentation.
      // If the search path is not correct, you will get a DPI-1047 error.

      let libPath;

      if (process.platform === "win32") {
            // Windows
            libPath = "C:\\oracle\\instantclient_19_8";
      } else if (process.platform === "darwin") {
            // macOS
            libPath = process.env.HOME + "/Downloads/instantclient_19_8";
      }

      if (libPath && fs.existsSync(libPath)) {
      oracledb.initOracleClient({
            libDir: libPath
      });
      }

      async function run() {
            let connection;

            try {
                  connection = await oracledb.getConnection({
                        user: "<db_user>",
                        password: "<password>",
                        connectionString: "<DBName_high>",
                  });

                  console.log("Connected to DB and select from customers360 table");

                  result = await connection.execute(
                        "select * from customers360 where rownum < 10",
                        [], {
                        resultSet: true,
                        outFormat: oracledb.OUT_FORMAT_OBJECT
                        }
                  );

                  const rs = result.resultSet;

                  let row;
                  while ((row = await rs.getRow())) {
                        console.log(row);
                  }
                  await rs.close(); 

            } catch (err) {

                  console.error(err);

            } finally {

                  if (connection) {
                        try {
                        await connection.close();
                        } catch (err) {
                        console.error(err);
                        }
                  }
            }
      }

      run();
      </copy>
      ``` 

      In **oracledb.getConnection()** Substitute <db\_user\>, <password\> and <DBName\_high\> depending upon the configuration in Lab 1

      Run customers360.js 

      ```
      <copy>
            node customers360.js
      </copy>
      ```   

      View the customer data from customers360 table
      
      This completes the lab. At this point, you know how to create a Node.js application that connects to Oracle Autonomous Database. You may now **proceed to the next lab**.

## Learn More

* [Quick Start: Developing Node.js Applications for Oracle Autonomous Database](https://www.oracle.com/database/technologies/appdev/quickstartnodejs.html) 
* [How do I start with Node.js](https://nodejs.org/en/docs/guides/getting-started-guide/) 
* [Node API Examples](https://oracle.github.io/node-oracledb/doc/api.html#getstarted)    
* [Code Examples: node-oracledb](https://github.com/oracle/node-oracledb) 
 
## Acknowledgements

* **Author** - Madhusudhan Rao, Principal Product Manager, Database 
* **Contributors** - Kevin Lazarz, Senior Principal Product Manager, Database and Christopher Jones, Senior Principal Product Manager
* **Last Updated By/Date** -  Madhusudhan Rao, Jun 24th 2022
