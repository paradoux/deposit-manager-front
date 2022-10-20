import { ErrorMessage, Field as FormikField, FieldAttributes } from "formik";
import classNames from "classnames";

const Field = ({ className, name, label, ...rest }: FieldAttributes<any>) => {
  const FieldClasses = classNames(
    "border-solid border-grey-400 px-2 border-2",
    className
  );

  return (
    <div className="flex flex-col my-1">
      <label htmlFor={name} className="py-1">
        {label}
      </label>
      <FormikField className={FieldClasses} name={name} {...rest}></FormikField>
      <ErrorMessage name={name} component="div" className="text-red-500" />
    </div>
  );
};

export { Field };
