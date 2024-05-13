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
  const [squareStyles, setSquareStyles] = useState({});

  useEffect(() => {
    const moveSound = new Audio("/move-self.mp3");
    const checkmateSound = new Audio("/move-check.mp3");
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

  const handleSquareClick = (square) => {
    const moves = game.moves({ square, verbose: true });
    const newSquareStyles = moves.reduce(
      (styles, move) => ({
        ...styles,
        [move.to]: {
          background: "radial-gradient(circle, #fffc00 36%, transparent 40%)",
          borderRadius: "50%",
        },
      }),
      { [square]: { backgroundColor: "rgba(255, 255, 0, 0.4)" } }
    );
    setSquareStyles(newSquareStyles);
  };

  const handleMove = ({ sourceSquare, targetSquare }) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q",
    });

    setSquareStyles({}); // Reset square styles after the move

    if (move === null) {
      return false; // Illegal move
    }

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
        squareStyles={squareStyles}
        onSquareClick={handleSquareClick}
      />
      <Button onClick={resetPuzzle}>Reset Puzzle</Button>
      <Button onClick={showHint}>Show Hint</Button>
    </div>
  );
};

export default ChessPuzzle;
