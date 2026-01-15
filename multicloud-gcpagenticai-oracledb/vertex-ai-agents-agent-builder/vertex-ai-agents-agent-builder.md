# Create Vertex AI Agents with Agent Builder (no-code)

## Introduction

This lab demonstrates building AI Agents using Google Cloud's Vertex AI Agent Builder - a no-code interface for creating conversational agents. You'll learn how to design, build, and deploy an AI agent without writing code, ground it with external datastores, and integrate it into applications.

Vertex AI Agent Builder enables you to quickly prototype and deploy intelligent agents that can understand natural language, access knowledge bases, and provide contextual responses. This complements the code-based approach using the Agent Development Kit (ADK) covered in other labs.

Estimated Time: 45 minutes

### Objectives

* Design an AI agent with clear goals and constraints
* Build a conversational agent using Vertex AI Agent Builder
* Ground the agent with external datastores
* Test and refine agent behavior
* Integrate the agent with Oracle AI Database features

### Prerequisites

* Google Cloud Platform account with Vertex AI access
* Basic understanding of AI/ML concepts
* Completion of previous labs (Oracle AI Database setup)

## Task 1: Design Your AI Agent

Before building an agent, establish a clear vision by answering key questions:

1. **What problem will it solve?**
   - Planning trips can be time-consuming and overwhelming
   - The agent will help users discover destinations, plan itineraries, and provide travel information

2. **What are its primary functions?**
   - Answer questions about destinations (visa requirements, best times to visit)
   - Plan itineraries based on user schedules and objectives
   - Provide recommendations for activities and accommodations

3. **What are its limitations?**
   - Cannot answer highly complex or niche queries by default
   - Won't generate visual images
   - Knowledge limited by the underlying model and provided datastores

4. **What personality or persona should it have?**
   - Knowledgeable, helpful, and enthusiastic about travel
   - Clear and concise communication style
   - Friendly and approachable tone

5. **What are the success metrics?**
   - User satisfaction with recommendations
   - Accuracy of information provided
   - Ability to handle diverse travel-related queries

   ![Agent Design](images/agent-design.png " ")

## Task 2: Build Agent with Vertex AI Agent Builder

1. Navigate to Vertex AI Agent Builder:
   ```
   https://console.cloud.google.com/gen-app-builder/engines
   ```

2. On the welcome page, click **CONTINUE AND ACTIVATE THE API**

   ![Activate API](images/activate-api.png " ")

3. Click **CREATE A NEW APP**

   ![Create App](images/create-app.png " ")

4. Choose **Conversational agent** and click **CREATE**

   Note: This will open Dialogflow Conversational Agents in a new tab. If prompted, enable the Dialogflow API.

   ![Conversational Agent](images/conversational-agent.png " ")

5. In Dialogflow, click **Create Agent**

   ![Create Agent](images/create-agent-button.png " ")

6. Choose **Build your own**

   ![Build Your Own](images/build-your-own.png " ")

## Task 3: Configure Your Agent

1. Configure agent settings:
   - **Display Name**: Travel Buddy (or your preferred name)
   - **Location**: Select `global (Global serving, data-at-rest in US)` as Region
   - Keep other configurations as default
   - Click **CREATE**

   ![Agent Configuration](images/agent-config.png " ")

2. Create a Playbook:
   - **Playbook Name**: Info Agent
   - **Goal**: Help customers answer travel related queries
   - **Instruction**: Greet the users, then ask how you can help them today
   - Click **Save**

   ![Playbook Configuration](images/playbook-config.png " ")

## Task 4: Test Your Agent

1. Open the simulator:
   - Click the **Toggle Simulator** icon
   - Select the agent you just created (e.g., Info Agent)
   - Choose the underlying model: `gemini-1.5-flash` or `gemini-2.0-flash`

2. Test the agent:
   - Type a question in the "Enter User Input" text box
   - Example: "What are the visa requirements for traveling to Japan?"
   - Observe the agent's response

   ![Test Agent](images/test-agent.png " ")

