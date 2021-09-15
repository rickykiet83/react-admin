import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login';
import React from 'react';
import Register from './pages/Register';
import Users from './pages/Users';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route path={'/'} exact component={Users}></Route>
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/register'} component={Register}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
