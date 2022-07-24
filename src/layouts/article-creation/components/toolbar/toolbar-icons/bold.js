import IconButton from '@mui/material/IconButton';
import { FormatBold } from "@mui/icons-material";
import CustomEditor from '../toolbar-actions';
const Bold = ({editor}) => {
    return(
        <IconButton aria-label="format-bold" onClick={(event)=> {
            event.preventDefault();
            CustomEditor.toggleBoldMark(editor);
        }}>
        <FormatBold />
        </IconButton>
    )
}
export default Bold;