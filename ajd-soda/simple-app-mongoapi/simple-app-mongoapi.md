# Python SODA micro-service with Autonomous Database for JSON

## Introduction

SODA for Python is a Python API that implements Simple Oracle Document Access (SODA). It is part of the Oracle Python driver, cx_Oracle — no additional installation is needed.

You can use SODA for Python to perform create, read (retrieve), update, and delete (CRUD) operations on documents of any kind, and you can use it to query JSON documents.

SODA is a set of NoSQL-style APIs that let you create and store collections of documents (in particular JSON) in Oracle Database, retrieve them, and query them, without needing to know Structured Query Language (SQL) or how the documents are stored in the database.

**Estimated Lab Time: 40 minutes**.

### Objectives

In this lab, you will:

* Develop a simple Python web service to manage JSON documents via REST calls
* Visualize the data using APEX

### Prerequisites

* Lab 1 - Infrastructure Configuration of this content completed


## Task 1: Develop micro-service with SODA for Python

Use SODA for Python on Oracle Autonomous JSON Database to develop a micro-service application that will allow you to insert and retrieve JSON documents using REST calls.

1. Access to **cloud shell** again. If you are not connected to **opc@devm**, **run** again the **ssh connections** using the **Public IP.** Replace <Public_IP> with your own one, removing < and > too. We copied the Public IP when we provisioned the compute instance few tasks back. Execute the following commands:

    ````
    <copy>
    ssh -i <private-key-file-name>.key opc@<Public_IP>
    </copy>
    ````

    ![ssh Connection](./images/task1/ssh.png)

2. Download the files that we will use for next steps in this bit.ly running this command:

    ````
    <copy>
    wget -O python-simple-project.zip https://bit.ly/3EekcqE
    </copy>
    ````

    ![wget Command](./images/task1/wget-command.png)

3. **Unzip** the **python-simple-project.zip** using the following command:

    ````
    <copy>
    unzip python-simple-project.zip
    </copy>
    ````

    ![unzip Apps](./images/task1/unzip-apps.png)

4. **Access** to python-simple-project folder. **Create** a Python virtual environment for development, and **activate** it. Run the following commands:

    ````
    <copy>
    cd python-simple-project
    pip3 install --user virtualenv
    virtualenv .
    . bin/activate
    </copy>
    ````

    ![Virtual Env Commands](./images/task1/virtualenv-command.png)

5. Lets have a look at **requirements.pip**. In this file, we have the libraries that we need for the micro-service application. Run the following command to see the code:

    ````
    <copy>
    cat requirements.pip
    </copy>
    ````

    ![cat Requirements](./images/task1/cat-requirements.png)

6. Use **pip package installer** for Python 3 to **install** the required libraries specified in the requirements.pip file.

    ````
    <copy>
    pip3 install -r requirements.pip
    </copy>
    ````

    ![Requirements](./images/task1/requirements.png)

7. Lets have a look at **simple-app.py**. In this file, we have the Python application code. Run the following command to see the code:

    ````
    <copy>
    cat simple-app.py
    </copy>
    ````

    ![cat simple-app](./images/task1/cat-simple-app.png)

8. **Verify** all connection **variables are correct**. We are using **demo** **user** for Autonomous JSON database and the **password** that we have recommended during the workshop **DBlearnPTS#22_**.

    > Note: If you have change the user name and password to a different value, please run this commands providing the user and password.
    >
    ````
    export AJSON_USER="demo"
    export AJSON_PASSWORD="DBlearnPTS#22_"
    export AJSON_SERVICE="ajdev_tp"
    ````

9. **After checking if all variables are correct**. **Run** simple-app application using the following command:

    ````
    <copy>
    nohup python3 simple-app.py > simple-app.log 2>&1 & echo $! > simple.pid
    </copy>
    ````

    We are executing the simple-app.py with **nohup function** for keep using the terminal for the following steps.
    
    At the same time, with this command, we are **creating a simple-app.log** where you can check how the python app is behaving.
    
    Additionally we are **creating a file, simple.pid,** to be capable of killing the python app to keep creating the second application for today’s content.

    ![simple-app Execution](./images/task1/simple-app-launch.png)

10. Lets see what **simple-app.py is doing**, use the following command:

    ````
    <copy>
    cat simple-app.log
    </copy>
    ````

    ![simple-app log](./images/task1/simple-app-log.png)

    If you followed the steps correctly, you should see this output in the cloud shell terminal. 

    **Your micro-service simple-app.py is being executed** so we can start inserting the documents.

11. **Copy** the following commands to perform **POST request with CURL client**. Make sure you press Enter after each one. First POST:

    ````
    <copy>
    curl --request POST \
            --url http://localhost:5000/oracle/ \
            --header 'content-type: application/json' \
            --data '{
        "company":"Company One",
        "address": {
            "street": "22 Rue du Grenier Saint-Lazare",
            "city": "Paris",
            "country": "France"
        },
        "industry":"Financial Services",
        "employees":54234
    }'
    </copy>
    ````

    ![POST company One curl](./images/task1/curl-company-one.png)

12. **Copy** the following commands to perform **POST request with CURL client**. Make sure you press Enter after each one. Second POST:

    ````
    <copy>
    curl --request POST \
            --url http://localhost:5000/oracle/ \
            --header 'content-type: application/json' \
            --data '{
        "company":"Company Two",
        "address": {
            "street": "Calle Extramuros 74",
            "city": "Madrid",
            "country": "Spain"
        },
        "industry":"Retail",
        "employees":12345
    }'
    </copy>
    ````

    ![POST company Two curl](./images/task1/curl-company-two.png)

