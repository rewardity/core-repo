import create from "zustand";
import { RewardityManager } from "../contracts/typechain";

interface ContractStore {
  manager: RewardityManager | undefined;
  setManager: (manager: RewardityManager) => void;
}

export const useContracts = create<ContractStore>((set) => ({
  manager: undefined,
  setManager: (manager: RewardityManager) => set(() => ({ manager })),
}));
