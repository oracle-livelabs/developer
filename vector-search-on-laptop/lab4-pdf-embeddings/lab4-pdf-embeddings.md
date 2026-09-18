# Lab 4: Load PDFs, Create Embeddings, and Search

## Introduction

In this lab you will write a Python script that loads a PDF document into Oracle Database, chunks the text using Oracle's native `VECTOR_CHUNKS` function, generates vector embeddings for each chunk using the ONNX model loaded in Lab 3, and performs a cosine similarity search to find the most relevant chunks for a given query. All operations happen inside the database.

Estimated Time: 20 minutes

### About Oracle AI Vector Search Chunking

Oracle Database 26 includes the `VECTOR_CHUNKS` SQL function, which intelligently splits text into smaller segments (chunks) optimized for embedding. It supports multiple chunking strategies: by characters, by words, or by vocabulary tokens. You can control chunk size, overlap between chunks, the split strategy (sentence boundaries, blank lines, recursively), and text normalization. Using the database for chunking keeps everything in one place and avoids round-trips to external services.

### Objectives

In this lab, you will:
* Create database tables to store documents and their vector embeddings
* Write a Python script to extract text from a PDF file
* Use Oracle's `VECTOR_CHUNKS` function to split text into chunks
* Generate vector embeddings for each chunk using the in-database ONNX model
* Perform cosine similarity search and display the top 10 results

### Prerequisites

This lab assumes you have:
* Completed Labs 1, 2, and 3
* Both `oracle-ai-db` and `python-runner` containers running
* The ONNX model loaded in the database
* A sample PDF file copied into `~/hero/` (any PDF will work — a documentation PDF, article, or report)


## Task 1: Create Database Tables

1. Create the file `~/hero/06_create_tables.py`:

    ```python
    <copy>## 06_create_tables.py — Create tables for PDF document storage and vector embeddings
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

        ## Create DOCUMENTS table
        cursor.execute("""
            CREATE TABLE documents (
                doc_id     NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                filename   VARCHAR2(500) NOT NULL,
                filepath   VARCHAR2(1000),
                file_size  NUMBER,
                page_count NUMBER,
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
    <copy>podman exec python-runner python /workshop/06_create_tables.py</copy>
    ```

