import create from "zustand";
import { AvailableNetworks } from "../constants/networks";

interface NetworkStore {
  network: AvailableNetworks;
  setNetwork: (network: AvailableNetworks) => void;
}

export const useNetwork = create<NetworkStore>((set) => ({
  network:
    process.env.NODE_ENV === "development"
      ? AvailableNetworks.LOCAL
      : AvailableNetworks.MUMBAI,
  setNetwork: (network) => set({ network }),
}));
