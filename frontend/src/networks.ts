interface NetworkDetails {
  chainId: string;
  chainName: string;
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  rpcUrls: string[];
  blockExplorerUrls: string[];
}

export enum AvailableNetworks {
  CHAIDO = "chiado",
}

export const networks: { [network in AvailableNetworks]: NetworkDetails } = {
  chiado: {
    chainId: `0x${Number(100100).toString(16)}`,
    chainName: "Chiado Testnet",
    nativeCurrency: {
      name: "xDAI",
      symbol: "xDAI",
      decimals: 18,
    },
    rpcUrls: ["https://rpc-chiado.gnosistestnet.com"],
    blockExplorerUrls: ["https://explorer.thetatoken.org"],
  },
};
