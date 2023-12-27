# Oracle Full Stack for Breast Cancer Detection

## Introduction

This lab will show you how to use Oracle Database, Object Storage, and OCI Vision/Document AI to detect text in medical documents and store acoordingly (for example as an expense report).

Estimated Time: 5 minutes.

### Objectives

* Upload the image from the local file system to the OCI object storage bucket using OCI Object storage rest APIs
* Input this image to the AI Vision Document model and receive the JSON results.
* Receive the response JSON and parse it.
* Present the results in Flutter frontend.
* Understand the backend and frontend code.

### Prerequisites

- Completion of Setup lab


## Task 1: Run the application

1. Open the frontend via your preferred method as was done in setup and select the `Image Analysis` item from the sidebar menu.
   ![select image analysis button](images/medicaldocumentsbutton.png " ")
2. Click the `Pick a File` button and Select a receipt image file. Example files are provided
   ![select file](images/selectfile.png " ")
3. You will see the image file you selected. Now click `Submit`
   ![image after select](images/selectedreceipt.png " ")
4. Notice the results of the Vision AI processing and parsed fields.
   ![notice generated image](images/medical-docs2.png " ")


## Task 2: Understand the code

1. Notice the `/flutter-frontend/lib/medicaldocs.dart` source code and how it creates a request to the Spring Boot backend and parses the JSON response into a resultant fields.
2. Notice the `/springboot-backend/src/main/java/oracleai/MedicalDocsController.java` source code and how it creates a request to the document model deployed in the OCI Vision service and passes the JSON response back to the frontend.

You may now **proceed to the next lab.**..

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate, Oracle Database
* **Last Updated By/Date** - 2024.