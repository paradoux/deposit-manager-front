import React from "react";
import { useParams } from "react-router-dom";

const Vault = () => {
  let { vaultId } = useParams();
  return (
    <main>
      <h2>Vault id: {vaultId}</h2>
    </main>
  );
};

export { Vault };
