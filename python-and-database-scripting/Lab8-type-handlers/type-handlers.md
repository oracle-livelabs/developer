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


## Type Handlers

1.  Basic output type handler

    Output type handlers enable applications to change how data is fetched from the database. For example, numbers can be returned as strings or decimal objects. LOBs can be returned as string or bytes.

    A type handler is enabled by setting the outputtypehandler attribute on either a cursor or the connection. If set on a cursor it only affects queries executed by that cursor. If set on a connection it affects all queries executed on cursors created by that connection.

    Review the code contained in **type\_output.py**:

    ````
    import cx_Oracle
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)
    cur = con.cursor()

    print("Standard output...")
    for row in cur.execute("select * from dept"):
        print(row)
    ````

    In a terminal window, run:

    ````
    <copy>
    cd ~/python/tutorial
    python3 type_output.py
    </copy>
    ````

    This shows the department number represented as digits like 10.

    ![](./images/step10.1-typeoutput.png " ")

    Add an output type handler to the bottom of the **type\_output.py** file:

    ````
    <copy>
    def ReturnNumbersAsStrings(cursor, name, defaultType, size, precision, scale):
        if defaultType == cx_Oracle.NUMBER:
            return cursor.var(str, 9, cursor.arraysize)

    print("Output type handler output...")
    cur = con.cursor()
    cur.outputtypehandler = ReturnNumbersAsStrings
    for row in cur.execute("select * from dept"):
        print(row)
    </copy>
    ````

    This type handler converts any number columns to strings with maxium size 9.

    Run the script again:

    ````
    <copy>
    python3 type_output.py
    </copy>
    ````

    The new output shows the department numbers are now strings within quotes like '10'.

    ![](./images/step10.1-typeoutput2.png " ")

2.  Output type handlers and variable converters

    When numbers are fetched from the database, the conversion from Oracle's decimal representation to Python's binary format may need careful handling. To avoid unexpected issues, the general recommendation is to do number operations in SQL or PL/SQL, or to use the decimal module in Python.

    Output type handlers can be combined with variable converters to change how data is fetched.

    Review **type\_converter.py**:

    ````
    import cx_Oracle
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)
    cur = con.cursor()

    for value, in cur.execute("select 0.1 from dual"):
        print("Value:", value, "* 3 =", value * 3)
    ````

    Run the file:

    ````
    <copy>
    python3 type_converter.py
    </copy>
    ````

    The output is like:

    ````
    Value: 0.1 * 3 = 0.30000000000000004
    ````

    Replace the text file in the **type_converter.py** file with the text below to add a type handler that uses a Python decimal converter:

    ````
    <copy>
    import cx_Oracle
    import decimal
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)
    cur = con.cursor()

    def ReturnNumbersAsDecimal(cursor, name, defaultType, size, precision, scale):
        if defaultType == cx_Oracle.NUMBER:
            return cursor.var(str, 9, cursor.arraysize, outconverter = decimal.Decimal)

    cur.outputtypehandler = ReturnNumbersAsDecimal

    for value, in cur.execute("select 0.1 from dual"):
        print("Value:", value, "* 3 =", value * 3)
    </copy>
    ````

    The Python decimal.Decimal converter gets called with the string representation of the Oracle number. The output from decimal.Decimal is returned in the output tuple.

    Run the file again:

    ````
    <copy>
    python3 type_converter.py
    </copy>
    ````

    Output is like:

    ````
    Value: 0.1 * 3 = 0.3
    ````

    Although the code demonstrates the use of outconverter, in this particular case, the variable can be created simply by using the following code to replace the outputtypehandler function defined above. Replace the file with the text below.

    ````
    <copy>
    import cx_Oracle
    import decimal
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)
    cur = con.cursor()

    def ReturnNumbersAsDecimal(cursor, name, defaultType, size, precision, scale):
        if defaultType == cx_Oracle.NUMBER:
            return cursor.var(decimal.Decimal, arraysize = cursor.arraysize)

    cur.outputtypehandler = ReturnNumbersAsDecimal

    for value, in cur.execute("select 0.1 from dual"):
        print("Value:", value, "* 3 =", value * 3)
    </copy>
    ````

