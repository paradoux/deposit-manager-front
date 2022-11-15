import { useEthers, shortenAddress } from "@usedapp/core"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Button } from "../components/Button"
import { ShadowBox } from "../components/shadow-box"
import { utils, Contract } from "ethers"

interface BigNumber {
  type: string
  hex: string
}

interface VaultType {
  vaultId: string
  propertyOwner: string
  propertyRenter: string
  rentalPeriodEnd: number
  deposit: BigNumber
  amountToReturn: BigNumber
  deployedAddress: string
  isDepositStored: boolean
  isAmountAccepted: boolean
  isRenterChunkReturned: boolean
  isOwnerChunkReturned: boolean
}

interface VaultProps {
  name: string
  vaultsArray: Array<VaultType>
}

const VaultsComponent = ({ name, vaultsArray }: VaultProps) => (
  <>
    <h1 className="flex justify-center mb-6 text-4xl font-wotfard font-bold">
      {name}
    </h1>
    <div className="flex flex-col justify-center sm:flex-row">
      {vaultsArray.map((vault) => {
        return (
          <Link to={vault.deployedAddress} key={vault.deployedAddress}>
            {/* TODO: Reduce shadow size on smaller boxes */}
            <ShadowBox className="px-3 py-8 m-4">
              <h1 className="text-2xl mb-2 mt-0">
                {shortenAddress(vault.propertyOwner)}
              </h1>
              <p className="my-2">
                {`Deposit amount: ${utils.formatEther(vault.deposit.hex)}`}
              </p>
              <p className="my-2">
                Renter address: {shortenAddress(vault.propertyRenter)}
              </p>
            </ShadowBox>
          </Link>
        )
      })}
    </div>
  </>
)

const Vaults = () => {
  const { account, activateBrowserWallet } = useEthers()
  const [ownerVaults, setOwnerVaults] = useState([])
  const [renterVaults, setRenterVaults] = useState([])

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getVaults(account: string) {
      const ownerVaultResponse = fetch(
        "https://deposit-manager-functions.netlify.app/.netlify/functions/vaults-list-by-owner?" +
          new URLSearchParams({
            owner: account
          })
      )

      const renterVaultResponse = fetch(
        "https://deposit-manager-functions.netlify.app/.netlify/functions/vaults-list-by-renter?" +
          new URLSearchParams({
            renter: account
          })
      )
      const [ownerVaults, renterVaults] = await Promise.all([
        ownerVaultResponse,
        renterVaultResponse
      ])

      const [parsedOwnerVaults, parsedRenterVaults] = await Promise.all([
        ownerVaults.json(),
        renterVaults.json()
      ])

      setOwnerVaults(parsedOwnerVaults)
      setRenterVaults(parsedRenterVaults)
    }

    if (!!account) {
      getVaults(account as string)
    }
  }, [])

  return !account ? (
    <Button
      onClick={() => activateBrowserWallet()}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </Button>
  ) : (
    <div className="w-full pt-4">
      <VaultsComponent name="Landlord Vaults" vaultsArray={ownerVaults} />
      <div className="flex justify-center mt-6 mb-8">
        <Link to="/create">
          {/* TODO: Refactor to make the default button */}
          <Button className="mt-8">Create your vault</Button>
        </Link>
      </div>

      <VaultsComponent name="Renter Vaults" vaultsArray={renterVaults} />
    </div>
  )
}

export { Vaults }
export type { VaultType }
