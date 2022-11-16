import { useEffect, useRef } from "react";
import { useEthers } from "@usedapp/core";
import { ErrorMSG, WarningMSG } from "../../utils/messages";
const NetworkDetection = () => {
  const toastId = useRef(null);
  const { activateBrowserWallet, account } = useEthers();

  useEffect(() => {
    if (account) {
      changeNetwork();
    }
  }, [account]);

  useEffect(() => {
    window.ethereum &&
      window.ethereum.on("chainChanged", () => {
        changeNetwork();
      });
  }, []);

  const changeNetwork = async () => {
    await networkCheck();
    await activateBrowserWallet();
  };

  const networkCheck = async () => {
    if (window && window.ethereum) {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });
      if (
        currentChainId.toString() !== "0x89" &&
        currentChainId.toString() !== "0x13881"
      ) {
        try {
          WarningMSG("Please use Mumbai testnet");
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
      }
    }
  };
  return <></>;
};

export default NetworkDetection;
