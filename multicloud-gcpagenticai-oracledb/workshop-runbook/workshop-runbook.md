# Complete workshop runbook

This page is the operational index for running the workshop from an empty Google
Cloud/Oracle Database@Google Cloud environment. The individual labs explain the
concepts; this page makes the order, repositories, commands, verification
points, screenshots, and cleanup explicit.

Estimated Workshop Time: 3–4 hours.

### Objectives

- Follow the required lab order and prepare the GCP-hosted services.
- Verify database-backed reads and the separate A2UI review flow.
- Keep credentials private and clean up only workshop-owned resources.

## 0. What you will build

~~~text
Google Cloud project
├── VPC + VM (SQLcl, source checkout and deployment tools)
├── Cloud Run (private A2A relay, Java gateway, MCP server, A2UI service)
└── Oracle Database@Google Cloud Autonomous Database
    ├── FINANCIAL inventory/risk/graph/spatial data
    ├── Oracle AI Database Agent and A2A endpoint
    └── governed transfer recommendation and approval procedures

Gemini Enterprise
├── Marketplace Oracle AI Database Agent
├── Oracle Supply-Chain MCP App connector (catalog, risk list, graph, map)
└── Oracle Supply-Chain A2UI agent (recommendation review and explicit approval)
~~~

Run deployment commands from the GCP workshop VM. Use three separate
checkouts; the workshop is a directory inside the `developer` repository:

~~~bash
export DOCS_REPO="$HOME/developer"
export WORKSHOP_REPO="$DOCS_REPO/multicloud-gcpagenticai-oracledb"
export APP_REPO="$HOME/oracle-ai-database-gcp-gemini"
export TOOLKIT_REPO="$HOME/oracle-ai-database-fullstack-toolkit"
~~~

Never commit wallets, passwords, OAuth secrets, API keys, Maven caches, or
generated build output.

## 1. Prerequisites and clone

You need Google Cloud billing and Oracle Database@Google Cloud access, an OCI
tenancy linked to the Marketplace offer, Gemini Enterprise permissions, and
git, gcloud, ssh, scp, Java 21, Maven, Python 3, SQLcl, jq, and Node.js
20.19+ or 22.12+ for the MCP Apps build.

~~~bash
gcloud auth login
gcloud auth application-default login
gcloud config set project YOUR_GCP_PROJECT

git clone https://github.com/paulparkinson/developer.git "$DOCS_REPO"
git clone https://github.com/paulparkinson/oracle-ai-database-gcp-gemini.git "$APP_REPO"
git clone https://github.com/paulparkinson/oracle-ai-database-fullstack-toolkit.git "$TOOLKIT_REPO"
~~~

## 2. Lab order

| Sidebar | Lab | Outcome | Required? |
| --- | --- | --- | --- |
| Get Started | [Oracle Database@Google Cloud](?lab=gcp-started) | Link Google Cloud Marketplace and OCI | Yes |
| Lab 1 | [Provision Autonomous Database](?lab=adb-provisioning-databases) | Create private database and wallet | Yes |
| Lab 2 | [GCP networking and VM setup](?lab=gcp-get-started) | Create VM, clone source, seed Oracle data | Yes |
| Lab 3 | [Gemini CLI](?lab=gemini-cli) | Validate SQLcl MCP from the workshop environment | Optional |
| Lab 4 | [Oracle AI Database Agent](?lab=gemini-enterprise-agent) | Configure and register the managed Oracle agent | Yes |
| Lab 5 | [Develop and deploy A2A, A2UI, MCP Server, and MCPApps (graph, spatial, form actions, ...)](?lab=a2a-agents) | Prepare the GCP services and connector | Yes |
| Lab 6 | [Test A2A, A2UI, MCP Server, and MCPApps (graph, spatial, form actions, ...)](?lab=a2ui-mcpapps) | Verify risk table, graph, map and transfer review | Yes |

## 3. Provision network, database, and wallet

1. Complete Marketplace/OCI onboarding in gcp-started.
2. Create app-network with public subnet 10.1.0.0/24.
3. Create ODBG network odbg-network in us-east4.
4. Create client subnet db-subnet with 10.2.0.0/24.
5. Create the Autonomous Database with private endpoint access only.
6. Download the wallet, then create the VM using Lab 2, Task 2. From the machine where the wallet was downloaded, set the following values and copy that specific archive to the VM:

~~~bash
export SSH_KEY="/path/to/private_key"
export VM_USER="YOUR_VM_USER"
export VM_HOST="YOUR_VM_HOST"
ssh -i "$SSH_KEY" "$VM_USER@$VM_HOST" 'mkdir -p "$HOME/wallet" && chmod 700 "$HOME/wallet"'
scp -i "$SSH_KEY" /path/to/Wallet_YOUR_DATABASE.zip "$VM_USER@$VM_HOST:wallet/"
ssh -i "$SSH_KEY" "$VM_USER@$VM_HOST"
~~~

On the VM, extract the archive using its actual filename (install `unzip` if needed):

~~~bash
unzip "$HOME/wallet/Wallet_YOUR_DATABASE.zip" -d "$HOME/wallet"
chmod -R go-rwx "$HOME/wallet"
export TNS_ADMIN="$HOME/wallet"
~~~

Record the service alias from tnsnames.ora. Never commit wallet files.

## 4. Seed the database

On the private VM, verify the wallet connection:

~~~bash
cd "$APP_REPO"
export TNS_ADMIN="$HOME/wallet"
sql ADMIN@YOUR_SERVICE_ALIAS
~~~

