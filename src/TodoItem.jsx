const TodoItem = ({item, onClick}) => {
    return (
        <li style={getStyles(item)} onClick={onClick.bind(null, item)}>
            {item.title}
        </li>
    );
}

export default TodoItem;

const getStyles = (item) => {
    return({
        backgroundColor: item.isDone ? "green" : "red"
    });
}