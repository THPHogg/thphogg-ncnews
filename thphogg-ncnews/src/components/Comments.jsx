import React, { Component } from 'react';
// import { Link } from '@reach/router';

class Comments extends Component {
  componentDidMount() {
    const { article_id } = this.props;
    console.log(article_id);
  }

  render() {
    return (
      <div>
        <p>These are the comments for this article</p>
        {/* <Link to={`/articles/${article.article_id}`}>
        <p>Hide comments</p>
      </Link> */}
      </div>
    );
  }
}

export default Comments;
