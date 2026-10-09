# Quiz

## Introduction

Check your understanding of **Agent Memory: Introduction to context and memory engineering**. These questions follow the notebook's agent loop, memory lifecycle, context engineering and action boundaries.

Estimated Time: 10–15 minutes

```quiz-config
    passing: 80
    badge: images/badge.png
```

### Objectives

- Distinguish working context from durable memory.
- Explain what the model, agent loop, memory package and database each do.
- Recognize the limits of extraction, application scopes, human approval and deletion evidence.

This is a learning check, not a coding test or professional certification. You may refer to either notebook and revisit the explanations. The passing threshold is 80 percent across 18 questions.

### Quiz Questions

```quiz score
Q: Why can a fresh LLM call fail to recall the approved inventory quantity even though an earlier call answered correctly?
* The new request does not automatically include the previous case evidence in its context window
- Oracle has necessarily deleted the case
- Every model call retrains the model and replaces the old facts
- The quantity becomes available only when the prompt is longer
> Context engineering selects and structures the evidence for each turn. A previous response does not automatically become durable, recalled case knowledge.

Q: Which sequence describes the agent loop used in the notebook?
- Generate an answer once, then save every word forever
* Assemble context, ask the model for a next step, execute an allowed tool, add its observation and repeat or finish
- Let the model run arbitrary SQL until a query succeeds
- Train model weights directly from the inventory tables
> The loop coordinates model decisions and host-executed capabilities. Adding a tool loop alone does not make conversation persist across sessions.

Q: Where are the notebook's embedding vectors computed?
- Inside Ollama using the chat model
- Inside the browser
* Inside Oracle AI Database using the imported embedding model
- By LangChain by counting words in the prompt
> OracleDBEmbedder uses the database provider. Ollama handles language generation, extraction and other model tasks; it is not the embedding service in this lab.

Q: What does a user label and a thread ID represent in this workshop?
- A separate authenticated Oracle account for every person
- A replacement for database privileges
- A guarantee that a person cannot request another user's records
* Application scope labels that organize whose information and which conversation to retrieve
> User and thread scopes organize relevance. The lab uses one database account; the labels are not an authentication or authorization boundary.

Q: What is memory extraction, and what must learners still review?
* Deriving reusable typed records from stored conversation; their accuracy and relevance still need review
- Automatically proving that every statement in a conversation is true
- Copying the entire database into the current context window
- Deleting source messages as soon as facts have been generated
> Extraction can identify facts and preferences, but these are model-derived interpretations. Waiting for background work also includes failed jobs: check error logs and unsuccessful API operations, require memories from the current ingestion, then review their accuracy against original messages and provenance.

Q: What does the explicit supersedes link demonstrate after a reviewer confirms the updated approval?
- The original proposal is physically erased from all storage
* The old target becomes invalid for current direct recall while its history is retained
- Both quantities must be added together
- The model is authorized to place the supplier order
> The reviewed current fact supersedes the older target. Refining current knowledge need not destroy historical evidence, and it grants no business-action authority.

Q: Why can the old proposal appear as linked context while invalid direct search results are excluded?
- The filter is disabled whenever the model asks for more facts
- A linked record is automatically current and authoritative
* Bounded graph expansion preserves the relationship to history separately from current direct evidence
- Every vector search returns every record in the store
> The lab inspects the direct current fact and its linked historical proposal, including relationship direction and lifecycle status. History should not be presented as a competing current approval.

Q: What do result limits and token budgets contribute to memory recall?
- They guarantee that every retrieved fact is correct
- They fine-tune the model on the highest-ranked result
- They remove the need to inspect returned rankings
* They bound how much retrieved evidence can enter the working context
> Retrieval limits help manage a finite context window. They do not prove truth or relevance; the notebook's result tables make those judgments inspectable.

Q: How do offloading and compaction reduce context noise in the notebook?
* Keep the full report as a retrievable source, pass a reference, and summarize earlier conversation within a budget
- Delete all original messages and keep only the latest model answer
- Paste every historical worksheet row into every request
- Increase the context window until all source selection becomes unnecessary
> Offloading preserves access to detail without carrying it all in the prompt. Compaction creates a shorter representation that must be checked against its sources.

Q: Who chooses the user, record-type and source scopes exposed by the inventory recall tool?
- The model may replace them with any scope it wants
* The host application fixes them; the model supplies a bounded search question
- The browser chooses them based on which notebook tab is active
- No scope is needed when embeddings are stored in Oracle
> The application exposes a narrow read capability and keeps scope selection outside the model. Production systems additionally need real authorization.

Q: What establishes cross-session recall in the memory aware agent experiment?
- The model says it remembers Alice
- The notebook silently pastes all the original notes into the new question
* A fresh question triggers a real memory-tool call that retrieves the earlier approved fact
- The framework automatically changes the model's weights
> Learners inspect the actual tool observation and evidence-backed answer. The application reconstructs context from durable records instead of assuming the model retained the previous conversation.

Q: What does LLM-based result pruning change in this lab?
- Which original records exist in the database
- The database account's privileges
- Which procedures are officially approved
* Which retrieved candidates are retained for the current context
> Pruning selects context from retrieved evidence. It is not deletion or fact verification, and the extra model work has a cost.

Q: What does the notebook's event listener record?
* Operation components and event-name counts without logging private memory content
- All passwords and model request headers
- A regulator-grade proof of every physical storage operation
- A complete production audit and distributed trace
> These are lightweight local diagnostics. Event counts help inspect behavior, but they are not a substitute for authenticated audit records or production monitoring.

Q: What is the role of a context card when the next shift resumes the case?
- To expose every stored record to the model
* To assemble useful recent conversation and relevant memory, with a separate budget for retrieved records
- To mark every automatically extracted fact as verified
- To replace source records permanently with a single summary
> Working context is assembled for the current task. The context-card token budget limits formatted relevant records, not the entire card or final prompt. Recent messages, summary context, instructions, the question and the answer allowance also need space; source material remains available for checking.

Q: Why does the lab deliberately read Bob's scope through another memory client using the same database account?
- To demonstrate that database privileges no longer matter
- To show that all production conversations should be shared
* To demonstrate that changing a relevance filter is not authenticating as a different person
- To prove that the model cannot request unrelated data
> Both clients have the same database authority. Scope filters organize recall, so the application must not mistake them for multi-user security enforcement.

Q: What permits the optional handover write in Part 9?
- The model includes the word approved in its answer
- The purchase request exists
- The agent has called a read-only tool
* A host-controlled human approval bound to the exact handover draft and run
> Generating a draft and authorizing a write are separate actions. The unapproved call is blocked before database I/O, and approving the handover does not submit a supplier order.

Q: What improves when a reviewed handover lesson is saved and reused for another product?
* The agent's retrievable procedural knowledge, not the model's weights
- The model's weights through automatic training
- The authority to order any product without approval
- The guarantee that future answers cannot be wrong
> Memory engineering retains, reuses, refines and recalls useful experience. A reviewed guideline can improve a later workflow without becoming a case-specific fact or retraining the model.

Q: What can expiration and the scoped cleanup counts establish?
- That every backup, replica, log and physical storage block has been erased
* Expiration can affect retrieval eligibility, while zero scoped counts show no matching live rows in the inspected tables
- That a regulator has certified deletion
- That all shared procedures in every workshop run were removed
> TTL is not verified erasure. The cleanup checks only the current run's live records and chunks; it does not provide evidence about backups or storage media.
```

## Continue Learning

If a question was unclear, revisit the matching TODO or memory-lifecycle section in the notebook. Open `notebook_complete_ollama.ipynb` in the provided JupyterLab environment to connect the explanation to runnable Python and recorded results.

## Acknowledgements

* **Author** — Richmond Alake
* **Scaffold reference** — developer workshop pattern by Kirk Kirkconnell
* **Last Updated By/Date** — Richmond Alake, October 2026
