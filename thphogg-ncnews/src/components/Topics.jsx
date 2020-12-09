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
          Click on any of the cards below to be taken to all the articles from
          that topic!
        </p>
        <ul>
          {topics.map((topic) => {
            return (
              <Link key={topic.slug} to={`/articles/topics/${topic.slug}`}>
                <li className="topicCard">
                  <b id="topicTitle">
                    {topic.slug.charAt(0).toUpperCase() + topic.slug.slice(1)}{' '}
                  </b>
                  <br></br>
                  <br></br>
                  {topic.description}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>
    );
  }
}

export default Topics;