As ADMIN, verify or create FINANCIAL, then run:

~~~sql
@sql/admin_prepare_paulparkdb_demo.sql
~~~

Reconnect as FINANCIAL and run in order:

~~~sql
@sql/setup_supply_chain_graph_schema.sql
@sql/seed_supply_chain_graph_data.sql
@sql/setup_inventory_risk_demo_schema.sql
@sql/seed_inventory_risk_demo_data.sql
~~~

Verify:

~~~sql
select object_name, object_type, status
from user_objects
where object_name like 'SC_%' or object_name = 'SUPPLY_CHAIN_GRAPH'
order by object_type, object_name;
~~~

The expected core products are SKU-500, SKU-700, and SKU-900.

## 5. Configure Oracle AI Database Agent

1. Create or verify a narrow Select AI profile over the SC_* objects.
2. Install and verify the Oracle AI Database Agent team using the scripts in
   $APP_REPO/sql and the pinned installer described in Lab 4.
3. Enable database A2A on the database resource.
4. Register OAuth with this exact redirect URI:

~~~text
https://vertexaisearch.cloud.google.com/oauth-redirect
~~~

5. Add the Marketplace Oracle AI Database Agent in Gemini Enterprise and test:

~~~text
List products with stockout risk. Include the database's stockout probability, quarter and primary region. Return only database results.
~~~

Expect database-backed values for the seeded products. If the response is
generic, fix database/A2A authentication before continuing.

## 6. Develop and deploy the GCP services

Follow [Lab 5](?lab=a2a-agents) to deploy or inspect the private
A2A relay, prepare server-side OAuth, and deploy the Java gateway and MCP
server. Use the existing **Oracle AI Database Agent** and
**Oracle Supply-Chain A2UI** registrations. Graph and spatial exploration
use MCP Apps; do not register the older standalone graph/spatial agents
for this workflow.

The A2UI review service is a separate GCP deployment. Confirm it is available
before the test lab; the gateway/MCP deployment script does not create it.

## 7. Prepare the deployed MCP Apps

Use the application checkout `oracle-ai-database-gcp-gemini`. Deploy the Java
gateway and MCP App server to GCP with the existing private A2A relay and
Secret Manager OAuth references. The
[managed-read operator runbook](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/MCP_APP_ORACLE_AGENT_SPATIAL.md)
covers setup and deployment; the
[graph runbook](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/MCP_APP_ORACLE_AGENT_GRAPH.md)
covers the property graph and active Select AI profile.

In Gemini Enterprise, reload the existing **Oracle Supply-Chain MCP App**
connector and enable **List-inventory-items**, **List-inventory-stockout-risks**, **Show-supply-chain-graph** and
**Show-inventory-spatial-hotspots**. Do not enable the old transfer dashboard
or create a second connector.

## 8. Verify both UI paths

### Explore with MCP Apps

Follow [Test A2A, A2UI, MCP Server, and MCPApps (graph, spatial, form actions, ...)](?lab=a2ui-mcpapps)
for the GCP-hosted walkthrough, video, screenshots and verification steps. Send these prompts **one at a time**, inspecting each result before continuing:

```text
List SKUs with risk of stock outages.
Show the supply chain graph for SKU-500.
Show the spatial hotspot map for SKU-500.
```

The first question returns a compact probability/quarter table without opening
maps or graphs. Both explicitly requested visualizations fetch evidence server-side through the managed Oracle AI
Database Agent. The graph uses `GRAPH_TABLE`/`MATCH` on the Oracle property
graph and Cytoscape.js; the map uses validated warehouse rows and MapLibre.
Neither read path accepts model-passed evidence or falls back to the Toolkit.
The toolkit dashboard is not part of this deployed visualization lab.

### Decide with A2UI

In Gemini Enterprise select **Agents → Oracle Supply-Chain A2UI**, then ask:

~~~text
Suggest inventory transfers with a minimum stockout risk of 70, limited to 3 recommendations.
~~~

Confirm the native A2UI cards show the exact SKU, route, quantity and risk.
Ordinary text requests only create a review; execution requires the explicit
approval control, not special protective wording in the prompt.
This is the existing GCP Toolkit-backed review service, not the older VM
inventory-action coordinator. It queries its own governed recommendation
dataset; the preceding map/graph conversation is not automatically forwarded.
Choose **Cancel review without writing** for a read-only demonstration. Only
when an actual inventory change is intended, review the exact transfer and
click **Approve this exact transfer**. The October 4 verification tested
recommendation rendering, not a database write.

## 9. Cleanup and troubleshooting

Remove Gemini Enterprise agents/OAuth resources, disable temporary Cloud Run
relays, stop or delete the VM if it is not shared, revoke temporary database
users and credentials, and remove only workshop-owned database/bucket objects.

- Private connection fails: check TNS_ADMIN, wallet alias, VM subnet, firewall,
  and that the client is inside the VPC.
- Card returns 404: check the deployed service URL and card path before
  checking Gemini Enterprise.
- MCP App does not render: confirm the host supports MCP Apps and the MCP server
  advertises the matching ui:// resource; the toolkit dashboard alone is not an
  MCP Apps host.
- Approval is rejected: verify current recommendation state, actor, single-use
  approval, and database procedure grants.

When this runbook and a lab differ, treat checked-in source scripts and current
agent cards as authoritative, then update both documents. Never add a command
that requires a credential, wallet, or generated artifact to be committed.

## Acknowledgements

- **Author** — Paul Parkinson, Architect and Developer Advocate, Oracle AI Database
- **Last updated** — October 2026
