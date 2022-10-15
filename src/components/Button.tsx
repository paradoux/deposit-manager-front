import React from "react";
import classNames from "classnames";

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {}

const Button = ({ children, style, className }: ButtonProps) => {
  const buttonClasses = classNames("base-button", className);

  return <button className={buttonClasses}>{children}</button>;
};

export { Button };
