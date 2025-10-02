# Lab 4: How SQLcl MCP Server Works

## Introduction

In this lab, you will explore the internal workings of SQLcl MCP Server, including its architecture, communication protocols, and integration with MCP clients.

## Objectives

- Understand MCP server architecture
- Learn about communication protocols
- Explore server-client interactions
- Analyze request/response flows

## Task 1: Understanding MCP Architecture

1. Review the basic architecture of MCP servers:

   - **MCP Server**: The SQLcl component that exposes database functionality
   - **MCP Client**: Applications that connect to the server (IDEs, AI assistants, etc.)
   - **Protocol**: JSON-RPC 2.0 based communication
   - **Tools**: Database operations exposed as callable tools
   - **Resources**: Database objects and data accessible via URIs

2. Examine the server startup process:

   ```
   <copy>sql --mcp-server --verbose</copy>
   ```

   Observe the initialization messages.

## Task 2: Communication Protocol Analysis

1. Start the MCP server with logging enabled.

2. Send a simple request and observe the protocol:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 1,
       "method": "tools/list",
       "params": {}
     }'
   </copy>
   ```

3. Analyze the JSON-RPC response structure.

4. Try an invalid request to see error handling:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 2,
       "method": "invalid_method",
       "params": {}
     }'
   </copy>
   ```

## Task 3: Tool Registration and Discovery

1. Examine how tools are registered in the server:

   - Database query tools
   - Schema introspection tools
   - DDL execution tools
   - Development assistance tools

2. Use the tools/list method to see all available tools:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 3,
       "method": "tools/list",
       "params": {}
     }' | jq .
   </copy>
   ```

3. Get detailed information about a specific tool:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 4,
       "method": "tools/describe",
       "params": {
         "name": "execute_query"
       }
     }'
   </copy>
   ```

## Task 4: Resource Management

1. Explore how database resources are exposed:

   - Tables as resources
   - Views as resources
   - Procedures and functions

2. List available resources:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 5,
       "method": "resources/list",
       "params": {}
     }'
   </copy>
   ```

3. Access a specific resource:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 6,
       "method": "resources/read",
       "params": {
         "uri": "oracle:table:employees"
       }
     }'
   </copy>
   ```

## Task 5: Session and Connection Management

1. Understand how database connections are managed:

   - Connection pooling
   - Session handling
   - Transaction management

2. Monitor active connections:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 7,
       "method": "server/status",
       "params": {}
     }'
   </copy>
   ```

3. Test connection failover scenarios.

## Task 6: Security and Authentication

1. Explore authentication mechanisms:

   - Database credentials
   - Token-based authentication
   - SSL/TLS configuration

2. Test with different authentication methods.

## Summary

You have gained insight into how SQLcl MCP Server operates internally. In the final lab, you will apply your knowledge in hands-on exercises.

## Learn More

- [MCP Protocol Specification](https://modelcontextprotocol.io/specification)
- [SQLcl MCP Server Internals](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/)
