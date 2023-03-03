# Environment Setup

## Introduction

This tutorial is an introduction to using Python with Oracle Database. It contains beginner and advanced material. Follow the steps in this document. The **tutorial** directory has scripts to run and modify.
This lab will show you how to install the **python-oracledb** driver and how to configure and test the connection to the Oracle Autonomous Database, shared infrastructure.

Estimated Time: 15 minutes

Watch the video below for a quick walk-through of the lab.
[Environment Setup](videohub:1_s2pdny0p)

### About python-oracledb driver

**python-oracledb** driver is a Python extension module that enables access to Oracle Database. This latest, renamed release of the widely used cx_Oracle driver introduces a new ‘Thin’ mode for direct connection to the database and it conforms to the Python database API 2.0 specification with a considerable number of additions and a couple of exclusions.

python-oracledb driver is compatible with Python versions 3.6 through 3.11. Prebuilt packages are available on Windows for Python 3.7 or later, on macOS for Python 3.7 or later, and on Linux for Python 3.6 or later.

python-oracledb 1.2 is available. It has a default **Thin** mode for direct connection to Oracle Database and Oracle client libraries are optional.
In **Thick** mode, some advanced Oracle Database functionality is currently only available when optional Oracle Client libraries are loaded by python-oracledb. Libraries are available in the free Oracle Instant Client packages. Python-oracledb can use Oracle Client libraries 11.2 through 21c.

Python is open-source, cross-platform, and free of cost. There's no excuse not to give Python a try!

### Objectives

In this lab, you will:

