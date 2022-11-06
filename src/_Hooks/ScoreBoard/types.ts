import { playerTurnType } from "../GameSystem/types";

export type gameState = {
  player1: playerTurnType.one | string;
  player2: playerTurnType.two | string;
  winner: playerTurnType | string;
};

export type tallyType = { player: gameState["winner"]; wins: number };

export type ScoreBoardType = { tally: tallyType[]; games: gameState[] };
