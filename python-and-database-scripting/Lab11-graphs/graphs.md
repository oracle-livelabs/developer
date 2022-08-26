# Fetching Data

## Introduction

Executing SELECT queries is the primary way to get data from Oracle Database.

There are a number of functions you can use to query an Oracle database, but the basics of querying are always the same:

This lab will show how to fetch the data using python-oracledb driver

Estimated Lab Time: 5 minutes

### Objectives

* Learn best practices and efficient techniques for fetching data.

### Prerequisites

This lab assumes you have completed the following labs:

* Login to Oracle Cloud
* Create Oracle Autonomous Database shared infrastructure
* Environment Setup

## Task 1: A simple query

Review the code contained in *query2.py*:

````
<copy>
import oracledb
import db_config

con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir, wallet_location=db_config.wallet_location,  wallet_password=db_config.wallet_password)
cur = con.cursor()
cur.execute("select * from dept order by deptno")
for deptno, dname, loc in cur:
    print("Department number: ", deptno)
    print("Department name: ", dname)
    print("Department location:", loc)
</copy>
````

The cursor() method opens a cursor for statements to use.

The execute() method parses and executes the statement.

The loop fetches each row from the cursor and unpacks the returned tuple into the variables deptno, dname, loc, which are then printed.

Run the script in the Cloud Shell or in a terminal window:

````
<copy>
python3 query2.py
</copy>
````
The output is:

![Fetch data](./images " " )

When the number of rows is large, the fetchall() call may use too much memory.

Review the code contained in *query\_one.py*:

````
<copy>
import oracledb
import db_config

con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir, wallet_location=db_config.wallet_location, wallet_password=db_config.wallet_password)
cur = con.cursor()

cur.execute("select * from dept order by deptno")
row = cur.fetchone()
print(row)

row = cur.fetchone()
print(row)
</copy>
````

This uses the fetchone() method to return just a single row as a tuple. When called multiple time, consecutive rows are returned:

Run the script in Cloud Shell or in a terminal window:

````
<copy>
python3 query_one.py
</copy>
````

![Query one results](./images/queryone.png " " )

The first two rows of the table are printed.
.

## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Use python-oracledb to fetch data

## Acknowledgements

* **Authors** - Veronica Dumitriu
* **Contributors** - Veronica Dumitriu
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, Aug 2022