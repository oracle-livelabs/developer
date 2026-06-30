# Quiz

## Introduction

Test your knowledge of building with agent memory! This quiz covers key concepts from the presentation and lab including types of agent memory, what each type is best for, and how to use them effectively.

Estimated Time: 5 minutes

```quiz-config
    passing: 80
    badge: images/badge.png
```

### Objectives

* To pass the quize and get your **Zero to Hero: Agent Memory** Skills Badge!

### Quiz Questions

```quiz score

Q: What are the three types of long-term memory in Agent Memory?
- Entity, conversational, and persona memory
* Procedural, episodic, and semantic memory
- Volatile, inconsistent, and passive-aggressive memory
- Goldfish mode, 'What did I come in here for?' mode, and 'I'll remember this later, I promise' memory
> Procedural, episodic, and semantic memories branch out to the Execution, Experiece, and Knowledge layers respectively to enable your application to store and utilize all kinds of data long-term.

Q: What is the difference between domain data and memory in the lab?
- Domain data is created by Ollama, while memory is loaded from JSON files
- Domain data is private to each inspector, while memory is always public
- Domain data stores prompts, while memory stores only embeddings
* Domain data is the system of record, while memory is what the agent accumulates from interactions
> `CITY_ASSET` and `CITY_INSPECTION_FINDING` hold structured operational data, while SDK-managed memory tables store conversations and extracted facts, preferences, guidelines, and memories.

Q: Why does the notebook use an in-database ONNX embedding model?
- To fine-tune Ollama on inspection findings
- To convert SQL tables into Markdown summaries
* To compute vector embeddings inside Oracle without sending text to an external embedding service
- To disable vector search during the lab
> The embedder adapter exposes Oracle’s in-database embedding capability to the SDK, keeping embedding generation close to the data, but as with anything there are trade-offs.

Q: What happens when `thread.add_messages(...)` runs with memory extraction enabled?
- The SDK drops and recreates all `CITY_` tables
* The SDK stores the message and uses an extractor LLM to create typed memory records
- The LLM directly inserts rows into `CITY_ASSET`
- The notebook bypasses the database and stores memory only in Python
> `add_messages` writes conversational history and triggers SDK extraction into records such as facts, preferences, guidelines, and memories.

Q: Why are inspection findings stored in `CITY_INSPECTION_FINDING` instead of only in SDK memory?
* Findings are structured domain records with fields like category, severity, recommendation, grade, and embedding
- SDK memory cannot store any text
- Findings must be visible to every database user without filtering
- Findings are temporary and should disappear after each notebook run
> Inspection findings are part of the formal system of record, so the lab stores them in a dedicated SQL table with a vector column for semantic search.

Q: What does `find_similar_findings` demonstrate?
- Vector search requires exporting all findings to a separate service
- Similarity search only works if the inspector names match exactly
- The LLM must manually rank all findings
* Oracle can combine vector similarity with relational filters in one SQL query
> The function searches semantically similar findings while also filtering by fields such as asset and category.

Q: What does the scoping section teach about inspector memory?
- Every inspector can read every raw conversation by default
* Private inspector notes are isolated by scope, while intentionally shared city or asset knowledge can still be retrieved
- Scoping happens only in the notebook UI
- Memory records are scoped by file path instead of database fields
> The lab uses `user_id`, `agent_id`, and `thread_id` as SQL-backed scope controls to prevent unintended cross-inspector leakage.

Q: In the cross-inspector handoff scenario, how does Vance benefit from Mercer’s earlier work?
- Vance receives Mercer's entire message history by default
- Mercer manually forwards her notebook output to Vance
- The LLM guesses what Mercer probably observed
* The copilot retrieves Mercer's logged findings and extracted asset-level memory without exposing her raw private conversation
> The handoff works because structured findings and asset-pooled extracted memories are retrievable for the same asset while private thread history remains scoped.

```

## Acknowledgements
* **Authors** - Kirk Kirkconnell
* **Last Updated By/Date** - Kirk Kirkconnell, January 2026
