# Lab 3: Using SQLcl MCP Server Tools

## Introduction

In this lab, you will explore the various tools available through the SQLcl MCP Server. These tools enable enhanced database interactions, query building, and development workflows.

## Objectives

- Connect to MCP server using a client
- Use database query tools
- Explore schema management tools
- Utilize development assistance features

## Task 1: Connect to MCP Server

1. Ensure the MCP server is running (from Lab 2).

2. Use a MCP-compatible client to connect. For example, using curl for testing:

   ```
   <copy>curl -X POST http://localhost:8080/tools/list</copy>
   ```

3. You should receive a list of available tools.

## Task 2: Execute SQL Queries

1. Use the query execution tool:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/execute \
     -H "Content-Type: application/json" \
     -d '{
       "tool": "execute_query",
       "parameters": {
         "query": "SELECT * FROM employees WHERE rownum <= 5"
       }
     }'
   </copy>
   ```

2. Review the query results.

3. Try a more complex query:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/execute \
     -H "Content-Type: application/json" \
     -d '{
       "tool": "execute_query",
       "parameters": {
         "query": "SELECT department_name, COUNT(*) as emp_count FROM employees e JOIN departments d ON e.department_id = d.department_id GROUP BY department_name"
       }
     }'
   </copy>
   ```

## Task 3: Schema Exploration Tools

1. List available tables:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/list_tables \
     -H "Content-Type: application/json" \
     -d '{}'
   </copy>
   ```

2. Get table structure:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/describe_table \
     -H "Content-Type: application/json" \
     -d '{
       "table": "employees"
     }'
   </copy>
   ```

3. Explore indexes and constraints:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/list_indexes \
     -H "Content-Type: application/json" \
     -d '{
       "table": "employees"
     }'
   </copy>
   ```

## Task 4: Data Manipulation Tools

1. Insert data using the MCP tool:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/execute_dml \
     -H "Content-Type: application/json" \
     -d '{
       "statement": "INSERT INTO test_table (id, name) VALUES (1, '\''Test User'\'')"
     }'
   </copy>
   ```

2. Update data:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/execute_dml \
     -H "Content-Type: application/json" \
     -d '{
       "statement": "UPDATE test_table SET name = '\''Updated User'\'' WHERE id = 1"
     }'
   </copy>
   ```

3. Delete data:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/execute_dml \
     -H "Content-Type: application/json" \
     -d '{
       "statement": "DELETE FROM test_table WHERE id = 1"
     }'
   </copy>
   ```

## Task 5: Development Assistance Tools

1. Use the SQL formatter tool:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/format_sql \
     -H "Content-Type: application/json" \
     -d '{
       "sql": "select e.employee_id,e.first_name,e.last_name,d.department_name from employees e join departments d on e.department_id=d.department_id where e.salary>5000 order by e.salary desc"
     }'
   </copy>
   ```

2. Get query execution plan:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/explain_plan \
     -H "Content-Type: application/json" \
     -d '{
       "query": "SELECT * FROM employees WHERE salary > 5000"
     }'
   </copy>
   ```

3. Validate SQL syntax:

   ```
   <copy>
   curl -X POST http://localhost:8080/tools/validate_sql \
     -H "Content-Type: application/json" \
     -d '{
       "sql": "SELECT * FROM employees"
     }'
   </copy>
   ```

## Summary

You have explored various tools available through the SQLcl MCP Server. In the next lab, you will learn about how the MCP server works internally.

## Learn More

- [SQLcl MCP Server Tools Reference](https://docs.oracle.com/en/database/oracle/sql-developer-command-line/)
