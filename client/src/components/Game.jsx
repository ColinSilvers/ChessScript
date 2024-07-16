import { useState, useMemo, useCallback, useEffect } from "react";
import { Chessboard } from "react-chessboard";
import { Chess, validateFen } from "chess.js";
import CustomDialog from "./CustomDialog";
import MovesHistory from "./MoveHistory";
import FENModal from "./FENModal";
import socket from "../socket";
import { Button, ButtonGroup } from "@mui/material";

const Game = ({ players, room, orientation, cleanup }) => {
  const chess = useMemo(() => new Chess(), []);
  const [fen, setFen] = useState(Chess.DEFAULT_POSITION);
  const [over, setOver] = useState("");

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
    // orientation is either 'white' or 'black'. game.turn() returns 'w' or 'b'
    if (chess.turn() !== orientation[0]) return false; // <- 1 prohibit player from moving piece of other player

    if (players.length < 2) return false; // <- 2 disallow a move if the opponent has not joined
    
    const moveData = {
      from: sourceSquare,
      to: targetSquare,
      color: chess.turn(),
    };

    const move = makeAMove(moveData);
    console.log(moveData);
    console.log(chess.history());

    if (move === null) return false;

    socket.emit("move", { // <- 3 emit a move event.
      move,
      room,
    });

    return true;
  }

  useEffect(() => {
    socket.on("move", (move) => {
      makeAMove(move); //
    });
  }, [makeAMove]);

  useEffect(() => {
    socket.on('playerDisconnected', (player) => {
      setOver(`${player.username} has disconnected`); // set game over
    });
  }, []);

  function resetBoard() {
    chess.reset();
    setFen(Chess.DEFAULT_POSITION);
  }

  function undoMove() {
    try {
      const moveToUndo = chess.undo();
      setFen(moveToUndo.before);
    } catch (e) {
      console.log(e);
    }
  }

  const handleDataFromChild = (data) => {
    try {
      let res = validateFen(data);
      if (res.ok) {
        setFen(data);
      } else {
        alert(res.error);
      }
    } catch (e) {
      console.log(e);
    }
    if (chess.isGameOver()) {
      if (chess.isCheckmate()) {
        setOver(`Checkmate! ${chess.turn() === "w" ? "Black" : "White"} wins!`);
      } else if (chess.isDraw()) {
        setOver("Draw");
      } else {
        setOver("Game over");
      }
    }
  };

  return (
    <>
      <div class="board">
        <Chessboard class="chessboard" position={fen} onPieceDrop={onDrop} boardOrientation={orientation}/>
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
          <FENModal dataFromChild={handleDataFromChild} />
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