* Install Python 3, if not already installed. *Note: Cloud Shell has Python 3.8.13 preinstalled.*
* Install python-oracledb driver
* Connect to the Oracle Autonomous Database shared infrastructure using the python-oracledb driver
* Learn how to validate Python operations

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Autonomous Database shared infrastructure [Setup Autonomous Database Instance](../Lab1-adb/adb.md)
* Install Python 3, if not already available. It can be obtained from your operating system package library or from [python.org](https://python.org). On Windows, use Python 3.7 or later. On macOS, use Python 3.8 or later. On Linux, use Python 3.6 or later.

## Task 1: Install Python 3

Python comes preinstalled on most Linux distributions, and for this LiveLab, the Cloud Shell already has Python 3.8.13 preinstalled, so you don't have to run this step. We however provide the step in case you wanted to run this in your own environment, outside of Cloud Shell. 
The Python packages can be obtained from the software repository of your Linux distribution using the package manager.

1.  Open up the Oracle Cloud Shell check if python3 has been installed by running the command.

    ````
<copy>
python3 -V
</copy>
    ````

    For this tutorial Python Version 3.6 (or later) is preferred. python-oracledb version 1.0 (or later) is needed.
    Oracle Autonomous Database needs to be created in order to connect to it using the python-oracledb driver.

2.  Upgrade Python if you do not have Python 3 installed. There is no harm in running this command multiple times, the system will either install packages or let you know they are already installed.

    ````
<copy>
    sudo yum -y install python3 python3-tools
</copy>
    ````

    ![install python](./images/p_installPython.jpg " ")

## Task 2: Install python-oracledb driver

1.  Install the `python-oracledb` module using python3 and pip.

    On Oracle Linux 8, run the following in the Cloud Shell:

    ````
<copy>
    python3 -m pip install oracledb cryptography --user
</copy>
    ````
 ![install driver](./images/install-driver.png " ")

    *Note* At runtime, the module name of the python-oracledb package is **oracledb**

2.  Test your install by launching the python console and list the available modules.

    ````
    <copy>
    python3
    help('modules')
    </copy>
    ````

    This command will show you a list of installed modules that should include the oracledb module we installed in the previous step.

    ![oracledb modules](./images/oracledb.png " ")

    Type exit() to return to the command line prompt

## Task 3: Download the sample files on Cloud Shell

1. Get the sample Python scripts from [here](https://github.com/veronicadumitriu/OCW2022):

    In the Cloud Shell, run the following:

    ````
    <copy>
    wget https://objectstorage.us-sanjose-1.oraclecloud.com/p/samples.zip
    </copy>
    ````
2. In the Cloud Shell, unzip the sample.zip file, then after unarchiving, remove the .zip file:
    ````
    <copy>
    unzip samples.zip
    </copy>
    ````
    ````
    <copy>
    rm samples.zip
    </copy>
    ````


    ![Sample Files Git Clone](./images/git-clone.png " ")

The **samples/tutorial** directory has scripts to run and modify. The **samples/tutorial/sql** directory has all the SQL scripts used by the Python files to create database tables and other objects.

## Task 4: Environment setup

We are going to use the [Code Editor](https://docs.oracle.com/en-us/iaas/Content/API/Concepts/code_editor_intro.htm) functionality available on your tenancy in order to edit the Python and SQL scripts, as needed.
Oracle Cloud Infrastructure (OCI) Code Editor provides a rich, in-console editing environment that enables you to edit code and update service workflows and scripts without having to switch between the Console and your local development environment.

To access Code Editor, once logged in to your Oracle Cloud Account, select your tenancy and press command prompt icon in Console header, then select Code Editor as in the image below:
![Code Editor](./images/code-editor.png " ")

During this lab you will be reviewing and editing the sample tutorial files provided, so you need to open them in Code Editor:

- From the Menu, select File > Open...
    ![Code Editor Open](./images/code-editor-open.png " ")
- Select the location of the samples/tutorial directory and click **Open**
    ![Code Editor Open Dir](./images/code-editor-open-dir.png " ")
- On the left side Pane > Files you should see all the files and subdirectories in the /tutorial directory. To review or modify a file, select the desired file and this opens in the file editor.
    ![Code Editor Files](./images/code-editor-files.png " ")
- Set Autosave option under File > Autosave menu, to avoid loosing changes you make to the files.

To access the local development environment from Code Editor, you may launch Terminal.

![Launch Terminal](./images/terminal.png " ")
Alternatively, you may want to keep Cloud Shell open side by side. 

1. Let's do the necessary configurations to connect to the Oracle Autonomous Database. First, we need a few arguments used by the connection:
    - **user**:         for this exercise we'll be using the **pythondemo** user
    - **password**:     password for the **pythondemo** user
    - **dsn**:          data source name for the Oracle Autonomous Database shared infrastructure
    - **config dir**:   the location where the dsn connection string resides
    - **wallet location**: the location where the wallet was saved
    - **wallet password**: the password setup for the wallet
    
You need to set the default values to match the system connection information for your environment, as they would be used by the config files *db\_config.py* and *db\_config\_sys.py* in the samples/tutorial directory.
    
In this lab you are going to set the given environment variables in your terminal window.
    
````
<copy>
vi ~/.bash_profile
</copy>
````

Add the folowing lines to the file, with values to match the system connection information for your environment:

*Note*: Populate **DSN\_ADB** with the value stored in file DSN\_ADB.txt that you copied in Lab 1, Task 4.

*Note*: Replace **localuser** in the path with the value of the actual localuser on your OCI environment

````
<copy>
export SYSUSER="ADMIN"
export PYTHON_USER="pythondemo"
export CONFIG_DIR="/home/localuser/Wallets"
export DSN_ADB="db20220721220247_high"
export WALLET_LOCATION="/home/localuser/Wallets"
</copy>
````

Additionally, if you do not want the system to keep prompting you to enter the passwords each time you run python code, you may want to store these as environment variables (you may add them to the *.bash\_profile*):

````
<copy>
export SYSPASSWORD="xxxxxxxx"
export PYTHON_PASSWORD="xxxxxxxx"
export WALLET_PASSWORD="xxxxxxxx"
</copy>
````

*Note*: SYSPASSWORD is the ADMIN password that you set when you created the Oracle Autonomous Database; WALLET\_PASSWORD is the value of the Wallet password you set when saving the Wallet; PYTHON\_PASSWORD is going to be used in one of the subsequent tasks so you might have to edit the file again  to enter it later.

Run the following in the terminal window:

````
<copy>
. ~/.bash_profile
</copy>
````

2. In Code Editor, review the *db\_config\_sys.py* in the tutorial directory. This file is included in other Python files for creating and dropping the tutorial user.

````
<copy>
import oracledb
import os
import getpass
#
# Tutorial credentials and connection string for the SYSTEM (ADMIN) user.
# Environment variable values are used, if they are defined.
#
    
user = os.environ.get("SYSUSER")                    
pw = os.environ.get("SYSPASSWORD")                
dsn = os.environ.get("DSN_ADB")
config_dir = os.environ.get("CONFIG_DIR")
wallet_location = os.environ.get("WALLET_LOCATION")
wallet_password = os.environ.get("WALLET_PASSWORD")
    
if pw is None:
    pw = getpass.getpass("Enter password for %s: " % user)
    
if wallet_password is None:
    wallet_password = getpass.getpass("Enter password for the Wallet: ")
</copy>
````

3. In Code Editor, review *db\_config.py* (thin mode), and *db\_config.sql* files in the samples/tutorial and samples/tutorial/sql directories respectively.
These files are included in other Python and SQL files for setting up the database connection.

Review *db\_config.py* in Code Editor:

````
<copy>
import oracledb
import os
import getpass
    
# Tutorial credentials and connection string.
# Environment variable values are used, if they are defined.

user = os.environ.get("PYTHON_USER", "pythondemo")      #pythondemo schema, or your preferred schema when connecting to ADB
pw = os.environ.get("PYTHON_PASSWORD")
if pw is None:
    pw = getpass.getpass("Enter password for %s: " % user)
config_dir = os.environ.get("CONFIG_DIR") 
dsn = os.environ.get("DSN_ADB")
wallet_location = os.environ.get("WALLET_LOCATION")
wallet_password = os.environ.get("WALLET_PASSWORD")
if wallet_password is None:
    wallet_password = getpass.getpass("Enter password for the Wallet: " )
</copy>
````

Also, change the database username and connection string in the SQL configuration file  *db\_config.sql* in samples/tutorial/sql directory and enter values to match the system connection information for your environment:

````
<copy>
-- Default database username
def user = "pythondemo"
    
-- Default database connection string
def connect_string="""(description= (retry_count=20)(retry_delay=3)(address=(protocol=tcps)(port=1522)(host=adb.us-sanjose-1.oraclecloud.com))(connect_data=(service_name=g3f2a0f6aeefec7_db20220721220247_high.adb.oraclecloud.com))(security=(ssl_server_cert_dn="CN=adb.us-sanjose-1.oraclecloud.com, OU=Oracle ADB SANJOSE, O=Oracle Corporation, L=Redwood City, ST=California, C=US")))"""

-- Prompt for the password
accept pw char prompt 'Enter database password for &user: ' hide
</copy>
````

4. In Code Editor, navigate to home/localuser/Wallets directory and edit the *sqlnet.ora* file to add the wallet
location directory and save

````
<copy>
WALLET_LOCATION = (SOURCE = (METHOD = file) (METHOD_DATA = (DIRECTORY="/home/localuser/Wallets")))
</copy>
````

5. Runtime Naming

At runtime, the module name of the python-oracledb package is oracledb:
````
import oracledb
````

## Task 5: Add a New Schema in your Oracle Autonomous Database
1. In this tutorial you will create a new schema in Oracle Autonomous database shared infrastructure.
Review the grants created in *samples/tutorial/sql/create\_user.sql* by opening it in Code Editor. Then open a terminal window and run create\_user.py to execute the create\_user.sql script and create the new schema. This tutorial uses the name **pythondemo** for the new schema.

    *Note: The password you enter for the schema must contain at least an Upper letter, should be 12 characters or more, one digit required.*

    The example above connects as ADMIN user using db\_config_sys file discussed in the earlier section.
    ````
    <copy>
    python3 create_user.py
    </copy>
    ````
    If it runs successfully, you will see something similar below:
    ![Create User](./images/create_user.png " ")
    
    The new user *pythondemo* is created.

2. If for any reason you need to drop the user, review the *samples/tutorial/sql/drop\_user.sql* file and then run
    ````
<copy>
python3 drop_user.py
</copy>
    ````

*Note: if you have not used the default **pythonuser** schema, you'd need to modify the script to explicitely mention the name of the schema to be dropped or alternatively edit ~/.bash_profile to use the schema that you have created earlier.*

3. Install the tables and other database objects for the Livelab.

Once you have a database user, then you can create the key tables and database objects for the Livelab by running *setup\_tutorial.py* (the environment setup file), using your values for the Livelab username, password and connection string:

````
<copy>
python3 setup_tutorial.py
</copy>
````

This will call the setup_tutorial.sql file from tutorials/sql directory to setup some sample tables and database objects required for running the examples in the tutorial.

If it runs successfully, you will see something similar below:
![Setup Tutorial](./images/setup_tut.png " ")

## Task 6: Test Connection to Oracle Autonomous Database
By default, python-oracledb runs in a ‘Thin’ mode which connects directly to Oracle Database. This mode does not need Oracle Client libraries. However, some additional functionality is available when python-oracledb uses them. Python-oracledb is said to be in ‘Thick’ mode when Oracle Client libraries are used. Both modes have comprehensive functionality supporting the Python Database API v2.0 Specification.

There are two ways to create a connection to Oracle Autonomous Database using python-oracledb driver:
- **Standalone connections**: [standalone connections](https://python-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#standaloneconnection) are useful when the application needs a single connection to the database. Connections are created by calling **oracledb.connect()**
- **Pooled connections**: [connection pooling](https://python-oracledb.readthedocs.io/en/latest/user_guide/connection_handling.html#connpooling) is important for performance when applications frequently connect and disconnect from the database. Pools support Oracle's [high-availability](https://python-oracledb.readthedocs.io/en/latest/user_guide/ha.html#highavailability) features and are recommended for applications that must be reliable. Small pools can also be useful for applications that want a few connections available for infrequent use. Pools are created with **oracledb.create_pool()** at application initialization time, and then **ConnectionPool.acquire()** can be called to obtain a connection from the pool.

Connect to the Oracle database and print the version of the database via Python. This confirms you are connected to an Oracle instance and returns the database version.

1. in Code Editor, review the code contained in *connect.py*:
    
````
<copy>
import oracledb
import db_config
    
con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir, 
                    wallet_location=db_config.wallet_location,
                    wallet_password=db_config.wallet_password)

print("Database version:", con.version)
</copy>
````

The username, the password, the connection string and the wallet information that you configured in the db\_config.py module is passed to the connect() method. By default, Oracle's Easy Connect connection string syntax is used.

2. Create a basic connection

In a Terminal window or in Cloud Shell, run the script as below:

````
<copy>
python3 connect.py
</copy>
````

The version number of the database should be displayed. An exception is raised if the connection fails.

![Connect](./images/connect.png " ")

Adjust the username, password, or connection string parameters to invalid values to see the exception.

3.  Executing a query.

Open **query.py** in Code Editor. It looks like:

````
<copy>
import oracledb
import db_config
    
con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir, 
                    wallet_location=db_config.wallet_location, 
                    wallet_password=db_config.wallet_password)
    
cur = con.cursor()
cur.execute("select * from dept order by deptno")
res = cur.fetchall()
for row in res:
    print(row)
</copy>
````

Make sure the print(row) line is indented. This lab uses spaces, not tabs.

The code executes a query and fetches all data.

Save the file and run it:

````
<copy>
python3 query.py
</copy>
````

![Query execution](./images/query.png " " )

In each loop iteration a new row is stored in row as a Python "tuple" and is displayed.

Fetching Data is described in a later section

4.  Closing connections

Connections and other resources used by python-oracledb will automatically be closed at the end of scope. This is a common programming style that takes care of the correct order of resource closure.
    
Resources can also be explicitly closed to free up database resources if they are no longer needed. This may be useful in blocks of code that remain active for some time.
    
Open *query.py* in Code Editor and add calls to close the cursor and connection like:

````
<copy>
import oracledb
import db_config
    
con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir, 
                    wallet_location=db_config.wallet_location, 
                    wallet_password=db_config.wallet_password)
    
cur = con.cursor()
cur.execute("select * from dept order by deptno")
res = cur.fetchall()
for row in res:
    print(row)
        
cur.close()
con.close()
````
    
Running the script completes without error:
    
````
<copy>
python3 query.py
</copy>
````
    
![Query with cursor closed](./images/query.png " " )
    
If you swap the order of the two close() calls you will see an error.

5.  Checking versions

Review the code contained in *versions.py*:

````
<copy>
import oracledb
import db_config

con = oracledb.connect(user=db_config.user,
                    password=db_config.pw, 
                    dsn=db_config.dsn, 
                    config_dir=db_config.config_dir, 
                    wallet_location=db_config.wallet_location, 
                    wallet_password=db_config.wallet_password)

print(oracledb.__version__)  # two underscores before and after the version
print("Database version:", con.version)
</copy>
````
    
Run the script in Cloud Shell or a terminal window:

````
<copy>
python3 versions.py
</copy>
````

This gives the version of the oracledb interface.

![Versions results](./images/versions.png " " )
.

## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Install Python 3 if not already available
* Install python-oracledb driver
* Setup the environment to allow connections to Oracle Autonomous Database, shared infrastructure using python-oracledb
* Create connections to Oracle Autonomous Database, shared infrastructure using the python-oracledb driver

## Acknowledgements
* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, Oracle Database Drivers Product Management, Feb 2023