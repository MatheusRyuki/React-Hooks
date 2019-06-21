import React from 'react';

const list = props => {
  console.log('Lista...');

  return   <ul>
  {props.todoList.map(todo => (
    <li key={todo.id} onClick={() => props.todoRemoveHandler(todo.id)}>{todo.name}</li>
  ))}
</ul>
};

export default list;