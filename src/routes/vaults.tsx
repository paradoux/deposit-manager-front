import { Link } from "react-router-dom";
interface VaultProps {
  name: string;
  vaultsArray: Array<number>
}

const VaultsComponent = ({name, vaultsArray}: VaultProps) => (
  <>
    <h1 className="flex justify-center text-3xl text-gray-500 py-6">
      {name}
    </h1><div className="flex flex-col justify-center sm:flex-row">
        {vaultsArray.map((vault) => {
          return (
            <Link to={vault.toString()}>
              <div className="border rounded text-black p-5 m-5 text-center	rounded-lg shadow-lg">
                <h1 className="text-2xl mb-2">Property address</h1>
                <p className="m-2">E16PZ</p>
                <div className="border bg-gray-200">Status</div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
);

const DUMMY_VAULTS:Array<number> = [1, 2, 3];

const Vaults = () => {
  return (
    <main>
      <VaultsComponent name="Landlord vaults" vaultsArray={DUMMY_VAULTS}/>

      <div className="flex justify-center py-24">
        <Link to="/create">
          <button className="text-2xl bg-sky-500 text-white	px-4 py-2 rounded-md shadow hover:bg-sky-600">
            Create Vault
          </button>
        </Link>
      </div>

      <VaultsComponent name="Renter vaults" vaultsArray={DUMMY_VAULTS}/>
    </main>
  );
};

export { Vaults };
