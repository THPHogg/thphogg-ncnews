import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getComments } from '../api';

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
  };

  componentDidMount() {
    const { article_id } = this.props;
    getComments(article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

  render() {
    const { comments, isLoading } = this.state;
    if (isLoading) {
      return <p>The comments are currently loading!</p>;
    }
    const { article_id } = this.props;
    return (
      <div>
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comments_id}>
                Comment: {comment.body}, <br></br>Author: {comment.author},
                <br></br>Votes: {comment.votes}
              </li>
            );
          })}
        </ul>
        <Link to={`/articles/${article_id}`}>
          <p>Hide comments</p>
        </Link>
      </div>
    );
  }
}

export default Comments;
