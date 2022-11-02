import React, { useState } from "react";
import { playerTurnType } from "../GameSystem/useGameSystem";

type Props = {};

type ScoreBoardType = { tally: []; games: [] };

export const useScoreBoard = () => {
  const [scoreBoard, setScoreBoard] = useState<ScoreBoardType>();
  const [playerOneName, setPlayerOneName] = useState(playerTurnType.one);
  const [playerTwoName, setPlayerTwoName] = useState(playerTurnType.two);

  return {
    scoreBoard,
    setScoreBoard,
    playerOneName,
    playerTwoName,
    setPlayerOneName,
    setPlayerTwoName,
  };
};
