import { ethers } from "ethers";
import { useCallback, useState } from "react";

import { networks } from "../constants/networks";
import { useNetwork } from "../stores/useNetworks";
import { useProvider } from "../stores/useProvider";
import { useUserData } from "../stores/useUserData";

type useWalletType = [
  isConnecting: boolean,
  connectWallet: () => void,
  disconnectWallet: () => void
];

export const useWallet = (): useWalletType => {
  const [isConnecting, setIsConnecting] = useState<boolean>(false);
  const login = useUserData((state) => state.login);
  const logout = useUserData((state) => state.logout);
  const setProvider = useProvider((state) => state.setProvider);

  const connectWallet = useCallback(async () => {
    try {
      setIsConnecting(true);
      if (!window.ethereum) throw new Error("Cannot find MetaMask");

      // Switch networks
      await window.ethereum.request({
        method: "wallet_addEthereumChain",
        params: [
          {
            ...networks[useNetwork.getState().network],
          },
        ],
      });

      // Set up wallet
      const provider = new ethers.providers.Web3Provider(
        window.ethereum,
        "any"
      );
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      if (!signer) throw new Error("Metamask is not connected");

      login(address);
      setProvider(provider);
      setIsConnecting(false);
    } catch (error: any) {
      // toast.error(error.message);
      setIsConnecting(false);
    }
  }, [login, setProvider]);

  const disconnectWallet = () => {
    logout();
  };

  return [isConnecting, connectWallet, disconnectWallet];
};
