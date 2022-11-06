import React, { useEffect } from "react";
import Button from "../Button/Button";
import { useScoreContext } from "../_Context/ScoreContext";
import { GameMark } from "../_Hooks/GameSystem/types";
import { useGameSystem } from "../_Hooks/GameSystem/useGameSystem";
import DisplayGameBoard from "./components/DisplayGameBoard";
import ScoreBoardGames from "./components/ScoreBoard";
import { Square } from "./components/Square";
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

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl pt-4">TicTacToe</h1>
      <div className="py-4">
        {!isGameFinished && (
          <div className="font-bold">
            Currently Playing:
            <span className="font-medium p-3 bg-slate-600 text-white rounded-lg">
              {playerTurn}
            </span>
          </div>
        )}
        {isGameFinished && gameWinner && (
          <h2 className="text-lg text-green-500">
            {gameWinner} won this round!
          </h2>
        )}
        {isGameFinished && !!!gameWinner && (
          <h2 className="text-lg">Oops the game is tied!</h2>
        )}
      </div>

      <DisplayGameBoard gameBoard={gameBoard} handleClick={handleClick} />

      {isGameFinished && (
        <Button text="Play Again" onClick={resetBoard} type={"cta"} />
      )}

      {!!scoreBoard.games.length && (
        <ScoreBoardGames scoreBoardGames={scoreBoard.games} />
      )}
    </div>
  );
};

export default Game;
