import { Contract, ethers } from "ethers";
import create from "zustand";
import { CrumbsRewardManager } from "./contracts/CrumbsRewardManager";
import ManagerContract from "./contracts/CrumbsRewardManager.json";

interface GlobalState {
  provider: any;
  manager: any;
  userAddress: string;
  setProvider: (provider: any) => void;
  setUserAddress: (address: string) => void;
  setManager: () => void;
}

const MANAGER_CONTRACT = "0xA30Cbc8351a7FfceE43A414BB197b296c1979767";

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
    ) as CrumbsRewardManager;

    set({ manager: managerContract });
  },
}));
