# Explore Vertex AI Models and Agents

## Introduction

In this lab, you will explore Google Vertex AI's capabilities including various Gemini models, function calling, and the fundamentals of building AI agents. You'll learn how to create agents that can reason, plan, and interact with external tools.

Estimated Time: 20 minutes

### Objectives

* Explore different Gemini models (Gemini Pro, Gemini Pro Vision, etc.)
* Implement function calling for tool use
* Understand agent architecture and reasoning patterns
* Build a simple agent with memory and tool access
* Integrate agents with Oracle AI Database

### Prerequisites

* Completed previous labs
* Understanding of RAG and vector search
* Python environment configured

## Task 1: Explore Gemini Models

1. Create a script to test different Gemini models:
   ```python
   cat > ~/explore_gemini.py << 'EOF'
   from vertexai.generative_models import GenerativeModel, Part
   import vertexai
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   def test_gemini_pro():
       """Test Gemini Pro for text generation."""
       model = GenerativeModel("gemini-pro")
       
       prompt = """Explain what an AI agent is and how it differs from a 
       traditional chatbot. Include the key capabilities that make agents 
       more powerful."""
       
       response = model.generate_content(prompt)
       print("Gemini Pro Response:")
       print(response.text)
       print("\n" + "="*80 + "\n")
   
   def test_gemini_with_context():
       """Test Gemini with conversation context."""
       model = GenerativeModel("gemini-pro")
       chat = model.start_chat()
       
       # Multi-turn conversation
       response1 = chat.send_message(
           "I'm building an AI system that needs to remember user preferences. What approach should I use?"
       )
       print("Turn 1:")
       print(response1.text)
       
       response2 = chat.send_message(
           "How would I implement this with a database?"
       )
       print("\nTurn 2 (with context):")
       print(response2.text)
       print("\n" + "="*80 + "\n")
   
   def test_gemini_with_parameters():
       """Test Gemini with different generation parameters."""
       model = GenerativeModel("gemini-pro")
       
       generation_config = {
           "temperature": 0.9,
           "top_p": 0.95,
           "top_k": 40,
           "max_output_tokens": 1024,
       }
       
       response = model.generate_content(
           "Generate three creative use cases for AI agents in enterprise environments.",
           generation_config=generation_config
       )
       
       print("Creative Response (high temperature):")
       print(response.text)
   
   if __name__ == "__main__":
       print("Testing Gemini Models\n")
       test_gemini_pro()
       test_gemini_with_context()
       test_gemini_with_parameters()
   EOF
   ```

2. Run the exploration script:
   ```bash
   python explore_gemini.py
   ```

   

## Task 2: Implement Function Calling

1. Create a function calling example with database tools:
   ```python
   cat > ~/function_calling.py << 'EOF'
   from vertexai.generative_models import (
       GenerativeModel,
       FunctionDeclaration,
       Tool,
       Content,
       Part
   )
   import vertexai
   import oracledb
   import json
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   # Define database query function
   def query_database(sql_query: str) -> dict:
       """Execute SQL query on Oracle Database."""
       try:
           connection = oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
           
           cursor = connection.cursor()
           cursor.execute(sql_query)
           
           # Get column names
           columns = [desc[0] for desc in cursor.description]
           
           # Fetch results
           results = []
           for row in cursor:
               results.append(dict(zip(columns, row)))
           
           cursor.close()
           connection.close()
           
           return {
               "success": True,
               "data": results[:10],  # Limit to 10 rows
               "row_count": len(results)
           }
       except Exception as e:
           return {
               "success": False,
               "error": str(e)
           }
   
   # Define search function
   def search_documents(query: str, top_k: int = 3) -> dict:
       """Search documents using vector similarity."""
       from vertexai.language_models import TextEmbeddingModel
       
       model = TextEmbeddingModel.from_pretrained("textembedding-gecko@003")
       query_embedding = model.get_embeddings([query])[0].values
       
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
           SELECT content, metadata
           FROM document_embeddings
           ORDER BY VECTOR_DISTANCE(embedding, :query_vec, COSINE)
           FETCH FIRST :top_k ROWS ONLY
       """, {"query_vec": list(query_embedding), "top_k": top_k})
       
       results = [{"content": row[0], "metadata": row[1]} for row in cursor]
       
       cursor.close()
       connection.close()
       
       return {"success": True, "documents": results}
   
   # Declare functions for Gemini
   query_db_func = FunctionDeclaration(
       name="query_database",
       description="Execute SQL queries on the Oracle Database to retrieve structured data",
       parameters={
           "type": "object",
           "properties": {
               "sql_query": {
                   "type": "string",
                   "description": "The SQL query to execute"
               }
           },
           "required": ["sql_query"]
       }
   )
   
   search_docs_func = FunctionDeclaration(
       name="search_documents",
       description="Search documents using semantic similarity to find relevant information",
       parameters={
           "type": "object",
           "properties": {
               "query": {
                   "type": "string",
                   "description": "The search query"
               },
               "top_k": {
                   "type": "integer",
                   "description": "Number of results to return",
                   "default": 3
               }
           },
           "required": ["query"]
       }
   )
   
   # Create tool with functions
   database_tool = Tool(
       function_declarations=[query_db_func, search_docs_func]
   )
   
   # Initialize model with tools
   model = GenerativeModel(
       "gemini-pro",
       tools=[database_tool]
   )
   
   def agent_with_tools(user_query):
       """Agent that can use database tools."""
       chat = model.start_chat()
       
       # Send initial query
       response = chat.send_message(user_query)
       
       # Handle function calls
       function_calls = response.candidates[0].content.parts
       
       for part in function_calls:
           if fn := part.function_call:
               print(f"\n🔧 Agent calling function: {fn.name}")
               print(f"   Parameters: {dict(fn.args)}")
               
               # Execute function
               if fn.name == "query_database":
                   result = query_database(fn.args["sql_query"])
               elif fn.name == "search_documents":
                   result = search_documents(
                       fn.args["query"],
                       fn.args.get("top_k", 3)
                   )
               
               # Send function result back to agent
               function_response = Part.from_function_response(
                   name=fn.name,
                   response={"content": result}
               )
               
               response = chat.send_message(function_response)
       
       return response.text
   
   # Test agent with tools
   if __name__ == "__main__":
       queries = [
           "How many documents are in the database? Query the document_embeddings table.",
           "Search for information about AI agents and summarize what you find.",
       ]
       
       for query in queries:
           print(f"\n{'='*80}")
           print(f"User Query: {query}")
           print(f"{'='*80}")
           
           result = agent_with_tools(query)
           print(f"\nAgent Response:\n{result}")
   EOF
   ```

