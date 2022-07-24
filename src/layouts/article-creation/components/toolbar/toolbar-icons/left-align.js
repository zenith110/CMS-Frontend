import { FormatAlignLeft } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import CustomEditor from '../toolbar-actions';
const LeftAlign = ({editor}) => {
     return(
         <IconButton aria-label="format-align-left" onClick={(event)=> {
            event.preventDefault();
            CustomEditor.toggleAlignedLeft(editor);
        }}>
            <FormatAlignLeft />
        </IconButton>
    )
}
export default LeftAlign