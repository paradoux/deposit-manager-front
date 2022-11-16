import { useEthers } from "@usedapp/core";
import { VaultType } from "../../routes/vaults";
import ProposeAmountForm from "../propose-amount/propose-amount";

interface VaultActionProps {
  VaultDetails: VaultType | undefined;
}

const VaultAction = ({ VaultDetails }: VaultActionProps) => {
  const { account } = useEthers();

  if (!account) {
    return <></>;
  }

  if (!VaultDetails) {
    return <></>;
  }

  if (
    isOwner(account, VaultDetails.propertyOwner) &&
    isRentalEnded(VaultDetails.rentalPeriodEnd) &&
    VaultDetails.isDepositStored &&
    !VaultDetails.isAmountAccepted
  ) {
    return <ProposeAmountForm vaultAddress={VaultDetails.deployedAddress} />;
  }

  return <></>;
};

const isRentalEnded = (rentalPeriodEnd: number): boolean => {
  return Math.floor(Date.now() / 1000) > rentalPeriodEnd;
};

const isOwner = (userAddress: string, ownerAddress: string): boolean => {
  return userAddress === ownerAddress;
};

const isRenter = (userAddress: string, renterAddress: string) => {
  return userAddress === renterAddress;
};

export { VaultAction };
