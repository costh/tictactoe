import { useState } from "react";
import { useScoreContext } from "../../_Context/ScoreContext";
import { checkBoardForWin, checkifGameTied } from "./helpers";
import {
  GameBoardStructure,
  useGameSystemReturnType,
  GameWinnerType,
  playerTurnType,
} from "./types";

export function useGameSystem(): useGameSystemReturnType {
  const emptyBoard: GameBoardStructure = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

  const { setWinner: setScoreBoardWinner } = useScoreContext();

  const [gameBoard, setGameBoard] = useState<GameBoardStructure>(emptyBoard);

  const [gameWinner, setGameWinner] = useState<GameWinnerType>(null);

  const [isGameInProgress, setIsGameInProgress] = useState<boolean>(false);

  const [playerTurn, setPlayerTurn] = useState<playerTurnType>(
    playerTurnType.one
  );

  const isPlayerOne = playerTurn === playerTurnType.one;

  const setItemInGameBoard = (row: number, column: number): void => {
    if (gameWinner || !isGameInProgress) {
      return;
    }
    const tempGameBoard: GameBoardStructure = [...gameBoard];

    tempGameBoard[row][column] = playerTurn === playerTurnType.one ? "X" : "O";

    setGameBoard(tempGameBoard);

    setPlayerTurn(isPlayerOne ? playerTurnType.two : playerTurnType.one);

    if (checkBoardForWin(gameBoard)) {
      setGameWinner(playerTurn);
      setIsGameInProgress(false);
      setScoreBoardWinner(playerTurn);
      return;
    }

    if (checkifGameTied(gameBoard)) {
      setScoreBoardWinner(null);
      setGameWinner("tied");
      setIsGameInProgress(false);
      return;
    }
  };

  const resetBoard = () => {
    setGameBoard(emptyBoard);
    setPlayerTurn(playerTurnType.one);
    setGameWinner(null);
    setIsGameInProgress(true);
  };

  return {
    gameBoard,
    playerTurn,
    gameWinner,
    resetBoard,
    setItemInGameBoard,
    isGameInProgress,
  };
}
