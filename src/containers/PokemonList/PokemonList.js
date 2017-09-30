import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { loadListPokemon } from 'redux/modules/pokemon';
import PokemonListDummy from 'components/PokemonListDummy';
import { connect } from 'react-redux';

@connect(state => ({
  pokemon: state.pokemon
}))
export default class PokemonList extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, pokemon } = this.props;
    if (!pokemon.allLoaded) {
      dispatch(loadListPokemon(1, 60, true));
    }
  }

  render() {
    const { pokemon } = this.props;
    return (
      <PokemonListDummy
        pokemon={pokemon.pokemon}
        loading={pokemon.loading}
      />
    );
  }
}
