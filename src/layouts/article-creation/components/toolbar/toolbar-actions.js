import { Transforms, Text, Editor} from "slate";
const CustomEditor = {
  isBoldMarkActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.bold === true,
      universal: true,
    })
    
    return !!match
  },

  isUnderlineMarkActive(editor){
    const [match] = Editor.nodes(editor, {
        match: n => n.underline === true,
        universal: true
    })
    return !!match;
  },

  isItalicMarkActive(editor){
    const [match] = Editor.nodes(editor, {
        match: n => n.italic === true,
        universal: true
    })
    return !!match;
  },

  isAlignedLeftActive(editor){
    const [match] = Editor.nodes(editor, {
        match: n => n.alignedleft === true,
        universal: true
    })
    return !!match;
  },
  isAlignedCenterActive(editor){
    const [match] = Editor.nodes(editor, {
        match: n => n.alignedcenter === true,
        universal: true
    })
    return !!match;
  },
  isAlignedRightActive(editor){
    const [match] = Editor.nodes(editor, {
        match: n => n.alignedright === true,
        universal: true
    })
    return !!match;
  },
  isCodeBlockActive(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'code',
    })

    return !!match
  },
  isColorTextChange(editor) {
    const [match] = Editor.nodes(editor, {
      match: n => n.type === 'color',
    })

    return !!match
  },

  toggleBoldMark(editor) {
    const isActive = CustomEditor.isBoldMarkActive(editor)
    Transforms.setNodes(
      editor,
      { bold: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleCodeBlock(editor) {
    const isActive = CustomEditor.isCodeBlockActive(editor)
    Transforms.setNodes(
      editor,
      { type: isActive ? null : 'code' },
      { match: n => Editor.isBlock(editor, n) }
    )
  },

  toggleUnderlineBlock(editor) {
    const isActive = CustomEditor.isUnderlineMarkActive(editor)
    console.log(isActive)
    Transforms.setNodes(
      editor,
      { underline: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleItalicBlock(editor) {
    const isActive = CustomEditor.isItalicMarkActive(editor)
    Transforms.setNodes(
      editor,
      { italic: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },

  toggleAlignedLeft(editor) {
    const isActive = CustomEditor.isAlignedLeftActive(editor)
    Transforms.setNodes(
      editor,
      { alignedleft: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },
  toggleAlignedCenter(editor) {
    const isActive = CustomEditor.isAlignedCenterActive(editor)
    Transforms.setNodes(
      editor,
      { alignedcenter: isActive ? null : true },
      { match: n => Text.isText(n), split: true },
    )
  },
  toggleAlignedRight(editor) {
    const isActive = CustomEditor.isAlignedRightActive(editor)
    Transforms.setNodes(
      editor,
      { alignedright: isActive ? null : true },
      { match: n => Text.isText(n), split: true }
    )
  },
  toggleFontColor(editor, color){
    const isActive = CustomEditor.isColorTextChange(editor)
    Transforms.setNodes(
      editor,
      { color: isActive ? null : true,  textColor: color},
      { match: n => Text.isText(n), split: true }
    )
  }
}
export default CustomEditor;