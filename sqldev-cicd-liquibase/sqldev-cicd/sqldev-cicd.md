# Capture Oracle Database Changes with Liquibase from SQL Developer

## Introduction

Capturing object definition and code changes from an Oracle Database can look complex, however, with a little discipline and organization, this process can be totally effortless and simple. 

This scenario is based on the requirement to run all tasks from SQL Developer, so the developer does not have to leave the IDE while working on the requests/tickets received from project manager (logging system).

Estimated Lab Time: 120 minutes

### Objectives
In this lab, you will:
* Add files to your GitHub repository and push changes
* Capture initial database schema using Liquibase
* Save code from database to files and maintain it using Git versions
* Build Liquibase master changelog to organize the entire project
* Create snapshots and use them for comparison to capture new changes
* Apply changes from a specific release of your project to a new database
* Compare two databases and generate changelog

### Prerequisites
* Capture Oracle Database Changes Introduction

## Task 1: Capture initial schema and code

1. If you executed the first lab that runs Liquibase from SQLcl, it is a good practice to re-create the HR schema in your ATP instance. Connect to the **ATPdev01** ATP service as **admin**. Replace `[Your Initials]` with your initials.

    ````
    export TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev01

    cd ~

    sqlplus admin/DBlearnPTS#21_@[Your Initials]dev01_tp

    drop user hr cascade;

    @db-sample-schemas-19c/human_resources/hr_main.sql DBlearnPTS#21_ DATA TEMP DBlearnPTS#21_ /home/oracle/logs/ [Your Initials]dev01_high

    exit
    ````

2. Create a new GitHub repository **cicd-ws-rep01**, and clone it on your compute node.

    ````
    cd ~

    git clone https://github.com/[GitHub username]/cicd-ws-rep01.git
    ````

3. Create a new folder for database changes in your project main folder.

    ````
    cd ~/cicd-ws-rep01

    mkdir database
    ````

4. Add Liquinase properties file to your Git repository, run your first commit and push.

    ````
    cp ~/cicd-ws-rep00/liquibase.properties ~/cicd-ws-rep01

    git add liquibase.properties

    git commit -a -m "Add Liquibase properties"

    git push
    ````

5. If your token expired, you will be asked to provide the GitHub username and password. If you have configured two-factor authentication, instead of the password, use your token.

    ````
    Username for 'https://github.com': [GitHub username]
    Password for 'https://[GitHub username]@github.com': [GitHub password/token]
    ````

6. This is **Developer #1** from your team, that is capturing the current **HR** schema, from SQL Developer. Use **hr@Dev01ATP** connection in SQL Developer, copy and paste the following lines in Worksheet, and click **Run Script** ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase --changeLogFile="database/initial_changelog.xml" --changeSetAuthor="Developer1" generateChangeLog
    ````

7. Use Files dialog in SQL Developer to navigate to and open `initial_changelog.xml` file from `/home/oracle/cicd-ws-rep01/database/` folder. It contains objects of types: tables, views, sequences, and constraints.

8. Check object types in **HR** schema, and the number of object of each type. Run the following statement in SQL Developer ![](./images/run-query.jpg "").

    ````
    select object_type, count(*) from user_objects group by object_type;
    ````

9. There are objects, defined by code, that we need to capture in separate files, like triggers and procedures.

10. Use SQL Developer Connections dialog to open (double-click) all procedures and triggers in HR schema, and save them as SQL files in `/home/oracle/cicd-ws-rep01/database/` folder.

11. Use a suffix at the end of the file name ('proc', 'trig', etc.), and add a last line with a slash `/` in each file. These files will be added to **cicd-ws-rep01** Git repository, so developers can work on the files for any code changes in this project. There are 4 files you need to create:
    * `add_job_history_proc.sql`
    * `secure_dml_proc.sql`  
    * `secure_employees_trig.sql`  
    * `update_job_history_trig.sql`

12. As an example, the contents of `secure_employees_trig.sql` must be:

    ````
    create or replace TRIGGER secure_employees
      BEFORE INSERT OR UPDATE OR DELETE ON employees
    BEGIN
      secure_dml;
    END secure_employees;
    /
    ````


## Task 2: Create a master changelog for the project

1. Create a Liquibase master changelog to reference other changelogs in your project. The master changelog is used to break up your entire changelog into more manageable pieces, by creating multiple changelogs to separate your changesets in a way that makes sense for your project. Paste and click Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; touch database/hr-master.xml
    ````

    > **Note** : Organize these pieces in the master changelog. As a best practice, I place objects changelogs first and code changelogs after, because code may depend on the objects created by the same developer as one piece (in the same sprint).

