# PL/SQL

## Introduction

PL/SQL is Oracle's procedural language extension to SQL. PL/SQL procedures and functions are stored and run in the database. Using PL/SQL lets all database applications reuse logic, no matter how the application accesses the database. Many data-related operations can be performed in PL/SQL faster than extracting the data into a program (for example, Python) and then processing it. Documentation link for further reading: [PL/SQL Execution](https://python-oracledb.readthedocs.io/en/latest/user_guide/plsql_execution.html).
This lab will show how to call PL/SQL code from Python

Estimated Time: 5 minutes

Watch the video below for a quick walk-through of the lab.
[PL/SQL](videohub:1_5815o1t4)

### Objectives

*  Learn best practices and efficient techniques for how to make use of PL/SQL code, functions and procedures from Python, when needing to manipulate data stored in Oracle databases.

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Oracle Autonomous Database Serverless
* Environment Setup

## Task 1: PL/SQL functions

As part of environment setup, the table **ptab** and the PL/SQL stored function **myfunc** to insert a row into ptab, and return double the inserted value, were already created as following:

````
create table ptab (mydata varchar(20), myid number);

create or replace function myfunc(d_p in varchar2, i_p in number) return number as
begin
    insert into ptab (mydata, myid) values (d_p, i_p);
    return (i_p * 2);
end;
/
````
    
The **myfunc** PL/SQL stored function will be used by the *plsql_func.py* file below.

1. Review the code contained in *plsql\_func.py*:

    ````
    <copy>
    import oracledb
    import db_config

    con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn,
                    config_dir=db_config.config_dir, wallet_location=db_config.wallet_location, wallet_password=db_config.wallet_password)

    cur = con.cursor()

    res = cur.callfunc('myfunc', int, ('abc', 2))
    print(res)
    </copy>
    ````

    This uses the **callfunc()** method to execute the function. The second parameter is the type of the returned value. It should be one of the types supported by python-oracledb or one of the type constants defined by python-oracledb (such as oracledb.NUMBER). The two PL/SQL function parameters are passed as a tuple, binding them to the function parameter arguments.

2. From the Cloud Shell or a terminal window, run:

    ````
    <copy>
    python3 plsql_func.py
    </copy>
    ````

    The output is a result of the PL/SQL function calculation.

    ````
    4
    ````

## Task 2: PL/SQL procedures

1. Review *plsql\_proc.sql* which creates a PL/SQL procedure myproc() to accept two parameters. The second parameter contains an OUT return value.

    ````
    create or replace procedure myproc(v1_p in number, v2_p out number) as
    begin
    v2_p := v1_p * 2;
    end;
    /
    ````

2. Review the code contained in *plsql\_proc.py* :

    ````
    <copy>
    import oracledb
    import db_config

    con = oracledb.connect(
        user=db_config.user,
        password=db_config.pw, 
        dsn=db_config.dsn,
        config_dir=db_config.config_dir, 
        wallet_location=db_config.wallet_location, 
        wallet_password=db_config.wallet_password
        )
    
    cur = con.cursor()

    myvar = cur.var(int)
    cur.callproc('myproc', (123, myvar))
    print(myvar.getvalue())
    </copy>
    ````

    This creates an integer variable 'myvar' to hold the value returned by the PL/SQL OUT parameter. The input number 123 and the output variable name are bound to the procedure call parameters using a tuple.

    To call the PL/SQL procedure, the **callproc()** method is used.

3. In Cloud Shell or in a terminal window, run:

    ````
    <copy>
    python3 plsql_proc.py
    </copy>
    ````

    The **getvalue()** method displays the returned value.

    ````
    246
    ````

## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to execute PL/SQL code in order to perform data manipulations efficiently.
* Use python-oracledb for invoking PL/SQL procedures and functions in relation to data in Oracle Autonomous Database Serverless.

## Acknowledgements

* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, June 2023