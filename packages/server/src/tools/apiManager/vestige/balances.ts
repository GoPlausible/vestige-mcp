import { Tool, ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResponseProcessor } from '../../../utils/responseProcessor.js';
import { env } from '../../../env.js';

export const balanceTools: Tool[] = [
  {
    name: 'vestige_view_balances',
    description: 'Get balances by network id, protocol id and asset id',
    inputSchema: {
      type: 'object',
      properties: {
        network_id: {
          type: 'integer',
          description: 'Network ID'
        },
        protocol_id: {
          type: 'integer',
          description: 'Protocol ID'
        },
        address: {
          type: 'string',
          description: 'Optional address filter'
        },
        asset_id: {
          type: 'integer',
          description: 'Optional asset ID filter'
        },
        limit: {
          type: 'integer',
          description: 'Maximum number of results',
          default: 50,
          maximum: 250,
          minimum: 1
        },
        offset: {
          type: 'integer',
          description: 'Number of results to skip',
          default: 0,
          minimum: 0
        },
        order_by: {
          type: 'string',
          description: 'Field to order by'
        },
        order_dir: {
          type: 'string',
          description: 'Order direction (asc/desc)',
          default: 'desc',
          pattern: '^(asc|desc)$'
        }
      },
      required: ['network_id', 'protocol_id']
    }
  }
];

export const handleBalanceTools = ResponseProcessor.wrapResourceHandler(async function handleBalanceTools(args: any): Promise<any> {
  const name = args.name;
  const baseUrl = env.vestige_api_url;
  let endpoint = '';

  switch (name) {
    case 'vestige_view_balances':
      endpoint = '/balances';
      break;
    default:
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
  }

  try {
    // Add query parameters if they exist
    const queryParams = new URLSearchParams();
    for (const [key, value] of Object.entries(args)) {
      if (value !== undefined) {
        queryParams.append(key, String(value));
      }
    }
    const url = `${baseUrl}${endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new McpError(
        ErrorCode.InternalError,
        `Vestige API error: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to fetch balance data: ${error instanceof Error ? error.message : String(error)}`
    );
  }
});
