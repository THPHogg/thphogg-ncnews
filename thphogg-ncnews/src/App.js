import './App.css';
import { Router } from '@reach/router';
import Header from './components/Header';
import NavBar from './components/NavBar';
import HomePage from './components/HomePage';
import Topics from './components/Topics';
import Articles from './components/Articles';
import Article from './components/Article';

function App() {
  return (
    <div className="newsApp">
      <Header />
      <NavBar />
      <Router>
        <HomePage path="/" />
        <Topics path="/topics" />
        <Articles path="/articles" />
        <Articles path="/articles/topics/:topicSlug" />
        <Article path="/articles/:article_id/*" />
      </Router>
    </div>
  );
}

export default App;
