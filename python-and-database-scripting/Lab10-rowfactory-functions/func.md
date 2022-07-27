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

## Rowfactory functions

Rowfactory functions enable queries to return objects other than tuples. They can be used to provide names for the various columns or to return custom objects.

1.  Rowfactory for mapping column names.

    Review the code contained in **rowfactory.py**:

    ````
    import collections
    import cx_Oracle
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)
    cur = con.cursor()

    cur.execute("select deptno, dname from dept")
    rows = cur.fetchall()

    print('Array indexes:')
    for row in rows:
        print(row[0], "->", row[1])

    print('Loop target variables:')
    for c1, c2 in rows:
        print(c1, "->", c2)
    ````

    This shows two methods of accessing result set items from a data row. The first uses array indexes like row[0]. The second uses loop target variables which take the values of each row tuple.

    Run the file:

    ````
    <copy>
    cd ~/python/tutorial
    python3 rowfactory.py
    </copy>
    ````

    ![](./images/rowFactoryOutput.png " " )

    Both access methods gives the same results.

    To use a rowfactory function, edit rowfactory.py and add this code at the bottom:

    ````
    <copy>
    print('Rowfactory:')
    cur.execute("select deptno, dname from dept")
    cur.rowfactory = collections.namedtuple("MyClass", ["DeptNumber", "DeptName"])

    rows = cur.fetchall()
    for row in rows:
        print(row.DeptNumber, "->", row.DeptName)
    </copy>
    ````

    This uses the Python factory function namedtuple() to create a subclass of tuple that allows access to the elements via indexes or the given field names.

    The print() function shows the use of the new named tuple fields. This coding style can help reduce coding errors.

    Run the script again:

    ````
    <copy>
    python3 rowfactory.py
    </copy>
    ````

    The output results are the same.

    ![](./images/step12.1-rowfactory.png " ")


## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Use python-oracledb for .......

## Acknowledgements

* **Author** - Christopher Jones, Anthony Tuininga, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, July 2022