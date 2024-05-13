import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import * as ChessJS from "chess.js";
const Chess = typeof ChessJS === "function" ? ChessJS : ChessJS.Chess;

const Chessboard = dynamic(() => import("chessboardjsx"), { ssr: false });

interface Props {
  position: string;
}

const ChessPuzzle: React.FC<Props> = ({ position }) => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState(position);

  useEffect(() => {
    setGame(new Chess(position));
  }, [position]);

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
        orientation="black" // or 'white' depending on the puzzle
        darkSquareStyle={{ backgroundColor: "purple" }}
        lightSquareStyle={{ backgroundColor: "orange" }}
      />
    </div>
  );
};

export default ChessPuzzle;
