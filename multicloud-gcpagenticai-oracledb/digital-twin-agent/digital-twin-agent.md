# Create a Digital Twin Agent with Vertex AI Agent Builder

## Introduction

In this lab, you will create a sophisticated digital twin agent using the Vertex AI Agent Builder Developer Kit (ADK). A digital twin agent is a virtual representation that can simulate, predict, and interact based on real-world data and behavior patterns.

You'll build an agent that represents a customer service system, using Oracle AI Database for state management and Gemini for intelligent decision-making.

Estimated Time: 25 minutes

### Objectives

* Understand digital twin agent architecture
* Use Vertex AI Agent Builder Developer Kit (ADK)
* Build a multi-agent system with orchestration
* Implement agent-to-agent communication
* Create agents that can plan, execute, and adapt

### Prerequisites

* Completed previous labs
* Understanding of agent concepts
* Vertex AI Agent Builder enabled in your GCP project

## Task 1: Install Vertex AI Agent Builder SDK

1. Install the required packages:
   ```bash
   pip install google-cloud-aiplatform[reasoning_engine]
   pip install google-generativeai
   pip install pydantic
   ```

2. Verify installation:
   ```python
   python -c "import vertexai.preview.reasoning_engines as reasoning_engines; print('ADK installed successfully')"
   ```

## Task 2: Design Digital Twin Agent Architecture

1. Create the architecture for a customer service digital twin:
   ```python
   cat > ~/digital_twin_architecture.py << 'EOF'
   from dataclasses import dataclass
   from typing import List, Dict, Optional
   from enum import Enum
   
   class AgentRole(Enum):
       """Different agent roles in the system."""
       TRIAGE = "triage"  # Initial customer contact
       TECHNICAL = "technical"  # Technical support
       BILLING = "billing"  # Billing inquiries
       ESCALATION = "escalation"  # Complex issues
       COORDINATOR = "coordinator"  # Orchestrates other agents
   
   @dataclass
   class CustomerProfile:
       """Digital twin of customer."""
       customer_id: str
       name: str
       tier: str  # bronze, silver, gold
       history: List[Dict]
       preferences: Dict
       sentiment: str  # positive, neutral, negative
   
   @dataclass
   class Ticket:
       """Support ticket."""
       ticket_id: str
       customer: CustomerProfile
       issue_type: str
       description: str
       priority: str
       status: str
       assigned_agent: Optional[str]
       resolution: Optional[str]
   
   class DigitalTwinSystem:
       """Architecture for digital twin agent system."""
       
       def __init__(self):
           self.agents = {
               AgentRole.TRIAGE: "Analyzes and routes tickets",
               AgentRole.TECHNICAL: "Handles technical issues",
               AgentRole.BILLING: "Manages billing inquiries",
               AgentRole.ESCALATION: "Handles complex cases",
               AgentRole.COORDINATOR: "Orchestrates agent collaboration"
           }
       
       def describe_architecture(self):
           print("Digital Twin Agent System Architecture")
           print("="*60)
           for role, description in self.agents.items():
               print(f"\n{role.value.upper()} Agent:")
               print(f"  Purpose: {description}")
           
           print("\n\nWorkflow:")
           print("1. Ticket arrives → Triage Agent analyzes")
           print("2. Coordinator assigns to specialist agent")
           print("3. Specialist handles ticket (may consult others)")
           print("4. Resolution stored in Oracle Database")
           print("5. Learning: Patterns stored for future improvement")
   
   if __name__ == "__main__":
       system = DigitalTwinSystem()
       system.describe_architecture()
   EOF
   ```

2. Run to see the architecture:
   ```bash
   python digital_twin_architecture.py
   ```

## Task 3: Build the Triage Agent

