import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Formik } from "formik";
import VaultContract from "../../utils/VaultImplementation.json";
import { Field } from "../field";
import TransactionButton from "../transaction-button";

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

  const { send, state: { status }, } = useContractFunction(vaultContract, "setAmountToReturn");

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
        <Form className="py-4 w-full" onSubmit={handleSubmit}>
          <Field
            type="number"
            name="proposedAmount"
            label="Amount (in ETH)"
            className="bg-transparent text-white"
            onChange={handleChange}
          />
          <TransactionButton status={status} buttonText="Propose new amount to return" />
        </Form>
      )}
    </Formik>
  );
};

export default ProposeAmountForm;
