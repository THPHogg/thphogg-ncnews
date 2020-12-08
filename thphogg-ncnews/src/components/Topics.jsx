import React, { Component } from 'react';
import { getTopics } from '../api';

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
        <ul>
          {topics.map((topic) => {
            return (
              <li key={topic.slug}>
                {topic.slug}: {topic.description}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Topics;