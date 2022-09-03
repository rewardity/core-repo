import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY;
const POLYGON_SCAN_API_KEY = process.env.POLYGON_SCAN_API_KEY;

const defaultNetwork = 'chiado';

const config: HardhatUserConfig = {
  solidity: "0.8.15",
  networks: {
    chiado: {
      url: 'https://rpc-chiado.gnosistestnet.com',
      gasPrice: 1000000000,
      accounts: [`${TESTNET_PRIVATE_KEY}`]
    },
  },
  etherscan: {
    apiKey: {
      chiado: `${POLYGON_SCAN_API_KEY}`,
    }
  },
};

export default config;
