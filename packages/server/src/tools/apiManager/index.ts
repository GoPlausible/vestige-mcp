
import { vestigeTools, handleVestigeTools } from './vestige/index.js';
import { ErrorCode, McpError } from '@modelcontextprotocol/sdk/types.js';
import { ResponseProcessor } from '../../utils/responseProcessor.js';

// Combine all API tools
export const apiManager = [
  ...vestigeTools,
];

// Handle all API tools
export async function handleApiManager(name: string, args: any): Promise<any> {
  try {
    let response;

    // Vestige tools
    if (name.startsWith('api_vestige_')) {
      response = await handleVestigeTools(name, args);
    } else {
      throw new McpError(
        ErrorCode.MethodNotFound,
        `Unknown tool: ${name}`
      );
    }

    // Process and format the response
    return ResponseProcessor.processResponse(response, args?.pageToken);

  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to handle resource tool: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}