2. Run the function calling example:
   ```bash
   python function_calling.py
   ```

   

## Task 3: Build a Simple Reasoning Agent

1. Create an agent with reasoning capabilities:
   ```python
   cat > ~/reasoning_agent.py << 'EOF'
   from vertexai.generative_models import GenerativeModel
   import vertexai
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   class ReasoningAgent:
       """Agent that can break down problems and reason through solutions."""
       
       def __init__(self):
           self.model = GenerativeModel("gemini-pro")
           self.chat = self.model.start_chat()
       
       def think(self, task):
           """Break down the task into steps."""
           prompt = f"""You are a reasoning agent. Break down the following task into 
   clear, logical steps. For each step, explain what needs to be done and why.
   
   Task: {task}
   
   Provide a structured breakdown with numbered steps."""
           
           response = self.chat.send_message(prompt)
           return response.text
       
       def act(self, step):
           """Execute a specific step."""
           prompt = f"""Now execute this step: {step}
   
   Provide the detailed actions taken and results."""
           
           response = self.chat.send_message(prompt)
           return response.text
       
       def reflect(self, outcome):
           """Reflect on the outcome and suggest improvements."""
           prompt = f"""Reflect on this outcome: {outcome}
   
   What worked well? What could be improved? What should we try next?"""
           
           response = self.chat.send_message(prompt)
           return response.text
   
   def solve_problem(self, problem):
       """Complete problem-solving cycle."""
       print(f"🎯 Problem: {problem}\n")
       
       # Think: Plan the approach
       print("💭 THINKING (Planning)...")
       plan = self.think(problem)
       print(f"{plan}\n")
       
       # Act: Execute first step (simulated)
       print("🎬 ACTING (Executing first step)...")
       action_result = self.act("Execute the first step from the plan above")
       print(f"{action_result}\n")
       
       # Reflect: Learn from results
       print("🤔 REFLECTING (Learning)...")
       reflection = self.reflect(action_result)
       print(f"{reflection}\n")
       
       return {
           "plan": plan,
           "action": action_result,
           "reflection": reflection
       }
   
   if __name__ == "__main__":
       agent = ReasoningAgent()
       
       # Test with complex task
       problem = """Design a system that can automatically categorize customer 
   support tickets, find relevant documentation from a knowledge base, 
   and generate draft responses."""
       
       result = agent.solve_problem(problem)
   EOF
   ```

2. Run the reasoning agent:
   ```bash
   python reasoning_agent.py
   ```

   

## Task 4: Implement Agent with Memory using Oracle Database

