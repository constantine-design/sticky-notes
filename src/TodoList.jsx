import TodoItem from "./TodoItem";

const TodoList = (props) => {
    return(
        <ul
          className="position-relative list-unstyled bg-white shadow-sm mx-auto"
          style={{height: "700px", width: "1100px"}}
        >
            {props.items.map(item =>
               <TodoItem
                item={item}
                onClick={props.onItemClick}
                //onMouseMove={(e)=>{ console.log( e.clientX ); }}
               />
            )}
        </ul>
    )
}

export default TodoList;
