import './App.css';
import { useState, useEffect } from 'react';
import api from "./util/api";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
    api.get()
    .then(({data}) => setTodos(data));
  }, []);

  /*function onTodoClick(todo) {
    api.put(`/${todo.id}`, {...todo, isDone: !todo.isDone})
    .then(
      ({data}) =>
        setTodos(todos.map(item => item.id === todo.id ? data : item))
    )
  }*/

  const manageTodo = {
    new: ()=>{
      api.post("", {
        title,
        body: "",
        isDone: false,
        top: 10,
        left: 10
      })
      .then(({data}) => { setTodos([...todos, data]); console.log({data}); })
    },
    delete: (item)=>{
      api.delete(`/${item.id}`, {})
      .then((data) => { setTodos(todos.filter((x)=>x.id!==item.id)); });
    },
    updatePosition: (item,x,y)=>{
      api.put(`/${item.id}`, {...item, top: y, left: x})
      .then(
        ({data}) =>
          setTodos(todos.map(n =>
            item.id === n.id ?
            {...n, top: y, left: x} :
            n
        ))
      );
    },
  }

  return (
    <div className="App py-4">
      <div className="container">
        <div className="input-group mx-auto mb-4" style={{width:"400px"}}>
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button
            className="btn btn-primary"
            type="button"
            onClick={manageTodo.new}>
              add
          </button>
        </div>
      </div>
      <TodoList
        items={todos}
        manageTodo={manageTodo}
        //onItemClick={onTodoClick}
      />
    </div>
  );
}

export default App;
