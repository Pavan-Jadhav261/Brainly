import React from "react";

interface InputProps {
  placeHolder?: string;
  reference?: any;
  Value?: string;
  Disable?: boolean;
}

const Input = (props: InputProps) => {
  return (
    <div>
      <input
        type="text"
        className="h-10 w-90 p-2 rounded-md border border-gray-50 bg-slate-100 placeholder:font-light"
        placeholder={props.placeHolder}
        ref={props.reference}
        value={props.Value}
        disabled={props.Disable}
      />
    </div>
  );
};

export default Input;
