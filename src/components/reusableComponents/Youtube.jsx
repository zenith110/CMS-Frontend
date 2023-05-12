import { useState } from "react";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import YouTubeIcon from '@mui/icons-material/YouTube';
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
const Youtube = ({ textareaRef, setContent, content}) => {
    const [ linkTitle, setLinkTitle] = useState("")
    const [ link, setLink] = useState("");
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const AddLink = () => {
        const selectionStart = textareaRef.current.selectionStart;
        const selectionEnd = textareaRef.current.selectionEnd;
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
        var match = link.match(regExp);
        var youtubeId = match[7];
        let newValue = content.substring(0, selectionStart) + `[![](https://img.youtube.com/vi/${youtubeId}/0.jpg)](${link} "${linkTitle}")` + content.substring(selectionEnd, content.length);
        setContent(newValue)
        handleClose()
    }
    return(
        <>
        <label onClick={handleOpen}><YouTubeIcon/></label>
        <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Link Creation
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <label>Title</label>
          <br/>
          <input type='text' onChange={(e) => setLinkTitle(e.target.value)}></input>
          <br/>
          <label>Link</label>
          <br/>
          <input type='text' onChange={(e) => setLink(e.target.value)}></input>
          <br/>
          <Button onClick={AddLink}>Submit</Button>
          <Button onClick={handleClose} />
          </Typography>
        </Box>
      </Modal>
        </>
    )
}
export default Youtube;