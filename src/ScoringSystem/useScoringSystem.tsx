import { useState } from "react";

enum playerTurnType {
  one = "Player One",
  two = "Player Two",
}

export type GameMark = "X" | "O" | null;

export type GameBoardStructure = [
  [GameMark, GameMark, GameMark],
  [GameMark, GameMark, GameMark],
  [GameMark, GameMark, GameMark]
];

export function useScoringSystem() {
  const [gameBoard, setGameBoard] = useState<GameBoardStructure>([
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ]);

  const [hasGameWon, setHasGameWon] = useState<boolean>(false);

  const [playerTurn, setPlayerTurn] = useState<playerTurnType>(
    playerTurnType.one
  );

  const isPlayerOne = playerTurn === playerTurnType.one;

  const setItemInGameBoard = (row: number, column: number) => {
    console.log("coming in here");

    // if (hasGameWon) {
    //   return;
    // }

    const tempGameBoard: GameBoardStructure = [...gameBoard];

    tempGameBoard[row][column] = playerTurn === playerTurnType.one ? "X" : "O";

    setGameBoard(tempGameBoard);
    setPlayerTurn(isPlayerOne ? playerTurnType.two : playerTurnType.one);
  };

  const [scoreBoard, setScoreBoard] = useState<{ tally: []; games: [] }>();

  const checkBoardForAWin = () => {};
  const calculateScoreBoard = () => {};
  return {
    gameBoard,
    setItemInGameBoard,
    playerTurn,
    hasGameWon,
    checkBoardForAWin,
    scoreBoard,
  };
}
