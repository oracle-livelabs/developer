# Lab 3: Vector Search with Oracle Private AI Services Container

## Introduction

In this lab you run vector search using Oracle Private AI Services Container (`privateai`) for embedding generation.

This lab mirrors the notebook:

```text
privateai-container-embeddings.ipynb
```

Estimated Time: 15 minutes

### Objectives

In this lab, you will:
- Validate Private AI APIs (`/health`, `/v1/models`, `/v1/embeddings`)
- Select a text-embedding model dynamically
- Store vectors in Oracle AI Database using `provider=privateai`
- Run cosine similarity search in SQL

### Prerequisites

This lab assumes:
- You completed Lab 1
- JupyterLab is available
- `/home/.env` contains your DB credentials
- Private AI container is reachable as `http://privateai:8080`

## Task 1: Download the Jupyter Notebooks

1. Open a new Terminal in JupyterLab and execute the following. In case you have already downloaded the notebooks, you can skip this step.

    ```bash
    <copy>
    /bin/bash -c 'set -euo pipefail; mkdir -p "$HOME/notebooks"; curl -fsSL -o /tmp/private-ai-notebooks.zip "https://c4u04.objectstorage.us-ashburn-1.oci.customer-oci.com/p/EcTjWk2IuZPZeNnD_fYMcgUhdNDIDA6rt9gaFj_WZMiL7VvxPBNMY60837hu5hga/n/c4u04/b/livelabsfiles/o/ai-ml-library/private-ai-notebooks.zip"; unzip -o /tmp/private-ai-notebooks.zip -d "$HOME/notebooks"; rm -f /tmp/private-ai-notebooks.zip'
    </copy>
    ```

    >Note: The above command will download a zip file and extract the content into a new folder 'notebooks'.

## Task 2: Open the Notebook

1. From the sidebar, double-click on the folder notebooks and then open the notebook (in case you do not see the folder click on refresh):
    
    ```
    privateai-container-embeddings.ipynb
    ```

    The following tasks and instructions are also available in the notebook. You can continue working from here on in the Jupyer Notebook.


## Task 3: Import Python Libraries

Run this cell:

This cell imports the Python modules used throughout the notebook. You need these libraries to read environment settings, connect to Oracle Database, format JSON parameters, and safely validate model names before using them in SQL.


```python
<copy>import os
import json
import requests
import oracledb
from dotenv import dotenv_values</copy>
```

## Task 4: Load Configuration

Run this cell:

This step reads database and Private AI settings from environment variables and prints the active values. It gives you a quick sanity check that the notebook is pointing to the correct services before any API or SQL calls run.

```python
<copy>ENV_PATH = os.getenv('LAB_ENV_FILE', '/home/.env')
env = dotenv_values(ENV_PATH) if os.path.exists(ENV_PATH) else {}

DB_USER = os.getenv('DB_USER') or env.get('USERNAME') or 'ADMIN'
DB_PASSWORD = os.getenv('ORACLE_PWD') 
DB_HOST = os.getenv('DB_HOST', 'aidbfree')
DB_PORT = os.getenv('DB_PORT', '1521')
DB_SERVICE = os.getenv('DB_SERVICE', 'FREEPDB1')
DB_DSN = os.getenv('DB_DSN', f'{DB_HOST}:{DB_PORT}/{DB_SERVICE}')

PRIVATEAI_BASE_URL = os.getenv('PRIVATEAI_BASE_URL', 'http://privateai:8080').rstrip('/')
PREFERRED_MODEL = os.getenv('PRIVATEAI_MODEL', 'all-minilm-l12-v2')

print('ENV file:', ENV_PATH if os.path.exists(ENV_PATH) else 'not found')
print('DB user:', DB_USER)
print('DB dsn :', DB_DSN)
print('Private AI URL:', PRIVATEAI_BASE_URL)
print('Preferred model:', PREFERRED_MODEL)

if not DB_PASSWORD:
    raise ValueError('DB password not found. Set ORACLE_PWD)</copy>
```

## Task 5: Validate Private AI and Choose Model

Run this cell:

This block checks that the Private AI service is healthy, fetches the deployed model list, filters to text-embedding-capable models, and selects one model ID. You do this now so the rest of the lab uses a model that is actually available in your environment.

```python
<copy>health = requests.get(f'{PRIVATEAI_BASE_URL}/health', timeout=20)
print('Health status:', health.status_code)
health.raise_for_status()

models_resp = requests.get(f'{PRIVATEAI_BASE_URL}/v1/models', timeout=20)
models_resp.raise_for_status()
models = models_resp.json().get('data', [])

if not models:
    raise RuntimeError('No models returned by /v1/models')

def norm(s):
    return (s or '').strip().lower()

text_models = []
for model in models:
    mid = model.get('id')
    caps = [c.upper() for c in model.get('modelCapabilities', [])]
    print(' -', mid, '|', ','.join(caps))
    if mid and any(c in ('TEXT_EMBEDDINGS', 'EMBEDDINGS') for c in caps):
        text_models.append(mid)

if not text_models:
    raise RuntimeError('No TEXT_EMBEDDINGS-capable models found')

MODEL_ID = next((m for m in text_models if norm(m) == norm(PREFERRED_MODEL)), None)
if MODEL_ID is None:
    MODEL_ID = next((m for m in text_models if norm(m) == 'all-minilm-l12-v2'), text_models[0])

print()
print('Selected model:', MODEL_ID)</copy>
```

