import React from "react";
import classNames from "classnames";

const ShadowBox = ({
  children,
  className,
  ...rest
}: React.HTMLProps<HTMLDivElement>) => {
  /*  Blue RGBA rgba(59, 130, 246, 1)
      TEAL RGBA rgba(45,212,191,0.56) */

  const shadowBoxClasses = classNames(
    "bg-black border-[1px] border-blue-500 px-2 lg:px-12 py-4 rounded-md shadow-[0px_22px_70px_4px_rgba(59,130,246,0.56)]",
    className
  );

  return (
    <div className={shadowBoxClasses} {...rest}>
      {children}
    </div>
  );
};

export { ShadowBox };