1. Create a triage agent that analyzes and routes tickets:
   ```python
   cat > ~/triage_agent.py << 'EOF'
   from vertexai.generative_models import GenerativeModel, FunctionDeclaration, Tool
   import vertexai
   import oracledb
   import json
   from datetime import datetime
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   class TriageAgent:
       """Agent that analyzes tickets and determines routing."""
       
       def __init__(self):
           self.model = GenerativeModel("gemini-pro")
           self.connection = self._get_connection()
           self._setup_database()
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def _setup_database(self):
           """Create tables for ticket management."""
           cursor = self.connection.cursor()
           try:
               cursor.execute("""
                   CREATE TABLE tickets (
                       ticket_id VARCHAR2(50) PRIMARY KEY,
                       customer_id VARCHAR2(50),
                       issue_type VARCHAR2(50),
                       description CLOB,
                       priority VARCHAR2(20),
                       status VARCHAR2(20),
                       assigned_to VARCHAR2(50),
                       created_at TIMESTAMP DEFAULT SYSTIMESTAMP,
                       updated_at TIMESTAMP DEFAULT SYSTIMESTAMP
                   )
               """)
               self.connection.commit()
           except:
               pass  # Table exists
           cursor.close()
       
       def analyze_ticket(self, description, customer_tier="silver"):
           """Analyze ticket and determine priority and routing."""
           prompt = f"""You are a triage agent for customer support. Analyze this ticket:
   
   Customer Tier: {customer_tier}
   Issue: {description}
   
   Provide JSON response with:
   1. issue_type: technical, billing, account, or general
   2. priority: low, medium, high, critical
   3. assigned_to: triage, technical, billing, or escalation
   4. reasoning: brief explanation
   5. suggested_actions: list of next steps
   
   Respond ONLY with valid JSON."""
           
           response = self.model.generate_content(prompt)
           
           # Parse JSON response
           try:
               analysis = json.loads(response.text)
           except:
               # Fallback if not valid JSON
               analysis = {
                   "issue_type": "general",
                   "priority": "medium",
                   "assigned_to": "technical",
                   "reasoning": "Unable to parse, defaulting to technical",
                   "suggested_actions": ["Manual review required"]
               }
           
           return analysis
       
       def create_ticket(self, ticket_id, customer_id, description, customer_tier="silver"):
           """Create and triage a new ticket."""
           # Analyze the ticket
           analysis = self.analyze_ticket(description, customer_tier)
           
           # Store in database
           cursor = self.connection.cursor()
           cursor.execute("""
               INSERT INTO tickets 
               (ticket_id, customer_id, issue_type, description, priority, status, assigned_to)
               VALUES (:ticket_id, :customer_id, :issue_type, :description, :priority, :status, :assigned_to)
           """, {
               "ticket_id": ticket_id,
               "customer_id": customer_id,
               "issue_type": analysis["issue_type"],
               "description": description,
               "priority": analysis["priority"],
               "status": "open",
               "assigned_to": analysis["assigned_to"]
           })
           self.connection.commit()
           cursor.close()
           
           return {
               "ticket_id": ticket_id,
               "analysis": analysis
           }
       
       def get_ticket_stats(self):
           """Get statistics about tickets."""
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT 
                   issue_type,
                   priority,
                   COUNT(*) as count
               FROM tickets
               GROUP BY issue_type, priority
               ORDER BY count DESC
           """)
           
           stats = []
           for row in cursor:
               stats.append({
                   "issue_type": row[0],
                   "priority": row[1],
                   "count": row[2]
               })
           
           cursor.close()
           return stats
   
   if __name__ == "__main__":
       agent = TriageAgent()
       
       # Test cases
       test_tickets = [
           {
               "id": "TKT-001",
               "customer": "CUST-123",
               "tier": "gold",
               "description": "Cannot connect to database, getting timeout errors"
           },
           {
               "id": "TKT-002",
               "customer": "CUST-456",
               "tier": "silver",
               "description": "My invoice shows wrong amount, need clarification"
           },
           {
               "id": "TKT-003",
               "customer": "CUST-789",
               "tier": "bronze",
               "description": "How do I reset my password?"
           }
       ]
       
       print("TRIAGE AGENT - Processing Tickets")
       print("="*80 + "\n")
       
       for ticket in test_tickets:
           print(f"Ticket: {ticket['id']}")
           print(f"Customer: {ticket['customer']} ({ticket['tier']} tier)")
           print(f"Issue: {ticket['description']}\n")
           
           result = agent.create_ticket(
               ticket['id'],
               ticket['customer'],
               ticket['description'],
               ticket['tier']
           )
           
           analysis = result['analysis']
           print(f"📊 Analysis:")
           print(f"   Type: {analysis['issue_type']}")
           print(f"   Priority: {analysis['priority']}")
           print(f"   Assigned to: {analysis['assigned_to']}")
           print(f"   Reasoning: {analysis['reasoning']}")
           print(f"   Actions: {', '.join(analysis['suggested_actions'])}")
           print("\n" + "-"*80 + "\n")
       
       # Show statistics
       print("\n📈 Ticket Statistics:")
       stats = agent.get_ticket_stats()
       for stat in stats:
           print(f"   {stat['issue_type']} / {stat['priority']}: {stat['count']}")
   EOF
   ```

