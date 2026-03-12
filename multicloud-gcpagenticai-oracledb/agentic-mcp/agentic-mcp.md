# Develop Vertex AI Agents with ADK MCP Toolbox for Databases and Oracle AI Database

## Introduction

This lab demonstrates building AI agents using Google's Agent Development Kit (ADK) integrated with MCP Toolbox for Databases to access Oracle AI Database. You'll learn how to leverage the Model Context Protocol (MCP) standard for database operations while maintaining the powerful multi-step reasoning capabilities of ADK agents.

MCP Toolbox for Databases is Google's official open-source MCP server that simplifies database tool development with production-ready features like connection pooling, authentication, observability, and support for 30+ database systems including Oracle.

Estimated Time: 45 minutes

### Objectives

* Understand MCP Toolbox architecture and benefits
* Configure Oracle Database as an MCP data source
* Create database tools for RAG search and SQL operations
* Build an ADK agent that uses MCP Toolbox tools
* Compare MCP Toolbox with custom tool implementations

### Prerequisites

* Oracle Autonomous Database with wallet configured
* GCP project with Vertex AI enabled
* Python 3.10+ development environment
* Node.js 20+ (for MCP Toolbox server) OR Docker
* Completed previous labs (Oracle AI Vector Search setup)

## Task 1: Understanding MCP Toolbox for Databases

### What is MCP Toolbox?

MCP Toolbox for Databases is an open-source implementation of the Model Context Protocol specifically designed for database operations. It acts as a middleware layer between your AI agents and databases, providing:

**Key Benefits:**
- **Simplified Development**: Integrate database tools in less than 10 lines of code
- **Better Performance**: Built-in connection pooling and optimized query execution
- **Enhanced Security**: Integrated authentication and credential management
- **End-to-End Observability**: OpenTelemetry support for metrics and tracing
- **Tool Reusability**: Share tools between multiple agents and frameworks
- **Multi-Database Support**: Works with 30+ databases including Oracle, PostgreSQL, MySQL, MongoDB, BigQuery, Spanner, and more

### Architecture

```
<copy>
User Input
    ↓
ADK Agent (Python)
    ↓
ToolboxClient (Python SDK)
    ↓
MCP Toolbox Server (Node.js or Binary)
    ↓
Database Connection Pool
    ↓
Oracle AI Database (Vector Search + SQL)
</copy>
```

The MCP Toolbox server runs as a separate process that:
1. Reads tool configurations from `tools.yaml`
2. Manages database connection pools
3. Exposes tools via HTTP API
4. Handles authentication and observability

Your ADK agent connects to the server using `ToolboxClient` and loads tools dynamically.

### Platform Support

**MCP Toolbox Server is available for:**

| Platform | Binary | NPM Package | Docker | Status |
|----------|--------|-------------|--------|--------|
| Linux AMD64 | ✅ Yes | ✅ Yes | ✅ Yes | Fully Supported |
| Linux ARM64 | ❌ No | ❌ No | ⚠️ Limited | Not Officially Supported |
| macOS Intel | ✅ Yes | ✅ Yes | ✅ Yes | Fully Supported |
| macOS Apple Silicon | ✅ Yes | ✅ Yes | ✅ Yes | Fully Supported |
| Windows AMD64 | ✅ Yes | ✅ Yes | ⚠️ Limited | Fully Supported |

**Installation Methods:**

1. **Binary Download** (Linux AMD64, macOS, Windows):
   ```
   bash
   <copy>
   VERSION=0.24.0
   OS="linux/amd64"  # or darwin/arm64, darwin/amd64, windows/amd64
   curl -O https://storage.googleapis.com/genai-toolbox/v$VERSION/$OS/toolbox
   chmod +x toolbox
   ./toolbox --tools-file tools.yaml
   </copy>
   ```

2. **NPM Package** (recommended, requires Node.js 20+):
   ```
   bash
   <copy>
   npx @toolbox-sdk/server --tools-file tools.yaml
   </copy>
   ```

3. **Docker** (cross-platform, but may have networking complexities):
   ```
   bash
   <copy>
   docker run -p 5000:5000 -v $(pwd)/tools.yaml:/app/tools.yaml \
     ghcr.io/googleapis/genai-toolbox --tools-file /app/tools.yaml
   </copy>
   ```

