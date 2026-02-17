# Lab 1: Vector Search Fundamentals

## Introduction

In this lab, you'll learn the foundations of vector search in Oracle AI Database 26ai. You'll generate vector embeddings using OCI Generative AI, store them alongside your data, and explore three powerful search strategies: keyword search, vector similarity search, and hybrid search.

**Estimated Time:** 45 minutes

### Objectives

In this lab, you will:

- Connect to Oracle Autonomous Database from a Jupyter notebook
- Verify OCI Generative AI credentials
- Create a table with a VECTOR column
- Generate embeddings using OCI Generative AI (Cohere embed model)
- Create an HNSW vector index for fast similarity search
- Perform keyword search using Oracle Text
- Perform vector similarity search using VECTOR_DISTANCE
- Execute hybrid search combining both approaches

### Prerequisites

This lab assumes you have:

- Completed the Introduction
- Access to the LiveLabs sandbox environment

**Note:** All OCI credentials, database connections, and Python packages are pre-configured in the sandbox.

## Task 1: Connect to Oracle ADB

In this task, you'll establish a connection to Oracle Autonomous Database using the `oracledb` Python driver.

1. Open a new Jupyter notebook in your sandbox environment.

    <!-- TODO: Add screenshot of Jupyter environment -->
    ![Jupyter Environment](../images/lab1/jupyter-environment.png " ")

2. In the first cell, import the required libraries and establish the database connection:

    ```python
    <copy>
    import oracledb
    import os

    # Connection parameters are pre-configured in the sandbox environment
    username = os.environ.get("DB_USER", "ADMIN")
    password = os.environ.get("DB_PASSWORD")
    dsn = os.environ.get("DB_DSN")

    # Establish connection
    connection = oracledb.connect(user=username, password=password, dsn=dsn)
    print(f"Connected to Oracle Database: {connection.version}")
    </copy>
    ```

3. Run the cell. You should see output confirming the connection:

    ```
    Connected to Oracle Database: 26.0.0.0.0
    ```

    <!-- TODO: Add screenshot of successful connection -->
    ![Connection Success](../images/lab1/connection-success.png " ")

## Task 2: Verify OCI Generative AI Credentials

The sandbox environment has OCI Generative AI credentials pre-configured. Let's verify they are available.

1. Create a new cell and run the following code to verify credentials:

    ```python
    <copy>
    cursor = connection.cursor()

    # Verify that OCI GenAI credentials are configured
    # The sandbox has these pre-configured as 'OCI_GENAI_CRED'
    verify_cred_sql = """
    SELECT credential_name
    FROM user_credentials
    WHERE credential_name = 'OCI_GENAI_CRED'
    """

    cursor.execute(verify_cred_sql)
    result = cursor.fetchone()

    if result:
        print(f"OCI Generative AI credential '{result[0]}' is available")
    else:
        print("WARNING: OCI_GENAI_CRED not found - contact lab administrator")
    </copy>
    ```

2. You should see confirmation that the credential exists:

    ```
    OCI Generative AI credential 'OCI_GENAI_CRED' is available
    ```

    > **Note:** If you're running this outside the LiveLabs sandbox, you would need to create credentials using `DBMS_VECTOR_CHAIN.CREATE_CREDENTIAL()` with your OCI tenancy details.

## Task 3: Create Table with VECTOR Column

Now let's create a table to store our knowledge base with a VECTOR column for embeddings.

1. Run the following code to create the `knowledge_base` table:

    ```python
    <copy>
    # Create table for documents with vector embeddings
    create_table_sql = """
    CREATE TABLE knowledge_base (
        id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR2(200),
        content VARCHAR2(4000),
        category VARCHAR2(50),
        content_vector VECTOR(1024, FLOAT32),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
    """

    try:
        cursor.execute(create_table_sql)
        connection.commit()
        print("Table 'knowledge_base' created successfully")
    except oracledb.DatabaseError as e:
        error, = e.args
        if error.code == 955:  # Table already exists
            print("Table 'knowledge_base' already exists")
        else:
            raise
    </copy>
    ```

    **Key points:**
    - `VECTOR(1024, FLOAT32)` specifies a 1024-dimensional vector with 32-bit floating point values
    - This matches the output dimension of the Cohere embed-english-light-v3.0 model
    - The vector column stores the semantic representation of each document

