import { Contract, ethers } from "ethers";
import create from "zustand";
import { RewardityManager } from "./typechain-types";
import ManagerContract from "./contracts/RewardityManager.json";

interface GlobalState {
  provider: any;
  manager: any;
  userAddress: string;
  setProvider: (provider: any) => void;
  setUserAddress: (address: string) => void;
  setManager: () => void;
}

const MANAGER_CONTRACT = "0x24378a8CE7d01c586b031ceBfaA5F45de0DFb8CF";

export const useGlobalState = create<GlobalState>((set, get) => ({
  provider: undefined,
  manager: undefined,
  userAddress: "",
  setProvider: (provider: any) => set({ provider }),
  setUserAddress: (address: string) => set({ userAddress: address }),
  setManager: () => {
    const managerContract = new ethers.Contract(
      MANAGER_CONTRACT,
      ManagerContract.abi,
      get().provider.getSigner()
    ) as RewardityManager;

    set({ manager: managerContract });
  },
}));
