import { FormatAlignRight } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import CustomEditor from '../toolbar-actions';
const RightAlign = ({editor}) => {
     return(
         <IconButton aria-label="format-align-right" onClick={(event)=> {
            event.preventDefault();
            CustomEditor.toggleAlignedRight(editor);
        }}>
            <FormatAlignRight />
        </IconButton>
    )
}
export default RightAlign