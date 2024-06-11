import { Container, TextField } from "@mui/material";
import socket from "./socket";
import Game from "./components/Game";
import MovesHistory from "./components/MoveHistory";
import { useState } from "react";
import CustomDialog from "./components/CustomDialog";

export default function App() {
  const [username, setUsername] = useState("");

  // indicates if a username has been submitted
  const [usernameSubmitted, setUsernameSubmitted] = useState(false);

  return (
    <>
      <Container className="container">
        <CustomDialog
          open={!usernameSubmitted} // leave open if username has not been selected
          title="Pick a username" // Title of dialog
          contentText="Please select a username" // content text of dialog
          handleContinue={() => {
            if (!username) return; // if username hasn't been entered, do nothing
            socket.emit("username", username); // emit a websocket event called "username" with the username as data
            setUsernameSubmitted(true); // indicate that username has been submitted
          }}
        >
          <TextField // Input
            autoFocus // automatically set focus on input (make it active).
            margin="dense"
            id="username"
            label="Username"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)} // update username state with value
            type="text"
            fullWidth
            variant="standard"
          />
        </CustomDialog>
        <Game />
      </Container>  
    </>
  );
}