1. Create an agent with persistent memory:
   ```python
   cat > ~/agent_with_memory.py << 'EOF'
   from vertexai.generative_models import GenerativeModel
   import vertexai
   import oracledb
   import json
   from datetime import datetime
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   class MemoryAgent:
       """Agent with persistent memory stored in Oracle Database."""
       
       def __init__(self, agent_id):
           self.agent_id = agent_id
           self.model = GenerativeModel("gemini-pro")
           self.connection = self._get_connection()
           self._ensure_memory_table()
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def _ensure_memory_table(self):
           """Create memory table if it doesn't exist."""
           cursor = self.connection.cursor()
           try:
               cursor.execute("""
                   CREATE TABLE IF NOT EXISTS agent_memory (
                       id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                       agent_id VARCHAR2(100),
                       memory_type VARCHAR2(50),
                       content CLOB,
                       metadata JSON,
                       created_at TIMESTAMP DEFAULT SYSTIMESTAMP
                   )
               """)
               self.connection.commit()
           except:
               pass  # Table might already exist
           cursor.close()
       
       def store_memory(self, memory_type, content, metadata=None):
           """Store a memory in the database."""
           cursor = self.connection.cursor()
           cursor.execute("""
               INSERT INTO agent_memory (agent_id, memory_type, content, metadata)
               VALUES (:agent_id, :memory_type, :content, :metadata)
           """, {
               "agent_id": self.agent_id,
               "memory_type": memory_type,
               "content": content,
               "metadata": json.dumps(metadata or {})
           })
           self.connection.commit()
           cursor.close()
       
       def retrieve_memories(self, memory_type=None, limit=10):
           """Retrieve memories from the database."""
           cursor = self.connection.cursor()
           
           if memory_type:
               cursor.execute("""
                   SELECT content, metadata, created_at
                   FROM agent_memory
                   WHERE agent_id = :agent_id AND memory_type = :memory_type
                   ORDER BY created_at DESC
                   FETCH FIRST :limit ROWS ONLY
               """, {
                   "agent_id": self.agent_id,
                   "memory_type": memory_type,
                   "limit": limit
               })
           else:
               cursor.execute("""
                   SELECT content, metadata, created_at
                   FROM agent_memory
                   WHERE agent_id = :agent_id
                   ORDER BY created_at DESC
                   FETCH FIRST :limit ROWS ONLY
               """, {
                   "agent_id": self.agent_id,
                   "limit": limit
               })
           
           memories = []
           for row in cursor:
               memories.append({
                   "content": row[0],
                   "metadata": json.loads(row[1]) if row[1] else {},
                   "timestamp": row[2]
               })
           
           cursor.close()
           return memories
       
       def chat(self, message):
           """Chat with memory context."""
           # Retrieve recent conversation history
           memories = self.retrieve_memories(memory_type="conversation", limit=5)
           
           # Build context from memories
           context = "\n".join([
               f"Previous: {m['content']}"
               for m in reversed(memories)
           ])
           
           # Generate response with context
           if context:
               full_prompt = f"Context from previous conversations:\n{context}\n\nCurrent message: {message}"
           else:
               full_prompt = message
           
           response = self.model.generate_content(full_prompt)
           
           # Store this interaction
           self.store_memory(
               "conversation",
               f"User: {message}\nAgent: {response.text}",
               {"type": "chat", "timestamp": datetime.now().isoformat()}
           )
           
           return response.text
       
       def learn_fact(self, fact, category):
           """Learn and store a fact."""
           self.store_memory(
               "knowledge",
               fact,
               {"category": category, "learned_at": datetime.now().isoformat()}
           )
           print(f"✅ Learned: {fact}")
       
       def recall_knowledge(self, query):
           """Recall relevant knowledge."""
           memories = self.retrieve_memories(memory_type="knowledge")
           
           prompt = f"""Based on what I've learned:\n\n"""
           for mem in memories:
               prompt += f"- {mem['content']}\n"
           
           prompt += f"\n\nAnswer this question: {query}"
           
           response = self.model.generate_content(prompt)
           return response.text
   
   if __name__ == "__main__":
       # Create agent with memory
       agent = MemoryAgent("agent-001")
       
       # Teach the agent some facts
       agent.learn_fact(
           "Oracle AI Database supports vector search with HNSW indexing",
           "database"
       )
       agent.learn_fact(
           "Gemini models can process text, code, and images",
           "ai-models"
       )
       
       # Have a conversation
       print("\n" + "="*80)
       print("CONVERSATION WITH MEMORY")
       print("="*80 + "\n")
       
       response1 = agent.chat("What do you know about vector databases?")
       print(f"Agent: {response1}\n")
       
       response2 = agent.chat("Can you elaborate on that?")
       print(f"Agent: {response2}\n")
       
       # Recall knowledge
       print("\n" + "="*80)
       print("KNOWLEDGE RECALL")
       print("="*80 + "\n")
       
       knowledge = agent.recall_knowledge("What AI capabilities have you learned about?")
       print(f"Agent: {knowledge}")
   EOF
   ```

2. Run the memory agent:
   ```bash
   python agent_with_memory.py
   ```

   

Congratulations! You have successfully explored Vertex AI models, implemented function calling, and built agents with reasoning and memory capabilities.

You may now **proceed to the next lab**.

## Learn More

* [Vertex AI Function Calling](https://cloud.google.com/vertex-ai/docs/generative-ai/multimodal/function-calling)
* [Building AI Agents with Vertex AI](https://codelabs.developers.google.com/devsite/codelabs/building-ai-agents-vertexai)
* [Agent Design Patterns](https://developers.google.com/machine-learning/resources/ai-agents)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, December 2025
