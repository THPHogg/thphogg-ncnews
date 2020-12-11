import React, { Component } from 'react';
import { getNewestArticle, getTopArticle } from '../api';

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
    newArticle: 'Loading',
    topArticle: 'loading',
    isLoading: true,
  };

  handleChange(event) {
    this.setState({
      user: event.target.value,
    });
  }

  componentDidMount() {
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
                    Please login below to unlock features such as posting,
                    deleting and altering your comments and articles!
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
                </div>
              ) : currentUsers.includes(loggedInUser) ? (
                <div>
                  <p>
                    Welcome <b>{loggedInUser}</b>, you are now able to post
                    delete and alter your comments and articles!
                  </p>
                  <br></br>
                  <button onClick={() => logOut()}>Log Out</button>
                </div>
              ) : (
                <div>
                  <p>
                    Please login below to unlock features such as posting,
                    deleting and altering your comments and articles!
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
                  {alert('Please login with a registered user!')}
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
