# Implement Vector Search and RAG with Gemini and Oracle AI Database

## Introduction

In this lab, you will implement vector embeddings using Google's Gemini models and store them in Oracle AI Database. You'll build a Retrieval-Augmented Generation (RAG) system that combines the power of Gemini's language capabilities with Oracle's AI Vector Search for semantic retrieval.

Estimated Time: 25 minutes

### Objectives

* Generate embeddings using Gemini embedding models
* Store and index vectors in Oracle AI Database
* Implement semantic search using AI Vector Search
* Build a RAG pipeline for grounded AI responses
* Use Select AI for natural language database queries

### Prerequisites

* Completed Lab 1: Deploy Oracle AI Database and GCP Compute Instance
* Database connection configured
* Vertex AI API enabled

## Task 1: Create Vector Tables in Oracle Database

1. Connect to your database using Database Actions or SQL Developer

2. Create a schema for vector data:
   ```sql
   -- Create user for vector data
   CREATE USER vecuser IDENTIFIED BY "ComplexPassword123!";
   GRANT CONNECT, RESOURCE TO vecuser;
   GRANT UNLIMITED TABLESPACE TO vecuser;
   
   -- Grant vector-specific privileges
   GRANT CREATE TABLE TO vecuser;
   GRANT CREATE VIEW TO vecuser;
   ```

3. Connect as `vecuser` and create vector table:
   ```sql
   -- Table to store documents with embeddings
   CREATE TABLE document_embeddings (
       id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
       content CLOB NOT NULL,
       embedding VECTOR(768, FLOAT32) NOT NULL,  -- Gemini embedding dimension
       metadata JSON,
       created_at TIMESTAMP DEFAULT SYSTIMESTAMP
   );
   
   -- Create vector index for fast similarity search
   CREATE VECTOR INDEX doc_emb_idx ON document_embeddings(embedding)
   ORGANIZATION INMEMORY NEIGHBOR GRAPH
   DISTANCE COSINE
   WITH TARGET ACCURACY 95;
   ```

   ![Create Vector Table](images/create-vector-table.png " ")

## Task 2: Generate Embeddings with Gemini

1. On your GCP compute instance, create a script for generating embeddings:
   ```python
   cat > ~/generate_embeddings.py << 'EOF'
   from vertexai.language_models import TextEmbeddingModel
   import vertexai
   import oracledb
   import json
   
   # Initialize Vertex AI
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   # Initialize embedding model
   model = TextEmbeddingModel.from_pretrained("textembedding-gecko@003")
   
   def get_embedding(text):
       """Generate embedding for text using Gemini."""
       embeddings = model.get_embeddings([text])
       return embeddings[0].values
   
   # Database connection
   connection = oracledb.connect(
       user="vecuser",
       password="ComplexPassword123!",
       dsn="agenticaidb_high",
       config_dir="/home/your_username/wallet",
       wallet_location="/home/your_username/wallet",
       wallet_password="YourWalletPassword"
   )
   
   # Sample documents about AI and databases
   documents = [
       {
           "content": "Oracle AI Database provides native vector search capabilities for semantic similarity queries.",
           "metadata": {"category": "database", "topic": "vector-search"}
       },
       {
           "content": "Google Gemini is a multimodal AI model that can understand and generate text, code, and images.",
           "metadata": {"category": "ai-model", "topic": "gemini"}
       },
       {
           "content": "RAG combines retrieval of relevant documents with generation to produce grounded AI responses.",
           "metadata": {"category": "technique", "topic": "rag"}
       },
       {
           "content": "Agentic AI systems can plan, reason, and take actions to accomplish complex goals autonomously.",
           "metadata": {"category": "ai-architecture", "topic": "agents"}
       },
       {
           "content": "Vector embeddings represent text as dense numerical vectors capturing semantic meaning.",
           "metadata": {"category": "technique", "topic": "embeddings"}
       }
   ]
   
   cursor = connection.cursor()
   
   # Insert documents with embeddings
   for doc in documents:
       embedding = get_embedding(doc["content"])
       embedding_array = list(embedding)
       
       cursor.execute("""
           INSERT INTO document_embeddings (content, embedding, metadata)
           VALUES (:content, :embedding, :metadata)
       """, {
           "content": doc["content"],
           "embedding": embedding_array,
           "metadata": json.dumps(doc["metadata"])
       })
   
   connection.commit()
   print(f"Inserted {len(documents)} documents with embeddings")
   
   cursor.close()
   connection.close()
   EOF
   ```

