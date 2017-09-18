import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import DefaultView from './DefaultView';
import CategoryView from './CategoryView';

class App extends Component {

  render() {
    return (
      <div>
        <nav className="navbar">
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              Readable
            </Link>
            <Link to="/" className="navbar-item">
              <span className="icon"><i className="fa fa-book"></i></span>
              <span>Overview</span>
            </Link>
            <Link to="/search" className="navbar-item">
              <span className="icon"><i className="fa fa-search"></i></span>
              <span>Search</span>
            </Link>
          </div>
        </nav>

        <div className="app">
          <Route exact path="/" component={ DefaultView }/>
          <Route exact path="/:category" component={ CategoryView }/>
        </div>
      </div>
    );
  }
}

export default App;