2. Open `hr-master.xml` in SQL Developer using Files dialog, and add the following contents, to inlcude just the initial **HR** schema changelog:

    ````
    <?xml version="1.1" encoding="UTF-8"?> 
    <databaseChangeLog
      xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                          http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.1.xsd">
      <include file="./initial_changelog.xml" relativeToChangelogFile="true"/>
    </databaseChangeLog>
    ````

    > **Note** : Remember to save files you open and modify in SQL Developer ![](./images/save.jpg "").

3. Create a manual changelog for code objects not captured by Liquibase (2 procedures and 2 triggers). Paste and click Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; touch database/hr-initial-code.xml
    ````

4. This changelog includes the 4 SQL scripts with code changes saved at previous step. Open `hr-initial-code.xml` in SQL Developer, and add these lines:

    ````
    <?xml version="1.1" encoding="UTF-8"?> 
    <databaseChangeLog
      xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                          http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.1.xsd">
        <changeSet author="Developer1" id="add_job_history_proc" runOnChange="true">
          <sqlFile dbms="oracle"
                   endDelimiter=";"
                   path="./add_job_history_proc.sql"
                   relativeToChangelogFile="true"
                   splitStatements="false"
                   stripComments="false"/>
        </changeSet>
        <changeSet author="Developer1" id="secure_dml_proc" runOnChange="true">
          <sqlFile dbms="oracle"
                   endDelimiter=";"
                   path="./secure_dml_proc.sql"
                   relativeToChangelogFile="true"
                   splitStatements="false"
                   stripComments="false"/>
        </changeSet>
        <changeSet author="Developer1" id="secure_employees_trig" runOnChange="true">
          <sqlFile dbms="oracle"
                   endDelimiter=";"
                   path="./secure_employees_trig.sql"
                   relativeToChangelogFile="true"
                   splitStatements="false"
                   stripComments="false"/>
        </changeSet>
        <changeSet author="Developer1" id="update_job_history_trig" runOnChange="true">
          <sqlFile dbms="oracle"
                   endDelimiter=";"
                   path="./update_job_history_trig.sql"
                   relativeToChangelogFile="true"
                   splitStatements="false"
                   stripComments="false"/>
        </changeSet>
    </databaseChangeLog>
    ````

5. Open `hr-master.xml` in SQL Developer, and add a line for the code changelog, and a version tag:

    ````
    <?xml version="1.1" encoding="UTF-8"?> 
    <databaseChangeLog
      xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                          http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.1.xsd">
      <include file="./initial_changelog.xml" relativeToChangelogFile="true"/>
      <include file="./hr-initial-code.xml" relativeToChangelogFile="true"/>
      <changeSet  author="Developer1"  id="tagDatabase-v1">  
        <tagDatabase  tag="version_1.0"/>  
      </changeSet>
    </databaseChangeLog>
    ````

6. Mark all these initial changes as deployed in the local development database, as they belong to the initial HR schema we used for our project. Paste and click Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase changeLogSync
    ````

7. Run this query ![](./images/run-query.jpg "") in SQL Developer to see changes currently recorded by Liquibase. `DATABASECHANGELOG` table tracks which changesets have been run in your database schema.

    ````
    select ID, AUTHOR, FILENAME, orderexecuted ORD, DESCRIPTION, TAG, EXECTYPE 
      from DATABASECHANGELOG order by 4 desc;
    ````

8. As a best practice, you can generate snapshots before and after modifying objects in your development database. In this lab, we will generate only after snapshots and use them to compare the current database schema state. Generate a snapshot called `Dev1SnapshotV1`. Paste and click Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase --outputFile=database/Dev1SnapshotV1.json snapshot --snapshotFormat=json
    ````