**Note**: ARM64 Linux systems (e.g., NVIDIA Jetson, AWS Graviton) are not officially supported. For these platforms, consider:
- Running MCP Toolbox on a separate AMD64 machine
- Using Cloud Run or other managed services (AMD64)
- Implementing custom tools directly in your agent code

### Comparison with Custom Tools

| Feature | MCP Toolbox | Custom BaseTool |
|---------|-------------|-----------------|
| Setup Complexity | Medium (server + config) | Low (Python only) |
| Connection Pooling | ✅ Built-in | ❌ Manual |
| Observability | ✅ OpenTelemetry | ❌ Manual |
| Multi-Database | ✅ 30+ databases | ❌ One at a time |
| Tool Hot-Reload | ✅ Dynamic | ❌ Requires restart |
| Production-Ready | ✅ Yes | ⚠️ Depends |
| ARM64 Support | ❌ Limited | ✅ Yes |
| Deployment | Separate process | Same process |

**When to use MCP Toolbox:**
- Production deployments requiring observability
- Multiple databases or services
- Team collaboration with shared tools
- Need for connection pooling and security
- Running on AMD64 infrastructure

**When to use Custom Tools:**
- Simple prototypes or demos
- Single database RAG applications
- ARM64 platforms
- Learning ADK fundamentals
- Minimal external dependencies

## Task 2: MCP Toolbox Implementation Overview

This lab provides a complete implementation that includes:

### Created Files

1. **oracle_ai_database_adk_mcp_agent.py** (5.3 KB)
   - ADK Agent using ToolboxClient
   - Connects to MCP Toolbox server
   - Loads `oracle-rag-toolset` with 5 database tools
   - Interactive CLI with Gemini 2.0 Flash
   - Async/await architecture
   - Error handling and cleanup

2. **tools.yaml** (2.9 KB)
   - Oracle database source configuration
   - TNS alias connection with wallet support
   - 5 tool definitions:
     * `search-rag-documents`: Vector similarity search
     * `get-rag-stats`: Knowledge base statistics
     * `execute-sql`: Custom SQL execution
     * `get-table-schema`: Table structure inspection
     * `list-tables`: Schema exploration
   - `oracle-rag-toolset` definition

3. **run_oracle_ai_database_adk_mcp_agent.sh** (3.8 KB)
   - Auto-downloads Toolbox binary (AMD64/macOS)
   - Or uses npx if Node.js available
   - Starts Toolbox server in background
   - Manages Python dependencies
   - Launches ADK agent
   - Cleanup on exit

4. **run_oracle_ai_database_adk_mcp_agent_docker.sh** (Alternative)
   - Docker-based deployment
   - For environments with Docker but incompatible architectures
   - Manages container lifecycle

5. **MCP_TOOLBOX_README.md** (6.3 KB)
   - Complete setup instructions
   - Architecture documentation
   - Troubleshooting guide
   - Tool reference
   - Platform compatibility notes

### Implementation Highlights

**tools.yaml Oracle Source Configuration:**
```yaml
<copy>
sources:
  oracle-ai-db:
    kind: oracle
    tnsAlias: ${DB_DSN}           # From tnsnames.ora
    tnsAdmin: ${DB_WALLET_DIR}    # Wallet directory
    user: ${DB_USERNAME}
    password: ${DB_PASSWORD}
    useOCI: true                  # Required for wallet support
</copy>
```

**Python Agent with ToolboxClient:**
```python
<copy>
from toolbox_core import ToolboxClient
from google.adk import Agent

# Connect to MCP Toolbox
client = ToolboxClient("http://127.0.0.1:5000")

# Load tools from server
tools = await client.load_toolset("oracle-rag-toolset")

# Create ADK agent
agent = Agent(
    name='oracle_ai_agent',
    model='gemini-2.0-flash-001',
    instruction="You are an Oracle Database expert...",
    tools=tools
)
</copy>
```

**Key Advantages Over Oracle SQLcl MCP:**
- ✅ Google's official, stable implementation
- ✅ Production-ready with OpenTelemetry
- ✅ No SQLcl server setup or compilation
- ✅ Better error handling and debugging
- ✅ Multi-database support (extensible)
- ✅ Active maintenance and updates

