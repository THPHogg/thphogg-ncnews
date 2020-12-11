import React, { Component } from 'react';
import { getNewestArticle, getTopArticle } from '../api';

// for anyone doing feedback: the username you input has to be of an already existing author and all passwords are: password

class HomePage extends Component {
  state = {
    currentUsers: [
      'weegembump',
      'happyamy2016',
      'jessjelly',
      'grumpy19',
      'tickle122',
      'cooljmessy',
    ],
    user: null,
    password: null,
    newArticle: 'Loading',
    topArticle: 'loading',
    isLoading: true,
  };

  handleChange(event) {
    const { value } = event.target;
    this.setState({ [event.target.id]: value });
  }

  componentDidMount() {
    const user = this.props.loggedInUser;
    const password = this.props.password;
    this.setState({ user, password });

    getNewestArticle().then((article) => {
      this.setState({ newArticle: article, isLoading: false });
    });

    getTopArticle().then((article) => {
      this.setState({ topArticle: article, isLoading: false });
    });
  }

  render() {
    const { loggedInUser, logIn, logOut } = this.props;
    const {
      user,
      newArticle,
      topArticle,
      isLoading,
      currentUsers,
      password,
    } = this.state;

    if (isLoading) {
      return <p>This page is currently loading!</p>;
    }
    return (
      <div>
        <h3>Welcome to Northcoders News!</h3>
        <p>The home of all things coding, cooking and footy!</p>
        <div className="outerBox">
          <section>
            <h3>Login:</h3>
            <section className="titleCard">
              {!loggedInUser ? (
                <div>
                  <p>
                    Please login below to unlock features such as posting and
                    deleting comments as well as being able to access all of
                    your articles!
                  </p>
                  <br></br>
                  <form>
                    <label>
                      Username:<br></br>
                      <input
                        type="text"
                        name="username"
                        id="user"
                        onChange={(event) => this.handleChange(event)}
                      ></input>
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                      Password:<br></br>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        onChange={(event) => this.handleChange(event)}
                      ></input>
                    </label>
                    <br></br>
                    <br></br>
                    <button onClick={() => logIn(user, password)}>Login</button>
                  </form>
                </div>
              ) : currentUsers.includes(loggedInUser) &&
                password === 'password' ? (
                <div>
                  <p>
                    Welcome <b>{loggedInUser}</b>, you are now able to post and
                    delete comments! If you look at the top of the page, you
                    also have a "My Articles" tab!
                  </p>
                  <br></br>
                  <button onClick={() => logOut()}>Log Out</button>
                </div>
              ) : (
                <div>
                  <p>
                    Please login below to unlock features such as posting and
                    deleting comments as well as being able to access all of
                    your articles!
                  </p>
                  <br></br>
                  <form>
                    <label>
                      Username:<br></br>
                      <input
                        type="text"
                        name="username"
                        id="username"
                        onChange={(event) => this.handleChange(event)}
                      ></input>
                    </label>
                    <br></br>
                    <br></br>
                    <label>
                      Password:<br></br>
                      <input
                        type="password"
                        name="password"
                        id="password"
                      ></input>
                    </label>
                    <br></br>
                    <br></br>
                    <button onClick={() => logIn(user)}>Login</button>
                  </form>
                  {alert(
                    'Please login with a registered user, and the correct password!'
                  )}
                </div>
              )}
            </section>
          </section>
          <section className="lowerSection">
            <section className="topStorySection">
              <h3>Top Story:</h3>
              <section className="topStoryCard">
                <h3>{topArticle.title}</h3>
                <b>
                  <p>By {topArticle.author}</p>
                </b>
                <p>{topArticle.body}</p>
              </section>
            </section>
            <section className="newStorySection">
              <h3>Newest Story:</h3>
              <section className="newStoryCard">
                <h3>{newArticle.title}</h3>
                <b>
                  <p>By {newArticle.author}</p>
                </b>
                <p>{newArticle.body}</p>
              </section>
            </section>
          </section>
        </div>
      </div>
    );
  }
}

export default HomePage;