13. **Copy** the following commands to perform **POST request with CURL client**. Make sure you press Enter after each one. Third and Fourth POST:

    ````
    <copy>
    curl --request POST \
            --url http://localhost:5000/oracle/ \
            --header 'content-type: application/json' \
            --data '{
        "company":"Company Three",
        "address": {
            "street": "3A Evergreen St, Ballyphehane",
            "city": "Cork",
            "country": "Ireland"
        },
        "industry":"Manufacturing",
        "employees":98765
    }'
    curl --request POST \
            --url http://localhost:5000/oracle/ \
            --header 'content-type: application/json' \
            --data '{
        "company":"Company Four",
        "address": {
            "street": "aleje Mikołaja Kopernika 32",
            "city": "Piotrków Trybunalski",
            "country": "Poland"
        },
        "industry":"Manufacturing",
        "employees":44444
    }'
    </copy>
    ````

    ![POST company Third and Fourth curl](./images/task1/curl-company-three-four.png)


14. Use the **web browser** on your laptop to navigate to your micro-service to list JSON documents inserted into Oracle Autonomous Database.

    http://[DEVM public-ip address]:5000/oracle/

    ![Microservice Company One, Two, Three & Four](./images/task1/microservice-company-one-two-three-four.png)

15. Go to **cloud shell terminal.** We will **stop simple-app.py** running the following command. 

    ````
    <copy>
    kill $(cat simple.pid)
    </copy>
    ````

    ![kill simple-app](./images/task1/simple-app-kill.png)

    
## Task 2: The Advantage of Apex and SQL Knowledge

1. Use the **web browser** tab where Oracle Application Express (Apex) is opened, or open Apex from AJDEV using the browser on your laptop. If you need to **Sign In** again use the following credentials:

    - Database User: 
    ```
    <copy>DEMO</copy>
    ```
    - Password:
    ```
    <copy>DBlearnPTS#22_</copy>
    ```
    - Workspace Name:
    ```
    <copy>DEMO</copy>
    ```

    Click **SQL Workshop** > **SQL Commands**. 

    ![Apex SQL Workshop](./images/task2/apex-sql-workshop.png)
    ![Apex SQL Commands](./images/task2/apex-sql-commands.png)

2. **Run** this SQL query:

    ````
    <copy>
    select TABLE_NAME from USER_TABLES;
    </copy>
    ````

    ![Select](./images/task2/select.png)

3. **Describe** the table that holds JSON documents data in the collection. The name of the column that stores JSON documents is JSON_DOCUMENT.

    ````
    <copy>
    desc "SimpleCollection"
    </copy>
    ````

    ![Desc](./images/task2/desc.png)

4. SQL dot-notation syntax is designed for easy queries to return JSON values from tables. **Run** a JSON dot-notation query.

    ````
    <copy>
    SELECT co.JSON_DOCUMENT.company, 
           co.JSON_DOCUMENT.address.country Country, 
           co.JSON_DOCUMENT.address.city City, 
           co.JSON_DOCUMENT.industry, 
           co.JSON_DOCUMENT.employees 
        FROM "SimpleCollection" co;
    </copy>
    ````

    ![Select JSON](./images/task2/select-json.png)

5. JSON data can be accessed via SQL from your applications. Click **App Builder** > **Create**. 
    
    ![New App](./images/task2/new-app.png)

6. Click **New Application**.

    ![New App Dashboard](./images/task2/new-app-dashboard.png)

7. Provide the following information:

    - Name: 
    ```
    <copy>Companies</copy>
    ```
    - Click **Add Page**
    
    ![Companies App](./images/task2/companies-app.png)

    -  **Interactive Report**

    ![Interactive Report](./images/task2/interactive-report.png)

    - Page Name: 
    ```
    <copy>Report</copy>
    ```
    - SQL Query:
    
    ````
    <copy>
    SELECT co.JSON_DOCUMENT.company, 
           co.JSON_DOCUMENT.address.country Country, 
           co.JSON_DOCUMENT.address.city City, 
           co.JSON_DOCUMENT.industry, 
           co.JSON_DOCUMENT.employees 
        FROM "SimpleCollection" co;
    </copy>
    ````
    - Click **Add Page**

    ![Interactive Report Query](./images/task2/interactive-report-query.png)
    
    - Click **Create Application**
    
    ![Create App](./images/task2/create-app.png)

    The application will be create immediatly.

    ![Creating App](./images/task2/creating-app.png)
        
8. Click **Run Application**. 

    ![Run App](./images/task2/run-app.png)

9. **Log In** to Companies using the following credentials:

    - Username:
    ```
    <copy>demo</copy>
    ```
    - Password:
    ```
    <copy>DBlearnPTS#22_</copy>
    ```

    ![Log In Companies](./images/task2/log-in-companies.png)

10. Click **Report**. 

    ![Report App](./images/task2/report-app.png)
    
    You can see the Four Companies that we have inserted on the previous Task.
    
    ![Report App Result](./images/task2/report-app-result.png)
    
    With Oracle Autonomous Database as a document store, JSON data is valued in the same way as relational data.

*You can proceed to the next lab…*

## Acknowledgements
* **Author** - Valentin Leonard Tabacaru, Database Product Management and Priscila Iruela, Technology Product Strategy Director
* **Contributors** - Victor Martin Alvarez, Technology Product Strategy Director
* **Last Updated By/Date** - Priscila Iruela, June 2022

## Need Help?
Please submit feedback or ask for help using our [LiveLabs Support Forum](https://community.oracle.com/tech/developers/categories/livelabsdiscussions). Please click the **Log In** button and login using your Oracle Account. Click the **Ask A Question** button to the left to start a *New Discussion* or *Ask a Question*.  Please include your workshop name and lab name.  You can also include screenshots and attach files.  Engage directly with the author of the workshop.

If you do not have an Oracle Account, click [here](https://profile.oracle.com/myprofile/account/create-account.jspx) to create one.