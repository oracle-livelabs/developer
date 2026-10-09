# Introduction

## About this Workshop

**Agent Memory: Introduction to context and memory engineering**

Build agent memory as a first-class, end-to-end capability on Oracle AI Database. Using Python, LangChain, Ollama and Oracle Agent Memory (OAMP), you will move from a single LLM call to a memory aware agent with persistent conversation, cross-session recall and reusable procedures.

The notebook makes each added capability visible: first supply evidence to a bare model, remove that evidence in a fresh call, add a tool-using loop, and finally connect that loop to durable memory. You will also explore offloading, compaction, vector retrieval, context budgets, knowledge refinement and human review of a write.

Estimated Workshop Time: 150–180 minutes

The notebook activities account for this estimate. Allow about 5 minutes to connect and 10–15 minutes for the closing quiz. Model-response times and discussion can change the pace.

### The inventory story

Imagine working for **Everyday Goods**, an online shop that sells household items.

A promotion is making ceramic mugs sell quickly. The shop wants to buy more mugs before it runs out.

**Alice, the inventory planner**, checks what needs replenishing and requests permission to buy more stock.

**The purchasing manager** decides the approved quantity.

**A human buyer** would then send an order to the supplier.

These are separate steps: permission to buy is not the same as actually buying.

At the end of Alice's shift, the next planner needs a **handover**: a short update explaining where the work stands, what evidence supports it, and what remains to be done.

The next planner is not Bob in this example—Bob handles an unrelated tote-bag returns case used later to illustrate relevant versus irrelevant memory.



Here is the complete mug story, in order:

| Stage | What happened | What the next planner should understand |
|---|---|---|
| 1. Request | Alice proposes buying **80 additional mugs** and records request **PO-1048** | This is a proposal awaiting approval, not an order |
| 2. Decision | The manager approves **120 additional mugs** under the same request | The approved quantity replaces the earlier proposal; do not add 80 and 120 together |
| 3. Work still pending | **No supplier order has been submitted**, and no delivery date is confirmed | Approval exists, but purchasing has not yet happened |
| 4. Shift handover | Another planner opens a new conversation | They need the latest decision without relying on Alice's previous chat being open |

The fixture does not say why the manager chose 120, how many mugs are currently on the shelf, or who has been assigned to submit the order.

We should not invent those details.

A few terms used throughout the notebook:

| Term | Plain-language meaning in this lab |
|---|---|
| **Replenishment / reorder** | Buying more of a product to restore stock |
| **SKU-MUG-01** | The product code for the ceramic mug; SKU means stock-keeping unit |
| **RESTOCK-101** | The identifier for this replenishment case |
| **PO-1048** | The fixture's purchase-request reference; despite the prefix, it is **not proof of a submitted supplier order** |
| **SOP** | Standard operating procedure: an approved checklist for how work should be done |
| **Handover** | An update that lets another person continue the work without reconstructing the entire history |


**What we will build:** an assistant that helps prepare that handover from the right evidence.

We begin with a model reading notes, then add tools, then give the same agent loop access to durable Oracle memory.

**Business objective:** help the next planner answer “How many mugs were approved, which request records the approval, and has anyone sent the order?” The lab uses synthetic notes, not a live shop or purchasing system. Humans remain responsible for purchasing.

**Outcome of Part 1:** explain why this task needs the latest decision, its history and the reusable process—not just a fluent answer.

The process diagram in Part 1 of the notebook shows these separate steps before any agent is introduced.

### Why this process needs better context and memory

The problem is not that someone cannot read “120.” It is that the answer is spread across updates written at different times, and **the next person must decide which statements are still current.**

Imagine finding Alice's original 80-mug request first, then seeing “approved” in a later message.

Without reading the entire update, you could order the wrong quantity or assume an order has already been sent.

Even after getting the answer right, the next shift has to repeat the same search.

| Friction in the current process | Why it matters | What our assistant will add |
|---|---|---|
| The request, approval and order status are in separate notes | A new planner must find and connect all three before acting | Recall the earlier notes and a reviewed current fact in one conversation |
| Both 80 and 120 appear in the history | The original proposal can be mistaken for the current approved quantity | Keep the proposal as history and explicitly mark the approval as its replacement |
| “Approved” is mistaken for “ordered” | Someone may wait for a delivery that was never arranged | Preserve the explicit statement that no supplier order has been submitted |
| Long worksheets mix useful evidence with repeated historical rows | Copying everything into a chat makes the important update harder to find | Store the full worksheet, use a short reference and retrieve detail when needed |
| Each planner writes the same handover checklist from scratch | Useful lessons are lost between cases | Save a reviewed reusable procedure for future handovers |
| A persuasive draft names an owner or action without evidence | A suggestion can be mistaken for an assignment or completed work | Label unknowns and require human review before saving an approved handover |

### See the learning journey

The notebook's opening diagram follows four stages: a bare LLM with case evidence, a fresh call without that evidence, a transient tool-using loop, and a memory aware agent. Its labelled arrows show which requests, observations and stored records move between components.

These are successive learning stages, not a claim that the model's weights improve. The application changes which evidence the model can use.

### Overview of the notebook Parts

| Part | Build on what you already have | What you can explain afterward |
|---|---|---|
| 1 | Understand the current inventory process | Why shift-to-shift knowledge gets lost |
| 2 | Map that problem onto an agent stack | Where context, tools and durable memory belong |
| 3 | Meet the provided LiveLabs services and load the case | How the notebook, model server and database work together |
| 4 | Run a bare model, then remove its context | Why a fluent answer is not persistent knowledge |
| 5 | Add a tool-using agent loop | Why tools alone do not retain prior experience |
| 6 | Store episodes, facts and procedures in Oracle | How knowledge is retained and refined |
| 7 | Connect the existing loop to OAMP | How a fresh shift recalls an earlier decision |
| 8 | Inspect, rank and curate retrieved information | How context quality and retrieval order are engineered |
| 9 | Review actions, reuse lessons and retire records | How a memory lifecycle supports safer operation |

