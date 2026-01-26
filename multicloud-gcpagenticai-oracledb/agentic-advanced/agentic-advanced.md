# Implement Agentic Memory with Oracle AI Database

## Introduction

In this lab, you will implement advanced agentic memory patterns using Oracle AI Database. Agentic memory enables AI agents to maintain long-term context, learn from interactions, and build persistent knowledge that improves over time.

You'll explore different types of memory (episodic, semantic, procedural) and implement them using Oracle's AI features including vector search, JSON storage, and temporal queries.

Estimated Time: 20 minutes

### Objectives

* Understand different types of agentic memory
* Implement episodic memory for conversation history
* Build semantic memory with vector embeddings
* Create procedural memory for learned behaviors
* Implement memory consolidation and retrieval strategies
* Use Oracle's temporal features for memory management

### Prerequisites

* Completed previous labs
* Understanding of vector search and RAG
* Familiarity with agent concepts

## Task 1: Understanding Agentic Memory Architecture

1. Create a comprehensive memory architecture:
   ```python
   cat > ~/memory_architecture.py << 'EOF'
   from enum import Enum
   from dataclasses import dataclass
   from typing import List, Dict, Optional
   from datetime import datetime
   
   class MemoryType(Enum):
       """Types of memory in agentic systems."""
       EPISODIC = "episodic"  # Specific events/interactions
       SEMANTIC = "semantic"  # Facts and knowledge
       PROCEDURAL = "procedural"  # Skills and procedures
       WORKING = "working"  # Short-term context
   
   @dataclass
   class Memory:
       """Base memory structure."""
       memory_id: str
       memory_type: MemoryType
       content: str
       embedding: Optional[List[float]]
       metadata: Dict
       importance: float  # 0.0 to 1.0
       access_count: int
       last_accessed: datetime
       created_at: datetime
   
   class MemoryArchitecture:
       """Explains agentic memory architecture."""
       
       def describe(self):
           print("AGENTIC MEMORY ARCHITECTURE")
           print("="*80)
           
           print("\n1. EPISODIC MEMORY (What happened)")
           print("   - Stores specific interactions and events")
           print("   - Time-stamped and context-rich")
           print("   - Example: 'User asked about pricing on Dec 17, 2025'")
           print("   - Implementation: Time-series data with full context")
           
           print("\n2. SEMANTIC MEMORY (What we know)")
           print("   - Stores facts, concepts, and knowledge")
           print("   - Vector embeddings for similarity search")
           print("   - Example: 'Oracle Database supports vector search'")
           print("   - Implementation: Vector embeddings + JSON metadata")
           
           print("\n3. PROCEDURAL MEMORY (How to do things)")
           print("   - Stores learned procedures and skills")
           print("   - Action sequences and decision patterns")
           print("   - Example: 'When user asks X, do Y then Z'")
           print("   - Implementation: Decision trees + success metrics")
           
           print("\n4. WORKING MEMORY (Current context)")
           print("   - Short-term, actively used information")
           print("   - Current conversation state")
           print("   - Example: 'User just mentioned budget constraints'")
           print("   - Implementation: In-memory + recent DB queries")
           
           print("\n5. MEMORY CONSOLIDATION")
           print("   - Moves important working memory to long-term")
           print("   - Strengthens frequently accessed memories")
           print("   - Weakens or archives rarely used information")
           
           print("\n6. RETRIEVAL STRATEGIES")
           print("   - Recency: Recent memories more accessible")
           print("   - Importance: High-importance memories prioritized")
           print("   - Relevance: Vector similarity for semantic search")
           print("   - Frequency: Often-accessed memories easier to recall")
   
   if __name__ == "__main__":
       arch = MemoryArchitecture()
       arch.describe()
   EOF
   ```

2. Run to understand the architecture:
   ```bash
   python memory_architecture.py
   ```

## Task 2: Implement Episodic Memory

