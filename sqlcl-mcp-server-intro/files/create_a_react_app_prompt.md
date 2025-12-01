# Single Web Page Application example

## Overview

1. You will create a sample single page React application using available information in the chosen connection. If I do not explicitly tell you which connection to use, prompt me with the available connections and have me choose one before proceeding.
2. You have access to view the table data in the CO schema. The sample application will use data from these CO tables. If my target schema does not have access to the CO schema data, then recommend alternatives for me. If you have trouble you can use the following SQL to familarize yourself with the HR schema: 

  `SELECT table_name FROM all_tables WHERE owner='CO' ORDER BY table_name;`  

3. You will make provisions for dynamically fetching data from the database using the node-oracledb add-on for Node.js applications. The initial version of this application will use hard-coded values from the target table data.

4. Here is a example for setting up node-oracledb: 

    ```js
    /* Copyright (c) 2018, 2024, Oracle and/or its affiliates. */

    /******************************************************************************
     *
    * This software is dual-licensed to you under the Universal Permissive License
    * (UPL) 1.0 as shown at https://oss.oracle.com/licenses/upl and Apache License
    * 2.0 as shown at http://www.apache.org/licenses/LICENSE-2.0. You may choose
    * either license.
    *
    * If you elect to accept the software under the Apache License, Version 2.0,
    * the following applies:
    *
    * Licensed under the Apache License, Version 2.0 (the "License");
    * you may not use this file except in compliance with the License.
    * You may obtain a copy of the License at
    *
    *    https://www.apache.org/licenses/LICENSE-2.0
    *
    * Unless required by applicable law or agreed to in writing, software
    * distributed under the License is distributed on an "AS IS" BASIS,
    * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
    * See the License for the specific language governing permissions and
    * limitations under the License.
    *
    * NAME
    *   example.js
    *
    * DESCRIPTION
    *   A basic node-oracledb example.
    *
    *   For connection pool examples see connectionpool.js and webapp.js
    *   For a ResultSet example see resultset1.js
    *   For a query stream example see selectstream.js
    *
    *****************************************************************************/

    'use strict';

    Error.stackTraceLimit = 50;

    const oracledb = require('oracledb');
    const dbConfig = require('./dbconfig.js');

    // This example runs in both node-oracledb Thin and Thick modes.
    //
    // Optionally run in node-oracledb Thick mode
    if (process.env.NODE_ORACLEDB_DRIVER_MODE === 'thick') {

      // Thick mode requires Oracle Client or Oracle Instant Client libraries.
      // On Windows and macOS you can specify the directory containing the
      // libraries at runtime or before Node.js starts.  On other platforms (where
      // Oracle libraries are available) the system library search path must always
      // include the Oracle library path before Node.js starts.  If the search path
      // is not correct, you will get a DPI-1047 error.  See the node-oracledb
      // installation documentation.
      let clientOpts = {};
      // On Windows and macOS platforms, set the environment variable
      // NODE_ORACLEDB_CLIENT_LIB_DIR to the Oracle Client library path
      if (process.platform === 'win32' || process.platform === 'darwin') {
        clientOpts = { libDir: process.env.NODE_ORACLEDB_CLIENT_LIB_DIR };
      }
      oracledb.initOracleClient(clientOpts);  // enable node-oracledb Thick mode
    }

    console.log(oracledb.thin ? 'Running in thin mode' : 'Running in thick mode');

    async function run() {
      let connection;

      try {

        let sql, binds, options, result;

        connection = await oracledb.getConnection(dbConfig);

        //
        // Create a table
        //

        const stmts = [
          `DROP TABLE no_example`,

          `CREATE TABLE no_example (id NUMBER, data VARCHAR2(20))`
        ];

        for (const s of stmts) {
          try {
            await connection.execute(s);
          } catch (e) {
            if (e.errorNum != 942)
              console.error(e);
          }
        }

        //
        // Insert three rows
        //

        sql = `INSERT INTO no_example VALUES (:1, :2)`;

        binds = [
          [101, "Alpha" ],
          [102, "Beta" ],
          [103, "Gamma" ]
        ];

        // For a complete list of options see the documentation.
        options = {
          autoCommit: true,
          // batchErrors: true,  // continue processing even if there are data errors
          bindDefs: [
            { type: oracledb.NUMBER },
            { type: oracledb.STRING, maxSize: 20 }
          ]
        };

        result = await connection.executeMany(sql, binds, options);

        console.log("Number of rows inserted:", result.rowsAffected);

        //
        // Query the data
        //

        sql = `SELECT * FROM no_example`;

        binds = {};

        // For a complete list of options see the documentation.
        options = {
          outFormat: oracledb.OUT_FORMAT_OBJECT,   // query result format
          // fetchArraySize:   100                 // internal buffer allocation size for tuning
        };

        result = await connection.execute(sql, binds, options);

        // Column metadata can be shown, if desired
        // console.log("Metadata: ");
        // console.dir(result.metaData, { depth: null });

        console.log("Query results: ");
        console.dir(result.rows, { depth: null });

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
    ```

4. You will follow the instructions in the following steps:

## CO schema exploration

1. Connect as the chosen connection (user) and explore the CO tables
2. Provide me with a summary of insights on the CO tables
3. Recommend to me some potential statistics/metrics in this CO schema that would be interesting for the single page web application. 
4. Allow me to choose one of these statistics/metrics to use for the single page web application.

## Creating the web application

1. Create a project directory before scaffolding a project.
2. Once the directory is created, scaffold the single page React application. 
3. Using what you learned about the CO schema, and the selection I made in the CO schema exploration section, reconnect as the chosen connection (user) and query the values you need to populate the React application.
4. The React application should include 2-3 charts and/or graphs that are dynamic, and provide meaningul, useful, and actionable insights. Everything should fit in a single viewport (nothing "below the fold").
5. Share with me what you intend to display on the React page before altering the app source files.

## Provide some helpful inight 
1. Once complete, provide me with a list of next steps, or recommended actions for making this more dynamic.
2. Answer the following questions: 
  - What options do I have for establishing an Oracle database connection so my app can update in real time? 
  - What options do I have if a user wants to update one of these underlying tables? 
  - What other functions do you recommend this app should have? 
  - What other Oracle database technologies could I use in/with this React application? 

## Launch the web application

1. Launch the web application and review it for accuracy and expected outcome
2. If the data and visualization are not visible on screen, please debug as needed. 
