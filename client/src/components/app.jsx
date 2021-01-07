/* eslint-disable react/prop-types */
import React from 'react';
import Header from './header';
import Options from './options';
import styles from './main.module.css';

const App = ({ match }) => (
  <div id={styles.container}>
    <Header />
    {console.log(match.params)}
    <Options productId={match.params.id} />
  </div>
);

export default App;