1. Create episodic memory system:
   ```python
   cat > ~/episodic_memory.py << 'EOF'
   import oracledb
   import json
   from datetime import datetime, timedelta
   
   class EpisodicMemory:
       """Manages episodic (event-based) memories."""
       
       def __init__(self):
           self.connection = self._get_connection()
           self._setup_tables()
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def _setup_tables(self):
           """Create episodic memory table."""
           cursor = self.connection.cursor()
           try:
               cursor.execute("""
                   CREATE TABLE episodic_memories (
                       memory_id VARCHAR2(50) PRIMARY KEY,
                       agent_id VARCHAR2(50),
                       event_type VARCHAR2(50),
                       content CLOB,
                       participants JSON,
                       context JSON,
                       emotions JSON,
                       importance FLOAT DEFAULT 0.5,
                       access_count NUMBER DEFAULT 0,
                       last_accessed TIMESTAMP,
                       created_at TIMESTAMP DEFAULT SYSTIMESTAMP
                   )
               """)
               self.connection.commit()
           except:
               pass
           cursor.close()
       
       def store_episode(self, agent_id, event_type, content, 
                        participants=None, context=None, emotions=None, 
                        importance=0.5):
           """Store an episodic memory."""
           memory_id = f"EP-{datetime.now().strftime('%Y%m%d%H%M%S')}"
           
           cursor = self.connection.cursor()
           cursor.execute("""
               INSERT INTO episodic_memories 
               (memory_id, agent_id, event_type, content, participants, 
                context, emotions, importance, last_accessed)
               VALUES (:memory_id, :agent_id, :event_type, :content, 
                      :participants, :context, :emotions, :importance, SYSTIMESTAMP)
           """, {
               "memory_id": memory_id,
               "agent_id": agent_id,
               "event_type": event_type,
               "content": content,
               "participants": json.dumps(participants or {}),
               "context": json.dumps(context or {}),
               "emotions": json.dumps(emotions or {}),
               "importance": importance
           })
           self.connection.commit()
           cursor.close()
           
           return memory_id
       
       def recall_recent(self, agent_id, hours=24, limit=10):
           """Recall recent episodic memories."""
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT memory_id, event_type, content, participants, 
                      context, importance, created_at
               FROM episodic_memories
               WHERE agent_id = :agent_id
                 AND created_at >= SYSTIMESTAMP - INTERVAL ':hours' HOUR
               ORDER BY importance DESC, created_at DESC
               FETCH FIRST :limit ROWS ONLY
           """, {
               "agent_id": agent_id,
               "hours": hours,
               "limit": limit
           })
           
           memories = []
           for row in cursor:
               memories.append({
                   "memory_id": row[0],
                   "event_type": row[1],
                   "content": row[2],
                   "participants": json.loads(row[3]) if row[3] else {},
                   "context": json.loads(row[4]) if row[4] else {},
                   "importance": float(row[5]),
                   "timestamp": row[6]
               })
               
               # Update access count
               self._update_access(row[0])
           
           cursor.close()
           return memories
       
       def recall_by_type(self, agent_id, event_type, limit=5):
           """Recall memories of specific event type."""
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT memory_id, content, context, importance, created_at
               FROM episodic_memories
               WHERE agent_id = :agent_id AND event_type = :event_type
               ORDER BY importance DESC, created_at DESC
               FETCH FIRST :limit ROWS ONLY
           """, {
               "agent_id": agent_id,
               "event_type": event_type,
               "limit": limit
           })
           
           memories = []
           for row in cursor:
               memories.append({
                   "memory_id": row[0],
                   "content": row[1],
                   "context": json.loads(row[2]) if row[2] else {},
                   "importance": float(row[3]),
                   "timestamp": row[4]
               })
               self._update_access(row[0])
           
           cursor.close()
           return memories
       
       def _update_access(self, memory_id):
           """Update access count and timestamp."""
           cursor = self.connection.cursor()
           cursor.execute("""
               UPDATE episodic_memories
               SET access_count = access_count + 1,
                   last_accessed = SYSTIMESTAMP
               WHERE memory_id = :memory_id
           """, {"memory_id": memory_id})
           self.connection.commit()
           cursor.close()
       
       def forget_old_memories(self, agent_id, days=90, min_importance=0.3):
           """Archive or delete old, unimportant memories."""
           cursor = self.connection.cursor()
           cursor.execute("""
               DELETE FROM episodic_memories
               WHERE agent_id = :agent_id
                 AND created_at < SYSTIMESTAMP - INTERVAL ':days' DAY
                 AND importance < :min_importance
                 AND access_count < 2
           """, {
               "agent_id": agent_id,
               "days": days,
               "min_importance": min_importance
           })
           deleted = cursor.rowcount
           self.connection.commit()
           cursor.close()
           
           return deleted
   
   if __name__ == "__main__":
       memory = EpisodicMemory()
       agent_id = "agent-001"
       
       print("EPISODIC MEMORY - Storing and Retrieving Events")
       print("="*80 + "\n")
       
       # Store some episodes
       episodes = [
           {
               "type": "conversation",
               "content": "User asked about implementing vector search in their application",
               "participants": {"user": "user-123", "topic": "vector-search"},
               "context": {"channel": "chat", "session": "sess-001"},
               "emotions": {"user_sentiment": "curious", "urgency": "medium"},
               "importance": 0.8
           },
           {
               "type": "problem_solved",
               "content": "Successfully helped user configure Oracle AI Database connection",
               "participants": {"user": "user-123"},
               "context": {"issue": "connection", "resolved": True},
               "importance": 0.9
           },
           {
               "type": "conversation",
               "content": "User mentioned budget constraints for cloud resources",
               "participants": {"user": "user-123", "topic": "pricing"},
               "context": {"budget_concern": True},
               "emotions": {"user_sentiment": "concerned"},
               "importance": 0.7
           }
       ]
       
       for ep in episodes:
           memory_id = memory.store_episode(
               agent_id,
               ep["type"],
               ep["content"],
               ep.get("participants"),
               ep.get("context"),
               ep.get("emotions"),
               ep.get("importance", 0.5)
           )
           print(f"✅ Stored: {memory_id} - {ep['type']}")
       
       # Recall recent memories
       print("\n\n📖 Recalling Recent Memories (last 24 hours):")
       print("-"*80)
       recent = memory.recall_recent(agent_id, hours=24)
       
       for mem in recent:
           print(f"\n{mem['memory_id']} [{mem['event_type']}]")
           print(f"   Content: {mem['content']}")
           print(f"   Importance: {mem['importance']}")
           print(f"   Time: {mem['timestamp']}")
       
       # Recall by type
       print("\n\n💬 Recalling Conversation Memories:")
       print("-"*80)
       conversations = memory.recall_by_type(agent_id, "conversation")
       
       for mem in conversations:
           print(f"\n{mem['memory_id']}")
           print(f"   {mem['content']}")
           print(f"   Context: {mem['context']}")
   EOF
   ```

