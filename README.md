# Vestige MCP

Built by [GoPlausible](https://github.com/GoPlausible)

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

## Setup

1. Clone the repository:
```bash
git clone https://github.com/your-org/vestige-mcp.git
cd vestige-mcp
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
# Copy example env files
cp packages/server/.env.example packages/server/.env
cp packages/client/.env.example packages/client/.env

# Edit the .env files with your configuration
```

 Environment variables:
- `VESTIGE_API_URL`: Vestige API endpoint (defaults to https://api.vestigelabs.org)
- `ALGORAND_*`: Algorand API configuration (defaults to MAINNET)

## Usage

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
