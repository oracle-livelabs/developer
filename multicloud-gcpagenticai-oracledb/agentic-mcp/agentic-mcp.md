# Add MCP to Your Agentic AI Application

## Introduction

This lab demonstrates how to integrate the Model Context Protocol (MCP) into your agentic AI application. MCP is an open protocol that enables AI assistants to securely access and interact with local and remote resources, databases, and services.

By adding MCP support to your AI agents, you enable them to connect to Oracle AI Database and other systems through standardized interfaces, improving interoperability and simplifying integration with enterprise data sources.

Estimated Time: 30 minutes

### Objectives

* Understand the Model Context Protocol (MCP) architecture
* Install and configure MCP server for Oracle AI Database
* Connect your AI agent to MCP endpoints
* Test agent interactions with database through MCP
* Implement secure communication patterns

### Prerequisites

* Completed previous labs with Oracle AI Database and Vertex AI setup
* Python 3.10+ installed on your development environment
* Basic understanding of REST APIs and protocols
* Oracle AI Database instance with network access

## Task 1: Understanding MCP

The Model Context Protocol (MCP) is an open protocol that standardizes how AI applications communicate with data sources and tools. Key benefits include:

1. **Standardized Interface**: Consistent API across different data sources
2. **Security**: Built-in authentication and authorization mechanisms
3. **Extensibility**: Easy to add new tools and capabilities
4. **Interoperability**: Works with multiple AI frameworks and models

MCP Architecture:
```
AI Agent <--> MCP Client <--> MCP Server <--> Oracle AI Database
```

   ![MCP Architecture](images/mcp-architecture.png " ")

## Task 2: Install MCP Dependencies

1. Install MCP Python SDK:
   ```bash
   pip install mcp anthropic-mcp-client
   ```

2. Install Oracle database support:
   ```bash
   pip install oracledb
   ```

3. Verify installation:
   ```bash
   python -c "import mcp; print(mcp.__version__)"
   ```

## Task 3: Configure MCP Server

1. Create MCP server configuration file `mcp_config.json`:
   ```json
   {
     "servers": {
       "oracle-ai-db": {
         "type": "stdio",
         "command": "python",
         "args": ["oracle_mcp_server.py"],
         "env": {
           "DB_USERNAME": "ADMIN",
           "DB_PASSWORD": "your_password",
           "DB_DSN": "your_database_dsn",
           "DB_WALLET_DIR": "./Wallet_YOURDB"
         }
       }
     }
   }
   ```

2. Create Oracle MCP server implementation `oracle_mcp_server.py`:
   ```python
   import os
   import json
   import oracledb
   from mcp import Server, Tool
   
   # Initialize Oracle connection
   username = os.getenv("DB_USERNAME")
   password = os.getenv("DB_PASSWORD")
   dsn = os.getenv("DB_DSN")
   wallet_dir = os.getenv("DB_WALLET_DIR")
   
   # Configure wallet location
   oracledb.init_oracle_client(config_dir=wallet_dir)
   
   class OracleMCPServer(Server):
       def __init__(self):
           super().__init__("oracle-ai-db")
           self.connection = None
           
       async def connect(self):
           """Establish database connection"""
           self.connection = oracledb.connect(
               user=username,
               password=password,
               dsn=dsn,
               config_dir=wallet_dir
           )
           
       @Tool(
           name="vector_search",
           description="Search Oracle AI Vector Store for similar documents"
       )
       async def vector_search(self, query: str, top_k: int = 5) -> dict:
           """Perform vector similarity search"""
           cursor = self.connection.cursor()
           
           # Generate embedding for query (simplified)
           # In production, use same embedding model as ingestion
           
           sql = """
               SELECT text, link, 
                      VECTOR_DISTANCE(embedding, :query_vector, COSINE) as distance
               FROM rag_tab
               ORDER BY distance
               FETCH FIRST :top_k ROWS ONLY
           """
           
           cursor.execute(sql, {
               "query_vector": query_vector,
               "top_k": top_k
           })
           
           results = []
           for row in cursor:
               results.append({
                   "text": row[0],
                   "link": row[1],
                   "distance": float(row[2])
               })
               
           return {"results": results}
       
       @Tool(
           name="execute_sql",
           description="Execute SQL query on Oracle database"
       )
       async def execute_sql(self, query: str) -> dict:
           """Execute SQL query with safety checks"""
           # Add safety checks for production
           if not query.upper().startswith("SELECT"):
               return {"error": "Only SELECT queries are allowed"}
               
           cursor = self.connection.cursor()
           cursor.execute(query)
           
           columns = [col[0] for col in cursor.description]
           rows = cursor.fetchall()
           
           return {
               "columns": columns,
               "rows": [list(row) for row in rows]
           }
   
   if __name__ == "__main__":
       server = OracleMCPServer()
       server.run()
   ```

3. Test the MCP server:
   ```bash
   python oracle_mcp_server.py
   ```

   ![MCP Server Running](images/mcp-server-running.png " ")

## Task 4: Connect Agent to MCP

