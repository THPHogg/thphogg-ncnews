import React, { Component } from 'react';
import axios from 'axios';

class HomePage extends Component {
  state = {
    user: null,
    newArticle: {},
    topArticle: {},
  };

  handleChange(event) {
    this.setState({
      user: event.target.value,
    });
  }

  getNewestArticle = () => {
    return axios
      .get(
        'https://thphogg-nc-news.herokuapp.com/api/articles?sort_by=created_at'
      )
      .then(({ data }) => {
        console.log(data.articles[0]);
      });
  };

  getTopArticle = () => {
    return axios
      .get('https://thphogg-nc-news.herokuapp.com/api/articles?sort_by=votes')
      .then(({ data }) => {
        console.log(data.articles[0]);
      });
  };

  render() {
    const { loggedInUser, logIn, logOut } = this.props;
    const { user } = this.state;
    return (
      <div>
        <h3>Welcome to Northcoders News!</h3>
        <p>The home of all things coding, cooking and footy!</p>
        <container>
          <section className="codingSection">
            <h3>Login:</h3>
            <section className="homeCard">
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
              ) : (
                <div>
                  <p>
                    Welcome {loggedInUser}, you are now able to post delete and
                    alter your comments or articles!
                  </p>
                  <br></br>
                  <button onClick={() => logOut()}>Log Out</button>
                </div>
              )}
            </section>
          </section>
          <section className="cookingSection">
            <h3>Top Story:</h3>
            <section className="homeCard">
              {' '}
              <button onClick={() => this.getTopArticle()}>Click me</button>
            </section>
          </section>
          <section className="footySection">
            <h3>Newest Story:</h3>
            <section className="homeCard">
              {' '}
              <button onClick={() => this.getNewestArticle()}>Hello</button>
            </section>
          </section>
        </container>
      </div>
    );
  }
}

export default HomePage;
