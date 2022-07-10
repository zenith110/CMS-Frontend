/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable no-console */
// Import React dependencies.
import React, { useState } from "react";
// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

function SlateEditor(value) {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));
  return (
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
  );
}

export default SlateEditor;
