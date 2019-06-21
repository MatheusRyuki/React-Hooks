import React, { useEffect, useReducer, useMemo } from 'react';
import axios from 'axios';
import List from './List';
import { UserFormInput } from '../hooks/forms';

const Todo = props => {
  const todoInput = UserFormInput();

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
  }, [todoInput.value]);

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
    <input type="text" placeholder="A fazer"  onChange={todoInput.onChange}
    style={{backgroundColor: todoInput.validity ? 'transparent' : 'red' }} value={todoInput.value}/>
    <button type="button" onClick={todoAddHandler}>Adicionar</button>
    {useMemo(() => <List todoList={todoList} todoRemoveHandler={todoRemoveHandler} />, [todoList])}
  </React.Fragment>
};

export default Todo;