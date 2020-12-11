import React, { Component } from 'react';
import { Link } from '@reach/router';
import {
  getComments,
  incrementCommentVotes,
  removeUserComment,
  postComment,
} from '../api';

class Comments extends Component {
  state = {
    comments: [],
    isLoading: true,
    newComment: '',
  };

  componentDidMount() {
    const { article_id } = this.props;
    getComments(article_id).then((comments) => {
      this.setState({ comments, isLoading: false });
    });
  }

  incrementVote = (id, vote) => {
    const { comments } = this.state;
    incrementCommentVotes(id, vote).then(() => {
      this.setState((currentState) => {
        const updatedState = {
          comments: comments.map((comment) => {
            if (comment.comments_id === id) {
              return {
                ...comment,
                votes: comment.votes + vote,
              };
            } else {
              return comment;
            }
          }),
        };
        return updatedState;
      });
    });
  };

  deleteComment = (id) => {
    removeUserComment(id).then(() => {
      this.setState((currentState) => {
        const newComments = currentState.comments.filter(
          (comment) => comment.comments_id !== id
        );
        return { comments: newComments };
      });
    });
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ newComment: value });
  };

  addComment = (articleId, username, body) => {
    postComment(articleId, username, body).then((comment) => {
      this.setState((currentState) => {
        const newComments = [...currentState.comments];
        newComments.unshift(comment);
        const newState = {
          comments: newComments,
          newComment: '',
        };
        return newState;
      });
    });
  };

  render() {
    const { comments, isLoading, newComment } = this.state;
    if (isLoading) {
      return <p>The comments are currently loading!</p>;
    }
    const { article_id, loggedInUser } = this.props;
    return (
      <div>
        {loggedInUser ? (
          <div>
            <p>
              If you have any thoughts on the article, please leave them here:
            </p>
            {/* <form> */}
            <textarea
              rows="4"
              cols="50"
              name="comment"
              id="comment"
              onChange={this.handleChange}
            ></textarea>
            <br></br>
            <button
              onClick={() =>
                this.addComment(article_id, loggedInUser, newComment)
              }
            >
              Submit
            </button>
            {/* </form> */}
          </div>
        ) : null}
        <ul>
          {comments.map((comment) => {
            return (
              <li key={comment.comments_id} className="commentCard">
                {comment.body}, <br></br>
                <br></br>
                <b>Written By: </b>
                {comment.author},<br></br>
                <br></br>
                {loggedInUser === comment.author ? (
                  <div>
                    <button
                      onClick={() => this.deleteComment(comment.comments_id)}
                    >
                      Delete Comment
                    </button>
                    <br></br>
                    <br></br>
                  </div>
                ) : null}
                <b>Votes: </b>
                {comment.votes}
                <br></br>
                <br></br>
                <i
                  className="fas fa-plus fa-2x"
                  alt="Up Vote button"
                  onClick={() => this.incrementVote(comment.comments_id, 1)}
                  name="upVote"
                ></i>
                {'       '}
                <i
                  className="fas fa-minus fa-2x"
                  alt="Down Vote button"
                  name="downVote"
                  onClick={() => this.incrementVote(comment.comments_id, -1)}
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
