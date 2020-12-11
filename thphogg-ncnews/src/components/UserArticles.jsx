import React, { Component } from 'react';
import { getArticles } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';

class UserArticles extends Component {
  state = {
    articles: [],
    isLoading: true,
  };

  componentDidMount() {
    getArticles().then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  render() {
    const { loggedInUser } = this.props;
    const { articles, isLoading } = this.state;

    if (isLoading) {
      return <p>This page is currently loading!</p>;
    }
    return (
      <div>
        <ul>
          {articles.map((article) => {
            return loggedInUser === article.author ? (
              <li className="articleCard" key={article.article_id}>
                <Link
                  to={`/articles/${article.article_id}`}
                  key={article.title}
                >
                  <b id="articleTitle">{article.title}</b> <br></br>
                  <br></br>Author: {article.author}
                  <br></br>Created:{' '}
                  {moment(article.created_at, 'YYYYMMDD').fromNow()}
                  <br></br>
                  Comment Count: {article.comment_count}
                  <br></br>
                  Current Votes: {article.votes}
                </Link>
              </li>
            ) : (
              ''
            );
          })}
        </ul>
      </div>
    );
  }
}

export default UserArticles;
