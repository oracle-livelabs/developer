# python-oracledb Thick Mode

## Introduction
Labs 3 to 10 use python-oracledb in thin mode. However, there are certain features which are only available in the **thick mode** of the python-oracledb driver. Note that you can also run labs 3 to 10 in thick mode by just changing the import line in the sample files from **import db\_config** to **import db\_config\_thick as db_config**.

This lab will show how to use python-oracledb driver in thick mode.

Estimated Lab Time: 5 minutes

### Objectives

*  Connect to Oracle Autonomous Database shared infrastructure using python-oracledb thick mode.

### Prerequisites

This lab assumes you have completed the following labs:
* Login to Oracle Cloud
* Create Oracle Autonomous Database shared infrastructure
* Environment Setup and you have installed the tutorial schema

## Task 1: Review the configuration file for **thick** mode

To enable **thick** mode, the Oracle client libraries are required.
* Note: For this workshop, Cloud Shell already has the Oracle client libraries installed. The instructions for installing the Oracle client libraries are present [here](https://python-oracledb.readthedocs.io/en/latest/user_guide/installation.html#optionally-install-oracle-client). 

1. In Code Editor, review the *db\_config\_thick.py* file in the samples/tutorial directory.
Note that the default values are used to match the connection information for your enviroment. For example, the default username is "pythondemo", in case the enviroment variable "PYTHON_USER" has not been initialized.

````
<copy>
user = os.environ.get("PYTHON_USER", "pythondemo")
config_dir = os.environ.get("CONFIG_DIR")
dsn = os.environ.get("DSN_ADB")
wallet_location = os.environ.get("WALLET_LOCATION")
wallet_password = os.environ.get("WALLET_PASSWORD")
pw = os.environ.get("PYTHON_PASSWORD")
if pw is None:
    pw = getpass.getpass("Enter password for %s: " % user)
if wallet_password is None:
    wallet_password = getpass.getpass("Enter password for the Wallet: ")
</copy>
````

## Task 2: Review the Oracle client library path

In *db\_config\_thick.py* the Oracle Client library path is set by the **instant\_client\_dir** variable.

*Note*: For this tutorial **instant\_client\_dir** is already set to **None** and the *db\_config\_thick.py* file does not require any changes. 

Depending on your environment you will need to edit db\_config\_thick.py and set instant\_client\_dir to **None** or to a valid path according to the following notes:

- If you are on macOS (Intel x86) or Windows, and you have installed Oracle Instant Client libraries because your database is on a remote machine, then set instant\_client\_dir to the path of the Instant Client libraries.

- If you are on Windows and have a local database installed, then comment out the two Windows lines, so that instant\_client\_dir remains None.

- In all other cases (including Linux with Oracle Instant Client), make sure that instant\_client\_dir is set to None. In these cases you must make sure that the Oracle libraries from Instant Client or your ORACLE\_HOME are in your system library search path before you start Python. On Linux, the path can be configured with ldconfig or with the LD\_LIBRARY\_PATH environment variable.

*Important!* Calling the **init\_oracle\_client()** function enables python-oracledb driver in **thick** mode.

Once python-oracledb is in thick mode, you cannot return to thin mode without removing the calls to **init\_oracle\_client()** and restarting the application.

````
<copy>
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
oracledb.init_oracle_client(lib_dir=instant_client_dir,config_dir=config_dir)
</copy>
````

Labs 12 to 14 labs are specific to the python-oracledb thick modes in this release of python-oracledb.

## Conclusion

In this lab, you had an opportunity to learn about configuring python-oracledb driver to operate in thick mode.

## Acknowledgements

* **Authors** - Christopher Jones, Anthony Tuininga, Sharad Chandran, Veronica Dumitriu
* **Contributors** - Jaden McElvey, Anoosha Pilli, Troy Anthony
* **Last Updated By/Date** - Veronica Dumitriu, Oracle Data Drivers Product Management, Feb 2023