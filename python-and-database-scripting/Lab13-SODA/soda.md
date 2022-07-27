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

## Simple Oracle Document Access (SODA)

Simple Oracle Document Access is a set of NoSQL-style APIs. Documents can be inserted, queried, and retrieved from Oracle Database using a set of NoSQL-style cx\_Oracle methods. By default, documents are JSON strings. SODA APIs exist in many languages.

1.  Inserting JSON Documents

    Review **soda.py**:

    ````
    import cx_Oracle
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)

    soda = con.getSodaDatabase()

    collection = soda.createCollection("friends")

    content = {'name': 'Jared', 'age': 35, 'address': {'city': 'Melbourne'}}

    doc = collection.insertOneAndGet(content)
    key = doc.key

    doc = collection.find().key(key).getOne()
    content = doc.getContent()
    print('Retrieved SODA document dictionary is:')
    print(content)
    ````

    **soda.createCollection()** will create a new collection, or open an existing collection, if the name is already in use.

    **insertOneAndGet()** inserts the content of a document into the database and returns a SODA Document Object. This allows access to meta data such as the document key. By default, document keys are automatically generated.

    The **find()** method is used to begin an operation that will act upon documents in the collection.

    **content** is a dictionary. You can also get a JSON string by calling **doc.getContentAsString()**.

    Run the file:

    ````
    <copy>
    cd ~/python/tutorial
    python3 soda.py
    </copy>
    ````

    The output shows the content of the new document.

    ![](./images/step15.1-soda.png " ")

2.  Searching SODA Documents

    Extend **soda.py** to insert some more documents and perform a find filter operation:

    ````
    <copy>
    myDocs = [
        {'name': 'Gerald', 'age': 21, 'address': {'city': 'London'}},
        {'name': 'David', 'age': 28, 'address': {'city': 'Melbourne'}},
        {'name': 'Shawn', 'age': 20, 'address': {'city': 'San Francisco'}}
    ]
    collection.insertMany(myDocs)

    filterSpec = { "address.city": "Melbourne" }
    myDocuments = collection.find().filter(filterSpec).getDocuments()

    print('Melbourne people:')
    for doc in myDocuments:
        print(doc.getContent()["name"])
    </copy>
    ````

    Run the script again:

    ````
    <copy>
    python3 soda.py
    </copy>
    ````

    The find operation filters the collection and returns documents where the city is Melbourne. Note the **insertMany()** method is currently in preview.

    ![](./images/step15.2-soda1.png " ")

    SODA supports query by example (QBE) with an extensive set of operators. Extend **soda.py** with a QBE to find documents where the age is less than 25:

    ````
    <copy>
    filterSpec = {'age': {'$lt': 25}}
    myDocuments = collection.find().filter(filterSpec).getDocuments()

    print('Young people:')
    for doc in myDocuments:
        print(doc.getContent()["name"])
    </copy>
    ````

    Running the script displays the names.

    ![](./images/step15.2-soda2.png " ")

## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Use python-oracledb for .......

## Acknowledgements

* **Author** - Christopher Jones, Anthony Tuininga, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, July 2022