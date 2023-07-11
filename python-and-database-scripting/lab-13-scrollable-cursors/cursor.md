# Scrollable Cursors

## Introduction
Scrollable cursors enable python-oracledb thick mode applications to move backwards as well as forwards in query results. They can be used to skip rows as well as move to a particular row.

This lab will show how to work with srollable cursors using python-oracledb driver

Estimated Lab Time: 5 minutes

### Objectives

*  Learn best practices and efficient techniques for working with scrollable cursors

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Oracle Autonomous Database shared infrastructure
* Environment Setup

## Task 1: Working with scrollable cursors

1. Review the code contained in *query\_scroll.py*:

    ````
    <copy>
    import oracledb
    import db_config_thick as db_config

    con = oracledb.connect(user=db_config.user,
                            password=db_config.pw, 
                            dsn=db_config.dsn,
                            config_dir=db_config.config_dir, wallet_location=db_config.wallet_location, wallet_password=db_config.wallet_password)
    cur = con.cursor(scrollable=True)

    cur.execute("select * from dept order by deptno")

    cur.scroll(2, mode="absolute")  # go to second row
    print(cur.fetchone())

    cur.scroll(-1)                    # go back one row
    print(cur.fetchone())
    </copy>
    ````

2. Run the script in a terminal window:

    ````
    <copy>
    python query_scroll.py
    </copy>
    ````

3. Edit *query_scroll.py* and experiment with different scroll options and orders, such as:

    ````
    <copy>
    cur.scroll(1)  # go to next row
    print(cur.fetchone())

    cur.scroll(mode="first")  # go to first row
    print(cur.fetchone())
    </copy>
    ````

4. Try some scroll options that go beyond the number of rows in the resultset.


## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* work with scrollable cursors

## Acknowledgements

* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, June 2023