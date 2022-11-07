import React, { ChangeEventHandler } from "react";

type Props = {
  name: string;
  value: string;
  placeholder: string;
  handleChange: ChangeEventHandler<HTMLInputElement>;
  disabled: boolean;
};

function InputWithLabel({
  name,
  placeholder,
  value,
  handleChange,
  disabled,
}: Props) {
  return (
    <div>
      <label htmlFor={name} className="block text-md font-medium text-gray-700">
        {name}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        value={value}
        className={`block w-full border-2 rounded-md  border-slate-600 pl-7 pr-12 ${
          disabled ? "bg-gray-400 text-white cursor-not-allowed" : ""
        }`}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
    </div>
  );
}

export default InputWithLabel;
