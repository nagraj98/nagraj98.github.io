import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as ChessJS from "chess.js";
import { Button } from "@nextui-org/react";
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const Chessboard = dynamic(() => import("chessboardjsx"), { ssr: false });

const ChessPuzzle: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("");
  const [puzzles, setPuzzles] = useState([]);
  const [selectedPuzzle, setSelectedPuzzle] = useState(null);
  const [audio, setAudio] = useState({ moveSound: null, checkmateSound: null });

  useEffect(() => {
    const moveSound = new Audio("/move-self.mp3"); // Add your sound file in the public directory
    const checkmateSound = new Audio("/move-check.mp3");

    // Store the audio objects in state if you need to reference them elsewhere
    setAudio({ moveSound, checkmateSound });

    fetch("/mate_in_one.json")
      .then((res) => res.json())
      .then((data) => {
        setPuzzles(data);
        const randomPuzzle = data[Math.floor(Math.random() * data.length)];
        setSelectedPuzzle(randomPuzzle);
        setGame(new Chess(randomPuzzle.fen));
        setFen(randomPuzzle.fen);
      });
  }, []);

  const resetPuzzle = () => {
    if (selectedPuzzle) {
      setGame(new Chess(selectedPuzzle.fen));
      setFen(selectedPuzzle.fen);
    }
  };

  const showHint = () => {
    alert(`Hint: ${selectedPuzzle.move}`);
  };

  const handleMove = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    if (move === null) return false; // Illegal move

    if (audio.moveSound) audio.moveSound.play();
    setFen(game.fen());

    if (game.isCheckmate()) {
      if (audio.checkmateSound) audio.checkmateSound.play();
      alert("Checkmate!");
    }

    return true;
  };

  return (
    <div>
      <Chessboard
        width={320}
        position={fen}
        onDrop={(event) => handleMove(event)}
        orientation="black"
        darkSquareStyle={{ backgroundColor: "purple" }}
        lightSquareStyle={{ backgroundColor: "orange" }}
        onSquareClick={(square) => console.log(game.moves({ square }))}
      />
      <Button onClick={resetPuzzle}>Reset Puzzle</Button>
      <Button onClick={showHint}>Show Hint</Button>
    </div>
  );
};

export default ChessPuzzle;
