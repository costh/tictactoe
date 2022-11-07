import { ChangeEvent } from "react";
import Button from "../Button/Button";
import InputWithLabel from "../Input/Input";
import { useScoreContext } from "../_Context/ScoreContext";
import { playerTurnType } from "../_Hooks/GameSystem/types";
import { useGameSystem } from "../_Hooks/GameSystem/useGameSystem";
import DisplayGameBoard from "./components/DisplayGameBoard";
import DisplayGamesHistory from "./components/DisplayGamesHistory";

const Game = () => {
  const {
    gameBoard,
    setItemInGameBoard,
    playerTurn,
    gameWinner,
    resetBoard,
    isGameInProgress,
  } = useGameSystem();

  const {
    scoreBoard,
    playerOneName,
    playerTwoName,
    setPlayerOneName,
    setPlayerTwoName,
  } = useScoreContext();

  const handleClick = (column: number, row: number) => {
    setItemInGameBoard(column, row);
  };

  const handlePlayerOneInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerOneName(event.currentTarget.value);
  };
  const handlePlayerTwoInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPlayerTwoName(event.currentTarget.value);
  };

  const getCustomName = (name: playerTurnType) => {
    return name === playerTurnType.one ? playerOneName : playerTwoName;
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <h1 className="text-3xl pt-4">TicTacToe</h1>

      <InputWithLabel
        value={playerOneName}
        name={"Player One"}
        placeholder={"John Doe"}
        handleChange={handlePlayerOneInputChange}
        disabled={isGameInProgress}
      />
      <InputWithLabel
        value={playerTwoName}
        name={"Player Two"}
        placeholder={"John Doe"}
        handleChange={handlePlayerTwoInputChange}
        disabled={isGameInProgress}
      />

      {!isGameInProgress && (
        <Button text="Start Game" onClick={resetBoard} type={"cta"} />
      )}

      {isGameInProgress && (
        <div className="py-4">
          <h2 className="font-bold" data-qa="currently-playing">
            Currently Playing:
            <span className="font-medium p-3 bg-slate-600 text-white rounded-lg">
              {getCustomName(playerTurn)}
            </span>
          </h2>
        </div>
      )}

      {!isGameInProgress && gameWinner !== null && (
        <div className="py-4">
          {gameWinner !== "tied" && (
            <h2 className="text-lg text-green-500" data-qa="game-win">
              <strong>{getCustomName(gameWinner)}</strong> won this round!
            </h2>
          )}
          {gameWinner === "tied" && (
            <h2 className="text-lg text-orange-600" data-qa="game-tied">
              Oops the game is tied!
            </h2>
          )}
        </div>
      )}

      <DisplayGameBoard
        gameBoard={gameBoard}
        handleClick={handleClick}
        isGameInProgress={!isGameInProgress}
      />

      {!!scoreBoard.games.length && (
        <DisplayGamesHistory scoreBoardGames={scoreBoard.games} />
      )}
    </div>
  );
};

export default Game;
