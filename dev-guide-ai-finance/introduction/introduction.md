# Introduction

## About this Workshop

In this workshop, you will build a GenAI-powered loan approval application using Oracle Autonomous Database and Oracle Database 23ai. The session includes both a live demo and hands-on coding challenges.

In the demo, you will act as a loan officer using a modern loan approval app that combines **Generative AI**, **Vector Search**, and **Graph analytics**. You will process real loan applications and see how Oracle Database 23ai streamlines decision-making—replacing slow, manual reviews with AI-assisted analysis.

In the hands-on portion, we give you coding challenges and you will enhance the application by implementing features such as **AI Chatbots, AI Vector Search, Retrieval-Augmented Generation (RAG), JSON Duality Views**, and **Property Graphs**. These tools will help automate loan analysis, tailor recommendations, and surface relevant insights.

You will also integrate data from internal and external sources to generate insights, automate document processing, and accelerate loan approvals. The solution uses real-time Generative AI to refine loan options while maintaining compliance with company and regulatory policies.
 

  [](videohub:1_mg30brw3)

**About Oracle AI Vector Search**

Oracle AI Vector Search is a feature of Oracle Database 23ai that enables efficient searching of AI-generated vectors stored in the database. It supports fast search using various indexing strategies and can handle massive amounts of vector data. This makes it possible for Large Language Models (LLMs) to query private business data using a natural language interface, helping them provide more accurate and relevant results. Additionally, AI Vector Search allows developers to easily add semantic search capabilities to both new and existing applications.

**About Generative artificial intelligence (AI)** 

Generative AI excels at creating text responses based on large language models (LLMs) where the AI is trained on a massive number of data points. The generated text is often easy to read and provides detailed responses that are broadly applicable to the questions asked of the software, often called prompts.

The following diagram shows a VERY high-level overview of how you would create a chatbot application that can use an LLM in combination with private company data to answer questions specific to YOUR data. This process is called Retrieval Augmented Generation, or RAG.

![Vector Diagram](./images/vectors-diagram.png " ")

**About Retrieval-augmented generation (RAG)** 

RAG provides a way to optimize the output of an LLM with targeted information without modifying the underlying model itself; that targeted information can be more up-to-date than the LLM as well as specific to a particular organization and industry. That means the generative AI system can provide more contextually appropriate answers to prompts as well as base those answers on extremely current data.

**About Property Graph**

In Oracle Database 23ai we can create property graphs inside the database. These property graphs allow us to map the vertices and edges to new or existing tables, external tables, materialized views or synonyms to these objects inside the database. The property graphs are stored as metadata inside the database meaning they don't store the actual data. Rather, the data is still stored in the underlying objects and we use the SQL/PQG syntax to interact with the property graphs.

Property graphs make the process of working with interconnected data, like identifying influencers in a social network, predicting trends and customer behavior, discovering relationships based on pattern matching and more by providing a more natural and efficient way to model and query them.

**About JSON Duality View**

JSON Relational Duality is a landmark capability in Oracle Database 23ai, providing game-changing flexibility and simplicity for Oracle Database developers. This feature overcomes the historical challenges developers have faced when building applications using the relational or document models.

JSON Relational Duality helps to converge the benefits of both document and relational worlds. Developers now get the flexibility and data access benefits of the JSON document model, plus the storage efficiency and power of the relational model. The new feature enabling this functionality is JSON Relational Duality View



### Objectives

This demo/workshop will show you how to automate and enhance the loan approval process using Oracle Database 23ai. Through hands-on labs and technical walkthroughs, you will embed 23ai capabilities into a custom web application.
You will work with features such as AI Vector Search, Property Graph, and JSON Duality Views to:

* Ask natural language questions about an applicant’s financial history

*	Track loan approval status and update application records

*	Generate PDF reports summarizing loan decisions

*	Analyze relationships and trends in applicant data using Graph
 

By building these capabilities yourself, you will learn how to combine AI-driven insights with Oracle’s data tools to streamline real-world financial workflows.

### Prerequisites

This lab assumes you have:
* An Oracle account

## Learn More

* [Oracle Database 23ai Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Authors** - Linda Foinding, Francis Regalado
* **Contributors** - Kamryn Vinson, Otis Barr, Ramona Magadan, Eddie Ambler, Kevin Lazarz
* **Last Updated By/Date** - Linda Foinding, April 2025