2. Run the triage agent:
   ```bash
   python triage_agent.py
   ```

   ![Triage Agent](images/triage-agent-output.png " ")

## Task 4: Build Specialist Agents

1. Create technical and billing specialist agents:
   ```python
   cat > ~/specialist_agents.py << 'EOF'
   from vertexai.generative_models import GenerativeModel
   import vertexai
   import oracledb
   from datetime import datetime
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   class TechnicalAgent:
       """Handles technical support issues."""
       
       def __init__(self):
           self.model = GenerativeModel("gemini-pro")
           self.connection = self._get_connection()
           self.knowledge_base = self._load_knowledge()
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def _load_knowledge(self):
           """Load technical knowledge from vector store."""
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT content FROM document_embeddings
               WHERE JSON_VALUE(metadata, '$.category') = 'database'
               OR JSON_VALUE(metadata, '$.topic') = 'technical'
           """)
           
           knowledge = [row[0] for row in cursor]
           cursor.close()
           return knowledge
       
       def handle_issue(self, ticket_id, description):
           """Handle technical issue."""
           # Build context from knowledge base
           context = "\n".join([f"- {k}" for k in self.knowledge_base[:5]])
           
           prompt = f"""You are a technical support agent. Use this knowledge:
   
   {context}
   
   Customer Issue: {description}
   
   Provide:
   1. Root cause analysis
   2. Step-by-step resolution
   3. Prevention tips
   
   Be specific and technical."""
           
           response = self.model.generate_content(prompt)
           
           # Store resolution
           cursor = self.connection.cursor()
           cursor.execute("""
               UPDATE tickets
               SET status = :status, updated_at = SYSTIMESTAMP
               WHERE ticket_id = :ticket_id
           """, {
               "status": "resolved",
               "ticket_id": ticket_id
           })
           self.connection.commit()
           cursor.close()
           
           return response.text
   
   class BillingAgent:
       """Handles billing inquiries."""
       
       def __init__(self):
           self.model = GenerativeModel("gemini-pro")
           self.connection = self._get_connection()
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def handle_issue(self, ticket_id, description, customer_id):
           """Handle billing inquiry."""
           prompt = f"""You are a billing support agent.
   
   Customer ID: {customer_id}
   Issue: {description}
   
   Provide:
   1. Explanation of charges
   2. If it's a dispute, outline resolution process
   3. Any applicable credits or adjustments
   4. Next steps for customer
   
   Be empathetic and clear."""
           
           response = self.model.generate_content(prompt)
           
           # Update ticket
           cursor = self.connection.cursor()
           cursor.execute("""
               UPDATE tickets
               SET status = :status, updated_at = SYSTIMESTAMP
               WHERE ticket_id = :ticket_id
           """, {
               "status": "resolved",
               "ticket_id": ticket_id
           })
           self.connection.commit()
           cursor.close()
           
           return response.text
   
   if __name__ == "__main__":
       tech_agent = TechnicalAgent()
       billing_agent = BillingAgent()
       
       print("SPECIALIST AGENTS - Handling Tickets")
       print("="*80 + "\n")
       
       # Technical issue
       print("🔧 TECHNICAL AGENT")
       print("-"*80)
       tech_resolution = tech_agent.handle_issue(
           "TKT-001",
           "Cannot connect to database, getting timeout errors"
       )
       print(tech_resolution)
       
       print("\n\n💰 BILLING AGENT")
       print("-"*80)
       billing_resolution = billing_agent.handle_issue(
           "TKT-002",
           "My invoice shows wrong amount, need clarification",
           "CUST-456"
       )
       print(billing_resolution)
   EOF
   ```

2. Run the specialist agents:
   ```bash
   python specialist_agents.py
   ```

   ![Specialist Agents](images/specialist-agents-output.png " ")

## Task 5: Build Coordinator Agent with Multi-Agent Orchestration

