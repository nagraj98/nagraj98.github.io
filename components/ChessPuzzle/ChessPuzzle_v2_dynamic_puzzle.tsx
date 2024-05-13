import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as ChessJS from "chess.js";
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const Chessboard = dynamic(() => import("chessboardjsx"), { ssr: false });

interface Props {}

const ChessPuzzle: React.FC<Props> = () => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("");
  const [puzzles, setPuzzles] = useState([]);

  useEffect(() => {
    fetch("/mate_in_one.json")
      .then((res) => res.json())
      .then((data) => {
        setPuzzles(data);
        const randomPuzzle = data[Math.floor(Math.random() * data.length)];
        setGame(new Chess(randomPuzzle.fen));
        setFen(randomPuzzle.fen);
      });
  }, []);

  const handleMove = (move: {
    from: string;
    to: string;
    promotion?: string;
  }) => {
    const legalMove = game.move({
      from: move.from,
      to: move.to,
      promotion: "q", // Always promote to a queen for simplicity
    });

    if (legalMove) {
      setFen(game.fen());
    }
  };

  return (
    <div>
      <Chessboard
        width={320}
        position={fen}
        onDrop={(move) =>
          handleMove({
            from: move.sourceSquare,
            to: move.targetSquare,
          })
        }
        orientation="black"
        darkSquareStyle={{ backgroundColor: "purple" }}
        lightSquareStyle={{ backgroundColor: "orange" }}
      />
    </div>
  );
};

export default ChessPuzzle;
