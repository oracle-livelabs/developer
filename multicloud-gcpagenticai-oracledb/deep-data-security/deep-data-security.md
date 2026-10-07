# Add Deep Data Security (optional)

## Introduction

This draft lab is retained for future use and is not part of the active workshop sidebar.

Estimated Time: 30 minutes (planning estimate).

Apply region-level authorization to the same inventory-risk view. Two database users receive different region roles and see different rows through Oracle Deep Data Security policies. No cloud identity or model prompt is trusted as the authorization mechanism.

### Objectives

- Add an explicit `MARKET_REGION` authorization attribute.
- Create North America and APAC test users with separate roles.
- Apply a row-filtering policy to the inventory demo view.
- Verify the same Gemini Enterprise agent returns only authorized rows.

### Prerequisites

- Completed the active workshop's database and managed-agent setup labs.
- Run SQLcl or SQL*Plus as `ADMIN`.
- Use the source project script `sql/run_inventory_risk_deepsec_regions.sh` as the reference implementation.
- Use unique passwords supplied interactively or through an ignored environment file.

## Task 1: Prepare regional data

The source script adds `MARKET_REGION` to the risk summary and warehouse geography, seeds APAC products and warehouses, and recreates `SC_INVENTORY_RISK_DEMO_V`. Review the script before running it and confirm the schema owner is the workshop schema, not `ADMIN`.

```bash
export DB_SCHEMA_OWNER=FINANCIAL
export DB_USERNAME_NA=SUPPLYCHAIN_NA_MGR
export DB_USERNAME_APAC=SUPPLYCHAIN_APAC_MGR
./sql/run_inventory_risk_deepsec_regions.sh
```

The script expects administrator credentials, wallet configuration, and end-user passwords from `.env`; never commit that file.

## Task 2: Verify policy isolation in SQL

Connect as the North America user and query:

```sql
select distinct market_region from financial.sc_inventory_risk_demo_v;
```

Repeat as the APAC user. The first result must contain only `NA`; the second must contain only `APAC`. Also query the product and warehouse counts and confirm they differ as seeded.

## Task 3: Verify isolation through the agent

In Gemini Enterprise, select the same Select AI or A2A agent and ask:

```text
List the products at risk in my authorized region. Include product, market region, stockout probability, and projected revenue impact.
```

Authenticate once as each database user. The prompt is identical; only the database identity changes. Confirm that changing the prompt to request another region does not bypass the policy.

## Task 4: Inspect auditing and least privilege

1. Confirm each end user can select the governed view but cannot alter policy objects.
2. Confirm A2A and Select AI activity is recorded in the database audit trail.
3. Confirm the agent service does not receive or log database passwords.
4. Revoke the temporary users and roles after the workshop if the environment is shared.

## Conclusion

Deep Data Security makes authorization a database invariant across Gemini CLI, Gemini Enterprise, A2A, MCP, and direct SQL. Apply the same policies to the optional lakehouse lab so analytical results remain within the authenticated user's region.

## Acknowledgements

*All Done! You may proceed to the next lab.*

- **Authors/Contributors** - Paul Parkinson, Architect and Dev Advocate, Oracle AI Database
- **Last Updated By/Date** - Paul Parkinson, October 2026
