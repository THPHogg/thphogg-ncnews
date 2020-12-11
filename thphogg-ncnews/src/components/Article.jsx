import React, { Component } from 'react';
import { getArticle, incrementArticleVotes } from '../api';
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

  incrementVote = (vote) => {
    incrementArticleVotes(this.state.article.article_id, vote).then(() => {
      this.setState((currentState) => {
        const updatedState = {
          article: {
            ...currentState.article,
            votes: currentState.article.votes + vote,
          },
        };
        return updatedState;
      });
    });
  };

  render() {
    const { article, isLoading } = this.state;
    const { loggedInUser } = this.props;
    if (isLoading) {
      return <p>This page is currently loading!</p>;
    }
    return (
      <div className="singleArticleCard">
        <h3>{article.title}</h3>
        <h4>By {article.author}</h4>
        <p>{article.body}</p>
        <p>Current Votes: {article.votes}</p>
        <i
          className="fas fa-plus fa-2x"
          alt="Up Vote button"
          onClick={() => this.incrementVote(1)}
          name="upVote"
        ></i>
        {'       '}
        <i
          className="fas fa-minus fa-2x"
          alt="Down Vote button"
          name="downVote"
          onClick={() => this.incrementVote(-1)}
        ></i>
        <Link to={`/articles/${article.article_id}/comments`}>
          <p>Show comments</p>
        </Link>
        <Router>
          <Comments path="/comments" loggedInUser={loggedInUser} />
        </Router>
      </div>
    );
  }
}

export default Article;
