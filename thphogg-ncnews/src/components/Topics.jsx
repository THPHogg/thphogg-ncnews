import React, { Component } from 'react';
import { getTopics } from '../api';
import { Link } from '@reach/router';

class Topics extends Component {
  state = {
    topics: [],
    isLoading: true,
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics, isLoading: false });
    });
  }

  render() {
    const { topics, isLoading } = this.state;
    if (isLoading) {
      return <p>This page is currently loading!</p>;
    }
    return (
      <div>
        <h3>These are the topics currently being talked about on NC News:</h3>
        <p>
          {' '}
          Click on the description to be taken to all the articles from that
          topic!
        </p>
        <ul>
          {topics.map((topic) => {
            return (
              <li key={topic.slug} className="topicCard">
                <b>{topic.slug} </b>
                <br></br>
                <br></br>
                <Link to={`/articles/topics/${topic.slug}`}>
                  {topic.description}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Topics;
