# Quiz on the Fundamentals of Data for AI

## Introduction

Test your knowledge of the Fundamentals of Data for AI!

Estimated Time: ~5 minutes

```quiz-config
    passing: 80
    badge: images/badge1.png
```

### Objectives

* Pass the quiz and get your "Fundamentals of Data for AI" skills badge!

### Quiz Questions

```quiz score

Q: What is the core tenant of the Unified Model Theory(UMT)?
* Model your canonical schema for data integrity, security, etc., but design data projections for application access patterns.
- All data, when viewed through the correct access surface at 9am, transforms into coffee.
- Eliminating polyglot persistence requires passing through five stages of database grief.
> The goal of UMT is to enable you to model a canonical schema, but project that data in whichever shapes needed by consumers.

Q: What is the default category of vector indexes in Oracle AI Database?
- IVF (Inverted File)
* HNSW (Hierarchical Navigable Small Worlds )
- Token Ring
- OSON
> HNSW is the default as it's the best general-purpose approximate nearest neighbor (ANN) algorithm available today. It has a good recall accuracy to speed ratio for most use cases.

Q: What's likely the best data type to store embeddings in Oracle AI Database?
- NUMBER
- BLOBOFREGRET
* VECTOR
- VARCHAR2
> Unless you have a solid reason not to, you should be using VECTOR data type to store vector embeddings.

Q: True or False: In Oracle, you can query JSON collections, relational tables, and graph traversals all in one SQL statement?
* True
- False
> It's true. You can even add a WHERE clause that performs a vector search to that same SQL statement.

Q: What's the likely data type you should store a JSON document in Oracle?
- CLOB
- VARCHAR2
* JSON
> Your default for storing JSON should likely be a JSON data type, but it really depends on how large of a document you're storing and your use case.

Q: How does Cosine similarity measure distance?
- It gets out a tape measure and...
- It measures concise distance between vectors
* It measures the angle between vectors

```

## Acknowledgements
* **Authors** - Kirk Kirkconnell
* **Last Updated By/Date** - Kirk Kirkconnell, March 2026
