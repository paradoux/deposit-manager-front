import { useEffect, useState, useCallback, useRef } from "react";
import { Contract } from "@ethersproject/contracts";
import { useContractFunction, useEthers } from "@usedapp/core";
import { utils } from "ethers";
import { Form, Formik } from "formik";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { WarningMSG, SuccessMSG } from "../../utils/messages";
import VaultFactoryContract from "../../utils/VaultFactory.json";
import { Button } from "../Button";
import { Field } from "../field";
import { CurrentMaticInUSD } from "./matic-price-feed";
import { getHighLevelTransactionState } from "../../utils/misc";
import TransactionButton from "../transaction-button";

const override = {
  display: "flex",
  justifyContent: "center",
  padding: "2px 0",
};

export interface InitialValues {
  depositAmount: string;
  endDate: string;
  renterWallet: string;
}

const initialValues: InitialValues = {
  depositAmount: "0",
  endDate: "",
  renterWallet: "",
};

const CreateVaultForm = () => {
  const [oneMaticInUSD, setOneMaticInUSD] = useState(0);
  const [inputDepositInUSD, setInputDepositInUSD] = useState(0);
  const currentInputDeposit = useRef(null);

  const factoryContract = new Contract(
    "0xC7433eBC21b216fe6484DA1b8A7bC3e4b1055279",
    VaultFactoryContract.abi
  ) as any;

  const { account, switchNetwork } = useEthers();
  const {
    send,
    state: { status },
    events,
  } = useContractFunction(factoryContract, "createNewVault");
  const [vaultAddress, setVaultAddress] = useState("");
  const { isSuccess } = getHighLevelTransactionState(status);

  useEffect(() => {
    /* @ts-ignore */
    const address = events && events[0].args[1];

    if (address) {
      setVaultAddress(address);
    }

    if (isSuccess) {
      SuccessMSG("Vault successfully created!");
    }
  }, [isSuccess]);

  useEffect(() => {
    getMaticPriceInUSD();
  }, []);

  const getMaticPriceInUSD = useCallback(async () => {
    const currentMaticPrice = await CurrentMaticInUSD();
    setOneMaticInUSD(currentMaticPrice);
  }, []);

  const updateDeposit = useCallback(
    async (event: any) => {
      const userInput = event.target.value;
      const depositInUSD = Number(userInput) * Number(oneMaticInUSD);
      setInputDepositInUSD(depositInUSD);
    },
    [oneMaticInUSD]
  );
  return (
    <>
      {isSuccess ? (
        <div>
          <p>Your vault has been successfully created!</p>
          {vaultAddress ? (
            <Link
              to={`/vaults/${vaultAddress}`}
              key={vaultAddress}
              data-aos="zoom-y-in"
            >
              <Button className="mt-12 mb-2">View vault details</Button>
            </Link>
          ) : null}
        </div>
      ) : (
        <Formik
          initialValues={initialValues}
          // validate={validate}
          onSubmit={async (values, { setSubmitting }) => {
            const { depositAmount, renterWallet, endDate } = values;

            if (typeof window.ethereum === undefined) {
              return WarningMSG("Please install the metamask");
            }

            if (!account) {
              return WarningMSG("Please connect your metamask wallet");
            }

            const currentChainId = await window.ethereum.request({
              method: "eth_chainId",
            });

            if (
              currentChainId.toString() !== "0x89" &&
              currentChainId.toString() !== "0x13881"
            ) {
              WarningMSG("Please use Mumbai testnet");
              return await switchNetwork(80001);
            }

            if (
              depositAmount.toString().trim() === "0" ||
              endDate.trim() === "" ||
              renterWallet.trim() === ""
            ) {
              return WarningMSG("Please fill in the form");
            }
            const parsedDepositAmount = utils.parseEther(
              depositAmount.toString()
            );

            const date = new Date(endDate);
            const unixEndDate = Math.floor(date.getTime() / 1000);

            await send(parsedDepositAmount, renterWallet, unixEndDate);
            setSubmitting(false);
          }}
        >
          {({ handleSubmit, handleChange }) => (
            <Form className="py-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-3 gap-x-8 gap-y-4">
                <Field
                  type="number"
                  name="depositAmount"
                  label="Deposit Amount (in ETH)"
                  onChange={handleChange}
                  onKeyUp={updateDeposit}
                />
                <Field
                  type="date"
                  name="endDate"
                  label="Rental Period End Date"
                  onChange={handleChange}
                />
                <Field
                  type="string"
                  name="renterWallet"
                  label="Renter Wallet Address"
                  onChange={handleChange}
                />
              </div>
              <div>{`1 matic ≈ $ ${oneMaticInUSD} ($ ${inputDepositInUSD})`}</div>
              <TransactionButton status={status} buttonText="Create your vault" />
            </Form>
          )}
        </Formik>
      )}
    </>
  );
};

export default CreateVaultForm;
