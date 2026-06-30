# Introduction

## About this Workshop

In this lab, we'll interact with a data set from an application named Prism CityOps. It's an application used by the city of Kirkland to monitor and manage city infrastrucuter such as ongoing maintenance, active monitoring via IoT devices, crew dispatch, record keeping, and more.

You'll utilize a Jupyter Notebook with real Python code, completing real activities, and building on what you already know about databases and AI Vector Search. You'll create a RAG pipeline using data in the database and work your way up to implementing a full on AI agent, with tools and a little memory, utilizing LangChain as the agent framework.

Estimated Workshop Time: 50 - 60 minutes

✅ **Overview of Labs**

In the next labs, you'll connect to your JupyterLab environment and work through the RAG to Agent notebook built around the Prism CityOps dataset. You'll use the same operational data you did with the Data Fundamentals lab, but this time you'll build real workflows with the data.

* **Lab 1 – Connect to your environment and confirm database is ready**
Log in to the JupyterLab IDE where you’ll run Python code and run the section 0 cells to confirm the database is ready for the lab.

* **Lab 2 – RAG, grounded in your own data**
This section builds a minimal Retrieval-Augmented Generation path over Prism maintenance and inspection content using Oracle’s in-database ONNX embedding model and vector search. Learners inspect retrieved chunks, assemble grounded prompts, compare a raw Ollama-based RAG call with a LangChain version, and see why RAG is powerful for grounded answers but insufficient for multi-step operational reasoning.

* **Lab 3 – Tools and skills**
This section introduces the concepts the agent will need before it is built: callable tools and SOP-like skills. Learners define allowlisted Prism data tools, learn why tool signatures and docstrings matter to the model-facing interface, and create an incident-triage skill that tells the future agent which tools to use, in what order, and under what evidence standards.

* **Lab 4 – The unified query**
This section demonstrates the core Oracle AI Database value proposition by combining relational data, JSON specifications, SQL/PGQ graph traversal, and vector search in a single SQL-backed incident brief. Learners run the unified query, inspect the combined result, and wrap it as the agent’s primary context tool so the agent can retrieve rich operational evidence through one controlled interface.

* **Lab 4 – Build the agent with LangGraph + Ollama**
This section assembles the full agent: a LangGraph reasoning loop backed by Ollama, allowlisted tools, an incident-triage skill, Oracle-backed short-term checkpoint memory, and Oracle-backed long-term semantic memory. Learners reset rerun state, compile the graph, run the first agent turn, inspect tool calls and trace output, and verify that durable memory was written back to the database.

By the end, you'll understand how Oracle AI Database supports AI application development use LangChain, LLMs, AI Agents, and your own data pipelines.

### Objectives

* Build a grounded RAG flow that retrieves Prism maintenance context using in-database embeddings and vector search, then uses that context to answer asset-related questions.

* Compare raw RAG plumbing with a LangChain-based implementation to understand what the framework simplifies and what remains the developer’s responsibility.

* Run a deterministic LLM-driven workflow that classifies an infrastructure incident, retrieves supporting context, drafts a recommendation, formats the result, and exposes trace data for review.

* Define agent tools and a task-specific skill that guide how an LLM should retrieve asset context, follow evidence rules, and produce incident-triage recommendations.

* Build and run a LangGraph agent that uses Oracle-backed tools, unified relational/JSON/graph/vector context, short-term checkpoint memory, and long-term semantic memory to respond to a Prism infrastructure incident.

### Prerequisites

This lab assumes you have:

* An Oracle account to submit your LiveLabs Sandbox reservation.
* Basic knowledge of coding and Python.
* Basic knowledge of Oracle Database, i.e., how to run queries.

## Learn More

* [Oracle AI Database Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/)

## Acknowledgements
* **Authors** - Kirk Kirkconnell
* **Last Updated By/Date** - Kirk Kirkconnell, June 2026
