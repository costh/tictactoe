import React, { createContext, useContext } from "react";
import {
  ScoreBoardReturnType,
  useScoreBoard,
} from "../_Hooks/ScoreBoard/useScoreBoard";

const ScoreCtx = createContext<ScoreBoardReturnType>(
  {} as ScoreBoardReturnType
);

const ScoreContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ScoreCtx.Provider value={useScoreBoard()}>{children}</ScoreCtx.Provider>
  );
};

export const useScoreContext = () => useContext(ScoreCtx);

export default ScoreContextProvider;
