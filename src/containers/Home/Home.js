import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PokemonList from 'containers/PokemonList';

export default class Home extends Component {
  render() {
    const styles = require('./Home.scss');
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <h1>Hello!</h1>
        <PokemonList />
      </div>
    );
  }
}
