# Introduction

## About this Workshop

Construction procurement depends on connected decisions. Project requirements, supplier qualifications, compliance documents, schedules, budgets, and risk signals all need to come together quickly so teams can avoid delays and make confident supplier decisions.

SeerGroup is a global conglomerate with multiple divisions. Across those divisions, the challenge is the same: critical decisions take too long when data is scattered across spreadsheets, documents, forms, and disconnected systems.

This workshop shows how Seer Construction addresses that problem with Oracle AI Database and OCI Generative AI. By keeping procurement data in one place, the application helps procurement officers, engineers, and managers review projects faster, generate clearer supplier recommendations, and make better-informed decisions.

First, you will experience the application from the procurement user’s point of view. Then, you will go behind the scenes and build the same application flow step by step using Oracle AI Database capabilities, including **AI Vector Search**, **Property Graph**, and **JSON Duality Views**; **OCI Generative AI** for AI-generated responses; Python for application logic; and RAG to ground answers in retrieved business context.

Estimated Workshop Time: 60 minutes


✅ **Lab 1 — Experience the app as a procurement user**

In Lab 1, you will use the **Seer Construction Procurement app** as a construction procurement officer. You will review project details, ask questions through the AI Procurement Guru, approve or deny supplier recommendations, explore project risk relationships, and update a project profile from an uploaded document.
You will see how the application can:

* Review project procurements with AI-generated analysis and recommendations.
* Answer follow-up questions using RAG and AI Vector Search.
* Support approval, denial, or request-for-information decisions with supplier evidence, risk factors, and decision summaries. 
* Show connected project, supplier, recommendation, and risk data using Property Graph.
* Update project profile information using JSON Duality Views and JSON Transform.

This demo shows how Oracle AI Database and OCI Generative AI can help streamline procurement review, reduce supplier risk, and improve decision quality without moving data across fragile systems.

✅ **Lab 2 — Build the application flow step by step**

After using the demo application in Lab 1, you will switch from procurement user to developer. In Lab 2, you will work in a **JupyterLab development environment** and build the same application flow step by step.

You will connect to Oracle AI Database from Python, retrieve project data from a JSON relational duality view, use OCI Generative AI to generate supplier recommendations, chunk and store the recommendation text, create vector embeddings, and use AI Vector Search with RAG to answer follow-up questions.

By the end of the workshop, you will have experienced the application as an end user and built the core AI workflow behind it as a developer.


### Objectives

In this workshop, you will:

* Run an AI-powered construction procurement demo application. 
* Query project and supplier data from Oracle AI Database. 
* Use JSON Duality Views to work with relational data as project-centered JSON documents. 
* Generate supplier recommendations with OCI Generative AI. 
* Use AI Vector Search and RAG to answer follow-up questions with retrieved business context. 
* Explore connected project and supplier relationships with Property Graph. 
* Build the core application flow using Python. 

### Prerequisites

This workshop assumes you have:

* An Oracle account to submit a LiveLabs Sandbox reservation. 
* Basic knowledge of Python. 
* Basic knowledge of Oracle Database, including how to run queries.

### Architecture

Below is a visual representation of the lab workflow. As a **Construction Procurement Officer**, you will review supplier submissions for construction engineering projects. **Oracle AI Database** converts your question or the project details you are reviewing into a **vector embedding**, then uses **semantic search** to find relevant information based on meaning rather than exact keyword matches. The most relevant document excerpts are provided to the AI along with your question. Using this evidence, the AI delivers a **grounded recommendation** to approve, deny, or request more information, with a clear rationale.

![Diagram](./images/architecture.png =50%x*)

The application utilizes key features of Oracle AI Database:

* **Converged Database:** keeps transactional, analytical, AI, and operational data together.
* **AI Vector Search:** enables semantic “meaning-based” search across documents and project data.
* **JSON Duality Views / JSON Transform:** makes document-style JSON data easier to use alongside relational tables.
* **Property Graph:** models relationships—for example, which supplier supports which project, requirement, risk, or evaluation.

## Learn More

* [Oracle AI Database Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Authors** - Uma Kumar
* **Last Updated By/Date** - Taylor Zheng, Uma Kumar, Deion Locklear, Daniel Hart, July 2026
