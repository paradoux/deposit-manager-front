import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Formik } from "formik";
import VaultContract from "../../utils/VaultImplementation.json";
import { Field } from "../field";
import { Button } from "../Button";

interface ProposeAmountFormProps {
  vaultAddress: string;
}

const AcceptAmountButton = ({ vaultAddress }: ProposeAmountFormProps) => {
  const vaultContract = new Contract(vaultAddress, VaultContract.abi) as any;

  const { send, state, events } = useContractFunction(
    vaultContract,
    "acceptProposedAmount"
  );

  const handleSubmit = async () => {
    await send();
  };

  return (
    <Button
      onClick={() => handleSubmit()}
      className="cta-button connect-wallet-button"
    >
      Accept proposed amount
    </Button>
  );
};

export default AcceptAmountButton;
