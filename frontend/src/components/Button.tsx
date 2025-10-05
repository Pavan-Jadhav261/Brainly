import React, { type ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary" | "selected" | "danger";
  text: string;
  startIcon?: ReactElement;
  onclick?: (val?: any) => void;
  Value?: "youtube" | "twitter";
  reference?: any;
}

const variantClasses = {
  primary: "bg-blue-500 text-white active:bg-blue-400",
  secondary: "bg-white border-gray-200 border-2 font-black-900",
  selected: "border-green-400 border-2",
  danger: "bg-red-500 text-white active:bg-red-400",
};

const defaultClasses =
  "p-3 rounded-xl min-w-30  font-normal text-md shadow-sm ";

const Button = (props: ButtonProps) => {
  return (
    <button
      className={`${variantClasses[props.variant]} ${defaultClasses} `}
      value={props.Value}
      ref={props.reference}
      onClick={props.onclick}
    >
      <div className="flex items-center gap-2 justify-center">
        {props.startIcon}
        {props.text}
      </div>
    </button>
  );
};

export default Button;
