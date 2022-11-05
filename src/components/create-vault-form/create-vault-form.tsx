import { Form, Formik } from "formik";
import { Button } from "../Button";
import { Field } from "../field";
import { validate } from "./validate";

export interface InitialValues {
  name: string;
  propertyAddress: string;
  depositAmount: number | null;
  endDate: number | null;
  renterWallet: string;
}

const initialValues: InitialValues = {
  name: "",
  propertyAddress: "",
  depositAmount: null,
  endDate: null,
  renterWallet: "",
};

const CreateVaultForm = () => {
  return (
    <Formik
      initialValues={initialValues}
      validate={validate}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          alert(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => (
        <Form className="py-4 ">
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <Field type="text" name="name" label="Your Name" />
            <Field
              type="text"
              name="propertyAddress"
              label="Property Address"
            />
            <Field type="test" name="renterWallet" label="Renter Wallet" />
            <Field
              type="number"
              name="depositAmount"
              label="Deposit Amount (in ETH)"
            />
            <Field type="date" name="endDate" label="Rental Period End Date" />
          </div>
          {/* <Button type="submit" disabled={isSubmitting} className="">
            Submit
          </Button> */}
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
