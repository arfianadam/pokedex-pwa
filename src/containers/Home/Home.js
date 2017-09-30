import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import PokemonList from 'containers/PokemonList';
import { loadListPokemon } from 'redux/modules/pokemon';

@connect(state => ({
  pokemon: state.pokemon
}))
export default class Home extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired
  }

  componentDidMount() {
    const { dispatch, pokemon } = this.props;
    if (!pokemon.allLoaded) {
      dispatch(loadListPokemon(1, 60, true));
    }
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
