import React from "react";
import { ScoreBoardType } from "../../_Hooks/ScoreBoard/types";

type Props = {
  scoreBoardGames: ScoreBoardType["games"];
};

const ScoreBoardGames: React.FC<Props> = ({ scoreBoardGames }) => {
  return (
    <div className="w-full flex flex-col items-center">
      <h1 className=" font-bold text-lg">Games played (latest first)</h1>
      <ol className="w-full list-decimal list-inside">
        {scoreBoardGames
          .map((item, index) => (
            <li key={index} className="flex w-full">
              <span className="w-1/2 text-left">
                {item.player1} vs {item.player2}
              </span>
              <span className="w-1/2 text-right">{item.winner}</span>
            </li>
          ))
          .reverse()}
      </ol>
    </div>
  );
};

export default ScoreBoardGames;
