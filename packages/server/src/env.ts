interface EnvConfig {
  // Algorand Configuration
  algorand_network: string;
  algorand_algod: string;
  algorand_algod_port: string;
  algorand_token: string;
  algorand_agent_wallet: string;
  // Pagination Configuration
  items_per_page: number;
  // Vestige Configuration
  vestige_api_url: string;
  vestige_api_key: string;

}

export const env: EnvConfig = {
  // Algorand Configuration
  algorand_network: process.env.ALGORAND_NETWORK || '',
  algorand_algod: process.env.ALGORAND_ALGOD || '',
  algorand_algod_port: process.env.ALGORAND_ALGOD_PORT || '',
  algorand_token: process.env.ALGORAND_TOKEN || '',
  algorand_agent_wallet: process.env.ALGORAND_AGENT_WALLET || '',
  items_per_page: parseInt(process.env.ITEMS_PER_PAGE || '5', 10),

  // Vestige Configuration
  vestige_api_url: process.env.VESTIGE_API_URL || 'https://api.vestigelabs.org',
  vestige_api_key: process.env.VESTIGE_API_KEY || '',
};
