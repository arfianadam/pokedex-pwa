import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonListDummy from 'components/PokemonListDummy';

export default class PokemonList extends Component {
  static propTypes = {
    pokemon: PropTypes.array.isRequired,
    loading: PropTypes.bool
  }

  static defaultProps = {
    loading: false
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pokemon, loading } = this.props;
    return (
      <PokemonListDummy
        pokemon={pokemon}
        loading={loading}
      />
    );
  }
}
