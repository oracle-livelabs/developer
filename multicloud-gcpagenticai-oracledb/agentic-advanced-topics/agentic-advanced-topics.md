# Access Oracle AI Database via ORDS/REST from Vertex AI Agents

## Introduction

This lab demonstrates how to expose Oracle AI Database capabilities through Oracle REST Data Services (ORDS) and integrate them with Vertex AI agents. ORDS provides RESTful APIs for database operations, making it easy for AI agents to access vector search, Select AI, and other database features over HTTP.

By using ORDS, you can create secure, scalable REST endpoints that your Vertex AI agents can call to perform vector searches, execute SQL queries, and leverage Oracle's AI capabilities without direct database connections.

Estimated Time: 45 minutes

### Objectives

* Install and configure Oracle REST Data Services (ORDS)
* Create REST endpoints for Oracle AI Vector Search
* Expose Select AI capabilities through REST APIs
* Integrate ORDS endpoints with Vertex AI agents
* Implement authentication and security for REST APIs

### Prerequisites

* Oracle Autonomous Database instance from previous labs
* Basic understanding of REST APIs
* Vertex AI agent setup from previous labs
* Python 3.10+ for testing

## Task 1: Enable ORDS on Autonomous Database

Oracle Autonomous Database includes ORDS pre-configured. You need to enable and configure it.

1. Navigate to your Autonomous Database in Oracle Cloud Console

2. Click **Database Actions**

3. Sign in with ADMIN credentials

4. ORDS is automatically enabled for Autonomous Database

5. Note your ORDS base URL:
   ```
   https://your-database-id.adb.us-region-1.oraclecloudapps.com/ords/
   ```

   

## Task 2: Create REST Endpoints for Vector Search

1. In Database Actions, navigate to **SQL** worksheet

2. Create a module for AI operations:
   ```sql
   BEGIN
     ORDS.ENABLE_SCHEMA(
       p_enabled => TRUE,
       p_schema => 'ADMIN',
       p_url_mapping_type => 'BASE_PATH',
       p_url_mapping_pattern => 'ai',
       p_auto_rest_auth => TRUE
     );
     
     ORDS.DEFINE_MODULE(
       p_module_name => 'ai.v1',
       p_base_path => '/ai/v1/',
       p_items_per_page => 25
     );
     
     COMMIT;
   END;
   /
   ```

3. Create vector search endpoint:
   ```sql
   BEGIN
     ORDS.DEFINE_TEMPLATE(
       p_module_name => 'ai.v1',
       p_pattern => 'vector-search',
       p_comments => 'Vector similarity search endpoint'
     );
     
     ORDS.DEFINE_HANDLER(
       p_module_name => 'ai.v1',
       p_pattern => 'vector-search',
       p_method => 'POST',
       p_source_type => ORDS.source_type_plsql,
       p_source => '
       DECLARE
         v_query_text VARCHAR2(4000) := :query_text;
         v_top_k NUMBER := NVL(:top_k, 5);
         v_response CLOB;
         v_results SYS_REFCURSOR;
       BEGIN
         -- Generate embedding for query
         -- Note: In production, call your embedding service
         
         -- Perform vector search
         OPEN v_results FOR
           SELECT 
             text,
             link,
             VECTOR_DISTANCE(embedding, :query_vector, COSINE) as similarity_score
           FROM rag_tab
           ORDER BY similarity_score
           FETCH FIRST v_top_k ROWS ONLY;
         
         -- Convert results to JSON
         v_response := JSON_OBJECT(
           ''status'' VALUE ''success'',
           ''results'' VALUE (
             SELECT JSON_ARRAYAGG(
               JSON_OBJECT(
                 ''text'' VALUE text,
                 ''link'' VALUE link,
                 ''score'' VALUE similarity_score
               )
             )
             FROM (
               SELECT text, link, 
                 VECTOR_DISTANCE(embedding, :query_vector, COSINE) as similarity_score
               FROM rag_tab
               ORDER BY similarity_score
               FETCH FIRST v_top_k ROWS ONLY
             )
           )
         );
         
         :response := v_response;
       END;',
       p_items_per_page => 0
     );
     
     COMMIT;
   END;
   /
   ```

