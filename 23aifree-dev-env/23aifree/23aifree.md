# Fast start! Build your first Oracle Database 23ai free container!

## Introduction

Now, that we have all tools installed and configured, it is time to set up our Data Engineering Home Lab using a Oracle Database 23ai free Container
In this lab, you will install you very first 23ai free in a container using the container image available on the [Oracle Container Registry](https://container-registry.oracle.com/).
We will keep it super-simple in the lab to get you acquainted with the commands and tools.

> **Note:** The instructions use podman. In case you are using Docker, you can replace podman with the docker command.

Estimated Time: 15 minutes

### Objectives

- Deploy Oracle Database 23ai in a container.
- Ensure the container is running and accessible

## Prerequisites:

- Open a terminal window and verify `podman` is available

To verify podman is working, type:

```bash
$ <copy>
podman -v
</copy>
```

> **Note:** In case you are using Docker the command is: `docker -v`

![verify podman](./images/verify-podman.png)

## Task 1: Let's set up a 23ai free container in 5 minutes*!

\* dependent on network connection & available resources... :-)

1. Open a terminal and run the following command. Don't worry about the parameters for now. For now, only pay attention to the the flag **-e ORACLE_PWD**. The value is our password for the sys and system user: 

    ```bash
    $ <copy>
    podman run --name 23ai -e ORACLE_PWD=Hello23ai -p 1521:1521 container-registry.oracle.com/database/free:latest
    </copy>
    ```

  This command will start downloading the container image from the Oracle Container Registry and it will also create a running container with 23ai free inside.
  Dependent on your network connection the download of the image may take some time. The actual build will take a few minutes too.
  Once the container is up and running, you will see a message in terminal windows DATABASE IS READY TO USE!

    ![verify podman](./images/database-ready.png)

  > Note: Do not close the terminal window as it will close the container. We will later see how to start a container in the background


## Task 2: Connect to database using VS Code and the Oracle SQL Developer extension

You’ve successfully deployed your first 23ai free container, and that wasn’t difficult at all! 

The next steps are similarly straightforward, but as a data engineer, you'll also want to connect to the database. 
There are several options available. 
Let’s begin with Visual Studio Code and the Oracle SQL Developer extension.


1. Open VS Code and select the **Oracle SQL Developer** icon in the sidebar:

    ![sql dev](./images/sqldev.png)


2. Create a **New Connection**

    ![new connection](./images/new-connection.png)

3. Fill in the connection details.

    - **Connection Name** 23ai free
    - **Username**: SYS
    - **Role**: SYSDBA
    - **Password**: Hello23ai
    - **Save Password**: enable
    - **Hostname**: localhost
    - **Port**: 1521
    - **Type**: Service Name
    - **Service Name**: freepdb1

    ![connect details](./images/connect-details.png)

4. Click **Test** to verify the connection to the database can be made

    ![test connect details](./images/test-connect.png)


5. Connect to the database. Click your newly created connection. 

    ![connect to db](./images/connect-to-db.png)

    You will see a small green plug once the database is connected.

6. Run your first query! Click on the Open SQL Worksheet icon (or right-click on your connection and select Open SQL Worksheet)

    ![new sheet](./images/connect-to-db.png)


7. Enter the following query in the SQL worksheet and hit the green play button on top of the worksheet or hit ctrl/cmd+enter:
   
   `SELECT * FROM V$VERSION;`

    ![first query](./images/first-query.png)


## Task  3: Clean up

Before we proceed to the next lab, let's clean up a few things:

1. Change back to the terminal and hit ctrl+c. This will gracefully stop your container

2. After the container is stopped, run the following command to remove the container from your system:

```bash
$ <copy>
podman rm 23ai
</copy>
```

> **Note:** This command will only remove the container (in other words the database server). It will not remove the image to build the container.

## Conclusion
You successfully installed 23ai free in a container and you successfully connected to the database using VS Code and ran your first query. Congratulations!

Upwards & onwards to the next lab.

## Acknowledgements
* **Author** - Kevin Lazarz, Database Product Management
* **Last Updated By/Date** - Kevin Lazarz, December 2024
