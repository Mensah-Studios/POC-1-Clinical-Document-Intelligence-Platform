from fastmcp import FastMCP
from dotenv import load_dotenv
import os

mcp = FastMCP("Clinical Document Intelligence Platform MCP")

# load_dotenv("")

if os.environ.get("ENVIRONMENT") == "prod":
    mcp.http_app()
else:
    if __name__=="__main__":
        mcp.run(
            host="localhost",
            port="4567"
        )