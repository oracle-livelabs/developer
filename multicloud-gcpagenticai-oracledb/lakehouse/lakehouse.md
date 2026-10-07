# Add Lakehouse resources (optional)

## Introduction

This draft lab is retained for future use and is not part of the active workshop sidebar.

Estimated Time: 30 minutes (planning estimate).

Extend the Oracle AI Database supply-chain demo with analytical data that remains queryable alongside operational inventory data. This lab establishes a lakehouse boundary: raw or historical files remain in object storage, while governed external tables and curated views make the data available to the agent and recommendation workflow.

### Objectives

- Identify the lakehouse data needed by the inventory agents.
- Register an object-storage location and external data representation.
- Join analytical signals to the governed inventory-risk view.
- Expose lakehouse-derived context as a read-only agent capability.

### Prerequisites

- Completed the active workshop's database and managed-agent setup labs. The retained Deep Data Security lab is an optional reference for region-level filtering.
- An object-storage bucket containing workshop-approved CSV or Parquet files.
- Oracle AI Database credentials with least-privileged external-table and query grants.
- Cloud credentials configured through the supported database credential mechanism.

## Task 1: Define the analytical contract

Use a stable schema for the sample data:

```text
product_id, event_time, region, signal_type, signal_value, source
```

Do not place credentials in object URLs. Keep raw data immutable and create a curated table or view for agent access. The operational recommendation remains authoritative for product, warehouse, quantity, and approval.

## Task 2: Register and validate lakehouse data

1. Create the approved bucket prefix for the workshop.
2. Upload a small sample file and record its object URI.
3. Configure an Oracle cloud credential using the database administrator workflow.
4. Create the supported external table or lakehouse connection for the selected Oracle AI Database release.
5. Query the external data directly and verify row counts, timestamps, and region values.

    Use the release-specific Oracle documentation for the exact external-table syntax; do not substitute a public bucket or a hard-coded access key.

## Task 3: Curate a governed view

Join the analytical signal to the inventory view using a bounded time window and explicit region:

```sql
select r.product_id,
       r.primary_region,
       r.stockout_probability,
       l.signal_type,
       l.signal_value,
       l.source
from sc_inventory_risk_demo_v r
join supply_chain_lakehouse_v l
  on l.product_id = r.product_id
 and l.region = r.primary_region
where l.event_time >= systimestamp - interval '90' day;
```

Grant the agent service access to the view, not the raw external table. Add row limits and a query timeout appropriate for an interactive agent.

## Task 4: Use lakehouse context in Gemini Enterprise

Ask the Select AI or action agent:

```text
For SKU-500, combine the current Oracle inventory risk with the last 90 days of approved external supply signals. Cite the signal source and distinguish observed data from recommendation.
```

Confirm the answer identifies the source and timestamp and that no write operation is triggered.

## Task 5: Operate and clean up

- Test a missing object and a malformed row.
- Confirm stale data is excluded by the time predicate.
- Review cloud credential grants and rotate them using the platform procedure.
- Remove only the workshop bucket objects during cleanup; preserve shared database views until the workshop is complete.

## Conclusion

The lakehouse adds breadth without weakening the operational source of truth. The next lab applies Deep Data Security so analytical and operational results are filtered by the authenticated user’s region.

## Acknowledgements

*All Done! You may proceed to the next lab.*

- **Authors/Contributors** - Paul Parkinson, Architect and Dev Advocate, Oracle AI Database
- **Last Updated By/Date** - Paul Parkinson, October 2026
