# Developing Node.js Applications for Oracle Autonomous Database

## Introduction

Node.js an asynchronous event-driven JavaScript runtime, It is designed to build scalable network applications. Thread-based networking is relatively inefficient and very difficult to use. Furthermore, users of Node.js are free from worries of dead-locking the process, since there are no locks. Almost no function in Node.js directly performs I/O, so the process never blocks except when the I/O is performed using synchronous methods of Node.js standard library. Because nothing blocks, scalable systems are very reasonable to develop in Node.js.

### About this Lab

This Lab shows you how to connect Node.js applications to Oracle Database using the node-oracledb module. This module lets you quickly develop applications that execute SQL or PL/SQL statements. Your applications can also use Oracle's document storage SODA calls. Node-oracledb can be used with TypeScript or directly with Node.js.  

Estimated Time: 20 minutes
 
### Objectives
 
In this lab, you will: 

* Write Node.js code to access Oracle Database 
* Run the code

### Prerequisites 
This lab assumes you have:
 
* Autonomous Database has been created
 
## Task 1: Install the Oracle Instant Client basic package
 
### macOS
 
Download the free Oracle Instant Client Basic DMG file from [Instant Client Downloads for macOS (Intel x86).](https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html)

Mount the DMG and run its install_ic.sh script. [More details are in the Instant Client installation instructions](https://www.oracle.com/database/technologies/instant-client/macos-intel-x86-downloads.html#ic_osx_inst).

```
<copy>
      $ ./install_ic.sh
</copy>
```  

### Windows OS

Download the free Oracle Instant Client Basic zip file from [Oracle Instant Client for Microsoft Windows (x64) 64-bit](https://www.oracle.com/database/technologies/instant-client/winx64-64-downloads.html) . (If your Node.js is 32-bit, then you will need to download the 32-bit Basic package from here instead). Remember to install the matching VS Re distributable, as shown on the download page.

Extract the libraries to an accessible directory, for example the libraries could be in C:\oracle\instantclient\_19\_8

### Linux

Install Instant Client, for example on Oracle Linux 7:

```
<copy>
sudo yum install oracle-instantclient-release-el7
sudo yum install oracle-instantclient-basic
</copy>
```   

For other Linux flavors, install the Instant Client ZIP files and follow the instructions from the download page: [Instant Client for Linux x86-64 (64-bit)](https://www.oracle.com/database/technologies/instant-client/linux-x86-64-downloads.html). If you use ZIP files, make sure to run ldconfig or set LD_LIBRARY_PATH as shown in the instructions.
   
## Task 2: Move and extract Autonomous Database wallet under network/admin folder of Instant Client
 
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

extract the wallet zip file under **/network/admin** folder of **Instant Client**

```
<copy> 
      unzip Wallet_*.zip
</copy>
``` 

### Windows OS
 
Move the Autonomous Database wallet zip file that we had downloaded in Lab 1 into network/admin directory of Instant Client
 
Make a network\admin sub-directory in your Instant Client directory, for example C:\oracle\instantclient\_19\_8\network\admin.

Unzip the previously obtained credentials zip file and move the extracted files to the new network\admin sub-directory. Wallet files including network\admin\tnsnames.ora should exist.

### Linux

Move the credentials zip file to the network/admin sub-directory of your Instant Client directory and unzip it.  
  
```
<copy> 
sudo cp Wallet_*.zip /usr/lib/oracle/21/client64/lib/network/admin/
sudo sh -c 'cd /usr/lib/oracle/21/client64/lib/network/admin/ && unzip -B Wallet_*.zip'
</copy>
``` 
 
## Task 3: Install Node.js

### Mac OS

Install [Node.js](https://nodejs.org/en/download/) by downloading and installing the macOS installer package.
 
### Windows OS
 
Install Node.js by downloading the MSI package, clicking it, and following the prompts.

Restart terminal windows, if necessary, so that the new Node.js binary is found.

### Linux

Install Node.js. For example, on Oracle Linux :

```
<copy> 
sudo yum install oracle-nodejs-release-el8
sudo yum install nodejs
</copy>
``` 
   
For generic installation steps, see [Node.js Downloads](https://nodejs.org/en/download/).

## Task 4: Install node-oracledb

### macOS

1. Using your favorite editor, create a new file *package.json* in a directory of your choice. It should contain:
 
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

      View the output in the command prompt.

      ```
      <copy>
            added 1 package, and audited 2 packages in 1s

      found 0 vulnerabilities
      npm notice 
      npm notice New minor version of npm available! 8.5.5 -> 8.8.0
      npm notice Changelog: https://github.com/npm/cli/releases/tag/v8.8.0
      npm notice Run npm install -g npm@8.8.0 to update!
      npm notice 
      </copy>
      ```  
 
## Task 5: Node Application to select data from a table

1. In this example, we will create a Node.js application that connects to the database using Oracle Instant Client. Create __customers360.js__ in the same directory as **package.json**

      ```
      <copy>
       const oracledb = require('oracledb'); 
      // On Windows and macOS, you can specify the directory containing the Oracle
      // Client Libraries at runtime, or before Node.js starts.  On other platforms
      // the system library search path must always be set before Node.js is started.
      // See the node-oracledb installation documentation.
      // If the search path is not correct, you will get a DPI-1047 error.
      let libPath;
      if (process.platform === 'win32') {           // Windows
        libPath = 'C:\\oracle\\instantclient_19_12';
      } else if (process.platform === 'darwin') {   // macOS
        libPath = process.env.HOME + '/Downloads/instantclient_19_8';
      }
      if (libPath && fs.existsSync(libPath)) {
        oracledb.initOracleClient({ libDir: libPath });
      }

      async function run() {

      let connection;

      try { 
            connection = await oracledb.getConnection({
            user: "<db_user>",
            password: "<password>",
            connectionString: "<DBName_high>"
      });

      console.log("Connected to DB and select from customers360 table");
 
      result = await connection.execute('select * from customers360 where rownum < 10',[],
                                            { resultSet: true, outFormat: oracledb.OUT_FORMAT_OBJECT }
                                        );

      const rs = result.resultSet;
      let row; 
        while ((row = await rs.getRow())) {
              console.log(row);
            }
          await rs.close();
          }
          catch (err) {
                console.error(err);
          }
          finally  {
            if (connection) {
                  try {
                    await connection.close();
                  }
                  catch (err) {
                    console.error(err);
                  }
          }
        }
      } 
      run();
      </copy>
      ``` 

      In **oracledb.getConnection()** Substitute <db\_user\> <password\> and <DBName\_high\> depending upon the configurations in Lab 1

      Run customers360.js 

      ```
      <copy>
            node customers360.js
      </copy>
      ```   

      View the customer data from customers360 table
      
      This completes the lab. At this point, you know how to create a NodeJS application that connects to Oracle Autonomous Database. You may now **proceed to the next lab**.

## Learn More

* [Quick Start: Developing Node.js Applications for Oracle Autonomous Database](https://www.oracle.com/database/technologies/appdev/quickstartnodejs.html) 
* [How do I start with Node.js](https://nodejs.org/en/docs/guides/getting-started-guide/) 
* [Node API Examples](https://oracle.github.io/node-oracledb/doc/api.html#getstarted)    
* [Code Examples: node-oracledb](https://github.com/oracle/node-oracledb) 
 
## Acknowledgements

* **Author** - Madhusudhan Rao, Principal Product Manager, Database 
* **Contributors** - Kevin Lazarz, Senior Principal Product Manager, Database and Christopher Jones, Senior Principal Product Manager
* **Last Updated By/Date** -  Madhusudhan Rao, Jun 2022
