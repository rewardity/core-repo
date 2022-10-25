import { ethers } from "ethers";
import { AsyncActionState } from "../types/states/asyncActionState";
import { useContracts } from "../stores/useContracts";
import ManagerContract from "../contracts/artifacts/contracts/RewardityManager.sol/RewardityManager.json";
import { useCallback, useEffect, useState } from "react";
import { useProvider } from "../stores/useProvider";
import { contractAddresses } from "../constants/contracts";
import { useNetwork } from "../stores/useNetworks";
import { RewardityManager } from "../contracts/typechain";

export const useApplicationInitialization = () => {
  const [initializationStatus, setInitializationStatus] =
    useState<AsyncActionState>({ status: undefined });
  const provider = useProvider((state) => state.provider);

  const initializeApplication = useCallback(async () => {
    try {
      setInitializationStatus({ status: "loading" });
      console.log("Setting factory contract");
      if (!provider) throw new Error("Provider is unexpectedly undefined");

      // Application initalization goes here

      // Initialize manager contract instance
      const managerContract = new ethers.Contract(
        contractAddresses[useNetwork.getState().network].MANAGER,
        ManagerContract.abi,
        provider.getSigner()
      ) as RewardityManager;

      // Push initialized state
      useContracts.getState().setManager(managerContract);

      setInitializationStatus({ status: "succeeded" });
    } catch (error: any) {
      if (error instanceof Error) {
        return setInitializationStatus({ status: "failed", error });
      }

      setInitializationStatus({
        status: "failed",
        error: new Error("Failed to initialize application"),
      });
    }
  }, [provider]);

  useEffect(() => {
    if (provider && initializationStatus.status === undefined) {
      initializeApplication();
    }
  }, [provider, initializationStatus, initializeApplication]);

  return initializationStatus;
};
