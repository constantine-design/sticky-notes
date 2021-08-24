const TodoItem = ({item, onClick}) => {
    return (
        <li
          className="position-absolute shadow-sm"
          style={getStyles(item)}
          onClick={onClick.bind(null, item)}
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
