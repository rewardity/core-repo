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

const MANAGER_CONTRACT = "0xB021c9Ada326Ed7e7B2a395bf5D06abca0302fC0";

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
