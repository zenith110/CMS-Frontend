import IconButton from '@mui/material/IconButton';
import { FormatUnderlined } from "@mui/icons-material";
import CustomEditor from '../toolbar-actions';
const Underline = ({editor}) => {
    return(
         <IconButton aria-label="format-underline" onClick={(event)=> {
            event.preventDefault();
            CustomEditor.toggleUnderlineBlock(editor);
        }}>
            <FormatUnderlined />
        </IconButton>
    )
}
export default Underline