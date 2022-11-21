import { shortenAddress, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { Button } from "../components/Button";
import { ShadowBox } from "../components/shadow-box";
import { VaultAction } from "../components/vault-action/vault-action";
import { VaultType } from "./vaults";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaCopy } from "react-icons/fa";

const Vault = () => {
  const notify = () => toast.success("copied to clipboard");

  const { account, activateBrowserWallet } = useEthers();
  const { vaultAddress } = useParams();
  const [vaultDetails, setVaultDetails] = useState<VaultType>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setError(false);
    // React advises to declare the async function directly inside useEffect
    async function getVaultDetails(vaultAddress: string) {
      setIsLoading(true);
      try {
        const vaultDetails = await fetch(
          "https://deposit-manager-functions.netlify.app/.netlify/functions/vault-read?" +
            new URLSearchParams({
              vaultAddress: vaultAddress,
            })
        );

        const parsedVaultDetails = await vaultDetails.json();

        setVaultDetails(parsedVaultDetails);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    if (!!account) {
      getVaultDetails(vaultAddress as string);
    }
  }, [account, vaultAddress]);

  if (isLoading) {
    return (
      <div className="w-screen flex justify-center items-center">
        <BeatLoader color="#3b82f6" loading={true} />
      </div>
    );
  }

  if (!vaultDetails || error) {
    return (
      <div className="w-screen flex justify-center items-center">
        <h1 className="text-4xl pt-6 font-mono text-center">
          Cannot find vault
        </h1>
      </div>
    );
  }

  return !account ? (
    <Button
      onClick={() => activateBrowserWallet()}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </Button>
  ) : (
    <div className="w-full flex flex-col items-center justify-center font-wotfard">
      <ShadowBox className="flex flex-col items-center">
        <h1 className="text-4xl pt-6 font-mono">Your vault</h1>
        <div className="card max-w-2xl m-2 py-6 rounded-lg lg:text-3xl">
          <p className="mb-2 text-zinc-400">
            Owner wallet:
            <span
              className="float-right text-white"
              title="Copy Command To Clipboard"
            >
              {shortenAddress(vaultDetails.propertyOwner)}
              <CopyToClipboard
                text={vaultDetails.propertyOwner}
                onCopy={notify}
              >
                <FaCopy className="inline-block relative -top-1.5 ml-1 cursor-pointer text-sm hover:text-gray-400" />
              </CopyToClipboard>
            </span>
          </p>

          <p className="mb-2 text-zinc-400">
            Renter wallet:{" "}
            <span
              className="float-right text-white"
              title="Copy Command To Clipboard"
            >
              {shortenAddress(vaultDetails.propertyRenter)}
              <CopyToClipboard
                text={vaultDetails.propertyRenter}
                onCopy={notify}
              >
                <FaCopy className="inline-block relative -top-1.5 ml-1 cursor-pointer text-sm hover:text-gray-400" />
              </CopyToClipboard>
            </span>
          </p>
          <p className="mb-2 text-zinc-400">
            Deposit amount:
            <span className="float-right text-white">{utils.formatEther(vaultDetails.deposit.hex)}</span>
          </p>
          <p className="mb-2 text-zinc-400">
            End of rental period:
            <span className="float-right text-white ml-20">
            {new Date(vaultDetails.rentalPeriodEnd * 1000).toLocaleString([], {
              dateStyle: "long",
            })}
            </span>
          </p>
          {utils.formatEther(vaultDetails.amountToReturn.hex) !== "0.0" && (
            <p className="mb-2 text-zinc-400">
              Proposed amount to return:
              <span className="float-right text-white">{utils.formatEther(vaultDetails.amountToReturn.hex)}</span>
            </p>
          )}
          <div className="mt-8 pt-8 flex flex-col justify-between items-center border-t-2 border-slate-200">
            <p className="text-zinc-400">Vault status:</p>
            <p className="border p-2 mt-4 text-orange-300 border rounded-lg">
              {deriveVaultStatus(vaultDetails)}
            </p>
          </div>
        </div>
        <VaultAction VaultDetails={vaultDetails} />
        <Toaster />
      </ShadowBox>
    </div>
  );
};

const deriveVaultStatus = (vaultDetails: VaultType): string => {
  if (!vaultDetails.isDepositStored) {
    return "Awaiting deposit";
  }

  if (Math.floor(Date.now() / 1000) < vaultDetails.rentalPeriodEnd) {
    return "Rental ongoing";
  }

  if (!vaultDetails.isAmountAccepted) {
    return "Awaiting agreement";
  }

  if (
    !vaultDetails.isRenterChunkReturned ||
    (vaultDetails.deposit.hex !== vaultDetails.amountToReturn.hex &&
      !vaultDetails.isOwnerChunkReturned)
  ) {
    return "Deposit ready to withdraw";
  }

  return "Vault closed";
};

export { Vault };
