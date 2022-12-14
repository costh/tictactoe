import { useState } from "react";
import { playerTurnType } from "../GameSystem/types";
import { ScoreBoardType, gameState } from "./types";

export type ScoreBoardReturnType = {
  scoreBoard: ScoreBoardType;
  setWinner: (winner: playerTurnType | null) => void;
  playerOneName: gameState["player1"];
  playerTwoName: gameState["player2"];
  setPlayerOneName: (name: gameState["player1"]) => void;
  setPlayerTwoName: (name: gameState["player2"]) => void;
};

export const useScoreBoard = (): ScoreBoardReturnType => {
  const [scoreBoard, setScoreBoard] = useState<ScoreBoardType>({
    tally: [],
    games: [],
  });
  const [playerOneName, setPlayerOneName] = useState<gameState["player1"]>(
    playerTurnType.one
  );
  const [playerTwoName, setPlayerTwoName] = useState<gameState["player2"]>(
    playerTurnType.two
  );

  const setWinner = (winner: playerTurnType | null) => {
    const games = [...scoreBoard.games];
    const tally = [...scoreBoard.tally];
    let currentWinner = () => {
      return winner === playerTurnType.one ? playerOneName : playerTwoName;
    };

    games.push({
      player1: playerOneName === "" ? playerTurnType.one : playerOneName,
      player2: playerTwoName === "" ? playerTurnType.two : playerTwoName,
      winner: currentWinner(),
      isTied: winner === null,
    });

    setScoreBoard({ tally, games });
  };

  return {
    scoreBoard,
    setWinner,
    playerOneName,
    playerTwoName,
    setPlayerOneName,
    setPlayerTwoName,
  };
};
