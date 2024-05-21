# Connection Pools

## Introduction
Connection pooling is important for performance when multi-threaded applications frequently connect and disconnect from the database. Pooling also gives the best support for Oracle's High Availability (HA) features. Documentation link for further reading: [Connection Pooling](https://python-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#connection-pooling).

This lab will show how to create connection pools using python-oracledb driver

Estimated Time: 10 minutes

Watch the video below for a quick walk-through of the lab.
[Connection Pools](videohub:1_2lx58yh3)

### Objectives

*  Learn best practices and efficient techniques for connection pooling.

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Oracle Autonomous Database Serverless
* Environment Setup

## Task 1: Connection pooling
1. Review the code contained in *connect\_pool.py*:

    ````
    import oracledb
    import threading
    import db_config

    pool = oracledb.create_pool(user=db_config.user,    password=db_config.pw, dsn=db_config.dsn, config_dir=db_config.config_dir,min=2, max=5, increment=1, getmode=oracledb.POOL_GETMODE_WAIT, wallet_location=db_config.wallet_location, wallet_password=db_config.wallet_password)

    def Query():
        con = pool.acquire()
        cur = con.cursor()
        for i in range(4):
            cur.execute("select myseq.nextval from dual")
            seqval, = cur.fetchone()
            print("Thread", threading.current_thread().name, "fetched sequence =", seqval)

    thread1 = threading.Thread(name='#1', target=Query)
    thread1.start()

    thread2 = threading.Thread(name='#2', target=Query)
    thread2.start()

    thread1.join()
    thread2.join()

    print("All done!")
    ````

    The **create\_pool()** function creates a pool of Oracle connections for the user. Connections in the pool can be used by python-oracledb connections by calling **pool.acquire()**. The initial pool size is 2 connections. The maximum size is 5 connections. When the pool needs to grow, 1 new connection will be created at a time. The pool can shrink back to the minimum size of 2 when connections are no longer in use.

    The **def Query():** line creates a method that is called by each thread.

    In the method, the **pool.acquire()** call gets one connection from the pool (as long as less than 5 are already in use). This connection is used in a loop of 4 iterations to query the sequence myseq. At the end of the method, python-oracledb will automatically close the cursor and release the connection back to the pool for reuse.

    The **seqval, = cur.fetchone()** line fetches a row and puts the single value contained in the result tuple into the variable **seqval**. Without the comma, the value in **seqval** would be a tuple like **"(1,)"**.

    Two threads are created, each invoking the Query() method.

2. In a command terminal, run:

    ````
    <copy>
    python3 connect_pool.py
    </copy>
    ````

    ![Connection Pool](./images/conn-pool.png " " )

    The output shows interleaved query results as each thread fetches values independently. The order of interleaving may vary from run to run.

## Taks 2: Connection pool experiments

1. Review *connect\_pool2.py*, which has a loop for the number of threads, each iteration invoking the Query() method:

    ````
    import oracledb
    import threading
    import db_config

    pool = oracledb.create_pool(user=db_config.user, password=db_config.pw, dsn=db_config.dsn, config_dir=db_config.config_dir, wallet_location=db_config.wallet_location, wallet_password=db_config.wallet_password, min=2, max=5, increment=1, getmode=oracledb.POOL_GETMODE_WAIT)

    def Query():
        con = pool.acquire()
        cur = con.cursor()
        for i in range(4):
            cur.execute("select myseq.nextval from dual")
            seqval, = cur.fetchone()
            print("Thread", threading.current_thread().name, "fetched sequence =", seqval)

    numberOfThreads = 2
    threadArray = []

    for i in range(numberOfThreads):
        thread = threading.Thread(name = '#' + str(i), target = Query)
        threadArray.append(thread)
        thread.start()

    for t in threadArray:
        t.join()

    print("All done!")
    ````

2. In a command terminal, run:

    ````
    <copy>
    python3 connect_pool2.py
    </copy>
    ````

    ![Connection Pool 2](./images/conn-pool2.png " " )

3. Experiment with different values of the pool parameters and **numberOfThreads**. Larger initial pool sizes will make the pool creation slower, but the connections will be available immediately when needed. When **numberOfThreads** exceeds the maximum size of the pool, the **acquire()** call will generate an error such as **ORA-24459: OCISessionGet() timed out waiting for the pool to create new connections**. 

    Pool configurations where min is the same as max (and increment = 0) are often recommended as a best practice. This avoids connection storms on the database server.

## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Use python-oracledb connection pooling

## Acknowledgements

* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, Oracle Database Drivers Product Management, Oct 2022