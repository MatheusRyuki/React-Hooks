import React, { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

const Todo = props => {
  const [todoName, setTodoName] = useState('');

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
  
  const inputChangeHandler = (event) => {
    setTodoName(event.target.value);
  };

  const [todoList, dispatch] = useReducer(todoListReducer, []);

  const todoRemoveHandler = todoId => {
    dispatch({type: 'REMOVE', payload: todoId})
  }

  const todoAddHandler = () => {
    axios.get(`https://jsonplaceholder.typicode.com/todos/${Math.floor(Math.random()*100+100)}`)
    .then(result => {
      const todoItem = {id: result.data.id, name: result.data.title}
      dispatch({type: 'ADD', payload: todoItem});
    })
      .catch(error => console.log(error))
  };

  return <React.Fragment>
    <input type="text" placeholder="A fazer"  onChange={inputChangeHandler} value={todoName}/>
    <button type="button" onClick={todoAddHandler}>Adicionar</button>
    <ul>
      {todoList.map(todo => (
        <li key={todo.id} onClick={() => todoRemoveHandler(todo.id)}>{todo.name}</li>
      ))}
    </ul>
  </React.Fragment>
};

export default Todo;