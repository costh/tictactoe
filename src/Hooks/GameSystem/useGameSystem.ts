import { useState } from "react";
import {
  isHorizontalWin,
  isVerticalWin,
  isDiagonalWin,
  checkBoardForWin,
} from "./helpers";

export enum playerTurnType {
  one = "Player One",
  two = "Player Two",
}

export type GameMark = "X" | "O" | null;

export type GameBoardStructure = [
  [GameMark, GameMark, GameMark],
  [GameMark, GameMark, GameMark],
  [GameMark, GameMark, GameMark]
];

type GameWinnerType = playerTurnType | null | "tied";

type useGameSystemReturnType = {
  gameBoard: GameBoardStructure;
  playerTurn: playerTurnType;
  gameWinner: GameWinnerType;
  resetBoard: () => void;
  setItemInGameBoard: (row: number, column: number) => void;
};

const checkifGameTied = (gameBoard: GameBoardStructure) => {
  return gameBoard.flat(1).every((item) => item !== null);
};

export function useGameSystem(): useGameSystemReturnType {
  const emptyBoard: GameBoardStructure = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];
  const [gameBoard, setGameBoard] = useState<GameBoardStructure>(emptyBoard);

  const [gameWinner, setGameWinner] = useState<GameWinnerType>(null);

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

    if (checkBoardForWin(gameBoard)) {
      setGameWinner(playerTurn);
    }

    if (checkifGameTied(gameBoard)) {
      setGameWinner("tied");
    }
    setPlayerTurn(isPlayerOne ? playerTurnType.two : playerTurnType.one);
  };

  const resetBoard = () => {
    setGameBoard(emptyBoard);
    setPlayerTurn(playerTurnType.one);
    setGameWinner(null);
  };

  return { gameBoard, playerTurn, gameWinner, resetBoard, setItemInGameBoard };
}
