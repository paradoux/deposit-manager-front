import { useEffect } from "react";
import { useEthers } from "@usedapp/core";
const NetworkDetection = () => {
  const { activateBrowserWallet } = useEthers();
  useEffect(() => {
    window.ethereum &&
      window.ethereum.on("chainChanged", async (switchedChainId: string) => {
        if (switchedChainId.toString() !== "0x13881") {
          await networkCheck();
          await activateBrowserWallet();
        }
      });
  }, []);
  const networkCheck = async () => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x13881" }], // chainId must be in hexadecimal numbers
      });
    } catch (switchError: any) {
      if (switchError?.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
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
            ],
          });
        } catch (addError) {
          console.error(addError);
        }
      } else {
        console.error(switchError);
      }
    }
  };
  return <></>;
};

export default NetworkDetection;
