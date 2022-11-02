import React from "react";
import { GameMark, useGameSystem } from "../Hooks/GameSystem/useGameSystem";

type Props = {};

type SquareProps = { handleSquareClick(): void; gameValue: GameMark };

const Game = () => {
  const { gameBoard, setItemInGameBoard, playerTurn, gameWinner, resetBoard } =
    useGameSystem();

  const handleClick = (column: number, row: number) => {
    setItemInGameBoard(column, row);
  };

  console.table(gameBoard);

  const Square: React.FC<SquareProps> = ({ ...props }) => {
    const { handleSquareClick, gameValue } = props;
    return (
      <button
        className=" w-full h-36 bg-slate-400 border-2"
        onClick={handleSquareClick}
        disabled={gameValue !== null}
      >
        {gameValue && <span className=" text-lg text-black">{gameValue}</span>}
      </button>
    );
  };

  return (
    <div>
      <h1>TicTacToe</h1>
      {!gameWinner && <div> Currently Playing: {playerTurn}</div>}
      {gameWinner !== "tied" && gameWinner !== null && (
        <h2>{gameWinner} won this round!</h2>
      )}
      {gameWinner == "tied" && <h2>Oops the game is tied!</h2>}
      <div className="grid grid-cols-3 items-center w-1/2 m-auto place-items-center">
        {gameBoard.map((row: any[], rowIndex: number) => (
          <>
            {row.map((item: GameMark, columnIndex: number) => (
              <Square
                key={columnIndex}
                handleSquareClick={() => handleClick(rowIndex, columnIndex)}
                gameValue={item}
              />
            ))}
          </>
        ))}
      </div>
      {gameWinner && <button onClick={resetBoard}> Play Again </button>}
    </div>
  );
};

export default Game;
