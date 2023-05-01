# Query a JSON table from Python

## Introduction

This section provides detail on how to work with JSON data in Oracle Autonomous Database using Python’s interface. The exercises include loading JSON data into a table, validating documents with IS JSON check, and querying JSON data from Python.

Estimated Lab Time: 10 minutes

### Objectives

* Learn best practices and efficient techniques for working with JSON data in Oracle Autonomous Database using Python’s interface.

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Oracle Autonomous Database shared infrastructure
* Environment Setup

## Task 1: Query data in a JSON table

The exercises include querying JSON data from a table in Oracle Autonomous Database from Python.

Review the code contained in *query_json.py*:

````
<copy>
import oracledb
import db_config

con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir, wallet_location=db_config.wallet_location, wallet_password=db_config.wallet_password)
cur = con.cursor()

cur.execute('select * from json_table')

for row in cur:
   print (row)

</copy>
````

*Note*: Ensure to have three spaces in front of the ‘print row’ command. These three spaces are a code indentation that indicates a block of code in Python, you must indent each line of the block by the same amount. In this case, ‘print row’ is the block of code we execute in the loop ‘for row in cur:’. Make sure you have those spaces when you execute the command. Hit Enter to close the block of code in the loop.

In Cloud Shell or in a terminal window, run:

````
<copy>
python3 query_json.py
</copy>
````

Python returns an empty row:
![Query JSON table](./images/query_json_table.png " ")

## Task 2: Insert a row into the table

Next you're going to insert a row into the table and re-query the table.

1. Review *insert_json.py* to append the following lines:

````
<copy>
import oracledb
import db_config

con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir, wallet_location=db_config.wallet_location, wallet_password=db_config.wallet_password)
cur = con.cursor()

cur.execute('delete from json_table');
cur.execute('commit');

cur.execute('insert into json_table(json_data) values (\'{rating: "3.0 out of 5 stars",title: "Quality product",customer_name: "John Smith",date: "on 23 April 2023",colour: "Colour Name: Envoy colour",purchase_type: "Verified Purchase",comment: "Good service"}\')')

cur.execute('commit')

cur.close();
con.close();

</copy>
````

2. Re-query the table in Cloud Shell or in a terminal window:

````
<copy>
python3 query_json.py
</copy>
````

Python returns the LOB pointer:
![Query JSON row](./images/query_json_row.png " ")


## Task 4: Retrieve a portion of the JSON document

Retrieve and print the **rating** portion of the JSON document.

1. Edit query_json.py to append the following lines:

````
<copy>

cur.execute('select json_value(json_data, \'$.rating\') from json_table')

for row in cur:
   print (row)

</copy>
````

2. In Cloud Shell or in a terminal window, rerun the query_json.py file and notice the results:

````
<copy>
python3 query_json.py
</copy>
````

Python returns the **rating**:
![Query JSON structure](./images/query_json_structure.png " ")

3. Retrieve the **comment titles**

Edit *query_json.py* file to append the following lines of code:

````
<copy>

cur.execute('select json_value(json_data, \'$.title\') from json_table')

for row in cur:
   print (row)

</copy>
````

4. In Cloud Shell or in a terminal window, rerun the query_json.py file and notice the results:

````
<copy>
python3 query_json.py
</copy>
````

Python returns the **title**:
![Query JSON title](./images/query_json_title.png " ")

## Task 5: JSON_VALUE and JSON_QUERY

To retrieve a single value of a JSON document, the JSON_VALUE function was used. JSON_VALUE retrieves only one value. JSON_VALUE uses dot-notation syntax – JSON Path Expression – to navigate through a JSON document hierarchy. The dot-notation syntax is a table alias (represented by the ‘$’ sign) followed by a dot (.) and the name of a JSON column we want to retrieve (or more if the document structure includes nested values).

Every cursor.execute() call has to be committed to the database with a ‘commit’ statement.

Finally, the results of the query are retrieved by a simple print row call. Now try retrieving the complete JSON document using JSON_VALUE.

1. Edit query_json.py file to append the following lines of code:

````
<copy>
cur.execute('select json_value(json_data, \'$\') from json_table')

for row in cur:
   print (row)
</copy>
````

2. In Cloud Shell or in a terminal window, run the query_json.py file and notice the results:

````
<copy>
python3 query_json.py
</copy>
````

You will notice that no records are returned even though we know they have been populated with data. This is due to JSON_VALUE being able to work only with scalar SQL data types (that is, not an object or collection data type).

![JSON_VALUE](./images/json_value.png " ")

3. To retrieve fragments of a JSON document, JSON_QUERY has to be used.

Edit query_json.py file to append the following lines of code:

````
<copy>
cur.execute('select json_value(json_data, \'$\') from json_table')

for row in cur:
   print (row)
</copy>
````

4. In Cloud Shell or in a terminal window, run the query_json.py file and notice the results:

````
<copy>
python3 query_json.py
</copy>
````

![JSON_QUERY](./images/json_query.png " ")

## Task 6: Is it JSON or not?

You are going to insert a second row into the json_table table in a non-JSON formatted.

1. In Code Editor, edit json_query.py to add the following lines of code before closing the cursor and the connection:

````
<copy>

cur.execute('insert into json_table (json_data) values (\'<rating> 3.0 out of 5 stars </rating> <title> Quality product </title> <customer_name> "Geir Gjorven </customer_name> <date> on 29 September 2014 </date> <colour> Colour Name: Envoy colour </colour> <purchase_type> Verified Purchase </purchase_type> <comment> Good service </comment>\')')

cur.execute('commit')

</copy>
````

The record is committed to the database without an error because the table does not specifically define its input has to be of the JSON format. 

2. Check that the record has been added to the table by counting the number of rows json_table.

In Code Editor, append the following lines to the query_json.py file:

````
<copy>
cur.execute('select count(*) from json_table')

for row in cur: print (row)
</copy>
````

In Cloud Shell or in a terminal window, run query_json.py file:

````
<copy>
python3 query_json.py
</copy>
````

Notice the results:

![Is JSON](./images/is_json.png " ")

3. You can filter out records that do not follow JSON format with IS JSON and IS NOT JSON SQL extensions. First, check if there are any non-JSON records in the table.

In Code Editor, append the following lines to the query_json.py file:

````
<copy>
cur.execute('select id from json_table where json_data IS NOT JSON')

for row in cur: print (row)
</copy>
````

*Note*: The index number may be different in the query executed, in which case change the id from 2 specified in the delete statement following.

Delete the non-JSON row(s) from json_table. In Code Editor, append the following lines to the query_json.py file

````
<copy>
cur.execute('delete from json_table where id=2')

cur.execute('commit')
</copy>
````

In Cloud Shell or in a terminal window, run query_json.py file:

````
<copy>
python3 query_json.py
</copy>
````

Notice the results.

## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to create a table having JSON data, and to query the JSON data from a table using Python.

## Acknowledgements

* **Authors** - Troy Anthony, Veronica Dumitriu
* **Contributors** - Anoosha Pilli, Dylan McLeod, Arabella Yao
* **Last Updated By/Date** - Veronica Dumitriu, Product Management, Apr 2023
