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

## Python-oracledb Thick mode
All the above examples use python-oracledb in thin mode, but there are certain features which are only available in the thick mode of the python-oracledb driver. The upcoming sections show some of these. Note that you can also run all the earlier examples in thick mode by just changing the import line in examples from import db_config to import db_config_thick as db_config.

The following sections assume you have installed the tutorial schema as shown at the tutorial start.

    10.1 Review the Oracle Client library path

    You additionally need to make Oracle Client libraries available. Follow the documentation on Installing python-oracledb.

    When you have installed Oracle Client libraries, review the library path settings in db_config_thick.py file. If python-oracledb cannot locate Oracle Client libraries, then your applications will fail with an error like "DPI-1047: Cannot locate a 64-bit Oracle Client library". For our examples, we are using Oracle Instant Client libraries.

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

    Important! Calling the init_oracle_client() function enables the thick mode of python-oracledb. Once python-oracledb is in thick mode, you cannot return to thin mode without removing calls to init_oracle_client() and restarting the application.

    Edit db_config_thick.py and set instant_client_dir to None or to a valid path according to the following notes:

        If you are on macOS (Intel x86) or Windows, and you have installed Oracle Instant Client libraries because your database is on a remote machine, then set instant_client_dir to the path of the Instant Client libraries.

        If you are on Windows and have a local database installed, then comment out the two Windows lines, so that instant_client_dir remains None.

        In all other cases (including Linux with Oracle Instant Client), make sure that instant_client_dir is set to None. In these cases you must make sure that the Oracle libraries from Instant Client or your ORACLE_HOME are in your system library search path before you start Python. On Linux, the path can be configured with ldconfig or with the LD_LIBRARY_PATH environment variable.
    10.2 Review the configuration files for thick mode

    Review db_config_thick.py (thick mode), and db_config.sql files in the tutorial directory. These are included in other Python and SQL files for setting up the database connection.

    Edit db_config_thick.py file and change the default values to match the connection information for your environment. Alternatively, you can set the given environment variables in your terminal window. For example, the default username is "pythondemo" unless the environment variable "PYTHON_USER" contains a different username. The default connection string is for the 'orclpdb' database service on the same machine as Python. In Python Database API terminology, the connection string parameter is called the "data source name" or "dsn". Using environment variables is convenient because you will not be asked to re-enter the password when you run scripts:

    user = os.environ.get("PYTHON_USER", "pythondemo")

    dsn = os.environ.get("PYTHON_CONNECT_STRING", "localhost/orclpdb")

    pw = os.environ.get("PYTHON_PASSWORD")
    if pw is None:
        pw = getpass.getpass("Enter password for %s: " % user)

    Also, change the default username and connection string in the SQL configuration file db_config.sql:

    -- Default database username
    def user = "pythondemo"

    -- Default database connection string
    def connect_string = "localhost/orclpdb"

    -- Prompt for the password
    accept pw char prompt 'Enter database password for &user: ' hide

    The tutorial instructions may need adjusting, depending on how you have set up your environment.

The following sections are specific to the python-oracledb thick modes in this release of python-oracledb.

## Conclusion

In this lab, you had an opportunity to try out connecting Python to the Oracle Database.
You have learned how to:
* Use python-oracledb for .......

## Acknowledgements

* **Author** - Christopher Jones, Anthony Tuininga, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, DB Product Management, July 2022