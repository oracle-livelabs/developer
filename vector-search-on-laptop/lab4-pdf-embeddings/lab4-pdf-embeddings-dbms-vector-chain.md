# Lab 4 (Alternate): Load PDFs with DBMS\_VECTOR\_CHAIN and Create Embeddings

## Introduction

In this alternate lab you will load a PDF into Oracle Database as a BLOB, extract text using Oracle's native `DBMS_VECTOR_CHAIN` package, chunk the text in-database, generate vector embeddings with the ONNX model loaded in Lab 3, and run a cosine similarity search. All PDF parsing happens inside the database through Oracle Text.

Estimated Time: 20 minutes

### About DBMS\_VECTOR\_CHAIN

Oracle Database 26 includes the `DBMS_VECTOR_CHAIN` package with chainable utility functions to build an end-to-end pipeline inside the database:

* `UTL_TO_TEXT` — extract plain text from PDFs and other rich document formats
* `UTL_TO_CHUNKS` — split extracted text into chunks using JSON-configured rules
* `UTL_TO_EMBEDDING` — generate embeddings in-database (including with ONNX models)

In this lab, you will use these utilities to keep PDF handling, chunking, and embedding entirely in the database.

### Objectives

In this lab, you will:
* Create database tables to store PDFs and their vector embeddings
* Load a PDF as a BLOB in the database
* Use `DBMS_VECTOR_CHAIN.UTL_TO_TEXT` to extract text directly from the PDF
* Use `DBMS_VECTOR_CHAIN.UTL_TO_CHUNKS` to split text into chunks
* Use `DBMS_VECTOR_CHAIN.UTL_TO_EMBEDDING` to generate embeddings for each chunk
* Perform cosine similarity search and display the top 10 results

### Prerequisites

This lab assumes you have:
* Completed Labs 1, 2, and 3
* Both `oracle-ai-db` and `python-runner` containers running
* The ONNX embedding model loaded in the database
* Oracle Text (`CONTEXT`) installed (required for `DBMS_VECTOR_CHAIN.UTL_TO_TEXT`)
* A sample PDF file copied into `~/hero/` (any PDF will work — a documentation PDF, article, or report)


## Task 1: Create Database Tables (with BLOB Storage)

1. Create the file `~/hero/06_create_tables_dbms_vector_chain.py`:

    ```python
    <copy>## 06_create_tables_dbms_vector_chain.py — Create tables for PDF BLOB storage and embeddings
    import oracledb
    import config

    def create_tables():
        """Create the database schema for PDF documents and embeddings."""
        print("Creating database tables...")

        connection = oracledb.connect(
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            dsn=config.DB_DSN
        )

        cursor = connection.cursor()

        ## Drop and recreate tables for a clean start
        tables_to_drop = ["DOC_CHUNKS", "DOCUMENTS"]

        for table in tables_to_drop:
            try:
                cursor.execute(f"DROP TABLE {table} CASCADE CONSTRAINTS")
                print(f"  Dropped table: {table}")
            except oracledb.DatabaseError:
                pass  ## Table didn't exist, that's fine

        ## Create DOCUMENTS table (store PDF as BLOB)
        cursor.execute("""
            CREATE TABLE documents (
                doc_id     NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                filename   VARCHAR2(500) NOT NULL,
                filepath   VARCHAR2(1000),
                file_size  NUMBER,
                page_count NUMBER,
                file_blob  BLOB,
                loaded_at  TIMESTAMP DEFAULT SYSTIMESTAMP
            )
        """)
        print("  Created table: DOCUMENTS")

        ## Create DOC_CHUNKS table with VECTOR column
        cursor.execute(f"""
            CREATE TABLE doc_chunks (
                chunk_id     NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                doc_id       NUMBER NOT NULL,
                chunk_seq    NUMBER NOT NULL,
                chunk_offset NUMBER,
                chunk_length NUMBER,
                chunk_text   CLOB,
                embedding    VECTOR({config.EMBEDDING_DIM}, FLOAT32),
                CONSTRAINT fk_doc FOREIGN KEY (doc_id) REFERENCES documents(doc_id)
            )
        """)
        print("  Created table: DOC_CHUNKS")

        connection.commit()
        cursor.close()
        connection.close()
        print("\nDatabase schema created successfully!")

    if __name__ == "__main__":
        create_tables()
    </copy>
    ```

2. Run the script inside the Python container:

    ```bash
    <copy>podman exec python-runner python /workshop/06_create_tables_dbms_vector_chain.py</copy>
    ```

## Task 2: Load a PDF and Generate Chunks/Embeddings In-Database

