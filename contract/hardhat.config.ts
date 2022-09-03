import * as dotenv from "dotenv";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "@nomiclabs/hardhat-etherscan";

dotenv.config();

const TESTNET_PRIVATE_KEY = process.env.TESTNET_PRIVATE_KEY;

const defaultNetwork = 'gnosis';

const config: HardhatUserConfig = {
  solidity: "0.8.15",
  networks: {
    gnosis: {
      url: 'https://rpc.gnosischain.com/',
      gasPrice: 1000000000,
      accounts: [`${TESTNET_PRIVATE_KEY}`]
    },
    chiado: {
      url: 'https://rpc-chiado.gnosistestnet.com',
      gasPrice: 1000000000,
      accounts: [`${TESTNET_PRIVATE_KEY}`]
    },
  },
};

export default config;
