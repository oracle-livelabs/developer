# Lab 2: Integrate a Local MCP Server with OCI Generative AI Agents

## Introduction

In Lab 1, you created a **Generative AI Agent** and captured the **Agent Endpoint OCID**.  
In this lab, you will run a **local MCP server** (a mock weather service) and make its tools available to the OCI Agent through the **OCI Agent Development Kit (ADK)**.

Estimated Time: 60–90 minutes

### Objectives

In this lab, you will:
* Run a local MCP server (`weather_server.py`) using Streamable HTTP transport.
* Verify the MCP endpoint is reachable at `http://127.0.0.1:8000/mcp`.
* Configure the ADK client (`run_agent.py`) to connect to the MCP server and your **Agent Endpoint OCID** from Lab 1.
* Invoke the agent and confirm it can call MCP tools (weather + forecast).

### Prerequisites

This lab assumes you have:
* Completed **Lab 1** and copied your **Agent Endpoint OCID**.
* Python 3.10+ installed locally.
    - Check installation: `python --version` (macOS/Linux) or `py --version` (Windows).
    - Install from https://www.python.org/downloads/ or use a package manager (macOS example: `brew install python@3.11`).
* An OCI config profile (commonly `DEFAULT`) with an API key set up at `~/.oci/config`.
* Network access to the OCI Generative AI Agents endpoint in **us-chicago-1**.

---

## Task 1: Review the provided source code

Copy these files for Lab 2 to a local folder:

* [requirements.txt](./src/requirements.txt) — Python dependencies (oci, mcp, rich, docstring_parser).
* [weather_server.py](./src/weather_server.py) — an MCP server that exposes two tools:
    - `get_current_weather(location: str)`
    - `get_forecast(location: str)`
* [run_agent.py](./src/run_agent.py) — an ADK client that:
    - connects to the local MCP server via Streamable HTTP
    - registers MCP tools with your OCI agent endpoint
    - runs a sample prompt: "Get forecast for nyc"

> **Tip:** The MCP client in `run_agent.py` expects the MCP endpoint to be available at `http://127.0.0.1:8000/mcp`.

---

## Task 2: Create a Python virtual environment and install dependencies

1. Create and activate a virtual environment:

   ```bash
   <copy>
   python3 -m venv .venv
   source .venv/bin/activate
   </copy>
   ```

   On Windows (PowerShell):

   ```powershell
   <copy>
   py -m venv .venv
   .\.venv\Scripts\Activate.ps1
   </copy>
   ```

2. Install dependencies:

   ```bash
   <copy>
   pip install --upgrade pip
   pip install -r src/requirements.txt
   </copy>
   ```

> If your environment uses a different package name/version for the OCI ADK, install the ADK package your instructor provided for Lab 1/2. 

---

## Task 3: Start the MCP server locally

1. From the folder containing `weather_server.py`, start the server:

   ```bash
   <copy>
   python weather_server.py
   </copy>
   ```

2. Confirm the server is listening.

   With Streamable HTTP transport, FastMCP exposes the MCP endpoint at:

   * `http://127.0.0.1:8000/mcp`

   (This is the URL MCP clients connect to.)

3. Optional quick connectivity test:

   * Open a browser to `http://127.0.0.1:8000/mcp`  
   * Or run:

   ```bash
   <copy>
   curl -i http://127.0.0.1:8000/mcp
   </copy>
   ```

> **Note:** If port **8000** is in use, stop the conflicting process or modify the server to run on another port and update `run_agent.py` accordingly.

---

## Task 4: Configure the agent client to use your Agent Endpoint OCID

1. Open `run_agent.py` and locate:

   ```python
   <copy>
   agent_endpoint_id="ocid1.genaiagentendpoint...."
   </copy>
   ```

2. Replace the value with the **Agent Endpoint OCID** you copied at the end of Lab 1.

3. Confirm region and profile match your OCI configuration:

   ```python
   <copy>
   profile="DEFAULT"
   region="us-chicago-1"
   </copy>
   ```

---

## Task 5: Run the agent and validate MCP tool calls

1. In a **new terminal** (leave the MCP server running), activate your venv again if needed:

   ```bash
   <copy>
   source .venv/bin/activate
   </copy>
   ```

2. Run the agent client:

   ```bash
   <copy>
   python run_agent.py
   </copy>
   ```

3. Expected result:

   * The ADK client connects to your OCI Agent Endpoint.
   * The agent discovers MCP tools from the local server.
   * The agent calls the MCP tool to fetch a mock 7-day forecast for NYC.
   * The response prints in your terminal (`response.pretty_print()`).

---

## Troubleshooting

**MCP endpoint not reachable**
* Ensure `weather_server.py` is running and listening on `127.0.0.1:8000`.
* Ensure the URL in `run_agent.py` is exactly:
  `http://127.0.0.1:8000/mcp`

**Agent fails with auth errors**
* Verify your `~/.oci/config` and key files are correct for the `DEFAULT` profile.
* Confirm your tenancy/user has access to Generative AI Agents in **us-chicago-1** (Lab 1 policies).

**Timeouts / connection resets**
* If you are running inside a VM/container, make sure localhost networking is correct.
* Increase timeouts in `StreamableHttpParameters(...)` if needed.

---

## Learn More

* [FASTMCP](https://gofastmcp.com/deployment/running-server)
* [OCI Generative AI Agents ADK Quickstart](https://docs.oracle.com/en-us/iaas/Content/generative-ai-agents/adk/api-reference/quickstart.htm)

---

## Acknowledgements

**Authors**
* **Anuragg Mohan**, Principal Cloud Architect, NACIE

**Last Updated By/Date:**
* **Anuragg Mohan**, Principal Cloud Architect, NACIE, Feb 2026
