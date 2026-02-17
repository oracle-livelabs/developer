# Introduction

## About this Workshop

**Retrieval-Augmented Generation (RAG)** is transforming how we build AI applications. Instead of relying solely on a large language model's training data, RAG retrieves relevant context from your own knowledge base and includes it in the prompt—significantly improving accuracy and reducing hallucinations.

In this hands-on workshop, you'll learn how to build a complete RAG system using **Oracle AI Database 26ai** and **OCI Generative AI**. You'll discover how Oracle's converged database approach lets you store vectors, documents, and relational data together with full SQL capabilities and transactional consistency.

<!-- TODO: Add architecture diagram showing RAG flow -->
![RAG Architecture](images/rag-architecture.png " ")

### What You'll Build

By the end of this workshop, you'll have created:

- A **vector-enabled knowledge base** with semantic search capabilities
- **Three search strategies**: keyword search, vector similarity search, and hybrid search
- A **RAG agent** that retrieves context and generates accurate responses using OCI Generative AI

### Workshop Overview

| Lab | Title | Duration | Description |
|-----|-------|----------|-------------|
| 1 | Vector Search Fundamentals | 45 minutes | Connect to ADB, generate embeddings, and perform keyword, vector, and hybrid search |
| 2 | Build a RAG Agent | 45 minutes | Process documents, build retrieval functions, and create an interactive RAG agent |

## About Oracle AI Vector Search

Oracle AI Vector Search is a feature of Oracle Database that enables semantic search on unstructured data. Key capabilities include:

- **Native VECTOR data type** for storing embeddings alongside relational data
- **VECTOR_DISTANCE function** for similarity search with cosine, dot product, or Euclidean metrics
- **HNSW and IVF indexes** for fast approximate nearest neighbor search
- **Hybrid search** combining Oracle Text keyword search with vector similarity
- **Integration with OCI Generative AI** for embedding generation and LLM access

## About OCI Generative AI

Oracle Cloud Infrastructure Generative AI provides:

- **Cohere embedding models** for converting text to vector representations
- **Chat models** (Cohere Command R+) for text generation
- **REST APIs and SDKs** for easy integration
- **Enterprise security** with data privacy guarantees

## Objectives

In this workshop, you will learn how to:

- Connect to Oracle Autonomous Database from a Jupyter notebook
- Generate vector embeddings using OCI Generative AI
- Store and index vectors in Oracle Database
- Perform keyword, vector, and hybrid searches
- Process PDF documents and chunk them for retrieval
- Build a complete RAG pipeline with context retrieval
- Create an interactive agent with conversation history

## Prerequisites

This lab assumes you have:

- Basic knowledge of Python programming
- Basic knowledge of SQL
- Familiarity with Jupyter notebooks

**Note:** All OCI credentials, database connections, and Python packages are pre-configured in the LiveLabs sandbox environment.

## Learn More

- [Oracle AI Vector Search Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/)
- [OCI Generative AI Documentation](https://docs.oracle.com/en-us/iaas/Content/generative-ai/home.htm)
- [DBMS_VECTOR_CHAIN Package Reference](https://docs.oracle.com/en/database/oracle/oracle-database/26/arpls/dbms_vector_chain1.html)

## Acknowledgements

- **Author** - Kirk Kirkconnell, Oracle
- **Contributors** - [Add contributors]
- **Last Updated By/Date** - [Your name], [Month Year]
