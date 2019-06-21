import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const Todo = props => {
  const [todoName, setTodoName] = useState('');
  const [submittedTodo, setSubmittedTodo] = useState(null);

  const todoListReducer = (state, action) => {
    switch(action.type) {
      case 'ADD':
        return state.concat(action.payload);
      case 'SET':
        return action.payload;
      case 'REMOVE':
        return state.filter((todo) => todo.id !== action.payload);
      default:
        return state;
    }
  }

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
    .then(result => {
      const todoData = result.data;
      const todos = [];
      for(const id in todoData) {
        todos.push({id: id, name: todoData[id].title})
      }
      dispatch({type: 'SET', payload: todos})
    });
    return () => {
      console.log('Clean up');
    };
  }, [todoName]);

  useEffect(() => {
    if(submittedTodo) {
      dispatch({type: 'ADD', payload: submittedTodo});
    }
  }, [submittedTodo]);
  
  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  const todoAddHandler = () => {
    axios.get(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random())}`)
    .then(result => {
      const todoItem = {id: result.data.id, name: result.data.title}
      setSubmittedTodo(todoItem);

      setTodoList(todoList.concat(todoItem));
    })
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