# Code Property Graph using Graph Query Hackathon Challenge

## Introduction

**Welcome to the Code Property Graph using Graph Query Hackathon Challenge!**

In this lab, you will tackle an exciting developer coding challenge focused on **Graph**. Your goal is to enhance the existing application by implementing an update that will elevate its functionality. This is your opportunity to sharpen your skills and explore the power of Graph.

**Are you up for the challenge?**

If you're ready to dive in, proceed with this lab and start coding. If you prefer a more guided approach with a detailed walkthrough, you can continue to Lab 5b Step-by-step: Code Property Graph using Graph Query Hackathon Challenge for step-by-step instructions.

Good luck, and enjoy the process!

Estimated Time: 30 minutes

### Objectives
* Enhance your understanding of Graph by applying it to a real-world developer coding challenge.
* Gain hands-on experience with Graph and refining application features to meet specific development requirements.


### Prerequisites

This lab assumes you have:
* An Oracle Cloud account
* Successfully completed Lab 1: Run the Demo
* Successfully completed Lab 3: Connect to Development Environment

## Task 1: Hackathon Challenge

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
