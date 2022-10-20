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
        <Form className="flex flex-col border-2 py-4 px-6 w-1/2 min-w-[300px] max-w-lg">
          <Field type="text" name="name" label="Your Name" />
          <Field type="text" name="propertyAddress" label="Property Address" />
          <Field
            type="number"
            name="depositAmount"
            label="Deposit Amount (in ETH)"
          />
          <Field type="date" name="endDate" label="Rental Period End Date" />
          <Field type="test" name="renterWallet" label="Renter Wallet" />
          <Button type="submit" disabled={isSubmitting} className="my-3">
            Submit
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default CreateVaultForm;
