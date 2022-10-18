import { useContext, useState } from "react";
import { Web3Context } from "../context/web3-context";

const useAccount = () => {
  const [account, setAccount] = useState<any>();
  const { provider } = useContext(Web3Context);

  const connectWallet = async () => {
    try {
      const accounts = await provider?.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
    } catch (e) {
      console.error(e);
    }
  };

  return { connectWallet, account };
};

export { useAccount };
