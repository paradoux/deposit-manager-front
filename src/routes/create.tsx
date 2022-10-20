import { Formik } from "formik";
import CreateVaultForm from "../components/create-vault-form/create-vault-form";

const Create = () => {
  return (
    <div className="flex flex-1 flex-col items-center text-black font-bold">
      <h1 className="flex justify-center py-6 text-4xl font-semibold">
        Create a vault
      </h1>
      <h3 className="mb-6 text-2xl">Fill in your vault details</h3>
      <CreateVaultForm />
    </div>
  );
};

export { Create };
