# SeerEquities AI App in Action

## Introduction

In this lab, you will step into the role of a loan officer using a next-generation loan approval application powered by Oracle Database 23ai. You will work with real loan applications and see how Generative AI, Vector Search, and Graph analytics replace manual review with faster, AI-driven decision-making.

Estimated Lab Time: 45 minutes

### Objectives

In this lab, you will:
* Walk through a demo of the SeerEquities Loan Approval application as a loan officer persona
* Explore the challenges associated with loan approval processing time and learn how the SeerEquities Loan Management app reduces processing and approval time by over 80%!

### Prerequisites

This lab assumes you have:
* Completed the Get Started lab
* Successfully launched the demo environment

## Task 1: Launch the Application

1. To access the demo environment, click **View Login Info** in the top left corner of the page. Click the Start the Demo link.

    ![Click the Start Demo Link](./images/start-demo.png " ")

2. Enter in a username and click **Login**.

    ![Login](./images/login.png " ")

3. Welcome to the SeerEquities Loan Management application! Congratulations, you are now connected to the demo environment. You can now execute the different tasks for this Lab.

    ![Homepage](./images/app-home.png " ")

## Task 2: Demo User Approved

In this first example, we'll navigate through this application to show you the first user being approved with good credit.

1. On the Dashboard page, from the pending review list, select the Customer ID for **James Smith**.

    ![Select James Smith](./images/james-smith.png " ")

3. This will display the customers loan application details. In approximately 15 seconds, the AI generated recommendations will be displayed.

    ![James Smith AI generated recommendations](./images/james-smith-ai.png " ")

4. Copy the following prompt into the AI chatbot and press Enter.

    ```text
    <copy>
    What would be the top 0% down payment loans?
    </copy>
    ```
    
    ![James Smith chatbot](./images/james-smith-chatbot.png " ")

5. Select the **Navigate To Decisions** button.

    ![James Smith Decision](./images/james-smith-decision.png " ")

6. In the **Select Final Approved Loan Option** section, the graph options using Oracle 23ai Property Graph are displayed. This is where the loan officer could choose to request additional information in order to provide a slightly better loan. For this scenario, we will continue with selecting one of the suggested loans.

    ![James Smith Select Final Approved Loan](./images/james-smith-select-final-loan.png " ")

7. Select the AI suggested loan that displays the military veteran loan with the shortest time to close. In our case, we are shown one military veteran loan. We will select loan 26 in our case.

    ![James Smith Select Loan 3](./images/james-smith-select-loan.png " ")

8. Set the final loan status to **Approved**. Click the **Save Final Approval & Loan Status** button.

    The loan status has been updated to 'Approved' and saved to the customer profile.

    ![James Smith Save Loan Status](./images/james-smith-save.png " ")

9. Click the **Generate Decision as PDF** button.

    ![James Smith Download Recommendation](./images/james-smith-download.png " ")

10. Click **Download PDF**

    ![James Smith Download PDF](./images/james-smith-download-pdf.png " ")

11. Display the message the customer would see by opening the downloaded PDF.

    ![Open James Smith PDF](./images/open-james-smith-pdf.png " ")

12. Click the **Return to Dashboard** button to navigate back to the Dashboard.

    ![Return to Dashboard](./images/james-return-dashboard.png " ")

13. Expand **View Approved Customers**. We can see that James Smith has been removed from the Pending Review Loan Requests list and has been added to the Approved Loan Requests list.

    ![James Smith Approved List](./images/james-smith-approved-list.png " ")

## Task 3: Demo User Denied

1. On the Dashboard page, from the pending review list, select the Customer ID for **James Woods**.

    ![Select James Woods](./images/james-woods.png " ")

2. This will display the customers loan application details. In approximately 15 seconds, the AI generated recommendations will be displayed.

    ![James Woods AI generated recommendations](./images/james-woods-ai.png " ")

3. Select the **Navigate to Decisions** button.

    ![James Woods Decision](./images/james-woods-decision.png " ")

4. The loan status is set to **Denied**. Click the **Save Final Approval & Loan Status** button.

    The loan status has been updated to 'Denied' and saved to the customer profile.

    ![James Woods Save Loan Status](./images/james-woods-save.png " ")

5. Press the **Generate Decision as PDF** button to save the AI responses and proceed to the final loan disposition.

    ![James Woods PDF](./images/james-woods-pdf.png " ")

6. Click the **Download PDF** button.

    ![James Woods Download Recommendation](./images/james-woods-download.png " ")

7. Display the message the customer would see by opening the downloaded PDF.

    ![Open James Woods PDF](./images/open-james-woods-pdf.png " ")

8. Click the **Return to Dashboard** button to navigate back to the Dashboard.

    ![Return to Dashboard](./images/woods-return-dashboard.png " ")

9. Expand **View Denied Customers**. We can see that James Woods has been removed from the Pending Review Loan Requests list and added to the Denied Loan Requests list.

    ![James Woods Denied List](./images/james-woods-denied-list.png " ")

## Task 4: Demo Opportunity Zone User

1. On the Dashboard page, from the pending review list, select the Customer ID for **Evan Burton**.

    ![Select Evan Burton](./images/evan-burton.png " ")

2. This will display the customers loan application details. In approximately 15 seconds, the AI generated recommendations will be displayed.

    ![Evan Burton AI generated recommendations](./images/evan-burton-ai.png " ")

3. Select the **Navigate To Decisions** button.

    ![Evan Burton Decision](./images/evan-burton-decision.png " ")


