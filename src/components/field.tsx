import { ErrorMessage, Field as FormikField, FieldAttributes } from "formik";
import classNames from "classnames";

const Field = ({ className, name, label, ...rest }: FieldAttributes<any>) => {
  const FieldClasses = classNames(
    "border-solid rounded-md px-2 py-[1px] border-2 text-black",
    className
  );

  return (
    <div className="flex flex-col my-1">
      <label htmlFor={name} className="mb-2">
        {label}
      </label>
      <FormikField className={FieldClasses} name={name} {...rest}></FormikField>
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export { Field };