4. Create document ingestion endpoint:
   ```sql
   BEGIN
     ORDS.DEFINE_TEMPLATE(
       p_module_name => 'ai.v1',
       p_pattern => 'ingest',
       p_comments => 'Ingest documents into vector store'
     );
     
     ORDS.DEFINE_HANDLER(
       p_module_name => 'ai.v1',
       p_pattern => 'ingest',
       p_method => 'POST',
       p_source_type => ORDS.source_type_plsql,
       p_source => '
       DECLARE
         v_text VARCHAR2(4000) := :text;
         v_link VARCHAR2(500) := :link;
         v_embedding VECTOR := :embedding;
       BEGIN
         INSERT INTO rag_tab (text, link, embedding)
         VALUES (v_text, v_link, v_embedding);
         
         COMMIT;
         
         :response := JSON_OBJECT(
           ''status'' VALUE ''success'',
           ''message'' VALUE ''Document ingested successfully''
         );
       END;',
       p_items_per_page => 0
     );
     
     COMMIT;
   END;
   /
   ```

   

## Task 3: Create Select AI REST Endpoint

1. Create Select AI query endpoint:
   ```sql
   BEGIN
     ORDS.DEFINE_TEMPLATE(
       p_module_name => 'ai.v1',
       p_pattern => 'select-ai',
       p_comments => 'Natural language database queries'
     );
     
     ORDS.DEFINE_HANDLER(
       p_module_name => 'ai.v1',
       p_pattern => 'select-ai',
       p_method => 'POST',
       p_source_type => ORDS.source_type_plsql,
       p_source => '
       DECLARE
         v_nl_query VARCHAR2(4000) := :natural_language_query;
         v_result CLOB;
       BEGIN
         -- Use Select AI to convert natural language to SQL
         SELECT DBMS_CLOUD_AI.GENERATE(
           prompt => ''Convert this to SQL query: '' || v_nl_query,
           profile_name => ''GEMINI'',
           action => ''narrate''
         ) INTO v_result
         FROM DUAL;
         
         :response := JSON_OBJECT(
           ''status'' VALUE ''success'',
           ''natural_query'' VALUE v_nl_query,
           ''result'' VALUE v_result
         );
       EXCEPTION
         WHEN OTHERS THEN
           :response := JSON_OBJECT(
             ''status'' VALUE ''error'',
             ''message'' VALUE SQLERRM
           );
       END;',
       p_items_per_page => 0
     );
     
     COMMIT;
   END;
   /
   ```

## Task 4: Test REST Endpoints

1. Test vector search endpoint using curl:
   ```bash
   curl -X POST \
     https://your-database-id.adb.region.oraclecloudapps.com/ords/admin/ai/v1/vector-search \
     -H "Content-Type: application/json" \
     -d '{
       "query_text": "What are vector indexes?",
       "top_k": 3
     }'
   ```

2. Test with Python:
   ```python
   import requests
   
   # ORDS endpoint configuration
   ords_base_url = "https://your-db.adb.region.oraclecloudapps.com/ords"
   
   def test_vector_search(query: str, top_k: int = 5):
       """Test vector search endpoint"""
       url = f"{ords_base_url}/admin/ai/v1/vector-search"
       
       payload = {
           "query_text": query,
           "top_k": top_k
       }
       
       response = requests.post(url, json=payload)
       
       if response.status_code == 200:
           return response.json()
       else:
           print(f"Error: {response.status_code}")
           return None
   
   # Test the endpoint
   result = test_vector_search("Oracle database features")
   print(result)
   ```

   

## Task 5: Integrate with Vertex AI Agents

1. Create ORDS client for Vertex AI:
   ```python
   import vertexai
   from vertexai.preview import reasoning_engines
   import requests
   
   class ORDSVectorSearchTool:
       """Tool for Vertex AI agents to access ORDS endpoints"""
       
       def __init__(self, ords_url: str):
           self.ords_url = ords_url
           
       def vector_search(self, query: str, top_k: int = 5) -> dict:
           """Perform vector search via ORDS"""
           url = f"{self.ords_url}/admin/ai/v1/vector-search"
           
           payload = {
               "query_text": query,
               "top_k": top_k
           }
           
           response = requests.post(url, json=payload)
           return response.json()
       
       def select_ai_query(self, natural_query: str) -> dict:
           """Execute Select AI query via ORDS"""
           url = f"{self.ords_url}/admin/ai/v1/select-ai"
           
           payload = {
               "natural_language_query": natural_query
           }
           
           response = requests.post(url, json=payload)
           return response.json()
   
   # Initialize Vertex AI
   vertexai.init(project="your-project-id", location="us-central1")
   
   # Create agent with ORDS tools
   ords_tool = ORDSVectorSearchTool(
       ords_url="https://your-db.adb.region.oraclecloudapps.com/ords"
   )
   
   agent = reasoning_engines.LangchainAgent(
       model="gemini-2.0-flash-001",
       tools=[
           ords_tool.vector_search,
           ords_tool.select_ai_query
       ],
       agent_executor_kwargs={
           "return_intermediate_steps": True
       }
   )
   ```

