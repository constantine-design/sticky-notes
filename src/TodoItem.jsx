import { useState, useEffect } from 'react';

const TodoItem = (props) => {

  const [itemPos, setItemPos] = useState({x:10,y:10});
  const [isDragging, setIsDragging] = useState(false);
  const bounds = document.getElementById(props.parentCssId).getBoundingClientRect();

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  });

  const onMouseDown = (e)=>{
    if (e.button !== 0) return;
    //e.preventDefault()
    setIsDragging(true);
  }

  const onMouseUp = (e)=>{
    //e.preventDefault();
    setIsDragging(false);
  }

  const onMouseMove = (e)=>{
    if (!isDragging) return;
    let x = e.clientX - bounds.left - 10;
    let y = e.clientY - bounds.top - 10;
    if (x<0) x = 0;
    if (y<0) y = 0;
    if (x>bounds.width) x = bounds.width - 200;
    if (y>bounds.height) y = bounds.height - 200;
    setItemPos({ x: x, y: y, });
  }

  return (
      <li
        className={"position-absolute card bg-white shadow-sm"+(isDragging?" dragging":"") }
        style={{ top: itemPos.y, left: itemPos.x, ...getStyles(props.item) }}
        //onClick={props.onClick.bind(null, props.item)}
        onMouseDown={onMouseDown}
      >
        <div className="card-header pe-2">
          <div className="d-flex align-items-center">
              <div className="d-flex flex-grow-1 text-right">
                {props.item.title}
              </div>
              <div className="d-flex">
                <button className="btn btn-danger btn-sm">✕</button>
              </div>
          </div>
        </div>
        <textarea
          autofocus
          style={{ width:"100%", height: "100%", resize: "none", border: "none" }}
        >
        </textarea>
      </li>
  );
}

export default TodoItem;

const getStyles = (item) => {
    return({
        // backgroundColor: item.isDone ? "green" : "red",
        width: "200px",
        height: "200px",
        cursor: "pointer"
    });
}
