import React, { useState } from 'react';
import Todo from './components/Todo';
import Header from './components/Header';
import Auth from './components/Auth';

function App (props) {
  const [page, setPage] = useState('auth');
  const switchPage = (pageName) => () => {
    setPage(pageName);
  }
 return (
 <div className="App">
        <Header onLoadTodos={switchPage('todos')} onLoadAuth={switchPage('auth')}/>
        <hr/>
        {page === 'auth' ? <Auth/> : <Todo />}
    </div>
)
};

export default App;
