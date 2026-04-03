# Lab 2: Install and Connect Oracle AI Database

## Introduction

In this lab, you will provision the local Oracle AI Database environment that powers the rest of the workshop. By the end of the lab, your Jupyter session will connect to Oracle AI Database Free, and the workshop user will have the privileges required to create relational, vector, and graph objects.

This lab sets the foundation for everything that follows. The retrieval, RAG, and memory sections all depend on a working Oracle environment with stable connection details.

Estimated Time: 25 minutes

### Objectives

In this lab, you will:

- start Oracle AI Database Free locally in Docker
- verify the Python environment can connect to `FREEPDB1`
- grant property graph privileges required by the graph sections
- fix the listener if host connections fail

### Prerequisites

This lab assumes you have:

- Docker Desktop or Docker Engine installed and running
- a terminal on the same host as your Jupyter environment, or a network path from Jupyter to the database host

## Task 1: Start Oracle AI Database Free

This task starts the local Oracle engine that will hold the paper corpus, vector embeddings, graph objects, and memory tables used later. Oracle runs in Docker so you can build the full workflow on one machine.

1. Open a terminal and start the Oracle Database Free container used by the workshop:

    ```bash
    <copy>
    docker run -d \
      --name oracle-full \
      -p 1521:1521 -p 5500:5500 \
      -e ORACLE_PWD=YourStrongPassword \
      -e ORACLE_SID=FREE \
      -e ORACLE_PDB=FREEPDB1 \
      -v ~/oracle/full_data:/opt/oracle/oradata \
      container-registry.oracle.com/database/free:latest
    </copy>
    ```

2. Wait a few minutes for the database to finish starting.

    The first startup takes longer because Oracle must initialize the data files inside the mounted volume.

3. Confirm that the container is running:

    ```bash
    <copy>
    docker ps --filter name=oracle-full
    </copy>
    ```

## Task 2: Connect the Python Environment to Oracle

This task proves that Python and Oracle can talk to each other. You will validate the DSN, the database user, and the property graph privileges before you create schema objects.

1. Open the workshop notebook and move to the database connection section in Part 1.

2. Run the connection helper code that opens an Oracle connection and validates the database banner.

3. Confirm the connection details match the local container:

    - user: `VECTOR`
    - password: `VectorPwd_2025`
    - DSN: `localhost:1521/FREEPDB1`

4. Run the privilege helper so the later graph sections can create the SQL Property Graph:

    ```python
    <copy>
    ensure_property_graph_privileges()
    conn = connect_to_oracle()
    </copy>
    ```

5. Verify that the environment prints a successful Oracle banner before you continue.

6. Do not move on until you can connect repeatedly without errors.

## Task 3: Fix the Listener If Host Connections Fail

This task handles the most common local setup failure. When the Oracle listener binds to the wrong host inside the container, Jupyter cannot connect from the host machine. The fix below forces the listener to accept host connections and re-register the database service.

1. If the Python environment shows connection errors such as `DPY-6005`, `DPY-4011`, or `TNS-12545`, patch the Docker listener exactly as shown below:

    ```bash
    <copy>
    docker exec -it oracle-full bash -lc '
      export ORACLE_HOME=${ORACLE_HOME:-/opt/oracle/product/26ai/dbhomeFree}
      export PATH=$ORACLE_HOME/bin:$PATH
      LISTENER_ORA="$ORACLE_HOME/network/admin/listener.ora"

      sed -i "s/(HOST *= *[^)]*)/(HOST = 0.0.0.0)/" "$LISTENER_ORA"
      lsnrctl stop || true
      lsnrctl start
      echo "ALTER SYSTEM REGISTER;" | sqlplus -s / as sysdba
      lsnrctl status | sed -n "1,20p"
    '
    </copy>
    ```

2. Return to Jupyter and rerun the connection helper code.

3. Do not continue until the notebook can connect successfully.

## Task 4: Record the Environment Assumptions

This task keeps the rest of the workshop predictable. The later code examples assume specific container, user, and pluggable database names, so lock those down now instead of troubleshooting mismatches later.

1. Keep these values consistent for the rest of the workshop:

    - Oracle container name: `oracle-full`
    - pluggable database: `FREEPDB1`
    - notebook schema user: `VECTOR`

2. If you choose different values in your environment, update the connection code and any later helper functions before moving on.

## Learn More

- [Oracle AI Database Free](https://www.oracle.com/database/free/get-started/)

## Acknowledgements

* **Author** - Richmond Alake
* **Contributor** - Linda Foinding
* **Last Updated By/Date** - Linda Foinding, April 2026
