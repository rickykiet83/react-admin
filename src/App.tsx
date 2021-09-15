import './App.css';

import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Login from './pages/Login';
import React from 'react';
import { RedirectToUsers } from './components/RedirectToUsers';
import Register from './pages/Register';
import Users from './pages/Users';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Route path='/' exact component={RedirectToUsers} />
        {/* <Redirect from='/' exact to='/users' /> */}
        <Route path={'/users'} exact component={Users}></Route>
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/register'} component={Register}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
