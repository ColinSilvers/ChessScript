import { Stack } from "@mui/material";
import { Divider } from "@mui/material";
import { Typography } from "@mui/material";

const MovesHistory = ({ moves }) => {
  const movesCopy = [...moves];

  const colOne = getWhiteMoves();
  const colTwo = getBlackMoves();

  function getWhiteMoves() {
    let counter = 1;
    const whiteMoves = [];
    for (let i = 0; i < movesCopy.length; i++) {
      if (i % 2 === 0) {
        whiteMoves.push(`${counter++}.` + movesCopy[i]);
      }
    }
    return whiteMoves.join('\r\n');
  }

  function getBlackMoves() {
    let counter = 1;
    const blackMoves = [];
    for (let i = 0; i < movesCopy.length; i++) {
      if (i % 2 !== 0) {
        blackMoves.push(`${counter++}.` + movesCopy[i]);
      }
    }
    return blackMoves.join('\r\n');
  }

  return (
    <>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={10}
        useFlexGap
      >
        <Typography variant="h4" align="justify">{colOne}</Typography>
        <Typography variant="h4" align="justify">{colTwo}</Typography>
      </Stack>
    </>
  );
};

export default MovesHistory;