2. Update the script with your credentials and run:
   ```bash
   python generate_embeddings.py
   ```

## Task 3: Implement Semantic Search

1. Create a semantic search function:
   ```python
   cat > ~/semantic_search.py << 'EOF'
   from vertexai.language_models import TextEmbeddingModel
   import vertexai
   import oracledb
   import json
   
   # Initialize
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   model = TextEmbeddingModel.from_pretrained("textembedding-gecko@003")
   
   def semantic_search(query, top_k=3):
       """Search for similar documents using vector similarity."""
       # Generate query embedding
       query_embedding = model.get_embeddings([query])[0].values
       query_array = list(query_embedding)
       
       # Connect to database
       connection = oracledb.connect(
           user="vecuser",
           password="ComplexPassword123!",
           dsn="agenticaidb_high",
           config_dir="/home/your_username/wallet",
           wallet_location="/home/your_username/wallet",
           wallet_password="YourWalletPassword"
       )
       
       cursor = connection.cursor()
       
       # Perform vector similarity search
       cursor.execute("""
           SELECT 
               id,
               content,
               metadata,
               VECTOR_DISTANCE(embedding, :query_vec, COSINE) as distance
           FROM document_embeddings
           ORDER BY distance
           FETCH FIRST :top_k ROWS ONLY
       """, {
           "query_vec": query_array,
           "top_k": top_k
       })
       
       results = []
       for row in cursor:
           results.append({
               "id": row[0],
               "content": row[1],
               "metadata": json.loads(row[2]) if row[2] else {},
               "similarity": 1 - row[3]  # Convert distance to similarity
           })
       
       cursor.close()
       connection.close()
       
       return results
   
   # Test semantic search
   if __name__ == "__main__":
       queries = [
           "How do vector databases work?",
           "What are AI agents?",
           "Explain retrieval augmented generation"
       ]
       
       for query in queries:
           print(f"\nQuery: {query}")
           print("-" * 80)
           results = semantic_search(query, top_k=2)
           for i, result in enumerate(results, 1):
               print(f"\n{i}. Similarity: {result['similarity']:.4f}")
               print(f"   Content: {result['content']}")
               print(f"   Metadata: {result['metadata']}")
   EOF
   ```

2. Run the semantic search:
   ```bash
   python semantic_search.py
   ```

   ![Semantic Search Results](images/semantic-search-results.png " ")

## Task 4: Build RAG Pipeline with Gemini

1. Create a RAG implementation:
   ```python
   cat > ~/rag_pipeline.py << 'EOF'
   from vertexai.language_models import TextEmbeddingModel
   from vertexai.generative_models import GenerativeModel
   import vertexai
   import oracledb
   
   # Initialize
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   embedding_model = TextEmbeddingModel.from_pretrained("textembedding-gecko@003")
   generative_model = GenerativeModel("gemini-pro")
   
   def retrieve_context(query, top_k=3):
       """Retrieve relevant documents from Oracle AI Database."""
       query_embedding = embedding_model.get_embeddings([query])[0].values
       query_array = list(query_embedding)
       
       connection = oracledb.connect(
           user="vecuser",
           password="ComplexPassword123!",
           dsn="agenticaidb_high",
           config_dir="/home/your_username/wallet",
           wallet_location="/home/your_username/wallet",
           wallet_password="YourWalletPassword"
       )
       
       cursor = connection.cursor()
       cursor.execute("""
           SELECT content
           FROM document_embeddings
           ORDER BY VECTOR_DISTANCE(embedding, :query_vec, COSINE)
           FETCH FIRST :top_k ROWS ONLY
       """, {"query_vec": query_array, "top_k": top_k})
       
       contexts = [row[0] for row in cursor]
       cursor.close()
       connection.close()
       
       return contexts
   
   def rag_generate(query):
       """Generate response using RAG."""
       # Retrieve relevant context
       contexts = retrieve_context(query, top_k=3)
       
       # Build prompt with context
       context_text = "\n\n".join([f"Context {i+1}: {ctx}" 
                                   for i, ctx in enumerate(contexts)])
       
       prompt = f"""Based on the following context, answer the question.
   
   {context_text}
   
   Question: {query}
   
   Answer: Provide a detailed answer based solely on the context provided above."""
       
       # Generate response
       response = generative_model.generate_content(prompt)
       
       return {
           "query": query,
           "contexts": contexts,
           "response": response.text
       }
   
   # Test RAG pipeline
   if __name__ == "__main__":
       questions = [
           "What is Oracle AI Database used for?",
           "How does RAG improve AI responses?",
           "What capabilities do AI agents have?"
       ]
       
       for question in questions:
           print(f"\n{'='*80}")
           print(f"Question: {question}")
           print(f"{'='*80}")
           
           result = rag_generate(question)
           
           print("\nRetrieved Contexts:")
           for i, ctx in enumerate(result["contexts"], 1):
               print(f"{i}. {ctx}")
           
           print(f"\nGenerated Response:")
           print(result["response"])
   EOF
   ```

