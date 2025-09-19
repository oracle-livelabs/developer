# Creating schemas and granting privileges to the SQL_FREESQL_01 user

## Download and extract files
1. The latest version of the Oracle database 23ai sample schemas and installation scripts are located here: https://github.com/oracle-samples/db-sample-schemas/archive/refs/tags/v23.3.zip

2. Download the .zip file from GitHub, and save to my current working directory
3. Unzip the .zip file
4. Delete the .zip file once you have unzipped it

## Creating the sample schemas

### Create the Human Resources schema

1. cd to into the human_resources folder
2. Connect as SQL_FREESQL_01
3. Use the sqlcl tool to execute the installation script with the @hr_install.sql command. Use the following values for the following prompts:
    - Password12345 for the `ACCEPT pass PROMPT 'Enter a password for the user CO: ' HIDE` prompt.
    - DEFAULT for the `ACCEPT tbs PROMPT 'Enter a tablespace for CO [&var_default_tablespace]: ' DEFAULT '&var_default_tablespace'` prompt.
    - YES for the `ACCEPT overwrite_schema PROMPT 'Do you want to overwrite the schema, if it already exists? [YES|no]: ' DEFAULT 'YES'` prompt.
     followed by required arguments, to create the CO schema
4. Prompt me for the Password, tablespace, and if we should overwrite the schema
5. Use the default tablespace for the schema
6. Overwrite the existing schema if it exists
7. Grant all privileges to the tables and views in the HR schema to the SQL_FREESQL_01 user.
    - NOTE: You must describe the schema first, and then issue these grants one table and/or view at a time. You cannot perform a bulk grant on these tables and views. It is not a valid operation in the Oracle database

### Create the Customer Orders schema

1. cd to into the customer_orders folder
2. Connect as SQL_FREESQL_01
3. Use the sqlcl tool to execute the installation script with the @co_install.sql command. Use the following values for the following prompts:
    - Password12345 for the `ACCEPT pass PROMPT 'Enter a password for the user CO: ' HIDE` prompt.
    - DEFAULT for the `ACCEPT tbs PROMPT 'Enter a tablespace for CO [&var_default_tablespace]: ' DEFAULT '&var_default_tablespace'` prompt.
    - YES for the `ACCEPT overwrite_schema PROMPT 'Do you want to overwrite the schema, if it already exists? [YES|no]: ' DEFAULT 'YES'` prompt.
4. Prompt me for the Password, tablespace, and if we should overwrite the schema
5. Use the default tablespace for the schema
6. Overwrite the existing schema if it exists
7. Grant all privileges to the tables and views in the CO schema to the SQL_FREESQL_01 user.
    - NOTE: You must describe the schema first, and then issue these grants one table and/or view at a time. You cannot perform a bulk grant on these tables and views. It is not a valid operation in the Oracle database

### Create the Sales History schema

1. cd to into the sales_history folder
2. Connect as SQL_FREESQL_01
5. Use the sqlcl tool to execute the installation script with the @sh_install.sql command. Use the following values for the following prompts:
    - Password12345 for the `ACCEPT pass PROMPT 'Enter a password for the user CO: ' HIDE` prompt.
    - DEFAULT for the `ACCEPT tbs PROMPT 'Enter a tablespace for CO [&var_default_tablespace]: ' DEFAULT '&var_default_tablespace'` prompt.
    - YES for the `ACCEPT overwrite_schema PROMPT 'Do you want to overwrite the schema, if it already exists? [YES|no]: ' DEFAULT 'YES'` prompt. 
4. Prompt me for the Password, tablespace, and if we should overwrite the schema
5. Use the default tablespace for the schema
6. Overwrite the existing schema if it exists
9. Grant all privileges to the tables and views in the SH schema to the SQL_FREESQL_01 user.
    - NOTE: You must describe the schema first, and then issue these grants one table and/or view at a time. You cannot perform a bulk grant on these tables and views. It is not a valid operation in the Oracle database

## Granting ALL PRIVILEGES to the SQL_FREESQL_01 user 

### HR Schema

1. The SQL_FREESQL_01 user will need to be able to view with and interact with the objects in the HR schema.
2. Perform a Describe schema on the HR schema, and make a note of the available objects.
3. Attempt the following statement, individually on each object in the HR schema: 

   ```sql
   GRANT ALL PRIVILEGES on [database object] to SQL_FREESQL_01;
   ```

> NOTE: A [database object] is one of: table, view, procedure, trigger, type, sequence
> NOTE: You cannot perform a bulk grant on these tables and views. It is not a valid operation in the Oracle database.
> NOTE: Should a failure occur, attempt with the fully-qualified object name such as "SCHEMA.OBJECT"

4. Report back with your results: Where the GRANTs successful or a failure? Specifically, what succeeded, and what failed?

5. Await for my approval before proceeding to the next step.

### CO Schema

1. The SQL_FREESQL_01 user will need to be able to view with and interact with the objects in the CO schema.
2. Perform a Describe schema on the CO schema, and make a note of the available objects.
3. Attempt the following statement, individually on each object in the CO schema: 

   ```sql
   GRANT ALL PRIVILEGES on [database object] to SQL_FREESQL_01;
   ```

> NOTE: A [database object] is one of: table, view, procedure, trigger, type, sequence
> NOTE: You cannot perform a bulk grant on these tables and views. It is not a valid operation in the Oracle database.
> NOTE: Should a failure occur, attempt with the fully-qualified object name such as "SCHEMA.OBJECT"

4. Report back with your results: Where the GRANTs successful or a failure? Specifically, what succeeded, and what failed?

5. Await for my approval before proceeding to the next step.

### SH Schema

1. The SQL_FREESQL_01 user will need to be able to view with and interact with the objects in the SH schema.
2. Perform a Describe schema on the SH schema, and make a note of the available objects.
3. Attempt the following statement, individually on each object in the SH schema: 

   ```sql
   GRANT ALL PRIVILEGES on [database object] to SQL_FREESQL_01;
   ```

> NOTE: A [database object] is one of: table, view, procedure, trigger, type, sequence
> NOTE: You cannot perform a bulk grant on these tables and views. It is not a valid operation in the Oracle database.
> NOTE: Should a failure occur, attempt with the fully-qualified object name such as "SCHEMA.OBJECT"

4. Report back with your results: Where the GRANTs successful or a failure? Specifically, what succeeded, and what failed?

5. Await for my approval before proceeding to the next step.

## Review as SQL_FREESQL_01 schema

1. If not already connected as the SQL_FREESQL_01 schema, connect. 
2. Perform a query to describe the avaiable objects for each of the following schemas, WHERE 
USERNAME = 
  - 'HR'
  - 'CO'
  - 'SH'

3. Display the results, one schema at a time.
4. Once complete, disconnect from the database.



