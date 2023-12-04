import { MetaMaskInpageProvider } from "@metamask/providers";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }

  namespace NodeJS {
    interface ProcessEnv {
      CONTRACT_ADDRESS: string;
      NODE_ENV: 'development' | 'production';
    }
  }
}