import TodoItem from "./TodoItem";
import { useState, useEffect } from 'react';

const TodoList = (props) => {
    const [mouseX, setMouseX] = useState(0);
    const [mouseY, setMouseY] = useState(0);
    const onMouseMove = (e)=>{
      let bounds = document.getElementById("todos-board").getBoundingClientRect();
      setMouseX( e.clientX - bounds.left );
      setMouseY( e.clientY - bounds.top);
    }
    return(
        <ul
          id="todos-board"
          className="position-relative list-unstyled bg-white shadow-sm mx-auto"
          style={{height: "700px", width: "1100px"}}
          onMouseMove={onMouseMove}
        >
            {props.items.map(item =>
               <TodoItem
                item={item}
                mouse={{x:mouseX, y:mouseY}}
                onClick={props.onItemClick}
               />
            )}
        </ul>
    )
}

export default TodoList;
