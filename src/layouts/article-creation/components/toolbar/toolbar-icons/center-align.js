import { FormatAlignCenter } from "@mui/icons-material";
import IconButton from '@mui/material/IconButton';
import CustomEditor from '../toolbar-actions';
const CenterAlign = ({editor}) => {
     return(
         <IconButton aria-label="format-align-center" onClick={(event)=> {
            event.preventDefault();
            CustomEditor.toggleAlignedCenter(editor);
        }}>
            <FormatAlignCenter />
        </IconButton>
    )
}
export default CenterAlign