## Task 3: Platform-Specific Setup

### For AMD64 Linux or macOS

1. Navigate to the project directory:
  ```bash
  <copy>
  cd interactive-ai-holograms/oracle-ai-database-gcp-vertex-ai
  </copy>
  ```

2. Ensure `.env` file has Oracle credentials:
  ```bash
  <copy>
  DB_USERNAME=ADMIN
  DB_PASSWORD=your_password
  DB_DSN=your_db_high
  DB_WALLET_DIR=/path/to/Wallet_YourDB
  GCP_PROJECT_ID=your-project
  GCP_REGION=us-central1
  </copy>
  ```

3. Run the agent:
  ```bash
  <copy>
  ./run_oracle_ai_database_adk_mcp_agent.sh
  </copy>
  ```

The script will:
- Download Toolbox binary or use npx
- Start the Toolbox server
- Install Python dependencies
- Launch the ADK agent

### For ARM64 Linux or Unsupported Platforms

Option 1: Use the non-MCP ADK agent (recommended):
```bash
<copy>
./run_oracle_ai_database_adk_agent.sh
</copy>
```

Option 2: Deploy MCP Toolbox to Cloud Run (AMD64):

```bash
<copy>
# Deploy to Cloud Run
gcloud run deploy mcp-toolbox \
  --source . \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

# Update agent to use Cloud Run URL
export TOOLBOX_URL="https://mcp-toolbox-xxx.run.app"
</copy>
```

### Testing the Agent

Once running, you'll see:
```
<copy>
🤖 Oracle AI Database Agent - MCP Toolbox Edition
======================================================================

Ask questions about Oracle Database features, or query the database.
Type 'quit' or 'exit' to stop.

💬 You: What is JSON Relational Duality?

🤔 Agent: Let me search the knowledge base...
[Agent uses search-rag-documents tool via MCP Toolbox]

JSON Relational Duality is a feature in Oracle Database 23ai that provides
a unified view of data as both relational tables and JSON documents...
</copy>
```
## Task 4: Tool Configuration Deep Dive

### Vector Search Tool

The most important tool for RAG applications:

</copy>
```
yaml
<copy>
tools:
  search-rag-documents:
    kind: oracle-sql
    source: oracle-ai-db
    description: >-
      Search the RAG knowledge base using semantic similarity.
      Returns relevant document chunks with their metadata.
    parameters:
      - name: query_text
        type: string
        description: The search query or question.
      - name: top_k
        type: integer
        description: Number of results (default: 5).
    statement: |
      SELECT 
        id, text, link,
        VECTOR_DISTANCE(embedding, 
          (SELECT VECTOR_EMBEDDING(all_minilm_l12_v2 USING :query_text as data)), 
          COSINE) as distance
      FROM rag_tab
      WHERE embedding IS NOT NULL
      ORDER BY distance
      FETCH FIRST :top_k ROWS ONLY
</copy>
```
<copy>

This tool:
- Uses Oracle's built-in `VECTOR_EMBEDDING()` function
- Performs cosine similarity search
- Returns top-k most relevant documents
- Includes distance scores for relevance ranking

### Dynamic SQL Tool

For advanced queries and schema inspection:

</copy>
```
yaml
<copy>
tools:
  execute-sql:
    kind: oracle-execute-sql
    source: oracle-ai-db
    description: Execute any SQL query on the Oracle database.
    parameters:
      - name: sql_query
        type: string
        description: The SQL query to execute.
</copy>
```
<copy>

**Security Note**: Use with caution in production. Consider:
- Limiting to read-only operations
- Implementing query validation
- Using authorized parameters feature
- Restricting to specific schemas

## Task 5: Comparing Implementations


## Task 5: Comparing Implementations

The repository includes three different agent implementations for comparison:

### 1. oracle_ai_database_adk_mcp_agent.py (MCP Toolbox)

**Architecture**: ADK Agent → ToolboxClient → MCP Toolbox Server → Oracle DB

**Pros:**
- Production-ready with connection pooling
- OpenTelemetry observability built-in
- Tool hot-reloading without agent restart
- Supports 30+ database types
- Centralized tool management
- Better security with credential isolation

