import TodoItem from "./TodoItem";
import { useState, useEffect } from 'react';

const TodoList = (props) => {
    return(
      <div
        className="shadow-sm mx-auto p-3 rounded"
        style={{width:"1100px", backgroundColor:"#585858"}}
      >
        <ul
          id="todos-board"
          className="position-relative list-unstyled bg-white mb-0"
          style={{height:"700px"}}
        >
            {props.items.map(item =>
               <TodoItem
                key={item.id}
                item={item}
                manageTodo={props.manageTodo}
                //onClick={props.onItemClick}
                parentCssId="todos-board"
               />
            )}
        </ul>
      </div>
    )
}

export default TodoList;