2. Run the episodic memory system:
   ```bash
   python episodic_memory.py
   ```

   

## Task 3: Implement Semantic Memory with Vectors

1. Create semantic memory with vector search:
   ```python
   cat > ~/semantic_memory.py << 'EOF'
   from vertexai.language_models import TextEmbeddingModel
   import vertexai
   import oracledb
   import json
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   class SemanticMemory:
       """Manages semantic (knowledge-based) memories with vector search."""
       
       def __init__(self):
           self.embedding_model = TextEmbeddingModel.from_pretrained(
               "textembedding-gecko@003"
           )
           self.connection = self._get_connection()
           self._setup_tables()
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def _setup_tables(self):
           """Create semantic memory table."""
           cursor = self.connection.cursor()
           try:
               cursor.execute("""
                   CREATE TABLE semantic_memories (
                       memory_id VARCHAR2(50) PRIMARY KEY,
                       agent_id VARCHAR2(50),
                       category VARCHAR2(100),
                       knowledge CLOB,
                       embedding VECTOR(768, FLOAT32),
                       confidence FLOAT DEFAULT 1.0,
                       source VARCHAR2(200),
                       verified BOOLEAN DEFAULT FALSE,
                       access_count NUMBER DEFAULT 0,
                       last_accessed TIMESTAMP,
                       created_at TIMESTAMP DEFAULT SYSTIMESTAMP
                   )
               """)
               
               cursor.execute("""
                   CREATE VECTOR INDEX sem_mem_idx ON semantic_memories(embedding)
                   ORGANIZATION INMEMORY NEIGHBOR GRAPH
                   DISTANCE COSINE
                   WITH TARGET ACCURACY 95
               """)
               
               self.connection.commit()
           except:
               pass
           cursor.close()
       
       def learn(self, agent_id, category, knowledge, source="user", confidence=1.0):
           """Learn new knowledge."""
           memory_id = f"SM-{agent_id}-{datetime.now().strftime('%Y%m%d%H%M%S')}"
           
           # Generate embedding
           embedding = self.embedding_model.get_embeddings([knowledge])[0].values
           
           cursor = self.connection.cursor()
           cursor.execute("""
               INSERT INTO semantic_memories 
               (memory_id, agent_id, category, knowledge, embedding, 
                confidence, source, last_accessed)
               VALUES (:memory_id, :agent_id, :category, :knowledge, 
                      :embedding, :confidence, :source, SYSTIMESTAMP)
           """, {
               "memory_id": memory_id,
               "agent_id": agent_id,
               "category": category,
               "knowledge": knowledge,
               "embedding": list(embedding),
               "confidence": confidence,
               "source": source
           })
           self.connection.commit()
           cursor.close()
           
           return memory_id
       
       def recall_similar(self, agent_id, query, top_k=5, min_confidence=0.5):
           """Recall similar knowledge using vector search."""
           # Generate query embedding
           query_embedding = self.embedding_model.get_embeddings([query])[0].values
           
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT 
                   memory_id,
                   category,
                   knowledge,
                   confidence,
                   source,
                   VECTOR_DISTANCE(embedding, :query_vec, COSINE) as distance,
                   created_at
               FROM semantic_memories
               WHERE agent_id = :agent_id
                 AND confidence >= :min_confidence
               ORDER BY distance
               FETCH FIRST :top_k ROWS ONLY
           """, {
               "agent_id": agent_id,
               "query_vec": list(query_embedding),
               "min_confidence": min_confidence,
               "top_k": top_k
           })
           
           memories = []
           for row in cursor:
               similarity = 1 - row[5]  # Convert distance to similarity
               memories.append({
                   "memory_id": row[0],
                   "category": row[1],
                   "knowledge": row[2],
                   "confidence": float(row[3]),
                   "source": row[4],
                   "similarity": similarity,
                   "timestamp": row[6]
               })
               
               self._update_access(row[0])
           
           cursor.close()
           return memories
       
       def consolidate_knowledge(self, agent_id, category):
           """Consolidate related knowledge using AI."""
           from vertexai.generative_models import GenerativeModel
           
           # Get all knowledge in category
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT knowledge, confidence
               FROM semantic_memories
               WHERE agent_id = :agent_id AND category = :category
               ORDER BY confidence DESC, created_at DESC
           """, {
               "agent_id": agent_id,
               "category": category
           })
           
           knowledge_items = [f"- {row[0]} (confidence: {row[1]})" 
                             for row in cursor]
           cursor.close()
           
           if len(knowledge_items) < 2:
               return None
           
           # Use Gemini to consolidate
           model = GenerativeModel("gemini-pro")
           prompt = f"""Consolidate these related pieces of knowledge into a single, 
   comprehensive statement. Remove redundancies and conflicts:
   
   {chr(10).join(knowledge_items)}
   
   Provide a single consolidated knowledge statement."""
           
           response = model.generate_content(prompt)
           consolidated = response.text
           
           # Store consolidated knowledge with high confidence
           return self.learn(
               agent_id,
               f"{category}_consolidated",
               consolidated,
               source="consolidation",
               confidence=0.95
           )
       
       def _update_access(self, memory_id):
           """Update access statistics."""
           cursor = self.connection.cursor()
           cursor.execute("""
               UPDATE semantic_memories
               SET access_count = access_count + 1,
                   last_accessed = SYSTIMESTAMP
               WHERE memory_id = :memory_id
           """, {"memory_id": memory_id})
           self.connection.commit()
           cursor.close()
   
   if __name__ == "__main__":
       from datetime import datetime
       
       memory = SemanticMemory()
       agent_id = "agent-001"
       
       print("SEMANTIC MEMORY - Knowledge Management")
       print("="*80 + "\n")
       
       # Learn some facts
       facts = [
           ("database", "Oracle AI Vector Search provides similarity search using HNSW and IVF indexes"),
           ("database", "Vector embeddings in Oracle Database support multiple distance metrics"),
           ("ai-models", "Gemini is Google's multimodal AI model family"),
           ("ai-models", "Gemini Pro is optimized for complex reasoning tasks"),
           ("agents", "AI agents can use tools and function calling to interact with systems"),
           ("agents", "Multi-agent systems coordinate multiple specialized agents")
       ]
       
       print("📚 Learning facts...")
       for category, fact in facts:
           memory_id = memory.learn(agent_id, category, fact)
           print(f"   ✅ {memory_id}: {category}")
       
       # Query knowledge
       print("\n\n🔍 Querying Knowledge:")
       print("-"*80)
       
       queries = [
           "How do vector databases work?",
           "What can AI agents do?",
           "Tell me about Google's AI models"
       ]
       
       for query in queries:
           print(f"\nQuery: {query}")
           results = memory.recall_similar(agent_id, query, top_k=2)
           
           for i, result in enumerate(results, 1):
               print(f"\n   {i}. [{result['category']}] Similarity: {result['similarity']:.3f}")
               print(f"      {result['knowledge']}")
               print(f"      Source: {result['source']}, Confidence: {result['confidence']}")
       
       # Consolidate knowledge
       print("\n\n🔄 Consolidating Database Knowledge:")
       print("-"*80)
       consolidated_id = memory.consolidate_knowledge(agent_id, "database")
       if consolidated_id:
           print(f"✅ Created consolidated memory: {consolidated_id}")
   EOF
   ```

