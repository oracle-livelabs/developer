# Lab 3: Load and Index the Research Dataset

## Introduction

In this lab, you will build the data foundation for the research assistant. You will stream research-paper metadata from Hugging Face, convert the paper text into vector embeddings, load the records into Oracle AI Database, and create the relational, text, vector, and graph structures required by the retrieval pipeline.

This is where Oracle AI Database starts to show its converged value. By the end of the lab, one Oracle schema will support text search, semantic search, and graph traversal over the same research corpus.

Estimated Time: 25 minutes

### Objectives

In this lab, you will:

- stream a research-paper dataset from Hugging Face
- generate normalized embeddings with Sentence Transformers
- create Oracle tables and indexes for text and vector retrieval
- load author and similarity edges
- register a SQL Property Graph

## Task 1: Stream and Prepare the Research Dataset

This task creates the raw corpus for the application. You will pull paper metadata from Hugging Face, normalize the fields you need, and shape the text for downstream embedding and retrieval.

1. Move to the data-loading section of the workshop code and begin with the Hugging Face streaming step.

2. Load the ArXiv dataset in streaming mode so you do not need to download the full corpus up front.

    The first key cell should look like this:

    ```python
    <copy>
    import pandas as pd
    from datasets import load_dataset

    ds_stream = load_dataset("nick007x/arxiv-papers", split="train", streaming=True)
    </copy>
    ```

3. Run the sampling step that collects the first 1,000 papers and combines title plus abstract into one text field.

4. Confirm that you now have a working in-memory sample before you continue.

5. Inspect a few rows so you can verify that titles, abstracts, and authors were parsed correctly.

## Task 2: Generate Embeddings

This task converts each paper into a dense vector representation. Those vectors make semantic retrieval possible, so you want to confirm that the model loads correctly and that the generated embeddings are consistent in shape.

1. Move to the embedding-generation section and run the cells in order.

2. Load the embedding model:

    ```python
    <copy>
    from sentence_transformers import SentenceTransformer
    embedding_model = SentenceTransformer("nomic-ai/nomic-embed-text-v1.5", trust_remote_code=True)
    </copy>
    ```

3. Run the encoding step and wait until the process prints the final embedding shape.

4. Confirm that the DataFrame now contains an `embedding` column and that the embedding dimensionality is stable.

5. Keep the generated `dim` value. The Oracle `VECTOR` column definition must match it.

## Task 3: Create Tables, Indexes, and Graph Structures

This task materializes the corpus inside Oracle AI Database. You are creating one data model that supports several access patterns at once: relational storage, Oracle Text search, vector similarity search, and graph traversal.

1. Move to the schema-creation section.

2. Create the `research_papers` table with metadata columns plus a `VECTOR` column for embeddings.

    A representative table definition in the notebook looks like this:

    ```sql
    <copy>
    CREATE TABLE research_papers (
        arxiv_id    VARCHAR2(50) PRIMARY KEY,
        title       CLOB,
        abstract    CLOB,
        authors     CLOB,
        text        CLOB,
        embedding   VECTOR(768, FLOAT32)
    );
    </copy>
    ```

3. Create the HNSW vector index and the Oracle Text index so the same table can support semantic and lexical retrieval.

    ```sql
    <copy>
    CREATE VECTOR INDEX RP_VEC_HNSW
    ON research_papers(embedding)
    ORGANIZATION INMEMORY NEIGHBOR GRAPH;

    CREATE INDEX rp_text_idx
    ON research_papers(text)
    INDEXTYPE IS CTXSYS.CONTEXT;
    </copy>
    ```

4. Create the graph-support tables for authorship and similarity relationships.

5. Load the sampled paper rows into Oracle and wait for the insert process to complete.

6. Verify row counts before you continue. If the table is empty, stop here and fix the insert path first.

## Task 4: Build and Register the Graph Relationships

This task adds relationship context on top of the paper records. Instead of retrieving papers as isolated documents, you will link them by authorship and nearest-neighbor similarity, then register those relationships as a SQL Property Graph for later graph-based retrieval.

1. Build the graph relationships in this order:

    - `Load Author Edges`
    - `Load Similarity Edges`
    - `Register the Oracle SQL Property Graph`

2. Do not skip the graph registration step. The later graph retrieval section depends on the `RESEARCH_GRAPH` object being present.

    The graph registration section creates a property graph like this:

    ```sql
    <copy>
    CREATE OR REPLACE PROPERTY GRAPH RESEARCH_GRAPH
      VERTEX TABLES (
        research_papers KEY (arxiv_id),
        authors KEY (author_id)
      )
      EDGE TABLES (
        paper_authors
          KEY (edge_id)
          SOURCE KEY (paper_id) REFERENCES research_papers(arxiv_id)
          DESTINATION KEY (author_id) REFERENCES authors(author_id),
        paper_similarities
          KEY (edge_id)
          SOURCE KEY (source_arxiv_id) REFERENCES research_papers(arxiv_id)
          DESTINATION KEY (target_arxiv_id) REFERENCES research_papers(arxiv_id)
      );
    </copy>
    ```

3. Confirm that the code reports:

    - author and edge counts
    - similarity edge counts
    - property graph creation success

## Learn More

- [Hugging Face Datasets](https://huggingface.co/docs/datasets)
- [Sentence Transformers](https://www.sbert.net/)

## Acknowledgements

* **Author** - Richmond Alake
* **Contributor** - Linda Foinding
* **Last Updated By/Date** - Linda Foinding, April 2026
