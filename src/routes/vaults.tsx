import { Link } from "react-router-dom";

const DUMMY_VAULTS = [1, 2, 3];

const Vaults = () => {
  return (
    <main>
      <h2>Vaults</h2>
      <div>
        {DUMMY_VAULTS.map((vault) => {
          return <Link to={vault.toString()}>{vault}</Link>;
        })}
      </div>
    </main>
  );
};

export { Vaults };