2. Run the semantic memory system:
   ```bash
   python semantic_memory.py
   ```

   

## Task 4: Implement Procedural Memory

1. Create procedural memory for learned behaviors:
   ```python
   cat > ~/procedural_memory.py << 'EOF'
   import oracledb
   import json
   from datetime import datetime
   
   class ProceduralMemory:
       """Manages procedural (how-to) memories."""
       
       def __init__(self):
           self.connection = self._get_connection()
           self._setup_tables()
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def _setup_tables(self):
           """Create procedural memory table."""
           cursor = self.connection.cursor()
           try:
               cursor.execute("""
                   CREATE TABLE procedural_memories (
                       procedure_id VARCHAR2(50) PRIMARY KEY,
                       agent_id VARCHAR2(50),
                       trigger_condition VARCHAR2(500),
                       action_sequence JSON,
                       success_count NUMBER DEFAULT 0,
                       failure_count NUMBER DEFAULT 0,
                       avg_execution_time FLOAT,
                       last_executed TIMESTAMP,
                       created_at TIMESTAMP DEFAULT SYSTIMESTAMP
                   )
               """)
               self.connection.commit()
           except:
               pass
           cursor.close()
       
       def learn_procedure(self, agent_id, trigger, actions):
           """Learn a new procedure."""
           procedure_id = f"PROC-{datetime.now().strftime('%Y%m%d%H%M%S')}"
           
           cursor = self.connection.cursor()
           cursor.execute("""
               INSERT INTO procedural_memories 
               (procedure_id, agent_id, trigger_condition, action_sequence)
               VALUES (:procedure_id, :agent_id, :trigger, :actions)
           """, {
               "procedure_id": procedure_id,
               "agent_id": agent_id,
               "trigger": trigger,
               "actions": json.dumps(actions)
           })
           self.connection.commit()
           cursor.close()
           
           return procedure_id
       
       def find_procedure(self, agent_id, situation):
           """Find applicable procedure for situation."""
           # In production, use similarity search or pattern matching
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT 
                   procedure_id,
                   trigger_condition,
                   action_sequence,
                   success_count,
                   failure_count
               FROM procedural_memories
               WHERE agent_id = :agent_id
                 AND (success_count + failure_count) > 0
               ORDER BY 
                   (success_count::FLOAT / NULLIF(success_count + failure_count, 0)) DESC
           """, {"agent_id": agent_id})
           
           procedures = []
           for row in cursor:
               success_rate = (row[3] / (row[3] + row[4])) if (row[3] + row[4]) > 0 else 0
               procedures.append({
                   "procedure_id": row[0],
                   "trigger": row[1],
                   "actions": json.loads(row[2]),
                   "success_rate": success_rate
               })
           
           cursor.close()
           return procedures
       
       def execute_and_learn(self, procedure_id, success, execution_time):
           """Record procedure execution outcome."""
           cursor = self.connection.cursor()
           
           if success:
               cursor.execute("""
                   UPDATE procedural_memories
                   SET success_count = success_count + 1,
                       avg_execution_time = 
                           COALESCE((avg_execution_time * success_count + :exec_time) / 
                                   (success_count + 1), :exec_time),
                       last_executed = SYSTIMESTAMP
                   WHERE procedure_id = :procedure_id
               """, {
                   "procedure_id": procedure_id,
                   "exec_time": execution_time
               })
           else:
               cursor.execute("""
                   UPDATE procedural_memories
                   SET failure_count = failure_count + 1,
                       last_executed = SYSTIMESTAMP
                   WHERE procedure_id = :procedure_id
               """, {"procedure_id": procedure_id})
           
           self.connection.commit()
           cursor.close()
   
   if __name__ == "__main__":
       memory = ProceduralMemory()
       agent_id = "agent-001"
       
       print("PROCEDURAL MEMORY - Learning Behaviors")
       print("="*80 + "\n")
       
       # Learn procedures
       procedures = [
           {
               "trigger": "user asks about pricing",
               "actions": [
                   {"step": 1, "action": "check_user_tier", "params": {}},
                   {"step": 2, "action": "retrieve_pricing_for_tier", "params": {}},
                   {"step": 3, "action": "format_pricing_response", "params": {}},
                   {"step": 4, "action": "ask_followup_questions", "params": {}}
               ]
           },
           {
               "trigger": "database connection error",
               "actions": [
                   {"step": 1, "action": "check_credentials", "params": {}},
                   {"step": 2, "action": "verify_network_connectivity", "params": {}},
                   {"step": 3, "action": "check_database_status", "params": {}},
                   {"step": 4, "action": "suggest_troubleshooting_steps", "params": {}}
               ]
           }
       ]
       
       print("📝 Learning procedures...")
       for proc in procedures:
           proc_id = memory.learn_procedure(agent_id, proc["trigger"], proc["actions"])
           print(f"   ✅ {proc_id}: {proc['trigger']}")
       
       # Simulate executions
       print("\n\n⚙️ Simulating procedure executions...")
       all_procs = memory.find_procedure(agent_id, "any")
       
       import random
       for proc in all_procs[:2]:
           for i in range(5):
               success = random.random() > 0.2  # 80% success rate
               exec_time = random.uniform(0.5, 2.0)
               memory.execute_and_learn(proc["procedure_id"], success, exec_time)
               
               status = "✅ Success" if success else "❌ Failed"
               print(f"   {status}: {proc['procedure_id']} in {exec_time:.2f}s")
       
       # Show learned procedures
       print("\n\n📊 Learned Procedures with Success Rates:")
       print("-"*80)
       procedures = memory.find_procedure(agent_id, "any")
       
       for proc in procedures:
           print(f"\n{proc['procedure_id']}")
           print(f"   Trigger: {proc['trigger']}")
           print(f"   Success Rate: {proc['success_rate']*100:.1f}%")
           print(f"   Steps: {len(proc['actions'])}")
   EOF
   ```

