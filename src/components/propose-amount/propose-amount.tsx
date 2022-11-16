import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Formik } from "formik";
import VaultContract from "../../utils/VaultImplementation.json";
import { Field } from "../field";

interface ProposeAmountFormProps {
  vaultAddress: string;
}

export interface InitialValues {
  proposedAmount: number;
}

const initialValues: InitialValues = {
  proposedAmount: 0,
};

const ProposeAmountForm = ({ vaultAddress }: ProposeAmountFormProps) => {
  const vaultContract = new Contract(vaultAddress, VaultContract.abi) as any;

  const { send } = useContractFunction(vaultContract, "setAmountToReturn");

  return (
    <Formik
      initialValues={initialValues}
      // validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        const { proposedAmount } = values;

        const parsedProposedAmount = utils.parseEther(
          proposedAmount.toString()
        );

        send(parsedProposedAmount);

        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, handleChange }) => (
        <Form className="py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <Field
              type="number"
              name="proposedAmount"
              label="Amount (in ETH)"
              onChange={handleChange}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-block w-full px-4 py-2 mt-8 text-center text-white font-bold bg-gradient-to-r from-blue-500 to-teal-400 rounded-md shadow hover:from-teal-400 hover:to-teal-400"
          >
            Propose new amount to return
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProposeAmountForm;
