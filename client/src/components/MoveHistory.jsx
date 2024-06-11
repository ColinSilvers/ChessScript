import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import * as react from 'react';
import { blue } from "@mui/material/colors";


const MovesHistory = ({moves}) => {


  return (
    <div className="moves-container">
      {moves}
    </div>
  )

}

export default MovesHistory;