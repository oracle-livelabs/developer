# Hands On How-To’s

## Introduction

This lab guides you through spinning up and navigating a GenAI-powered loan approval application, designed to streamline the loan processing workflow and significantly reduce the time-consuming paperwork that currently takes months for Loan Officers to handle.

Estimated Lab Time: 30 minutes

### Objectives

In this lab, you will:
* Begin the demo process of the hands_on loan officer approval use cases

### Prerequisites

This lab assumes you have:
* Completed the Get Started lab
* Successfully launched the demo environment

## Task 1: Demo User with Good Credit

In this first example, we'll navigate through this application to show you the first user being approved with good credit.

1. Select **Dashboard** in the left navigation menu.

    ![Select Dashboard](./images/select-dashboard.png " ")

2. On the Dashboard page, from the pending review list, select the Customer ID for **James Smith**.

    ![Select James Smith](./images/james-smith.png " ")

3. This will display the customers loan application details. In approximately 15 seconds, the AI generated recommendations will be displayed.

    ![James Smith AI generated recommendations](./images/james-smith-ai.png " ")

4. Copy the following prompt into the AI chatbot and press Enter.

    ```
    <copy>
    What would be the top 0% down payment loans?
    </copy>
    ```
    ![James Smith chatbot](./images/james-smith-chatbot.png " ")

5. Press the **Generate Finalized Decision PDF** button to save the AI responses and proceed to the final loan disposition.

    ![James Smith PDF](./images/james-smith-pdf.png " ")

6. Select **Decision** in the left navigation menu.

    ![James Smith Decision](./images/james-smith-decision.png " ")

7. In the **Select Final Approved Loan Option** section, the graph options using Oracle 23ai Property Graph are displayed. This is where the loan officer could choose to request additional information in order to provide a slightly better loan. For this scenario, we will continue with selecting one of the suggested loans.

    ![James Smith Select Final Approved Loan](./images/james-smith-select-final-loan.png " ")

8. Select the AI suggested loan with the lowest time to close. Since our customer wanted the lowest time to close, we would select loan number 3.

    ![James Smith Select Loan 3](./images/james-smith-select-loan.png " ")

9. Set the final loan status to **Approved**.

    ![James Smith Approved](./images/james-smith-approve.png " ")

10. Click the **Save Final Approval & Loan Status** button.

    The loan status has been updated to 'Approved' and saved to the customer profile.

    ![James Smith Save Loan Status](./images/james-smith-save.png " ")

11. Click the **Download Recommendation as PDF** button.

    ![James Smith Download Recommendation](./images/james-smith-download.png " ")

12. Click **Download PDF**

    ![James Smith Download PDF](./images/james-smith-download-pdf.png " ")

13. Display the message the customer would see by opening the downloaded PDF.

    ![Open James Smith PDF](./images/open-james-smith-pdf.png " ")

14. Navigate back to the **Dashboard** and expand **View Approved Customers**. We can see that James Smith has been removed from the Pending Review Loan Requests list and has been added to the Approved Loan Requests list.

    ![James Smith Approved List](./images/james-smith-approved-list.png " ")

## Task 2: Demo User with Bad Credit

1. Select **Dashboard** in the left navigation menu if you are not on the Dashboard page already.

    ![Select Dashboard](./images/select-dashboard.png " ")

2. On the Dashboard page, from the pending review list, select the Customer ID for **James Woods**.

    ![Select James Woods](./images/james-woods.png " ")

3. This will display the customers loan application details. In approximately 15 seconds, the AI generated recommendations will be displayed.

    ![James Woods AI generated recommendations](./images/james-woods-ai.png " ")

4. Press the **Generate Finalized Decision PDF** button to save the AI responses and proceed to the final loan disposition.

    ![James Woods PDF](./images/james-woods-pdf.png " ")

5. Select **Decision** in the left navigation menu.

    ![James Woods Decision](./images/james-woods-decision.png " ")

