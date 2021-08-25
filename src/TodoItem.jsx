import { useState } from 'react';

const TodoItem = ({item, onClick, mouse}) => {
  const [itemPos, setItemPos] = useState({x:0,y:0});
  const [isDragging, setIsDragging] = useState(false);
  let x=0; let y=0;
  if (isDragging) {
    y=mouse.y-10; x=mouse.x-10;
  }
  console.log(mouse);
  return (
      <li
        className={"position-absolute shadow-sm"+(isDragging?" dragging":"") }
        style={{ top: y, left: x, ...getStyles(item) }}
        onClick={onClick.bind(null, item)}
        onMouseDown={()=>{ setIsDragging(true); }}
        onMouseUp={()=>{ setIsDragging(false); }}
      >
          {item.title}
      </li>
  );
}

export default TodoItem;

const getStyles = (item) => {
    return({
        backgroundColor: item.isDone ? "green" : "red",
        width: "150px",
        height: "150px",
    });
}
