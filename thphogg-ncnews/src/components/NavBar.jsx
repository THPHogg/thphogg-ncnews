import React from 'react';
import { Link } from '@reach/router';

const NavBar = () => {
  return (
    <nav>
      <Link to="/" className="navBar">
        Home
      </Link>
      <Link to="/articles" className="navBar">
        All Articles
      </Link>
      <Link to="/topics" className="navBar">
        Topics
      </Link>
    </nav>
  );
};

export default NavBar;