## Task 4: Insert Sample Data

Let's populate our knowledge base with sample documents about Oracle Database and AI topics.

1. Run the following code to insert sample documents:

    ```python
    <copy>
    # Sample data about Oracle Database and AI topics
    sample_data = [
        ("Oracle AI Vector Search",
         "Oracle AI Vector Search enables semantic search capabilities directly within Oracle Database. It supports storing vector embeddings alongside relational data, enabling similarity searches using functions like VECTOR_DISTANCE with cosine, dot product, or Euclidean distance metrics.",
         "database"),

        ("Retrieval-Augmented Generation",
         "RAG combines retrieval systems with generative AI models. Instead of relying solely on the LLM's training data, RAG retrieves relevant context from a knowledge base and includes it in the prompt, significantly improving accuracy and reducing hallucinations.",
         "ai"),

        ("HNSW Vector Index",
         "Hierarchical Navigable Small World (HNSW) is a graph-based algorithm for approximate nearest neighbor search. Oracle Database supports HNSW indexes for vector columns, providing fast similarity search with configurable accuracy trade-offs.",
         "database"),

        ("OCI Generative AI Service",
         "Oracle Cloud Infrastructure Generative AI provides access to large language models and embedding models. The service offers Cohere embed models for generating vector embeddings and chat models for text generation, accessible via REST APIs or the OCI SDK.",
         "cloud"),

        ("Hybrid Search Strategies",
         "Hybrid search combines keyword-based search with vector similarity search. This approach leverages Oracle Text for full-text search and VECTOR_DISTANCE for semantic similarity, often producing better results than either method alone.",
         "database"),

        ("Autonomous Database",
         "Oracle Autonomous Database is a fully managed cloud database service. It includes built-in AI vector search capabilities, automatic indexing, and seamless integration with OCI Generative AI for building AI-powered applications.",
         "cloud"),

        ("Embedding Models",
         "Embedding models convert text into dense vector representations that capture semantic meaning. Similar concepts have vectors close together in the embedding space. Oracle supports Cohere, OpenAI, and ONNX embedding models.",
         "ai"),

        ("DBMS_VECTOR_CHAIN Package",
         "DBMS_VECTOR_CHAIN is an Oracle PL/SQL package for working with vector embeddings. It provides functions like UTL_TO_EMBEDDINGS for generating vectors, UTL_TO_CHUNKS for text chunking, and CREATE_CREDENTIAL for configuring AI service access.",
         "database"),

        ("Cosine Similarity",
         "Cosine similarity measures the angle between two vectors, ranging from -1 to 1. A value of 1 indicates identical direction (most similar), 0 indicates orthogonality (unrelated), and -1 indicates opposite directions. It's commonly used for text similarity.",
         "ai"),

        ("Document Chunking",
         "Document chunking splits large documents into smaller pieces suitable for embedding. Effective chunking strategies consider semantic boundaries, overlap between chunks, and the maximum token limits of embedding models.",
         "ai"),

        ("Oracle Text",
         "Oracle Text provides full-text search capabilities including the CONTAINS operator for keyword search, text indexing, and relevance scoring. It can be combined with vector search for powerful hybrid retrieval systems.",
         "database"),

        ("Vector Quantization",
         "Vector quantization reduces the memory footprint of vector indexes by compressing high-dimensional vectors. Oracle supports scalar and product quantization techniques, trading some accuracy for significant storage savings.",
         "database"),

        ("Prompt Engineering",
         "Prompt engineering involves crafting effective prompts for large language models. In RAG systems, this includes formatting retrieved context, providing clear instructions, and structuring the prompt to guide the model's response.",
         "ai"),

        ("JSON Duality Views",
         "JSON Duality Views in Oracle Database allow developers to work with relational data as JSON documents. This enables document-style access patterns while maintaining relational integrity, useful for AI applications that prefer JSON formats.",
         "database"),

        ("IVF Vector Index",
         "Inverted File (IVF) indexing partitions vector space into clusters for efficient approximate search. Oracle's IVF implementation allows configuring the number of partitions and probe depth to balance speed and recall.",
         "database")
    ]

    # Clear existing data and insert fresh
    cursor.execute("DELETE FROM knowledge_base")

    # Insert sample data
    insert_sql = """
    INSERT INTO knowledge_base (title, content, category)
    VALUES (:1, :2, :3)
    """

    cursor.executemany(insert_sql, sample_data)
    connection.commit()
    print(f"Inserted {len(sample_data)} sample documents")

    # Display the data
    cursor.execute("SELECT id, title, category FROM knowledge_base ORDER BY id")
    print("\nKnowledge Base Contents:")
    print("-" * 60)
    for row in cursor.fetchall():
        print(f"  [{row[2]:8}] {row[0]:3}: {row[1]}")
    </copy>
    ```

    <!-- TODO: Add screenshot of inserted data -->
    ![Sample Data Inserted](../images/lab1/sample-data.png " ")

