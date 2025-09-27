# Lab 5: Hands-on with SQLcl MCP Server

## Introduction

In this comprehensive hands-on lab, you will apply everything you've learned to complete a real-world database development scenario using SQLcl MCP Server.

## Objectives

- Set up a complete MCP server environment
- Perform database operations through MCP tools
- Build a simple application workflow
- Troubleshoot and optimize queries
- Demonstrate MCP server capabilities

## Scenario

You are tasked with creating a simple employee management system. You'll use MCP server tools to:

1. Explore the database schema
2. Create and populate tables
3. Build queries and reports
4. Implement business logic

## Task 1: Environment Setup and Schema Exploration

1. Start the MCP server with your database configuration.

2. Use the schema exploration tools to understand the available tables:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 1,
       "method": "resources/list",
       "params": {}
     }'
   </copy>
   ```

3. Examine the HR schema tables (if available) or create your own.

## Task 2: Create Database Objects

1. Create an employees table:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 2,
       "method": "tools/call",
       "params": {
         "name": "execute_ddl",
         "arguments": {
           "statement": "CREATE TABLE my_employees (id NUMBER PRIMARY KEY, first_name VARCHAR2(50), last_name VARCHAR2(50), department VARCHAR2(50), salary NUMBER)"
         }
       }
     }'
   </copy>
   ```

2. Create a departments table:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 3,
       "method": "tools/call",
       "params": {
         "name": "execute_ddl",
         "arguments": {
           "statement": "CREATE TABLE my_departments (id NUMBER PRIMARY KEY, name VARCHAR2(100), location VARCHAR2(100))"
         }
       }
     }'
   </copy>
   ```

## Task 3: Populate Data

1. Insert department data:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 4,
       "method": "tools/call",
       "params": {
         "name": "execute_dml",
         "arguments": {
           "statement": "INSERT ALL INTO my_departments VALUES (1, '\''Engineering'\'', '\''Building A'\'') INTO my_departments VALUES (2, '\''Sales'\'', '\''Building B'\'') INTO my_departments VALUES (3, '\''HR'\'', '\''Building C'\'') SELECT * FROM dual"
         }
       }
     }'
   </copy>
   ```

2. Insert employee data:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 5,
       "method": "tools/call",
       "params": {
         "name": "execute_dml",
         "arguments": {
           "statement": "INSERT ALL INTO my_employees VALUES (1, '\''John'\'', '\''Doe'\'', '\''Engineering'\'', 75000) INTO my_employees VALUES (2, '\''Jane'\'', '\''Smith'\'', '\''Sales'\'', 65000) INTO my_employees VALUES (3, '\''Bob'\'', '\''Johnson'\'', '\''Engineering'\'', 80000) SELECT * FROM dual"
         }
       }
     }'
   </copy>
   ```

## Task 4: Query and Analyze Data

1. Retrieve all employees:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 6,
       "method": "tools/call",
       "params": {
         "name": "execute_query",
         "arguments": {
           "query": "SELECT * FROM my_employees ORDER BY salary DESC"
         }
       }
     }'
   </copy>
   ```

2. Generate a department report:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 7,
       "method": "tools/call",
       "params": {
         "name": "execute_query",
         "arguments": {
           "query": "SELECT d.name as department, COUNT(e.id) as employee_count, AVG(e.salary) as avg_salary FROM my_departments d LEFT JOIN my_employees e ON d.name = e.department GROUP BY d.name"
         }
       }
     }'
   </copy>
   ```

3. Use the explain plan tool to analyze query performance:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 8,
       "method": "tools/call",
       "params": {
         "name": "explain_plan",
         "arguments": {
           "query": "SELECT * FROM my_employees WHERE salary > 70000"
         }
       }
     }'
   </copy>
   ```

## Task 5: Format and Validate SQL

1. Format a complex query:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 9,
       "method": "tools/call",
       "params": {
         "name": "format_sql",
         "arguments": {
           "sql": "select e.first_name,e.last_name,d.name as dept_name,e.salary from my_employees e join my_departments d on e.department=d.name where e.salary>(select avg(salary) from my_employees) order by e.salary desc"
         }
       }
     }'
   </copy>
   ```

2. Validate SQL syntax:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 10,
       "method": "tools/call",
       "params": {
         "name": "validate_sql",
         "arguments": {
           "sql": "SELECT first_name, last_name FROM my_employees WHERE department = '\''Engineering'\''"
         }
       }
     }'
   </copy>
   ```

## Task 6: Advanced Operations

1. Create an index for performance:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 11,
       "method": "tools/call",
       "params": {
         "name": "execute_ddl",
         "arguments": {
           "statement": "CREATE INDEX idx_emp_salary ON my_employees(salary)"
         }
       }
     }'
   </copy>
   ```

2. Update employee data:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 12,
       "method": "tools/call",
       "params": {
         "name": "execute_dml",
         "arguments": {
           "statement": "UPDATE my_employees SET salary = salary * 1.1 WHERE department = '\''Engineering'\''"
         }
       }
     }'
   </copy>
   ```

## Task 7: Monitoring and Cleanup

1. Check server status:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 13,
       "method": "server/status",
       "params": {}
     }'
   </copy>
   ```

2. Clean up created objects:

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 14,
       "method": "tools/call",
       "params": {
         "name": "execute_ddl",
         "arguments": {
           "statement": "DROP TABLE my_employees"
         }
       }
     }'
   </copy>
   ```

   ```
   <copy>
   curl -X POST http://localhost:8080/jsonrpc \
     -H "Content-Type: application/json" \
     -d '{
       "jsonrpc": "2.0",
       "id": 15,
       "method": "tools/call",
       "params": {
         "name": "execute_ddl",
         "arguments": {
           "statement": "DROP TABLE my_departments"
         }
       }
     }'
   </copy>
   ```

## Summary

Congratulations! You have successfully completed a comprehensive hands-on exercise using SQLcl MCP Server. You have demonstrated the ability to:

- Set up and manage MCP server
- Create database objects
- Perform CRUD operations
- Execute complex queries
- Use development tools for formatting and validation
- Monitor server performance

This completes the Database Basics with SQLcl MCP Server Workshop.

## Learn More

- [SQLcl Documentation](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/)
- [Oracle Database Developer Guide](https://docs.oracle.com/en/database/oracle/oracle-database/)
- [MCP Protocol](https://modelcontextprotocol.io/)
