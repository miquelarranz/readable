import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import DefaultView from './DefaultView';
import PostView from './PostView';

class App extends Component {

  render() {

    return (
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              Readable
            </Link>
          </div>
        </nav>

        <div className="app">
          <Route exact path="/" component={ DefaultView }/>

          <Route exact path="/:category" component={ DefaultView }/>

          <Route path="/:category/:postId" component={ PostView }/>
        </div>
      </div>
    );
  }
}

export default App;
