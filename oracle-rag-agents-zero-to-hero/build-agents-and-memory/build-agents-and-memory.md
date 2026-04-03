# Lab 5: Build Agents and Memory

## Introduction

In this lab, you will extend the RAG assistant into an agentic system. You will add Oracle-backed tools, give the assistant explicit routing behavior, introduce specialist agents coordinated by an orchestrator, and persist both chat history and session memory in Oracle AI Database.

This final lab shows how Oracle AI Database can support retrieval, orchestration context, and long-lived memory in one stack. It moves the solution from a single request-response pipeline toward a more production-ready research assistant pattern.

Estimated Time: 25 minutes

### Objectives

In this lab, you will:

- install the OpenAI Agents SDK dependencies in the active kernel
- create a baseline research assistant
- expose Oracle retrieval functions as callable tools
- orchestrate multiple agents
- store chat history and session memory in Oracle

## Task 1: Install the Agent Runtime

This task prepares the environment for agent execution. The workshop uses the OpenAI Agents SDK, so you need the correct packages installed in the same kernel that already holds the database and retrieval code.

1. Move to the agent section of the workshop code.

2. Install the OpenAI and OpenAI Agents packages in the active kernel.

    ```python
    <copy>
    %pip install -Uq --no-cache-dir openai openai-agents
    </copy>
    ```

3. Print the resolved package versions and confirm the imports succeed.

    ```python
    <copy>
    import sys
    import importlib.metadata as md

    print("Python executable:", sys.executable)
    print("openai version:", md.version("openai"))
    print("openai-agents version:", md.version("openai-agents"))
    </copy>
    ```

4. If the environment reports import errors after installation, restart the kernel and rerun the package install step before you continue.

## Task 2: Create a Baseline Agent and Add Retrieval Tools

This task shows the progression from a plain assistant to a tool-using assistant. Starting without tools gives you a baseline. Each added tool then makes the assistant more grounded and more capable of retrieving evidence from Oracle instead of answering from general model knowledge alone.

1. Create the baseline research assistant with no tools first.

2. Test the baseline assistant with a direct research question so you have a control case.

3. Expose Oracle retrieval as a callable tool so the assistant can fetch research papers directly from the database.

    The tool section in the notebook starts with a pattern like this:

    ```python
    <copy>
    from agents.tool import function_tool

    @function_tool
    def get_research_papers(user_query: str, retrieval_mode: str = "hybrid", top_k: int = 5) -> str:
        rows, columns, _ = hybrid_search_research_papers_pre_filter(
            conn=conn,
            embedding_model=embedding_model,
            search_phrase=user_query,
            top_k=top_k,
            show_explain=False
        )
        return f"Retrieved {len(rows)} papers for: {user_query}"
    </copy>
    ```

4. Add the second tool for past research conversations.

5. Strengthen the agent instructions so routing behavior is explicit rather than implicit.

6. After each stage, inspect the raw responses so you can see when tool calls begin and how the instruction policy changes routing behavior.

## Task 3: Run Multi-Agent Orchestration

This task shifts from one assistant with tools to a coordinated multi-agent pattern. The orchestrator delegates focused jobs to specialists, then a final synthesizer merges the results into one response. That is closer to a production agent design than a single monolithic prompt.

1. Define the specialist agents used in the orchestration flow:

    - research-paper retrieval specialist
    - past-conversation retrieval specialist
    - orchestrator
    - final synthesizer

2. Execute the asynchronous orchestration workflow and submit at least one research question.

    ```python
    <copy>
    result = await Runner.run(
        orchestrator_agent,
        "Summarize recent optimization techniques for large language models."
    )

    print(result.final_output)
    </copy>
    ```

3. Confirm that the orchestrator gathers intermediate evidence before the synthesizer produces the final answer.

4. Review the intermediate orchestration output, not just the final answer, so you can see how the tool chain behaved.

## Task 4: Persist Chat History and Session Memory in Oracle

This task turns the agent flow into a stateful application. Oracle stores both conversational history and explicit session items. That lets the assistant maintain continuity across turns and gives you direct control over forgetting and reset behavior.

1. Create the `chat_history` table and supporting index in Oracle.

    ```python
    <copy>
    with conn.cursor() as cur:
        cur.execute("""
            CREATE TABLE chat_history (
                id VARCHAR2(100) PRIMARY KEY,
                thread_id VARCHAR2(100) NOT NULL,
                role VARCHAR2(20) NOT NULL,
                message CLOB NOT NULL,
                timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cur.execute("""
            CREATE INDEX idx_thread_timestamp
            ON chat_history(thread_id, timestamp)
        """)
        conn.commit()
    </copy>
    ```

2. Start a short chat session and verify the thread-aware history retrieval works across at least two prompts.

3. Implement the custom `OracleSession` class used for persistent session memory.

    The notebook creates an Oracle-backed session object like this:

    ```python
    <copy>
    session = OracleSession(
        session_id="conversation_123",
        connection=conn,
        table_name="chat_history"
    )
    </copy>
    ```

4. Run the persistent memory example and test the memory controls explicitly:

    - run the first memory turns
    - remove prior items with `pop_item`
    - clear the session with `clear_session`
    - verify the assistant behavior changes after the reset

## Task 5: Review the Final State

This task is the end-of-lab checkpoint. You will confirm that the retrieval, RAG, agent, orchestration, and memory layers all executed successfully, so you leave with a complete working reference instead of a partially run environment.

1. Save your completed work.

2. Before you finish, confirm that you successfully ran:

    - at least one retrieval mode
    - the end-to-end RAG pipeline
    - a tool-using agent flow
    - the orchestrated agent workflow
    - the Oracle-backed memory example

3. Keep this environment as a working reference for future RAG and agent experiments.

## Learn More

- [OpenAI Agents SDK](https://openai.github.io/openai-agents-python/)
- [Oracle AI Developer Hub notebooks](https://github.com/oracle-devrel/oracle-ai-developer-hub/tree/main/notebooks)

## Acknowledgements

* **Author** - Richmond Alake
* **Contributor** - Linda Foinding
* **Last Updated By/Date** - Linda Foinding, April 2026