## Task 5: Generate Vector Embeddings

Now we'll generate vector embeddings for each document using OCI Generative AI's Cohere embed model.

1. Run the following code to generate embeddings:

    ```python
    <copy>
    # Generate embeddings using OCI Generative AI
    # This uses the Cohere embed-english-light-v3.0 model (1024 dimensions)

    print("Generating embeddings for all documents...")
    print("This may take a moment...\n")

    update_embeddings_sql = """
    UPDATE knowledge_base kb
    SET content_vector = (
        SELECT TO_VECTOR(et.embed_vector)
        FROM TABLE(
            DBMS_VECTOR_CHAIN.UTL_TO_EMBEDDINGS(
                kb.content,
                JSON('{
                    "provider": "ocigenai",
                    "credential_name": "OCI_GENAI_CRED",
                    "url": "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/20231130/actions/embedText",
                    "model": "cohere.embed-english-light-v3.0",
                    "input_type": "search_document"
                }')
            )
        ) et
        WHERE ROWNUM = 1
    )
    WHERE content_vector IS NULL
    """

    cursor.execute(update_embeddings_sql)
    connection.commit()

    # Verify embeddings were generated
    cursor.execute("SELECT COUNT(*) FROM knowledge_base WHERE content_vector IS NOT NULL")
    count = cursor.fetchone()[0]
    print(f"Generated embeddings for {count} documents")

    # Show a sample vector (first 5 dimensions)
    cursor.execute("""
        SELECT title, VECTOR_DIMS(content_vector) as dims
        FROM knowledge_base
        WHERE ROWNUM = 1
    """)
    row = cursor.fetchone()
    print(f"\nSample: '{row[0]}' has {row[1]} dimensions")
    </copy>
    ```

    **Key points:**
    - `UTL_TO_EMBEDDINGS` calls the OCI Generative AI service
    - `input_type: "search_document"` optimizes embeddings for documents (vs. queries)
    - The model returns 1024-dimensional vectors

    <!-- TODO: Add screenshot of embedding generation -->
    ![Embeddings Generated](../images/lab1/embeddings-generated.png " ")

## Task 6: Create Vector Index

Creating a vector index dramatically speeds up similarity searches on large datasets.

1. Run the following code to create an HNSW index:

    ```python
    <copy>
    # Create HNSW vector index for fast similarity search
    create_index_sql = """
    CREATE VECTOR INDEX kb_vector_idx ON knowledge_base(content_vector)
    ORGANIZATION INMEMORY NEIGHBOR GRAPH
    DISTANCE COSINE
    WITH TARGET ACCURACY 95
    """

    try:
        cursor.execute(create_index_sql)
        print("HNSW vector index 'kb_vector_idx' created successfully")
    except oracledb.DatabaseError as e:
        error, = e.args
        if "already exists" in str(error.message):
            print("Vector index already exists")
        else:
            raise

    # Verify index creation
    cursor.execute("""
        SELECT index_name, index_type
        FROM user_indexes
        WHERE index_name = 'KB_VECTOR_IDX'
    """)
    result = cursor.fetchone()
    if result:
        print(f"Index verified: {result[0]} ({result[1]})")
    </copy>
    ```

    **Key points:**
    - `ORGANIZATION INMEMORY NEIGHBOR GRAPH` creates an HNSW index
    - `DISTANCE COSINE` specifies cosine distance for similarity
    - `TARGET ACCURACY 95` aims for 95% recall vs. exact search

