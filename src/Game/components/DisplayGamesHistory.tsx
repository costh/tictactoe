import React from "react";
import { gameState, ScoreBoardType } from "../../_Hooks/ScoreBoard/types";

type Props = {
  scoreBoardGames: ScoreBoardType["games"];
};

const DisplayGamesHistory: React.FC<Props> = ({ scoreBoardGames }) => {
  const dynamicLabel = (item: gameState) => {
    if (!item.isTied) {
      return `${item.winner} won the game against ${
        item.winner === item.player1 ? item.player2 : item.player1
      }`;
    }

    return `Game was tied between ${item.player1} and ${item.player2}`;
  };

  return (
    <div className="w-full flex flex-col items-center">
      <h1 className="font-bold text-lg text-blue-800">Games played (latest first)</h1>
      <div className="w-full flex justify-between pb-4 font-bold text-blue-700">
        <span>Players</span>
        <span>Game status</span>
      </div>
      <ol className="w-full list-disc list-inside">
        {scoreBoardGames
          .map((item, index) => {
            return (
              <li
                key={index}
                className="flex w-full"
                aria-label={dynamicLabel(item)}
              >
                <span className="w-1/2 text-left">
                  {item.player1} <strong>vs</strong> {item.player2}
                </span>
                <span className="w-1/2 text-right">
                  {item.isTied ? "Tied" : item.winner}
                </span>
              </li>
            );
          })
          .reverse()}
      </ol>
    </div>
  );
};

export default DisplayGamesHistory;
