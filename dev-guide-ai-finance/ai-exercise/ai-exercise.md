# Code RAG using AI Vector Search Hackathon Challenge

## Introduction

**Welcome to the Code RAG using AI Vector Search Hackathon Challenge!**

In this lab, you will tackle an exciting developer coding challenge focused on **AI Vector Search**. Your goal is to enhance the existing application by implementing an update that will elevate its functionality. This is your opportunity to sharpen your skills and explore the power of AI-driven search.

**Are you up for the challenge?**

If you're ready to dive in, proceed with this lab and start coding. If you prefer a more guided approach with a detailed walkthrough, you can continue to Lab 4b Step-by-step: Code RAG using AI Vector Search Hackathon Challenge for step-by-step instructions.

Good luck, and enjoy the process!

Estimated Time: 30 minutes


### Objectives
In this lab, you will:
* Enhance your understanding of AI Vector Search by applying it to a real-world developer coding challenge.
* Gain hands-on experience with integrating AI Vector Search and refining application features to meet specific development requirements.


### Prerequisites

This lab assumes you have:
* An Oracle Cloud account
* Successfully completed Lab 1: Workshop Details and Prerequisites
* Successfully completed Lab 2: SeerEquities AI App in Action
   

## Task 1: Hackathon Challenge

The company has requested an enhancement to the current loan recommendation system. The loan officer has indicated that the existing 3 loan options are insufficient, and they'd like to see the top 5 loan options instead.

1. Update the Customers.py and Decision.py files to make the necessary changes in the code so that the AI prompt returns the top 5 loans instead of the current 3.

2. Ensure the output displays the top 5 loans as shown in the image below: 

    ![AI Developer Coding Exercise](./images/ai-exercise.png " ")

## Task 2: Login to Jupiter Notebook

1. To navigate to the development environment, click **View Login Info**. Copy the Development IDE Login Password. Click the Start Development IDE link.

    ![Open Development Environment](./images/dev-env.png " ")

2. Paste in the Development IDE Login Password that you copied in the previous step. Click **Login**.

    ![Login](./images/jupyter-login.png " ")

## Task 3: Modify the Required Files

In this task, we will show you how to access the files needed to complete the challenge. 

1. Click **Pages**.

    ![Click Pages](./images/click-pages.png " ")

2. Select the **Customers.py** file.

    ![Click Customers.py](./images/customers-py.png " ")

3. After making the necessary changes in the Customers.py file so that the AI prompt returns the top 5 loans instead of the current 3, you will need to save the file before opening the Decision.py file.

    ![Save Customers.py](./images/save-customers-py.png " ")

4. Select the **Decision.py** file.

    ![Click Decision.py](./images/decision-py.png " ")

5. After making the necessary changes in the Decision.py file so that the AI prompt returns the top 5 loans instead of the current 3, you will need to save the file.

    ![Save Decision.py](./images/save-decision-py.png " ")

## Task 4: Launch the Application

In this task, we will show you how to launch the application.

1. Select the **Launcher** tab and open the **terminal**. 

    ![Open Terminal](./images/open-terminal.png " ")

2. Copy the ./run.sh command and paste it into the terminal.

    ````
    <copy>
    ./run.sh
    </copy>
    ````

3. Click the URL displayed in the terminal to launch the SeerEquities Loan Management application.

    ![Click the URL](./images/click-url.png " ")

4. Enter in a username and click **Login**.

    ![Login](./images/login.png " ")

## Task 5: View the Results

In this task, we will show you how to view the changes you made in the application.

1. On the Dashboard page, from the pending review list, select the Customer ID for **James Smith**.

    ![Select James Smith](./images/james-smith.png " ")

2. This will display the customers loan application details. In approximately 15 seconds, the 5 AI generated loan recommendations will be displayed.

    ![James Smith AI generated recommendations](./images/james-smith-5-ai.png " ")

## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Author** - <Name, Title, Group>
* **Contributors** -  <Name, Group> -- optional
* **Last Updated By/Date** - <Name, Month Year>
