# Title of the Lab

## Introduction

In this lab, you will use JupyterLab as your browser-based IDE to explore and modify the code behind the Zebra Sporting Goods demo. You will review how the app connects to Oracle Database 23ai, fine-tune the similarity search logic, and see how your changes affect the live app experience—all in real time. This hands-on exercise helps you understand the key components driving AI-powered product discovery and some fundamentals when using the Oracle Python driver.

Estimated Lab Time: 45 minutes

### About JupyterLabs
JupyterLab is a powerful, browser-based development environment that lets you write, run, and edit code interactively. It’s ideal for exploring data, testing logic, and experimenting with applications—all in one intuitive interface.

### Objectives

In this lab, you will:
* Use JupyterLab to explore the source code of the Zebra Sporting Goods demo application.
* Understand and improve the logic for connecting to Oracle Database 23ai.
* Modify and fine-tune the similarity search implementation, and observe the impact in the live demo.

This lab assumes you have:
* An Oracle Cloud account
* All previous labs successfully completed


## Task 1: Explore the application project

This task helps you to understand the structure of the Python application project. You will also learn how to use the JupyterLab interface.

1. Open the **Zebra Sporting Goods** application project in JupyterLab. Click on **simidemo** in the file browser. 

    ![open project](images/simidemo.png)

    The project contains the following files and folders which are typical for a Flask web application:

    simidemo/
    ├── app.py
    ├── requirements.txt
    ├── sql/
    ├── static/
    ├── templates/

    *  **app.py**: The main application file. It contains the code for connecting to Oracle Database and running queries.
    *  **requirements.txt**: A list of Python packages used by the application.
    *  **sql/** : The folder contains the SQL scripts used by the application.
    *  **static/** : The folder contains the static files, such as the product images used by the application.
    *  **templates/** : The folder contains the HTML templates used by the application.


## Acknowledgements
* **Author** - Kevin Lazarz, Senior Manager, Database Product Management
* **Last Updated By/Date** - Kevin Lazarz, June 2025
