import { Contract } from '@ethersproject/contracts';
import { useContractFunction, useEthers } from '@usedapp/core';
import { utils } from 'ethers';
import { Form, Formik } from 'formik';
import {  WarningMSG } from '../../utils/messages';
import VaultFactoryContract from '../../utils/VaultFactory.json';
import { Field } from '../field';

export interface InitialValues {
  depositAmount: string;
  endDate: string;
  renterWallet: string;
}

const initialValues: InitialValues = {
  depositAmount: '0',
  endDate: '',
  renterWallet: '',
};

const CreateVaultForm = () => {
  const factoryContract = new Contract(
    '0xC7433eBC21b216fe6484DA1b8A7bC3e4b1055279',
    VaultFactoryContract.abi
  ) as any;

  const { account, switchNetwork } = useEthers();
  const { send } = useContractFunction(factoryContract, 'createNewVault');

  return (
    <Formik
      initialValues={initialValues}
      // validate={validate}
      onSubmit={async (values, { setSubmitting }) => {
        const { depositAmount, renterWallet, endDate } = values;

        if (typeof window.ethereum === undefined) {
          return WarningMSG('Please install the metamask');
        }

        if (!account) {
          return WarningMSG('Please connect your metamask wallet');
        }

        const currentChainId = await window.ethereum.request({
          method: 'eth_chainId',
        });

        if (
          currentChainId.toString() !== '0x89' &&
          currentChainId.toString() !== '0x13881'
        ) {
          WarningMSG('Please use Mumbai testnet');

          return await switchNetwork(80001);
        }

        if (
          depositAmount.toString().trim() === '0' ||
          endDate.trim() === '' ||
          renterWallet.trim() === ''
        ) {
          return WarningMSG('Please fill in the form');
        }
        const parsedDepositAmount = utils.parseEther(depositAmount.toString());

        const date = new Date(endDate);
        const unixEndDate = Math.floor(date.getTime() / 1000);

        send(parsedDepositAmount, renterWallet, unixEndDate);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting, handleSubmit, handleChange }) => (
        <Form className="py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-3 gap-x-8 gap-y-4">
            <Field
              type="number"
              name="depositAmount"
              label="Deposit Amount (in ETH)"
              onChange={handleChange}
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
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-block w-full px-4 py-2 mt-8 text-center text-white font-bold bg-gradient-to-r from-blue-500 to-teal-400 rounded-md shadow hover:from-teal-400 hover:to-teal-400"
          >
            Create your vault
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateVaultForm;