1. Create a coordinator that orchestrates multiple agents:
   ```python
   cat > ~/coordinator_agent.py << 'EOF'
   from vertexai.generative_models import GenerativeModel
   import vertexai
   import oracledb
   import json
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   class CoordinatorAgent:
       """Orchestrates multiple specialist agents."""
       
       def __init__(self):
           self.model = GenerativeModel("gemini-pro")
           self.connection = self._get_connection()
           self.agents = {
               "technical": "Handles technical issues",
               "billing": "Handles billing inquiries",
               "escalation": "Handles complex issues"
           }
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def get_pending_tickets(self):
           """Get tickets needing assignment."""
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT ticket_id, customer_id, issue_type, description, priority
               FROM tickets
               WHERE status = 'open'
               ORDER BY 
                   CASE priority
                       WHEN 'critical' THEN 1
                       WHEN 'high' THEN 2
                       WHEN 'medium' THEN 3
                       ELSE 4
                   END
           """)
           
           tickets = []
           for row in cursor:
               tickets.append({
                   "ticket_id": row[0],
                   "customer_id": row[1],
                   "issue_type": row[2],
                   "description": row[3],
                   "priority": row[4]
               })
           
           cursor.close()
           return tickets
       
       def orchestrate_resolution(self, ticket):
           """Orchestrate ticket resolution across agents."""
           print(f"\n🎯 Coordinator: Processing {ticket['ticket_id']}")
           print(f"   Priority: {ticket['priority']}")
           print(f"   Type: {ticket['issue_type']}")
           
           # Determine if multiple agents needed
           prompt = f"""As a coordinator, analyze if this ticket needs:
   1. Single agent (which one?)
   2. Multiple agents collaborating (which ones and in what order?)
   3. Escalation
   
   Ticket: {ticket['description']}
   Type: {ticket['issue_type']}
   Priority: {ticket['priority']}
   
   Respond with JSON:
   {{
       "strategy": "single/multi/escalate",
       "agents": ["agent1", "agent2"],
       "sequence": "parallel/sequential",
       "reasoning": "explanation"
   }}"""
           
           response = self.model.generate_content(prompt)
           
           try:
               strategy = json.loads(response.text)
           except:
               strategy = {
                   "strategy": "single",
                   "agents": [ticket['issue_type']],
                   "sequence": "sequential",
                   "reasoning": "Default routing"
               }
           
           print(f"   Strategy: {strategy['strategy']}")
           print(f"   Agents: {', '.join(strategy['agents'])}")
           print(f"   Reasoning: {strategy['reasoning']}")
           
           return strategy
       
       def monitor_agent_performance(self):
           """Monitor and report on agent performance."""
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT 
                   assigned_to,
                   status,
                   COUNT(*) as count,
                   AVG(EXTRACT(HOUR FROM (updated_at - created_at))) as avg_hours
               FROM tickets
               WHERE assigned_to IS NOT NULL
               GROUP BY assigned_to, status
           """)
           
           performance = {}
           for row in cursor:
               agent = row[0]
               if agent not in performance:
                   performance[agent] = {}
               performance[agent][row[1]] = {
                   "count": row[2],
                   "avg_hours": float(row[3]) if row[3] else 0
               }
           
           cursor.close()
           return performance
   
   if __name__ == "__main__":
       coordinator = CoordinatorAgent()
       
       print("COORDINATOR AGENT - Multi-Agent Orchestration")
       print("="*80)
       
       # Get pending tickets
       tickets = coordinator.get_pending_tickets()
       
       print(f"\nFound {len(tickets)} pending tickets")
       
       # Process each ticket
       for ticket in tickets[:3]:  # Process first 3
           strategy = coordinator.orchestrate_resolution(ticket)
       
       # Show performance metrics
       print("\n\n📊 Agent Performance Metrics")
       print("="*80)
       performance = coordinator.monitor_agent_performance()
       
       for agent, metrics in performance.items():
           print(f"\n{agent.upper()} Agent:")
           for status, data in metrics.items():
               print(f"   {status}: {data['count']} tickets, "
                     f"avg {data['avg_hours']:.1f} hours")
   EOF
   ```

2. Run the coordinator:
   ```bash
   python coordinator_agent.py
   ```

   ![Coordinator Agent](images/coordinator-agent-output.png " ")

## Task 6: Implement Agent Learning and Adaptation

