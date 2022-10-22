import { Formik } from "formik";
import CreateVaultForm from "../components/create-vault-form/create-vault-form";
import { ParticlesBackground } from "../components/particles-background";

const Create = () => {
  return (
    <>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          width: "100%",
          zIndex: -999,
        }}
      >
        <ParticlesBackground />
      </div>
      <div className="flex flex-1 flex-col items-center text-black font-bold">
        <div className="bg-[#FAF9F6] px-8 py-2 rounded-md">
          <h1 className="flex justify-center py-6 text-4xl font-wotfard">
            Create a vault
          </h1>
          <h3 className="mb-6 text-2xl font-wotfard">
            Fill in your vault details
          </h3>
          <CreateVaultForm />
        </div>
      </div>
    </>
  );
};

export { Create };
