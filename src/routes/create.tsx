import { useEthers } from "@usedapp/core";
import { Button } from "../components/Button";
import CreateVaultForm from "../components/create-vault-form/create-vault-form";
import { ShadowBox } from "../components/shadow-box";

const Create = () => {
  const { account, activateBrowserWallet } = useEthers();

  return !account ? (
    <div className="w-full relative px-4 md:flex md:items-center md:justify-center">
    <div className="border border-gray-900 rounded-lg md:max-w-md md:mx-auto p-20 fixed inset-x-0 bottom-0 z-50 mb-4 mx-4 md:relative">
      <Button
        onClick={() => activateBrowserWallet()}
        className="cta-button connect-wallet-button"
      >
        Connect to Wallet
      </Button>
    </div>
  </div>
  ) : (
    <div className="flex flex-1 flex-col items-center justify-center text-white font-bold">
      <ShadowBox>
        <h1 className="flex justify-center mb-6 text-4xl font-wotfard">
          Create a vault
        </h1>
        <CreateVaultForm />
      </ShadowBox>
    </div>
  );
};

export { Create };
