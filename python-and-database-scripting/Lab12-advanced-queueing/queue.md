# Advanced Queueing

## Introduction
[Oracle Advanced Queuing (AQ)](https://python-oracledb.readthedocs.io/en/latest/user_guide/aq.html) APIs usable in python-oracledb thick mode allow messages to be passed between applications.

This lab will show how to use advanced queueing with python-oracledb driver in thick mode

Estimated Lab Time: 5 minutes

### Objectives

*  Learn best practices and efficient techniques for passing messages between applications using advanced queueing.

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Oracle Autonomous Database shared infrastructure
* Environment Setup

## Task 1: Message passing with Oracle Advanced Queuing
Review *aq.py*:

````
<copy>
import oracledb
import decimal
import db_config_thick as db_config

con = oracledb.connect(user=db_config.user,
                        password=db_config.pw, 
                        dsn=db_config.dsn,
                        config_dir=db_config.config_dir, wallet_location=db_config.wallet_location, wallet_password=db_config.wallet_password)

cur = con.cursor()
BOOK_TYPE_NAME = "UDT_BOOK"
QUEUE_NAME = "BOOKS"
QUEUE_TABLE_NAME = "BOOK_QUEUE_TABLE"

# Cleanup
cur.execute(f"""
        begin
            dbms_aqadm.stop_queue('{QUEUE_NAME}');
            dbms_aqadm.drop_queue('{QUEUE_NAME}');
            dbms_aqadm.drop_queue_table('{QUEUE_TABLE_NAME}');

            execute immediate 'drop type {BOOK_TYPE_NAME}';
            exception when others then
                if sqlcode <> -24010 then
                    raise;
                end if;
        end;"""

# Create a type
print("Creating books type UDT_BOOK...")
cur.execute(f"""
        create type {BOOK_TYPE_NAME} as object (
            title varchar2(100),
            authors varchar2(100),
            price number(5,2)
        );""")


# Create queue table and queue and start the queue
print("Creating queue table...")
cur.callproc("dbms_aqadm.create_queue_table",
             (QUEUE_TABLE_NAME, BOOK_TYPE_NAME))
cur.callproc("dbms_aqadm.create_queue", (QUEUE_NAME, QUEUE_TABLE_NAME))
cur.callproc("dbms_aqadm.start_queue", (QUEUE_NAME,))

books_type = con.gettype(BOOK_TYPE_NAME)
queue = con.queue(QUEUE_NAME, books_type)

# Enqueue a few messages
print("Enqueuing messages...")

BOOK_DATA = [
    ("The Fellowship of the Ring", "Tolkien, J.R.R.", decimal.Decimal("10.99")),
    ("Harry Potter and the Philosopher's Stone", "Rowling, J.K.",
     decimal.Decimal("7.99"))
]

for title, authors, price in BOOK_DATA:
    book = books_type.newobject()
    book.TITLE = title
    book.AUTHORS = authors
    book.PRICE = price
    print(title)
    queue.enqone(con.msgproperties(payload=book))
    con.commit()

# Dequeue the messages
print("\nDequeuing messages...")
queue.deqoptions.wait = oracledb.DEQ_NO_WAIT
while True:
    props = queue.deqone()
    if not props:
        break
    print(props.payload.TITLE)
    con.commit()

print("\nDone.")
</copy>
````

This file sets up Advanced Queuing using Oracle's DBMS\_AQADM package. The queue is used for passing Oracle UDT\_BOOK objects. The file uses AQ interface features enhanced in cx\_Oracle 7.2.

Run the file:

````
<copy>
python3 aq.py
</copy>
````

The output shows messages being queued and dequeued.

![AQ Results](./images/step14.1-aq.png " ")

To experiment, split the code into three files: one to create and start the queue, and two other files to queue and dequeue messages. Experiment running the queue and dequeue files concurrently in separate terminal windows.

Try removing the commit() call in **aq-dequeue.py**. Now run **aq-enqueue.py** once and then **aq-dequeue.py** several times. The same messages will be available each time you try to dequeue them.

Change **aq-dequeue.py** to commit in a separate transaction by changing the "visibility" setting:

````
<copy>
queue.deqOptions.visibility = oracledb.DEQ_IMMEDIATE
</copy>
````

This gives the same behavior as the original code.

Now change the options of enqueued messages so that they expire from the queue if they have not been dequeued after four seconds:

````
<copy>
queue.enqOne(con.msgproperties(payload=book, expiration=4))
<copy>
````

Now run **aq-enqueue.py** and **wait four seconds** before you run **aq-dequeue.py**. There should be no messages to dequeue.

## Conclusion

In this lab, you had an opportunity to try out advanced queuing for passing messages between applications.
You have learned how to:
* Use python-oracledb thick mode advanced queueing functionality

## Acknowledgements

* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, Aug 2022