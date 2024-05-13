import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as ChessJS from "chess.js";
import { useAppContext } from "../Context/AppContext";

import GradientText from "../GradientText/GradientText";

import { Button } from "@nextui-org/react";
import buttonStyles from "../../styles/buttons.module.css";
import chessStyles from "./chess.module.css";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const Chessboard = dynamic(() => import("chessboardjsx"), { ssr: false });

// const ChessPuzzle: React.FC = () =>
export default function ChessPuzzle() {
  const device = useAppContext();

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
    setMessage(""); // Clear message
    setHighlightSquares({}); // Clear highlights
  };

  const resetPuzzle = () => {
    if (selectedPuzzle) {
      setGame(new Chess(selectedPuzzle.fen));
      setFen(selectedPuzzle.fen);
      setMessage("");
      setHighlightSquares({});
    }
  };

  // Helper function to find all moves that lead to checkmate
  const findCheckmateMoves = (game) => {
    const tempGame = new Chess(game.fen()); // Create a temporary game instance
    return tempGame.moves({ verbose: true }).filter((move) => {
      tempGame.move(move);
      const checkmate = tempGame.isCheckmate();
      tempGame.undo();
      return checkmate;
    });
  };

  // Function to get full piece name
  const getPieceFullName = (pieceCode) => {
    const names = {
      p: "Pawn",
      n: "Knight",
      b: "Bishop",
      r: "Rook",
      q: "Queen",
      k: "King",
    };
    return names[pieceCode.toLowerCase()] || pieceCode.toUpperCase();
  };

  // Show Solution using the checkmate move
  const showSolution = () => {
    const checkmateMoves = findCheckmateMoves(game);
    const solutionMove = checkmateMoves[0]; // Assume the first checkmate move is the solution
    if (solutionMove) {
      setHighlightSquares({
        [solutionMove.from]: { backgroundColor: "rgba(0, 0, 255, 0.4)" },
        [solutionMove.to]: { backgroundColor: "rgba(0, 255, 0, 0.4)" },
      });
      const pieceFullName = getPieceFullName(solutionMove.piece);
      setMessage(
        `Move ${pieceFullName} from ${solutionMove.from} to ${solutionMove.to}`
      );
    }
  };

  // Update the Hint function to use checkmate moves
  const showHint = () => {
    const checkmateMoves = findCheckmateMoves(game);
    if (checkmateMoves.length > 0) {
      const hintMove =
        checkmateMoves[Math.floor(Math.random() * checkmateMoves.length)]; // Random checkmate move as a hint
      setHighlightSquares({
        [hintMove.to]: { backgroundColor: "rgba(0, 255, 0, 0.4)" }, // Highlight the target square
      });
      setMessage(`Move a piece to ${hintMove.to}`);
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
        // alert("Checkmate!");
        // something;
        setMessage(`Checkmate ! Wohooo`);
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
    <div id="chesspuzzle">
      <div>
        <GradientText
          h2
          size={device == "lg" ? "$6xl" : "4xl"}
          text="Chess Puzzle"
        />

        <div className={`${chessStyles.textcenter}`}>
          <p>
            {orientation.charAt(0).toUpperCase() + orientation.slice(1)} to play
          </p>
          <p>{message}</p>
        </div>

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
                  [selectedSquare]: {
                    backgroundColor: "rgba(255, 255, 0, 0.4)",
                  }, // Highlight the selected square
                  ...game
                    .moves({ square: selectedSquare, verbose: true })
                    .reduce(
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
        <div className={`${chessStyles.bgrid}`}>
          {/* <div className={chessStyles.buttonGrid}> */}
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
            onClick={showHint}
          >
            Hint
          </Button>
          <Button
            bordered
            className={`${buttonStyles.button} ${buttonStyles.customButton}`}
            onClick={showSolution}
          >
            Solution
          </Button>
        </div>
      </div>
    </div>
  );
}

// export default ChessPuzzle;
