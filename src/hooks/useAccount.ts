import { useContext, useEffect, useState } from "react";
import { Web3Context } from "../context/web3-context";

const useAccount = () => {
  const [account, setAccount] = useState<any>();
  const { provider } = useContext(Web3Context);

  useEffect(() => {
    window.ethereum &&
      window.ethereum.on("accountsChanged", (accounts: string) => {
        setAccount(accounts[0]);
      });
    window.ethereum &&
      window.ethereum.on("chainChanged", () => {
        networkCheck();
      });
  }, [provider]);

  const networkCheck = async () => {
    const chainId = await provider?.send("eth_chainId", []);
    if (chainId !== "0x13881") {
      try {
        await provider?.send("wallet_switchEthereumChain", [
          { chainId: "0x13881" },
        ]);
      } catch (switchError: any) {
        if (switchError?.code === 4902) {
          try {
            await provider?.send("wallet_addEthereumChain", [
              {
                chainId: "0x13881",
                chainName: "Mumbai Testnet",
                rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
              },
            ]);
          } catch (addError) {
            console.log(addError);
          }
        }
        console.log(switchError);
      }
    }
  };

  const connectWallet = async () => {
    try {
      networkCheck();
      const accounts = await provider?.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (e) {
      console.log(e);
    }
  };

  return { connectWallet, account };
};

export { useAccount };