2. Run the procedural memory system:
   ```bash
   python procedural_memory.py
   ```

   

## Task 5: Integrate All Memory Types

1. Create a unified memory manager:
   ```python
   cat > ~/unified_memory_manager.py << 'EOF'
   from vertexai.generative_models import GenerativeModel
   import vertexai
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   class UnifiedMemoryManager:
       """Manages all types of agent memory."""
       
       def __init__(self, agent_id):
           self.agent_id = agent_id
           self.episodic = EpisodicMemory()
           self.semantic = SemanticMemory()
           self.procedural = ProceduralMemory()
           self.model = GenerativeModel("gemini-pro")
       
       def process_interaction(self, user_message, context=None):
           """Process interaction using all memory types."""
           print(f"\n💭 Processing: {user_message}")
           print("-"*80)
           
           # 1. Store episodic memory
           self.episodic.store_episode(
               self.agent_id,
               "user_interaction",
               user_message,
               context=context or {},
               importance=0.7
           )
           print("✅ Stored episodic memory")
           
           # 2. Recall relevant semantic knowledge
           semantic_memories = self.semantic.recall_similar(
               self.agent_id,
               user_message,
               top_k=3
           )
           print(f"✅ Retrieved {len(semantic_memories)} relevant facts")
           
           # 3. Find applicable procedures
           procedures = self.procedural.find_procedure(self.agent_id, user_message)
           print(f"✅ Found {len(procedures)} applicable procedures")
           
           # 4. Recall recent context
           recent_episodes = self.episodic.recall_recent(self.agent_id, hours=24, limit=3)
           print(f"✅ Retrieved {len(recent_episodes)} recent interactions")
           
           # 5. Generate response using all memory types
           return self._generate_informed_response(
               user_message,
               semantic_memories,
               procedures,
               recent_episodes
           )
       
       def _generate_informed_response(self, query, semantic, procedures, episodes):
           """Generate response informed by all memory types."""
           # Build context from memories
           context_parts = []
           
           if semantic:
               facts = "\n".join([f"- {m['knowledge']}" for m in semantic[:2]])
               context_parts.append(f"Relevant knowledge:\n{facts}")
           
           if recent_episodes:
               history = "\n".join([f"- {e['content']}" for e in episodes])
               context_parts.append(f"Recent context:\n{history}")
           
           if procedures:
               proc = procedures[0]
               steps = ", ".join([a["action"] for a in proc["actions"][:3]])
               context_parts.append(f"Suggested approach: {steps}")
           
           context = "\n\n".join(context_parts)
           
           prompt = f"""You are an AI agent with memory. Use this context:
   
   {context}
   
   User query: {query}
   
   Provide a helpful, contextual response."""
           
           response = self.model.generate_content(prompt)
           return response.text
   
   if __name__ == "__main__":
       # Import previously defined classes
       from episodic_memory import EpisodicMemory
       from semantic_memory import SemanticMemory
       from procedural_memory import ProceduralMemory
       
       print("UNIFIED MEMORY MANAGER")
       print("="*80)
       
       manager = UnifiedMemoryManager("agent-001")
       
       # Process interaction
       response = manager.process_interaction(
           "How can I optimize my vector search queries?",
           context={"session": "demo", "topic": "performance"}
       )
       
       print("\n\n🤖 Agent Response:")
       print("-"*80)
       print(response)
   EOF
   ```

2. Run the unified memory manager:
   ```bash
   python unified_memory_manager.py
   ```

   

Congratulations! You have successfully implemented a comprehensive agentic memory system using Oracle AI Database. Your agents now have:
- Episodic memory for specific interactions
- Semantic memory for knowledge with vector search
- Procedural memory for learned behaviors
- Integrated memory management for intelligent responses

## Learn More

* [Oracle AI Database Features](https://www.oracle.com/artificial-intelligence/database/)
* [Agentic Memory Patterns](https://arxiv.org/abs/2304.03442)
* [Long-term Memory in AI Systems](https://www.deeplearning.ai/the-batch/)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, December 2025
