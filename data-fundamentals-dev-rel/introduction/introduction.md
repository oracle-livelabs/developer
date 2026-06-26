# Introduction

## About this Workshop

In this lab, we'll interact with a data set from an application named Prism CityOps. It's an application used by the city of Kirkland to monitor and manage city infrastrucuter such as ongoing maintenance, active monitoring via IoT devices, crew dispatch, record keeping, and more.

You'll utilize a Jupyter Notebook with real Python code, completing real activities, and using aspects of Unified Model Theory (UMT) to present data in various forms, from JSON documents, to graph traversals with visual of those relationships, and perform AI search via vector data, all within Oracle AI Database.

✅ **Overview of Labs**

In the next labs, you'll connect to your JupyterLab environment and work through a data fundamentals notebook built around the Prism CityOps dataset. You'll inspect the same operational data through relational tables, JSON, graph, and vector representations, then use Oracle AI Database to generate embeddings, run Vector Search, and compare search patterns. Labs 1 and 2 will be in the morning session, and Labs 3 and 4 will be completed in the afternoon sessions.

* **Lab 1 – Connect to your environment**
Log in to the JupyterLab IDE where you’ll run Python code.

* **Lab 2 – Explore the Prism data foundation**
Open the data fundamentals notebook, verify your database connection, and explore the Prism data model. You'll query relational tables, inspect JSON document-style data, follow graph relationships with SQL/PGQ, and see how criticality, maintenance logs, sensors, assets, and incidents connect across the model.

* **Lab 3 – Generate and search vector embeddings**
Use an in-database ONNX embedding model to create vectors without moving data out of Oracle AI Database. You'll insert new maintenance information, vectorize it, inspect the vector index, and run both broad and targeted similarity searches for incidents, procedures, and operational context.

* **Lab 4 – Combine data shapes in unified AI-ready queries**
Bring the data model together with SQL that returns table output, JSON output, graph-driven results, and vector search matches from the same database. If time allows, you'll also try optional Hybrid Vector Search to compare vector-only, text-only, and combined ranking strategies.

By the end, you'll understand how Oracle AI Database can support AI application development by keeping operational data, graph relationships, JSON structures, embeddings, vector indexes, and search logic close together in one platform.

### Objectives

* Connect to Oracle AI Database from JupyterLab and verify the lab environment is ready.
* Explore the Prism CityOps data model across relational tables, JSON data, and graph relationships.
* Use SQL and SQL/PGQ to analyze infrastructure assets, incidents, sensors, maintenance logs, and operational criticality.
* Generate vector embeddings inside Oracle AI Database with an in-database ONNX model.
* Inspect vector indexes and run similarity searches over operational records and procedures.
* Combine relational, JSON, graph, and vector search results in AI-ready SQL queries.
* Compare vector-only, text-only, and hybrid search strategies when completing the optional Hybrid Vector Search section.

### Prerequisites

This lab assumes you have:

* An Oracle account to submit your LiveLabs Sandbox reservation.
* Basic knowledge of coding and Python.
* Basic knowledge of Oracle Database, i.e., how to run queries.

## Learn More

* [Oracle AI Database Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/)

## Acknowledgements
* **Authors** - Kirk Kirkconnell
* **Contributors** - Anant Srivastava
* **Last Updated By/Date** - Kirk Kirkconnell, June 2026
