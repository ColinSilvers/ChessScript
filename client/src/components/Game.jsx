import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import CustomDialog from "./CustomDialog";
import MovesHistory from "./MoveHistory";
import FENModal from "./FENModal";
import { Button, ButtonGroup } from "@mui/material";

const Game = ({ players, room, orientation, cleanup }) => {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(chess.fen());
  const [over, setOver] = useState("");
  const [dataFromChild, setDataFromChild] = useState("");

  const makeAMove = useCallback(
    (move) => {
      try {
        const result = chess.move(move);
        setFen(chess.fen());

        console.log(
          "Game over, Checkmate",
          chess.isGameOver(),
          chess.isCheckmate()
        );

        if (chess.isGameOver()) {
          console.log(chess.history());
          if (chess.isCheckmate()) {
            setOver(
              `Checkmate! ${chess.turn() === "w" ? "Black" : "White"} wins!`
            );
          } else if (chess.isDraw()) {
            setOver("Draw");
          } else {
            setOver("Game over");
          }
        }

        return result;
      } catch (e) {
        return null;
      }
    },
    [chess]
  );

  function onDrop(sourceSquare, targetSquare) {
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
    };

    const move = makeAMove(moveData);
    console.log(moveData);
    console.log(chess.history());

    if (move === null) return false;

    return true;
  }

  function resetBoard() {
    chess.reset();
    setFen(Chess.DEFAULT_POSITION);
    chess.load(fen);
  }

  function undoMove() {
    const moveToUndo = chess.undo();
    setFen(moveToUndo.before);
    chess.load(fen);
  }

  const handleDataFromChild = useCallback(
    (data) => {
      try {
        setDataFromChild(data);
        chess.load(dataFromChild);
        setFen(chess.fen());
        console.log(chess.fen());
      } catch (e) {
        console.log(e);
      }
      if (chess.isGameOver()) {
        if (chess.isCheckmate()) {
          setOver(
            `Checkmate! ${chess.turn() === "w" ? "Black" : "White"} wins!`
          );
        } else if (chess.isDraw()) {
          setOver("Draw");
        } else {
          setOver("Game over");
        }
      }
    },
    [dataFromChild]
  );

  return (
    <>
      <div class="board">
        <Chessboard class="chessboard" position={fen} onPieceDrop={onDrop} />
        <div class="moves-container">
          <MovesHistory moves={chess.history()} />
        </div>
      </div>
      <div>
        <ButtonGroup size="large" aria-label="Large button group">
          <Button variant="contained" onClick={resetBoard}>
            Reset
          </Button>
          <Button variant="contained" onClick={undoMove}>
            Undo
          </Button>
          <FENModal sendDataToParent={handleDataFromChild} />
        </ButtonGroup>
      </div>
      <CustomDialog
        open={Boolean(over)}
        title={over}
        contentText={over}
        handleContinue={() => {
          setOver("");
        }}
      />
    </>
  );
};

export default Game;
