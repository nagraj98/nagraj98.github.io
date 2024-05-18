import React, { useState, useEffect } from "react";
import * as ChessJS from "chess.js";
import { Chessboard } from "react-chessboard";
import { useAppContext } from "../Context/AppContext";

import GradientText from "../GradientText/GradientText";

import { Button } from "@nextui-org/react";
import buttonStyles from "../../styles/buttons.module.css";
import chessStyles from "./chess.module.css";

const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

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
      setSelectedSquare("");
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
      // setHighlightSquares({});
      setHighlightSquares({
        [solutionMove.from]: { backgroundColor: "rgba(0, 0, 255, 0.4)" },
        [solutionMove.to]: { backgroundColor: "rgba(0, 255, 0, 0.4)" },
      });
      const pieceFullName = getPieceFullName(solutionMove.piece);
      setMessage(
        `Move ${pieceFullName} from ${solutionMove.from} to ${solutionMove.to}`
      );
    }
    setSelectedSquare("");
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
      setSelectedSquare("");
      setMessage(`Move a piece to ${hintMove.to}`);
    }
  };

  const handleMove = (sourceSquare, targetSquare) => {
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
        setMessage(`Checkmate! Wohooo`);
      } else {
        setMessage(`Good move, but there's one better ! Reset and try again`);
      }
      return true;
    } catch (error) {
      console.error("An illegal move was made");
      return false;
    }
  };

  const handleSquareClick = (piece, square) => {
    if (
      selectedSquare &&
      game
        .moves({ square: selectedSquare, verbose: true })
        .map((move) => move.to)
        .includes(square)
    ) {
      handleMove(selectedSquare, square);
      setSelectedSquare("");
    } else {
      setSelectedSquare(square);
    }
  };

  const getCustomSquareStyles = (selectedSquare, highlightSquares, game) => {
    const clickHighlights = selectedSquare
      ? {
          [selectedSquare]: {
            backgroundColor: "rgba(255, 255, 0, 0.2)",
          },
          ...game.moves({ square: selectedSquare, verbose: true }).reduce(
            (styles, move) => ({
              ...styles,
              [move.to]: { backgroundColor: "rgba(0, 255, 0, 0.2)" },
            }),
            {}
          ),
        }
      : {};

    return {
      ...clickHighlights,
      ...highlightSquares,
    };
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
          position={fen}
          onPieceDrop={(sourceSquare, targetSquare) => {
            const success = handleMove(sourceSquare, targetSquare);
            return success;
          }}
          boardOrientation={orientation} // Use the state value
          boardStyle={{
            borderRadius: "10px",
            boxShadow: `0 5px 15px rgba(0, 0, 0, 0.5)`,
          }}
          customDarkSquareStyle={{ backgroundColor: "purple" }}
          customLightSquareStyle={{ backgroundColor: "orange" }}
          // onSquareClick={handleSquareClick}
          arePiecesDraggable={true}
          customDropSquareStyle={{
            boxShadow: "inset 0 0 1px 6px rgba(255,255,255,0.75)",
          }}
          boardWidth={300}
          customSquareStyles={getCustomSquareStyles(
            selectedSquare,
            highlightSquares,
            game
          )}
          onPieceClick={handleSquareClick}
        />

        <div className={`${chessStyles.bgrid}`}>
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
