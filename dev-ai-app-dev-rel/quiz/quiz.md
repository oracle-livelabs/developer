# Quiz

## Introduction

Test your knowledge of building a RAG and agentic! This quiz covers key concepts from the lab including Vector Search, embeddings, Python integration, and AI-powered recommendation systems.

Estimated Time: 5 minutes

```quiz-config
    passing: 80
    badge: images/badge.png
```

### Quiz Questions

```quiz score
Q: What is the primary purpose of RAG (Retrieval-Augmented Generation)?
- To replace the need for a database entirely
- To be the shiny new box that every developer wants to play with
- To store customer passwords securely
* To search for and provide data to an LLM that it would otherwise would not have
> While it is a shiny box, that is not its primary purpose

Q: Which Python library is used to connect to Oracle AI Database in this lab?
- psycopg2
* oracledb
- pymongo
- sqlalchemy
> The oracledb library can be easily grabbed using `pip install oracledb`

Q: What is the default category of vector indexes in Oracle AI Database?
- IVF (Inverted File)
* HNSW (Hierarchical Navigable Small Worlds )
- Token Ring
- OSON

Q: What's the best data type to store vector embeddings in Oracle?
- LOB
- NUMBER
* VECTOR
- VARCHAR2

Q: What does the VECTOR_CHUNKS function do in Oracle AI Database?
- It's a hidden function that creates fresh, chunky dog food
- Encrypts sensitive customer data
* Splits text into smaller chunks to create vector embeddings and perform similarity search
- Creates backup copies of database tables

Q: What database feature combines data from multiple tables (CUSTOMERS, RETURN_REQUESTS) in a single JSON document?
* JSON Relational Duality View
- Materialized View
- Temporary Table
- Stored Procedure
> JSON Relational Duality Views enable you to store data as relational tables and project the data as JSON documents.

Q: True or False: You can use JSON, relational tables, and graph traversals in the same SQL query.
* True
- False

Q: What's the likely data type you should store a JSON document in Oracle?
- CLOB
- VARCHAR2
* JSON
* It depends
> Your default for storing JSON should likely be a JSON data type, but it really depends on how large of a document you're storing

Q: True or False: Oracle AI Database enables you to create embeddings directly within the database
* True
- False

Q: How does Cosine similarity measure distance?
- It measures concise distance between vectors
* It measures the angle between vectors
- Ya get out this here tape measure and...

```

## Acknowledgements
* **Authors** - Francis Regalado, Uma Kumar
* **Quiz Created By** - Claude Code
* **Last Updated By/Date** - Kirk Kirkconnell, February 2026
