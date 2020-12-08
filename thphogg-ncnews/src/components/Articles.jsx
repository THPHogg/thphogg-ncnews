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
  };

  componentDidMount() {
    getArticles().then((articles) => {
      this.setState({ articles, isLoading: false });
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const currentSortBy = this.state.sort_by;
    const currentOrder = this.state.order;

    const sortByVal = prevState.sort_by !== currentSortBy;
    const orderVal = prevState.order !== currentOrder;

    if (sortByVal) {
      getArticles(currentSortBy, currentOrder).then((articles) => {
        this.setState({
          articles: [...articles],
          sort_by: currentSortBy,
          order: currentOrder,
        });
      });
    } else if (orderVal) {
      getArticles(currentSortBy, currentOrder).then((articles) => {
        this.setState({
          articles: [...articles],
          sort_by: currentSortBy,
          order: currentOrder,
        });
      });
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ [event.target.id]: value });
  };

  render() {
    const { articles, isLoading } = this.state;
    if (isLoading) {
      return <p>This page is currently loading!</p>;
    }
    return (
      <div>
        <h3>These are the current articles on NC News:</h3>
        <label>
          Order by:
          <select onChange={this.handleChange} name="order" id="order">
            <option value="desc">Descending</option>
            <option value="asc">Ascending</option>
          </select>
        </label>
        <label>
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
                <li>
                  Title: {article.title}, <br></br>Author: {article.author},
                  <br></br>Date Created:{' '}
                  {moment(article.created_at, 'YYYYMMDD').fromNow()},<br></br>
                  Comment Count: {article.comment_count},<br></br>
                  Votes: {article.votes}
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
