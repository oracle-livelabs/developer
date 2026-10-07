# Develop and deploy A2A, A2UI, MCP Server, and MCPApps (graph, spatial, form actions, ...)

## Introduction

Prepare the GCP services used by the inventory demonstration: private A2A
connectivity, a server-side Java gateway, a read-only MCP server with graph
and spatial MCP Apps, and the separate A2UI transfer-review service. Use the
existing workshop services when they are already provisioned; do not create
duplicate agents or connectors. Lab 6 tests the complete user experience.

Estimated Time: 45 minutes (allow additional time for initial authorization and deployment).

### Objectives

- Understand the Gemini Enterprise -> Cloud Run -> Oracle A2A route.
- Deploy or inspect the private A2A relay.
- Register the relay card with OAuth in Gemini Enterprise.
- Deploy the managed-agent gateway and MCP server with server-side secrets.
- Identify the A2UI review service and keep its approval boundary separate.
- Validate authentication and Oracle-side query evidence.

### Architecture

```text
Gemini Enterprise
  ├─ Oracle AI Database Agent → A2A relay → private Oracle agent
  ├─ MCP connector → Java gateway → A2A relay → private Oracle agent
  │    └─ validated results → plain table / Cytoscape graph / MapLibre map
  └─ Oracle Supply-Chain A2UI → Toolkit recommendation review
       └─ explicit approval → governed inventory write
```

The relay is a protocol and identity boundary, not a second database agent.
It forwards the supplied Oracle bearer token and keeps the private Oracle
hostname out of Gemini Enterprise's public registration. The gateway uses
its configured Oracle consent grant; this is not automatic delegation of
each Gemini user's identity.

### Prerequisites

- Completed Lab 4 (and the preceding labs).
- GCP project and region with the Oracle Database@Google Cloud network attached.
- Cloud Run deployment permissions and a private Oracle A2A endpoint.
- Dedicated Oracle OAuth client and least-privileged database users.
- Java 21, Maven, Node.js 20.19+ or 22.12+, gcloud and the application checkout
  on the GCP workshop VM. The hosted lab does not require a desktop server.

## Task 1: Understand the network boundary

```text
Gemini Enterprise
  -> HTTPS + user Oracle OAuth bearer token
  -> Cloud Run private-A2A relay
  -> Direct VPC egress on the GCP VPC
  -> Oracle Database@Google Cloud network
  -> Oracle private A2A endpoint
  -> Oracle AI Database agent team
```

The relay must not store or log bearer tokens. Oracle remains responsible for database privileges, Select AI object lists, row filtering, and unified auditing.

## Task 2: Configure the relay

### 2.1 Prepare the workshop source

On the Lab 2 VM, use the workshop checkout created for the SQLcl scripts:

```bash
cd "$HOME/oracle-ai-database-gcp-gemini"
ls private-a2a-proxy deploy/gcp mcp-app oracle_agent_java
```

Keep the source checkout on the VM. It contains the database scripts and is
the host used for the later A2A deployment steps.

### 2.2 Configure deployment values

Use the application's `private-a2a-proxy/` container. Its deployment script
uses `PROJECT_ID` and `REGION`, not the similarly named `GCP_*` variables:

```bash
export PROJECT_ID="YOUR_GCP_PROJECT"
export REGION="YOUR_GCP_REGION"
export NETWORK="YOUR_VPC"
export SUBNET="YOUR_SUBNET"
export REPOSITORY="YOUR_ARTIFACT_REGISTRY_REPOSITORY"
export SERVICE_ACCOUNT="YOUR_RELAY_SERVICE_ACCOUNT"
export PRIVATE_HOST_PREFIX="YOUR_ORACLE_PRIVATE_HOST_PREFIX"
export OCI_REGION="YOUR_ORACLE_REGION"
export DB_OCID="YOUR_DATABASE_OCID"
cd private-a2a-proxy
./deploy.sh
```

Before deployment, follow the
[private A2A network runbook](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/PRIVATE_A2A_NETWORK_RUNBOOK.md)
to prepare the service account, Artifact Registry and private routing. The
script uses Direct VPC egress to the configured VPC/subnet. Keep environment
identifiers and credentials out of public documentation.

The environment variables identify deployment targets only. Store OAuth
client secrets and any database credentials in Secret Manager. The relay must
read the incoming bearer token for the request and must never persist or log
it.

The relay should allow only these methods:

```text
message/send
message/stream
tasks/get
tasks/cancel
```

## Task 3: Validate the security contract

Run the following checks against the relay URL:

```bash
export RELAY_URL="https://YOUR_RELAY.run.app"
curl -i "$RELAY_URL/health"
curl -i "$RELAY_URL/.well-known/agent-card.json"
curl -i -X POST "$RELAY_URL/message/send" -H 'content-type: application/json' -d '{}'
```

Expected results:

