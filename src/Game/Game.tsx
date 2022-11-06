import Button from "../Button/Button";
import { useScoreContext } from "../_Context/ScoreContext";
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
          <div className="font-bold" data-qa="currently-playing">
            Currently Playing:
            <span className="font-medium p-3 bg-slate-600 text-white rounded-lg">
              {playerTurn}
            </span>
          </div>
        )}
        {isGameFinished && gameWinner && (
          <h2 className="text-lg text-green-500" data-qa="game-win">
            <strong>{gameWinner}</strong> won this round!
          </h2>
        )}
        {isGameFinished && !!!gameWinner && (
          <h2 className="text-lg" data-qa="game-tied">
            Oops the game is tied!
          </h2>
        )}
      </div>

      <DisplayGameBoard gameBoard={gameBoard} handleClick={handleClick} />

      {isGameFinished && (
        <Button text="Play Again" onClick={resetBoard} type={"cta"} />
      )}

      {!!scoreBoard.games.length && (
        <DisplayGamesHistory scoreBoardGames={scoreBoard.games} />
      )}
    </div>
  );
};

export default Game;
