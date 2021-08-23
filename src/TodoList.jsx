import TodoItem from "./TodoItem";

const TodoList = (props) => {
    return(
        <ul>
            {props.items.map(item => 
               <TodoItem
                item={item}
                onClick={props.onItemClick}
               /> 
            )}
        </ul>
    )
}

export default TodoList;