## Task 6: Send embedding request to REST API

Run this cell:

Here you send a direct embeddings request to the Private AI endpoint with sample text. The response confirms end-to-end API behavior and reveals the embedding dimension needed for the database `VECTOR` column.

```python
<copy>payload = {
    'model': MODEL_ID,
    'input': [
        'Oracle AI Database supports vector similarity search.',
        'Private AI Services Container runs embedding models close to your data.'
    ],
}

resp = requests.post(f'{PRIVATEAI_BASE_URL}/v1/embeddings', json=payload, timeout=60)
if not resp.ok:
    print('Status :', resp.status_code)
    print('Body   :', resp.text[:1500])
resp.raise_for_status()

embed_json = resp.json()
first_vec = embed_json['data'][0]['embedding']
EMBEDDING_DIM = len(first_vec)

print('Returned vectors:', len(embed_json.get('data', [])))
print('Embedding dimension:', EMBEDDING_DIM)</copy>
```

## Task 7: Connect to Oracle Database

Run this cell:

This step opens a database session and verifies the connected user. It establishes the SQL connection required to create tables, insert vectors, and run similarity search queries.

```python
<copy>conn = oracledb.connect(user=DB_USER, password=DB_PASSWORD, dsn=DB_DSN)
cur = conn.cursor()

cur.execute('select user')
print('Connected as:', cur.fetchone()[0])</copy>
```

## Task 8: Create Table and Store Private AI Embeddings

Run this cell:

This cell creates a demo table, defines Private AI embedding parameters, and inserts sample rows with vectors generated through Private AI Services Container. The result is a searchable vector dataset stored in Oracle AI Database.

```python
<copy>TABLE_NAME = 'PRIVATEAI_DOCS_CONTAINER'

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
    ('Why Private AI Container', 'Private AI keeps inference local and exposes embedding APIs by container endpoint.'),
    ('Why Vector Search', 'Vector search compares semantic meaning and not only exact keyword matches.'),
    ('JupyterLab Delivery', 'Notebooks are a practical way to prototype retrieval and embedding pipelines quickly.'),
    ('RAG Workflow', 'Chunk, embed, store, and retrieve relevant context at question time.'),
]

embed_params = json.dumps({
    'provider': 'privateai',
    'url': f'{PRIVATEAI_BASE_URL}/v1/embeddings',
    'host': 'local',
    'model': MODEL_ID,
})

inserted = 0
for title, content in docs:
    cur.execute(f'''
        INSERT INTO {TABLE_NAME} (title, content, embedding)
        VALUES (
            :title,
            :content,
            DBMS_VECTOR.UTL_TO_EMBEDDING(:content, JSON(:params))
        )
    ''', {'title': title, 'content': content, 'params': embed_params})
    inserted += 1

conn.commit()
print('Inserted rows:', inserted)</copy>
```

## Task 9: Run Similarity Search

Run this cell:

This query converts the user question into an embedding and ranks stored rows by cosine similarity. It demonstrates semantic retrieval, where meaning-based matches can be returned even when keywords differ.

```python
<copy>query_text = 'How can I run embeddings locally and use them for semantic search?'

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

cur.execute(sql, {'query_text': query_text, 'params': embed_params})
rows = cur.fetchall()

print('Query:', query_text)
for idx, (title, score, preview) in enumerate(rows, 1):
    print(f'{idx}. {title} | score={score}')
    print(f'   {preview}')</copy>
```

## Task 10: Optional Cleanup

Run optional cleanup:

Use this optional command to drop the demo table when you want to reset and rerun the lab from a clean state.

```python
<copy># cur.execute(f'DROP TABLE {TABLE_NAME} PURGE')
# conn.commit()</copy>
```

Close the connection:

This final cell closes the cursor and connection so the session ends cleanly and no resources remain open in the notebook kernel.

```python
<copy>cur.close()
conn.close()
print('Connection closed.')</copy>
```

> **Troubleshooting:** If you see `ORA-20002` with `ORA-29273` or `ORA-24247`, the DB user is missing outbound network ACL permissions for HTTP calls to Private AI.

## Learn More

- [Oracle Private AI Services Container User Guide](https://docs.oracle.com/en/database/oracle/oracle-database/26/prvai/oracle-private-ai-services-container.html)
- [Private AI Services Container API Reference](https://docs.oracle.com/en/database/oracle/oracle-database/26/prvai/private-ai-services-container-api-reference.html)

## Acknowledgements
- **Author** - Oracle LiveLabs Team
- **Last Updated By/Date** - Oracle LiveLabs Team, April 2026
