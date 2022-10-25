import React from "react";
// import { useParams } from "react-router-dom";
import { ShadowBox } from "../components/shadow-box";

const Vault = () => {
  // let { vaultId } = useParams();
  return (
    <div className="mt-12 lg:mt-8 w-full flex flex-col items-center font-wotfard">
      <ShadowBox className="p-10 mx-2 flex flex-col items-center">
        <h1 className="text-4xl py-6 font-mono">Your vault</h1>
        <div className="card max-w-lg m-2 p-6 rounded-lg lg:text-2xl">
          <p className="mb-2"><span className="text-zinc-400">Owner name:</span> Bob Vance</p>
          <p className="mb-2"><span className="text-zinc-400">Owner wallet:</span> a2jsh432s9wx</p>
          <p className="mb-2"><span className="text-zinc-400">Renter wallet:</span> 224sh432s9wx</p>
          <p className="mb-2"><span className="text-zinc-400">Property address:</span> 0x123…abc</p>
          <p className="mb-2"><span className="text-zinc-400">End of rental period:</span> 21/06/2023</p>
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
  );
};

export { Vault };
