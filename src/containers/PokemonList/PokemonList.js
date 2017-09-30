import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonListDummy from 'components/PokemonListDummy';
import { connect } from 'react-redux';

@connect(state => ({
  pokemon: state.pokemon
}))
export default class PokemonList extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
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
