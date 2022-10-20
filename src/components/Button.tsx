import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  type: "button" | "submit" | "reset" | undefined;
}

const Button = ({ children, style, className, type, ...rest }: ButtonProps) => {
  const buttonClasses = classNames("base-button", className);

  return (
    <button className={buttonClasses} type={type} {...rest}>
      {children}
    </button>
  );
};

export { Button };
