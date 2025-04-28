import algosdk from 'algosdk';
import { env } from './env.js';
// Initialize the Algod client with base URL
export const algodClient = new algosdk.Algodv2(
  env.algorand_token || '',
  env.algorand_algod,
  env.algorand_algod_port || ''
);
