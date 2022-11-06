import { SquareProps } from "../types";

import { ReactComponent as XIcon } from "../../_Assets/x.svg";
import { ReactComponent as OIcon } from "../../_Assets/o.svg";

export const Square: React.FC<SquareProps> = ({ ...props }) => {
  const { handleSquareClick, gameValue, positionX, positionY } = props;
  return (
    <button
      data-xy-position={`${positionX}${positionY}`}
      className=" w-full h-36 flex items-center justify-center flex-col bg-blue-500 border-2"
      onClick={handleSquareClick}
      disabled={gameValue !== null}
    >
      <XIcon
        className={`transition-all duration-100 ${
          gameValue === "X" ? "w-10 h-10 visible" : "h-0 invisible"
        }`}
      />
      <OIcon
        className={`fill-white transition-all  ${
          gameValue === "O" ? "w-11 h-11" : "h-0"
        }`}
      />
    </button>
  );
};
