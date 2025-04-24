# Code with Property Graph

## Introduction

**Welcome to the Code Property Graph Challenge!**

In this lab, you’ll dive into a coding challenge focused on Graph to enhance the SeerEquites Loan Management application.

At SeerEquities, loan officers are always looking for ways to improve their decision-making processes.

A loan officer has been tasked with evaluating a client’s eligibility for a mortgage. She needs to consider a number of factors, including the client’s credit score and their debt-to-income ratio. However, she often finds herself manually cross-referencing multiple charts and data tables to understand how these two factors interact, which is both time-consuming and prone to error.

Her manager suggests that adding a graph to the decision page would make the process far more efficient. The graph would map loan options based on credit score on one axis and debt-to-income ratio on the other, allowing the loan officer to quickly see which loans are available for the client at a glance. This addition would save time, reduce complexity, and make it easier to identify the best loan options based on the client’s unique financial situation.

The loan officers at SeerEquities believe that this new graph will not only speed up their decision-making but also improve accuracy and clarity when presenting loan options to clients.

This is your opportunity to sharpen your skills with Oracle Graph and help create a solution that truly improves the way loan officers make decisions.

**Are you up for the challenge?**

If you're ready to dive in, proceed with this lab and start coding. If you prefer a more guided approach with a detailed walkthrough, you can continue to Lab 6b Step-by-step: Code Property Graph for step-by-step instructions.

Good luck, and enjoy the process!

Estimated Time: 30 minutes

### Objectives
* Enhance your understanding of Graph by applying it to a developer coding challenge.
* Gain hands-on experience with Graph and refining application features to meet specific development requirements.


### Prerequisites

This lab assumes you have:
* An Oracle Cloud account
* Successfully completed Lab 1: Run the Demo
* Successfully completed Lab 3: Connect to Development Environment

## Task 1: Challenge Requirements 

**About Property Graph**

In Oracle Database 23ai we can create property graphs inside the database. These property graphs allow us to map the vertices and edges to new or existing tables, external tables, materialized views or synonyms to these objects inside the database. The property graphs are stored as metadata inside the database meaning they don't store the actual data. Rather, the data is still stored in the underlying objects and we use the SQL/PQG syntax to interact with the property graphs.

Property graphs make the process of working with interconnected data, like identifying influencers in a social network, predicting trends and customer behavior, discovering relationships based on pattern matching and more by providing a more natural and efficient way to model and query them.

**Coding Requirement**

The loan officer is requesting an additional graph to be added to the decision page to visualize additional loan options based on credit score and debt-to-income ratio. Specifically, they want to display an additional graph that shows loan options based on two key metrics: required credit score on one axis and debt-to-income ratio on the other.

1. Update the Decision.py file to add functionality for an additional graph that displays the following metrics: Required Credit Score and Debt-to-Income Ratio (%). The graph should display scatter plots similar to the example provided below, Required Credit Score and Debt-to-Income Ratio (%) are plotted:

    ![Graph Coding Exercise](./images/graph-exercise.png " ")

2. Implement a dropdown that allows the user to select the new graph view.

    ![Graph Coding Exercise](./images/graph-dropdown.png " ")

## Task 2: Modify the Required File

In this task, we will show you how to access the file needed to complete the challenge.

1. Click **Pages**.

    ![Click Pages](./images/click-pages.png " ")

2. Select the **Decision.py** file.

    ![Click Decision.py](./images/decision-py.png " ")

3. After making the necessary changes in the Decision.py file to create an additional graph that displays the following metrics: Required Credit Score and Debt-to-Income Ratio (%), you will need to save the file.

    ![Save Decision.py](./images/save-decision-py.png " ")

## Task 3: Launch the Application

In this task, we will show you how to launch the application.

1. Select the **Launcher** tab and open the **terminal**.

    ![Open Terminal](./images/open-terminal.png " ")

2. Copy the ./run.sh command and paste it into the terminal.

    ````bash
        <copy>
        ./run.sh
        </copy>
    ````

3. Click the URL displayed in the terminal to launch the SeerEquities Loan Management application.

    ![Click the URL](./images/click-url.png " ")

4. Enter in a username and click **Login**.

    ![Login](./images/login.png " ")

## Task 4: View the Results

In this task, we will show you how to view the changes you made in the application.

1. On the Dashboard page, from the pending review list, select the Customer ID for **James Woods**.

    ![Select James Woods](./images/james-woods.png " ")

2. This will display the customers loan application details. In approximately 15 seconds, the AI generated loan recommendations will be displayed. Click the **Navigate To Decisions** button.

    ![James Woods Decision](./images/james-woods-decision.png " ")

3. Expand the drop down to view the newly added graph.

    ![James Smith graph](./images/james-woods-graph.png " ")

## Learn More

* [Oracle Database 23ai Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Author** - Kamryn Vinson
* **Contributors** -  Linda Foinding, Francis Regalado, Eddie Ambler, Kevin Lazarz
* **Last Updated By/Date** - Kamryn Vinson, April 2025
