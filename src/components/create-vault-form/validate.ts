import { ETHEREUM_WALLET_REGEX } from "../../consts";
import { InitialValues } from "./create-vault-form";

const validate = (values: InitialValues) => {
  const { name, depositAmount, endDate, renterWallet, propertyAddress } =
    values;
  const errors = {} as any;
  if (!name) {
    errors.name = "Please enter your name";
  }
  if (!propertyAddress) {
    errors.propertyAddress = "Please enter a property address";
  }
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
