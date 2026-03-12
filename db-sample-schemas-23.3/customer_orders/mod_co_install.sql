SET ECHO OFF
SET VERIFY OFF
SET HEADING OFF
SET FEEDBACK OFF

-- Exit setup script on any error
WHENEVER SQLERROR EXIT SQL.SQLCODE

rem =======================================================
rem Install descriptions
rem =======================================================

PROMPT
PROMPT Thank you for installing the Oracle Customer Orders Sample Schema.
PROMPT This installation script will automatically exit your database session
PROMPT at the end of the installation or if any error is encountered.
PROMPT The entire installation will be logged into the 'co_install.log' log file.
PROMPT

rem =======================================================
rem Log installation process
rem =======================================================

SPOOL co_install.log

rem =======================================================
rem Accept and verify schema password
rem =======================================================

DEFINE pass = 'Oracle23c'

BEGIN
   IF '&pass' IS NULL THEN
      RAISE_APPLICATION_ERROR(-20999, 'Error: the CO password is mandatory! Please specify a password!');
   END IF;
END;
/

rem =======================================================
rem Accept and verify tablespace name
rem =======================================================

COLUMN property_value NEW_VALUE var_default_tablespace NOPRINT
SELECT property_value FROM database_properties WHERE property_name = 'DEFAULT_PERMANENT_TABLESPACE';

ACCEPT tbs PROMPT 'Enter a tablespace for CO [&var_default_tablespace]: ' DEFAULT '&var_default_tablespace'

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

rem =======================================================
rem cleanup old CO schema, if found and requested
rem =======================================================

ACCEPT overwrite_schema PROMPT 'Do you want to overwrite the schema, if it already exists? [YES|no]: ' DEFAULT 'YES'

SET SERVEROUTPUT ON;
DECLARE
   v_user_exists   all_users.username%TYPE;
BEGIN
   SELECT MAX(username) INTO v_user_exists
      FROM all_users WHERE username = 'CO';
   -- Schema already exists
   IF v_user_exists IS NOT NULL THEN
      -- Overwrite schema if the user chose to do so
      IF UPPER('&overwrite_schema') = 'YES' THEN
         EXECUTE IMMEDIATE 'DROP USER CO CASCADE';
         DBMS_OUTPUT.PUT_LINE('Old CO schema has been dropped.');
      -- or raise error if the user doesn't want to overwrite it
      ELSE
         RAISE_APPLICATION_ERROR(-20997, 'Abort: the schema already exists and the user chose not to overwrite it.');
      END IF;
   END IF;
END;
/
SET SERVEROUTPUT OFF;

rem =======================================================
rem create the CO schema user
rem =======================================================

CREATE USER co IDENTIFIED BY "&pass"
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
  TO co;

ALTER SESSION SET CURRENT_SCHEMA=CO;
ALTER SESSION SET NLS_LANGUAGE=American;
ALTER SESSION SET NLS_TERRITORY=America;

rem =======================================================
rem create CO schema objects
rem =======================================================

@@co_create.sql

rem =======================================================
rem populate tables with data
rem =======================================================

@@co_populate.sql

rem =======================================================
rem installation validation
rem =======================================================

SET HEADING ON
rem reactivated by sub-scripts, turn it off again.
SET FEEDBACK OFF

SELECT 'Verification:' AS "Installation verification" FROM dual;

SELECT 'customers' AS "Table", 392 AS "provided", count(1) AS "actual" FROM co.customers
UNION ALL
SELECT 'stores' AS "Table", 23 AS "provided", count(1) AS "actual" FROM co.stores
UNION ALL
SELECT 'products' AS "Table", 46 AS "provided", count(1) AS "actual" FROM co.products
UNION ALL
SELECT 'orders' AS "Table", 1950 AS "provided", count(1) AS "actual" FROM co.orders
UNION ALL
SELECT 'shipments' AS "Table", 1892 AS "provided", count(1) AS "actual" FROM co.shipments
UNION ALL
SELECT 'order_items' AS "Table", 3914 AS "provided", count(1) AS "actual" FROM co.order_items
UNION ALL
SELECT 'inventory' AS "Table", 566 AS "provided", count(1) AS "actual" FROM co.inventory;

rem
rem Installation finish text.
rem
rem the SELECT '' FROM DUAL statements serve to print new lines
rem and make the output more readable.
rem

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

rem stop writing to the log file
spool off

rem
rem Exit from the session.
rem Use 'exit' and not 'disconnect' to keep behavior the same for when errors occur.
rem
exit