Congratulations! You've successfully created an AI Agent using Vertex AI Agent Builder.

## Task 5: Attach Datastores to Ground the Agent

While the agent can answer general questions, grounding it with specific datastores enhances its knowledge and reduces hallucinations.

1. Test the agent's limitations:
   - Ask: "What's the best way to reach Wakanda?"
   - The agent will respond that Wakanda is fictional and cannot provide travel information

2. Create a datastore tool:
   - Close the simulator if open
   - In Agent Basics page, click **+ Data store** button at the bottom
   - Fill in the information:
     - **Tool name**: Alternative Location
     - **Type**: Data store
     - **Description**: Use this tool if user's request contains a location that doesn't exist
   - Click **Save**

   ![Create Datastore Tool](images/datastore-tool.png " ")

3. Create the actual datastore:
   - Click **add data stores** and **Create a data store**
   - Choose **Cloud Storage** option
   - Click **FILE**
   - Enter the path: `ai-workshops/agents/data/wakanda.txt`
   - Click **CONTINUE**

   ![Create Datastore](images/create-datastore.png " ")

   The datastore contains information about places similar to fictional Wakanda, such as:
   - Oribi Gorge in South Africa
   - Iguazu Falls (Argentina/Brazil border)
   - Victoria Falls (Zimbabwe/Zambia border)
   - And other similar locations

4. Configure the datastore:
   - **Name**: Wakanda Alternative
   - Click **CREATE**

   ![Name Datastore](images/name-datastore.png " ")

5. Select and attach the datastore:
   - Wait for the import to complete (check progress in Data stores section)
   - Once complete, go back to Dialogflow and click **refresh**
   - The datastore should appear under "Available data stores"
   - Select the datastore
   - Set grounding configuration to **Very Low** to prevent hallucinations
   - Click **confirm** then **save**

   ![Attach Datastore](images/attach-datastore.png " ")

## Task 6: Configure Agent to Use Datastore

1. Update Playbook instructions:
   - Navigate to Agent Basics page
   - At the bottom of the playbook configuration, check the **Alternative Location** data store
   - Click **Save**

2. Add tool reference to instructions:
   - In the agent's instructions, add the line:
     ```
     - Use ${TOOL: Alternative Location} if the user's request contains a location that does not exist
     ```
   - Click **Save**

   ![Update Instructions](images/update-instructions.png " ")

## Task 7: Test Grounded Agent

1. Open the toggle simulator again

2. Ask the same question: "What's the best way to reach Wakanda?"

3. Observe the improved response:
   - The agent now recognizes Wakanda is fictional
   - Provides alternative real-world destinations with similar characteristics
   - References information from the datastore

   ![Grounded Response](images/grounded-response.png " ")

Congratulations! Your agent is now grounded with external data and can provide more helpful, context-aware responses.

## Task 8: Integrate with Oracle AI Database (Optional)

You can extend this agent to work with Oracle AI Database by:

1. Creating datastores that connect to Oracle database content
2. Using Vertex AI's function calling to query Oracle AI Vector Search
3. Implementing RAG pipelines that leverage Oracle's vector capabilities
4. Storing conversation history in Oracle database for agentic memory

These integrations are covered in other labs in this workshop.

## Learn More

* [Vertex AI Agent Builder Documentation](https://cloud.google.com/vertex-ai/docs/agent-builder)
* [Dialogflow CX Documentation](https://cloud.google.com/dialogflow/cx/docs)
* [Grounding with Vertex AI](https://cloud.google.com/vertex-ai/docs/generative-ai/grounding/overview)

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Contributors** - Based on [Building AI Agents with Vertex AI](https://codelabs.developers.google.com/devsite/codelabs/building-ai-agents-vertexai) by Thu Ya Kyaw and Abhishek Sharma
* **Last Updated By/Date** - Paul Parkinson, January 2026