## Task 2: Write the PDF Loader with Chunking and Embedding

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
    c.drawString(100, 630, 'VECTOR_CHUNKS splits text into overlapping chunks.')
    c.drawString(100, 600, 'Cosine similarity finds the most relevant results.')
    c.save()
    print('Created /workshop/sample.pdf')"
    </copy>
    ```

    > **Note:** The sample PDF will also appear on your laptop at `~/hero/sample.pdf` thanks to the volume mount.

2. Create the file `~/hero/07_load_pdf.py`:

    ```python
    <copy>## 07_load_pdf.py — Load a PDF, chunk text with VECTOR_CHUNKS, generate embeddings
    import oracledb
    import sys
    import os
    import config

    try:
        import PyPDF2
    except ImportError:
        print("Install PyPDF2: pip install PyPDF2")
        sys.exit(1)

    def extract_text_from_pdf(pdf_path):
        """Extract all text from a PDF file."""
        print(f"Extracting text from: {pdf_path}")

        all_text = []
        with open(pdf_path, "rb") as f:
            reader = PyPDF2.PdfReader(f)
            page_count = len(reader.pages)
            print(f"  Pages found: {page_count}")

            for page_num, page in enumerate(reader.pages, 1):
                text = page.extract_text()
                if text and text.strip():
                    all_text.append(text.strip())

        combined = "\n\n".join(all_text)
        print(f"  Extracted {len(combined):,} characters of text")
        return combined, page_count

    def load_pdf_to_database(pdf_path):
        """Load a PDF into the database with chunking and embeddings."""
        if not os.path.exists(pdf_path):
            print(f"Error: File not found: {pdf_path}")
            sys.exit(1)

        filename = os.path.basename(pdf_path)
        file_size = os.path.getsize(pdf_path)

        ## Extract text from PDF
        full_text, page_count = extract_text_from_pdf(pdf_path)

        if not full_text.strip():
            print("Error: No text could be extracted from this PDF.")
            sys.exit(1)

        print(f"\nConnecting to Oracle Database...")
        connection = oracledb.connect(
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            dsn=config.DB_DSN
        )
        cursor = connection.cursor()

        ## Insert document record
        doc_id_var = cursor.var(oracledb.NUMBER)
        cursor.execute("""
            INSERT INTO documents (filename, filepath, file_size, page_count)
            VALUES (:filename, :filepath, :file_size, :page_count)
            RETURNING doc_id INTO :doc_id
        """, {
            "filename": filename,
            "filepath": pdf_path,
            "file_size": file_size,
            "page_count": page_count,
            "doc_id": doc_id_var
        })

        ## DML RETURNING gives a 1-item list for the OUT bind
        doc_id = int(doc_id_var.getvalue()[0])
        print(f"Document registered with ID: {doc_id}")

        ## Use Oracle VECTOR_CHUNKS to split text into chunks
        ## Parameters:
        ##   BY WORDS        — chunk by word count
        ##   MAX 150         — max 150 words per chunk
        ##   OVERLAP 20      — 20-word overlap between chunks for context continuity
        ##   SPLIT BY RECURSIVELY — intelligent split: blank lines > newlines > spaces
        ##   NORMALIZE ALL   — normalize punctuation, whitespace, and wide chars
        print("\nChunking text using Oracle VECTOR_CHUNKS (BY WORDS, MAX 150, OVERLAP 20)...")

        cursor.execute("""
            SELECT chunk_offset, chunk_length, chunk_text
            FROM VECTOR_CHUNKS(
                :full_text
                BY WORDS
                MAX 150
                OVERLAP 20
                SPLIT BY RECURSIVELY
                LANGUAGE american
                NORMALIZE ALL
            )
            ORDER BY chunk_offset
        """, full_text=full_text)

        chunks = cursor.fetchall()
        print(f"  Generated {len(chunks)} chunks")

        ## Insert chunks with embeddings
        print("Generating embeddings and inserting chunks...")

        inserted = 0
        for seq, (offset, length, text) in enumerate(chunks, 1):
            if not text or not text.strip():
                continue

            ## Generate embedding and insert in one operation
            cursor.execute(f"""
                INSERT INTO doc_chunks
                    (doc_id, chunk_seq, chunk_offset, chunk_length, chunk_text, embedding)
                VALUES (
                    :doc_id,
                    :chunk_seq,
                    :chunk_offset,
                    :chunk_length,
                    :chunk_text,
                    VECTOR_EMBEDDING({config.ONNX_MODEL_NAME} USING :embed_text AS DATA)
                )
            """, {
                "doc_id": doc_id,
                "chunk_seq": seq,
                "chunk_offset": offset,
                "chunk_length": length,
                "chunk_text": text,
                "embed_text": text[:3000]  ## Limit for embedding model
            })

            inserted += 1
            if inserted % 10 == 0:
                print(f"  Processed {inserted}/{len(chunks)} chunks...")

        connection.commit()
        cursor.close()
        connection.close()

        print(f"\nSuccessfully loaded PDF!")
        print(f"  Document ID: {doc_id}")
        print(f"  Filename:    {filename}")
        print(f"  Pages:       {page_count}")
        print(f"  Chunks:      {inserted}")
        return doc_id

    if __name__ == "__main__":
        if len(sys.argv) < 2:
            print("Usage: python 07_load_pdf.py <path_to_pdf>")
            print("Example: python 07_load_pdf.py ~/Downloads/oracle_docs.pdf")
            sys.exit(1)

        load_pdf_to_database(sys.argv[1])
    </copy>
    ```

3. Load a PDF file into the database. The path argument must be the container-side path under `/workshop/`:

    ```bash
    <copy>podman exec python-runner python /workshop/07_load_pdf.py /workshop/your_document.pdf</copy>
    ```

    If you created the sample PDF in the previous step, use:

    ```bash
    <copy>podman exec python-runner python /workshop/07_load_pdf.py /workshop/sample.pdf</copy>
    ```

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
            print("No results found. Have you loaded any PDFs? Run 07_load_pdf.py first.")
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

* [VECTOR_CHUNKS Function Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/chunking-and-vector-generation-functions.html)
* [VECTOR_DISTANCE Function](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/vector_distance.html)


## Acknowledgements
* **Author** - Oracle LiveLabs Team
* **Last Updated By/Date** - Oracle LiveLabs Team, February 2026