## Task 7: Perform Keyword Search

Let's start with traditional keyword search using Oracle Text.

1. First, create a text index on the content column:

    ```python
    <copy>
    # Create Oracle Text index for keyword search
    try:
        cursor.execute("""
            CREATE INDEX kb_content_text_idx ON knowledge_base(content)
            INDEXTYPE IS CTXSYS.CONTEXT
        """)
        print("Oracle Text index created successfully")
    except oracledb.DatabaseError as e:
        error, = e.args
        if "already exists" in str(error.message):
            print("Text index already exists")
        else:
            raise
    </copy>
    ```

2. Now perform a keyword search:

    ```python
    <copy>
    def keyword_search(query_text, top_k=5):
        """Perform keyword search using Oracle Text CONTAINS operator."""
        sql = """
            SELECT id, title, content, category, SCORE(1) as relevance
            FROM knowledge_base
            WHERE CONTAINS(content, :query, 1) > 0
            ORDER BY SCORE(1) DESC
            FETCH FIRST :top_k ROWS ONLY
        """
        cursor.execute(sql, {'query': query_text, 'top_k': top_k})
        return cursor.fetchall()

    # Test keyword search
    query = "vector search database"
    results = keyword_search(query)

    print(f"Keyword Search Results for: '{query}'")
    print("=" * 60)
    for row in results:
        print(f"\n[{row[3]}] {row[1]}")
        print(f"  Relevance Score: {row[4]:.2f}")
        print(f"  Content: {row[2][:100]}...")
    </copy>
    ```

    **Key points:**
    - `CONTAINS` operator searches for keywords in the text
    - `SCORE(1)` returns a relevance score
    - Keyword search finds exact term matches

    <!-- TODO: Add screenshot of keyword search results -->
    ![Keyword Search Results](../images/lab1/keyword-search.png " ")

## Task 8: Perform Vector Similarity Search

Now let's perform semantic search using vector embeddings.

1. Run the following code to create and test the vector search function:

    ```python
    <copy>
    def vector_search(query_text, top_k=5):
        """Perform semantic similarity search using vector embeddings."""

        sql = """
            SELECT id, title, content, category,
                   VECTOR_DISTANCE(content_vector,
                       (SELECT TO_VECTOR(et.embed_vector)
                        FROM TABLE(
                            DBMS_VECTOR_CHAIN.UTL_TO_EMBEDDINGS(
                                :query,
                                JSON('{
                                    "provider": "ocigenai",
                                    "credential_name": "OCI_GENAI_CRED",
                                    "url": "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/20231130/actions/embedText",
                                    "model": "cohere.embed-english-light-v3.0",
                                    "input_type": "search_query"
                                }')
                            )
                        ) et
                        WHERE ROWNUM = 1),
                       COSINE) as distance
            FROM knowledge_base
            ORDER BY distance
            FETCH APPROX FIRST :top_k ROWS ONLY WITH TARGET ACCURACY 90
        """

        cursor.execute(sql, {'query': query_text, 'top_k': top_k})
        return cursor.fetchall()

    # Test vector search with a semantic query
    query = "How do I find similar documents using AI?"
    results = vector_search(query)

    print(f"Vector Search Results for: '{query}'")
    print("=" * 60)
    for row in results:
        print(f"\n[{row[3]}] {row[1]}")
        print(f"  Distance: {row[4]:.4f} (lower = more similar)")
        print(f"  Content: {row[2][:100]}...")
    </copy>
    ```

    **Key points:**
    - `input_type: "search_query"` optimizes the query embedding
    - `VECTOR_DISTANCE` calculates cosine distance between vectors
    - `FETCH APPROX` uses the vector index for fast search
    - Lower distance = higher similarity

2. Try another query to see how vector search finds semantically related content:

    ```python
    <copy>
    # Compare results for a conceptual query
    query = "making AI responses more accurate and grounded"
    results = vector_search(query)

    print(f"\nVector Search Results for: '{query}'")
    print("=" * 60)
    for row in results:
        print(f"\n[{row[3]}] {row[1]}")
        print(f"  Distance: {row[4]:.4f}")
    </copy>
    ```

    Notice how vector search finds documents about RAG and retrieval even though the query doesn't contain those exact words!

    <!-- TODO: Add screenshot of vector search results -->
    ![Vector Search Results](../images/lab1/vector-search.png " ")

