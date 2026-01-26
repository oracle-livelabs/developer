# Introduction

## About this Workshop

In this lab, we'll look at SeerGroup, a global conglomerate with multiple divisions. Each division has various transactions, documents, and customer data. Their challenges are like many other businesses: decisions take too long, outcomes are not accurate enough, or things get confusing because data is scattered across silos and systems, and "we've always done it that way" attitude has crept in.

This workshop shows how SeerGroup tackles that problem with Oracle AI Database + OCI Generative AI. By keeping data in one place and using various newer technologies, they cut out fragile integrations to give analysts, engineers, and managers a **single platform** for smarter and more informed approvals, faster investigations, and clearer customer answers.

You’ll see how SeerGroup’s teams can move from manual, fragmented workflows to AI-powered applications, and you’ll build the same capabilities yourself in subsequent labs.

✅ **Start with the demo! (Lab 1)**

Step into SeerGroup’s Retail division as a Return Authorization Specialist. You’ll use an AI-powered product return app built on Oracle AI Database to:

* Process return requests with AI Vector Search, Graph analytics, and use Retrieval-Augmented Generation (RAG)
* See how Generative AI compares claims against past returns, loyalty tiers, and risk scores in seconds
* Set the status of returns to approve, deny, or pending with AI-generated explanations and decision letters (PDFs) based on real data in the database
* Update return records using JSON Duality Views, ensuring order and customer data stays consistent

This story shows how Seer Retail uses Oracle AI Database and OCI Generative AI to speed up returns, cut fraud, and deliver consistent customer experiences. All within a single converged database.

✅ **What’s next (Labs 2–6)**

Next, you’ll switch roles to developer. In the next labs, you’ll connect to Oracle AI Database, shape data using JSON Duality Views, build a retrieval-augmented application, and then extend it to be an AI agent via reusable tools using Model Context Protocol (MCP). By the end, you’ll see how SeerGroup industries can move from siloed processes to data and AI-driven applications.

* **Lab 2 – Connect to your environment**
Log in to the JupyterLab IDE where you’ll run Python code.

* **Lab 3 – Build the data foundation**
Use Python with Oracle AI Database to create tables, shape them into JSON Duality Views, and interact with them using both SQL and MongoDB-style API syntax. This lays the groundwork for AI workflows across SeerGroup.

* **Lab 4 – Implement RAG**
Construct a working AI application. Pull customer and grid data, generate recommendations with OCI Generative AI, chunk and vectorize the results, and answer follow-up questions using Vector Search + RAG.

* **Lab 5 – Explorer agentic apps with Oracle MCP**
This lab links Oracle MCP to LangChain (an AI agent framework ) through a Flask web console and exposes SQL operations as AI-discoverable tools. It includes SeerHolding sample schemas for domain-specific prompt testing.

* **Lab 6 – Extend with MCP tools**
Wire Oracle AI Database and OCI Generative AI into reusable MCP tools. Call them from notebooks, chain them together into workflows, and even register your own tool for SeerGroup’s finance, retail, healthcare, or energy teams.

By the end, you’ll have a complete toolkit—from clean data to live AI apps to composable tools—that shows how SeerGroup industries can turn their data into intelligent applications.

### Objectives

* Build and query data with Python + Oracle AI Database
* Shape relational data into multiple models, include JSON Duality Views and other features
* Run Vector Search, Graph analytics, and RAG directly in the database
* Extend apps with OCI Generative AI and MCP tools
* Deliver industry-grade solutions for SeerGroup’s divisions

### Prerequisites

This lab assumes you have:

* An Oracle account to submit your LiveLabs Sandbox reservation.
* Basic knowledge of Python.
* Basic knowledge of Oracle Database, i.e., how to run queries.

## Learn More

* [Oracle AI Database Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/)

## Acknowledgements
* **Authors** - Uma Kumar
* **Contributors** - Linda Foinding, Francis Regalado, Kirk Kirkconnell
* **Last Updated By/Date** - Kirk Kirkconnell, February 2026