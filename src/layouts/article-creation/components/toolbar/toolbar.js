import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormatBold, FormatItalic, FormatUnderlined, FormatAlignCenter, FormatAlignLeft, FormatAlignRight, FormatColorText, BrowseGallery} from "@mui/icons-material";
import CustomEditor from './toolbar-actions';
const ToolBarIcons = ({editor}) => {
    return(
        <div className="editor-shortcuts">
        <IconButton aria-label="format-bold" onClick={(event)=> {
            event.preventDefault();
            CustomEditor.isBoldMarkActive(editor);
        }}>
        <FormatBold />
        </IconButton>
        <IconButton aria-label="format-italic">
        <FormatItalic />
        </IconButton>
        <IconButton aria-label="format-underline">
        <FormatUnderlined />
        </IconButton>
        <IconButton aria-label="vertical-align-center">
        <FormatAlignLeft />
        </IconButton>
        <IconButton aria-label="vertical-align-center">
        <FormatAlignCenter />
        </IconButton>
        <IconButton aria-label="vertical-align-center">
        <FormatAlignRight />
        </IconButton>
        <IconButton aria-label="vertical-align-center">
        <FormatColorText />
        </IconButton>
        <IconButton aria-label="vertical-align-center">
        <BrowseGallery />
        </IconButton>
        <IconButton aria-label="delete">
        <DeleteIcon />
        </IconButton>
        </div>
    )
}
export default ToolBarIcons