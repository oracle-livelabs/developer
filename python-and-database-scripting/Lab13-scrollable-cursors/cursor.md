# Python-oracledb driver for Oracle Database: The New Wave of Scripting

## Introduction

This lab will show how to use PL/SQL data using python-oracledb driver

Estimated Lab Time: 10 minutes

### Objectives

*  Learn best practices and efficient techniques for .....

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Autonomous Database shared infrastructure
* Environment Setup

## Task 1: Scrollable Cursors

Scrollable cursors enable python-oracledb thick mode applications to move backwards as well as forwards in query results. They can be used to skip rows as well as move to a particular row.

    11.1 Working with scrollable cursors

    Review the code contained in query_scroll.py:

    import oracledb
    import db_config_thick as db_config

    con = oracledb.connect(user=db_config.user, password=db_config.pw, dsn=db_config.dsn)
    cur = con.cursor(scrollable=True)

    cur.execute("select * from dept order by deptno")

    cur.scroll(2, mode="absolute")  # go to second row
    print(cur.fetchone())

    cur.scroll(-1)                    # go back one row
    print(cur.fetchone())

    Run the script in a terminal window:

    python query_scroll.py

    Edit query_scroll.py and experiment with different scroll options and orders, such as:

    cur.scroll(1)  # go to next row
    print(cur.fetchone())

    cur.scroll(mode="first")  # go to first row
    print(cur.fetchone())

    Try some scroll options that go beyond the number of rows in the resultset.


## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Use python-oracledb for .......

## Acknowledgements

* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, July 2022