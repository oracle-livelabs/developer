# (Optional) Access Oracle AI Database from Gemini CLI

## Introduction

Use Gemini CLI as a terminal-based client for Oracle AI Database. You will authenticate with Google Cloud, connect the Oracle SQLcl MCP server, discover its tools, and ask Gemini to inspect database-backed supply-chain data. This optional lab is useful before publishing the same capabilities to Gemini Enterprise.

Estimated Time: 20 minutes.

### Objectives

- Authenticate the local Gemini CLI with Application Default Credentials.
- Start the Oracle SQLcl MCP server against the workshop database.
- Register the MCP endpoint with Gemini CLI.
- Query Oracle AI Database with a read-only prompt and inspect the generated SQL.

### Prerequisites

- Completed Labs 1 and 2, including the database table-population task, unless your SQLcl client already has network access to the database's private endpoint.
- Oracle SQLcl 25.2 or later with the `-mcp` option.
- Gemini CLI installed and available as `gemini`.
- A downloaded Autonomous Database wallet and a database user with read-only access to the workshop views.

## Task 1: Authenticate and configure the database

1. Set the Google Cloud project and authenticate:

    ```bash
    gcloud config set project YOUR_GCP_PROJECT
    gcloud auth application-default login
    ```

2. Export the Oracle connection variables. Keep passwords in your shell or ignored `.env` file; never commit them:

    ```bash
    export TNS_ADMIN="$PWD/Wallet_YOUR_DATABASE"
    export DB_DSN="YOUR_DATABASE_HIGH"
    export DB_USERNAME="YOUR_READ_ONLY_USER"
    export DB_PASSWORD="YOUR_PASSWORD"
    ```

3. Verify SQLcl can connect before involving Gemini:

    ```bash
    sql -L "$DB_USERNAME/$DB_PASSWORD@$DB_DSN" <<'SQL'
    select sys_context('USERENV', 'DB_NAME') as database_name from dual;
    select count(*) as risk_rows from sc_inventory_risk_demo_v;
    exit
    SQL
    ```

## Task 2: Start and inspect SQLcl MCP

1. Start SQLcl in MCP mode. Use the wallet directory from Task 1:

    ```bash
    sql -mcp -L "$DB_USERNAME/$DB_PASSWORD@$DB_DSN"
    ```

2. In another terminal, start Gemini CLI and add the local MCP server according to the installed CLI version. The server must expose only the SQL operations needed by this workshop.

3. Ask Gemini to list available database tools. Confirm that the response includes tool names and descriptions, not database passwords or wallet paths.

## Task 3: Query the database from Gemini CLI

Use a self-contained prompt:

```text
Using only the Oracle inventory risk views, list the products with the highest stockout probability for the next quarter. Include product, region, probability, and projected revenue impact. Explain which database query was used.
```

Run a second read-only query:

```text
For SKU-500, identify the warehouse with the lowest coverage days and show the hotspot score and revenue impact. Do not change data.
```

### Expected result

Gemini calls the SQLcl MCP tool, returns database-backed values, and does not invent a write operation. If the tool is unavailable, check that SQLcl is still running and that `TNS_ADMIN` points to the wallet directory.

## Task 4: Apply the safety boundary

1. Ask Gemini to insert a row. Confirm that no write-capable tool is exposed in this optional lab.
2. Stop SQLcl MCP with `Ctrl-C`.
3. Remove the exported password from the shell when finished:

    ```bash
    unset DB_PASSWORD
    ```

## Conclusion

Gemini CLI provides a fast local validation path for the same Oracle MCP capabilities later consumed by Gemini Enterprise. Keep the CLI path read-only and move approvals and writes into the governed service described in Labs 5 and 6.

## Acknowledgements

*All Done! You may proceed to the next lab.*

- **Authors/Contributors** - Paul Parkinson, Architect and Dev Advocate, Oracle AI Database
- **Last Updated By/Date** - Paul Parkinson, October 2026
