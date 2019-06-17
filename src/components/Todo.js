import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = props => {
  const [todoName, setTodoName] = useState('');
  const [todoList, setTodoList] = useState([]);
  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(result => {
      const todoData = result.data;
      const todos = [];
      for(const id in todoData) {
        todos.push({id: id, name: todoData[id].title})
      }
      setTodoList(todos);
    });
    return () => {
      console.log('Clean up');
    };
  }, [todoName]);

  const mouseMoveHandler = event => {
    console.log(event.clientX, event.clientY);
  };

  useEffect(() => {
   document.addEventListener('mousemove', mouseMoveHandler) 
   return () => {
     document.removeEventListener('mousemove', mouseMoveHandler);
   }
  }, []);
  
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
        <li key={todo.id}>{todo.name}</li>
      ))}
    </ul>
  </React.Fragment>
};

export default Todo;