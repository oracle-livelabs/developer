SET ECHO OFF
SET VERIFY OFF
SET HEADING OFF
SET FEEDBACK OFF

-- Exit setup script on any error
WHENEVER SQLERROR EXIT SQL.SQLCODE

DEFINE pass = 'MCPDEMO'

BEGIN
   IF '&pass' IS NULL THEN
      RAISE_APPLICATION_ERROR(-20999, 'Error: the SH password is mandatory! Please specify a password!');
   END IF;
END;
/

COLUMN property_value NEW_VALUE var_default_tablespace NOPRINT
SELECT property_value FROM database_properties WHERE property_name = 'DEFAULT_PERMANENT_TABLESPACE';

ACCEPT tbs PROMPT 'Enter a tablespace for SH [&var_default_tablespace]: ' DEFAULT '&var_default_tablespace'

DECLARE
   v_tbs_exists   NUMBER := 0;
BEGIN
   SELECT COUNT(1) INTO v_tbs_exists
     FROM DBA_TABLESPACES
       WHERE TABLESPACE_NAME = UPPER('&tbs');
   IF v_tbs_exists = 0 THEN
      RAISE_APPLICATION_ERROR(-20998, 'Error: the tablespace ''' || UPPER('&tbs') || ''' does not exist!');
   END IF;
END;
/

ACCEPT overwrite_schema PROMPT 'Do you want to overwrite the schema, if it already exists? [YES|no]: ' DEFAULT 'YES'

SET SERVEROUTPUT ON;
DECLARE
   v_user_exists   all_users.username%TYPE;
BEGIN
   SELECT MAX(username) INTO v_user_exists
      FROM all_users WHERE username = 'SH';
   -- Schema already exists
   IF v_user_exists IS NOT NULL THEN
      -- Overwrite schema if the user chose to do so
      IF UPPER('&overwrite_schema') = 'YES' THEN
         EXECUTE IMMEDIATE 'DROP USER SH CASCADE';
         DBMS_OUTPUT.PUT_LINE('Old SH schema has been dropped.');
      -- or raise error if the user doesn't want to overwrite it
      ELSE
         RAISE_APPLICATION_ERROR(-20997, 'Abort: the schema already exists and the user chose not to overwrite it.');
      END IF;
   END IF;
END;
/
SET SERVEROUTPUT OFF;

CREATE USER sh IDENTIFIED BY "&pass"
               DEFAULT TABLESPACE &tbs
               QUOTA UNLIMITED ON &tbs;

GRANT CREATE MATERIALIZED VIEW,
      CREATE PROCEDURE,
      CREATE SEQUENCE,
      CREATE SESSION,
      CREATE SYNONYM,
      CREATE TABLE,
      CREATE TRIGGER,
      CREATE TYPE,
      CREATE VIEW
  TO sh;

ALTER SESSION SET CURRENT_SCHEMA=SH;
ALTER SESSION SET NLS_LANGUAGE=American;
ALTER SESSION SET NLS_TERRITORY=AMERICA;

@@sh_cre.sql
@@sh_popul.sql
@@sh_analz.sql

SET HEADING ON
SET FEEDBACK OFF

PROMPT Verifying SH installation...

SELECT 'channels' AS "Table", 5 AS "provided", count(1) AS "actual" FROM sh.channels
UNION ALL
SELECT 'customers' AS "Table", 55500 AS "provided", count(1) AS "actual" FROM sh.customers
UNION ALL
SELECT 'products' AS "Table", 72 AS "provided", count(1) AS "actual" FROM sh.products
UNION ALL
SELECT 'promotions' AS "Table", 503 AS "provided", count(1) AS "actual" FROM sh.promotions
UNION ALL
SELECT 'sales' AS "Table", 918843 AS "provided", count(1) AS "actual" FROM sh.sales
UNION ALL
SELECT 'times' AS "Table", 1826 AS "provided", count(1) AS "actual" FROM sh.times
UNION ALL
SELECT 'costs' AS "Table", 1826 AS "provided", count(1) AS "actual" FROM sh.costs;

SELECT 'The installation of the sample schema is now finished.'  AS "Thank you!"
   FROM dual
UNION ALL
SELECT 'Please check the installation verification output above.' AS "Thank you!"
   FROM dual
UNION ALL
SELECT '' AS "Thank you!"
   FROM dual
UNION ALL
SELECT 'You will now be disconnected from the database.' AS "Thank you!"
   FROM dual
UNION ALL
SELECT '' AS "Thank you!"
   FROM dual
UNION ALL
SELECT 'Thank you for using Oracle Database!' AS "Thank you!"
   FROM dual
UNION ALL
SELECT '' AS "Thank you!"
   FROM dual;

>>>>>>> REPLACE

>>>>>>> REPLACE
