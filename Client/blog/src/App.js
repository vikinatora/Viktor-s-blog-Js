import React, { Component, Fragment } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './views/home';
import Login from './views/login';
import Register from './views/register';
import NotFound from './views/not-found';
import CreatePost from './views/create-post';
import EditPost from './views/edit-post';
import CreateCategory from './views/create-category';
import ManagePosts from './views/manage-posts';

import Header from './components/header'

import './App.css';
import { UserProvider, defaultUserState } from './components/context/user';

class App extends Component {
  constructor(props) {
    super(props);

    const userFromStorage = window.localStorage.getItem('user');
    const parsedUser = userFromStorage ? JSON.parse(userFromStorage) : {};

    this.state = {
      user:{
        ...defaultUserState.isLoggedIn,
        ...defaultUserState.isAdmin,
        ...parsedUser,
        updateUser:this.updateUser
      }
    }
    this.logout = this.logout.bind(this);
  }

  updateUser = (user) => {
    this.setState({user});
  };

  logout = (event) => {
    event.preventDefault();

    console.log(event);
    window.localStorage.clear();
    this.updateUser(defaultUserState);
  };
  
  render() {

    const {user} = this.state;

          return (
            <div>
              <Router>
                <Fragment>
                  {/* <BackgroundImagePage/> */}
                    <UserProvider value={user}>
                    <Header logout={this.logout} />
                    <Switch>
                      <Route exact path="/" component={Home}/>
                      <Route exact path="/login" component = {Login}/>
                      <Route exact path="/createpost" component = {CreatePost}/>
                      <Route exact path="/editpost/:id" component = {EditPost}/>
                      <Route exact path="/manageposts" component = {ManagePosts}/>
                      <Route exact path="/createcategory" component = {CreateCategory}/>
                      <Route exact path="/register" component = {Register}/>
                      <Route component={NotFound}/>
                    </Switch>
                  </UserProvider>            
                </Fragment>
              </Router>
            </div>
          );
   }
}

export default App;
