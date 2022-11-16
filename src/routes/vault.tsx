import { useEthers, shortenAddress } from "@usedapp/core";
import { CSSProperties, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../components/Button";
import { ShadowBox } from "../components/shadow-box";
import { VaultAction } from "../components/vault-action/vault-action";
import { VaultType } from "./vaults";
import { utils } from "ethers";
import { BeatLoader } from "react-spinners";


const Vault = () => {
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
  }, []);

  if (isLoading) {
    return (
      <div className="w-screen flex justify-center items-center">
        <BeatLoader color="#3b82f6" loading={true} />
      </div>);
  }


  if (!vaultDetails || error) {
    return (
      <div className="w-screen flex justify-center items-center">
        <h1 className="text-4xl pt-6 font-mono text-center">Cannot find vault</h1>
      </div>);
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
        <div className="card max-w-lg m-2 py-6 rounded-lg lg:text-3xl">
          <p className="mb-2">
            <span className="text-zinc-400">Owner wallet:</span>
            {shortenAddress(vaultDetails.propertyOwner)}
          </p>
          <p className="mb-2">
            <span className="text-zinc-400">Renter wallet:</span>
            {shortenAddress(vaultDetails.propertyRenter)}
          </p>
          <p className="mb-2">
            <span className="text-zinc-400">End of rental period:</span>
            {new Date(vaultDetails.rentalPeriodEnd * 1000).toLocaleString([], {
              dateStyle: "long",
            })}
          </p>
          {vaultDetails.amountToReturn && (
            <p className="mb-2">
              <span className="text-zinc-400">Proposed amount to return:</span>
              {utils.formatEther(vaultDetails.amountToReturn.hex)}
            </p>
          )}
          <div className="mt-8 pt-8 flex flex-col justify-between items-center border-t-2 border-slate-200">
            <p className="text-zinc-400">Vault status:</p>
            <p className="border p-2 mt-2 text-orange-300 border rounded-lg">
              {deriveVaultStatus(
                vaultDetails.isDepositStored,
                vaultDetails.rentalPeriodEnd,
                vaultDetails.isAmountAccepted,
                vaultDetails.isRenterChunkReturned,
                vaultDetails.isOwnerChunkReturned
              )}
            </p>
          </div>
        </div>
        <VaultAction VaultDetails={vaultDetails} />
      </ShadowBox>
    </div>
  );
};

const deriveVaultStatus = (
  isDepositStored: boolean,
  rentalPeriodEnd: number,
  isAmountAccepted: boolean,
  isRenterChunkReturned: boolean,
  isOwnerChunkReturned: boolean
): string => {
  if (!isDepositStored) {
    return "Awaiting deposit";
  }

  if (Math.floor(Date.now() / 1000) < rentalPeriodEnd) {
    return "Rental ongoing";
  }

  if (!isAmountAccepted) {
    return "Awaiting agreement";
  }

  if (!isRenterChunkReturned || !isOwnerChunkReturned) {
    return "Deposit ready to withdraw";
  }

  return "Vault closed";
};

export { Vault };
