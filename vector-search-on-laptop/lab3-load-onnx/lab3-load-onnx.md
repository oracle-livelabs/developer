# Lab 3: Load an ONNX Embedding Model into Oracle Database

## Introduction

In this lab you will download a pre-built ONNX embedding model and load it directly into Oracle AI Database. Once inside the database, this model can generate vector embeddings from text entirely within SQL. You will use Oracle's pre-built version of the **all-MiniLM-L12-v2** model, which produces 384-dimensional embeddings optimized for semantic similarity tasks.

Estimated Time: 20 minutes

### About ONNX Models in Oracle Database

Oracle AI Database supports loading ONNX (Open Neural Network Exchange) models directly into the database using `DBMS_VECTOR.LOAD_ONNX_MODEL`. Once loaded, these models become first-class database objects and can be used in SQL and PL/SQL with the `VECTOR_EMBEDDING()` function. This eliminates the latency of calling an external embedding service and keeps all data transformations inside the database.

### Objectives

In this lab, you will:
* Download Oracle's pre-built all-MiniLM-L12-v2 ONNX model
* Create a database directory for model import
* Load the ONNX model into Oracle Database
* Verify the model by generating a test embedding

### Prerequisites

This lab assumes you have:
* Completed Lab 1 (both `oracle-ai-db` and `python-runner` containers running on `oracle-ai-net`)
* Completed Lab 2 (`config.py` created in `~/hero/`)
* The `workshop` database user created with DBMS_VECTOR privileges


## Task 1: Download the ONNX Model

1. The `~/hero/models` directory already exists from Lab 1 and is accessible inside the Python container at `/workshop/models`. Create the download script `~/hero/02_download_model.py`:

    ```
    <copy>## 02_download_model.py — Download the pre-built ONNX embedding model
    import urllib.request
    import os

    ## Oracle pre-built all-MiniLM-L12-v2 ONNX model
    ## Source: Oracle Database documentation - prebuilt ONNX models
    MODEL_URL = "https://adwc4pm.objectstorage.us-ashburn-1.oci.customer-oci.com/p/iPX9W0MZeRkwJKWdFmdJCemmN-iKAl_bFvNGYLW7YqIrw4kKsukL24J2q93Beb9S/n/adwc4pm/b/OML-ai-models/o/all_MiniLM_L12_v2.onnx"
    ## /workshop/models maps to ~/hero/models on your laptop
    MODEL_PATH = "/workshop/models/all_minilm_l12_v2.onnx"

    def download_model():
        if os.path.exists(MODEL_PATH):
            print(f"Model already exists at: {MODEL_PATH}")
            print(f"File size: {os.path.getsize(MODEL_PATH):,} bytes")
            return

        print("Downloading ONNX model (this may take a few minutes)...")
        print(f"Source: {MODEL_URL}")
        print(f"Destination: {MODEL_PATH}")

        def progress(count, block_size, total_size):
            pct = min(int(count * block_size * 100 / total_size), 100)
            print(f"\r  Progress: {pct}%", end="", flush=True)

        urllib.request.urlretrieve(MODEL_URL, MODEL_PATH, reporthook=progress)
        print(f"\nDownload complete!")
        print(f"File size: {os.path.getsize(MODEL_PATH):,} bytes")

    if __name__ == "__main__":
        download_model()
    </copy>
    ```

3. Run the download script inside the Python container:

    ```
    <copy>podman exec python-runner python /workshop/02_download_model.py</copy>
    ```

    Because the `/workshop` directory is mounted from your laptop, the downloaded model file will appear at `~/hero/models/all_minilm_l12_v2.onnx` on your host once the script finishes.


## Task 2: Copy the Model into the Oracle Container

The ONNX model is stored in `~/hero/models/` on your laptop. Oracle Database needs the file inside its own container so it can import it. You copy it from your laptop directly into the Oracle container using `podman cp`.

1. Copy the model file from your laptop into the Oracle Database container:

    ```bash
    <copy>podman cp ~/hero/models/all_minilm_l12_v2.onnx oracle-ai-db:/tmp/all_minilm_l12_v2.onnx</copy>
    ```

2. Verify the file is inside the Oracle container:

    ```bash
    <copy>podman exec oracle-ai-db ls -lh /tmp/all_minilm_l12_v2.onnx</copy>
    ```

    You should see the file listed with its size.

## Task 3: Create a Database Directory for the Model

1. Create the file `~/hero/03_setup_directory.py`:

    ```
    <copy>## 03_setup_directory.py — Create Oracle Directory and load ONNX model
    import oracledb
    import config

    def setup_directory():
        """Create Oracle Directory pointing to /tmp inside the container."""
        print("Setting up Oracle Directory for ONNX model...")

        connection = oracledb.connect(
            user="sys",
            password="Welcome_1234",
            dsn=config.DB_DSN,
            mode=oracledb.AUTH_MODE_SYSDBA
        )

        cursor = connection.cursor()

        ## Create directory object pointing to /tmp in the container
        cursor.execute("""
            BEGIN
                EXECUTE IMMEDIATE 'CREATE OR REPLACE DIRECTORY ONNX_MODELS_DIR AS ''/tmp''';
            END;
        """)

        ## Grant read access to the workshop user
        cursor.execute("GRANT READ ON DIRECTORY ONNX_MODELS_DIR TO workshop")

        print("Oracle Directory ONNX_MODELS_DIR created successfully")
        print("  Path: /tmp (inside container)")
        print("  Read access granted to: workshop")

        cursor.close()
        connection.close()

    if __name__ == "__main__":
        setup_directory()
    </copy>
    ```

