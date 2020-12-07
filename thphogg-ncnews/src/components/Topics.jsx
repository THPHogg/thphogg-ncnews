import React, { Component } from 'react';
import { getTopics } from '../api';

class Topics extends Component {
  state = {
    topics: [],
  };

  componentDidMount() {
    getTopics().then((topics) => {
      this.setState({ topics });
    });
  }

  render() {
    const { topics } = this.state;
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
