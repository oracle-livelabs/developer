# (Optional): Other topics (Access via ORDS/Rest/OpenAPI, Select AI/NL2SQL and ADB MCP, Multi-Agent Systems, Memory, ...)

## Introduction

Now that you've established the basics of building Agentic AI with Google Vertex AI (Gemini) and Oracle AI Database, you can further enhance your agentic solutions using advanced concepts and integration patterns. This lab provides an overview of additional topics and technologies that can extend the capabilities of your AI agents.

## Overview of Advanced Topics

### Access via ORDS/REST/OpenAPI

Oracle REST Data Services (ORDS) provides a robust way to expose your Oracle AI Database through RESTful APIs with OpenAPI specifications. This enables your agents to interact with the database through standardized REST endpoints.

**Key Benefits:**
- Standardized REST API access to database operations
- Automatic OpenAPI documentation generation
- Easy integration with various client applications and AI frameworks
- Secure, scalable API gateway functionality

**Learn More:**
- [Oracle REST Data Services (ORDS) Documentation](https://docs.oracle.com/en/database/oracle/oracle-rest-data-services/)
- [ORDS API Development](https://www.oracle.com/database/technologies/appdev/rest.html)

### Select AI / Natural Language to SQL (NL2SQL)

Select AI allows you to use natural language queries that are automatically translated into SQL, making it easier for AI agents to interact with structured data without requiring SQL expertise.

**Key Benefits:**
- Natural language interface to database queries
- Reduces complexity in agent implementations
- Enables non-technical users to query data
- Seamless integration with large language models

**Learn More:**
- [Select AI for Natural Language Queries](https://docs.oracle.com/en/database/oracle/oracle-database/23/arpls/dbms_cloud_ai.html)
- [Oracle Database 23ai Select AI](https://www.oracle.com/database/ai/)

### Multi-Agent Systems

Multi-agent architectures allow you to create specialized agents that collaborate to solve complex tasks, each handling specific aspects of a problem.

**Key Benefits:**
- Modular agent design with specialized capabilities
- Improved scalability and maintainability
- Task distribution and parallel processing
- Coordinated problem-solving

**Learn More:**
- [Vertex AI Agent Builder - Multi-Agent Patterns](https://cloud.google.com/vertex-ai/docs/generative-ai/agent-builder/overview)
- [LangGraph Multi-Agent Systems](https://langchain-ai.github.io/langgraph/)

### Memory and Context Management

Implementing memory systems allows your agents to maintain context across conversations and sessions, providing more personalized and coherent interactions.

**Key Benefits:**
- Persistent conversation history
- User preference tracking
- Contextual awareness across sessions
- Improved user experience and relevance

**Learn More:**
- [Oracle AI Vector Search for Semantic Memory](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/)
- [LangChain Memory](https://python.langchain.com/docs/modules/memory/)
- [Vertex AI Conversation History](https://cloud.google.com/vertex-ai/docs/generative-ai/conversation)

### Additional Integration Patterns

Other advanced topics to explore include:
- **Function Calling and Tool Use**: Extending agent capabilities with custom tools
- **Streaming Responses**: Real-time agent interactions
- **Monitoring and Observability**: Tracking agent performance and behavior
- **Security and Access Control**: Managing authentication and authorization
- **Cost Optimization**: Efficient use of AI services and database resources

## Next Steps

Explore these topics based on your specific use case requirements. Each technology can be integrated incrementally into your existing agentic AI solution to provide enhanced functionality and user experience.

## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, January 2026
