import React from "react";
import { GameBoardStructure, GameMark } from "../../_Hooks/GameSystem/types";
import { Square } from "./Square";

type Props = {
  gameBoard: GameBoardStructure;
  handleClick: (column: number, row: number) => void;
};

function DisplayGameBoard({ gameBoard, handleClick }: Props) {
  return (
    <div className="grid grid-cols-3 items-center place-items-center">
      {gameBoard.map((row: any[], rowIndex: number) => (
        <>
          {row.map((item: GameMark, columnIndex: number) => (
            <Square
              key={columnIndex}
              positionX={rowIndex}
              positionY={columnIndex}
              handleSquareClick={() => handleClick(rowIndex, columnIndex)}
              gameValue={item}
            />
          ))}
        </>
      ))}
    </div>
  );
}

export default DisplayGameBoard;
