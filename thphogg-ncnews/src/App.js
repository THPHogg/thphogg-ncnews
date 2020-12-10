import './App.css';
import React, { Component } from 'react';
import { Router } from '@reach/router';
import Header from './components/Header';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Article from './components/Article';

class App extends Component {
  state = {
    loggedInUser: null,
  };

  logIn = (newUser) => {
    this.setState({ loggedInUser: newUser });
  };

  logOut = () => {
    this.setState({ loggedInUser: null });
  };

  render() {
    console.log(this.state);
    return (
      <div className="newsApp">
        <Header />
        <NavBar />
        <Router>
          <HomePage
            path="/"
            loggedInUser={this.state.loggedInUser}
            logIn={this.logIn}
            logOut={this.logOut}
          />
          <Topics path="/topics" />
          <Articles path="/articles" />
          <Articles path="/articles/topics/:topicSlug" />
          <Article path="/articles/:article_id/*" />
        </Router>
      </div>
    );
  }
}

export default App;