2. Run the script inside the Python container:

    ```
    <copy>podman exec python-runner python /workshop/03_setup_directory.py</copy>
    ```

## Task 4: Load the ONNX Model into Oracle Database

1. Create the file `~/hero/04_load_onnx_model.py`:

    ```
    <copy>## 04_load_onnx_model.py — Load ONNX model into Oracle Database
    import oracledb
    import config

    def load_onnx_model():
        """Load the ONNX embedding model into Oracle Database."""
        print(f"Loading ONNX model as '{config.ONNX_MODEL_NAME}'...")

        connection = oracledb.connect(
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            dsn=config.DB_DSN
        )

        cursor = connection.cursor()

        ## Check if model already exists
        cursor.execute("""
            SELECT COUNT(*) FROM all_mining_models
            WHERE model_name = UPPER(:model_name)
        """, model_name=config.ONNX_MODEL_NAME)

        if cursor.fetchone()[0] > 0:
            print(f"Model '{config.ONNX_MODEL_NAME}' already exists in the database.")
            print("Skipping load. To reload, first drop: DROP MINING MODEL all_minilm_l12_v2")
        else:
            ## Load the ONNX model using DBMS_VECTOR
            print("  Loading model... (this may take 1-2 minutes)")
            cursor.execute("""
                BEGIN
                    DBMS_VECTOR.LOAD_ONNX_MODEL(
                        directory => 'ONNX_MODELS_DIR',
                        file_name => 'all_minilm_l12_v2.onnx',
                        model_name => :model_name
                    );
                END;
            """, model_name=config.ONNX_MODEL_NAME)

            connection.commit()
            print(f"Model '{config.ONNX_MODEL_NAME}' loaded successfully!")

        ## Verify the model is available
        cursor.execute("""
            SELECT model_name, algorithm, mining_function
            FROM all_mining_models
            WHERE model_name = UPPER(:model_name)
        """, model_name=config.ONNX_MODEL_NAME)

        row = cursor.fetchone()
        if row:
            print(f"\nModel Details:")
            print(f"  Name:      {row[0]}")
            print(f"  Algorithm: {row[1]}")
            print(f"  Function:  {row[2]}")

        cursor.close()
        connection.close()

    if __name__ == "__main__":
        load_onnx_model()
    </copy>
    ```

2. Run the script inside the Python container:

    ```
    <copy>podman exec python-runner python /workshop/04_load_onnx_model.py</copy>
    ```

## Task 5: Test the ONNX Model

1. Create the file `~/hero/05_test_embedding.py`:

    ```
    <copy>## 05_test_embedding.py — Test the loaded ONNX model
    import oracledb
    import config

    def test_embedding():
        """Generate a test embedding to verify the model works."""
        print("Testing ONNX embedding model...\n")

        connection = oracledb.connect(
            user=config.DB_USER,
            password=config.DB_PASSWORD,
            dsn=config.DB_DSN
        )

        cursor = connection.cursor()

        test_texts = [
            "Oracle Database AI Vector Search",
            "Machine learning and artificial intelligence",
            "The weather is nice today"
        ]

        print("Generating embeddings for test sentences:\n")

        for text in test_texts:
            cursor.execute(f"""
                SELECT TO_VECTOR(
                    VECTOR_EMBEDDING({config.ONNX_MODEL_NAME} USING :text AS DATA)
                ) AS embedding
                FROM DUAL
            """, text=text)

            row = cursor.fetchone()
            embedding_str = str(row[0])
            ## Show first few dimensions
            dims = embedding_str.strip("[]").split(",")[:5]
            preview = ", ".join(d.strip() for d in dims)

            print(f"  Text: '{text}'")
            print(f"  Embedding (first 5 of {len(dims)+379} dims): [{preview}, ...]")
            print()

        ## Test cosine similarity between two texts
        cursor.execute(f"""
            SELECT VECTOR_DISTANCE(
                VECTOR_EMBEDDING({config.ONNX_MODEL_NAME} USING :text1 AS DATA),
                VECTOR_EMBEDDING({config.ONNX_MODEL_NAME} USING :text2 AS DATA),
                COSINE
            ) AS cosine_distance
            FROM DUAL
        """, text1="Oracle Database AI Vector Search",
            text2="Oracle AI and database technology")

        distance = cursor.fetchone()[0]
        similarity = 1 - float(distance)
        print(f"Cosine similarity between related sentences: {similarity:.4f}")
        print("  (1.0 = identical, 0.0 = completely different)")

        cursor.close()
        connection.close()
        print("\nEmbedding model test completed successfully!")

    if __name__ == "__main__":
        test_embedding()
    </copy>
    ```

2. Run the test inside the Python container:

    ```
    <copy>podman exec python-runner python /workshop/05_test_embedding.py</copy>
    ```

    You should see embedding vectors generated and a cosine similarity score close to 1.0 for semantically similar sentences.

## Learn More

* [DBMS_VECTOR.LOAD_ONNX_MODEL Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/dbms_vector-load_onnx_model.html)
* [VECTOR_EMBEDDING Function](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/vector_embedding.html)
* [Oracle Pre-built ONNX Models](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/import-onnx-models-oracle-database-end-end-example.html)

## Acknowledgements
* **Author** - Oracle LiveLabs Team
* **Last Updated By/Date** - Oracle LiveLabs Team, February 2026
