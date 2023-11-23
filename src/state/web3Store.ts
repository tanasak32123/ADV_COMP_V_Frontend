import { create } from "zustand";
import { BrowserProvider, JsonRpcSigner } from "ethers";
import { devNull } from "os";
export interface IWeb3State {
  address: string | null;
  currentChain: number | null;
  signer: JsonRpcSigner | null;
  provider: BrowserProvider | null;
  isAuthenticated: boolean;
}

interface IWeb3Action {
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
};

export const useWeb3Store = create<IWeb3State & IWeb3Action>((set, get) => ({
  address: null,
  currentChain: null,
  signer: null,
  provider: null,
  isAuthenticated: false,
  setWallet: (payload: Partial<IWeb3State>) =>
    set((state) => ({
      ...state,
      ...payload,
    })),
  changeAccount: (address) =>
    set(() => ({
      address,
    })),
  changeNetwork: (network) =>
    set(() => ({
      currentChain: network,
    })),
  disconnect: () => set(() => ({ ...initialWeb3Value })),
}));
