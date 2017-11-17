import React from 'react';
const { Router, Route, hashHistory } = require('react-router')
import Home from './page/home'
import Preview from './page/preview'
import './App.scss';


class App extends React.Component {
  render() {
    return (
      <Router history={hashHistory} component={App}>
        <Route path='/' component={Home} />
        <Route path='/preview' component={Preview} />
      </Router>
    );
  }
}

export default App;