**Cons:**
- Requires separate server process
- More complex setup
- Limited ARM64 support
- Network overhead for tool calls

**Best For:**
- Production deployments
- Multi-database applications
- Team environments with shared tools
- Cloud Run / Container deployments
- AMD64 infrastructure

### 2. oracle_ai_database_adk_agent.py (Custom BaseTool)

**Architecture**: ADK Agent → Custom OracleRAGTool → Oracle Vector Store → Oracle DB

**Pros:**
- Simpler architecture (single process)
- Works on all platforms including ARM64
- No external dependencies
- Direct database access (lower latency)
- Easier debugging
- Complete control over tool behavior

**Cons:**
- Manual connection management
- No built-in observability
- Single-purpose (Oracle only)
- Requires code changes for new tools
- Less suitable for large teams

**Best For:**
- Prototyping and development
- ARM64 platforms (NVIDIA Jetson, Graviton)
- Simple RAG applications
- Learning ADK concepts
- Single developer projects

### 3. oracle_ai_database_langchain_streamlit.py (LangChain UI)

**Architecture**: Streamlit UI → LangChain → Oracle Vector Store → Oracle DB

**Pros:**
- User-friendly web interface
- Document upload and processing
- Visual feedback on search results
- LangChain ecosystem integration
- Good for demos and testing

**Cons:**
- Not an agent (single-step queries)
- No multi-step reasoning
- Limited tool support
- UI-focused, not API-friendly

**Best For:**
- Demonstrations and presentations
- End-user document management
- RAG system testing
- Non-technical users

### Performance Comparison

| Metric | MCP Toolbox | Custom Tool | LangChain UI |
|--------|-------------|-------------|--------------|
| Setup Time | 15-30 min | 5-10 min | 5-10 min |
| Query Latency | ~150-300ms | ~100-200ms | ~100-200ms |
| Scalability | High | Medium | Low |
| Maintainability | High | Medium | Medium |
| Observability | Excellent | Manual | Manual |
| Platform Support | AMD64 only | All platforms | All platforms |

## Task 6: Deployment Considerations

### Local Development

For local testing and development:
</copy>
```
bash
<copy>
# MCP Toolbox (AMD64/macOS)
./run_oracle_ai_database_adk_mcp_agent.sh

# Custom Tool (all platforms)
./run_oracle_ai_database_adk_agent.sh

# Streamlit UI
./run_oracle_ai_database_langchain_streamlit.sh
</copy>
```
<copy>

### Cloud Run Deployment (MCP Toolbox)

Create a Dockerfile:
</copy>
```
dockerfile
<copy>
FROM node:20-slim

WORKDIR /app

# Install Toolbox server
RUN npm install -g @toolbox-sdk/server

# Copy configuration
COPY tools.yaml .

# Expose port
EXPOSE 5000

# Run Toolbox
CMD ["npx", "@toolbox-sdk/server", "--tools-file", "tools.yaml"]
</copy>
```
<copy>

Deploy to Cloud Run:
</copy>
```
bash
<copy>
gcloud run deploy mcp-toolbox \
  --source . \
  --platform managed \
  --region us-central1 \
  --set-env-vars DB_USERNAME=${DB_USERNAME} \
  --set-env-vars DB_PASSWORD=${DB_PASSWORD} \
  --set-env-vars DB_DSN=${DB_DSN} \
  --allow-unauthenticated
</copy>
```
<copy>

### Security Best Practices

1. **Credential Management:**
   - Use Secret Manager for database passwords
   - Never commit credentials to git
   - Use environment variable substitution in tools.yaml
   - Rotate credentials regularly

2. **Network Security:**
   - Use VPC connectors for database access
   - Implement authentication on Toolbox server
   - Use TLS for all connections
   - Restrict IP ranges

3. **Tool Permissions:**
   - Grant minimum required database privileges
   - Use read-only accounts for query tools
   - Implement query validation for execute-sql
   - Audit tool usage with OpenTelemetry

### Monitoring and Observability

MCP Toolbox provides built-in observability:

</copy>
```
yaml
<copy>
# Add to tools.yaml for OpenTelemetry
observability:
  enabled: true
  exporters:
    - type: otlp
      endpoint: "https://your-otel-collector:4317"
</copy>
```
<copy>

