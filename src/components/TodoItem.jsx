import { useState, useEffect } from 'react';
import { todoDimensions } from '../lib/dimensions.js';

const TodoItem = (props) => {

  const [itemPos, setItemPos] = useState({x:props.item.left,y:props.item.top});
  const [isDragging, setIsDragging] = useState(false);
  const [bodyText, setBodyText] = useState(props.item.body);

  const [bounds, setBounds] = useState();
  useEffect(() => {
    setBounds( document.getElementById(props.parentCssId).getBoundingClientRect() );
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      return () => {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
  });

  const onMouseDown = (e)=>{
    if (e.button !== 0) return;
    e.preventDefault()
    setIsDragging(true);
  }

  const onMouseUp = (e)=>{
    //e.preventDefault();
    setIsDragging(false);
    props.manageTodo.updatePosition(props.item,itemPos.x,itemPos.y);
  }

  const onMouseMove = (e)=>{
    if (!isDragging) return;
    let x = e.clientX - bounds.left - todoDimensions.width/2;
    let y = e.clientY - bounds.top - 22;
    if (x<0) x = 0;
    if (y<0) y = 0;
    if (x>bounds.width-todoDimensions.width) x = bounds.width - todoDimensions.width;
    if (y>bounds.height-todoDimensions.height) y = bounds.height - todoDimensions.height;
    setItemPos({ x: x, y: y, });
  }

  return (
      <li
        className={"position-absolute card bg-white shadow-sm"+(isDragging?" dragging":"") }
        style={{ top: itemPos.y, left: itemPos.x, ...getStyles(todoDimensions) }}
        //onClick={props.onClick.bind(null, props.item)}
      >
        <div className="card-header p-1">
          <div className="d-flex align-items-center">
              <div className="flex-grow-0">
                <button
                  className= {"btn btn-sm p-0"+(!props.item.isDone?" text-warning":" text-success")}
                  onClick={()=>props.manageTodo.toggleDone(props.item)}
                >
                  <span style={{fontSize: "1.5rem", lineHeight: "1.5rem"}}>
                    { !props.item.isDone ? "☐" : "☑" }
                  </span>
                </button>
              </div>
              <div
                className="flex-grow-1 text-start ps-1 drag-area align-self-stretch d-flex align-items-center"
                onMouseDown={onMouseDown}
              >
                <div>{props.item.title}</div>
              </div>
              <div className="flex-grow-0">
                <button
                  className="btn text-danger btn-sm"
                  onClick={()=>props.manageTodo.delete(props.item)}
                >
                  ✕
                </button>
              </div>
          </div>
        </div>
        <textarea
          className="p-2"
          style={{ width:"100%", height: "100%", resize: "none", border: "none" }}
          value={bodyText}
          onChange={(e)=>setBodyText(e.target.value)}
          onBlur={()=>props.manageTodo.updateBody(props.item,bodyText)}
        >
        </textarea>
      </li>
  );
}

export default TodoItem;

const getStyles = (todoDimensions) => {
    return({
        width: todoDimensions.width+"px",
        height: todoDimensions.height+"px",
    });
}
