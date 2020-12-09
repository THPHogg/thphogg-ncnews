import React, { Component } from 'react';
import { Link } from '@reach/router';
import { getComments, incrementCommentVotes } from '../api';

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

  incrementVote = (vote) => {
    incrementCommentVotes(this.state.comments.comment_id, vote).then(() => {
      this.setState((currentState) => {
        const updatedState = {
          comments: {
            ...currentState.comments,
            votes: currentState.comments.votes + vote,
          },
        };
        return updatedState;
      });
    });
  };

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
                <i
                  className="fas fa-plus fa-2x"
                  style={{ color: '#ef8354' }}
                  alt="Up Vote button"
                  onClick={() => this.incrementVote(1)}
                  name="upVote"
                ></i>
                {'       '}
                <i
                  className="fas fa-minus fa-2x"
                  style={{ color: '#ef8354' }}
                  alt="Down Vote button"
                  name="downVote"
                  onClick={() => this.incrementVote(-1)}
                ></i>
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
