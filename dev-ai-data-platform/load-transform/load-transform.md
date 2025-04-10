# 🏗️ Build your Data Pipeline: Load & Transform Data (optional lab)

#### Estimated Lab Time: 45 minutes

## Introduction

In this lab, you’ll practice importing data from Oracle Object Storage and preparing it for analysis in various formats. You’ll learn how to load both CSV and JSON files into Oracle Autonomous Database and transform them for easier use. By the end of this lab, you’ll understand how to efficiently move data from Object Storage—regardless of its format—and apply transformations to make it searchable, shareable, and ready for analysis.



## Task 1: Load CSV Data from Object Storage (Approved Affordable Home Zones)

In this task, you’ll work with a CSV file stored in your Oracle Object Storage bucket. A CSV file is a simple, tabular format similar to a spreadsheet, making it ideal for structured data like affordable home zone information.  

Here’s what you’ll do:

#### 📥 Access the Object Storage Bucket

Locate the CSV file containing **"Approved Affordable Homes Zones"** data in your **Object Storage bucket**.

Understand the structure of the file by reviewing its **columns and data types** (e.g., zone names, approval dates, or geographic coordinates).

---

#### 🛠️ Load the CSV File into Oracle Autonomous Database

Use Oracle tools (such as **SQL Developer Web** or **Data Pump**) to import the CSV file into your database.

- Create a **new table** or use an **existing one** to store the data.
- Ensure **column mappings are accurate** to preserve data integrity.

---

#### ✅ Validate the Imported Data

Run simple **SQL queries** to verify that all **rows and columns** were imported correctly.

- Check for any **missing or corrupted data** and troubleshoot if necessary.

---

#### 📊 Analyze Home Zone Data

Use **SQL queries** to analyze the imported data directly in **Oracle Autonomous Database**. For example:

- Identify **zones with the highest approvals**.
- Filter zones by specific criteria, such as **location** or **approval status**.

---

By the end of this task, you’ll have successfully **imported and validated CSV data**, making it **ready for analysis** within Oracle.

## Task 2: Load JSON Data from Object Storage & Transform via ETL (Loan Offers)

In this task, you’ll work with JSON files stored in your Object Storage bucket. JSON (JavaScript Object Notation) is a structured text format used for representing data as key-value pairs, often used for more complex datasets like loan offers. You’ll perform an ELT (Extract, Load, Transform) process to clean and reformat the data for analysis.

#### 📂 Access the JSON File

Locate the JSON file containing **"Loan Offers"** data in your **Object Storage bucket**.

Review its structure to understand the **key-value pairs** (e.g., loan ID, interest rate, applicant details).

---

#### 📥 Load JSON Data into Oracle Autonomous Database

Use Oracle’s **JSON support features** to load the file into a **dedicated table designed for JSON storage**.

Leverage tools like **SQL Developer Web** or **REST APIs** to streamline the loading process.

---

#### 🔄 Transform JSON Data Using ELT

Extract meaningful information from **nested JSON structures** using SQL/JSON functions like `JSON_TABLE` or `JSON_VALUE`.

Clean and reformat the data as needed:

- **Normalize nested structures** into relational tables.
- **Convert inconsistent formats** (e.g., dates or currency) into standard formats.
- Store **transformed data** in a new table optimized for querying.

---

#### 🔗 Join Loan Offers with Other Data

Combine loan offer data with other tables in your database using **SQL joins**.

For example:

- Link loan offers with **customer demographics** or **property details**.
- Run advanced queries to gain insights:
  - Identify **trends in loan offers** by region or applicant type.
  - Analyze **loan approval rates** based on interest rates or terms.

---

#### ✅ Validate and Test Queries

Verify that transformations were applied correctly by running **test queries** on the transformed data.

Ensure that all **key fields are accessible** and properly formatted for analysis.

---

By completing this task, you’ll understand how to handle complex JSON files, transform them using ELT processes, and integrate them with other datasets for deeper insights.

---

> **Note:** `<SCREENSHOTS!>`

<!--
* You’ll grab a CSV (comma-separated values) file from your Object Storage bucket—think of it like a simple spreadsheet.

* You’ll import this data into your database, so you can easily analyze home zone data right inside Oracle.

* Next, you’ll handle JSON files—these are more like structured text that show data in pairs of names and values.

* You’ll run an ETL (Extract, Transform, Load) process to clean or reformat that JSON data and get it ready for queries.

* Once it’s loaded, you can join it with other information in your database to see loan offers in a whole new light. -->

---

### Affordable Housing Zone

Affordable Housing Zones are an economic development tool that allows people to invest in distressed areas in the United States. Their purpose is to spur economic growth and job creation in low-income communities while providing tax benefits to investors.

---

## Learn More

* [The Catalog Tool](https://docs.oracle.com/en/cloud/paas/autonomous-database/serverless/adbsb/catalog-entities.html)
* [Autonomous Database](https://docs.oracle.com/en/cloud/paas/autonomous-database/index.html)

## Acknowledgements

* **Authors** - Matt Kowalik, Otis Barr
* **Contributors** - Eddie Ambler, Ramona Magadan
* **Last Updated By/Date** - TBC

Copyright (C) Oracle Corporation.
