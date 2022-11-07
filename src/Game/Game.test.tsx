import {
  findAllByText,
  findByText,
  fireEvent,
  getByLabelText,
  getByRole,
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

const startGameText = "Start Game";
const dataQa = {
  gameWin: '[data-qa="game-win"]',
  gameTied: '[data-qa="game-tied"]',
  currentlyPlaying: '[data-qa="currently-playing"]',
};

const getButtonByXy = (row: number, column: number): Element =>
  document.querySelector(`[data-xy-position="${row}${column}"]`) as Element;

const startPlayToWinSequenceForPlayerOne = () => {
  fireEvent.click(screen.getByRole("button", { name: startGameText }));
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
  fireEvent.click(screen.getByRole("button", { name: startGameText }));
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
  fireEvent.click(screen.getByRole("button", { name: startGameText }));
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
  it("initialises with unplayed tiles and no scoring history but with a start game button", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    expect(screen.queryByText("Games played (latest first)")).toBeNull();
    expect(
      screen.getAllByRole("button", { name: "Unplayed Tile" }).length
    ).toBe(9);

    expect(screen.queryByText(startGameText)).toBeInTheDocument();
    expect(
      document.querySelector(dataQa.currentlyPlaying)
    ).not.toBeInTheDocument();

    expect(container.querySelector(dataQa.gameWin)).not.toBeInTheDocument();
    expect(container.querySelector(dataQa.gameTied)).not.toBeInTheDocument();
  });

  it("Display's a winning status that favours player one if right combination is played and player one wins first row", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    startPlayToWinSequenceForPlayerOne();

    expect(container.querySelector(dataQa.gameWin)).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Player One won this round!" }));
    expect(container.querySelector(dataQa.gameTied)).toBeNull();
  });

  it("Displays a winning status that favours player two if right combination is played and player two wins second row", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    startPlayToWinSequenceForPlayerTwo();

    expect(container.querySelector(dataQa.gameWin)).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Player Two won this round!" })
    ).toBeInTheDocument();
    expect(container.querySelector(dataQa.gameTied)).toBeNull();
  });
  it("Displays a status that the game is tied if there are if there no turns remaining", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    startPlayToWinToTieGame();

    expect(container.querySelector(dataQa.gameWin)).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Oops the game is tied!" })
    ).toBeInTheDocument();

    expect(container.querySelector(dataQa.gameTied)).not.toBeNull();
  });

  it("Display's a Play button once game is finished and resets to intial state once clicked i.e all buttons on board unclicked and playbutton and status's unavailable ", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    expect(screen.queryByText(startGameText)).toBeInTheDocument();

    startPlayToWinSequenceForPlayerOne();

    const playAgainButton = screen.getByRole("button", { name: startGameText });

    expect(playAgainButton).toBeInTheDocument();

    fireEvent.click(playAgainButton);

    expect(
      screen.getAllByRole("button", { name: "Unplayed Tile" }).length
    ).toBe(9);

    expect(screen.queryByText(startGameText)).toBeNull();
    expect(document.querySelector(dataQa.currentlyPlaying)).toBeInTheDocument();

    expect(container.querySelector(dataQa.gameWin)).toBeNull();
    expect(container.querySelector(dataQa.gameTied)).toBeNull();
  });
  it("Displays a games history list with three items once all games have been won for player one, player two and last one for game being tied", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    startPlayToWinSequenceForPlayerOne();

    startPlayToWinSequenceForPlayerTwo();

    startPlayToWinToTieGame();

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

  it("Display's custom names display in the scoreboard and when game is won", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    const tempPlayer1Name = "Michael Scott";
    const tempPlayer2Name = "Toby";

    fireEvent.change(screen.getByRole("textbox", { name: "Player One" }), {
      target: { value: tempPlayer1Name },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Player Two" }), {
      target: { value: tempPlayer2Name },
    });

    startPlayToWinSequenceForPlayerOne();

    expect(container.querySelector(dataQa.gameWin)).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: `${tempPlayer1Name} won this round!`,
      })
    );

    startPlayToWinSequenceForPlayerTwo();

    expect(
      screen.getByRole("heading", {
        name: `${tempPlayer2Name} won this round!`,
      })
    );

    startPlayToWinToTieGame();

    expect(
      screen.getByRole("listitem", {
        name: `${tempPlayer1Name} won the game against ${tempPlayer2Name}`,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("listitem", {
        name: `${tempPlayer2Name} won the game against ${tempPlayer1Name}`,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("listitem", {
        name: "Game was tied between Michael Scott and Toby",
      })
    ).toBeInTheDocument();
  });
  it("Display's the custom names display in currently playing status", () => {
    const { container } = render(
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    );

    const tempPlayer1Name = "Michael Scott";
    const tempPlayer2Name = "Toby";

    fireEvent.change(screen.getByRole("textbox", { name: "Player One" }), {
      target: { value: tempPlayer1Name },
    });

    fireEvent.change(screen.getByRole("textbox", { name: "Player Two" }), {
      target: { value: tempPlayer2Name },
    });

    fireEvent.click(screen.getByRole("button", { name: startGameText }));

    expect(
      screen.getByRole("heading", {
        name: `Currently Playing: ${tempPlayer1Name}`,
      })
    );

    fireEvent.click(getButtonByXy(0, 0)),
      expect(
        screen.getByRole("heading", {
          name: `Currently Playing: ${tempPlayer2Name}`,
        })
      );
  });
});
