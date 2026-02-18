import json
from typing import Any
from datetime import date, timedelta
from mcp.server.fastmcp import FastMCP

# Initialize the MCP server with a name
mcp = FastMCP("Weather MCP Server (mock)")


def _mock_location_data(location: str) -> dict[str, Any]:
    """Return a small mocked current weather payload for a given location string."""
    loc = location.strip().lower()
    if "san francisco" in loc or "sf" in loc:
        return {
            "location": {"name": "San Francisco", "lat": 37.7749, "lon": -122.4194},
            "temperature": 15.2,
            "feels_like": 14.0,
            "humidity": 72,
            "wind_speed": 5.2,
            "description": "Clear sky"
        }
    if "new york" in loc or "nyc" in loc:
        return {
            "location": {"name": "New York", "lat": 40.7128, "lon": -74.0060},
            "temperature": 22.5,
            "feels_like": 22.0,
            "humidity": 60,
            "wind_speed": 3.5,
            "description": "Partly cloudy"
        }
    # default mock
    return {
        "location": {"name": location, "lat": 0.0, "lon": 0.0},
        "temperature": 20.0,
        "feels_like": 20.0,
        "humidity": 50,
        "wind_speed": 2.0,
        "description": "Mostly clear"
    }


@mcp.tool()
async def get_current_weather(location: str) -> str:
    """Return a mocked current weather JSON string for the provided location name."""
    payload = _mock_location_data(location)
    return json.dumps(payload, indent=2)


@mcp.tool()
async def get_forecast(location: str) -> str:
    """Return a mocked 7-day forecast JSON string for the provided location name."""
    base = _mock_location_data(location)
    today = date.today()
    forecast = []
    for i in range(7):
        d = today + timedelta(days=i)
        # simple diurnal mock variation
        high = base["temperature"] + (i % 3) + 1
        low = base["temperature"] - (i % 2) - 2
        forecast.append({
            "date": d.isoformat(),
            "high_temp": round(high, 1),
            "low_temp": round(low, 1),
            "precip_prob": 10 * ((i + 1) % 4),
            "description": base["description"]
        })
    result = {"location": base["location"], "forecast": forecast}
    return json.dumps(result, indent=2)


if __name__ == "__main__":
    # Run the server with Streamable HTTP transport on port 3000 (default)
    mcp.run(transport="streamable-http")