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
import PostsByCategory from './views/posts-by-category';
import PostsByName from './views/posts-by-name';


import Header from './components/header';
import CategoryContext from './components/context/category';
import { UserProvider, defaultUserState } from './components/context/user';

import toastr from 'toastr';

import './App.css';
import CategoriesService from './services/categories-service';

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
        updateUser:this.updateUser,
      },
      dropdownCategories:[]
    }
    this.logout = this.logout.bind(this);
    this.updateCategories = this.updateCategories.bind(this);
  }

  async updateCategories() {
		let categories = await new CategoriesService().getCategories();
		categories = categories.filter(category=>category.posts.length > 0)
		this.setState({
			dropdownCategories:categories
		})
	}
  updateUser = (user) => {
    this.setState({user});
  };

  logout = (event) => {
    event.preventDefault();
    window.localStorage.clear();
    this.updateUser(defaultUserState);
    toastr.info('Log out successful.')
  };
  
  render() {

    const {user} = this.state;

          return (
            <div>
              <Router>
                <Fragment>
                    <UserProvider value={user}>
                      <CategoryContext.Provider value={{
                        dropdownCategories: this.state.dropdownCategories,
                        updateCategories:this.updateCategories,
                      }}>
                        <Header logout={this.logout} />
                        <Switch>
                          <Route exact path="/" component={Home}/>
                          <Route exact path="/login" component = {Login}/>
                          <Route exact path="/createpost" component = {CreatePost}/>
                          <Route exact path="/editpost/:id" component = {EditPost}/>
                          <Route exact path="/category/:name" component = {PostsByCategory}/>
                          <Route exact path="/post/search/:name" component = {PostsByName}/>
                          <Route exact path="/manageposts" component = {ManagePosts}/>
                          <Route exact path="/createcategory" component = {CreateCategory}/>
                          <Route exact path="/register" component = {Register}/>
                          <Route component={NotFound}/>
                        </Switch>
                      </CategoryContext.Provider>
                  </UserProvider>            
                </Fragment>
              </Router>
            </div>
          );
   }
}

export default App;