3.  Input type handlers

    Input type handlers enable applications to change how data is bound to statements, or to enable new types to be bound directly without having to be converted individually.

    Review **type\_input.py**, which is similar to the final bind\_sdo.py from section 4.4, with the addition of a new class and converter (shown in bold):

    ````
    import cx_Oracle
    import db_config

    con = cx_Oracle.connect(db_config.user, db_config.pw, db_config.dsn)
    cur = con.cursor()

    # Create table
    cur.execute("""begin
                    execute immediate 'drop table testgeometry';
                    exception when others then
                    if sqlcode <> -942 then
                        raise;
                    end if;
                end;""")
    cur.execute("""create table testgeometry (
                id number(9) not null,
                geometry MDSYS.SDO_GEOMETRY not null)""")

    # Create a Python class for an SDO
    class mySDO(object):

       def __init__(self, gtype, elemInfo, ordinates):
          self.gtype = gtype
          self.elemInfo = elemInfo
          self.ordinates = ordinates

    # Get Oracle type information
    objType = con.gettype("MDSYS.SDO_GEOMETRY")
    elementInfoTypeObj = con.gettype("MDSYS.SDO_ELEM_INFO_ARRAY")
    ordinateTypeObj = con.gettype("MDSYS.SDO_ORDINATE_ARRAY")

    # Convert a Python object to MDSYS.SDO_GEOMETRY
    def SDOInConverter(value):
        obj = objType.newobject()
        obj.SDO_GTYPE = value.gtype
        obj.SDO_ELEM_INFO = elementInfoTypeObj.newobject()
        obj.SDO_ELEM_INFO.extend(value.elemInfo)
        obj.SDO_ORDINATES = ordinateTypeObj.newobject()
        obj.SDO_ORDINATES.extend(value.ordinates)
        return obj

    def SDOInputTypeHandler(cursor, value, numElements):
        if isinstance(value, mySDO):
            return cursor.var(cx_Oracle.OBJECT, arraysize = numElements,
                    inconverter = SDOInConverter, typename = objType.name)

    sdo = mySDO(2003, [1, 1003, 3], [1, 1, 5, 7])  # Python object
    cur.inputtypehandler = SDOInputTypeHandler
    cur.execute("insert into testgeometry values (:1, :2)", (1, sdo))

    # Define a function to dump the contents of an Oracle object
    def dumpobject(obj, prefix = "  "):
        if obj.type.iscollection:
            print(prefix, "[")
            for value in obj.aslist():
                if isinstance(value, cx_Oracle.Object):
                    dumpobject(value, prefix + "  ")
                else:
                    print(prefix + "  ", repr(value))
            print(prefix, "]")
        else:
            print(prefix, "{")
            for attr in obj.type.attributes:
                value = getattr(obj, attr.name)
                if isinstance(value, cx_Oracle.Object):
                    print(prefix + "  " + attr.name + " :")
                    dumpobject(value, prefix + "    ")
                else:
                    print(prefix + "  " + attr.name + " :", repr(value))
            print(prefix, "}")

    # Query the row
    print("Querying row just inserted...")
    cur.execute("select id, geometry from testgeometry")
    for (id, obj) in cur:
        print("Id: ", id)
        dumpobject(obj)
    ````

    In the new file, a Python class mySDO is defined, which has attributes corresponding to each Oracle MDSYS.SDO\_GEOMETRY attribute. The mySDO class is used lower in the code to create a Python instance:

    ````
    sdo = mySDO(2003, [1, 1003, 3], [1, 1, 5, 7])
    ````

    which is then directly bound into the INSERT statement like:

    ````
    cur.execute("insert into testgeometry values (:1, :2)", (1, sdo))
    ````

    The mapping between Python and Oracle objects is handled in SDOInConverter which uses the cx\_Oracle newobject() and extend() methods to create an Oracle object from the Python object values. The SDOInConverter method is called by the input type handler SDOInputTypeHandler whenever an instance of mySDO is inserted with the cursor.

    To confirm the behavior, run the file:

    ````
    <copy>
    python3 type_input.py
    </copy>
    ````

    ![](./images/step10.3-typeinput.png " ")
    
## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Use python-oracledb for .......

## Acknowledgements

* **Author** - Christopher Jones, Anthony Tuininga, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, July 2022