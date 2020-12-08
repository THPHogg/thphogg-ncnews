import React, { Component } from 'react';
import { getArticle } from '../api';
import { Link } from '@reach/router';
import { Router } from '@reach/router';
import Comments from './Comments';

class Article extends Component {
  state = {
    article: [],
    isLoading: true,
  };

  componentDidMount() {
    const { article_id } = this.props;
    getArticle(article_id).then((article) => {
      this.setState({ article, isLoading: false });
    });
  }

  render() {
    const { article, isLoading } = this.state;
    if (isLoading) {
      return <p>This page is currently loading!</p>;
    }
    return (
      <div className="singleArticleCard">
        <h3>{article.title}</h3>
        <h4>By {article.author}</h4>
        <p>{article.body}</p>
        <p>Current Votes: {article.votes}</p>
        <Link to={`/articles/${article.article_id}/comments`}>
          <p>Show comments</p>
        </Link>
        <Router>
          <Comments path="/comments" />
        </Router>
      </div>
    );
  }
}

export default Article;
