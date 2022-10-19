import { Link } from "react-router-dom";

const DUMMY_VAULTS = [1, 2, 3];

const Vaults = () => {
  return (
    <main>
      {/* Landlord vaults */}
      <h1 className="flex justify-center text-3xl text-gray-500 py-6">
        Landlord vaults
      </h1>
      <div className="flex justify-center">
        {DUMMY_VAULTS.map((vault) => {
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

      <div className="flex justify-center py-24">
        <Link to="/create">
          <button className="text-2xl bg-sky-500 text-white	px-4 py-2 rounded-md shadow hover:bg-sky-600">
            Create Vault
          </button>
        </Link>
      </div>

      {/* Renter vaults */}
      <h1 className="flex justify-center text-3xl text-gray-500 py-6">
        Renter vaults
      </h1>
      <div className="flex justify-center">
        {DUMMY_VAULTS.map((vault) => {
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
    </main>
  );
};

export { Vaults };