1. Copy a PDF file into your workshop directory on your laptop. Any PDF works — for example, download the Oracle AI Database New Features guide or any documentation PDF:

    ```bash
    <copy>cp ~/Downloads/your_document.pdf ~/hero/</copy>
    ```

    The file will automatically appear inside the Python container at `/workshop/your_document.pdf` because the directory is mounted.

    If you do not have a PDF, create a simple sample one inside the Python container (the container already has Python available):

    ```bash
    <copy>podman exec python-runner pip install reportlab --quiet
    podman exec python-runner python -c "
    from reportlab.pdfgen import canvas
    c = canvas.Canvas('/workshop/sample.pdf')
    c.drawString(100, 750, 'Oracle AI Vector Search Workshop Sample Document')
    c.drawString(100, 720, 'This document demonstrates Oracle AI Vector Search.')
    c.drawString(100, 690, 'Vector embeddings enable semantic similarity search.')
    c.drawString(100, 660, 'Oracle AI Database includes native vector support.')
    c.drawString(100, 630, 'DBMS_VECTOR_CHAIN extracts text from PDFs in-database.')
    c.drawString(100, 600, 'Cosine similarity finds the most relevant results.')
    c.save()
    print('Created /workshop/sample.pdf')"
    </copy>
    ```

    > **Note:** The sample PDF will also appear on your laptop at `~/hero/sample.pdf` thanks to the volume mount.

2. Create the file `~/hero/07_load_pdf_dbms_vector_chain.py`:

    ```python
    <copy>## 07_load_pdf_dbms_vector_chain.py — Load PDF BLOB and use DBMS_VECTOR_CHAIN for text, chunks, embeddings
    import oracledb
    import sys
    import os
    import json
    import config

    def load_pdf_to_database(pdf_path):
        """Load a PDF as BLOB and generate chunks + embeddings inside the database."""
        if not os.path.exists(pdf_path):
            print(f"Error: File not found: {pdf_path}")
            sys.exit(1)

        filename = os.path.basename(pdf_path)
        file_size = os.path.getsize(pdf_path)

        with open(pdf_path, "rb") as f:
            pdf_bytes = f.read()

        print(f"\nConnecting to Oracle Database...")
        connection = oracledb.connect(
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            dsn=config.DB_DSN
        )
        cursor = connection.cursor()
        cursor.setinputsizes(file_blob=oracledb.BLOB)

        ## Insert PDF as BLOB
        doc_id_var = cursor.var(oracledb.NUMBER)
        cursor.execute("""
            INSERT INTO documents (filename, filepath, file_size, file_blob)
            VALUES (:filename, :filepath, :file_size, :file_blob)
            RETURNING doc_id INTO :doc_id
        """, {
            "filename": filename,
            "filepath": pdf_path,
            "file_size": file_size,
            "file_blob": pdf_bytes,
            "doc_id": doc_id_var
        })

        ## DML RETURNING gives a 1-item list for the OUT bind
        doc_id = int(doc_id_var.getvalue()[0])
        print(f"Document registered with ID: {doc_id}")

        ## JSON parameters for DBMS_VECTOR_CHAIN
        text_params = json.dumps({
            "plaintext": "true",
            "charset": "UTF8",
            "format": "BINARY"  ## PDF is binary content
        })

        chunk_params = json.dumps({
            "by": "words",
            "max": 150,
            "overlap": 20,
            "split": "recursively",
            "language": "american",
            "normalize": "all"
        })

        embed_params = json.dumps({
            "provider": "database",
            "model": config.ONNX_MODEL_NAME
        })

        print("\nExtracting text, chunking, and embedding with DBMS_VECTOR_CHAIN...")

        cursor.execute("""
            INSERT INTO doc_chunks
                (doc_id, chunk_seq, chunk_offset, chunk_length, chunk_text, embedding)
            SELECT
                :doc_id,
                jt.chunk_id,
                jt.chunk_offset,
                jt.chunk_length,
                jt.chunk_data,
                dbms_vector_chain.utl_to_embedding(jt.chunk_data, json(:embed_params))
            FROM documents d,
                 TABLE(
                     dbms_vector_chain.utl_to_chunks(
                         dbms_vector_chain.utl_to_text(d.file_blob, json(:text_params)),
                         json(:chunk_params)
                     )
                 ) t,
                 JSON_TABLE(
                     t.column_value, '$'
                     COLUMNS (
                         chunk_id     NUMBER PATH '$.chunk_id',
                         chunk_offset NUMBER PATH '$.chunk_offset',
                         chunk_length NUMBER PATH '$.chunk_length',
                         chunk_data   CLOB  PATH '$.chunk_data'
                     )
                 ) jt
            WHERE d.doc_id = :doc_id
        """, {
            "doc_id": doc_id,
            "text_params": text_params,
            "chunk_params": chunk_params,
            "embed_params": embed_params
        })

        cursor.execute("SELECT COUNT(*) FROM doc_chunks WHERE doc_id = :doc_id", doc_id=doc_id)
        chunk_count = cursor.fetchone()[0]

        connection.commit()
        cursor.close()
        connection.close()

        print(f"\nSuccessfully loaded PDF!")
        print(f"  Document ID: {doc_id}")
        print(f"  Filename:    {filename}")
        print(f"  Chunks:      {chunk_count}")
        return doc_id

    if __name__ == "__main__":
        if len(sys.argv) < 2:
            print("Usage: python 07_load_pdf_dbms_vector_chain.py <path_to_pdf>")
            print("Example: python 07_load_pdf_dbms_vector_chain.py ~/Downloads/oracle_docs.pdf")
            sys.exit(1)

        load_pdf_to_database(sys.argv[1])
    </copy>
    ```

