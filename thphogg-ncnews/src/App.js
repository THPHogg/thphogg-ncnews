import './App.css';
import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Article from './components/Article';
import UserArticles from './components/UserArticles';

class App extends Component {
  state = {
    loggedInUser: null,
    password: null,
  };

  logIn = (newUser, password) => {
    this.setState({ loggedInUser: newUser, password });
  };

  logOut = () => {
    this.setState({ loggedInUser: null });
  };

  render() {
    return (
      <div className="newsApp">
        <Header />
        <NavBar loggedInUser={this.state.loggedInUser} />
        <Router>
          <HomePage
            path="/"
            loggedInUser={this.state.loggedInUser}
            password={this.state.password}
            logIn={this.logIn}
            logOut={this.logOut}
          />
          <Topics path="/topics" />
          <Articles path="/articles" />
          <Articles path="/articles/topics/:topicSlug" />
          <UserArticles
            path="/user/:username"
            loggedInUser={this.state.loggedInUser}
          />
          <Article
            path="/articles/:article_id/*"
            loggedInUser={this.state.loggedInUser}
          />
        </Router>
      </div>
    );
  }
}

export default App;
