import './App.css';

import { BrowserRouter, Redirect, Route } from 'react-router-dom';

import Links from './pages/Links';
import Login from './pages/Login';
import ProductForm from './pages/products/ProductForm';
import Products from './pages/products/Products';
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
        <Route path={'/products'} exact component={Products}></Route>
        <Route path={'/products/:id'} component={ProductForm}></Route>
        <Route path={'/login'} component={Login}></Route>
        <Route path={'/register'} component={Register}></Route>
        <Route path={'/users/:id/links'} component={Links}></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
