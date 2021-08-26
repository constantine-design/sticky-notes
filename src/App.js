import './App.css';
import { useState, useEffect } from 'react';
import api from "./util/api";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get()
    .then(({data}) => setTodos(data))
  }, []);

  /*function onTodoClick(todo) {
    api.put(`/${todo.id}`, {...todo, isDone: !todo.isDone})
    .then(
      ({data}) =>
        setTodos(todos.map(item => item.id === todo.id ? data : item))
    )
  }*/

  function saveTodo() {
    api.post("", {
      title,
      isDone: false
    })
    .then(({data}) => setTodos([...todos, data]))
  }

  return (
    <div className="App py-4">
      <div className="container">
        <div class="input-group mx-auto mb-4" style={{width:"400px"}}>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={saveTodo}>
              add
          </button>
        </div>
      </div>
      <TodoList
        items={todos}
        //onItemClick={onTodoClick}
      />
    </div>
  );
}

export default App;
