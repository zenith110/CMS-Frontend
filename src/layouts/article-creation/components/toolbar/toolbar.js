import Bold from './toolbar-icons/bold';
import Italic from './toolbar-icons/italic';
import Underline from './toolbar-icons/underline';
import LeftAlign from './toolbar-icons/left-align';
import CenterAlign from './toolbar-icons/center-align';
import RightAlign from './toolbar-icons/right-align';
import ColorPicker from './toolbar-icons/colorpicker';
import { PermMedia } from "@mui/icons-material";
const ToolBarIcons = ({editor}) => {
    return(
        <div className="editor-shortcuts">
        <Bold editor={editor} />
        <Italic editor={editor} />
        <Underline editor={editor} />
        <LeftAlign editor={editor} />
        <CenterAlign editor={editor} />
        <RightAlign editor={editor} />
        <ColorPicker editor={editor} />
        {/* <IconButton aria-label="vertical-align-center">
        <PermMedia />
        </IconButton> */}
        </div>
    )
}
export default ToolBarIcons