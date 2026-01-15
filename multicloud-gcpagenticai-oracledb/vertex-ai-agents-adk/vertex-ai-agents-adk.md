# Oracle AI Database RAG with Google Vertex AI Agents

## Introduction

This lab demonstrates developing a RAG system using Oracle AI Database, Google Vertex AI, and multiple agent interfaces. You'll learn how to create a vector search knowledge base, expose it via FastAPI, and integrate it with Google's Conversational Agents and Agent Development Kit (ADK).

Please refer to the `Building AI Agents with Vertex AI Agent Builder` tutorial found here: https://codelabs.developers.google.com/devsite/codelabs/building-ai-agents-vertexai if you are interested in running a no-code version 

Estimated Time: 1 hour

### Objectives

* Set up Oracle Database vector store with 768-dimensional embeddings
* Build FastAPI service with OpenAPI specification
* Create Streamlit UI for document management
* Integrate with GCP Vertex AI Conversational Agents
* Implement full ADK agent with multi-step reasoning

### Prerequisites

* Oracle AI Database (and wallet) and GCP compute instance - both configured in previous labs
* The GCP compute instance is configured for remote VS Code access and that environment has Python 3.12+, Git, etc. pre-installed
* Basic understanding of REST APIs and vector embeddings

## Task 1: Environment Setup

1. In the VS Code/terminal running on your GCP compute instance, clone the repository:
   ```bash
   git clone https://github.com/paulparkinson/interactive-ai-holograms.git
   cd interactive-ai-holograms/oracle-ai-database-gcp-vertex-ai
   ```

2. Run theConfigure Oracle Database:

   Run the first 
   
   Upload the database wallet and extract files in `./Wallet_PAULPARKDB` directory.

   Copy over the example .env file so you can edit it...
   ```bash
   cp .env_example .env
   ```
   Provide all config/environment information for database, etc. in .env file...

3. Create RAG table in the database:
   ```sql
   CREATE TABLE rag_tab (
       id NUMBER GENERATED ALWAYS AS IDENTITY,
       text VARCHAR2(4000),
       link VARCHAR2(500),
       embedding VECTOR(768, FLOAT32)
   );

   CREATE VECTOR INDEX rag_idx ON rag_tab(embedding)
   ORGANIZATION INMEMORY NEIGHBOR GRAPH
   DISTANCE COSINE;
   ```

4. Configure GCP:
   ```bash
   gcloud config set project adb-pm-prod
   gcloud config set compute/region us-central1
   gcloud auth login
   gcloud auth application-default login
   ```

5. Create environment variables file (`.env`):
   ```bash
   cat > .env << 'EOF'
   # Oracle Database
   DB_USERNAME=ADMIN
   DB_PASSWORD=your_password
   DB_DSN=paulparkdb_tp_high
   DB_WALLET_PASSWORD=your_wallet_password
   DB_WALLET_DIR=./Wallet_PAULPARKDB

   # Google Cloud
   GCP_PROJECT_ID=adb-pm-prod
   GCP_REGION=us-central1

   # API Configuration
   ORACLE_RAG_API_URL=http://10.150.0.8:8501
   API_PORT=8501
   STREAMLIT_PORT=8502
   EOF
   ```

6. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

   Key dependencies include:
   - `langchain>=1.0.0` - LangChain framework
   - `langchain-google-vertexai>=3.2.0` - Vertex AI integration
   - `oracledb` - Oracle database driver
   - `fastapi` - REST API framework
   - `streamlit` - UI framework
   - `vertexai` - Google Vertex AI SDK

   ![Environment Setup](images/environment-setup.png " ")

## Task 2: Document Ingestion with Streamlit

1. Understanding the Streamlit UI architecture:
   
   File: `rag_app_ui.py`
   
   The Streamlit application provides:
   - PDF upload and parsing (PyPDF2)
   - Text chunking with CharacterTextSplitter (1000 chars, 200 overlap)
   - Vertex AI embeddings generation using `text-embedding-004` (768 dimensions)
   - Oracle Vector Store insertion

2. Start the Streamlit UI:
   ```bash
   ./run.sh
   ```

   Access the UI at `http://your-vm-ip:8502`

   ![Streamlit UI](images/streamlit-ui.png " ")

3. Upload documents:
   
   - Click "Upload PDF Document"
   - Select a PDF file (e.g., Oracle Database documentation)
   - Monitor the processing pipeline:
     - Text extraction
     - Chunking
     - Embedding generation
     - Database insertion

4. Verify document storage:
   ```sql
   SELECT COUNT(*) FROM rag_tab;
   -- Should show number of chunks
   
   SELECT * FROM rag_tab WHERE ROWNUM <= 5;
   -- View sample chunks
   ```

