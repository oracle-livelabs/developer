from oci.addons.adk import Agent, AgentClient
from oci.addons.adk.mcp.mcp_client import MCPClientStreamableHttp
import asyncio
from mcp.client.session_group import StreamableHttpParameters


async def main():

    client = AgentClient(
        auth_type="api_key",
        profile="DEFAULT",
        region="us-chicago-1"
    )
    params = StreamableHttpParameters(
        url="http://127.0.0.1:8000/mcp",  # your MCP server endpoint
        timeout=10.0,                      # optional: request timeout
        sse_read_timeout=30.0,             # optional: SSE read timeout
        terminate_on_close=True            # whether to close on cleanup
    )
    mcp_client = MCPClientStreamableHttp(params)

    async with mcp_client:
        # as function tools
        mcp_tools = await mcp_client.as_toolkit()

        # create agent using only the MCP-provided toolkit
        agent = Agent(
            client=client,
            agent_endpoint_id="ocid1.genaiagentendpoint.oc1.us-chicago-1.amaaaaaadrjlbryasbqdkw66f2pvkxk2j4byffl3jsft4mktov7jiwqs4ltq",
            instructions="You perform actions using tools provided.",
            tools=[mcp_tools],
        )

        # support both sync and async setup() implementations
        maybe_coro = agent.setup()
        if hasattr(maybe_coro, "__await__"):
            await maybe_coro

        # single minimal example run
        response = await agent.run_async("Get forecast for nyc", max_steps=3)
        response.pretty_print()


if __name__ == "__main__":
    asyncio.run(main())
