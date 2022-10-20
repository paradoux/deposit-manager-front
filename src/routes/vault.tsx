import React from "react";
import { useParams } from "react-router-dom";

const Vault = () => {
  let { vaultId } = useParams();
  return (
    <div>
      <h2>Vault id: {vaultId}</h2>
    </div>
  );
};

export { Vault };
