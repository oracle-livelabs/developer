# Quiz

## Introduction

Test your knowledge of building a RAG and agentic! This quiz covers key concepts from the lab including Vector Search, embeddings, Python integration, and AI-powered recommendation systems.

Estimated Time: 5 minutes

```quiz-config
    passing: 80
    badge: images/badge.png
```

### Objectives

* Pass the quiz and get your "Data fundamentals for AI application developement" skills badge!

### Quiz Questions

```quiz score
Q: True or False: Oracle AI Database enables you to create vector embeddings directly within the database.
* True
- False
- Shmaybe

Q: Which Python library is used to connect to Oracle AI Database in the hands-on lab?
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
- NUMBER
- BLOBOFREGRET
* VECTOR
- VARCHAR2

Q: What does the VECTOR_CHUNKS function do?
- It's a hidden function that creates fresh, chunky dog food ondemand
- Encrypts sensitive customer data
* Splits data into smaller chunks to generate vector embeddings that can be used with vector indexes or hybrid vector indexes
- Creates backup copies of database tables in bite-sized chunks

Q: Which database feature combines data from one or more relational tables, but projects the data as a JSON document?
* JSON Relational Duality View
- Materialized View
- Temporary Table
- Stored Procedure
> JSON Relational Duality Views enable you to interact with data in one or more relational tables, but read and write as native JSON document.

Q: True or False: You can query JSON, relational tables, traverse graphs, and search vector data all in one SQL statement?
* True
- False
> It's true! In Oracle AI database, you can combine multiple data modalities as you need to.

Q: What's the likely data type you should store a JSON document in Oracle?
- CLOB
- VARCHAR2
* JSON
> Your default for storing JSON should likely be a JSON data type, but it really depends on how large of a document you're storing and your use case.

Q: What do each dimension of a vector embedding represent?
- A specific dictionary word, making the embedding basically an inefficient thesaurus.
* A value created by an embedding model representing some aspect of semantic meaning or context about the data.
- A technical persons emotional stage while explaining vector indexing to management.
> Each dimension is a value the embedding model learned during training, not something with a fixed human meaning.

Q: How does Cosine similarity measure distance?
- It gets out a tape measure and...
- It measures concise distance between vectors
* It measures the angle between vectors
> Cosine similarity measures the arc between the axis of a point in vector space. The tradeoff is Cosine misses the magnitude of how many times that point exists in vector space.

Q: You perform a query on a vector index, but it returns utterly unrelated results or zero results. What could the problem be?
- Your embeddings caught a sickness from an unsanitized CSV import.
- The index needs to be rebuilt because SQL query plans expire after 24 hours.
* The query embedding and stored embeddings came from different models, so they're not comparable.
- The similarity function used at query time doesn't match the one the index was built with. 
> Vector similarity only makes sense when query and stored vectors come from the same embedding model, since different models place semantically identical content in completely different vector spaces. Mixing them (or using a mismatched distance metric) gives you numbers that look like results but mean nothing.

```

## Acknowledgements
* **Authors** - Kirk Kirkconnell
* **Last Updated By/Date** - Kirk Kirkconnell, July 2026
