import { useEthers, shortenAddress } from "@usedapp/core";
import { useEffect, useState, CSSProperties } from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/Button";
import { ShadowBox } from "../components/shadow-box";
import { utils, Contract } from "ethers";
import BeatLoader from "react-spinners/BeatLoader";
import AOS from "aos";
import "aos/dist/aos.css";
interface BigNumber {
  type: string;
  hex: string;
}

interface VaultType {
  vaultId: string;
  propertyOwner: string;
  propertyRenter: string;
  rentalPeriodEnd: number;
  deposit: BigNumber;
  amountToReturn: BigNumber;
  deployedAddress: string;
  isDepositStored: boolean;
  isAmountAccepted: boolean;
  isRenterChunkReturned: boolean;
  isOwnerChunkReturned: boolean;
}

interface VaultProps {
  name: string;
  vaultsArray: Array<VaultType>;
}

const override: CSSProperties = {
  display: "flex",
  justifyContent: "center",
  padding: "100px 0",
};

const VaultsComponent = ({ name, vaultsArray }: VaultProps) => (
  <>
    <h1 className="flex justify-center mb-6 text-4xl font-wotfard font-bold">
      {name}
    </h1>
    <div className="flex flex-col justify-center sm:flex-row">
      {vaultsArray.map((vault) => {
        return (
          <Link to={vault.deployedAddress} key={vault.deployedAddress} data-aos="zoom-y-in">
            {/* TODO: Reduce shadow size on smaller boxes */}
            <ShadowBox className="px-3 py-8 m-4">
              <h1 className="text-small mb-2 mt-0">
                Landlord address: <span className="float-right">{shortenAddress(vault.propertyOwner)}</span>
              </h1>
              <p className="my-2 text-small">
                Deposit amount: <span className="float-right">{utils.formatEther(vault.deposit.hex)}</span>
              </p>
              <p className="my-2 text-small">
                Renter address: <span className="float-right ml-12">{shortenAddress(vault.propertyRenter)}</span>
              </p>
            </ShadowBox>
          </Link>
        );
      })}
    </div>
  </>
);

const Vaults = () => {
  const { account, activateBrowserWallet } = useEthers();
  const [ownerVaults, setOwnerVaults] = useState([]);
  const [renterVaults, setRenterVaults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // React advises to declare the async function directly inside useEffect
    async function getVaults(account: string) {
      const ownerVaultResponse = fetch(
        "https://deposit-manager-functions.netlify.app/.netlify/functions/vaults-list-by-owner?" +
          new URLSearchParams({
            owner: account,
          })
      );

      const renterVaultResponse = fetch(
        "https://deposit-manager-functions.netlify.app/.netlify/functions/vaults-list-by-renter?" +
          new URLSearchParams({
            renter: account,
          })
      );
      const [ownerVaults, renterVaults] = await Promise.all([
        ownerVaultResponse,
        renterVaultResponse,
      ]);

      const [parsedOwnerVaults, parsedRenterVaults] = await Promise.all([
        ownerVaults.json(),
        renterVaults.json(),
      ]);

      setOwnerVaults(parsedOwnerVaults);
      setRenterVaults(parsedRenterVaults);

      setLoading(false);

      AOS.init({
        duration: 2000,
      });
    }

    if (!!account) {
      getVaults(account as string);
    }
  }, [account]);

  return !account ? (
    <div className="w-full relative px-4 md:flex md:items-center md:justify-center" data-aos="zoom-y-in">
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
    <div className="w-full pt-4">
      {loading ? (
        <BeatLoader color="#3b82f6" loading={loading} cssOverride={override} />
      ) : (
        <VaultsComponent name="Landlord Vaults" vaultsArray={ownerVaults} />
      )}
      <div className="flex justify-center mt-6 mb-8">
        <Link to="/create">
          {/* TODO: Refactor to make the default button */}
          <Button className="mt-16">Create your vault</Button>
        </Link>
      </div>
      {loading ? (
        <BeatLoader color="#3b82f6" loading={loading} cssOverride={override} />
      ) : (
        <VaultsComponent name="Renter Vaults" vaultsArray={renterVaults} />
      )}
    </div>
  );
};

export { Vaults };
export type { VaultType };