1. Create a learning system for agents:
   ```python
   cat > ~/agent_learning.py << 'EOF'
   from vertexai.generative_models import GenerativeModel
   import vertexai
   import oracledb
   import json
   
   PROJECT_ID = "your-project-id"
   REGION = "us-central1"
   vertexai.init(project=PROJECT_ID, location=REGION)
   
   class LearningAgent:
       """Agent that learns from interactions and improves."""
       
       def __init__(self):
           self.model = GenerativeModel("gemini-pro")
           self.connection = self._get_connection()
           self._setup_learning_tables()
       
       def _get_connection(self):
           return oracledb.connect(
               user="vecuser",
               password="ComplexPassword123!",
               dsn="agenticaidb_high",
               config_dir="/home/your_username/wallet",
               wallet_location="/home/your_username/wallet",
               wallet_password="YourWalletPassword"
           )
       
       def _setup_learning_tables(self):
           """Create tables for learning data."""
           cursor = self.connection.cursor()
           try:
               cursor.execute("""
                   CREATE TABLE agent_learnings (
                       id NUMBER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
                       pattern_type VARCHAR2(50),
                       pattern_data JSON,
                       confidence FLOAT,
                       usage_count NUMBER DEFAULT 0,
                       success_rate FLOAT,
                       created_at TIMESTAMP DEFAULT SYSTIMESTAMP
                   )
               """)
               self.connection.commit()
           except:
               pass
           cursor.close()
       
       def analyze_patterns(self):
           """Analyze ticket resolution patterns."""
           cursor = self.connection.cursor()
           cursor.execute("""
               SELECT 
                   issue_type,
                   priority,
                   assigned_to,
                   COUNT(*) as frequency,
                   AVG(CASE WHEN status = 'resolved' THEN 1 ELSE 0 END) as success_rate
               FROM tickets
               GROUP BY issue_type, priority, assigned_to
               HAVING COUNT(*) >= 2
           """)
           
           patterns = []
           for row in cursor:
               pattern = {
                   "issue_type": row[0],
                   "priority": row[1],
                   "best_agent": row[2],
                   "frequency": row[3],
                   "success_rate": float(row[4])
               }
               patterns.append(pattern)
           
           cursor.close()
           
           # Store learned patterns
           for pattern in patterns:
               self._store_learning("routing_pattern", pattern, pattern["success_rate"])
           
           return patterns
       
       def _store_learning(self, pattern_type, pattern_data, confidence):
           """Store a learned pattern."""
           cursor = self.connection.cursor()
           cursor.execute("""
               INSERT INTO agent_learnings (pattern_type, pattern_data, confidence, success_rate)
               VALUES (:pattern_type, :pattern_data, :confidence, :success_rate)
           """, {
               "pattern_type": pattern_type,
               "pattern_data": json.dumps(pattern_data),
               "confidence": confidence,
               "success_rate": confidence
           })
           self.connection.commit()
           cursor.close()
       
       def get_learned_insights(self):
           """Get insights from learned patterns."""
           patterns = self.analyze_patterns()
           
           if not patterns:
               return "Not enough data for insights yet."
           
           # Use Gemini to generate insights
           patterns_text = json.dumps(patterns, indent=2)
           
           prompt = f"""Analyze these ticket resolution patterns and provide insights:
   
   {patterns_text}
   
   Provide:
   1. Key patterns discovered
   2. Recommendations for agent assignment
   3. Potential improvements
   4. Risk areas to watch"""
           
           response = self.model.generate_content(prompt)
           return response.text
   
   if __name__ == "__main__":
       learner = LearningAgent()
       
       print("LEARNING AGENT - Analyzing Patterns")
       print("="*80 + "\n")
       
       patterns = learner.analyze_patterns()
       
       print(f"Discovered {len(patterns)} patterns:\n")
       for i, pattern in enumerate(patterns, 1):
           print(f"{i}. {pattern['issue_type']} / {pattern['priority']}")
           print(f"   Best Agent: {pattern['best_agent']}")
           print(f"   Success Rate: {pattern['success_rate']*100:.1f}%")
           print(f"   Frequency: {pattern['frequency']} occurrences\n")
       
       print("\n" + "="*80)
       print("AI-Generated Insights")
       print("="*80 + "\n")
       
       insights = learner.get_learned_insights()
       print(insights)
   EOF
   ```

2. Run the learning agent:
   ```bash
   python agent_learning.py
   ```

   ![Learning Agent](images/learning-agent-output.png " ")

Congratulations! You have successfully created a sophisticated digital twin agent system using Vertex AI Agent Builder and Oracle AI Database. The system includes:
- Triage agent for intelligent routing
- Specialist agents for technical and billing support
- Coordinator for multi-agent orchestration
- Learning capabilities for continuous improvement

You may now **proceed to the next lab**.

## Learn More

* [Vertex AI Agent Builder](https://cloud.google.com/vertex-ai/docs/agent-builder)
* [Building Multi-Agent Systems](https://codelabs.developers.google.com/aidemy-multi-agent)
* [Digital Twin Architecture Patterns](https://cloud.google.com/architecture/digital-twins)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, December 2025
