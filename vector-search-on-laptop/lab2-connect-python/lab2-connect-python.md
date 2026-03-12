# Lab 2: Connect to Oracle Database from Python

## Introduction

In this lab you will write your first Python script to connect to Oracle AI Database, verify the connection, and confirm the database version. All Python code runs inside the `python-runner` container you created in Lab 1. There is no Python installation on your laptop required. Your scripts live on your laptop in `~/hero/` and are executed inside the container through a single `podman exec` command.

Estimated Time: 20 minutes

### About python-oracledb

`python-oracledb` is the official Oracle Python driver, maintained by Oracle. It supports both thin mode (no Oracle Client libraries required) and thick mode. For this workshop, you will use **thin mode**, which is already installed inside the `python-runner` container. From inside that container, the Oracle Database is reachable by its container name `oracle-ai-db` over the shared Podman network.

### Objectives

In this lab, you will:
* Create a Python configuration file with the database connection details
* Write a Python script to connect to Oracle AI Database
* Run the script inside the Python runner container using a single `podman exec` command
* Verify the database version and confirm AI Vector Search support

### Prerequisites

This lab assumes you have:
* Completed Lab 1 (both `oracle-ai-db` and `python-runner` containers running)
* A text editor on your laptop to create files in `~/hero/`
* A terminal or command prompt


## Task 1: Understand the Container Workflow

In this workshop every Python script you write on your laptop is stored in `~/hero/`. That directory is mounted into the `python-runner` container at `/workshop`. To run a script, you use:

```
podman exec python-runner python /workshop/<script-name>.py
```

This single pattern works for every lab. You edit files locally with your preferred editor; the container provides the isolated, pre-configured Python environment. The Oracle Database is reachable from inside the container using the hostname `oracle-ai-db` (the container name on the shared Podman network).

1. Verify the Python runner is running and can reach Oracle:

    ```
    <copy>podman exec python-runner python --version</copy>
    ```

    ```
    <copy>podman exec python-runner python -c "import oracledb; print('oracledb', oracledb.version)"</copy>
    ```

    Both commands should return version strings without errors.

## Task 2: Create the Database Configuration File

1. Create a configuration file to store your database connection details. Create the file `~/hero/config.py`:

    ```python
    <copy>## config.py — Database connection settings
    DB_USER = "workshop"
    DB_PASSWORD = "Workshop_1234"
    ## Use the Oracle container name as hostname — both containers share the oracle-ai-net network
    DB_DSN = "oracle-ai-db:1521/FREEPDB1"
    ONNX_MODEL_NAME = "all_minilm_l12_v2"
    EMBEDDING_DIM = 384
    </copy>
    ```

    > **Note:** The hostname `oracle-ai-db` is the name of the Oracle container on the shared Podman network. From inside the Python container, this name resolves automatically. In a production environment, use environment variables or a secrets manager instead of hardcoding credentials.

## Task 3: Write the Connection Test Script

1. Create the file `~/hero/01_connect_test.py`:

    ```python
    <copy>## 01_connect_test.py — Test Oracle Database connection
    import oracledb
    import config

    def test_connection():
        """Connect to Oracle Database and print version information."""
        print("Connecting to Oracle Database...")

        connection = oracledb.connect(
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            dsn=config.DB_DSN
        )

        cursor = connection.cursor()

        ## Get database version
        cursor.execute("SELECT * FROM v$version WHERE banner_full IS NOT NULL")
        row = cursor.fetchone()
        if row:
            print(f"\nDatabase Banner:\n  {row[0]}")

        ## Confirm AI Vector Search is available
        cursor.execute("""
            SELECT COUNT(*)
            FROM all_objects
            WHERE object_name = 'DBMS_VECTOR'
            AND object_type = 'PACKAGE'
        """)
        count = cursor.fetchone()[0]

        if count > 0:
            print("\nOracle AI Vector Search: AVAILABLE")
            print("  DBMS_VECTOR package found - vector operations supported")
        else:
            print("\nOracle AI Vector Search: NOT FOUND")
            print("  Ensure you are using Oracle AI Database or later")

        ## Check current user
        cursor.execute("SELECT USER FROM DUAL")
        current_user = cursor.fetchone()[0]
        print(f"\nConnected as: {current_user}")

        ## Check Vector distance functions available
        cursor.execute("""
            SELECT COUNT(*)
            FROM all_procedures
            WHERE object_name = 'DBMS_VECTOR'
            AND procedure_name = 'LOAD_ONNX_MODEL'
        """)
        onnx_count = cursor.fetchone()[0]

        if onnx_count > 0:
            print("ONNX Model Loading: SUPPORTED")

        cursor.close()
        connection.close()
        print("\nConnection test completed successfully!")

    if __name__ == "__main__":
        test_connection()
    </copy>
    ```

## Task 4: Run the Connection Test

1. Run the script inside the Python runner container:

    ```bash
    <copy>podman exec python-runner python /workshop/01_connect_test.py</copy>
    ```

2. You should see output similar to:

    ```bash
    Connecting to Oracle Database...

    Database Banner:
      Oracle AI Database Free Release 23.0.0.0.0 - ...

    Oracle AI Vector Search: AVAILABLE
      DBMS_VECTOR package found - vector operations supported

    Connected as: WORKSHOP
    ONNX Model Loading: SUPPORTED

    Connection test completed successfully!
    ```

    > **Note:** If you see a connection error, first check that both containers are running with `podman ps`. If the Oracle container is running but the connection fails, confirm the network is set up correctly with `podman network inspect oracle-ai-net`.

## Learn More

* [python-oracledb Documentation](https://python-oracledb.readthedocs.io/)
* [Oracle Database 23ai Vector Search](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/)

## Acknowledgements
* **Author** - Oracle LiveLabs Team
* **Last Updated By/Date** - Oracle LiveLabs Team, February 2026
