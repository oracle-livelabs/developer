# Subclassing Connections and Cursors

## Introduction

Subclassing enables application to "hook" connection and cursor creation. This can be used to alter or log connection and execution parameters, and to extend python-oracledb functionality. [Documentation link for further reading: Application Tracing](https://python-oracledb.readthedocs.io/en/latest/user_guide/tracing.html#application-tracing).

Estimated Lab Time: 10 minutes

### Objectives

*  Learn best practices and efficient techniques for using subclassing for connecting and cursors creation with Oracle Autonomous Database.

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Oracle Autonomous Database shared infrastructure
* Environment Setup

## Task 1: Subclassing connections

Review the code contained in *subclass.py*:

````
<copy>
import oracledb
import db_config
    
class MyConnection(oracledb.Connection):

    def __init__(self):
        print("Connecting to database")
        return super(MyConnection, self).__init__(user=db_config.user, 
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir,
                    wallet_location=db_config.wallet_location, 
                    wallet_password=db_config.wallet_password)
    
con = MyConnection()
cur = con.cursor()
    
cur.execute("select count(*) from emp where deptno = :bv", (10,))
count, = cur.fetchone()
print("Number of rows:", count)
</copy>
````

This creates a new class "MyConnection" that inherits from the python-oracledb Connection class. The \__init\__ method is invoked when an instance of the new class is created. It prints a message and calls the base class, passing the connection credentials.

In the "normal" application, the application code:

````
<copy>
con = MyConnection()
</copy>
````
does not need to supply any credentials, as they are embedded in the custom subclass. All the python-oracledb methods such as cursor() are available, as shown by the query.

In Cloud Shell or Code Editor terminal run the script:

````
<copy>
python3 subclass.py
</copy>
````

You should see results as below:
![Connections](./images/connections.png " " )

## Task2:  Subclassing cursors

Edit *subclass.py* and extend the cursor() method with a new MyCursor class. 

````
<copy>
import oracledb
import db_config

class MyConnection(oracledb.Connection):

    def __init__(self):
        print("Connecting to database")
        return super(MyConnection, self).__init__(user=db_config.user, 
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir,
                    wallet_location=db_config.wallet_location, 
                    wallet_password=db_config.wallet_password)

    def cursor(self):
        return MyCursor(self)

class MyCursor(oracledb.Cursor):

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
![Cursors](./images/cursors.png " " )

## Conclusion

In this lab, you have learned how to:
* Use subclassing to enable the application to "hook" connection and cursor creation.

## Acknowledgements

* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, Aug 2022