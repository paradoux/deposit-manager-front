import { useEthers, shortenAddress } from "@usedapp/core"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Button } from "../components/Button"
import { ShadowBox } from "../components/shadow-box"
import { VaultType } from "./vaults"

const Vault = () => {
  const { account, activateBrowserWallet } = useEthers()
  const { vaultAddress } = useParams()
  const [vaultDetails, setVaultDetails] = useState<VaultType>()

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getVaultDetails(vaultAddress: string) {
      const vaultDetails = await fetch(
        "https://deposit-manager-functions.netlify.app/.netlify/functions/vault-read?" +
          new URLSearchParams({
            vaultAddress: vaultAddress
          })
      )

      const parsedVaultDetails = await vaultDetails.json()

      setVaultDetails(parsedVaultDetails)
    }

    if (!!account) {
      getVaultDetails(vaultAddress as string)
    }
  }, [])

  if (!vaultDetails) {
    return <h1 className="text-4xl pt-6 font-mono">Cannot find vault</h1>
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
            {new Date(vaultDetails.rentalPeriodEnd * 1000).toLocaleString()}
          </p>
          <div className="mt-8 pt-8 flex flex-col justify-between items-center border-t-2 border-slate-200">
            <p className="text-zinc-400">Vault status:</p>
            <p className="border p-2 mt-2 text-orange-300 border rounded-lg">
              Waiting for deposit
            </p>
          </div>
        </div>
        <button className="px-4 py-2 mb-6 text-center text-white font-bold bg-sky-500 rounded-md shadow hover:bg-sky-600">
          xxxx
        </button>
      </ShadowBox>
    </div>
  )
}

export { Vault }
