import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Formik } from "formik";
import VaultContract from "../../utils/VaultImplementation.json";
import { Field } from "../field";
import { Button } from "../Button";
import TransactionButton from "../transaction-button";
import { stat } from "fs";

interface SendDepositButtonProps {
  vaultAddress: string;
  depositAmount: string;
}

const SendDepositButton = ({
  vaultAddress,
  depositAmount,
}: SendDepositButtonProps) => {
  const vaultContract = new Contract(vaultAddress, VaultContract.abi) as any;

  const { send, state, events } = useContractFunction(
    vaultContract,
    "storeDeposit"
  );

  const handleSubmit = async () => {
    await send({ value: depositAmount });
  };

  return (
    <TransactionButton status={state.status} buttonText="Send deposit" onClick={handleSubmit} />
  );
};

export default SendDepositButton;
