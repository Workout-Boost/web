import React, {useState} from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import history from '../history';
import withAuth from './withAuth'
import Header from './Header'
import Login from './pages/Login'
import Profile from './pages/Profile'
import UserProfile from './pages/UserProfile'
import Home from './pages/Home'
import AdminUsers from './pages/AdminUsers'
import AdminPosts from './pages/AdminPosts'
import Register from './pages/Register'
import Saved from './pages/Saved'
import Following from './pages/Following'
import Landing from './pages/Landing'
import Links from './pages/Links'
import Verify from './pages/Verify'
import ForgotPass from './pages/ForgotPass'
import UpdatePass from './pages/UpdatePass'
import FollowingList from './pages/FollowingList'
import FollowersList from './pages/FollowersList'
import './styles/App.css'

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
            <Route path="/saved" exact component={withAuth(Saved)} />
            <Route path="/following" exact component={withAuth(Following)} />
            <Route path="/admin/users" exact component={AdminUsers} />
            <Route path="/admin/posts" exact component={AdminPosts} />
            <Route path="/landing" exact component={Landing} />
            <Route path="/links" exact component={Links} />
            <Route path="/verify/:email" exact component={Verify} />
            <Route path="/forgot-password" exact component={ForgotPass} />
            <Route path="/update-password/:email" exact component={UpdatePass} />
            <Route path="/following-list" exact component={withAuth(FollowingList)} />
            <Route path="/followers-list" exact component={withAuth(FollowersList)} />
          </Switch>
        </div>
      </Router>
  );
};

export default App;
