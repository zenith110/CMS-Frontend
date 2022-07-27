import { FormatColorText } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import CustomEditor from '../toolbar-actions';
import { HexColorPicker } from "react-colorful";
import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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
  textAlign: "center"
};
const ColorPicker = ({editor}) => {
     const [color, setColor] = useState("#aabbcc");
     const [open, setOpen] = useState(false);
     const handleOpen = () => setOpen(true);
     const handleClose = () => setOpen(false);
     return(
         <>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <HexColorPicker color={color} onChange={setColor} />
            <Button onClick={(event) => {
              handleClose()
              event.preventDefault();
              CustomEditor.toggleFontColor(editor, color);
            }}>Close</Button>
            </Box>
        </Modal>
         <IconButton aria-label="format-color-text" onClick={handleOpen}>
            <FormatColorText />
        </IconButton>
        </>
    )
}
export default ColorPicker