Metrics available:
- Tool invocation counts
- Query execution times
- Connection pool statistics
- Error rates and types
- Database response times

## Task 7: Troubleshooting

### Common Issues

**Issue**: "cannot execute binary file: Exec format error"
</copy>
```
<copy>
Cause: Wrong architecture binary downloaded
Solution: Check architecture with `uname -m`
- aarch64/arm64: Use custom tool implementation
- x86_64/amd64: MCP Toolbox binary works
</copy>
```
<copy>

**Issue**: "Unsupported platform: linux-arm64"
</copy>
```
<copy>
Cause: NPM package doesn't support ARM64
Solution: Use alternative:
1. ./run_oracle_ai_database_adk_agent.sh (custom tool)
2. Deploy MCP Toolbox to Cloud Run (AMD64)
3. Run Toolbox on separate AMD64 machine
</copy>
```
<copy>

**Issue**: Toolbox server won't start
</copy>
```
<copy>
Check logs: tail -f toolbox.log

Common causes:
- Invalid Oracle credentials in .env
- Wallet directory not found
- Port 5000 already in use
- Missing Oracle Instant Client (useOCI: true)
</copy>
```
<copy>

**Issue**: Connection pool exhausted
</copy>
```
<copy>
Solution: Adjust tools.yaml connection settings:
sources:
  oracle-ai-db:
    kind: oracle
    maxConnections: 20  # Increase pool size
    connectionTimeout: 30000  # 30 seconds
</copy>
```
<copy>

**Issue**: Vector search returns no results
</copy>
```
<copy>
Verify embeddings exist:
SELECT COUNT(*) FROM rag_tab WHERE embedding IS NOT NULL;

Verify index:
SELECT * FROM USER_INDEXES WHERE TABLE_NAME = 'RAG_TAB';
</copy>
```
<copy>

### Debug Mode

Enable verbose logging:
</copy>
```
bash
<copy>
# Toolbox server
./toolbox --tools-file tools.yaml --log-level debug

# Python agent
export PYTHONVERBOSE=1
python oracle_ai_database_adk_mcp_agent.py
</copy>
```

## Summary

In this lab, you:
- ✅ Learned about MCP Toolbox architecture and benefits
- ✅ Configured Oracle Database as an MCP source
- ✅ Created database tools for RAG and SQL operations
- ✅ Built an ADK agent using ToolboxClient
- ✅ Compared MCP Toolbox with custom tool implementations
- ✅ Understood platform limitations and workarounds
- ✅ Explored deployment options for production

### Key Takeaways

1. **MCP Toolbox** is production-ready but requires AMD64 platform
2. **Custom Tools** offer simpler setup and broader platform support
3. **Platform matters**: ARM64 systems need custom tool approach
4. **Trade-offs exist**: Choose based on your requirements
5. **Both approaches work**: MCP adds observability, custom tools add simplicity

### Next Steps

- Implement additional tools (schema discovery, data analysis)
- Deploy MCP Toolbox to Cloud Run for production
- Add authentication and authorization
- Integrate with OpenTelemetry for monitoring
- Explore other MCP Toolbox features (prompts, multi-database)
- Try MCP Toolbox with other databases (PostgreSQL, BigQuery, etc.)

## Learn More

* [MCP Toolbox Documentation](https://googleapis.github.io/genai-toolbox/)
* [MCP Toolbox Oracle Source](https://googleapis.github.io/genai-toolbox/resources/sources/oracle/)
* [MCP Toolbox Python SDK](https://github.com/googleapis/mcp-toolbox-sdk-python)
* [Model Context Protocol Specification](https://modelcontextprotocol.io/)
* [Google ADK Documentation](https://google.github.io/adk-docs/)
* [Oracle AI Vector Search Documentation](https://docs.oracle.com/en/database/oracle/oracle-database/23/vecse/)
* [MCP Toolbox GitHub Repository](https://github.com/googleapis/genai-toolbox)


## Acknowledgements

* **Author** - Paul Parkinson, Architect and Developer Advocate
* **Last Updated By/Date** - Paul Parkinson, January 2026
