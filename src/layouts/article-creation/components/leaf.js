const Leaf = (props) => {
  let style;
  if(props.leaf["bold"]){
      style = {
        "fontWeight": props.leaf.bold ? "bold" : "normal"
      }
  }
  else if(props.leaf["underline"]){
      style = {
        "textDecoration": props.leaf.underline ? "underline" : "normal"
      }
  }
  else if(props.leaf["italic"]){
    style = {
      "fontStyle": props.leaf.italic ? "italic" : "normal"
    }
  }
  else if(props.leaf["alignedleft"]){
    style = {
      "textAlign": props.leaf.alignedleft ? "left" : "center"
    }
  }
  else if(props.leaf["alignedcenter"]){
    style = {
      "textAlign": props.leaf.alignedcenter ? "center" : "left"
    }
  }
  else if(props.leaf["color"]){
    style = {
      "color": props.leaf.textColor
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
export default Leaf;