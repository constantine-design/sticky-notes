import TodoItem from "./TodoItem";
import { boardDimensions } from '../lib/dimensions.js';

const TodoList = (props) => {
    return(
      <div
        className="shadow-sm mx-auto rounded"
        style={{width: (boardDimensions.width+40)+"px", backgroundColor:"#585858", padding: "20px"}}
      >
        <ul
          id="todos-board"
          className="position-relative list-unstyled bg-white mb-0"
          style={{height: boardDimensions.height+"px"}}
        >
            {props.items.map(item =>
               <TodoItem
                key={item.id}
                item={item}
                manageTodo={props.manageTodo}
                parentCssId="todos-board"
               />
            )}
        </ul>
      </div>
    )
}

export default TodoList;
