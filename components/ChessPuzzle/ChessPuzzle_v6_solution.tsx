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
  const [selectedSquare, setSelectedSquare] = useState("");
  const [orientation, setOrientation] = useState("white"); // Default orientation
  const [message, setMessage] = useState("");
  const [highlightSquares, setHighlightSquares] = useState({});

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
    setSelectedSquare(""); // Clear selection when new puzzle is loaded
    setOrientation(newGame.turn() === "w" ? "white" : "black"); // Set orientation based on turn
  };

  const resetPuzzle = () => {
    if (selectedPuzzle) {
      setGame(new Chess(selectedPuzzle.fen));
      setFen(selectedPuzzle.fen);
    }
  };

  const showHint = () => {
    alert(`Hint: ${selectedPuzzle.move}`);
  };

  const showSolution = () => {
    const solutionMove = game
      .moves({ verbose: true })
      .find(
        (move) =>
          move.to ===
          selectedPuzzle.move.split("")[2] + selectedPuzzle.move.split("")[3]
      );
    if (solutionMove) {
      setHighlightSquares({
        [solutionMove.from]: { backgroundColor: "rgba(0, 0, 255, 0.4)" },
        [solutionMove.to]: { backgroundColor: "rgba(0, 255, 0, 0.4)" },
      });
      setMessage(
        `Move ${solutionMove.piece.toUpperCase()} from ${
          solutionMove.from
        } to ${solutionMove.to}`
      );
    }
  };

  const handleMove = ({ sourceSquare, targetSquare, piece }) => {
    try {
      const move = game.move({
        from: sourceSquare,
        to: targetSquare,
        promotion: "q",
      });
      if (!move) return false; // Illegal move, don't update FEN

      if (audio.moveSound) audio.moveSound.play();
      setFen(game.fen());

      if (game.isCheckmate()) {
        if (audio.checkmateSound) audio.checkmateSound.play();
        alert("Checkmate!");
      }
      return true;
    } catch (error) {
      console.error("An illegal move was made");
      return false;
    }
  };

  const handleSquareClick = (square) => {
    if (
      selectedSquare &&
      game
        .moves({ square: selectedSquare, verbose: true })
        .map((move) => move.to)
        .includes(square)
    ) {
      handleMove({ sourceSquare: selectedSquare, targetSquare: square });
      setSelectedSquare("");
    } else {
      setSelectedSquare(square);
    }
  };

  return (
    <div>
      <p>
        {orientation.charAt(0).toUpperCase() + orientation.slice(1)} to play
      </p>
      <p>{message}</p>
      <Chessboard
        width={320}
        position={fen}
        onDrop={handleMove}
        orientation={orientation} // Use the state value
        darkSquareStyle={{ backgroundColor: "purple" }}
        lightSquareStyle={{ backgroundColor: "orange" }}
        onSquareClick={handleSquareClick}
        draggable={true}
        squareStyles={
          selectedSquare
            ? {
                [selectedSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" }, // Highlight the selected square
                ...game.moves({ square: selectedSquare, verbose: true }).reduce(
                  (styles, move) => ({
                    ...styles,
                    [move.to]: { backgroundColor: "rgba(0, 255, 0, 0.4)" }, // Highlight legal moves
                  }),
                  {}
                ),
              }
            : {}
        }
      />
      <Button onClick={resetPuzzle}>Reset</Button>
      <Button onClick={() => selectRandomPuzzle(puzzles)}>New</Button>
      <Button onClick={showHint}>Hint</Button>
      <Button onClick={showSolution}>Show Solution</Button>
    </div>
  );
};

export default ChessPuzzle;