5. Test search functionality:
   
   In the Streamlit UI:
   - Enter query: "What are new spatial features?"
   - View retrieved chunks and generated answer
   - Observe timing metrics (vector search vs. LLM response time)

   ![Document Ingestion](images/document-ingestion.png " ")

## Task 3: Build FastAPI Service with OpenAPI

1. Understanding the FastAPI service architecture:
   
   File: `oracle_ai_database_rag.py`
   
   The service implements:
   ```python
   @app.post("/query")
   async def query_knowledge_base(request: QueryRequest):
       # 1. Generate query embedding
       # 2. Vector similarity search (COSINE)
       # 3. Retrieve top_k chunks
       # 4. Create context-aware prompt
       # 5. Call Gemini LLM
       # 6. Return answer + metadata
   ```

   OpenAPI Compatibility:
   - Version: 3.0.3 (required by GCP)
   - No security schemes (managed externally)
   - JSON-only content type
   - Single server URL (internal VPC)

2. Start the FastAPI service:
   ```bash
   ./run_api.sh
   ```

   Available endpoints:
   - `POST /query` - RAG query with answer generation
   - `GET /status` - Service health check
   - `DELETE /clear` - Clear knowledge base
   - `GET /health` - Simple health ping
   - `GET /openapi.json` - OpenAPI specification

3. Test the API locally:
   ```bash
   curl -X POST "http://localhost:8501/query" \
     -H "Content-Type: application/json" \
     -d '{
       "query": "What are new JSON features in Oracle Database?",
       "top_k": 5
     }'
   ```

   Expected response:
   ```json
   {
     "answer": "Oracle Database 26ai introduces...",
     "context_chunks": ["chunk1", "chunk2", ...],
     "vector_search_time": 0.15,
     "llm_response_time": 2.3,
     "total_time": 2.45
   }
   ```

4. View OpenAPI specification:
   
   Access the interactive documentation at `http://localhost:8501/docs`
   
   Features:
   - Interactive API testing
   - Schema validation
   - Request/response examples
   - Model definitions (QueryRequest, QueryResponse)

   ![FastAPI Service](images/openapi-doc.png " ")

## Task 4: Implement ADK Full Agent

1. Understanding Google ADK (Agent Development Kit):
   
   ADK provides:
   - Multi-step reasoning: Agent makes multiple tool calls
   - Conversation context: Maintains history across turns
   - Function calling: Native Gemini function calling
   - Extensibility: Easy to add new tools/capabilities
   
   Comparison with GCP Conversational Agents:
   
   | Feature | GCP Agents | ADK |
   |---------|-----------|-----|
   | Deployment | Managed service | Custom code |
   | UI | Built-in web UI | Build your own |
   | Reasoning | Single-step | Multi-step |
   | Customization | Limited | Full control |
   | Cost | Per-use | Compute + LLM calls |

2. Understanding ADK architecture:
   
   File: `oracle_ai_database_adk_fullagent.py`
   
   ```python
   # 1. Initialize Vertex AI and Gemini
   vertexai.init(project=project_id, location=location)

   # 2. Define function declarations
   query_function = FunctionDeclaration(
       name="query_oracle_database",
       description="Search Oracle knowledge base...",
       parameters={...}
   )

   # 3. Create tool with functions
   oracle_tool = Tool(function_declarations=[query_function])

   # 4. Create Gemini model with tools
   model = GenerativeModel(
       "gemini-2.0-flash-exp",
       tools=[oracle_tool],
       system_instruction=instructions
   )

   # 5. Query with function calling
   chat = model.start_chat()
   response = chat.send_message(user_input)

   # 6. Handle function calls iteratively
   while response.has_function_call:
       result = execute_function(...)
       response = chat.send_message(function_response)
   ```

3. Key components:
   
   Function declarations:
   ```python
   FunctionDeclaration(
       name="query_oracle_database",
       description="Search the Oracle Database knowledge base...",
       parameters={
           "type": "object",
           "properties": {
               "query": {"type": "string", ...},
               "top_k": {"type": "integer", "default": 5}
           },
           "required": ["query"]
       }
   )
   ```
   
   System instructions:
   ```python
   instructions = """You are an expert Oracle Database assistant.

   Use query_oracle_database when users ask about:
   - Specific features or functionality
   - SQL syntax and best practices
   - Configuration and administration

   For complex questions:
   - Break into sub-queries
   - Make multiple tool calls
   - Synthesize information

   Maintain conversation context and reference previous answers."""
   ```
   
   Multi-step execution:
   ```python
   max_iterations = 5
   while has_function_call and iteration < max_iterations:
       # Execute function
       result = execute_function_call(function_name, args)
       
       # Send result back to model
       response = chat.send_message(
           Part.from_function_response(name=function_name, response=result)
       )
   ```

