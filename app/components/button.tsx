import React, { useEffect, useState } from "react";

type ButtonProps = {
  variant?: string;
  className?: string;
  buttonTitle?: string;
  onClick?: any;
  type?: any;
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  className = "",
  buttonTitle = "Click",
  type = "",
  onClick,
}) => {
  const [customClassName, setCustomClassName] = useState("");
  const getClassNameByVariant = (variant: string) => {
    if (variant === "primary") {
      return "border border-primaryColor p-4 rounded shadow-md hover:bg-primaryColor hover:text-white text-primaryColor font-light";
    }
    return "";
  };

  useEffect(() => {
    setCustomClassName(`${getClassNameByVariant(variant)} ${className}`);
  }, []);

  return (
    <button type={type} className={customClassName} onClick={onClick}>
      {buttonTitle}
    </button>
  );
};

export default Button;