4. In the **Select Final Approved Loan Option** section, the graph options using Oracle 23ai Property Graph are displayed. This is where the loan officer could choose to request additional information in order to provide a slightly better loan. For this scenario, we will continue with selecting one of the suggested loans.

    ![Evan Burton Select Final Approved Loan](./images/evan-burton-select-final-loan.png " ")


5. Select the AI suggested opportunity zone loan with the lowest time to close. In our case, we would select loan number 49.

    ![Evan Burton Select Loan 1](./images/evan-burton-select-loan.png " ")

7. Set the final loan status to **Approved**.

    ![Evan Burton Approved](./images/evan-burton-approve.png " ")

8. Click the **Save Final Approval & Loan Status** button.

    The loan status has been updated to 'Approved' and saved to the customer profile.

    ![Evan Burton Save Loan Status](./images/evan-burton-save.png " ")

9. Click the **Generate Decision as PDF** button.

    ![Evan Burton Download Recommendation](./images/evan-burton-download.png " ")

10. Click **Download PDF**

    ![Evan Burton Download PDF](./images/evan-burton-download-pdf.png " ")

11. Display the message the customer would see by opening the downloaded PDF.

    ![Open Evan Burton PDF](./images/open-evan-burton-pdf.png " ")

12. Click the **Return to Dashboard** button to navigate back to the Dashboard.

    ![Return to Dashboard](./images/evan-return-dashboard.png " ")

13. Expand **View Approved Customers**. We can see that Evan Burton has been removed from the Pending Review Loan Requests list and has been added to the Approved Loan Requests list.

    ![Evan Burton Approved List](./images/evan-burton-approved-list.png " ")

## Task 5: Demo First Time Home Buyer

1. On the Dashboard page, from the pending review list, select the Customer ID for **Alex Anderson**.

    ![Select Alex Anderson](./images/alex-anderson.png " ")

2. This will display the customers loan application details. In approximately 15 seconds, the AI generated recommendations will be displayed.

    ![Alex Anderson AI generated recommendations](./images/alex-anderson-ai.png " ")

3. Copy the following prompt into the AI chatbot to see the lowest down payment. Press Enter.

    ```text
    <copy>
    Show me the lowest down payment.
    </copy>
    ```
    ![Alex Anderson chatbot](./images/alex-anderson-chatbot1.png " ")

    Copy the following prompt into the AI chatbot to see the lowest monthly payment. Press Enter.

    ```text
    <copy>
    Show me the lowest monthly payment.
    </copy>
    ```
    ![Alex Anderson chatbot](./images/alex-anderson-chatbot2.png " ")

4. Select the **Navigate to Decisions** button.

    ![Alex Anderson Decision](./images/alex-anderson-decision.png " ")

5. In the **Select Final Approved Loan Option** section, the graph options using Oracle 23ai Property Graph are displayed. This is where the loan officer could choose to request additional information in order to provide a slightly better loan. For this scenario, we will continue with selecting one of the suggested loans.

    ![Michael Ramon Select Final Approved Loan](./images/alex-anderson-select-final-loan.png " ")

6. Since the AI suggested the first time home owner loan with the lowest monthly payment, we would select loan number 27. This loan is the most suitable option for Michael given his financial profile and loan eligibility.

    ![Alex Anderson Select Loan 1](./images/alex-anderson-select-loan.png " ")

7. Set the final loan status to **Approved**.

    ![Alex Anderson Approved](./images/alex-anderson-approve.png " ")

8. Click the **Save Final Approval & Loan Status** button.

    The loan status has been updated to 'Approved' and saved to the customer profile.

    ![Alex Anderson Save Loan Status](./images/alex-anderson-save.png " ")

9. Click the **Generate Decision as PDF** button.

    ![Alex Anderson Download Recommendation](./images/alex-anderson-download.png " ")

10. Click **Download PDF**

    ![Alex Anderson Download PDF](./images/alex-anderson-download-pdf.png " ")

11. Display the message the customer would see by opening the downloaded PDF.

    ![Open Alex Anderson PDF](./images/open-alex-anderson-pdf.png " ")

12. Click the **Return to Dashboard** button to navigate back to the Dashboard.

    ![Return to Dashboard](./images/alex-anderson-dashboard.png " ")

13. Expand **View Approved Customers**. We can see that Alex Anderson has been removed from the Pending Review Loan Requests list and has been added to the Approved Loan Requests list.

    ![Alex Anderson Approved List](./images/alex-anderson-approved-list.png " ")

## Task 6: Edit Customer Details
For this task, we will edit a customers details.

1. On the Dashboard page, expand **View Denied Customers**. From the Denied Loan Requests list, select the customer ID for **James Woods**.

    ![Select James Woods](./images/select-james-woods-denied.png " ")

2. On the Customer Details page, expand **Customer Details**.

    ![Expand Customer Details](./images/customer-details.png " ")

3. Let's change James' loan status from Denied back to **Pending Review**.

    ![Edit Customer Details](./images/pending-review.png " ")

4. Click **Save Customer Details**.

    ![Save Customer Details](./images/save-details.png " ")

5. Scroll down to the bottom of the page and click the **Return to Dashboard** button.

    ![Click Dashboard](./images/click-dashboard.png " ")

6. We can see that James Woods has been removed from the Denied Loan Requests list and has been added back to the Pending Review Loan Requests list.

    ![James Woods Pending Review List](./images/james-woods-pending-review-list.png " ")

## Learn More

* [Oracle Database 23ai Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Authors** - Linda Foinding, Francis Regalado
* **Contributors** - Kamryn Vinson, Eddie Ambler, Kevin Lazarz
* **Last Updated By/Date** - Linda Foinding, April 2025