import { useEthers } from "@usedapp/core"
import { Button } from "../components/Button"
import CreateVaultForm from "../components/create-vault-form/create-vault-form"
import { ShadowBox } from "../components/shadow-box"

const Create = () => {
  const { account, activateBrowserWallet } = useEthers()
  return !account ? (
    <Button
      onClick={() => activateBrowserWallet()}
      className="cta-button connect-wallet-button"
    >
      Connect to Wallet
    </Button>
  ) : (
    <div className="flex flex-1 flex-col items-center justify-center text-white font-bold">
      <ShadowBox>
        <h1 className="flex justify-center mb-6 text-4xl font-wotfard">
          Create a vault
        </h1>
        <CreateVaultForm />
      </ShadowBox>
    </div>
  )
}

export { Create }
