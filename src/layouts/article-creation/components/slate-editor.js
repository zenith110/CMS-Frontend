import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { FormatBold } from "@mui/icons-material";
// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

function SlateEditor(value) {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));
  return (
    <>
    <br/>
    <IconButton aria-label="format-bold">
      <FormatBold />
    </IconButton>
    <Slate editor={editor} value={value.value} onChange={(newValue) => value.setValue(newValue)}>
      <Editable
        onKeyDown={(event) => {
          if (event.key === "&") {
            // Prevent the ampersand character from being inserted.
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText("and");
          }
          else if(event.key === "|"){
            event.preventDefault();
            // Execute the `insertText` method when the event occurs.
            editor.insertText("or");
          }
        }}
      />
    </Slate>
    </>
  );
}

export default SlateEditor;
