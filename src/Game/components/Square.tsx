import { SquareProps } from "../types";

import { ReactComponent as XIcon } from "../../_Assets/x.svg";
import { ReactComponent as OIcon } from "../../_Assets/o.svg";

export const Square: React.FC<SquareProps> = ({ ...props }) => {
  const { handleSquareClick, gameValue, positionX, positionY, disabled } =
    props;

  const isXActive = gameValue === "X";
  const isYActive = gameValue === "O";

  return (
    <button
      data-xy-position={`${positionX}${positionY}`}
      className={`w-full h-32 sm:h-40 flex items-center justify-center flex-col bg-blue-500 border-2 ${
        disabled ? "cursor-not-allowed" : ""
      }`}
      onClick={handleSquareClick}
      disabled={gameValue !== null || disabled}
      aria-label={`${!gameValue ? "Unplayed Tile" : gameValue}`}
    >
      <XIcon
        aria-hidden={isXActive}
        className={`transition-all duration-100 ${
          isXActive ? "w-10 h-10 visible" : "h-0 invisible"
        }`}
      />
      <OIcon
        aria-hidden={isYActive}
        className={`fill-white transition-all  ${
          isYActive ? "w-11 h-11" : "h-0"
        }`}
      />
    </button>
  );
};