4. Run the ADK agent:
   ```bash
   ./run_fullagent.sh
   ```

   Interactive commands:
   - Type questions naturally
   - `history` - View conversation
   - `clear` - Reset context
   - `quit` - Exit

5. Test multi-step reasoning:
   
   Example 1 - Complex query:
   ```
   You: Compare spatial features between Oracle 19c and 26ai

   Agent reasoning:
     🔧 query_oracle_database(query="Oracle 19c spatial features", top_k=5)
     🔧 query_oracle_database(query="Oracle 26ai spatial features", top_k=5)
     
   Agent: Oracle 26ai introduces several enhancements over 19c:
   1. Spatial Web Services...
   2. Enhanced GeoJSON support...
   [Synthesized from 2 tool calls]
   ```
   
   Example 2 - Follow-up questions:
   ```
   You: What is the new Oracle AI autonomous database MCP Server?
   Agent: [Uses context from previous conversation]

   You: How do I enable it?
   Agent: [References previous answers, makes new query]
   ```

6. View conversation history:
   ```bash
   > history

   [1] User: What is the new Oracle AI autonomous database MCP Server?
       Agent: Oracle Database 26ai introduces enhanced spatial capabilities...

   [2] User: How do I enable it?
       Agent: To enable the MCP Server, add a tag to your Autonomous Database with key "ADB$FEATURE" and value {"name":"MCP_SERVER","enable":true}. This creates an MCP endpoint bound to your database OCID at http://dataaccess.adb.<region-id>.oraclecloudapps.com/adb/mcp/v1/databases/{database-ocid}. Authenticated MCP clients can then use this endpoint via secure OAuth protocol to run registered tools.
   ```

   ![ADK Agent](images/adk_ai_agent_rag_success.png " ")

## Task 5: Advanced Topics and Optimization

1. Embedding model details:
   
   Model: `text-embedding-004`
   - Dimensions: 768
   - Max input: 20,000 tokens
   - Multilingual support
   - Cost: $0.00025 per 1K tokens
   
   Alternative models:
   - `text-embedding-005`: 256/768/1024 dimensions (configurable)
   - `textembedding-gecko@003`: Legacy model
   - Custom fine-tuned models

2. Vector search optimization:
   
   Distance strategies:
   ```sql
   -- COSINE (default) - best for normalized embeddings
   DISTANCE COSINE

   -- EUCLIDEAN - faster but requires normalization
   DISTANCE EUCLIDEAN

   -- MAX_INNER_PRODUCT - for non-normalized vectors
   DISTANCE DOT
   ```
   
   Index types:
   ```sql
   -- IVF (Inverted File) - fast for large datasets
   CREATE VECTOR INDEX rag_idx ON rag_tab(embedding)
   ORGANIZATION INMEMORY NEIGHBOR GRAPH;

   -- HNSW - highest accuracy
   CREATE VECTOR INDEX rag_idx_hnsw ON rag_tab(embedding)
   DISTANCE COSINE WITH TARGET ACCURACY 95;
   ```

3. Prompt engineering:
   
   RAG prompt template:
   ```python
   template = """Use the following context to answer the question.
   If you cannot answer based on the context, say so clearly.

   Context:
   {context}

   Question: {question}

   Answer:"""
   ```
   
   Advanced techniques:
   - Few-shot examples
   - Chain-of-thought reasoning
   - Self-consistency
   - Retrieval augmentation strategies

4. Performance optimization:
   
   Caching:
   ```python
   from functools import lru_cache

   @lru_cache(maxsize=1000)
   def get_embedding(text: str):
       return embeddings.embed_query(text)
   ```
   
   Connection pooling:
   ```python
   import oracledb

   pool = oracledb.create_pool(
       user=username,
       password=password,
       dsn=dsn,
       min=2,
       max=10,
       increment=1
   )
   ```

   ![Optimization](images/optimization.png " ")

## Task 6: (Optional) Deployment and Production

1. Deploy to Cloud Run:
   ```bash
   # Build container
   gcloud builds submit --tag gcr.io/adb-pm-prod/oracle-rag-api

   # Deploy to Cloud Run
   gcloud run deploy oracle-rag-api \
     --image gcr.io/adb-pm-prod/oracle-rag-api \
     --platform managed \
     --region us-central1 \
     --allow-unauthenticated \
     --set-env-vars GCP_PROJECT_ID=adb-pm-prod
   ```

2. Security hardening:
   
   Add API key authentication:
   ```python
   from fastapi.security import APIKeyHeader

   api_key_header = APIKeyHeader(name="X-API-Key")

   @app.post("/query")
   async def query(request: QueryRequest, api_key: str = Depends(api_key_header)):
       if api_key != os.getenv("API_KEY"):
           raise HTTPException(401, "Invalid API key")
   ```
   
   Bearer token validation:
   ```python
   from google.auth.transport import requests as google_requests
   from google.oauth2 import id_token

   def verify_token(token: str):
       idinfo = id_token.verify_oauth2_token(
           token, google_requests.Request()
       )
       return idinfo
   ```

