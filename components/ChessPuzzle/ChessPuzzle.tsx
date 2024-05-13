import React, { useState, useEffect } from "react";
import { Chess } from "chess.js";
import Chessground from "@react-chess/chessground";
import { useAppContext } from "../Context/AppContext";

import GradientText from "../GradientText/GradientText";
import { Button } from "@nextui-org/react";
import buttonStyles from "../../styles/buttons.module.css";
import chessStyles from "./chess.module.css";

// these styles must be imported somewhere
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

export default function ChessPuzzle() {
  const device = useAppContext();

  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");
  const [puzzles, setPuzzles] = useState([]);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [audio, setAudio] = useState({ moveSound: null, checkmateSound: null });
  const [orientation, setOrientation] = useState("white"); // Default orientation
  const [message, setMessage] = useState("");

  useEffect(() => {
    const moveSound = new Audio("/move-self.mp3");
    const checkmateSound = new Audio("/move-check.mp3");
    setAudio({ moveSound, checkmateSound });

    loadPuzzles();
  }, []);

  const loadPuzzles = () => {
    fetch("/mate_in_one.json")
      .then((res) => res.json())
      .then((data) => {
        setPuzzles(data);
        selectRandomPuzzle(data);
      });
  };

  const selectRandomPuzzle = (puzzles) => {
    const randomPuzzle = puzzles[Math.floor(Math.random() * puzzles.length)];
    setSelectedPuzzle(randomPuzzle);
    const newGame = new Chess(randomPuzzle.fen);
    setGame(newGame);
    setFen(randomPuzzle.fen);
    setOrientation(newGame.turn() === "w" ? "white" : "black");
    setMessage("");
  };

  const resetPuzzle = () => {
    if (selectedPuzzle) {
      setGame(new Chess(selectedPuzzle.fen));
      setFen(selectedPuzzle.fen);
      setMessage("");
    }
  };

  const handleMove = (move) => {
    if (game.move(move)) {
      setFen(game.fen());
      if (audio.moveSound) audio.moveSound.play();
      if (game.isCheckmate()) {
        if (audio.checkmateSound) audio.checkmateSound.play();
        setMessage("Checkmate! Wohooo");
      }
    }
  };

  return (
    <div id="chesspuzzle">
      <GradientText
        h2
        size={device === "lg" ? "$6xl" : "4xl"}
        text="Chess Puzzle"
      />

      <div className={chessStyles.textcenter}>
        <p>
          {orientation.charAt(0).toUpperCase() + orientation.slice(1)} to play
        </p>
        <p>{message}</p>
      </div>

      <Chessground
        key={fen}
        width="320px"
        height="320px"
        fen={fen}
        orientation={orientation}
        onMove={handleMove}
        movable={{
          free: false, // restricts moving to legal moves
          color: orientation === "white" ? "white" : "black", // only the side to move can be dragged
        }}
      />

      <div className={chessStyles.bgrid}>
        <Button
          bordered
          className={`${buttonStyles.button} ${buttonStyles.customButton}`}
          onClick={resetPuzzle}
        >
          Reset
        </Button>
        <Button
          bordered
          className={`${buttonStyles.button} ${buttonStyles.customButton}`}
          onClick={() => selectRandomPuzzle(puzzles)}
        >
          New
        </Button>
        <Button
          bordered
          className={`${buttonStyles.button} ${buttonStyles.customButton}`}
          onClick={() => setMessage("Hint: Try moving the Queen!")}
        >
          Hint
        </Button>
        <Button
          bordered
          className={`${buttonStyles.button} ${buttonStyles.customButton}`}
          onClick={() => setMessage("Find the best move!")}
        >
          Solution
        </Button>
      </div>
    </div>
  );
}
