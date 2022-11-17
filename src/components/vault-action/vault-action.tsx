import { useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { VaultType } from "../../routes/vaults";
import AcceptAmountButton from "../accept-amount/accept-amount";
import ProposeAmountForm from "../propose-amount/propose-amount";
import SendDepositButton from "../send-deposit/send-deposit";
import WithdrawDepositButton from "../withdraw-deposit/withdraw-deposit";

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
    isRenter(account, VaultDetails.propertyRenter) &&
    !VaultDetails.isDepositStored
  ) {
    return (
      <SendDepositButton
        vaultAddress={VaultDetails.deployedAddress}
        depositAmount={VaultDetails.deposit.hex}
      />
    );
  }

  if (
    isOwner(account, VaultDetails.propertyOwner) &&
    isRentalEnded(VaultDetails.rentalPeriodEnd) &&
    VaultDetails.isDepositStored &&
    !VaultDetails.isAmountAccepted
  ) {
    return <ProposeAmountForm vaultAddress={VaultDetails.deployedAddress} />;
  }

  if (
    isRenter(account, VaultDetails.propertyRenter) &&
    isRentalEnded(VaultDetails.rentalPeriodEnd) &&
    VaultDetails.isDepositStored &&
    !VaultDetails.isAmountAccepted &&
    utils.formatEther(VaultDetails.amountToReturn.hex) !== "0.0"
  ) {
    return <AcceptAmountButton vaultAddress={VaultDetails.deployedAddress} />;
  }

  if (
    isRenter(account, VaultDetails.propertyRenter) &&
    VaultDetails.isAmountAccepted &&
    !VaultDetails.isRenterChunkReturned
  ) {
    return (
      <WithdrawDepositButton
        vaultAddress={VaultDetails.deployedAddress}
        withdrawalType="claimRenterDeposit"
      />
    );
  }

  if (
    isOwner(account, VaultDetails.propertyOwner) &&
    VaultDetails.isAmountAccepted &&
    !VaultDetails.isOwnerChunkReturned &&
    VaultDetails.amountToReturn.hex !== VaultDetails.deposit.hex
  ) {
    return (
      <WithdrawDepositButton
        vaultAddress={VaultDetails.deployedAddress}
        withdrawalType="claimOwnerDeposit"
      />
    );
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
