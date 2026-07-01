# Introduction

## About this Workshop

In this lab, we'll interact with a data set from an application named Prism CityOps, but we will add new database objects combined with the oracleagentmemory Python driver to enable our AI agent to have a memory lifecycle. Prism CityOps is an application used by the city of Kirkland to monitor and manage city infrastrucuter such as ongoing maintenance, active monitoring via IoT devices, crew dispatch, record keeping, and more. This new capability you'll build will help with more in-depth reporting, more informed alerting, and much more.

You'll utilize a Jupyter Notebook with real Python code, completing real activities, to build this agent with fully fleshed out agents.

Estimated Workshop Time: 45 - 55 minutes

✅ **Overview of Labs**

This notebook builds a field-assistant copilot for city infrastructure inspectors using Oracle AI Database, Ollama, and the oracleagentmemory SDK. Learners see how inspection narratives become durable memory that can help future inspectors reason from prior work instead of starting from scratch.

* **The data and memory layer**
This section introduces the difference between domain data and agent memory. Learners see how CITY_ASSET and CITY_INSPECTION_FINDING act as the system of record, while SDK-managed tables such as CITY_MESSAGE and CITY_MEMORY capture conversations and extracted facts, preferences, guidelines, and memories.

* **Design**
This section explains the copilot’s read-then-write cycle: gather context, ask the LLM, persist the turn, and let the SDK derive reusable memory. Learners understand how asset records, context cards, vector search, and automatic memory extraction combine into a single copilot workflow.

* **Part 1: Oracle setup**
This section connects the notebook to Oracle AI Database and establishes the shared database connection used throughout the workshop. Learners confirm that the SDK tables, custom domain tables, and vector-search operations all live in the same converged database environment.

* **Part 2: The embedder and SDK**
This section wires Oracle’s in-database ONNX embedding model into the SDK through an embedder adapter. Learners initialize OracleAgentMemory with Ollama for local extraction and see how text becomes database-computed vectors without external embedding calls.

* **Part 3: City asset + auto-extraction**
This section loads the city asset registry and demonstrates how raw maintenance narratives become typed memory records. Learners build report_event, trigger SDK extraction with add_messages, and verify that messages and extracted memories were persisted.

* **Part 4: Inspection findings + similar-finding search**
This section creates a structured inspection-finding workflow separate from SDK memory. Learners build log_finding and find_similar_findings, then use Oracle vector search with relational filters to retrieve prior findings by asset, category, and semantic similarity.

* **Part 5: Scoping - inspector vs city**
This section demonstrates how memory visibility is controlled by user_id, agent_id, and thread_id. Learners verify that one inspector’s private notes do not leak to another inspector, while shared city or asset-level knowledge remains available when intentionally scoped that way.

* **Part 6: The cityops copilot - End-to-end**
This section assembles the earlier components into call_copilot, the full copilot turn. Learners combine asset lookup, thread context, asset-pooled memory, similar-finding search, LLM reasoning, and write-back into one working assistant flow.

* **The cross-inspector handoff scenario**
This section shows how Inspector Mercer’s Harbor Bridge findings help Inspector Vance later, without a direct human handoff. Learners see the difference between diagnostic copilot interaction, formal finding capture, and reusable memory that carries forward across inspectors.

* **Compare: Vance with and without memory**
This section contrasts the same inspection narrative with and without memory-backed context. Learners see why memory changes the quality of the copilot’s answer by surfacing prior findings, guidelines, and asset-specific history.

* **Key takeaways and memory types**
The closing sections summarize the layers learners built and map SDK record types to broader agent-memory concepts. Learners connect concrete database tables and SDK features to semantic memory, episodic memory, working context, persona preferences, and shared coordination memory.

### Objectives

* Connect to Oracle AI Database and initialize the shared database environment used by the copilot.
* Configure an Oracle in-database ONNX embedder and initialize the oracleagentmemory SDK with a local Ollama model.
* Load city infrastructure assets and use SDK auto-extraction to turn inspection narratives into typed memory records.
* Create and query structured inspection findings with Oracle vector search and relational filters.
* Explain how memory scoping prevents private inspector notes from leaking while still supporting shared city or asset-level knowledge.
* Build an end-to-end call_copilot workflow that combines asset lookup, context cards, memory search, similar-finding search, LLM reasoning, and persistence.
* Demonstrate how one inspector’s prior work can improve another inspector’s later diagnosis without exposing raw private conversations.
* Compare copilot responses with and without memory to evaluate the practical value of agent memory in an operational workflow.

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