3. Monitoring and logging:
   ```python
   import logging
   from google.cloud import logging as cloud_logging

   # Cloud Logging
   client = cloud_logging.Client()
   client.setup_logging()

   # Log queries
   logging.info("Query received", extra={
       "query": query,
       "top_k": top_k,
       "response_time": response_time
   })
   ```

   ![Production Deployment](images/production-deployment.png " ")

## Task 7: (Optional) Integrate with GCP Conversational Agents
   
   Architecture flow:
   ```
   User → GCP Agent → OpenAPI Tool → FastAPI → Oracle DB
   ```
   
   Benefits:
   - Natural language interface
   - Multi-turn conversation
   - Built-in authentication
   - Web UI for testing

2. Create OpenAPI Tool:
   
   Navigate to Vertex AI Console:
   - Go to Conversational Agents → Tools → Create Tool
   
   Import OpenAPI specification:
   ```
   Method: OpenAPI URL
   URL: http://10.150.0.8:8501/openapi.json
   ```
   
   **Important**: Use internal VPC IP (10.150.0.8), not external IP
   
   Configure authentication:
   - Type: No auth (API accepts tokens without validation)
   - Alternative: Service agent token (for production)
   
   Verify tool configuration:
   - Tool name: `Oracle AI Database (Vector RAG)`
   - Action: `query`
   - Input: `query` (string), `top_k` (integer)
   - Output: JSON response

3. Create Conversational Agent:
   
   Create new agent:
   - Name: "Oracle Database Expert"
   - Model: Gemini 2.0 Flash
   
   Add instructions:
   ```
   You are an expert assistant for Oracle Database questions.

   Use the "query" tool to search the Oracle Database knowledge base
   when users ask about:
   - Database features
   - SQL syntax
   - Configuration
   - Performance optimization

   Provide clear, accurate answers based on the retrieved information.
   ```
   
   Attach tool:
   - Add previously created OpenAPI tool
   - Set as required for database questions
   
   Configure settings:
   - Temperature: 0.7
   - Max tokens: 2048
   - Top-p: 0.95

4. Test the GCP Agent:
   
   Open Agent Playground and test queries:
   - "What are new spatial features in Oracle Database?"
   - "Explain JSON Relational Duality"
   - "How do I optimize vector search performance?"
   
   Monitor tool calls:
   - View tool execution in conversation
   - Check API logs for incoming requests
   - Verify response integration

5. Known limitations and solutions:
   
   Issues:
   - Security schemes not supported in OpenAPI
   - Only JSON content types allowed
   - External IPs unreachable from GCP
   - Limited multipart/form-data support
   
   Applied solutions:
   - Removed security definitions from OpenAPI
   - Filtered content types to `application/json`
   - Used internal VPC address (10.150.0.8)
   - Excluded `/upload` endpoint from schema

   ![GCP Agent](images/gcp-agent.png " ")

## Troubleshooting

Common issues and solutions:

1. **Issue**: `langchain.load` module not found
   ```python
   # Solution: Use Gemini function calling instead of LangchainAgent
   # Already implemented in oracle_ai_database_adk_fullagent.py
   ```

2. **Issue**: GCP Agent returns authentication error
   ```
   # Solution: Use internal VPC IP, not external
   URL: http://10.150.0.8:8501 (not 34.48.146.146)
   ```

3. **Issue**: Port 8501 already in use
   ```bash
   # Solution: Streamlit moved to 8502
   pkill -f uvicorn  # Stop FastAPI
   ./run.sh          # Streamlit on 8502
   ./run_api.sh      # FastAPI on 8501
   ```

4. **Issue**: Vector search returns no results
   ```sql
   -- Check embeddings exist
   SELECT COUNT(*) FROM rag_tab WHERE embedding IS NOT NULL;

   -- Verify index
   SELECT * FROM USER_INDEXES WHERE TABLE_NAME = 'RAG_TAB';
   ```

Congratulations! You have successfully built a production-ready RAG system with Oracle AI Database and Google Vertex AI Agents.

You may now **proceed to the next lab**.

## Learn More

* [Oracle AI Vector Search](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/)
* [Vertex AI Gemini API](https://cloud.google.com/vertex-ai/docs/generative-ai/model-reference/gemini)
* [LangChain Documentation](https://python.langchain.com/)
* [FastAPI Documentation](https://fastapi.tiangolo.com/)
* [Code Repository](https://github.com/paulparkinson/interactive-ai-holograms)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, January 2026
