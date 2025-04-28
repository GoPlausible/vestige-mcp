[![smithery badge](https://smithery.ai/badge/@GoPlausible/vestige-mcp)](https://smithery.ai/server/@GoPlausible/vestige-mcp)
# Vestige MCP Server

Built by [GoPlausible](https://github.com/GoPlausible) and distilled from [Algorand MCP](https://github.com/GoPlausible/algorand-mcp).

The server component of [Vestige](https://vestige.fi) MCP, providing a comprehensive interface to the [Vestige](https://vestige.fi) API through the Model Context Protocol (MCP).

## Architecture

The server is structured around several key components:

### API Tools

Located in `src/tools/apiManager/vestige/`, each module handles specific API functionality:

```
vestige/
├── assets.ts      # Asset data and price information
├── balances.ts    # Account balance tracking
├── index.ts       # Tool registration and routing
├── networks.ts    # Network status and information
├── notes.ts       # Market notes and annotations
├── pools.ts       # Liquidity pool analytics
├── protocols.ts   # Protocol statistics and tracking
├── swaps.ts       # Swap and trading data
└── vaults.ts      # Vault information
```

### Response Processing

The `ResponseProcessor` utility (`src/utils/responseProcessor.ts`) handles:
- Pagination of large datasets
- Consistent response formatting
- Error handling
- Data transformation

## Available Tools

### Network Tools
- `api_vestige_view_networks`: Get all networks
- `api_vestige_view_network_by_id`: Get network by ID

### Protocol Tools
- `api_vestige_view_protocols`: Get all protocols
- `api_vestige_view_protocol_by_id`: Get protocol by ID
- `api_vestige_view_protocol_volumes`: Get protocol volumes

### Asset Tools
- `api_vestige_view_assets`: Get asset data
- `api_vestige_view_assets_list`: Get paginated asset list
- `api_vestige_view_assets_search`: Search assets
- `api_vestige_view_asset_price`: Get asset prices
- `api_vestige_view_asset_candles`: Get price candles
- `api_vestige_view_asset_history`: Get historical data
- `api_vestige_view_asset_composition`: Get asset composition

### Pool Tools
- `api_vestige_view_pools`: Get pool information
- Supports filtering by:
  - Protocol ID
  - Asset pairs
  - TVL ranges
  - Volume metrics

### Trading Tools
- `api_vestige_view_swaps`: Get swap transactions
  - Time range filtering
  - Protocol filtering
  - Asset filtering
  - Address filtering
  - Executor filtering
  - Denominating asset configuration

- `api_vestige_get_best_v4_swap_data`: Get optimal swap routing
  - Source/target asset selection
  - Amount specification
  - Swap mode configuration (sef/sfe)
  - Provider filtering options

- `api_vestige_get_v4_swap_discount`: Get swap fee discounts
  - Account-based discount information

- `api_vestige_get_v4_swap_data_transactions`: Get swap transaction data
  - Slippage tolerance configuration
  - Random signer support
  - Transaction building

- `api_vestige_get_aggregator_stats`: Get aggregator statistics
  - Denominating asset configuration
  - Overall performance metrics

### Balance Tools
- `api_vestige_view_balances`: Get account balances
- Filtering by:
  - Network ID
  - Protocol ID
  - Asset ID
  - Address

### Note Tools
- `api_vestige_view_notes`: Get market notes with filtering options
- `api_vestige_view_first_asset_notes`: Get first note for specific assets
- `api_vestige_view_asset_notes_count`: Get note count for assets
- Supports:
  - Network filtering
  - Asset filtering
  - Pagination
  - Custom ordering

### Vault Tools
- `api_vestige_view_vaults`: Get protocol vault information
- Filtering options:
  - Network ID
  - Protocol ID
  - Asset ID
  - Address
  - Customizable ordering
  - Pagination support

## Configuration

### Environment Variables

```typescript
interface EnvConfig {
  // Algorand Configuration
  algorand_network: string;
  algorand_algod: string;
  algorand_algod_port: string;
  algorand_token: string;
  algorand_agent_wallet_active: string;
  
  // Pagination Configuration
  items_per_page: number;
  
  // Vestige Configuration
  vestige_api_url: string;
  vestige_api_key: string;
}
```

### Example .env file

```bash
# Algorand Configuration
ALGORAND_NETWORK=mainnet
ALGORAND_ALGOD=http://localhost
ALGORAND_ALGOD_PORT=4001
ALGORAND_TOKEN=your-token-here
ALGORAND_AGENT_WALLET_ACTIVE=true

# Pagination Configuration
ITEMS_PER_PAGE=50

# Vestige Configuration
VESTIGE_API_URL=https://api.vestigelabs.org
```

## Development

### Running the Server

```bash
# Install dependencies
npm install

# Start in development mode
npm run dev

# Build for production
npm run build

# Start in production mode
npm start
```

### Adding New Tools

1. Create a new module in `src/tools/apiManager/vestige/`
2. Define tool schemas and handlers
3. Register tools in `index.ts`

Example:
```typescript
export const newTools: Tool[] = [{
  name: 'api_vestige_new_tool',
  description: 'Description of new tool',
  inputSchema: {
    type: 'object',
    properties: {
      // Define input parameters
    },
    required: ['param1']
  }
}];

export const handleNewTools = ResponseProcessor.wrapResourceHandler(
  async function handleNewTools(args: any): Promise<any> {
    // Implement tool logic
  }
);
```


## Error Handling

The server uses the MCP error system:

```typescript
throw new McpError(
  ErrorCode.InternalError,
  'Error message'
);
```

Common error codes:
- `MethodNotFound`: Unknown tool requested
- `InternalError`: API or processing error
- `InvalidInput`: Invalid parameters
- `Unauthorized`: Invalid API key

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - see the [LICENSE](../LICENSE) file for details.
