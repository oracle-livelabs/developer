# Lab 1: Preparing Your Environment

## Introduction

In this lab, you will prepare your environment to run SQLcl MCP Server. This includes verifying SQLcl installation, configuring necessary settings, and ensuring connectivity to your Oracle database.

## Objectives

- Verify SQLcl installation and version
- Configure environment variables
- Test database connectivity
- Install any required dependencies

## Task 1: Verify SQLcl Installation

1. Open a terminal window.

2. Check if SQLcl is installed by running:

   ```
   <copy>sql --version</copy>
   ```

   You should see output similar to:

   ```
   SQLcl: Release 25.2.0 Production
   ```

3. If SQLcl is not installed, download it from the Oracle website and follow the installation instructions.

## Task 2: Configure Environment Variables

1. Set the SQLCL_HOME environment variable:

   **For Linux/macOS:**
   ```
   <copy>export SQLCL_HOME=/path/to/sqlcl</copy>
   ```

   **For Windows:**
   ```
   <copy>set SQLCL_HOME=C:\path\to\sqlcl</copy>
   ```

2. Add SQLcl to your PATH:

   **For Linux/macOS:**
   ```
   <copy>export PATH=$PATH:$SQLCL_HOME/bin</copy>
   ```

   **For Windows:**
   ```
   <copy>set PATH=%PATH%;%SQLCL_HOME%\bin</copy>
   ```

## Task 3: Test Database Connectivity

1. Test connection to your Oracle database:

   ```
   <copy>sql username/password@//host:port/service</copy>
   ```

   Replace with your actual database credentials.

2. If successful, you should see the SQLcl prompt:

   ```
   SQL>
   ```

3. Exit SQLcl:

   ```
   <copy>exit</copy>
   ```

## Task 4: Verify MCP Server Support

1. Check if MCP server is available in your SQLcl version:

   ```
   <copy>sql --help | grep -i mcp</copy>
   ```

2. If MCP support is not available, you may need to upgrade SQLcl to a version that supports MCP servers.

## Summary

You have successfully prepared your environment for SQLcl MCP Server. In the next lab, you will learn how to start and manage the MCP server.

## Learn More

- [SQLcl Documentation](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/)
- [Oracle Database Documentation](https://docs.oracle.com/en/database/)
