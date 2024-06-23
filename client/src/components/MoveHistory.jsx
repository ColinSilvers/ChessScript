import { Stack } from "@mui/material";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";

const MovesHistory = ({ moves }) => {
  const movesCopy = [...moves];
  const [whiteMoves, setWhiteMoves] = useState([]);
  const [blackMoves, setBlackMoves] = useState([]);

  useEffect(() => {
    function getWhiteMoves() {
      let counter = 1;
      const whiteMoves = [];
      for (let i = 0; i < movesCopy.length; i++) {
        if (i % 2 === 0) {
          whiteMoves.push(`${counter++}.` + movesCopy[i]);
        }
      }
      return whiteMoves.join("\r\n");
    }

    function getBlackMoves() {
      let counter = 1;
      const blackMoves = [];
      for (let i = 0; i < movesCopy.length; i++) {
        if (i % 2 !== 0) {
          blackMoves.push(`${counter++}.` + movesCopy[i]);
        }
      }

      return blackMoves.join("\r\n");
    }
     setWhiteMoves(getWhiteMoves());
     setBlackMoves(getBlackMoves());
  }, [movesCopy]);


  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={10}
        useFlexGap
      >
        <Typography variant="h4" align="justify">
          {whiteMoves}
        </Typography>
        <Typography variant="h4" align="justify">
          {blackMoves}
        </Typography>
      </Stack>
    </>
  );
};

export default MovesHistory;
