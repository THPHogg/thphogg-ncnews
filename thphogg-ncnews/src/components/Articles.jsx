import React, { Component } from 'react';
import { getArticles } from '../api';
import { Link } from '@reach/router';

class Articles extends Component {
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
    const { articles, isLoading } = this.state;
    if (isLoading) {
      return <p>This page is currently loading!</p>;
    }
    return (
      <div>
        <h3>These are the current articles on NC News:</h3>
        <ul>
          {articles.map((article) => {
            return (
              <Link
                key={article.article_id}
                to={`/articles/${article.article_id}`}
              >
                <li>
                  Title: {article.title}, <br></br>Author: {article.author},
                  <br></br>Votes: {article.votes}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Articles;
