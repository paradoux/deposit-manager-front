import { Contract } from '@ethersproject/contracts';
import { useContractFunction } from '@usedapp/core';
import { utils } from 'ethers';
import { Form, Formik } from 'formik';
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
    '0x7e5aa82A96087b2C5c88e03b6E463f01a8F0288b',
    VaultFactoryContract.abi
  ) as any;

  const { send } = useContractFunction(factoryContract, 'createNewVault');

  return (
    <Formik
      initialValues={initialValues}
      // validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        const { depositAmount, renterWallet, endDate } = values;

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
