import { Link } from "react-router-dom";
import { ShadowBox } from "../components/shadow-box";
interface VaultProps {
  name: string;
  vaultsArray: Array<number>;
}

const VaultsComponent = ({ name, vaultsArray }: VaultProps) => (
  <>
    <h1 className="flex justify-center mb-6 text-4xl font-wotfard font-bold">
      {name}
    </h1>
    <div className="flex flex-col justify-center sm:flex-row">
      {vaultsArray.map((vault) => {
        return (
          <Link to={vault.toString()}>
            {/* TODO: Reduce shadow size on smaller boxes */}
            <ShadowBox className="px-3 py-1 mr-8">
              <h1 className="text-2xl mb-2 mt-0">Property address</h1>
              <p className="my-2">E16PZ</p>
              <div className="">Status</div>
            </ShadowBox>
          </Link>
        );
      })}
    </div>
  </>
);

const DUMMY_VAULTS: Array<number> = [1, 2, 3];

const Vaults = () => {
  return (
    <div className="w-full pt-4">
      <VaultsComponent name="Landlord Vaults" vaultsArray={DUMMY_VAULTS} />
      <div className="flex justify-center mt-6 mb-8">
        <Link to="/create">
          {/* TODO: Refactor to make the default button */}
          <button className="inline-block w-full px-4 py-2 mt-8 text-center text-white font-bold bg-gradient-to-r from-blue-500 to-teal-400 rounded-md shadow hover:from-teal-400 hover:to-teal-400">
            Create your vault
          </button>
        </Link>
      </div>

      <VaultsComponent name="Renter Vaults" vaultsArray={DUMMY_VAULTS} />
    </div>
  );
};

export { Vaults };
