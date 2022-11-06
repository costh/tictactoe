import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Game from "./Game/Game";
import ScoreContextProvider from "./_Context/ScoreContext";

function App() {
  return (
    <div className="">
      <ScoreContextProvider>
        <Game />
      </ScoreContextProvider>
    </div>
  );
}

export default App;
