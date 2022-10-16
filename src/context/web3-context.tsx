import { createContext, useContext, useEffect, useState } from "react";
import { ethers, providers } from "ethers";

interface Web3State {
  provider: providers.Web3Provider | null;
}

interface Web3ProviderProps {
  children: React.ReactNode;
}

const Web3Context = createContext<Web3State>({ provider: null });

const Web3Provider = ({ children }: Web3ProviderProps) => {
  const [values, setValues] = useState<Web3State>({ provider: null });

  useEffect(() => {
    if (window?.ethereum as any) {
      const provider = new ethers.providers.Web3Provider(
        window?.ethereum as any
      );
      setValues({ provider });
    }
  }, []);

  return <Web3Context.Provider value={values}>{children}</Web3Context.Provider>;
};

export { Web3Context, Web3Provider };