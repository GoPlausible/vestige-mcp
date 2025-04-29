[![smithery badge](https://smithery.ai/badge/@GoPlausible/vestige-mcp)](https://smithery.ai/server/@GoPlausible/vestige-mcp)
# Vestige MCP

Built by [GoPlausible](https://github.com/GoPlausible) and distilled from [Algorand MCP](https://github.com/GoPlausible/algorand-mcp).

A Model Context Protocol (MCP) server implementation for interacting with the Vestige API, providing comprehensive DeFi analytics and data access for the Algorand ecosystem.

## Overview

Vestige MCP serves as a bridge between MCP-enabled applications and the Vestige API, offering tools to access:
- Network information and statistics
- Protocol analytics (Tinyman, Pact, Algofi, etc.)
- Asset data and price information
- Pool analytics and liquidity information
- Vault statistics
- Balance tracking
- Transaction monitoring
- Market notes and annotations

## Installation

To install or update the Algorand MCP implementation, clone the repository, install the dependencies and build the project":

First check node version to be 23.6.1 or later:
```bash
node -v
```

Upgrade to 23.6.1 or later if needed!

Then check the Claude or Cursor container folders to have mcp-servers folder (if not create one):
```bash
mkdir PATH_ON_YOUR_MACHINE/Claude/mcp-servers
# or for Cursor 
mkdir PATH_ON_YOUR_MACHINE/Cursor/mcp-servers
```
Then clone this repository under mcp-servers folder and install dependencies:

```bash
cd PATH_ON_YOUR_MACHINE/Claude/mcp-servers
# or for Cursor 
cd PATH_ON_YOUR_MACHINE/Cursor/mcp-servers
# Clone the repository
git clone https://github.com/GoPlausible/vestige-mcp.git
cd vestige-mcp
# Install dependencies
npm install
# Build the project
npm run build
# Edit the .env file to set your configurations
```
And you are done! Now you can open you MCP config and add the server as :

```json
{
  "mcpServers": {
    "vestige-mcp": {
      "command": "node",
      "args": [
        "PATH_ON_YOUR_MACHINE/Claude/mcp-servers/vestige-mcp/packages/server/dist/index.js"
     ],
      "env": {
        "ALGORAND_NETWORK": "mainnet",
        "ALGORAND_ALGOD_API": "https://mainnet-api.algonode.cloud/v2",
        "ALGORAND_ALGOD": "https://mainnet-api.algonode.cloud",
        "ALGORAND_ALGOD_PORT": "",
        "ALGORAND_TOKEN": "",
        "ALGORAND_AGENT_WALLET_ACTIVE": "problem aim online jaguar upper oil flight stumble mystery aerobic toy avoid file tomato moment exclude witness guard lab opera crunch noodle dune abandon broccoli",
        "VESTIGE_API_URL": "https://api.vestigelabs.org",
        "VESTIGE_API_KEY": "",
        "ITEMS_PER_PAGE": "10"

      }
    }
  }
}
```
Make sure yopu change the paths to match your local system's paths.

For example on MACOS and Claud, the path would be something like this:

```json
{
  "mcpServers": {
    "vestige-mcp": {
      "command": "node",
      "args": [
        " /Users/YOUR_USERNAME/Library/Application\ Support/Claude/mcp-servers/vestige-mcp/packages/server/dist/index.js"
     ]
    }
  }
}
```

## Project Structure

```
vestige-mcp/
├── packages/
│   ├── client/               # Client library for Vestige MCP (Work in Progress)
│   │   ├── src/
│   │   │   ├── env.ts       # Client environment configuration
│   │   │   ├── index.ts     # Client entry point
│   │   │   └── LocalWallet.ts
│   │   └── package.json
│   │
│   └── server/              # MCP server implementation
│       ├── src/
│       │   ├── tools/       # API tool implementations
│       │   │   └── apiManager/
│       │   │       └── vestige/  # Vestige API endpoints
│       │   ├── utils/       # Utility functions
│       │   ├── resources/   # Resource definitions
│       │   ├── env.ts       # Server environment configuration
│       │   └── index.ts     # Server entry point
│       └── package.json
```

## Features

### Network Analytics
- View network status and statistics
- Track blockchain synchronization
- Monitor network performance

### Protocol Tracking
- Access data for major DeFi protocols
- Track Total Value Locked (TVL)
- Monitor protocol activity and usage

### Asset Analytics
- Comprehensive asset information
- Price tracking and history
- Volume and liquidity metrics
- Market capitalization data
- Asset composition analysis

### Trading Data
- Real-time swap monitoring
- Historical trade data
- Price charts and candles
- Order book depth

### Pool Analytics
- Liquidity pool information
- Pool composition
- Volume and TVL tracking
- Historical pool data

## Development

### Starting the Server

```bash
cd packages/server
npm run dev
```


## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
