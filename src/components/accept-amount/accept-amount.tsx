import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Formik } from "formik";
import VaultContract from "../../utils/VaultImplementation.json";
import { Field } from "../field";
import { Button } from "../Button";
import TransactionButton from "../transaction-button";

interface AcceptAmountButtonProps {
  vaultAddress: string;
}

const AcceptAmountButton = ({ vaultAddress }: AcceptAmountButtonProps) => {
  const vaultContract = new Contract(vaultAddress, VaultContract.abi) as any;

  const { send, state, events } = useContractFunction(
    vaultContract,
    "acceptProposedAmount"
  );

  const handleSubmit = async () => {
    await send();
  };

  return (
    <TransactionButton status={state.status} buttonText="Accept Proposed Amount" onClick={handleSubmit} />
  );
};

export default AcceptAmountButton;
