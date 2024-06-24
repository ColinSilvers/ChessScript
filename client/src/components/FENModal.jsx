import { useState } from "react";
import { Button } from "@mui/material";
import { FormControl } from "@mui/material";
import { FormLabel } from "@mui/material";
import { Input } from "@mui/material";
import { Modal } from "@mui/material";
import { Dialog } from "@mui/material";
import { DialogContent } from "@mui/material";
import { DialogTitle } from "@mui/material";
import { Stack } from "@mui/material";
import { Add } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Typography } from "@mui/material";
import { ModalClose } from '@mui/joy';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const FENModal = ({ sendDataToParent }) => {
  const [open, setOpen] = useState(false);
  const [fenString, setFenString] = useState('');

  function handleClick() {
    sendDataToParent(fenString);
  }

  return (
    <div>
      <Button
        variant="contained"
        color="success"
        onClick={() => setOpen(true)}
      >
        Import FEN
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ModalClose onClick={() => setOpen(false)}/>  
          <DialogTitle>Import FEN String</DialogTitle>
          <form onSubmit={(event) => {
            event.preventDefault();
            setFenString(event.target[0].value);
            console.log(event.target[0].value);
            sendDataToParent(fenString);
            setOpen(false);
          }}>
            <FormControl>
              <FormLabel>FEN String</FormLabel>
              <Input required />
            </FormControl>
            <Button type="submit">Submit</Button>
          </form>
        </Box>
      </Modal>
    </div>
  );
};

export default FENModal;
