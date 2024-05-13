import { Chess } from "chess.js";
import React, { useState, useEffect } from "react";

import Chessground from "@react-chess/chessground";

// these styles must be imported somewhere
import "chessground/assets/chessground.base.css";
import "chessground/assets/chessground.brown.css";
import "chessground/assets/chessground.cburnett.css";

export default (ChessPuzzle) => {
  const [game, setGame] = useState(new Chess());
  const [fen, setFen] = useState("start");

  useEffect(() => {
    setFen(game.fen());
  }, [game]);

  const onMove = (from, to) => {
    const move = game.move({
      from,
      to,
      promotion: "q", // NOTE: Handle promotions if necessary
    });
    if (move) {
      setFen(game.fen());
    }
  };

  return (
    <div>
      <Chessground position={fen} onMove={onMove} />
    </div>
  );
};
