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
* To search for and provide data to an LLM that it would otherwise not have to generate responses with

Q: True or False: Oracle AI Database enables you to create embeddings directly within the database
* True
- False

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

Q: What's likely the best data type to store embeddings in Oracle AI Database?
- LOB
- BLOBOFMYSTERY32
* VECTOR
- VARCHAR2

Q: What does the VECTOR_CHUNKS function do?
- It's a hidden function that creates fresh, chunky dog food
- Encrypts sensitive customer data
* Splits text into smaller chunks to generate vector embeddings that can be used with vector indexes or hybrid vector indexes.
- Creates backup copies of database tables in bite-sized chunks

Q: Which database feature combines data from one or more tables (e.g. CUSTOMERS, RETURN_REQUESTS) in a single JSON document?
* JSON Relational Duality View
- Materialized View
- Temporary Table
- Stored Procedure
> JSON Relational Duality Views enable you to store data in one or more relational tables, but natively read and write a JSON document.

Q: True or False: You can use a SQL statement to query JSON, relational tables, and graph traversals.
* True
- False
> It's true. You can even add a WHERE clause that performs a vector search to that same SQL statement.

Q: What's the likely data type you should store a JSON document in Oracle?
- CLOB
- VARCHAR2
* JSON
> Your default for storing JSON should likely be a JSON data type, but it really depends on how large of a document you're storing and your use case.

Q: How does Cosine similarity measure distance?
- It measures concise distance between vectors
* It measures the angle between vectors
- It gets out a tape measure and...

```

## Acknowledgements
* **Authors** - Kirk Kirkconnell
* **Last Updated By/Date** - Kirk Kirkconnell, February 2026
