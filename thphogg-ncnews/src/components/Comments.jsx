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
              <li key={comment.comments_id} className="commentCard">
                {comment.body}, <br></br>
                <br></br>
                <b>Written By: </b>
                {comment.author},<br></br>
                <br></br>
                <b>Votes: </b>
                {comment.votes}
                <br></br>
                <br></br>
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
