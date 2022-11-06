import React, { useEffect } from "react";
import Button from "../Button/Button";
import { useScoreContext } from "../_Context/ScoreContext";
import { GameMark } from "../_Hooks/GameSystem/types";
import { useGameSystem } from "../_Hooks/GameSystem/useGameSystem";
import { SquareProps } from "./types";

const Game = () => {
  const {
    gameBoard,
    setItemInGameBoard,
    playerTurn,
    gameWinner,
    resetBoard,
    isGameFinished,
  } = useGameSystem();

  const { scoreBoard } = useScoreContext();

  const handleClick = (column: number, row: number) => {
    setItemInGameBoard(column, row);
  };

  const Square: React.FC<SquareProps> = ({ ...props }) => {
    const { handleSquareClick, gameValue, positionX, positionY } = props;
    return (
      <button
        data-xy-position={`${positionX}${positionY}`}
        className=" w-full h-36 bg-blue-500 border-2"
        onClick={handleSquareClick}
        disabled={gameValue !== null}
      >
        {gameValue && (
          <span
            className={` text-5xl ${
              gameValue === "X" ? "text-black" : "text-white"
            }`}
          >
            {gameValue}
          </span>
        )}
      </button>
    );
  };

  console.log(scoreBoard);

  return (
    <div className=" text-center">
      <h1 className=" text-3xl pt-4">TicTacToe</h1>
      <div className=" py-8">
        {!isGameFinished && (
          <div className="font-bold">
            Currently Playing:
            <span className="font-medium p-3 bg-slate-600 text-white rounded-lg">
              {playerTurn}
            </span>
          </div>
        )}
        {isGameFinished && gameWinner && (
          <h2 className=" text-lg text-green-500">
            {gameWinner} won this round!
          </h2>
        )}
        {isGameFinished && !!!gameWinner && (
          <h2 className="text-lg">Oops the game is tied!</h2>
        )}
      </div>
      <div className="grid grid-cols-3 items-center w-1/2 m-auto place-items-center">
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
      {isGameFinished && (
        <Button text="Play Again" onClick={resetBoard} type={"cta"} />
      )}
      <div>
        <h2>Games Board</h2>
        <ul>
          {scoreBoard.games.map((item, index) => (
            <li key={index}>
              <span>
                {item.player1} vs {item.player2}
              </span>
              <span>{item.winner}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Game;