1. Create MCP client in your agent application `agent_with_mcp.py`:
   ```python
   import asyncio
   from anthropic import Anthropic
   from mcp import MCPClient
   
   class AgenticAI:
       def __init__(self):
           self.mcp_client = MCPClient("mcp_config.json")
           self.ai_client = Anthropic()
           
       async def initialize(self):
           """Initialize MCP connection"""
           await self.mcp_client.connect("oracle-ai-db")
           tools = await self.mcp_client.get_tools()
           print(f"Available tools: {tools}")
           
       async def ask_with_context(self, question: str):
           """Ask question with database context"""
           # Get relevant context from database via MCP
           search_result = await self.mcp_client.call_tool(
               "oracle-ai-db",
               "vector_search",
               {"query": question, "top_k": 3}
           )
           
           # Build context from search results
           context = "\n".join([
               f"- {result['text']}" 
               for result in search_result["results"]
           ])
           
           # Generate response with Gemini/Claude
           prompt = f"""
           Context from database:
           {context}
           
           User question: {question}
           
           Provide a helpful answer based on the context.
           """
           
           # Call your AI model (Gemini, Claude, etc.)
           response = self.generate_response(prompt)
           
           return response
   
   async def main():
       agent = AgenticAI()
       await agent.initialize()
       
       # Test query
       answer = await agent.ask_with_context(
           "What are the new features in Oracle Database 23ai?"
       )
       print(f"Agent response: {answer}")
   
   if __name__ == "__main__":
       asyncio.run(main())
   ```

2. Run the agent with MCP:
   ```bash
   python agent_with_mcp.py
   ```

   ![Agent with MCP](images/agent-mcp-running.png " ")

## Task 5: Integrate with Vertex AI Agents

1. Create MCP bridge for Vertex AI:
   ```python
   from google.cloud import aiplatform
   import vertexai
   from vertexai.preview import reasoning_engines
   
   class VertexAIMCPBridge:
       def __init__(self, project_id: str, location: str):
           vertexai.init(project=project_id, location=location)
           self.mcp_client = MCPClient("mcp_config.json")
           
       async def create_agent_with_mcp(self):
           """Create Vertex AI agent with MCP tools"""
           await self.mcp_client.connect("oracle-ai-db")
           
           # Define agent with MCP tools
           agent = reasoning_engines.LangchainAgent(
               model="gemini-2.0-flash-001",
               tools=[
                   self.create_mcp_tool("vector_search"),
                   self.create_mcp_tool("execute_sql")
               ]
           )
           
           return agent
           
       def create_mcp_tool(self, tool_name: str):
           """Convert MCP tool to Vertex AI tool"""
           async def tool_function(**kwargs):
               result = await self.mcp_client.call_tool(
                   "oracle-ai-db",
                   tool_name,
                   kwargs
               )
               return result
               
           return tool_function
   ```

2. Deploy the bridge:
   ```bash
   python vertex_mcp_bridge.py
   ```

## Task 6: Test End-to-End Integration

1. Create test script `test_mcp_integration.py`:
   ```python
   import asyncio
   
   async def test_mcp_integration():
       # Test 1: Vector Search
       print("Test 1: Vector Search")
       result = await agent.ask_with_context(
           "What are vector indexes in Oracle?"
       )
       print(f"Result: {result}\n")
       
       # Test 2: Direct SQL Query
       print("Test 2: SQL Query")
       result = await mcp_client.call_tool(
           "oracle-ai-db",
           "execute_sql",
           {"query": "SELECT COUNT(*) FROM rag_tab"}
       )
       print(f"Result: {result}\n")
       
       # Test 3: Complex RAG Query
       print("Test 3: RAG Query")
       result = await agent.ask_with_context(
           "How do I use VECTOR_DISTANCE in SQL?"
       )
       print(f"Result: {result}\n")
   
   asyncio.run(test_mcp_integration())
   ```

2. Run tests:
   ```bash
   python test_mcp_integration.py
   ```

   ![Test Results](images/mcp-test-results.png " ")

## Task 7: Implement Security Best Practices

1. Use environment variables for credentials:
   ```bash
   export DB_USERNAME=ADMIN
   export DB_PASSWORD=your_secure_password
   export DB_DSN=your_database_dsn
   ```

2. Implement authentication in MCP server:
   ```python
   class SecureMCPServer(OracleMCPServer):
       async def authenticate(self, token: str) -> bool:
           """Verify client authentication"""
           # Implement your auth logic
           return verify_token(token)
   ```

3. Use TLS for MCP communication in production:
   ```json
   {
     "servers": {
       "oracle-ai-db": {
         "type": "http",
         "url": "https://your-mcp-server.com",
         "headers": {
           "Authorization": "Bearer ${MCP_TOKEN}"
         }
       }
     }
   }
   ```

## Learn More

* [Model Context Protocol Specification](https://modelcontextprotocol.io/)
* [Oracle AI Vector Search Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/)
* [Vertex AI Agent Builder with Custom Tools](https://cloud.google.com/vertex-ai/docs/agent-builder/tools)
* [MCP Python SDK Documentation](https://github.com/modelcontextprotocol/python-sdk)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, January 2026
