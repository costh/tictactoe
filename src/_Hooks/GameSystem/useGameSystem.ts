import { useState } from "react";
import { useScoreContext } from "../../_Context/ScoreContext";
import { useScoreBoard } from "../ScoreBoard/useScoreBoard";
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

  const { setWinner } = useScoreContext();

  const [gameBoard, setGameBoard] = useState<GameBoardStructure>(emptyBoard);

  const [gameWinner, setGameWinner] = useState<GameWinnerType>(null);

  const [isGameFinished, setIsGameFinished] = useState<boolean>(false);

  const [playerTurn, setPlayerTurn] = useState<playerTurnType>(
    playerTurnType.one
  );

  const isPlayerOne = playerTurn === playerTurnType.one;

  const setItemInGameBoard = (row: number, column: number): void => {
    if (gameWinner) {
      return;
    }
    const tempGameBoard: GameBoardStructure = [...gameBoard];

    tempGameBoard[row][column] = playerTurn === playerTurnType.one ? "X" : "O";

    setGameBoard(tempGameBoard);

    setPlayerTurn(isPlayerOne ? playerTurnType.two : playerTurnType.one);

    if (checkBoardForWin(gameBoard)) {
      setGameWinner(playerTurn);
      setWinner(playerTurn);
      setIsGameFinished(true);
      return;
    }

    if (checkifGameTied(gameBoard)) {
      setWinner(null);
      setIsGameFinished(true);
      return;
    }
  };

  const resetBoard = () => {
    setGameBoard(emptyBoard);
    setPlayerTurn(playerTurnType.one);
    setGameWinner(null);
    setIsGameFinished(false);
  };

  return {
    gameBoard,
    playerTurn,
    gameWinner,
    resetBoard,
    setItemInGameBoard,
    isGameFinished,
  };
}
