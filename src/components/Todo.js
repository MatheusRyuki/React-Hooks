import React, { useState } from 'react';
import axios from 'axios';

const Todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);

  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
  };

  const todoAddHandler = () => {
    setTodoList(todoList.concat(todoName));
    axios.post('https://jsonplaceholder.typicode.com/todos/1', todoName)
    .then(result => console.log(result))
    .catch(error => console.log(error))
  };

  return <React.Fragment>
    <input type="text" placeholder="A fazer"  onChange={inputChangeHandler} value={todoName}/>
    <button type="button" onClick={todoAddHandler}>Adicionar</button>
    <ul>
      {todoList.map(todo => (
        <li key={todo}>{todo}</li>
      ))}
    </ul>
  </React.Fragment>
};

export default Todo;