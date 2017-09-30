import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PokemonList from 'containers/PokemonList';

@connect(state => ({
  pokemon: state.pokemon
}))
export default class Home extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired
  }

  render() {
    const styles = require('./Home.scss');
    const { pokemon } = this.props;
    return (
      <div className={styles.home}>
        <Helmet title="Home" />
        <PokemonList pokemon={pokemon.pokemon} />
      </div>
    );
  }
}
