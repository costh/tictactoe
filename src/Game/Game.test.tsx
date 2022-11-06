import {
  findAllByText,
  findByText,
  fireEvent,
  logRoles,
  prettyDOM,
  render,
  screen,
} from "@testing-library/react";
import { useState } from "react";
import ScoreContextProvider from "../_Context/ScoreContext";
import { useGameSystemReturnType } from "../_Hooks/GameSystem/types";
import { useGameSystem } from "../_Hooks/GameSystem/useGameSystem";
import Game from "./Game";

const getButtonByXy = (row: number, column: number): Element =>
  document.querySelector(`[data-xy-position="${row}${column}"]`) as Element;

const startPlayToWinSequenceForPlayerOne = () => {
  const playSequence = [
    getButtonByXy(0, 0),
    getButtonByXy(1, 0),
    getButtonByXy(0, 1),
    getButtonByXy(1, 1),
    getButtonByXy(0, 2),
  ];

  playSequence.forEach((button) => {
    fireEvent.click(button);
  });
};

const startPlayToWinSequenceForPlayerTwo = () => {
  const playSequence = [
    getButtonByXy(0, 0),
    getButtonByXy(1, 0),
    getButtonByXy(0, 1),
    getButtonByXy(1, 1),
    getButtonByXy(2, 2),
    getButtonByXy(1, 2),
  ];

  playSequence.forEach((button) => {
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
};

const startPlayToWinToTieGame = () => {
  // X,Y,X
  // X,Y,Y
  // Y,X,X
  const playSequence = [
    getButtonByXy(0, 0),
    getButtonByXy(0, 1),
    getButtonByXy(0, 2),
    getButtonByXy(1, 1),
    getButtonByXy(1, 0),
    getButtonByXy(1, 2),
    getButtonByXy(2, 1),
    getButtonByXy(2, 0),
    getButtonByXy(2, 2),
  ];

  playSequence.forEach((button) => {
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });
};

describe("Game Component", () => {
  it("initialises with unplayed tiles and no scoring history", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    expect(screen.queryByText("Games played (latest first)")).toBeNull();
    expect(
      screen.getAllByRole("button", { name: "Unplayed Tile" }).length
    ).toBe(9);

    expect(screen.queryByText("Play Again")).toBeNull();
    expect(
      document.querySelector('[data-qa="currently-playing"]')
    ).toBeInTheDocument();

    expect(container.querySelector('[data-qa="game-win"]')).toBeNull();
    expect(container.querySelector('[data-qa="game-tied"]')).toBeNull();
  });

  it("Display's a winning status that favours player one if right combination is played and player one wins first row", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    startPlayToWinSequenceForPlayerOne();

    expect(container.querySelector('[data-qa="game-win"]')).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Player One won this round!" }));
    expect(container.querySelector('[data-qa="game-tied"]')).toBeNull();
  });

  it("Displays a winning status that favours player two if right combination is played and player two wins second row", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    startPlayToWinSequenceForPlayerTwo();

    expect(container.querySelector('[data-qa="game-win"]')).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Player Two won this round!" })
    ).toBeInTheDocument();
    expect(container.querySelector('[data-qa="game-tied"]')).toBeNull();
  });
  it("Displays a status that the game is tied if there are if there no turns remaining", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    startPlayToWinToTieGame();

    expect(
      container.querySelector('[data-qa="game-win"]')
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Oops the game is tied!" })
    ).toBeInTheDocument();

    expect(container.querySelector('[data-qa="game-tied"]')).not.toBeNull();
  });

  it("Display's a Play button once game is finished and resets to intial state once clicked i.e all buttons on board unclicked and playbutton and status's unavailable ", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    expect(screen.queryByText("Play Again")).toBeNull();

    startPlayToWinSequenceForPlayerOne();

    const playAgainButton = screen.getByRole("button", { name: "Play Again" });

    expect(playAgainButton).toBeInTheDocument();

    fireEvent.click(playAgainButton);

    expect(
      screen.getAllByRole("button", { name: "Unplayed Tile" }).length
    ).toBe(9);

    expect(screen.queryByText("Play Again")).toBeNull();
    expect(
      document.querySelector('[data-qa="currently-playing"]')
    ).toBeInTheDocument();

    expect(container.querySelector('[data-qa="game-win"]')).toBeNull();
    expect(container.querySelector('[data-qa="game-tied"]')).toBeNull();
  });
  it("Displays a games history list with three items once all games have been won for player one, player two and last one for game being tied", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    startPlayToWinSequenceForPlayerOne();

    fireEvent.click(screen.getByRole("button", { name: "Play Again" }));

    startPlayToWinSequenceForPlayerTwo();

    fireEvent.click(screen.getByRole("button", { name: "Play Again" }));

    startPlayToWinToTieGame();

    logRoles(container);

    expect(screen.queryByText("Games played (latest first)")).not.toBeNull();

    expect(
      screen.getByRole("listitem", {
        name: "Player Two won the game against Player One",
      })
    );
    expect(
      screen.getByRole("listitem", {
        name: "Player One won the game against Player Two",
      })
    );

    expect(
      screen.getByRole("listitem", {
        name: "Game was tied between Player One and Player Two",
      })
    );
  });
});
