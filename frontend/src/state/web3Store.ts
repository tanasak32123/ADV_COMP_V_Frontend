import { create } from "zustand";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { persist } from "zustand/middleware";

export interface IWeb3State {
  address: string | null;
  currentChain: number | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  isAuthenticated: boolean;
  // isDealer: boolean;
}

export interface IWeb3Action {
  setWallet: (payload: Partial<IWeb3State>) => void;
  changeAccount: (address: string) => void;
  disconnect: () => void;
  changeNetwork: (network: number) => void;
}

const initialWeb3Value = {
  address: null,
  currentChain: null,
  signer: null,
  provider: null,
  isAuthenticated: false,
  // isDealer: false,
};

export type TWeb3Store = IWeb3State & IWeb3Action;

export const useWeb3Store = create<TWeb3Store>()(
  persist(
    (set) => ({
      ...initialWeb3Value,
      setWallet: (payload: Partial<IWeb3State>) =>
        set((state) => ({
          ...state,
          ...payload,
        })),
      changeAccount: (address) =>
        set((state) => ({
          ...state,
          address,
        })),
      changeNetwork: (network) =>
        set((state) => ({
          ...state,
          currentChain: network,
        })),
      disconnect: () => set(() => ({ ...initialWeb3Value })),
    }),
    {
      name: "wallet",
    }
  )
);
