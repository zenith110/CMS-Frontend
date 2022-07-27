import React, { useState, useCallback } from "react";

// Import the Slate editor factory.
import { createEditor } from "slate";

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react";

import "./slate-editor.css";

import ToolBarIcons from "./toolbar/toolbar";
import DefaultElement from "./DefaultElement";
import CodeElement from "./CodeElement";
import CustomEditor from "./toolbar/toolbar-actions";
import Leaf from "./leaf";
function SlateEditor(value) {
  // Create a Slate editor object that won't change across renders.
  const [editor] = useState(() => withReact(createEditor()));
  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />
      default:
        return <DefaultElement {...props} />
    }
  }, [])
  const renderLeaf = useCallback(props => {
    return <Leaf {...props} />
  }, [])
  return (
    <>
    <br/>
    <div>
    <Slate editor={editor} value={value.value} onChange={(newValue) => value.setValue(newValue)}>
      <ToolBarIcons editor={editor}/>
      <Editable
        renderElement={renderElement}
        // Pass in the `renderLeaf` function.
        renderLeaf={renderLeaf}
        spellCheck
        autoFocus
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }
           console.log(event.key)
           switch (event.key) {
            case "b": {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor);
              break;
            }
           case "u": {
            console.log("underline is being pressed")
            event.preventDefault();
            CustomEditor.toggleUnderlineBlock(editor);
            break;
          }
          case "i": {
             event.preventDefault();
             CustomEditor.toggleItalicBlock(editor);
             break;
          }
        }
        }}
      />
    </Slate>
    </div>
    </>
  );
}



export default SlateEditor;