9. Add initial schema changes to the Git repository. Paste and click Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; git add database/*
    HOST cd &proj_dir; git commit -a -m "Version 1: Initial HR schema changelog and code"
    HOST cd &proj_dir; git push
    ````


## Task 3: Create new database objects and stored code

1. This is **Developer #2** from your team, that clones this Git repository on a local development environment, working on the same project. For this lab, we will not clone the repository with `git clone cicd-ws-rep01`, but will work on the same folder, just to simplify the scenario, and avoid to create multiple copies of these files on the same compute node, as we have a single development environment.

2. Using SQL Developer connection to HR schema, as **Developer #2**, we create a new table. Copy, paste and click Run Statement ![](./images/run-query.jpg "").

    ````
    create table PROSPECTS as
    (select EMPLOYEE_ID as PERSON_ID, FIRST_NAME, LAST_NAME, lower(EMAIL) || '@example.com' as EMAIL, 
            PHONE_NUMBER, add_months(HIRE_DATE,-120) as BIRTH_DATE, SALARY * 10 as SAVINGS from HR.EMPLOYEES);
    ````

3. Create a new package. Copy, paste and click Run Script ![](./images/run-script.jpg "").

    ````
    CREATE OR REPLACE PACKAGE investment_check AS
        TYPE check_record IS RECORD(
           id PROSPECTS.PERSON_ID%TYPE,
           first_name PROSPECTS.FIRST_NAME%TYPE, 
           last_name PROSPECTS.LAST_NAME%TYPE, 
           investment_limit NUMBER);
        TYPE check_table IS TABLE OF check_record;
        FUNCTION get_limits(check_limit NUMBER)
            RETURN check_table
            PIPELINED;
    END;
    /
    CREATE OR REPLACE PACKAGE BODY investment_check AS
        FUNCTION get_limits(check_limit number)
            RETURN check_table
            PIPELINED IS
            l_rec check_record;
        BEGIN
            FOR l_rec IN (
              select PERSON_ID, FIRST_NAME, LAST_NAME, 3*SAVINGS as INVESTMENT_LIMIT 
              from PROSPECTS 
              where 3*SAVINGS >= check_limit)
            LOOP
              PIPE ROW (l_rec);
            END LOOP;
            RETURN;
        END get_limits;
    END;
    /
    ````

4. Verify your new package function. Click Run Statement ![](./images/run-query.jpg "").

    ````
    SELECT * FROM table(investment_check.get_limits(350000));
    ````

5. Generate a changelog with differences between snapshot `Dev1SnapshotV1` and current database. Paste these lines and click Run Script ![](./images/run-script.jpg ""). Before running this script, replace **[Your Initials]** with your initials in `ref_db` definition.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    define ref_db="--referenceUrl=jdbc:oracle:thin:@[Your Initials]dev01_high?TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev01"
    HOST cd &proj_dir; liquibase &ref_db --referenceUsername=hr --referencePassword=DBlearnPTS#21_ --url=offline:oracle?snapshot=database/Dev1SnapshotV1.json --changeLogFile=database/hr-prospects.xml --changeSetAuthor="Developer2" diffChangeLog
    ````

6. As for the initial code, we need to open package and package body in SQL Developer Connections dialog (double-click), and save both as sql scripts in `/home/oracle/cicd-ws-rep01/database/` folder:
    * `investment_check_pack.sql`
    * `investment_check_packb.sql`

7. Create manual changelogs for code objects not captured by Liquibase. Paste these lines and click Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; touch database/hr-investment_check-code.xml
    ````

8. Open the new changelog `hr-investment_check-code.xml` in SQL Developer, and add:

    ````
    <?xml version="1.1" encoding="UTF-8"?> 
    <databaseChangeLog
      xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                          http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.1.xsd">
        <changeSet author="Developer2" id="investment_check_pack" runOnChange="true">
          <sqlFile dbms="oracle"
                   endDelimiter=";"
                   path="./investment_check_pack.sql"
                   relativeToChangelogFile="true"
                   splitStatements="false"
                   stripComments="false"/>
        </changeSet>
        <changeSet author="Developer2" id="investment_check_packb" runOnChange="true">
          <sqlFile dbms="oracle"
                   endDelimiter=";"
                   path="./investment_check_packb.sql"
                   relativeToChangelogFile="true"
                   splitStatements="false"
                   stripComments="false"/>
        </changeSet>
    </databaseChangeLog>
    ````

9. Update master changelog `hr-master.xml` to include the latest objects and code, specifying this is the next version of the project.

    ````
    <?xml version="1.1" encoding="UTF-8"?> 
    <databaseChangeLog
      xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                          http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.1.xsd">
      <include file="./initial_changelog.xml" relativeToChangelogFile="true"/>
      <include file="./hr-initial-code.xml" relativeToChangelogFile="true"/>
      <changeSet  author="Developer1"  id="tagDatabase-v1">  
        <tagDatabase  tag="version_1.0"/>  
      </changeSet>
      <include file="./hr-prospects.xml" relativeToChangelogFile="true"/>
      <include file="./hr-investment_check-code.xml" relativeToChangelogFile="true"/>
      <changeSet  author="Developer2"  id="tagDatabase-v2">  
        <tagDatabase  tag="version_2.0"/>  
      </changeSet>
    </databaseChangeLog>
    ````

10. Mark these last manual changes as deployed in the local development database. Paste these lines and click Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase changeLogSync
    ````

11. Verify again changes currently recorded by Liquibase in `DATABASECHANGELOG` table.

    ````
    select ID, AUTHOR, FILENAME, orderexecuted ORD, DESCRIPTION, TAG, EXECTYPE 
      from DATABASECHANGELOG order by 4 desc;
    ````

12. Generate a new snapshot called `Dev2SnapshotV2`.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase --outputFile=database/Dev2SnapshotV2.json snapshot --snapshotFormat=json
    ````

13. Add these last changes to your Git repository.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; git add database/*
    HOST cd &proj_dir; git commit -a -m "Version 2: Prospects table and Investment package"
    HOST cd &proj_dir; git push
    ````


## Task 4: Modify objects, add code, and re-capture changes

1. Now comes **Developer #3** from your team, that clones this Git repository on a local development environment, working on the same project. For this lab, we will not clone the repository with `git clone cicd-ws-rep01`, but will work on the same folder, just to simplify the scenario, and avoid to create multiple copies of these files on the same compute node, as we have a single development environment.

2. **Developer #3** creates new objects in this database development environment. Paste these lines in SQL Developer and click Run Script ![](./images/run-script.jpg "").

    ````
    CREATE SEQUENCE "HR_EVENTS_SEQ" MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 1 CACHE 20 NOORDER NOCYCLE  NOKEEP NOSCALE GLOBAL;
    /
    CREATE TABLE  "HR_EVENTS" 
       (	"ID" NUMBER,
            "EVENT_ID" NUMBER, 
    	"REGION" VARCHAR2(10), 
    	"COUNTRY" VARCHAR2(255),
    	"EVENT_DATE" DATE, 
    	"EVENT_NAME" VARCHAR2(255), 
    	 CONSTRAINT "HR_EVENTS_PK" PRIMARY KEY ("ID")
      USING INDEX ENABLE
       );
    /
    CREATE OR REPLACE EDITIONABLE TRIGGER  "bi_HR_EVENTS" 
      before insert on "HR_EVENTS"              
      for each row 
    begin  
      if :new."ID" is null then
        select "HR_EVENTS_SEQ".nextval into :new."ID" from sys.dual;
      end if;
    end;
    /
    ````

3. **Developer #3** also modifies some objects in this database development environment. Paste these lines in SQL Developer and click Run Script ![](./images/run-script.jpg "").

    ````
    ALTER TRIGGER  "bi_HR_EVENTS" ENABLE;

    ALTER TABLE prospects ADD experience NUMBER;

    ALTER TABLE employees ADD comments CLOB;
    ````

4. Generate a changelog with differences between snapshot `Dev2SnapshotV2` and current database environment. Before running this script, replace **[Your Initials]** with your initials in `ref_db` definition. Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    define ref_db="--referenceUrl=jdbc:oracle:thin:@[Your Initials]dev01_high?TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev01"
    HOST cd &proj_dir; liquibase &ref_db --referenceUsername=hr --referencePassword=DBlearnPTS#21_ --url=offline:oracle?snapshot=database/Dev2SnapshotV2.json --changeLogFile=database/hr-events.xml --changeSetAuthor="Developer3" diffChangeLog
    ````

5. Open new trigger `bi_HR_EVENTS` (double-click) and save it as sql script in the `/home/oracle/cicd-ws-rep01/database/` folder:
    * `bi_HR_EVENTS_trig.sql`

6. Create a manual changelogs for trigger code, that is not captured by Liquibase. Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; touch database/HR_EVENTS_trig-code.xml
    ````

7. Add contentes to the manual changelogs for trigger code. Open HR_EVENTS_trig-code.xml changelog in SQL Developer, and add the following lines:

    ````
    <?xml version="1.1" encoding="UTF-8"?> 
    <databaseChangeLog
      xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                          http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.1.xsd">
        <changeSet author="Developer3" id="bi_HR_EVENTS_trig" runOnChange="true">
          <sqlFile dbms="oracle"
                   endDelimiter=";"
                   path="./bi_HR_EVENTS_trig.sql"
                   relativeToChangelogFile="true"
                   splitStatements="false"
                   stripComments="false"/>
        </changeSet>
    </databaseChangeLog>
    ````

8. Update master changelog to include the last changes added by **Developer #3**.

    ````
    <?xml version="1.1" encoding="UTF-8"?> 
    <databaseChangeLog
      xmlns="http://www.liquibase.org/xml/ns/dbchangelog"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.liquibase.org/xml/ns/dbchangelog
                          http://www.liquibase.org/xml/ns/dbchangelog/dbchangelog-4.1.xsd">
      <include file="./initial_changelog.xml" relativeToChangelogFile="true"/>
      <include file="./hr-initial-code.xml" relativeToChangelogFile="true"/>
      <changeSet  author="Developer1"  id="tagDatabase-v1">  
        <tagDatabase  tag="version_1.0"/>  
      </changeSet>
      <include file="./hr-prospects.xml" relativeToChangelogFile="true"/>
      <include file="./hr-investment_check-code.xml" relativeToChangelogFile="true"/>
      <changeSet  author="Developer2"  id="tagDatabase-v2">  
        <tagDatabase  tag="version_2.0"/>  
      </changeSet>
      <include file="./hr-events.xml" relativeToChangelogFile="true"/>
      <include file="./HR_EVENTS_trig-code.xml" relativeToChangelogFile="true"/>
      <changeSet  author="Developer3"  id="tagDatabase-v3">  
        <tagDatabase  tag="version_3.0"/>  
      </changeSet>
    </databaseChangeLog>
    ````

9. Mark the last changes as deployed in the local development database. Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase changeLogSync
    ````

10. Verify changes recorded in `DATABASECHANGELOG` table, and check last changes added by **Developer #3**. Run Statement ![](./images/run-query.jpg "").

    ````
    select ID, AUTHOR, FILENAME, orderexecuted ORD, DESCRIPTION, TAG, EXECTYPE 
      from DATABASECHANGELOG order by 4 desc;
    ````

11. Generate a new snapshot called `Dev3SnapshotV3`.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase --outputFile=database/Dev3SnapshotV3.json snapshot --snapshotFormat=json
    ````

12. Add last changes to your Git development repository.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; git add database/*
    HOST cd &proj_dir; git commit -a -m "Version 3: HR Events table and trigger"
    HOST cd &proj_dir; git push
    ````

13. On GitHub, click on **cicd-ws-rep01** link in the breadcrumbs at the top of the page. On the right side, under Releases, click Create a new release. Create a Release called '**Version 3 production**', use Tag version '**V3**'. Click **Publish release**.


## Task 5: Working on patch that changes columns in table

1. Once more, **Developer #1** from your team, pulls the updates from this Git repository on hers/his local development environment, working on the same project. For this lab, we will not pull the repository with `git pull cicd-ws-rep01`, but will work on the same folder, just to simplify the scenario, and avoid to create multiple copies of these files on the same compute node, as we have a single development environment.

2. In this section of the lab **Developer #1** is working on a ticket that has been raised for an issue. This patch can be developed on a separate Git branch. Copy these lines in SQL Developer and Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; git checkout -b ticket001
    HOST cd &proj_dir; git status
    ````

3. The patch for this issue modifies table `PROSPECTS`. Run Script ![](./images/run-script.jpg "") in SQL Developer.

    ````
    alter table PROSPECTS set unused (BIRTH_DATE);

    alter table PROSPECTS drop column PHONE_NUMBER;

    alter table PROSPECTS add CREDIT_LIMIT NUMBER;
    ````

4. Generate a changelog with differences between snapshot `Dev3SnapshotV3` and current database, to capture changes required for this patch. Run Script ![](./images/run-script.jpg ""). Before running this script, replace **[Your Initials]** with your initials in `ref_db` definition.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    define ref_db="--referenceUrl=jdbc:oracle:thin:@[Your Initials]dev01_high?TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev01"
    HOST cd &proj_dir; liquibase &ref_db --referenceUsername=hr --referencePassword=DBlearnPTS#21_ --url=offline:oracle?snapshot=database/Dev3SnapshotV3.json --changeLogFile=database/hr-drop_phones.xml --changeSetAuthor="Developer1" diffChangeLog
    ````

5. Open `hr-drop_phones.xml` changelog in SQL Developer to verify object changes. Notice that both `BIRTH_DATE` and `PHONE_NUMBER` are dropped in changeset (`dropColumn`).

6. Update master changelog, adding changeset `hr-drop_phones.xml` at the end of the list.

    ````
    ...
      <include file="./hr-drop_phones.xml" relativeToChangelogFile="true"/>
      <changeSet  author="Developer1"  id="tagDatabase-tk001">  
        <tagDatabase  tag="version_3.1"/>  
      </changeSet>
    </databaseChangeLog>
    ````

9. Mark these changes as deployed in the local development database. Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase changeLogSync
    ````

10. Verify changes for this patch are recorded in `DATABASECHANGELOG` table. Run Statement ![](./images/run-query.jpg "").

    ````
    select ID, AUTHOR, FILENAME, orderexecuted ORD, DESCRIPTION, TAG, EXECTYPE 
      from DATABASECHANGELOG order by 4 desc;
    ````

11. Generate a new snapshot called `Dev1SnapshotV3t1`, to mark the state of the database with service request ticket `ticket001` solved.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase --outputFile=database/Dev1SnapshotV3t1.json snapshot --snapshotFormat=json
    ````

12. Add last changes to your Git development repository, more exactly to branch called `ticket001`, that was created for this patch.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; git add database/*
    HOST cd &proj_dir; git commit -a -m "Version 3 ticket 001: Prospects drop 2 columns, add 1"
    HOST cd &proj_dir; git push --set-upstream origin ticket001
    ````

13. On GitHub, click on **cicd-ws-rep01** link in the breadcrumbs at the top of the page to refresh it. You will see this message: *ticket001 had recent pushes less than a minute ago*.

14. Click **Compare & pull request** > **Create pull request**. **Merge pull request** > **Confirm merge**. 

15. When finished, you will receive this message: *Pull request successfully merged and closed*. Click **Delete branch**.


## Task 6: Modify code and use Git to version changes

1. Again, **Developer #2** from your team, pulls the updates from this Git repository, to continue working on the same project. For this lab, we will not pull the repository with `git pull cicd-ws-rep01`, but will work on the same folder, just to simplify the scenario, and avoid to create multiple copies of these files on the same compute node, as we have a single development environment.

2. In this section of the lab **Developer #2** is working on a ticket that has been raised for bug in the code. This fix can be developed on a separate Git branch. Copy these lines in SQL Developer and Run Script ![](./images/run-script.jpg ""). It will create a new branch called `ticket002`.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; git checkout -b ticket002
    HOST cd &proj_dir; git status
    ````

3. Perform code fixes. Open `investment_check_packb.sql` using Files dialog in SQL Developer, and change '`3*SAVINGS`' with '`2.5*SAVINGS`' in that for loop select statement.

4. Use Run Script ![](./images/run-script.jpg "") to perform the change into the database, and Save ![](./images/save.jpg "").

5. Open `bi_HR_EVENTS_trig.sql` using Files dialog in SQL Developer, and add a second if condition. This is how the file has to look like:

    ````
    create or replace TRIGGER  "bi_HR_EVENTS" 
      before insert on "HR_EVENTS"              
      for each row 
    begin  
      if :new."ID" is null then
        select "HR_EVENTS_SEQ".nextval into :new."ID" from sys.dual;
      end if;
      if :new."REGION" is null then
        select 'GLOBAL' into :new."REGION" from sys.dual;
      end if;
    end;
    /
    ````

6. Run Script ![](./images/run-script.jpg "") and Save ![](./images/save.jpg "").

7. Generate a changelog with differences between snapshot `Dev1SnapshotV3t1` and current database. Run Script ![](./images/run-script.jpg ""). Before running this script, replace **[Your Initials]** with your initials in `ref_db` definition.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    define ref_db="--referenceUrl=jdbc:oracle:thin:@[Your Initials]dev01_high?TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev01"
    HOST cd &proj_dir; liquibase &ref_db --referenceUsername=hr --referencePassword=DBlearnPTS#21_ --url=offline:oracle?snapshot=database/Dev1SnapshotV3t1.json --changeLogFile=database/hr-change_code.xml --changeSetAuthor="Developer2" diffChangeLog
    ````

8. Open `hr-change_code.xml` in SQL Developer using Files dialog, to verify what has been captured by Liquibase. This changelog is empty, code changes cannot be captured by Liquiabase community edition.

9. Add last changes to your Git development repository, more exactly to branch called `ticket002`, that was created for this patch.

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; git add database/*
    HOST cd &proj_dir; git commit -a -m "Version 3 ticket 002: Code changes in package body and trigger"
    HOST cd &proj_dir; git push --set-upstream origin ticket002
    ````

13. On GitHub, click on **cicd-ws-rep01** link in the breadcrumbs at the top of the page to refresh it. You will see this message: *ticket002 had recent pushes less than a minute ago*.

14. Click **Compare & pull request**. Review all code changes detailed on the lower part of the page. Click **Create pull request**. **Merge pull request** > **Confirm merge**. 

15. When finished, you will receive this message: *Pull request successfully merged and closed*. Click **Delete branch**.

16. Click again on **cicd-ws-rep01** link in the breadcrumbs. Click **Releases** on the right side of the page, then click **Draft a new release**. Name it '**Release Version 3.2 production**', use Tag version '**V3.2**'. Click **Publish release**.

17. Click again Releases. Under **V3.2** click **Compare**, select **V3**. Review Comparing changes.


## Task 7: Provision another Development Database (ATP)

1. On Oracle Cloud Console, click on main menu ≡, then **Autonomous Transaction Processing** under Oracle Database. **Create Autonomous Database**.

    - Select a compartment: [Your Compartment]
    - Display name: [Your Initials]-Dev02 (e.g. VLT-Dev02)
    - Database name: [Your Initials]Dev02 (e.g. VLTDev02)
    - Choose a workload type: Transaction Processing
    - Choose a deployment type: Shared Infrastructure
    - Choose database version: 19c
    - OCPU count: 1
    - Storage (TB): 1
    - Auto scaling: disabled

2. Under Create administrator credentials:

    - Password: DBlearnPTS#21_

3. Under Choose network access:

    - Access Type: Allow secure access from everywhere

4. Click **Create Autonomous Database**. Wait for Lifecycle State to become Available.

5. Download and unzip the client credentials `Wallet_[Your Initials]Dev02.zip` file, selecting instance wallet file, on the ClientVM. If you use the Firefox browser on the Remote Desktop connection, it will be downloaded in folder `/home/oracle/Downloads/`.

6. Specify a wallet password.

    - Password: DBlearnPTS#21_

7. Create a new folder and unzip your wallet files.

    ````
    mkdir /home/oracle/Wallet_[Your Initials]Dev02

    unzip /home/oracle/Downloads/Wallet_[Your Initials]Dev02.zip -d /home/oracle/Wallet_[Your Initials]Dev02/
    ````

8. Edit **sqlnet.ora** file in **Wallet_[Your Initials]Dev02** folder, and set the value of `DIRECTORY` to `${TNS_ADMIN}`.

    ````
    WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="${TNS_ADMIN}")))
    SSL_SERVER_DN_MATCH=yes
    ````

9. Set the `TNS_ADMIN` environment variable to the directory where the unzipped credentials files.

    ````
    export TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev02
    ````

10. Get service names for your instance from **tnsnames.ora** file.

    ````
    cat /home/oracle/Wallet_[Your Initials]Dev02/tnsnames.ora
    ````

11. Verify the connectivity using SQL*Plus, using the TP service. If the connection works, exit. Before running this command, replace **[Your Initials]** with your lower case initials (database service).

    ````
    sqlplus admin/DBlearnPTS#21_@[Your Initials]dev02_tp

    exit
    ````

12. Edit `ojdbc.properties` file in **Wallet_[Your Initials]Dev02** folder to set connection properties. 

    ````
    cd ~

    gedit Wallet_[Your Initials]Dev02/ojdbc.properties
    ````

13. We have to make 3 changes:
    - Comment out the oracle.net.wallet_location line. 
    - Use TNS_ADMIN environment variable value in javax.net.ssl.trustStore and javax.net.ssl.keyStore. 
    - Set javax.net.ssl.trustStorePassword and javax.net.ssl.keyStorePassword to the wallet password.

    ````
    #oracle.net.wallet_location=(SOURCE=(METHOD=FILE)(METHOD_DATA=(DIRECTORY=${TNS_ADMIN})))
    javax.net.ssl.trustStore=${TNS_ADMIN}/truststore.jks
    javax.net.ssl.trustStorePassword=DBlearnPTS#21_
    javax.net.ssl.keyStore=${TNS_ADMIN}/keystore.jks
    javax.net.ssl.keyStorePassword=DBlearnPTS#21_
    ````


## Task 8: Deploy project on a new database

1. This is **Developer #3** from your team, that has to work on a new project, using this fresh new database **ATPdev02**. For this lab, we will not clone the repository with `git clone cicd-ws-rep01`, but will work on the same folder, just to simplify the scenario, and avoid to create multiple copies of these files on the same compute node, as we have a single development environment.

2. Edit `liquibase.properties` file in your project folder cicd-ws-rep01.

    ````
    cd ~/cicd-ws-rep01

    gedit liquibase.properties
    ````

3. Comment **ATPdev01** url line, and add **ATPdev02** url line. Before saving the file, replace **[Your Initials]** with your initials.

    ````
    driver : oracle.jdbc.OracleDriver
    classpath : /usr/lib/oracle/21/client64/lib/ojdbc8.jar
    #url : jdbc:oracle:thin:@[Your Initials]dev01_high?TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev01
    url : jdbc:oracle:thin:@[Your Initials]dev02_high?TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev02
    username : hr
    password : DBlearnPTS#21_
    changeLogFile : database/hr-master.xml
    ````

4. Connect to the **ATPdev02** ATP service as **admin**. Before running this command, replace **[Your Initials]** with your lower case initials (database service).

    ````
    sqlplus admin/DBlearnPTS#21_@[Your Initials]dev02_tp
    ````

5. Create an empty HR schema for the new project in **ATPdev02** development environment.

    ````
    CREATE USER HR IDENTIFIED BY DBlearnPTS#21_;

    GRANT connect, resource to HR;

    GRANT UNLIMITED TABLESPACE TO HR;

    GRANT create view to HR;

    exit
    ````

6. In SQL Developer, create a new connection to the **ATPdev02** ATP service as **HR**. Connect and Run Statement ![](./images/run-query.jpg ""). You will receive an error, because there is no `DATABASECHANGELOG` table in this database.

    ````
    select ID, AUTHOR, FILENAME, orderexecuted ORD, DESCRIPTION, TAG, EXECTYPE 
      from DATABASECHANGELOG order by 4 desc;

    ORA-00942: table or view does not exist
    ````

7. Apply initial HR schema objects and code, tagged as **version_1.0** in master changelog, in this new database environment, using Liquibase. In SQL Developer, use Run Script ![](./images/run-script.jpg "")

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase updateToTag version_1.0
    ````

8. In SQL Developer, use Run Statement ![](./images/run-query.jpg "") again to query `DATABASECHANGELOG` table.

    ````
    select ID, AUTHOR, FILENAME, orderexecuted ORD, DESCRIPTION, TAG, EXECTYPE 
      from DATABASECHANGELOG order by 4 desc;
    ````

9. Verify objects in HR schema, to make sure all initial objects are there.

    ````
    select object_name, object_type from user_objects order by 2,1;
    ````

10. Apply all HR schema objects and code in master changelog to this new database environment, using Liquibase. Use Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    HOST cd &proj_dir; liquibase update
    ````

11. Query `DATABASECHANGELOG` table in SQL Developer with Run Statement ![](./images/run-query.jpg "")

    ````
    select ID, AUTHOR, FILENAME, orderexecuted ORD, DESCRIPTION, TAG, EXECTYPE 
      from DATABASECHANGELOG order by 4 desc;
    ````

12. Verify all objects in HR schema, to make sure all objects required by our project are there.

    ````
    select object_name, object_type from user_objects order by 2,1;
    ````

13. You can compare both database environments, ATPdev01 and ATPdev02, to see if we missed anything. Run Statement ![](./images/run-query.jpg "") in both SQL Developer connections.

    ````
    select object_type, count(*) 
      from user_objects group by object_type order by 1;
    ````

14. At the same time, we can perform a comparison with Liquibase, that generates a changelog with differences between ATPdev01 and ATPdev02. Before running this script, replace **[Your Initials]** with your initials in `ref_db` definition. Run Script ![](./images/run-script.jpg "").

    ````
    define proj_dir="../home/oracle/cicd-ws-rep01"
    define ref_db="--referenceUrl=jdbc:oracle:thin:@[Your Initials]dev01_high?TNS_ADMIN=/home/oracle/Wallet_[Your Initials]Dev01"
    HOST cd &proj_dir; liquibase &ref_db --referenceUsername=hr --referencePassword=DBlearnPTS#21_ --changeLogFile=database/hr-ATPdev01_ATPdev02.xml --changeSetAuthor="Developer3" diffChangeLog
    ````

15. Open `hr-ATPdev01_ATPdev02.xml` in SQL Developer using Files dialog. This changelog is empty because there are no object differences between ATPdev01 and ATPdev02 development environments.

16. Clean up OCI environment by terminating Autonomous Database resources:
    * ATPdev01 database **[Your Initials]-Dev01**
    * ATPdev02 database **[Your Initials]-Dev02**


## Acknowledgements
* **Author** - Valentin Leonard Tabacaru, PTS
* **Last Updated By/Date** -  Valentin Leonard Tabacaru, May 2021

## Need Help?
Please submit feedback or ask for help using our [LiveLabs Support Forum](https://community.oracle.com/tech/developers/categories/livelabsdiscussions). Please click the **Log In** button and login using your Oracle Account. Click the **Ask A Question** button to the left to start a *New Discussion* or *Ask a Question*.  Please include your workshop name and lab name.  You can also include screenshots and attach files.  Engage directly with the author of the workshop.

If you do not have an Oracle Account, click [here](https://profile.oracle.com/myprofile/account/create-account.jspx) to create one.