import React, { Component } from 'react';
import { Link } from '@reach/router';

class NavBar extends Component {
  render() {
    const { loggedInUser } = this.props;
    return (
      <nav>
        <Link to="/" className="navBar">
          Home
        </Link>
        <Link to="/articles" className="navBar">
          All Articles
        </Link>
        {loggedInUser ? (
          <Link to={`/user/${loggedInUser}`} className="navBar">
            My Articles
          </Link>
        ) : null}
        <Link to="/topics" className="navBar">
          Topics
        </Link>
      </nav>
    );
  }
}

export default NavBar;