3. Load a PDF file into the database. The path argument must be the container-side path under `/workshop/`:

    ```bash
    <copy>podman exec python-runner python /workshop/07_load_pdf_dbms_vector_chain.py /workshop/your_document.pdf</copy>
    ```

    If you created the sample PDF in the previous step, use:

    ```bash
    <copy>podman exec python-runner python /workshop/07_load_pdf_dbms_vector_chain.py /workshop/sample.pdf</copy>
    ```

    > **Note:** `UTL_TO_EMBEDDING` accepts up to 4000 characters per input. If you see errors, reduce the `max` chunk size or switch to `by: "characters"` in `chunk_params`.

## Task 3: Implement Vector Similarity Search

1. Create the file `~/hero/08_search.py`:

    ```python
    <copy>## 08_search.py — Cosine similarity search across PDF chunks
    import oracledb
    import sys
    import config

    def search(query_text, top_k=10):
        """Search for the most relevant chunks using cosine similarity."""
        print(f"\nSearching for: '{query_text}'")
        print(f"Returning top {top_k} results\n")

        connection = oracledb.connect(
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            dsn=config.DB_DSN
        )
        cursor = connection.cursor()

        ## Perform cosine similarity search using VECTOR_DISTANCE
        ## Lower cosine distance = higher similarity
        cursor.execute(f"""
            SELECT
                d.filename,
                c.chunk_seq,
                c.chunk_text,
                ROUND(1 - VECTOR_DISTANCE(
                    c.embedding,
                    VECTOR_EMBEDDING({config.ONNX_MODEL_NAME} USING :query AS DATA),
                    COSINE
                ), 4) AS similarity_score
            FROM doc_chunks c
            JOIN documents d ON c.doc_id = d.doc_id
            ORDER BY VECTOR_DISTANCE(
                c.embedding,
                VECTOR_EMBEDDING({config.ONNX_MODEL_NAME} USING :query AS DATA),
                COSINE
            )
            FETCH FIRST :top_k ROWS ONLY
        """, query=query_text, top_k=top_k)

        results = cursor.fetchall()

        if not results:
            print("No results found. Have you loaded any PDFs? Run 07_load_pdf_dbms_vector_chain.py first.")
        else:
            print(f"{'#':<4} {'Score':<8} {'File':<30} {'Chunk':<6}  Text Preview")
            print("-" * 90)

            for i, (filename, chunk_seq, chunk_text, score) in enumerate(results, 1):
                ## Truncate text for display
                preview = str(chunk_text).replace("\n", " ").strip()[:60]
                short_file = filename[-28:] if len(filename) > 28 else filename
                print(f"{i:<4} {score:<8} {short_file:<30} {chunk_seq:<6}  {preview}...")

            print(f"\n{len(results)} results returned.")

        cursor.close()
        connection.close()

    if __name__ == "__main__":
        query = " ".join(sys.argv[1:]) if len(sys.argv) > 1 else "What is vector search?"
        search(query, top_k=10)
    </copy>
    ```

2. Run a search query inside the Python container:

    ```bash
    <copy>podman exec python-runner python /workshop/08_search.py "vector embeddings similarity search"</copy>
    ```

3. Try a few different queries to explore the search results:

    ```bash
    <copy>podman exec python-runner python /workshop/08_search.py "how to configure the database"</copy>
    ```

    ```bash
    <copy>podman exec python-runner python /workshop/08_search.py "performance tuning best practices"</copy>
    ```

    > **Note:** The cosine similarity score ranges from 0 (not similar) to 1 (identical). A score above 0.7 typically indicates a strong semantic match.

## Learn More

* [DBMS_VECTOR_CHAIN Package Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/arpls/dbms_vector_chain1.html)
* [VECTOR_DISTANCE Function](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/vector_distance.html)


## Acknowledgements
* **Author** - Oracle LiveLabs Team
* **Last Updated By/Date** - Oracle LiveLabs Team, March 2026
