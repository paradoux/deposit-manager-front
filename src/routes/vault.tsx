import React, {useState} from "react";
// import { useParams } from "react-router-dom";
import { ShadowBox } from "../components/shadow-box";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import toast, { Toaster } from 'react-hot-toast';


const Vault = () => {
  // let { vaultId } = useParams();
  const notify = () => toast.success("copied to clipboard")
  return (
    <div className="w-full flex flex-col items-center justify-center font-wotfard">
      <ShadowBox className="flex flex-col items-center">
        <h1 className="text-4xl pt-6 font-mono">Your vault</h1>
        <div className="card max-w-lg m-2 py-6 rounded-lg lg:text-3xl">
          <p className="mb-2"><span className="text-zinc-400">Owner name:</span> Bob Vance</p>
          <p className="mb-2"><span className="text-zinc-400">Owner wallet:</span> <CopyToClipboard text="0x123…abc" onCopy={notify}><span className="cursor-pointer hover:text-green-200" title="Copy Command To Clipboard">0x123…abc</span></CopyToClipboard></p>
          <p className="mb-2"><span className="text-zinc-400">Renter wallet:</span> <CopyToClipboard text="0x123…abc2" onCopy={notify}><span className="cursor-pointer hover:text-green-200" title="Copy Command To Clipboard">0x123…abc</span></CopyToClipboard></p>
          <p className="mb-2"><span className="text-zinc-400">Property address:</span> E16PZ</p>
          <p className="mb-2"><span className="text-zinc-400">End of rental period:</span> 21/06/2023</p>
          <div className="mt-8 pt-8 flex flex-col justify-between items-center border-t-2 border-slate-200">
            <p className="text-zinc-400">Vault status:</p>
            <p className="border p-2 mt-2 text-orange-300 border rounded-lg">
              Waiting for deposit
            </p>
          </div>
        </div>
        <button className="base-button px-4 py-2 mb-6 text-center text-white font-bold rounded-md shadow hover:bg-sky-600">
          xxxx
        </button>
      </ShadowBox>
      <Toaster />
    </div>
  );
};

export { Vault };
