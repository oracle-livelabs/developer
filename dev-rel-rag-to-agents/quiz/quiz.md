# Quiz

## Introduction

Test your knowledge of building a RAG and agentic! This quiz covers key concepts from the lab including Vector Search, embeddings, Python integration, and AI-powered recommendation systems.

Estimated Time: 5 minutes

```quiz-config
    passing: 80
    badge: images/badge.png
```

### Objectives

* Pass the quiz and get your "Zero to Hero: RAG to Agents" skills badge!

### Quiz Questions

```quiz score
Q: What is the main purpose of the RAG retriever in Section 1?
* To retrieve semantically relevant Prism chunks using in-database vector embeddings and vector distance
- To let the LLM choose arbitrary database tables to query
- To store long-term memories for later conversations
- To format the final incident report as markdown
> The retriever grounds the model by selecting relevant database-backed context before the LLM generates an answer.

Q: What does the raw RAG implementation demonstrate before the LangChain version is introduced?
- RAG requires an agent framework to work
- RAG automatically performs multi-step planning
- RAG removes the need to inspect retrieved context
* RAG is mainly retrieval, prompt assembly, and an LLM call
> The raw version makes the moving parts visible, which helps learners understand what a framework simplifies later.

Q: What is the key tradeoff of a LLM-driven workflow?
* It is predictable and auditable, but less adaptive than an agent
- It is fully autonomous, but impossible to trace
- It avoids prompts entirely, but requires manual SQL every time
- It replaces retrieval quality with model memory
> The workflow follows a fixed path with bounded LLM calls, which improves control but limits flexibility when the problem changes.

Q: Why do tool signatures and docstrings matter?
- They change the physical database schema used by the tool
* They define the model-facing interface that helps the LLM decide when and how to call a tool
- They automatically validate every SQL result returned by Oracle
- They prevent the framework from executing tool calls
> The LLM sees the tool name, inputs, and description, so clear interfaces improve tool selection and usage.

Q: What makes the unified query important?
- It moves data into a separate vector database for faster retrieval
- It asks the LLM to generate SQL without constraints
- It replaces the need for asset metadata
* It combines relational, JSON, graph, and vector evidence in one Oracle-backed SQL call
> The unified query shows how Oracle AI Database can provide rich incident context without, CDC, synchronization, ETL, or separate data stores.

Q: What role does LangGraph play in the lab?
- It creates the original PRISM seed data
- It replaces Ollama as the LLM runtime
* It implements the agent reasoning loop where the model can answer or request allowed tool calls
- It converts markdown quiz blocks into notebook cells
> LangGraph provides the state graph, tool loop, checkpointing, and memory wiring used by the agent.

Q: Why does the notebook use both short-term and long-term memory for the agent?
* Short-term memory preserves the current thread, while long-term memory stores durable recallable knowledge across runs
- Short-term memory stores SQL tables, while long-term memory stores only Python variables
- Short-term memory replaces retrieval, while long-term memory disables tool calls
- Both memories are temporary and disappear when the notebook kernel stops
> The notebook separates conversation state from persistent semantic memory so the agent can continue a thread and recall prior incident decisions.

```

## Acknowledgements
* **Authors** - Kirk Kirkconnell
* **Last Updated By/Date** - Kirk Kirkconnell, January 2026