## Task 9: Perform Hybrid Search

Hybrid search combines the precision of keyword search with the semantic understanding of vector search.

1. Run the following code to implement and test hybrid search:

    ```python
    <copy>
    def hybrid_search(query_text, top_k=5, keyword_weight=0.3, vector_weight=0.7):
        """
        Combine keyword and vector search using weighted scoring.

        This is a simple fusion approach - production systems might use
        more sophisticated ranking methods like Reciprocal Rank Fusion (RRF).
        """

        sql = """
            WITH keyword_results AS (
                SELECT id, title, content, category,
                       SCORE(1) as keyword_score
                FROM knowledge_base
                WHERE CONTAINS(content, :query, 1) > 0
            ),
            vector_results AS (
                SELECT id, title, content, category,
                       1 - VECTOR_DISTANCE(content_vector,
                           (SELECT TO_VECTOR(et.embed_vector)
                            FROM TABLE(
                                DBMS_VECTOR_CHAIN.UTL_TO_EMBEDDINGS(
                                    :query,
                                    JSON('{
                                        "provider": "ocigenai",
                                        "credential_name": "OCI_GENAI_CRED",
                                        "url": "https://inference.generativeai.us-chicago-1.oci.oraclecloud.com/20231130/actions/embedText",
                                        "model": "cohere.embed-english-light-v3.0",
                                        "input_type": "search_query"
                                    }')
                                )
                            ) et
                            WHERE ROWNUM = 1),
                           COSINE) as vector_score
                FROM knowledge_base
            )
            SELECT
                COALESCE(k.id, v.id) as id,
                COALESCE(k.title, v.title) as title,
                COALESCE(k.content, v.content) as content,
                COALESCE(k.category, v.category) as category,
                NVL(k.keyword_score, 0) as keyword_score,
                NVL(v.vector_score, 0) as vector_score,
                NVL(k.keyword_score, 0) * :kw + NVL(v.vector_score, 0) * :vw as hybrid_score
            FROM keyword_results k
            FULL OUTER JOIN vector_results v ON k.id = v.id
            ORDER BY hybrid_score DESC
            FETCH FIRST :top_k ROWS ONLY
        """

        cursor.execute(sql, {
            'query': query_text,
            'top_k': top_k,
            'kw': keyword_weight,
            'vw': vector_weight
        })
        return cursor.fetchall()

    # Test hybrid search
    query = "Oracle database semantic similarity"
    results = hybrid_search(query)

    print(f"Hybrid Search Results for: '{query}'")
    print("=" * 60)
    for row in results:
        print(f"\n[{row[3]}] {row[1]}")
        print(f"  Keyword Score: {row[4]:.2f}")
        print(f"  Vector Score:  {row[5]:.4f}")
        print(f"  Hybrid Score:  {row[6]:.4f}")
    </copy>
    ```

    **Key points:**
    - Hybrid search uses both keyword matching and semantic similarity
    - Weights control the balance (default: 30% keyword, 70% vector)
    - Documents matching both signals rank higher

2. Compare all three search methods:

    ```python
    <copy>
    # Compare search methods side-by-side
    query = "fast approximate search algorithms"

    print(f"Comparing search methods for: '{query}'")
    print("=" * 70)

    print("\n1. KEYWORD SEARCH (exact term matching):")
    for row in keyword_search(query, top_k=3):
        print(f"   - {row[1]}")

    print("\n2. VECTOR SEARCH (semantic similarity):")
    for row in vector_search(query, top_k=3):
        print(f"   - {row[1]} (distance: {row[4]:.4f})")

    print("\n3. HYBRID SEARCH (combined):")
    for row in hybrid_search(query, top_k=3):
        print(f"   - {row[1]} (hybrid: {row[6]:.4f})")
    </copy>
    ```

    <!-- TODO: Add screenshot comparing search methods -->
    ![Search Comparison](../images/lab1/search-comparison.png " ")

## Task 10: Cleanup (Optional)

If you want to reset the lab, you can clean up the created objects:

