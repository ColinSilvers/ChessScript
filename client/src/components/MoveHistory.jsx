import { Stack } from "@mui/material";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const MovesHistory = ({ moves }) => {
  const movesCopy = [...moves];
  const [whiteMoves, setWhiteMoves] = useState([movesCopy]);
  const [blackMoves, setBlackMoves] = useState([movesCopy]);

  useEffect(() => {
    function getWhiteMoves() {
      let counter = 1;
      const whiteMovesCopy = [];
      for (let i = 0; i < movesCopy.length; i++) {
        if (i % 2 === 0) {
          whiteMovesCopy.push(`${counter++}.` + movesCopy[i]);
        }
      }
      return whiteMovesCopy;
    }

    function getBlackMoves() {
      let counter = 1;
      const blackMovesCopy = [];
      for (let i = 0; i < movesCopy.length; i++) {
        if (i % 2 !== 0) {
          blackMovesCopy.push(`${counter++}.` + movesCopy[i]);
        }
      }

      return blackMovesCopy;
    }
     setWhiteMoves(getWhiteMoves());
     setBlackMoves(getBlackMoves());
  }, [moves]);


  return (
    <div class="moves-container">
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={10}
        useFlexGap flexWrap="no-wrap"
      >
        <Typography variant="h4" component="h2" align="justify">
          {whiteMoves.map(move => <div class="move">{move}</div>)}
        </Typography>
        <Typography variant="h4" component="h2" align="justify">
          {blackMoves.map(move => <div class="move">{move}</div>)}
        </Typography>
      </Stack>
    </div>
  );
};

export default MovesHistory;
  