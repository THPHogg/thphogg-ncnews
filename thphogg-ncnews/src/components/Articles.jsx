import React, { Component } from 'react';
import { getArticles } from '../api';
import { Link } from '@reach/router';
import moment from 'moment';

class Articles extends Component {
  state = {
    articles: [],
    isLoading: true,
    sort_by: 'created_at',
    order: 'desc',
    topic: '',
  };

  componentDidMount() {
    const newTopic = this.props.topicSlug;
    const currentSortBy = this.state.sort_by;
    const currentOrder = this.state.order;

    getArticles(currentSortBy, currentOrder, newTopic).then((articles) => {
      this.setState({ articles, isLoading: false, topic: newTopic });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const currentSortBy = this.state.sort_by;
    const currentOrder = this.state.order;
    const currentTopic = this.state.topic;

    const sortByVal = prevState.sort_by !== currentSortBy;
    const orderVal = prevState.order !== currentOrder;
    const topicVal = prevState.topic !== currentTopic;

    if (sortByVal) {
      getArticles(currentSortBy, currentOrder, currentTopic).then(
        (articles) => {
          this.setState({
            articles: [...articles],
            sort_by: currentSortBy,
            order: currentOrder,
            topic: currentTopic,
          });
        }
      );
    } else if (orderVal) {
      getArticles(currentSortBy, currentOrder, currentTopic).then(
        (articles) => {
          this.setState({
            articles: [...articles],
            sort_by: currentSortBy,
            order: currentOrder,
            topic: currentTopic,
          });
        }
      );
    } else if (topicVal) {
      getArticles(currentSortBy, currentOrder, currentTopic).then(
        (articles) => {
          this.setState({
            articles: [...articles],
            sort_by: currentSortBy,
            order: currentOrder,
            topic: currentTopic,
          });
        }
      );
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ [event.target.id]: value });
  };

  render() {
    const { articles, isLoading, topic } = this.state;
    if (isLoading) {
      return <p>This page is currently loading!</p>;
    }
    return (
      <div>
        <h3>These are the current articles on NC News:</h3>
        <p>Click any of the cards below and find your favourite article!</p>
        {topic ? (
          <p>You are currently looking at all the {topic} articles</p>
        ) : (
          ''
        )}
        <label>
          Order by:
          <select onChange={this.handleChange} name="order" id="order">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
        <label>
          {'  '}
          Sort by:
          <select onChange={this.handleChange} name="sort_by" id="sort_by">
            <option value="created_at">Date Created</option>
            <option value="topic">Topic</option>
            <option value="votes">Votes</option>
            <option value="comment_count">Comment Count</option>
            <option value="author">Author</option>
          </select>
        </label>
        <ul>
          {articles.map((article) => {
            return (
              <Link
                key={article.article_id}
                to={`/articles/${article.article_id}`}
              >
                <li className="articleCard">
                  <b id="articleTitle">{article.title}</b> <br></br>
                  <br></br>Author: {article.author}
                  <br></br>Created:{' '}
                  {moment(article.created_at, 'YYYYMMDD').fromNow()}
                  <br></br>
                  Comment Count: {article.comment_count}
                  <br></br>
                  Current Votes: {article.votes}
                  <br></br>
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
