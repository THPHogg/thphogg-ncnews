import React, { Component } from 'react';
import { getArticle } from '../api';

class Article extends Component {
  state = {
    article: [],
  };

  componentDidMount() {
    const { article_id } = this.props;
    getArticle(article_id).then((article) => {
      this.setState({ article });
    });
  }

  render() {
    const { article } = this.state;
    return (
      <div>
        <h3>{article.title}</h3>
        <h4>By {article.author}</h4>
        <p>{article.body}</p>
        <p>Current Votes: {article.votes}</p>
      </div>
    );
  }
}

export default Article;
