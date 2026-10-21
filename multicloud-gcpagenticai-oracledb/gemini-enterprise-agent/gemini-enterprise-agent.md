# Setup and Use Oracle AI Database Agent for Gemini Enterprise Apps

## Introduction

This lab configures database-side Select AI and installs Oracle's managed Oracle AI Database Agent team used by Gemini Enterprise. The database agent provides governed SQL tools over the sample supply-chain and inventory data.

Follow the [Oracle Developers guide to unlocking data insights with the Oracle AI Database Agent in Gemini Enterprise](https://blogs.oracle.com/developers/unlocking-data-insights-with-the-oracle-ai-database-agent-in-gemini-enterprise-part-1) to complete the Gemini Enterprise registration and Oracle installer steps in this lab.

Estimated Time: 30 minutes (allow additional time for initial authorization).

### Objectives

As a database user, DBA, or application developer:

1. Configure one Select AI provider for the `FINANCIAL` schema.
2. Install and verify the managed `ORACLE_AI_DATABASE_AGENT` team.
3. Register and authorize the agent in Gemini Enterprise using the Oracle Developers guide.

### Prerequisites

- Completed Labs 1 and 2, including the sample table population.
- A wallet and SQLcl configured on the Lab 2 VM.
- The `FINANCIAL` schema and sample tables from the previous lab.
- An API key for either OpenAI or Google AI Studio. Keep API keys, wallets, and passwords outside Git.

## Task 0: Install the inventory-risk demo objects

The profile's object list names existing database objects; it does not create
them. Before applying the Gemini 3.7 profile or running the verification query,
connect as `FINANCIAL` and run the schema and seed scripts from the
`oracle-ai-database-gcp-gemini` repository root, in this order:

```sql
@sql/setup_supply_chain_graph_schema.sql
@sql/seed_supply_chain_graph_data.sql
@sql/setup_inventory_risk_demo_schema.sql
@sql/seed_inventory_risk_demo_data.sql
```

The base schema and seed create `SC_PRODUCTS` and `SC_WAREHOUSES`, which the
inventory-risk tables reference. The inventory schema creates
`SC_INVENTORY_RISK_SUMMARY`; its seed inserts the demo quarter rows. These
scripts are rerunnable. Review any reported errors before proceeding.

Confirm the required table and data are visible to `FINANCIAL`:

```sql
select table_name
from user_tables
where table_name in ('SC_PRODUCTS', 'SC_WAREHOUSES',
                     'SC_INVENTORY_RISK_SUMMARY')
order by table_name;

select distinct quarter_label
from financial.sc_inventory_risk_summary
order by quarter_label;
```

The first query should list all three tables, and the second should return at
least one quarter. If the table exists under another owner, do not continue
with a `FINANCIAL` profile unchanged: use the intended schema consistently in
the profile object list, script checks, and verification query.

## Task 1: Configure one Select AI provider

Choose one provider. Do not configure both unless both profiles are intentionally required.

### Option A: OpenAI

From the SQLcl VM, run the credential script as an administrator:

```bash
sql -S "$DB_USERNAME/$DB_PASSWORD@$DB_DSN" \
  @sql/create_openai_select_ai_credential.sql "$OPENAI_API_KEY"
```

Then connect as `FINANCIAL`:

```sql
@sql/create_paulparkdb_openai_select_ai_profile.sql
```

This creates `OPENAI_CRED` and `PAULPARK_SUPPLY_CHAIN_OPENAI`.

### Option B: Google AI Studio

Connect as `FINANCIAL` and run the following scripts. The credential script prompts for the API key without echoing it:

```sql
@sql/create_google_select_ai_credential.sql
@sql/create_paulparkdb_select_ai_profile.sql
```

This creates `GOOGLE_AI_CRED` and `PAULPARK_SUPPLY_CHAIN_DEMO`.

The profile uses `gemini-3.7-flash`, an 8,192-token output ceiling, and domain
guidance for the inventory schema and calendar quarters. Its initial check
generates SQL for “List SKUs with risk of stock outages, highest risk first.”
Review the generated SELECT and run it to inspect the returned rows.

If the profile already exists and you are applying the Gemini 3.7 update, run
the workshop's update script after Task 0, then use the repository's
preflighted verification script as `FINANCIAL`:

```sql
@sql/verify_gemini37.sql
```

It checks that the risk table and expected profile/model exist before querying
the available quarters, so a missing setup step is reported with a repair
instruction instead of a later `ORA-00942`.

Without a requested quarter, the default is the latest stored quarter, included
in the result. “Next quarter” means the next calendar quarter relative to the
database date. No matching estimates means no data for that period, not zero
risk. These queries retrieve seeded estimates; they do not calculate a new forecast.

## Task 2: Install and verify the managed Oracle AI Database Agent

Use the Oracle Developers guide linked above for official installer acquisition and Gemini Enterprise setup. After the installer files are available on the SQLcl VM, connect as `FINANCIAL` and run the scripts in this order, supplying `FINANCIAL` and the selected narrow profile when prompted:

```sql
@/path/to/oracle_ai_database_agent_tool.sql
@/path/to/oracle_ai_database_agent.sql
@sql/verify_oracle_ai_database_agent.sql
```

Verification should show the `ORACLE_AI_DATABASE_AGENT` team and these tools: `SQL_TOOL`, `DISTINCT_VALUES_CHECK`, `RANGE_VALUES_CHECK`, and `GENERATE_CHART`.

The database installation does not register Gemini Enterprise by itself. Complete the A2A feature-tag, OAuth, Marketplace, and user-authorization steps in the Oracle Developers guide.

## Task 3: Validate the agent in Gemini Enterprise

Use Gemini Enterprise to ask the agent a read-only question grounded in the sample data. Confirm that the response is backed by the Oracle AI Database Agent and that the selected profile limits the database context to the intended data.

Do not put API keys, wallet files, passwords, or installer credentials in the workshop repository.

## Conclusion

The Oracle AI Database Agent is now configured in the database and connected
to Gemini Enterprise. Continue to [Lab 5](?lab=a2a-agents) to
prepare A2A connectivity, the MCP server, MCP Apps and the separate A2UI service.

## Acknowledgements

*All Done! You may proceed to the next lab.*

- **Authors/Contributors** - Paul Parkinson, Architect and Dev Advocate, Oracle AI Database
- **Last Updated By/Date** - Paul Parkinson, October 2026
