import { Formik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import CreateVaultForm from "../components/create-vault-form/create-vault-form";
import { ShadowBox } from "../components/shadow-box";

const Create = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center text-white font-bold">
      <ShadowBox>
        <h1 className="flex justify-center mb-6 text-4xl font-wotfard">
          Create a vault
        </h1>
        <h4 className="text-lg font-wotfard">Fill in your vault details</h4>
        <CreateVaultForm />
      </ShadowBox>
    </div>
  );
};

export { Create };
