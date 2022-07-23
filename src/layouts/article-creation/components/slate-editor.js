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
    <ToolBarIcons editor={editor}/>
    <div>
    <Slate editor={editor} value={value.value} onChange={(newValue) => value.setValue(newValue)}>
      <Editable
        renderElement={renderElement}
        // Pass in the `renderLeaf` function.
        renderLeaf={renderLeaf}
        onKeyDown={event => {
          if (!event.ctrlKey) {
            return
          }
           switch (event.key) {
            case "b": {
              event.preventDefault()
              CustomEditor.toggleBoldMark(editor);
              break;
            }
           case "u": {
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

// Allows the change of the leaf for the text
const Leaf = (props) => {
  let style;
  if(props.leaf["bold"]){
      style = {
        "fontWeight": "bold"
      }
  }
  else if(props.leaf["underline"]){
      style = {
        "textDecoration": "underline"
      }
  }
  else if(props.leaf["italic"]){
    style = {
      "fontStyle": "italic"
    }
  }
  return (
    <span
      {...props.attributes}
      style={style}
    >
      {props.children}
    </span>
  )
}

export default SlateEditor;
