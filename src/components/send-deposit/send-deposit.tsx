import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Formik } from "formik";
import VaultContract from "../../utils/VaultImplementation.json";
import { Field } from "../field";
import { Button } from "../Button";

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
    <Button
      onClick={() => handleSubmit()}
      className="cta-button connect-wallet-button"
    >
      Send deposit
    </Button>
  );
};

export default SendDepositButton;
