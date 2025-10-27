# Lab 2: Vectorizing the Evidence - Transforming Clues into Embeddings


## Introduction

"Data! Data! Data!" Holmes would exclaim. "I cannot make bricks without clay." But what if our clay could be transformed into something more powerful - something that captures not just the words, but the very essence and relationships between our clues?

In this lab, you'll learn how to vectorize your textual clues using AI embeddings. These vector representations will allow us to find semantic similarities between clues that traditional keyword searches might miss - much like Holmes connecting seemingly unrelated facts to solve a case.

Estimated Lab Time: 20 minutes

## Task 1: Understand Vector Embeddings

Before we dive into the technical implementation, let's understand what vector embeddings are and why they're crucial for our investigation.

Vector embeddings are numerical representations of text that capture semantic meaning. Similar concepts will have similar vector representations, allowing us to find connections based on meaning rather than just keywords.

<img src="http://127.0.0.1:5500/images/vector-embeddings-explained.png" alt="Vector Embeddings Explained">

## Task 2: Import the Embedding Model

Before we can vectorize our clues, we need to import the all-MiniLM-L12-v2 embedding model into our database. This model will convert text into numerical vectors that capture meaning. Take a look at this diagram that explains what we are about to do.
<img src="http://127.0.0.1:5500/images/vector-embeddings-model.png" alt="Vector Embeddings Explained">

### Load the all-MiniLM-L12-v2 Model

Execute this SQL script to import the pre-built all-MiniLM-L12-v2 embedding model:

```sql
<copy>
DECLARE 
    ONNX_MOD_FILE VARCHAR2(100) := 'all_MiniLM_L12_v2.onnx';
    MODNAME VARCHAR2(500);
    LOCATION_URI VARCHAR2(200) := 'https://adwc4pm.objectstorage.us-ashburn-1.oci.customer-oci.com/p/eLddQappgBJ7jNi6Guz9m9LOtYe2u8LWY19GfgU8flFK4N9YgP4kTlrE9Px3pE12/n/adwc4pm/b/OML-Resources/o/';

BEGIN
    DBMS_OUTPUT.PUT_LINE('ONNX model file name in Object Storage is: '||ONNX_MOD_FILE); 
--------------------------------------------
-- Define a model name for the loaded model
--------------------------------------------
    SELECT UPPER(REGEXP_SUBSTR(ONNX_MOD_FILE, '[^.]+')) INTO MODNAME from dual;
    DBMS_OUTPUT.PUT_LINE('Model will be loaded and saved with name: '||MODNAME);

-----------------------------------------------------
-- Read the ONNX model file from Object Storage into 
-- the Autonomous Database data pump directory
-----------------------------------------------------

BEGIN DBMS_DATA_MINING.DROP_MODEL(model_name => MODNAME);
EXCEPTION WHEN OTHERS THEN NULL; END;

    DBMS_CLOUD.GET_OBJECT(                            
        credential_name => NULL,
        directory_name => 'DATA_PUMP_DIR',
        object_uri => LOCATION_URI||ONNX_MOD_FILE);

-----------------------------------------
-- Load the ONNX model to the database
-----------------------------------------                   

    DBMS_VECTOR.LOAD_ONNX_MODEL(
        directory => 'DATA_PUMP_DIR',
        file_name => ONNX_MOD_FILE,
        model_name => MODNAME);

    DBMS_OUTPUT.PUT_LINE('New model successfully loaded with name: '||MODNAME);
END;
</copy>
```

**Important:** Make sure you have the necessary privileges to load models. This script downloads the model from Oracle's Object Storage and loads it into your database.

### Verify the Model Was Loaded

Check that the model loaded successfully:

```sql
<copy>
SELECT model_name, mining_function, algorithm
FROM user_mining_models
WHERE model_name = 'ALL_MINILM_L12_V2';
</copy>
```

You should see the model listed. The all-MiniLM-L12-v2 model creates 384-dimensional vectors that capture semantic meaning, allowing us to find clues with similar concepts even when they use different words.
<img src="http://127.0.0.1:5500/images/embedding-model-select.png" alt="Vector Embedding Model">

## Task 3: Generate Embeddings for Our Clues

Now we'll vectorize each clue in our mystery_clues table. This will allow us to perform semantic searches later.

