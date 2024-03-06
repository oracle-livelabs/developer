# Verify Tests

## Introduction

In this lab, we will use liquibase to track database modifications

### Objectives

* Introduce database modifications in our CI/CD pipeline

### Prerequisites

This lab assumes you have completed previous labs.

## Task 1: Modify azure-pipelines.yml to install and run liquibase 

1. Example snippets can be found in `azure-pipelines-liquibase-snippet.yml` files in the repothe following to  `azure-pipelines.yml` under the `build` section

   ```yaml
   - script: |
        echo Installing Liquibase
        wget https://github.com/liquibase/liquibase/releases/download/v4.4.3/liquibase-4.4.3.tar.gz
        tar -xzf liquibase-4.4.3.tar.gz
        echo Downloading Oracle JDBC driver
        wget https://path/to/ojdbc8.jar
        displayName: 'Install Liquibase and Oracle JDBC'
   ```
   
   And add the following under the `deploy` section and refer to variables that are part of the pipeline (define as needed).

   ```yaml
   - script: |
     echo Setting up environment variables
     export DB_HOST=$(DB_HOST)
     export DB_PORT=$(DB_PORT)
     export DB_SERVICE_NAME=$(DB_SERVICE_NAME)
     export DB_USERNAME=$(DB_USERNAME)
     export DB_PASSWORD=$(DB_PASSWORD)
   
     echo Running Liquibase update
     ./liquibase --defaultsFile=liquibase.properties update
     displayName: 'Run Liquibase Update'
     env:
     LIQUIBASE_HOME: $(Build.SourcesDirectory)/liquibase-4.4.3
     CLASSPATH: $(Build.SourcesDirectory)/ojdbc8.jar
     DB_HOST: $(DB_HOST)
     DB_PORT: $(DB_PORT)
     DB_SERVICE_NAME: $(DB_SERVICE_NAME)
     DB_USERNAME: $(DB_USERNAME)
     DB_PASSWORD: $(DB_PASSWORD)
   ```
   
   2.  Commit and push the change to the git repos.

## Task 2: Understand the Liquibase configuration and make and test a modification

   1. Examine the `liquibase.properties` file and the values that get set by the environment as well as the `changeLogFile` value

      ```properties
         driver: oracle.jdbc.OracleDriver
         url: jdbc:oracle:thin:@//${DB_HOST}:${DB_PORT}/${DB_SERVICE_NAME}
         username: ${DB_USERNAME}
         password: ${DB_PASSWORD}
         changeLogFile: db/changelog/db.changelog-master.xml
         classpath: ojdbc8.jar
      ```
   
   2. Examine the change log file at `db/changelog/db.changelog-master.xml` 

      ```xml
         <databaseChangeLog>
            <changeSet id="1" author="your_name">
               <createTable tableName="cicd_test_table">
                  <column name="testvalue" type="VARCHAR2(64)"/>
               </createTable>
            </changeSet>
         </databaseChangeLog>
      ```
   Notice this is the table created earlier.


  3. Modify the database and verify if the Spring Boot application still works. 
     
     Change log file at `db/changelog/db.changelog-master.xml` so that the `cicd_test_table` is modified.
     
     Run the application using the same endpoint that was used in the earlier lab and verify the change of results as a result of the database change.

     Run liquibase commands such as `rollback` to revert changes, etc. as appropriate


This concludes this lab. You can **proceed now to the next lab**.


## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate, Oracle Database

* **Last Updated By/Date** - 2024.