- `/health` returns HTTP 200.
- The agent card advertises the relay, not the private Oracle hostname.
- A request without a bearer token returns HTTP 401.
- An invalid bearer token reaches Oracle and returns an Oracle authentication error rather than a network ACL error.

## Task 4: Register and test in Gemini Enterprise

1. Open Gemini Enterprise's custom agent or agent registration area.
2. Register the relay's `/.well-known/agent-card.json` URL. Confirm the card contains the public relay URL and does not expose the private Oracle hostname.
3. Associate the dedicated Oracle OAuth authorization resource described in the Oracle Developers guide.
4. Start a chat with the relay agent and authenticate as a permitted database user.
5. Ask for a scoped inventory risk summary and verify the returned database
    metric and period. Do not assume region filtering that has not been configured.

    Use this prompt:

    ```text
    List products with stockout risk. Include the database's stockout probability, quarter and primary region. Return only database results.
    ```

## Task 5: Deploy the Java gateway, MCP server and MCP Apps

The [managed-read deployment runbook](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/MCP_APP_ORACLE_AGENT_SPATIAL.md#cloud-run-deployment)
lists the OAuth grant, Secret Manager entries and runtime prerequisites.
Complete initial Oracle consent if needed; never put refresh tokens in the
browser MCP App. Check the
[graph setup runbook](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/MCP_APP_ORACLE_AGENT_GRAPH.md)
for the property graph, query view and active Select AI profile.

From the application checkout on the VM:

```bash
cd "$HOME/oracle-ai-database-gcp-gemini"
export ORACLE_RELAY_URL="https://YOUR_RELAY.run.app"
export RUNNER_SERVICE_ACCOUNT="YOUR_GATEWAY_MCP_SERVICE_ACCOUNT"
./deploy/gcp/deploy-oracle-agent-and-mcp-app.sh
```

The script builds and deploys the gateway and MCP App server, and prints their
HTTPS URLs. It contains workshop-specific secret names, Oracle token endpoint,
database service and network defaults. For a different environment, adapt
those settings using the runbook **before running it**. The demo permits
public Cloud Run ingress; upstream Oracle OAuth is not a substitute for
production ingress protection.

The relevant implementation areas are:

| Component | Source / responsibility |
| --- | --- |
| Private A2A relay | `private-a2a-proxy/`: forward authenticated requests over the VPC |
| Java gateway | `oracle_agent_java/`: OAuth renewal, bounded managed-agent requests and validation |
| MCP server | `mcp-app/server.ts`: four read-only tools and UI resource registration |
| MCP Apps | `mcp-app/src/`: Cytoscape.js graph and MapLibre spatial UI |
| Review/approval API | `agent-service/`: Toolkit recommendations and exact, expiring approval handles |

In Gemini Enterprise, use the existing **Oracle Supply-Chain MCP App**
connector with the deployed `/mcp` URL. Reload custom actions and enable
**List-inventory-items**, **List-inventory-stockout-risks**,
**Show-supply-chain-graph**, and **Show-inventory-spatial-hotspots**. Keep
`MCP_WRITES_ENABLED=false`; do not register the old transfer dashboard.

## Task 6: Prepare the separate A2UI review service

Use the existing **Oracle Supply-Chain A2UI** agent, backed by the GCP
`oracle-supply-chain-a2ui` service. The gateway/MCP deployment script above
does not deploy this separate adapter. If it is absent in a new environment,
have the workshop operator provision and register it before continuing;
the [inventory architecture runbook](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/INVENTORY_UI_ARCHITECTURE.md)
defines its review/approval API and identity boundary.

The service returns native form controls from the host's A2UI catalog, not
an MCP App iframe. Ordinary prompts request recommendations; only a separate
explicit approval action may execute the exact reviewed transfer. Do not
substitute the older VM inventory-action, graph or spatial agents.

## Task 7: Verify and hand off to the test lab

1. Confirm the relay never logs bearer tokens, OAuth secrets or database passwords.
2. Check the four MCP actions and both UI resource types in the deployed server.
3. Correlate managed-agent requests with Oracle team/tool history using the
    [provenance checks](https://github.com/paulparkinson/oracle-ai-database-gcp-gemini/blob/main/docs/MCP_APP_ORACLE_AGENT_SPATIAL.md#verify-provenance-not-just-a-working-map).
4. Confirm the A2UI agent is available; do not execute a transfer as a health check.
5. Continue to [Lab 6](?lab=a2ui-mcpapps) for the prompt-by-prompt tests.

## Conclusion

A2A carries agent messages, MCP exposes bounded tools, MCP Apps render graph
and spatial views, and A2UI renders the separate review form. Lab 6 tests these
surfaces without treating model output or UI payloads as write authorization.

## Acknowledgements

*All Done! You may proceed to the next lab.*

- **Authors/Contributors** - Paul Parkinson, Architect and Dev Advocate, Oracle AI Database
- **Last Updated By/Date** - Paul Parkinson, October 2026
