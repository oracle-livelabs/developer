# Lab 2: Vector Search with ONNX Model Stored in Oracle Database

## Introduction

In this lab you run vector search using an embedding model that is already stored in Oracle AI Database (for example `ALL_MINILM_L12_V2`).


Estimated Time: 20 minutes

### Objectives

In this lab, you will:
- Discover available embedding models in `USER_MINING_MODELS`
- Generate embeddings with `DBMS_VECTOR.UTL_TO_EMBEDDING` using `provider=database`
- Store vectors in a `VECTOR` column
- Run cosine similarity search in SQL

### Prerequisites

This lab assumes:
- You completed Lab 1

## Task 1: Download the Jupyter Notebooks

1. Open a new Terminal in JupyterLab and execute the following:

    ```bash
    <copy>
    /bin/bash -c 'set -euo pipefail; mkdir -p "$HOME/notebooks"; curl -fsSL -o /tmp/private-ai-notebooks.zip "https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/ai-ml-library/private-ai-notebooks.zip"; unzip -o /tmp/private-ai-notebooks.zip -d "$HOME/notebooks"; rm -f /tmp/private-ai-notebooks.zip'
    </copy>
    ```

    >Note: The above command will download a zip file and extract the content into a new folder 'notebooks'.

## Task 2: Open the Notebook

1. From the sidebar, double-click on the folder notebooks and then open the notebook (in case you do not see the folder click on refresh):
    
    ```
    database-model-embeddings.ipynb
    ```

    The following tasks and instructions are also available in the notebook. You can continue working from here on in the Jupyer Notebook.

## Task 3: Import Python Libraries

Run this cell:

```python
<copy>import os
import json
import re
import oracledb
from dotenv import dotenv_values</copy>
```

## Task 3: Load Database Configuration

Run this cell:

```python
<copy>ENV_PATH = os.getenv('LAB_ENV_FILE', '/home/.env')
env = dotenv_values(ENV_PATH) if os.path.exists(ENV_PATH) else {}

DB_USER = os.getenv('DB_USER') or env.get('USERNAME') or 'ADMIN'
DB_PASSWORD = os.getenv('DB_PASSWORD') or env.get('DBPASSWORD')
DB_HOST = os.getenv('DB_HOST', 'aidbfree')
DB_PORT = os.getenv('DB_PORT', '1521')
DB_SERVICE = os.getenv('DB_SERVICE', 'FREEPDB1')
DB_DSN = os.getenv('DB_DSN', f'{DB_HOST}:{DB_PORT}/{DB_SERVICE}')
PREFERRED_DB_MODEL = os.getenv('DB_EMBED_MODEL', 'ALL_MINILM_L12_V2').upper()

print('ENV file:', ENV_PATH if os.path.exists(ENV_PATH) else 'not found')
print('DB user:', DB_USER)
print('DB dsn :', DB_DSN)
print('Preferred DB model:', PREFERRED_DB_MODEL)

if not DB_PASSWORD:
    raise ValueError('DB password not found. Set DB_PASSWORD or DBPASSWORD in /home/.env')</copy>
```

## Task 4: Connect and Discover Stored Models

Run this cell:

```python
<copy>conn = oracledb.connect(user=DB_USER, password=DB_PASSWORD, dsn=DB_DSN)
cur = conn.cursor()

cur.execute('select user from dual')
print('Connected as:', cur.fetchone()[0])

cur.execute('''
    SELECT model_name
    FROM user_mining_models
    ORDER BY model_name
''')
models = [row[0] for row in cur.fetchall()]
print('Models in USER_MINING_MODELS:', models)

if not models:
    raise RuntimeError('No models found in USER_MINING_MODELS. Provision an ONNX model first.')

MODEL_NAME = PREFERRED_DB_MODEL if PREFERRED_DB_MODEL in models else models[0]
print('Selected DB model:', MODEL_NAME)

if not re.match(r'^[A-Z][A-Z0-9_$#]*$', MODEL_NAME):
    raise ValueError(f'Unsafe model identifier: {MODEL_NAME}')</copy>
```

