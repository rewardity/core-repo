import { AvailableNetworks } from "./networks";

interface DeployedContracts {
  MANAGER: string;
}

export const contractAddresses: {
  [network in AvailableNetworks]: DeployedContracts;
} = {
  local: {
    MANAGER: "0xB021c9Ada326Ed7e7B2a395bf5D06abca0302fC0",
  },
  mumbai: {
    MANAGER: "0xB021c9Ada326Ed7e7B2a395bf5D06abca0302fC0",
  },
};
