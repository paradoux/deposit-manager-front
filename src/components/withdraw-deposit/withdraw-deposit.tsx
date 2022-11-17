import { Contract } from "@ethersproject/contracts";
import { useContractFunction } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Formik } from "formik";
import VaultContract from "../../utils/VaultImplementation.json";
import { Field } from "../field";
import { Button } from "../Button";

interface WithdrawDepositButtonProps {
  vaultAddress: string;
  withdrawalType: string;
}

const WithdrawDepositButton = ({
  vaultAddress,
  withdrawalType,
}: WithdrawDepositButtonProps) => {
  const vaultContract = new Contract(vaultAddress, VaultContract.abi) as any;

  const { send, state, events } = useContractFunction(
    vaultContract,
    withdrawalType
  );

  const handleSubmit = async () => {
    await send();
  };

  return (
    <Button
      onClick={() => handleSubmit()}
      className="cta-button connect-wallet-button"
    >
      Withdraw your deposit amount
    </Button>
  );
};

export default WithdrawDepositButton;
