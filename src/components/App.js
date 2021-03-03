import React, {useState} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import withAuth from './withAuth'
import Header from './Header'
import Login from './pages/Login'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import Home from './pages/Home'
import Admin from './pages/Admin'
import Register from './pages/Register'
import Saved from './pages/Saved'

const App = () => {
  return (
      <Router history={history}>
        <Header history={history}/>
        <div style={{marginLeft: '80px'}}>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/login" exact component={Login} />
            <Route path="/register" exact component={Register} />
            <Route path="/profile" component={withAuth(Profile)} />
            <Route path="/userProfile/:id" exact component={UserProfile} />
            <Route path="/admin" exact component={Admin} />
            <Route path="/saved" exact component={withAuth(Saved)} />
          </Switch>
        </div>
      </Router>
  );
};

export default App;
