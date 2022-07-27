# Python-oracledb driver for Oracle Database: The New Wave of Scripting

## Introduction

This lab will show how to use PL/SQL data using python-oracledb driver

Estimated Lab Time: 10 minutes

### Objectives

*  Learn best practices and efficient techniques for .....

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Autonomous Database
* Environment Setup

## LOBs

Oracle Database "LOB" long objects can be streamed using a LOB locator, or worked with directly as strings or bytes.

1.  Fetching a CLOB using a locator

    Review the code contained in **clob.py**:

    ````
    import cx_Oracle
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)
    cur = con.cursor()

    print("Inserting data...")
    cur.execute("truncate table testclobs")
    longString = ""
    for i in range(5):
        char = chr(ord('A') + i)
        longString += char * 250
        cur.execute("insert into testclobs values (:1, :2)",
                    (i + 1, "String data " + longString + ' End of string'))
    con.commit()

    print("Querying data...")
    cur.prepare("select * from testclobs where id = :id")
    cur.execute(None, {'id': 1})
    (id, clob) = cur.fetchone()
    print("CLOB length:", clob.size())
    clobdata = clob.read()
    print("CLOB data:", clobdata)
    ````

    This inserts some test string data and then fetches one record into clob, which is a cx\_Oracle character LOB Object. Methods on LOB include size() and read().

    To see the output, run the file:

    ````
    <copy>
    cd ~/python/tutorial
    python3 clob.py
    </copy>
    ````

    ![](./images/clobOutput.png " " )

    Edit the file and experiment reading chunks of data by giving start character position and length, such as clob.read(1,10)

2.  Fetching a CLOB as a string

    For CLOBs small enough to fit in the application memory, it is much faster to fetch them directly as strings.

    Review the code contained in **clob\_string.py**. The differences from clob.py are shown in bold:

    ````
    import cx_Oracle
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)
    cur = con.cursor()

    print("Inserting data...")
    cur.execute("truncate table testclobs")
    longString = ""
    for i in range(5):
        char = chr(ord('A') + i)
        longString += char * 250
        cur.execute("insert into testclobs values (:1, :2)",
                    (i + 1, "String data " + longString + ' End of string'))
    con.commit()

    def OutputTypeHandler(cursor, name, defaultType, size, precision, scale):
        if defaultType == cx_Oracle.CLOB:
            return cursor.var(cx_Oracle.LONG_STRING, arraysize = cursor.arraysize)

    con.outputtypehandler = OutputTypeHandler

    print("Querying data...")
    cur.prepare("select * from testclobs where id = :id")
    cur.execute(None, {'id': 1})
    (id, clobdata) = cur.fetchone()
    print("CLOB length:", len(clobdata))
    print("CLOB data:", clobdata)
    ````

    The OutputTypeHandler causes cx\_Oracle to fetch the CLOB as a string. Standard Python string functions such as len() can be used on the result.

    The output is the same as for clob.py. To check, run the file:

    ````
    <copy>
    python3 clob_string.py
    </copy>
    ````

## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Use python-oracledb for .......

## Acknowledgements

* **Author** - Christopher Jones, Anthony Tuininga, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, July 2022