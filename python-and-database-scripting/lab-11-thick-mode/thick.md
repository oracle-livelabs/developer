# python-oracledb Thick Mode

## Introduction
Labs 1 to 10 use python-oracledb in thin mode, but there are certain features which are only available in the **thick mode** of the python-oracledb driver. Note that you can also run labs 1 to 10 in thick mode by just changing the import line in the sample files from **import db\_config** to **import db\_config\_thick as db_config**.

This lab will show how to use python-oracledb driver in thick mode.

Estimated Lab Time: 5 minutes

### Objectives

*  Connect to Oracle Autonomous Database shared infrastructure using python-oracledb thick mode.

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Oracle Autonomous Database shared infrastructure
* Environment Setup and you have installed the tutorial schema.

## Task 1: Review the Oracle Client library path

Additionally, you need to make Oracle Client libraries available. Follow the documentation on [Installing python-oracledb](https://python-oracledb.readthedocs.io/en/latest/user_guide/installation.html).

When you have installed Oracle Client libraries, review the library path settings in *db\_config\_thick.py* file. If python-oracledb cannot locate Oracle Client libraries, then your applications will fail with an error like "DPI-1047: Cannot locate a 64-bit Oracle Client library". For our examples, we are using Oracle Instant Client libraries.

````
# On Linux, this must be None.
# Instead, the Oracle environment must be set before Python starts.
instant_client_dir = None

# On Windows, if your database is on the same machine, comment these lines out
# and let instant_client_dir be None.  Otherwise, set this to your Instant
# Client directory.  Note the use of the raw string r"...", which allows backslashes to
# be used as directory separators.
if platform.system() == "Windows":
    instant_client_dir = r"C:\Oracle\instantclient_19_14"

# On macOS (Intel x86) set the directory to your Instant Client directory
if platform.system() == "Darwin":
    instant_client_dir = os.environ.get("HOME")+"/Downloads/instantclient_19_8"

# You must always call init_oracle_client() to use thick mode
oracledb.init_oracle_client(lib_dir=instant_client_dir)
````

*Important!* Calling the init\_oracle_client() function enables the thick mode of python-oracledb. Once python-oracledb is in thick mode, you cannot return to thin mode without removing calls to init\_oracle\_client() and restarting the application.

Edit **db\_config\_thick.py** and set instant\_client\_dir to None or to a valid path according to the following notes:

- If you are on macOS (Intel x86) or Windows, and you have installed Oracle Instant Client libraries because your database is on a remote machine, then set instant\_client\_dir to the path of the Instant Client libraries.

- If you are on Windows and have a local database installed, then comment out the two Windows lines, so that instant\_client\_dir remains None.

- In all other cases (including Linux with Oracle Instant Client), make sure that instant\_client\_dir is set to None. In these cases you must make sure that the Oracle libraries from Instant Client or your ORACLE\_HOME are in your system library search path before you start Python. On Linux, the path can be configured with ldconfig or with the LD\_LIBRARY\_PATH environment variable.

## Task 2: Review the configuration files for thick mode

Review db\_config\_thick.py (thick mode), and db\_config.sql files in the tutorial directory. These are included in other Python and SQL files for setting up the database connection.

Edit db\_config\_thick.py file and change the default values to match the connection information for your environment. Alternatively, you can set the given environment variables in your terminal window. For example, the default username is "pythondemo" unless the environment variable "PYTHON_USER" contains a different username. The default connection string is for the 'orclpdb' database service on the same machine as Python. In Python Database API terminology, the connection string parameter is called the "data source name" or "dsn". Using environment variables is convenient because you will not be asked to re-enter the password when you run scripts:

````
<copy>
user = os.environ.get("PYTHON_USER", "pythondemo")

dsn = os.environ.get("PYTHON_CONNECT_STRING", "localhost/orclpdb")

pw = os.environ.get("PYTHON_PASSWORD")
if pw is None:
    pw = getpass.getpass("Enter password for %s: " % user)
</copy>
````

Also, change the default username and connection string in the SQL configuration file **db\_config.sql** to match the specifics of your environment:

````
<copy>
-- Default database username
def user = "pythondemo"

-- Default database connection string
def connect_string = "db20220721220247_high"

-- Prompt for the password
accept pw char prompt 'Enter database password for &user: ' hide
</copy>
````

The tutorial instructions may need adjusting, depending on how you have set up your environment.

Labs 12 to 14 labs are specific to the python-oracledb thick modes in this release of python-oracledb.

## Conclusion

In this lab, you had an opportunity to learn about connecting Python to the Oracle Autonomous Database shared infrastructure, using python-oracledb in thick mode.

## Acknowledgements

* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, July 2022