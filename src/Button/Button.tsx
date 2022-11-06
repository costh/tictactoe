import React from "react";

type Props = {
  text: string;
  onClick?: () => void;
  type: "cta";
};

const Button = ({ text, type, onClick }: Props) => {
  const btnType = {
    cta: "border-cyan-600 border-2 rounded-md text-white border-radius bg-cyan-500",
  };
  return (
    <button
      className={`p-4 border-cyan-600 border-2 rounded-md text-white border-radius bg-cyan-500 ${btnType[type]}`}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
