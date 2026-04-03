# Lab 1: Install Oracle AI Database with Podman

## Introduction

In this lab you will install Oracle AI Database Free on your laptop using Podman/Docker. Oracle AI Database includes native AI Vector Search capabilities, allowing you to store and search vector embeddings alongside your relational data without any external services.

Estimated Time: 20 minutes

### About Oracle AI Database and Podman

Oracle AI Database is the latest release of Oracle Database and includes Oracle AI Vector Search natively. Podman is a container runtime that runs without a daemon, making it ideal for local development. It is fully compatible with Docker images and commands.

### Objectives

In this lab, you will:
* Pull the Oracle AI Database Free container image
* Start and configure the database container
* Verify that the database is running and accessible
* Set up a Python runner container so all Python code runs in an isolated, reproducible environment

### Prerequisites

This lab assumes you have:
* A laptop with at least 8 GB RAM and 20 GB free disk space
* Podman installed and running. If you do not have Podman yet, download it from [podman.io](https://podman.io) (Linux/macOS) or [Podman Desktop](https://podman-desktop.io) (Windows/macOS GUI)
* Internet access to download the container image
* Administrator (sudo) access on your machine

## Task 1: Pull the Oracle AI Database Free Image

1. Pull the Oracle AI Database Free image:

    ```bash
    <copy>podman pull container-registry.oracle.com/database/free:latest</copy>
    ```

    > **Note:** The image is approximately 3.5 GB. Download time depends on your internet connection.

## Task 2: Start the Oracle AI Database Container

1. Create a dedicated Podman network so the Oracle and Python containers can communicate with each other by name:

    ```bash
    <copy>podman network create oracle-ai-net</copy>
    ```

2. Create a local directory to persist database data:

    ```bash
    <copy>mkdir -p ~/hero/oracle-data</copy>
    ```

3. Start the Oracle AI Database container, connected to the shared network:

    ```bash
        <copy>podman run -d \
    --name oracle-ai-db \
    --network oracle-ai-net \
    -p 1521:1521 \
    -e ORACLE_PWD=Welcome_1234 \
    -v $HOME/hero/oracle-data:/opt/oracle/oradata:Z \
    container-registry.oracle.com/database/free:latest
    </copy>
    ```

    The parameters used are:
    - `-d` — Run in detached (background) mode
    - `--name oracle-ai-db` — Give the container a friendly name
    - `--network oracle-ai-net` — Attach to the shared network (so the Python container can reach it by name)
    - `-p 1521:1521` — Map port 1521 (Oracle listener) from container to host
    - `-e ORACLE_PWD=Welcome_1234` — Set the SYS and SYSTEM passwords
    - `-v $HOME/hero/oracle-data:/opt/oracle/oradata:Z` — Bind‑mounts your host folder into the container so the database files persist. $HOME expands to your user’s home directory. The :Z relabels the folder for SELinux so the container can write to it; it is needed on SELinux‑enforcing Linux and harmless elsewhere.

2. Monitor the container startup. The database takes 3–5 minutes to initialize on the first start:

    ```bash
    <copy>podman logs -f oracle-ai-db</copy>
    ```

    Wait until you see:

    ```bash
    #########################
    DATABASE IS READY TO USE!
    #########################
    ```

    Press **Ctrl+C** to stop following the logs.

## Task 3: Create a Workshop User

1. Connect to the database as SYSDBA using the built-in SQL*Plus in the container:

    ```bash
    <copy>podman exec -it oracle-ai-db sqlplus sys/Welcome_1234@//localhost:1521/FREEPDB1 as sysdba</copy>
    ```

2. Create a dedicated user for this workshop with the necessary privileges:

    ```sql
    <copy>
    CREATE USER workshop IDENTIFIED BY Workshop_1234
    DEFAULT TABLESPACE users
    QUOTA UNLIMITED ON users;

    GRANT CONNECT, RESOURCE TO workshop;
    GRANT DB_DEVELOPER_ROLE TO workshop;
    GRANT CREATE MINING MODEL TO workshop;
    GRANT SELECT ANY TABLE TO workshop;
    GRANT EXECUTE ON DBMS_VECTOR TO workshop;
    GRANT EXECUTE ON DBMS_VECTOR_CHAIN TO workshop;
    </copy>
    ```

3. Verify the user was created:

    ```sql
    <copy>SELECT username, account_status FROM dba_users WHERE username = 'WORKSHOP';</copy>
    ```

    You should see:

    ```bash
    USERNAME   ACCOUNT_STATUS
    ---------- ---------------
    WORKSHOP   OPEN
    ```

4. Exit SQL*Plus:

    ```sql
    <copy>EXIT</copy>
    ```

## Task 4: Verify Container Status

1. Confirm the container is running:

    ```bash
    <copy>podman ps</copy>
    ```

    You should see `oracle-ai-db` with status `Up`.

2. Note the connection details you will use throughout this workshop:

    | Parameter | From your laptop | From Python container |
    | --- | --- | --- |
    | Host | localhost | oracle-ai-db |
    | Port | 1521 | 1521 |
    | Service Name | FREEPDB1 | FREEPDB1 |
    | Username | workshop | workshop |
    | Password | Workshop_1234 | Workshop_1234 |
    {: title="Oracle Database Connection Details"}

    > **Note:** Keep this container running throughout the workshop. If you restart your machine, start both containers again with: `podman start oracle-ai-db && podman start python-runner`

## Task 5: Set Up the Python Runner Container

Instead of installing Python libraries directly on your laptop, you will run all Python code inside a dedicated container. This guarantees a consistent, reproducible environment regardless of what is installed on your machine.

1. Create the workshop directory on your laptop. This directory will be mounted inside the Python container so files you create locally are instantly accessible inside the container:

    ```bash
    <copy>
    mkdir -p ~/hero/models
    mkdir -p ~/hero/webapp/templates
    mkdir -p ~/hero/webapp/uploads
    </copy>
    ```

2. Start the Python runner container. It shares the `oracle-ai-net` network with the Oracle container, mounts your workshop directory, and exposes port 5500 for the Flask app in Lab 5:

    ```bash
    <copy>
    podman run -d \
    --name python-runner \
    --network oracle-ai-net \
    -p 5500:5500 \
    -v ~/hero:/workshop \
    python:3.11-slim \
    sleep infinity
    </copy>
    ```

    The parameters used are:
    - `--name python-runner` — A friendly name for the container
    - `--network oracle-ai-net` — Same network as the Oracle container; use hostname `oracle-ai-db` to reach it
    - `-p 5500:5500` — Exposes the Flask web server to your browser in Lab 5
    - `-v ~/hero:/workshop` — Your local files appear at `/workshop` inside the container
    - `sleep infinity` — Keeps the container alive so you can run commands inside it

3. Install the required Python packages inside the container:

    ```bash
    <copy>podman exec python-runner pip install oracledb PyPDF2 flask --quiet</copy>
    ```

4. Verify that both containers are running:

    ```bash
    <copy>podman ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"</copy>
    ```

    You should see both `oracle-ai-db` and `python-runner` with status `Up`.

5. Confirm the Python runner can reach the Oracle container by name:

    ```bash
    <copy>podman exec python-runner python -c "import socket; print(socket.gethostbyname('oracle-ai-db'))"</copy>
    ```

    You should see an IP address printed, confirming the two containers can find each other on the shared network.

## Learn More

* [Oracle Database Free Container Image](https://container-registry.oracle.com)
* [Podman Documentation](https://docs.podman.io)
* [Oracle AI Vector Search Overview](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/overview-ai-vector-search.html)

## Acknowledgements
* **Author** - Oracle LiveLabs Team
* **Last Updated By/Date** - Oracle LiveLabs Team, February 2026
