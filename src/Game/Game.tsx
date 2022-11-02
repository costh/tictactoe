import React from "react";
import ScoreBoard from "../ScoreBoard/ScoreBoard";
import {
  GameBoardStructure,
  GameMark,
  useScoringSystem,
} from "../ScoringSystem/useScoringSystem";

type Props = {};

type SquareProps = { handleSquareClick(): void; value: GameMark };

const Game = (props: Props) => {
  const { gameBoard, setItemInGameBoard, playerTurn } = useScoringSystem();

  const handleClick = (column: number, row: number) => {
    setItemInGameBoard(column, row);
  };

  console.table(gameBoard);

  const Square: React.FC<SquareProps> = ({ ...props }) => {
    const { handleSquareClick, value } = props;
    return (
      <button
        className=" w-28 h-28 bg-slate-400 border-2"
        onClick={handleSquareClick}
        disabled={value !== null}
      >
        {value && <span className=" text-lg text-black">{value}</span>}
      </button>
    );
  };

  return (
    <div>
      <h1>TicTacToe</h1>
      <div> Currently Playing: {playerTurn}</div>
      <div className="grid grid-cols-3 items-center w-1/2 m-auto">
        {gameBoard.map((row, rowIndex) => (
          <>
            {row.map((item, columnIndex) => (
              <Square
                key={columnIndex}
                handleSquareClick={() => handleClick(rowIndex, columnIndex)}
                value={item}
              />
            ))}
          </>
        ))}
      </div>

      <ScoreBoard />
    </div>
  );
};

export default Game;
