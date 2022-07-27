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

## Subclassing Connections and Cursors

1. Subclassing connections

    Review the code contained in **subclass.py**:

    ````
    import cx_Oracle
    import db_config

    class MyConnection(cx_Oracle.Connection):

       def __init__(self):
          print("Connecting to database")
          return super(MyConnection, self).__init__(db_config.user, db_config.pw, db_config.dsn)

    con = MyConnection()
    cur = con.cursor()

    cur.execute("select count(*) from emp where deptno = :bv", (10,))
    count, = cur.fetchone()
    print("Number of rows:", count)
    ````

    This creates a new class "MyConnection" that inherits from the cx\_Oracle Connection class. The `init` method is invoked when an instance of the new class is created. It prints a message and calls the base class, passing the connection credentials.

    In the "normal" application, the application code:

    ````
    con = MyConnection()
    ````
    does not need to supply any credentials, as they are embedded in the custom subclass. All the cx_Oracle methods such as cursor() are available, as shown by the query.

    Run the file:

    ````
    <copy>
    cd ~/python/tutorial
    python3 subclass.py
    </copy>
    ````

    The query executes successfully.

2.  Subclassing cursors

    Edit **subclass.py** and extend the cursor() method with a new MyCursor class. Copy and replace the text in subclass.py with the text below.

    ````
    <copy>
    import cx_Oracle
    import db_config

    class MyConnection(cx_Oracle.Connection):

       def __init__(self):
          print("Connecting to database")
          return super(MyConnection, self).__init__(db_config.user, db_config.pw, db_config.dsn)

       def cursor(self):
         return MyCursor(self)

    class MyCursor(cx_Oracle.Cursor):
        def execute(self, statement, args):
            print("Executing:", statement)
            print("Arguments:")
            for argIndex, arg in enumerate(args):
                print("  Bind", argIndex + 1, "has value", repr(arg))
                return super(MyCursor, self).execute(statement, args)
        def fetchone(self):
            print("Fetchone()")
            return super(MyCursor, self).fetchone()
    con = MyConnection()
    cur = con.cursor()
    cur.execute("select count(*) from emp where deptno = :bv", (10,))
    count, = cur.fetchone()
    print("Number of rows:", count)
    </copy>
    ````

    When the application gets a cursor from the MyConnection class, the new cursor() method returns an instance of our new MyCursor class.

    The "application" query code remains unchanged. The new execute() and fetchone() methods of the MyCursor class get invoked. They do some logging and invoke the parent methods to do the actual statement execution.

    To confirm this, run the file again:

    ````
    <copy>
    python3 subclass.py
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