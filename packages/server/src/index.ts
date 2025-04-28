#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import {

  apiManager,
  handleApiManager,

} from './tools/index.js';
import { ResourceManager } from './resources/index.js';

class AlgorandMcpServer {
  private server: Server;
  private name: string;

  constructor(name = 'algorand-mcp-server', version = '1.0.0') {
    this.name = name;
    this.server = new Server(
      {
        name,
        version,
      },
      {
        capabilities: {
          resources: {
            schemas: ResourceManager.schemas
          },
          tools: {
            schemas: {
            
             
              // API Tools
              ...apiManager.reduce((acc, tool) => ({
                ...acc,
                [tool.name]: tool.inputSchema
              }), {}),
           
            }
          },
        },
      }
    );

    this.setupResourceHandlers();
    this.setupToolHandlers();
    
    // Error handling
    this.server.onerror = (error) => console.error('[MCP Error]', error);
    process.on('SIGINT', async () => {
      await this.server.close();
      process.exit(0);
    });
  }

  private setupResourceHandlers() {
    // Implement resources/list method
    this.server.setRequestHandler(ListResourcesRequestSchema, async () => {
      return {
        resources: ResourceManager.resources.map(resource => ({
          uri: resource.uri,
          name: resource.name,
          description: resource.description,
          mimeType: 'application/json',
          schema: ResourceManager.schemas[resource.uri]
        }))
      };
    });

    // Handle resource reads
    this.server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
      if (!request.params?.uri) {
        throw new McpError(ErrorCode.InvalidRequest, 'URI parameter is required');
      }
      return await ResourceManager.handleResource(request.params.uri);
    });
  }

  private setupToolHandlers() {
    // List available tools
    this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
      tools: [
        // API Tools
        ...apiManager,
      ],
    }));

    // Handle tool calls
    this.server.setRequestHandler(CallToolRequestSchema, async (request) => {
      const { name, arguments: args = {} } = request.params;
      // Handle API tools
      if (name.startsWith('api_')) {
        return handleApiManager(name, args);
      }
      throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    });
  }

  async run() {
    const transport = new StdioServerTransport();
    await this.server.connect(transport);
    console.error(`${this.name} running on stdio`);
  }
}

const server = new AlgorandMcpServer();
server.run().catch(console.error);
