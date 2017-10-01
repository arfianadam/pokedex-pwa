import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import PokemonListDummy from 'components/PokemonListDummy';

@connect()
export default class PokemonList extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
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

  navigateTo = path => {
    const { dispatch } = this.props;
    dispatch(push(path));
  }

  render() {
    const { pokemon, loading } = this.props;
    return (
      <PokemonListDummy
        pokemon={pokemon}
        loading={loading}
        navigateTo={this.navigateTo}
      />
    );
  }
}
