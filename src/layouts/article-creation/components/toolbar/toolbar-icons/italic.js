import IconButton from '@mui/material/IconButton';
import { FormatItalic } from "@mui/icons-material";
import CustomEditor from '../toolbar-actions';
const Italic = ({editor}) => {
    return(
         <IconButton aria-label="format-italic" onClick={(event)=> {
            event.preventDefault();
            CustomEditor.toggleItalicBlock(editor);
        }}>
            <FormatItalic />
        </IconButton>
    )
}
export default Italic