### Context engineering and memory engineering

**Context engineering is a systematic approach to filling the LLM's context window with curated, highly relevant information for the problem domain and the current task.** Its goal is to increase the **signal-to-noise ratio** at each turn: more information that helps the decision, less stale, irrelevant, redundant or misleading material.

**Memory engineering is the design of mechanisms that let an agent retain, reuse, refine and recall information effectively across turns, sessions and tasks.** It governs what becomes durable knowledge, how that knowledge evolves, and how it can be brought back into working context when needed.

An **agent loop** is the repeated cycle of assembling context, asking the model for its next step, executing an allowed tool, adding the result as an observation, and continuing until the task finishes or a limit is reached. Part 5 makes this cycle visible in code.

### The four memory roles

| Memory role | What it answers | Representation in this notebook | Lifetime |
|---|---|---|---|
| **Working memory** | What information is available for this reasoning step? | The **LLM's context window**, populated with instructions, the current question, selected messages, retrieved facts and tool results | The current model invocation; carried forward only if the application supplies it again |
| **Episodic memory** | What happened, and in what order? | Stored shift messages, the old reorder worksheet, summaries and workflow metadata | Oracle records that can be recalled across shifts |
| **Semantic memory** | What do we currently know? | The approved quantity of 120, request PO-1048, preferences, and links to the superseded proposal of 80 | Durable knowledge with status, provenance and retention |
| **Procedural memory** | How should the next similar task be handled? | Approved replenishment SOPs and a reviewed reusable handover checklist | Durable guidelines reused across cases |

Working memory is the information in the current context window. Durable records influence an answer only when the application retrieves them and includes them in a model request.

### Reference architecture

The reference architecture in the notebook combines Python and LangChain for the agent loop, Ollama for model inference, and Oracle Agent Memory for durable recall. Oracle AI Database stores the records and runs embeddings and vector retrieval. Selected evidence enters the model's working context; a separate human-review step controls the optional handover write.

| Capability | Visible outcome |
|---|---|
| Background extraction | Check SDK errors and unsuccessful operations, then require fresh memories for each ingestion |
| Post-extraction linking | Separate inferred relationships from explicit review |
| Memory evolution and graph search | Current approval supersedes a historical proposal |
| Structured message content | Read `TextContent.text` to recover source messages |
| Record/thread listing | Show stored procedures and recover a conversation |
| Bounded vector retrieval | Preserve returned order in pandas tables |
| LLM pruning | Compare returned evidence with the unpruned result |
| Context cards and summaries | Budget retrieved records separately from recent messages, summaries and the final prompt |
| Observability | Count operation events without recording private content |
| Retention and cleanup | Contrast expiration with removal of scoped live rows |

### Objectives

- Explain the business problem before choosing agent components.
- Compare a bare model, a transient tool loop and a memory aware agent using the same question.
- Retain messages and extract typed memories while separating extraction from verification.
- Refine an approved fact, preserve its history and retrieve relevant evidence with bounded graph and vector search.
- Engineer working context with offloaded sources, summaries, pruning and context cards.
- Reuse a reviewed procedure across cases without implying that the LLM was retrained.
- Explain why application scopes are not authorization, approval is not execution, and expiration is not verified erasure.

### A guided workshop, not a coding test

Work through **17 numbered TODOs** in `notebook_student_ollama.ipynb` in the provided JupyterLab environment. Each exercise has an explanation and expandable hints. Consult the matching `notebook_complete_ollama.ipynb` whenever useful. The aim is a well-rounded understanding of the design and trade-offs, not memorized syntax.

### Prerequisites

- Access to the LiveLabs reservation and its provided JupyterLab runtime.
- Basic Python knowledge and familiarity with running database queries.
- Willingness to inspect actual results, including unsupported model claims.

The workshop provides the database account, embedding model, Python packages and Ollama service. Learners use those services rather than installing or provisioning them in this notebook.

### Boundaries of this lab

The data is synthetic. The agent can retrieve evidence and draft a handover; it cannot submit supplier orders or change stock. A host-controlled human-review gate handles the optional handover write. Alice and Bob are application labels using one workshop database account, not separate authenticated database identities.

Automatic extraction and linking do not prove truth. A drained background queue can include failed jobs, so the notebook checks SDK error logs and unsuccessful API completion events, and requires memories tagged to each ingestion. These checks establish processing evidence, not factual accuracy. Context-card token budgets limit formatted relevant records, not the entire card or model request. The lab demonstrates deliberate review, inspectable retrieval and scoped cleanup; it does not promise automatic contradiction resolution, crash-resumable execution or regulator-grade deletion evidence.

## Learn More

- [Oracle Agent Memory 26.8 release notes](https://docs.oracle.com/en/database/oracle/agent-memory/26.8/guide/whats-new.html)
- [OAMP memory API](https://docs.oracle.com/en/database/oracle/agent-memory/26.8/guide/api/agentmemory.html)
- [OAMP model interfaces](https://docs.oracle.com/en/database/oracle/agent-memory/26.8/guide/api/models.html)
- [LangChain agent factory](https://reference.langchain.com/python/langchain/agents/factory/create_agent)
- [Ollama documentation](https://docs.ollama.com/)
- [Ollama compatible API](https://docs.ollama.com/api/openai-compatibility)

## Acknowledgements

* **Author** — Richmond Alake
* **Last Updated By/Date** — Richmond Alake, October 2026