2. Run the RAG pipeline:
   ```bash
   python rag_pipeline.py
   ```

   ![RAG Pipeline](images/rag-pipeline-output.png " ")

## Task 5: Use Oracle Select AI for Natural Language Queries

1. Enable Select AI in your database (as ADMIN user):
   ```sql
   -- Grant necessary privileges
   GRANT DB_DEVELOPER_ROLE TO vecuser;
   GRANT EXECUTE ON DBMS_CLOUD TO vecuser;
   GRANT EXECUTE ON DBMS_CLOUD_AI TO vecuser;
   ```

2. Configure Select AI to use Gemini (connect as vecuser):
   ```sql
   -- Create credential for Vertex AI
   BEGIN
     DBMS_CLOUD.CREATE_CREDENTIAL(
       credential_name => 'VERTEX_AI_CRED',
       username => 'your-service-account-email',
       password => 'your-service-account-key'
     );
   END;
   /
   
   -- Create AI profile for Gemini
   BEGIN
     DBMS_CLOUD_AI.CREATE_PROFILE(
       profile_name => 'GEMINI_PRO',
       attributes => JSON_OBJECT(
         'provider' VALUE 'google',
         'credential_name' VALUE 'VERTEX_AI_CRED',
         'object_list' VALUE JSON_ARRAY(
           JSON_OBJECT(
             'owner' VALUE 'VECUSER',
             'name' VALUE 'DOCUMENT_EMBEDDINGS'
           )
         ),
         'model' VALUE 'gemini-pro',
         'project_id' VALUE 'your-project-id',
         'location' VALUE 'us-central1'
       )
     );
   END;
   /
   ```

3. Use natural language to query your database:
   ```sql
   -- Set the AI profile
   EXEC DBMS_CLOUD_AI.SET_PROFILE('GEMINI_PRO');
   
   -- Query using natural language
   SELECT DBMS_CLOUD_AI.GENERATE(
     prompt => 'Show me all documents about AI agents',
     profile_name => 'GEMINI_PRO'
   ) FROM DUAL;
   
   SELECT DBMS_CLOUD_AI.GENERATE(
     prompt => 'How many documents are in the database?',
     profile_name => 'GEMINI_PRO'
   ) FROM DUAL;
   ```

   ![Select AI Query](images/select-ai-query.png " ")

## Task 6: Advanced Vector Operations

1. Create a function for hybrid search (keyword + semantic):
   ```sql
   CREATE OR REPLACE FUNCTION hybrid_search(
       p_query VARCHAR2,
       p_top_k NUMBER DEFAULT 5
   ) RETURN SYS_REFCURSOR IS
       v_cursor SYS_REFCURSOR;
   BEGIN
       OPEN v_cursor FOR
           SELECT 
               id,
               content,
               metadata,
               -- Combine keyword and vector similarity
               (0.3 * CONTAINS_SCORE(1) + 
                0.7 * (1 - VECTOR_DISTANCE(embedding, 
                       (SELECT embedding FROM document_embeddings 
                        WHERE ROWNUM = 1), COSINE))) as hybrid_score
           FROM document_embeddings
           WHERE CONTAINS(content, p_query, 1) > 0
           ORDER BY hybrid_score DESC
           FETCH FIRST p_top_k ROWS ONLY;
       
       RETURN v_cursor;
   END;
   /
   ```

Congratulations! You have successfully implemented vector search and RAG using Gemini embeddings and Oracle AI Database. You can now perform semantic search, build grounded AI applications, and query your database using natural language.

You may now **proceed to the next lab**.

## Learn More

* [Oracle AI Vector Search Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/)
* [Vertex AI Embeddings](https://cloud.google.com/vertex-ai/docs/generative-ai/embeddings/get-text-embeddings)
* [Oracle Select AI](https://docs.oracle.com/en/database/oracle/oracle-database/23/arpls/dbms_cloud_ai.html)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, December 2025