6. Click the **Save Final Approval & Loan Status** button.

    The loan status has been updated to 'Denied' and saved to the customer profile.

    ![James Woods Save Loan Status](./images/james-woods-save.png " ")

7. Click the **Download Recommendation as PDF** button.

    ![James Woods Download Recommendation](./images/james-woods-download.png " ")

8. Click **Download PDF**

    ![James Woods Download PDF](./images/james-woods-download-pdf.png " ")

9. Display the message the customer would see by opening the downloaded PDF.

    ![Opem James Woods PDF](./images/open-james-woods-pdf.png " ")

10. Navigate back to the **Dashboard** and expand **View Denied Customers**. We can see that James Woods has been removed from the Pending Review Loan Requests list and added to the Denied Loan Requests list.

    ![James Woods Denied List](./images/james-woods-denied-list.png " ")


## Task 3: Opportunity Zone User with Low Income Good Credit

1. Select **Dashboard** in the left navigation menu if you are not on the Dashboard page already.

    ![Select Dashboard](./images/select-dashboard.png " ")

2. On the Dashboard page, from the pending review list, select the Customer ID for **Evan Burton**.

    ![Select Evan Burton](./images/evan-burton.png " ")

3. This will display the customers loan application details. In approximately 15 seconds, the AI generated recommendations will be displayed.

    ![Evan Burton AI generated recommendations](./images/evan-burton-ai.png " ")

4. Press the **Generate Finalized Decision PDF** button to save the AI responses and proceed to the final loan disposition.

    ![Evan Burton PDF](./images/evan-burton-pdf.png " ")

5. Select **Decision** in the left navigation menu.

    ![Evan Burton Decision](./images/evan-burton-decision.png " ")

6. In the **Select Final Approved Loan Option** section, the graph options using Oracle 23ai Property Graph are displayed. This is where the loan officer could choose to request additional information in order to provide a slightly better loan. For this scenario, we will continue with selecting one of the suggested loans.

    ![Evan Burton Select Final Approved Loan](./images/evan-burton-select-final-loan.png " ")


7. Select the AI suggested opportunity zone loan with the lowest time to close. In our case, we would select loan number 1.

    ![Evan Burton Select Loan 1](./images/evan-burton-select-loan.png " ")

8. Set the final loan status to **Approved**.

    ![Evan Burton Approved](./images/evan-burton-approve.png " ")

9. Click the **Save Final Approval & Loan Status** button.

    The loan status has been updated to 'Approved' and saved to the customer profile.

    ![Evan Burton Save Loan Status](./images/evan-burton-save.png " ")

10. Click the **Download Recommendation as PDF** button.

    ![Evan Burton Download Recommendation](./images/evan-burton-download.png " ")

11. Click **Download PDF**

    ![Evan Burton Download PDF](./images/evan-burton-download-pdf.png " ")

12. Display the message the customer would see by opening the downloaded PDF.

    ![Open Evan Burton PDF](./images/open-evan-burton-pdf.png " ")

13. Navigate back to the **Dashboard** and expand **View Approved Customers**. We can see that Evan Burton has been removed from the Pending Review Loan Requests list and has been added to the Approved Loan Requests list.

    ![Evan Burton Approved List](./images/evan-burton-approved-list.png " ")

## Task 4: First Time Home Buyer Good Credit

1. Select **Dashboard** in the left navigation menu if you are not on the Dashboard page already.

    ![Select Dashboard](./images/select-dashboard.png " ")

2. On the Dashboard page, from the pending review list, select the Customer ID for **Alex Anderson**.

    ![Select Alex Anderson](./images/alex-anderson.png " ")

3. This will display the customers loan application details. In approximately 15 seconds, the AI generated recommendations will be displayed.

    ![Alex Anderson AI generated recommendations](./images/alex-anderson-ai.png " ")

