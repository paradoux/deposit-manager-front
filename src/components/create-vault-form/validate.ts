import { ETHEREUM_WALLET_REGEX } from "../../consts";
import { InitialValues } from "./create-vault-form";

const validate = (values: InitialValues) => {
  const { depositAmount, endDate, renterWallet } = values;
  const errors = {} as any;
  if (typeof depositAmount !== "number" || depositAmount < 0) {
    errors.depositAmount = "Please enter a deposit amount";
  }
  if (!endDate) {
    errors.endDate = "Please enter an end date";
  }

  if (!renterWallet.match(ETHEREUM_WALLET_REGEX)) {
    errors.renterWallet = "Please enter a valid wallet address";
  }

  return errors;
};

export { validate };
