# Lab 4: Build Retrieval and RAG

## Introduction

In this lab, you will turn the research corpus into a working retrieval and question-answering system. You will compare lexical, semantic, hybrid, and graph retrieval in Oracle AI Database, then use the retrieved papers as grounded context for a RAG pipeline backed by the OpenAI Responses API.

This is the point where the Oracle AI Database features start working together as one application flow. Instead of treating vector search, Oracle Text, and property graph as isolated demos, you will compare them on the same data and then feed the best results into generation.

Estimated Time: 20 minutes

### Objectives

In this lab, you will:

- run keyword retrieval with Oracle Text
- run vector, hybrid, and graph retrieval with Oracle AI Database
- compare retrieval outputs side by side
- configure the OpenAI client
- execute the end-to-end RAG pipeline

## Task 1: Run the Retrieval Sections

This task gives you the baseline retrieval behavior of the system. Running the modes in sequence makes it easier to see how each Oracle feature ranks the same corpus before generation is added.

1. Move to the retrieval section of the workshop code.

2. Run the retrieval sections in this order:

    - `4.1 Text Based Retrieval`
    - `4.2 Vector Based Retrieval`
    - `4.3 Hybrid Retrieval`
    - `4.4 Graph-Based Retrieval`

3. Use the same search phrase across each retrieval mode for your first pass. This lets you compare result quality without changing the input variable.

    A representative sequence from the notebook looks like this:

    ```python
    <copy>
    SEARCH_TEXT_KEYWORDS = "optimization"

    keyword_rows, keyword_cols = keyword_search_research_papers(conn, SEARCH_TEXT_KEYWORDS)
    vector_rows, vector_cols = vector_search_research_papers(conn, embedding_model, SEARCH_TEXT_KEYWORDS, top_k=5)
    hybrid_rows, hybrid_cols, _ = hybrid_search_research_papers_pre_filter(
        conn, embedding_model, SEARCH_TEXT_KEYWORDS, top_k=5, show_explain=False
    )
    graph_rows, graph_cols = graph_search_research_papers(
        conn, embedding_model, SEARCH_TEXT_KEYWORDS, top_k=5, seed_k=20
    )
    </copy>
    ```

4. Review the side-by-side comparison table before you change the search phrase.

## Task 2: Inspect the Retrieval Functions

This task explains why Oracle supports several retrieval styles over the same dataset. Each helper function uses a different access path, and understanding those paths will help you decide which mode belongs in a real application.

1. Review the retrieval helper functions as you execute them:

    - `keyword_search_research_papers`
    - `vector_search_research_papers`
    - `hybrid_search_research_papers_pre_filter`
    - `hybrid_search_research_papers_postfilter`
    - `hybrid_rrf_search`
    - `graph_search_research_papers`

2. Pay attention to the role of each retrieval style:

    - keyword retrieval rewards exact lexical matches
    - vector retrieval rewards semantic similarity
    - hybrid retrieval combines both approaches
    - graph retrieval expands through author and similarity relationships

3. Notice that each style runs over the same Oracle-resident corpus.

    For example, the vector retrieval helper uses Oracle `VECTOR_DISTANCE` over the `research_papers` table:

    ```sql
    <copy>
    SELECT
        arxiv_id,
        title,
        ROUND(1 - VECTOR_DISTANCE(embedding, :q, COSINE), 4) AS similarity_score
    FROM research_papers
    ORDER BY similarity_score DESC
    FETCH APPROX FIRST 5 ROWS ONLY WITH TARGET ACCURACY 90;
    </copy>
    ```

4. After the baseline run, test at least one additional research topic and compare how the rankings change.

## Task 3: Configure API Access and Validate the Client

This task connects database retrieval to model generation. Before you ask the model to synthesize research findings, you need to know that the API credentials are valid and that the OpenAI client can execute a request successfully.

1. Move to the RAG section.

2. Enter your `OPENAI_API_KEY` when prompted by the credential helper.

    If you need to set it manually in the notebook session, use:

    ```python
    <copy>
    import os
    from getpass import getpass

    os.environ["OPENAI_API_KEY"] = getpass("OpenAI API Key: ")
    OPENAI_MODEL = "gpt-5"
    </copy>
    ```

3. Run the OpenAI smoke test before you define the full RAG flow.

4. Do not continue until the client returns a successful response.

## Task 4: Run the End-to-End RAG Pipeline

This task is the first full application pass. Retrieval now feeds generation, so answer quality depends on both the Oracle retrieval mode and the prompt that packages those results for the model.

1. Define the reusable RAG function that:

    - selects a retrieval mode
    - formats the retrieved rows into grounded context
    - calls the OpenAI Responses API
    - returns a synthesized answer

    The notebook then calls the pipeline with a query like this:

    ```python
    <copy>
    answer = research_paper_assistant_rag_pipeline(
        conn=conn,
        embedding_model=embedding_model,
        user_query="What are effective optimization techniques for large language models?",
        top_k=5,
        retrieval_mode="hybrid",
        show_explain=False
    )

    print(answer)
    </copy>
    ```

2. Run the end-to-end RAG example with the default hybrid retrieval path first.

3. Confirm the notebook:

    - retrieves relevant papers from Oracle
    - formats the context
    - sends the grounded prompt to OpenAI
    - returns a synthesized answer

4. Repeat the same question with at least one alternate retrieval mode such as `vector` or `graph`.

5. Compare the answer quality and grounding detail across the retrieval modes before you move on.

## Learn More

- [OpenAI Responses API](https://platform.openai.com/docs/guides/responses)
- [Oracle AI Database Free](https://www.oracle.com/database/free/get-started/)

## Acknowledgements

* **Author** - Richmond Alake
* **Contributor** - Linda Foinding
* **Last Updated By/Date** - Linda Foinding, April 2026
