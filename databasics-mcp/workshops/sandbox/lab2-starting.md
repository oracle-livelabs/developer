# Lab 2: Starting and Managing SQLcl MCP Server

## Introduction

In this lab, you will learn how to start the SQLcl MCP Server and manage its lifecycle. You'll explore different startup options and monitoring capabilities.

## Objectives

- Start SQLcl MCP Server in various modes
- Configure server settings
- Monitor server status
- Stop and restart the server

## Task 1: Start MCP Server in Basic Mode

1. Open a terminal window.

2. Start the SQLcl MCP Server:

   ```
   <copy>sql --mcp-server</copy>
   ```

3. The server should start and display connection information:

   ```
   MCP Server started on port 3000
   Server is listening for connections...
   ```

4. Note the port number for client connections.

## Task 2: Start MCP Server with Custom Configuration

1. Create a configuration file `mcp-config.json`:

   ```
   <copy>
   {
     "port": 8080,
     "host": "localhost",
     "logLevel": "info",
     "database": {
       "url": "jdbc:oracle:thin:@//host:port/service",
       "user": "username",
       "password": "password"
     }
   }
   </copy>
   ```

2. Start the server with the configuration file:

   ```
   <copy>sql --mcp-server --config mcp-config.json</copy>
   ```

3. Verify the server is running on the specified port.

## Task 3: Monitor Server Status

1. In a new terminal, check if the server is running:

   **For Linux/macOS:**
   ```
   <copy>ps aux | grep sql</copy>
   ```

   **For Windows:**
   ```
   <copy>tasklist | findstr sql</copy>
   ```

2. Check server logs (if logging is enabled):

   ```
   <copy>tail -f mcp-server.log</copy>
   ```

3. Test server connectivity:

   ```
   <copy>curl http://localhost:8080/health</copy>
   ```

## Task 4: Stop the MCP Server

1. Find the process ID of the MCP server.

2. Stop the server gracefully:

   **For Linux/macOS:**
   ```
   <copy>kill -TERM <pid></copy>
   ```

   **For Windows:**
   ```
   ```
   <copy>taskkill /PID <pid> /T</copy>
   ```

3. Verify the server has stopped:

   ```
   <copy>curl http://localhost:8080/health</copy>
   ```

   You should receive a connection error.

## Task 5: Restart Server with Different Options

1. Start the server in background mode:

   ```
   <copy>sql --mcp-server --background</copy>
   ```

2. Verify it's running in the background.

3. Stop and restart with different configuration.

## Summary

You have learned how to start, monitor, and manage SQLcl MCP Server. In the next lab, you will explore the tools available through the MCP server.

## Learn More

- [SQLcl MCP Server Management](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/)
