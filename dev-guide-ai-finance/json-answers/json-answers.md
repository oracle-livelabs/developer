# Code with JSON Duality Views step-by-step

## Introduction

This step-by-step guide will walk you through the necessary updates, providing solutions and insights to help you fully understand how to utilize JSON duality views in a practical scenario. 

At SeerEquites, the analytics department has flagged an issue with incorrect customer age data, affecting their reports and insights. To resolve this, loan officers are tasked with manually updating customer ages in the loan application, but currently, they cannot edit the age field. Fortunately, the system was designed with age fields already in the database, so the solution is to update the frontend of the loan application to allow officers to modify the age. Once this is implemented, the analytics department can benefit by using JSON Duality Views to run SQL queries on the updated data, even though it's stored as documents. This will allow the team to access accurate, up-to-date customer ages, improving their reporting and decision-making, while loan officers can ensure the data is correct.

Let’s dive in and unlock the full potential of JSON in your application!

Estimated Time: 15 minutes

### Objectives

In this lab, you will:

* Enhance your understanding of JSON duality views by applying it to a coding challenge.

* Gain hands-on experience with JSON duality views and refining application features to meet specific development requirements.

### Prerequisites

This lab assumes you have:
* An Oracle Cloud account
* Successfully completed Lab 1: Run the Demo
* Successfully completed Lab 3: Connect to Development Environment

## Task 1: Challenge Requirements 

**About Jason Duality Views**:

JSON Relational Duality is a landmark capability in Oracle Database 23ai, providing game-changing flexibility and simplicity for Oracle Database developers. This feature overcomes the historical challenges developers have faced when building applications using the relational or document models.

JSON Relational Duality helps to converge the benefits of both document and relational worlds. Developers now get the flexibility and data access benefits of the JSON document model, plus the storage efficiency and power of the relational model. The new feature enabling this functionality is JSON Relational Duality View

**Coding Requirements**:

This challenge consists of **three steps**: 

* First, update the frontend of the loan application to enable loan officers to view and modify customer ages. 
* Second, calculate the average age across the client base using the corrected information.
* Third, use JSON Duality Views to run SQL queries on the updated data.

## Task 2: Update application frontend 

* The company has requested an enhancement to the current customer data and would now like to see the parameter for **age** to be reflected. 

1. In the Customer.py file, find the 🔍 Customer Details Section at line 219
2. Update the section to include a new parameter for **age**.


## Task 2: Modify the Customers.py File

1. Click **Pages**.

    ![Click Pages](./images/click-pages.png " ")

2. Select **Customers.py**.

    ![Click Customers.py](./images/customers-py.png " ")

**Coding with JSON TRANSFORM**

The code below dynamically updates customer data in our **clients dv** (dv - stands for duality views) table by building a flexible  **JSON TRANSFORM** query based on a list of transformation statements. It constructs the query by joining those statements—like setting new field values—then applies them to the JSON data for a specific customer, identified by their ID, as long as a loan application exists."

3. Edit the Customer Details Section

    ![Click JSON Code edit](./images/json_hackaton.png " ")

 a. Copy the following code block and paste it at line 225 in the Customer.py file.

    ````python
         <copy>
        age = st.number_input("age", value=int(customer_data.get("age", 0)), step=1)
                    </copy>
    ````


 b. Copy the following code block and paste it at line 232 in the Customer.py file.

    ````python
         <copy>
        if age != int(customer_data.get("age", 0)): transform_statements.append("SET '$.age' = :age"); bind_vars['age'] = age                
        </copy>
    ````
## Task 3: Launch the Application

1. Open the terminal.

    ![Open Terminal](./images/open-terminal.png " ")

2. Copy the ./run.sh command and paste it into the terminal.

    ````bash
         $<copy>
         ./run.sh
         </copy>
    ````

3. Click the URL displayed in the terminal to launch the SeerEquities Loan Management application.

    ![Click the URL](./images/click-url.png " ")

4. Enter in a username and click **Login**.

    ![Login](./images/login.png " ")

## Task 4: View the Results

1. On the Dashboard page, from the pending review list, select the Customer ID for **James Woods**.

    ![Select James Woods](./images/james-woods.png " ")

2. This will display the customers loan application details. Select the **Customer Details** drop down menu and view the new age parameter at the bottom.

    ![James Wood AI generated recommendations](./images/james-woods-ai.png " ")

3. Note: the customer details tab has been updated to reflect the **age** parameter now for all customers.


**Congratulations, you have successfully completed the JSON Duality View Coding Exercise!**

## Learn More

* [Oracle Database 23ai Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Authors** - Linda Foinding, Francis Regalado
* **Contributors** - Kamryn Vinson, Otis Barr, Ramona Magadan, Eddie Ambler, Kevin Lazarz
* **Last Updated By/Date** - Linda Foinding, April 2025