```python
<copy>
# Optional: Clean up objects created in this lab
# Uncomment and run if you want to reset

# cursor.execute("DROP INDEX kb_vector_idx")
# cursor.execute("DROP INDEX kb_content_text_idx")
# cursor.execute("DROP TABLE knowledge_base PURGE")
# connection.commit()
# print("Cleanup complete")
</copy>
```

## Summary

Congratulations! In this lab, you learned how to:

- Connect to Oracle ADB and verify OCI Generative AI credentials
- Create tables with VECTOR columns to store embeddings
- Generate embeddings using OCI GenAI's Cohere model
- Create HNSW indexes for fast vector search
- Perform three types of search:
  - **Keyword search** using Oracle Text for exact term matching
  - **Vector search** using VECTOR_DISTANCE for semantic similarity
  - **Hybrid search** combining both approaches for best results

You're now ready to move on to Lab 2, where you'll build a complete RAG agent!

## Quiz

```quiz score
Q: What Oracle function is used to calculate the distance between two vectors?
* VECTOR_DISTANCE
- VECTOR_SIMILARITY
- CALC_VECTOR
- DISTANCE_BETWEEN
> VECTOR_DISTANCE is the native Oracle function for computing distance between vectors using metrics like COSINE, DOT, or EUCLIDEAN.

Q: Which embedding model is used in this workshop?
* cohere.embed-english-light-v3.0
- nomic-embed-text-v1.5
- all-MiniLM-L12-v2
- text-embedding-ada-002
> We use the Cohere embed-english-light-v3.0 model through OCI Generative AI service.

Q: What is the dimension of vectors produced by the Cohere embed-english-light model?
* 1024
- 768
- 384
- 1536
> The Cohere embed-english-light-v3.0 model produces 1024-dimensional vectors.

Q: Which PL/SQL package is used to generate embeddings within Oracle Database?
* DBMS_VECTOR_CHAIN
- DBMS_VECTOR
- DBMS_EMBEDDING
- DBMS_AI
> DBMS_VECTOR_CHAIN provides the UTL_TO_EMBEDDINGS function for generating embeddings.

Q: What type of index provides fast approximate nearest neighbor search in Oracle?
* HNSW (Hierarchical Navigable Small World)
- B-tree
- Bitmap
- Hash
> HNSW is a graph-based index structure optimized for high-dimensional vector similarity search.

Q: In keyword search, which Oracle Text operator finds matching documents?
* CONTAINS
- MATCHES
- SEARCH
- FIND_TEXT
> The CONTAINS operator is used with Oracle Text indexes for full-text keyword search.

Q: What does cosine similarity measure between two vectors?
* The angle between the vectors
- The Euclidean distance
- The sum of differences
- The product of magnitudes
> Cosine similarity measures the cosine of the angle between vectors, where 1 means identical direction.

Q: Why is hybrid search often better than using vector or keyword search alone?
* It combines semantic understanding with exact term matching
- It is faster than either method
- It uses less memory
- It requires fewer indexes
> Hybrid search leverages both semantic similarity (vectors) and exact matching (keywords) for more robust retrieval.

Q: What input_type should be used when embedding a search query vs. a document?
* "search_query" for queries, "search_document" for documents
- They should both use "text"
- "query" for queries, "doc" for documents
- The input_type doesn't matter
> Cohere models use different prefixes for queries and documents to optimize retrieval performance.

Q: What does "TARGET ACCURACY 95" mean in vector index creation?
* The index aims for 95% recall compared to exact search
- The index will be 95% smaller
- Queries will be 95% faster
- The index uses 95% of available memory
> Target accuracy specifies the recall goal for approximate search, trading some precision for speed.
```

## Learn More

- [Oracle AI Vector Search User's Guide](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/)
- [VECTOR_DISTANCE Function Reference](https://docs.oracle.com/en/database/oracle/oracle-database/26/sqlrf/vector_distance.html)
- [Oracle Text Developer's Guide](https://docs.oracle.com/en/database/oracle/oracle-database/26/ccref/)

## Acknowledgements

- **Author** - Kirk Kirkconnell, Oracle
- **Contributors** - [Add contributors]
- **Last Updated By/Date** - [Your name], [Month Year]
