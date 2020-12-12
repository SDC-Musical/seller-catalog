import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './components/app';

ReactDOM.render(
  <Router>
    <Route path="/:id" component={App} />
  </Router>, document.getElementById('price-card'),
);