1. Update the embedding column for all existing clues:

   ```sql
   <copy>
   UPDATE mystery_clues
   SET embedding = VECTOR_EMBEDDING(ALL_MINILM_L12_V2 USING clue_text AS data)
   WHERE embedding IS NULL;
   </copy>
   ```

   This command uses Oracle's built-in embedding function to convert each clue_text into a vector representation.

2. Verify that embeddings were generated:

   ```sql
   <copy>
   SELECT clue_id, clue_type, SUBSTR(clue_text, 1, 50) || '...' as clue_preview,
         embedding as vector_dimension
   FROM mystery_clues
   WHERE embedding IS NOT NULL
   ORDER BY clue_id;
   </copy>
   ```

   You should see that each clue now has a vector representation with the appropriate dimensions.

## Task 4: Create a Vector Index for Efficient Searching

To perform fast vector searches, we need to create a vector index on our embedding column.

1. Create the vector index:

   ```sql
   <copy>
   CREATE VECTOR INDEX idx_clue_embedding
   ON mystery_clues (embedding)
   ORGANIZATION INMEMORY NEIGHBOR GRAPH
   DISTANCE COSINE;
   </copy>
   ```

   This creates an in-memory neighbor graph index optimized for cosine distance similarity searches.

## Task 5: Test Basic Vector Similarity

Let's test our vector setup by finding clues that are semantically similar to a test query.

1. Try a test with "scientific evidence":

   ```sql
   <copy>
   SELECT clue_id, clue_type, location_found,
          SUBSTR(clue_text, 1, 80) || '...' as clue_preview,
          ROUND(VECTOR_DISTANCE(embedding,
                               VECTOR_EMBEDDING(ALL_MINILM_L12_V2 USING 'scientific evidence' AS data),
                               COSINE), 4) as similarity_score
   FROM mystery_clues
   ORDER BY similarity_score
   FETCH FIRST 5 ROWS ONLY;
   </copy>
   ```

   Notice how this finds this science-related evidence:

| Clue ID | Clue Type | Location Found | Clue Description | Similarity Score |
|---------|-----------|----------------|------------------|------------------|
| 9 | Physical Evidence | Vault Entrance | Test tubes with glowing residue found near the vault entrance, suggesting chemistry expertise... | 0.705 |
| 6 | Witness Report | Near Museum | Strange glowing patterns resembling chemical formulas were seen dancing in the fog outside... | 0.772 |
| 7 | Witness Report | Near Vault | A foreign accent was heard whispering about hydrogen secrets near the vault entrance... | 0.828 |
| 10 | Physical Evidence | Vault Entrance | Footprints in the dust that suddenly vanish at the vault door, suggesting theatrical trickery... | 0.830 |
| 1 | Witness Report | Main Gallery | Strange glowing lights formed intricate patterns in the air above the gallery, creating an eerie atmosphere... | 0.858 |




## Task 6: A Breakthrough! New Evidence Arrives

Holmes gestured to Lestrade's evidence file. "Inspector, what about that handkerchief the forensics team found snagged on the vault filing cabinet?"
Lestrade rummaged through his papers. "Oh yes! Didn't think it was important - probably just dropped by museum staff during normal operations."

"Let me see it," Holmes demanded.
Lestrade read from his notes: "A monogrammed silk handkerchief, embroidered with 'C.P' in gold thread, was found snagged on a filing cabinet drawer inside the vault."

Let's add and vectorize this crucial new evidence:

1. Insert the breakthrough clue:

```sql
<copy>
-- Adding the crucial 11th clue that Watson's keyword search missed
INSERT INTO mystery_clues (clue_id, clue_type, location_found, clue_text)
VALUES (11, 'Physical Evidence', 'Inside Vault', 
        'A notebook with chemistry research on renewable energy signed "C.P" found dropped on the floor inside the vault');

COMMIT;
</copy>
```

2. Vectorize the new clue:

And, now we update the clue to have a vector embedding like so:
```sql
<copy>
UPDATE mystery_clues
SET embedding = VECTOR_EMBEDDING(ALL_MINILM_L12_V2 USING clue_text AS data)
WHERE clue_id = 11;
</copy>
```

"There," Holmes said. "Now all eleven clues are in the database."  

## Summary

Brilliant work, detective! You've successfully vectorized your clues, transforming simple text into powerful semantic representations. This is the digital equivalent of Holmes's ability to see connections that others miss.

In the next lab, we'll see how traditional SQL queries might miss important connections that AI Vector Search can reveal. The mystery deepens, but so do our investigative capabilities!

