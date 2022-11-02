import { GameBoardStructure, GameMark } from "./useGameSystem";

export const isHorizontalWin = (gameBoard: GameBoardStructure) => {
  let hasWon = false;
  gameBoard.forEach((singleRow: GameMark[]) => {
    if (areAllItemsInArrEqual(singleRow)) {
      return (hasWon = true);
    }
  });
  return hasWon;
};

export const isVerticalWin = (gameBoard: GameBoardStructure) => {
  let hasWon = false;
  for (let column = 0; column < gameBoard.length; column++) {
    let singleColumn: GameMark[] = [...gameBoard.map((row) => row[column])];
    if (areAllItemsInArrEqual(singleColumn)) {
      return (hasWon = true);
    }
  }
  return hasWon;
};

export const isDiagonalWin = (gb: GameBoardStructure) => {
  const isFirstDiagonalMatching = areAllItemsInArrEqual([
    gb[0][0],
    gb[1][1],
    gb[2][2],
  ]);
  const isSecondDiagonalMatching = areAllItemsInArrEqual([
    gb[0][2],
    gb[1][1],
    gb[2][0],
  ]);
  if (isFirstDiagonalMatching || isSecondDiagonalMatching) return true;
  return false;
};

export const checkBoardForWin = (gameBoard: GameBoardStructure) => {
  console.table(gameBoard);
  if (isHorizontalWin(gameBoard)) return true;
  if (isVerticalWin(gameBoard)) return true;
  if (isDiagonalWin(gameBoard)) return true;

  return false;
};

const areAllItemsInArrEqual = (arr: GameMark[]) =>
  arr.every((v) => v === arr[0] && arr[0] !== null);