## Task 5: Determine Embedding Dimension

Run this cell:

```python
<copy>db_params = json.dumps({
    'provider': 'database',
    'model': MODEL_NAME,
})

cur.execute('''
    SELECT VECTOR_DIMENSION_COUNT(
        DBMS_VECTOR.UTL_TO_EMBEDDING(:txt, JSON(:params))
    )
    FROM dual
''', {'txt': 'dimension probe', 'params': db_params})

EMBEDDING_DIM = int(cur.fetchone()[0])
print('Embedding dimension:', EMBEDDING_DIM)</copy>
```

## Task 6: Create Table and Store Embeddings

Run this cell:

```python
<copy>TABLE_NAME = 'PRIVATEAI_DOCS_DBMODEL'

try:
    cur.execute(f'DROP TABLE {TABLE_NAME} PURGE')
except oracledb.DatabaseError:
    pass

cur.execute(f'''
    CREATE TABLE {TABLE_NAME} (
        doc_id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
        title VARCHAR2(200) NOT NULL,
        content CLOB NOT NULL,
        embedding VECTOR({EMBEDDING_DIM}, FLOAT32)
    )
''')

docs = [
    ('Database Model Path', 'Embeddings can be generated directly in Oracle AI Database with a stored ONNX model.'),
    ('Operational Simplicity', 'Keeping model inference in-database can simplify architecture and governance.'),
    ('Vector Search SQL', 'Use VECTOR_DISTANCE with COSINE to rank semantic similarity results.'),
    ('Model Governance', 'Database-stored models can be versioned and controlled with DB privileges.'),
]

inserted = 0
for title, content in docs:
    cur.execute(f'''
        INSERT INTO {TABLE_NAME} (title, content, embedding)
        VALUES (
            :title,
            :content,
            DBMS_VECTOR.UTL_TO_EMBEDDING(:content, JSON(:params))
        )
    ''', {'title': title, 'content': content, 'params': db_params})
    inserted += 1

conn.commit()
print('Inserted rows:', inserted)</copy>
```

## Task 7: Run Similarity Search

Run this cell:

```python
<copy>query_text = 'Which approach keeps embedding generation inside Oracle Database?'

sql = f'''
SELECT
    title,
    ROUND(1 - VECTOR_DISTANCE(
        embedding,
        DBMS_VECTOR.UTL_TO_EMBEDDING(:query_text, JSON(:params)),
        COSINE
    ), 4) AS similarity,
    SUBSTR(content, 1, 120) AS preview
FROM {TABLE_NAME}
ORDER BY VECTOR_DISTANCE(
    embedding,
    DBMS_VECTOR.UTL_TO_EMBEDDING(:query_text, JSON(:params)),
    COSINE
)
FETCH FIRST 3 ROWS ONLY
'''

cur.execute(sql, {'query_text': query_text, 'params': db_params})
rows = cur.fetchall()

print('Query:', query_text)
for idx, (title, score, preview) in enumerate(rows, 1):
    print(f'{idx}. {title} | score={score}')
    print(f'   {preview}')</copy>
```

## Task 8: Optional Cleanup

Run optional cleanup:

```python
<copy># cur.execute(f'DROP TABLE {TABLE_NAME} PURGE')
# conn.commit()</copy>
```

Close the connection:

```python
<copy>cur.close()
conn.close()
print('Connection closed.')</copy>
```

## Learn More

- [DBMS_VECTOR UTL_TO_EMBEDDING](https://docs.oracle.com/en/database/oracle/oracle-database/26/vecse/utl_to_embedding-and-utl_to_embeddings-dbms_vector.html)

## Acknowledgements
- **Author** - Oracle LiveLabs Team
- **Last Updated By/Date** - Oracle LiveLabs Team, March 2026
