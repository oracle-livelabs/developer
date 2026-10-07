# Oracle AI Database + GCP agentic AI workshop

Start with the [workshop runbook](workshop-runbook/workshop-runbook.md) for
prerequisites and lab order. The workshop ends with two complementary labs:

- [Lab 5: Develop and deploy A2A, A2UI, MCP Server, and MCPApps (graph, spatial, form actions, ...)](a2a-agents/a2a-agents.md)
- [Lab 6: Test A2A, A2UI, MCP Server, and MCPApps (graph, spatial, form actions, ...)](a2ui-mcpapps/a2ui-mcpapps.md)

Lab 6 includes an [embedded demo video](https://www.youtube.com/watch?v=oqQpabC2kxo), Gemini Enterprise screenshots, dynamic prompts, provenance
verification and the Java gateway/server-side OAuth rationale.

The application lives in
[oracle-ai-database-gcp-gemini](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini),
not this documentation repository or `oracle-ai-for-sustainable-dev`.

- [Canonical managed-agent runbook](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/MCP_APP_ORACLE_AGENT_SPATIAL.md):
  deployment steps, raw evidence checks, OAuth lifecycle and dated test results.
- [User-facing inventory skill](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/.agents/skills/inventory-ui-architecture/SKILL.md):
  give this file and its references to ChatGPT/Claude. Maintain this single
  canonical skill rather than a divergent
  workshop copy.

The [interactive graph runbook](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/MCP_APP_ORACLE_AGENT_GRAPH.md)
adds Cytoscape.js, dynamic graph prompts, live-result screenshots and browser
interaction tests. The managed agent queries a view using SQL/PGQ
`GRAPH_TABLE`/`MATCH` on `FINANCIAL.SUPPLY_CHAIN_GRAPH`; Cytoscape.js renders
the returned graph interactively rather than generating a PNG.

Current MCP actions are catalog, plain stockout-risk, spatial and graph reads
via the managed Oracle AI Database Agent, with no Toolkit/static fallback. These are live reads of
seeded demo data. The separate A2A/A2UI flow currently creates transfer drafts
and review controls; do not describe it as a verified committed inventory write.
