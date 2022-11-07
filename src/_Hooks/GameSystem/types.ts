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

export type GameWinnerType = playerTurnType | null | "tied";

export type useGameSystemReturnType = {
  gameBoard: GameBoardStructure;
  playerTurn: playerTurnType;
  gameWinner: GameWinnerType;
  isGameInProgress: boolean;
  resetBoard: () => void;
  setItemInGameBoard: (row: number, column: number) => void;
};