2. Test the integrated agent:
   ```python
   # Query using vector search through ORDS
   response = agent.query(
       "What are the new AI features in Oracle Database 23ai?"
   )
   print(response)
   ```

   

## Task 6: Implement Authentication

1. Create OAuth2 client credentials in ORDS:
   ```sql
   BEGIN
     OAUTH.CREATE_CLIENT(
       p_name => 'vertex_ai_client',
       p_grant_type => 'client_credentials',
       p_owner => 'ADMIN',
       p_description => 'Client for Vertex AI agents',
       p_support_email => 'your-email@example.com',
       p_privilege_names => 'ai.v1'
     );
     
     COMMIT;
   END;
   /
   ```

2. Get client credentials:
   ```sql
   SELECT client_id, client_secret
   FROM USER_ORDS_CLIENTS
   WHERE name = 'vertex_ai_client';
   ```

3. Update Python client with authentication:
   ```python
   class SecureORDSClient:
       def __init__(self, ords_url: str, client_id: str, client_secret: str):
           self.ords_url = ords_url
           self.client_id = client_id
           self.client_secret = client_secret
           self.token = None
           
       def get_token(self):
           """Get OAuth2 access token"""
           url = f"{self.ords_url}/oauth/token"
           
           data = {
               "grant_type": "client_credentials",
               "client_id": self.client_id,
               "client_secret": self.client_secret
           }
           
           response = requests.post(url, data=data)
           self.token = response.json()["access_token"]
           return self.token
       
       def vector_search(self, query: str, top_k: int = 5) -> dict:
           """Authenticated vector search"""
           if not self.token:
               self.get_token()
               
           url = f"{self.ords_url}/admin/ai/v1/vector-search"
           
           headers = {
               "Authorization": f"Bearer {self.token}",
               "Content-Type": "application/json"
           }
           
           payload = {"query_text": query, "top_k": top_k}
           
           response = requests.post(url, json=payload, headers=headers)
           return response.json()
   ```

## Task 7: Create OpenAPI Specification

1. Generate OpenAPI spec for your ORDS endpoints:
   ```yaml
   openapi: 3.0.0
   info:
     title: Oracle AI Database REST API
     version: 1.0.0
     description: ORDS endpoints for AI operations
   
   servers:
     - url: https://your-db.adb.region.oraclecloudapps.com/ords/admin/ai/v1
   
   paths:
     /vector-search:
       post:
         summary: Vector similarity search
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 type: object
                 properties:
                   query_text:
                     type: string
                   top_k:
                     type: integer
                     default: 5
         responses:
           '200':
             description: Search results
             content:
               application/json:
                 schema:
                   type: object
                   properties:
                     status:
                       type: string
                     results:
                       type: array
                       items:
                         type: object
   
     /select-ai:
       post:
         summary: Natural language database query
         requestBody:
           required: true
           content:
             application/json:
               schema:
                 type: object
                 properties:
                   natural_language_query:
                     type: string
         responses:
           '200':
             description: Query result
   ```

2. Use OpenAPI spec with Vertex AI Agent Builder:
   - Import the OpenAPI specification
   - Agent Builder will automatically create tools from endpoints
   - Configure authentication in Agent Builder

## Task 8: Deploy Complete Solution

1. Create comprehensive agent application:
   ```python
   class OracleAIAgent:
       def __init__(self, ords_url: str, project_id: str):
           self.ords_client = SecureORDSClient(ords_url, client_id, client_secret)
           vertexai.init(project=project_id, location="us-central1")
           
           self.agent = reasoning_engines.LangchainAgent(
               model="gemini-2.0-flash-001",
               tools=[
                   self.ords_client.vector_search,
                   self.ords_client.select_ai_query
               ]
           )
       
       def chat(self, message: str) -> str:
           """Chat with agent using ORDS backend"""
           response = self.agent.query(message)
           return response["output"]
   
   # Deploy agent
   agent = OracleAIAgent(
       ords_url="https://your-db.adb.region.oraclecloudapps.com/ords",
       project_id="your-project-id"
   )
   
   # Test
   result = agent.chat("Show me documents about vector search")
   print(result)
   ```

   

## Learn More

* [Oracle REST Data Services Documentation](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/)
* [ORDS Developer Guide](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.3/orddg/)
* [Vertex AI Custom Tools](https://cloud.google.com/vertex-ai/docs/agent-builder/tools)
* [OAuth 2.0 with ORDS](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/24.3/orddg/developing-REST-applications.html#GUID-6B4E4B4E-4B4E-4B4E-4B4E-4B4E4B4E4B4E)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, January 2026
