import Chessboard from "chessboardjsx";
import { useAppContext } from "../Context/AppContext";

interface Props {
  position: string;
}

export default (ChessPuzzle) => {
  const device = useAppContext();
  return (
    <div>
      <Chessboard position="start" />
    </div>
  );
};