4. Copy the following prompt into the AI chatbot to see the lowest down payment. Press Enter.

    ```
    <copy>
    Show me the lowest down payment.
    </copy>
    ```
    ![Alex Anderson chatbot](./images/alex-anderson-chatbot1.png " ")

    Copy the following prompt into the AI chatbot to see the lowest monthly payment. Press Enter.
    ```
    <copy>
    Show me the lowest monthly payment.
    </copy>
    ```
    ![Alex Anderson chatbot](./images/alex-anderson-chatbot2.png " ")

5. Press the **Generate Finalized Decision PDF** button to save the AI responses and proceed to the final loan disposition.

    ![Alex Anderson PDF](./images/alex-anderson-pdf.png " ")

6. Select **Decision** in the left navigation menu.

    ![Alex Anderson Decision](./images/alex-anderson-decision.png " ")

6. In the **Select Final Approved Loan Option** section, the graph options using Oracle 23ai Property Graph are displayed. This is where the loan officer could choose to request additional information in order to provide a slightly better loan. For this scenario, we will continue with selecting one of the suggested loans.

    ![Michael Ramon Select Final Approved Loan](./images/alex-anderson-select-final-loan.png " ")

8. Since the AI suggested the first time home owner loan with the lowest monthly payment, we would select loan number 1. This loan is the most suitable option for Michael given his financial profile and loan eligibility.

    ![Alex Anderson Select Loan 1](./images/alex-anderson-select-loan.png " ")

9. Set the final loan status to **Approved**.

    ![Alex Anderson Approved](./images/alex-anderson-approve.png " ")

9. Click the **Save Final Approval & Loan Status** button.

    The loan status has been updated to 'Approved' and saved to the customer profile.

    ![Alex Anderson Save Loan Status](./images/alex-anderson-save.png " ")

10. Click the **Download Recommendation as PDF** button.

    ![Alex Anderson Download Recommendation](./images/alex-anderson-download.png " ")

11. Click **Download PDF**

    ![Alex Anderson Download PDF](./images/alex-anderson-download-pdf.png " ")

12. Display the message the customer would see by opening the downloaded PDF.

    ![Open Alex Anderson PDF](./images/open-alex-anderson-pdf.png " ")

13. Navigate back to the **Dashboard** and expand **View Approved Customers**. We can see that Alex Anderson has been removed from the Pending Review Loan Requests list and has been added to the Approved Loan Requests list.

    ![Alex Anderson Approved List](./images/alex-anderson-approved-list.png " ")

## Task 5: Edit Customer Details
For this task, we will edit a customers details.

1. Select **Dashboard** in the left navigation menu if you are not on the Dashboard page already.

    ![Select Dashboard](./images/select-dashboard.png " ")

2. On the Dashboard page, expand **View Denied Customers**. From the Denied Loan Requests list, select the customer ID for **James Woods**.

    ![Select James Woods](./images/select-james-woods-denied.png " ")

3. On the Customer Details page, expand **Customer Details**.

    ![Expand Customer Details](./images/customer-details.png " ")

5. Let's change James' loan status from Denied back to **Pending Review**.

    ![Edit Customer Details](./images/pending-review.png " ")

6. Click **Save Customer Details**.

    ![Save Customer Details](./images/save-details.png " ")

7. Navigate back to the Dashboard.

    ![Click Dashboard](./images/click-dashboard.png " ")

8. We can see that James Woods has been removed from the Denied Loan Requests list and has been added back to the Pending Review Loan Requests list.

    ![James Woods Pending Review List](./images/james-woods-pending-review-list.png " ")


## Learn More

*(optional - include links to docs, white papers, blogs, etc)*

* [URL text 1](http://docs.oracle.com)
* [URL text 2](http://docs.oracle.com)

## Acknowledgements
* **Authors** - Linda Foinding, Francis Regalado
* **Contributors** - Kamryn Vinson, Eddie Ambler, Kevin Lazarz
* **Last Updated By/Date** - Linda Foinding, April 2025