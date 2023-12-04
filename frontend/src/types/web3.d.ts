import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }

  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_CONTRACT_ADDRESS: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}