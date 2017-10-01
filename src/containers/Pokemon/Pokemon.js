import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { clearDetailPokemon, loadDetailPokemon } from 'redux/modules/pokemon';
import PokemonDummy from 'components/PokemonDummy';
import styles from './Pokemon.scss';

@connect(state => ({
  pokemon: state.pokemon
}))
export default class Pokemon extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
    params: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(loadDetailPokemon(params.id));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearDetailPokemon());
  }

  navigateTo = path => () => {
    const { dispatch } = this.props;
    dispatch(push(path));
  }

  render() {
    const { pokemon } = this.props;
    return (
      <div className={styles.Pokemon}>
        <PokemonDummy
          pokemon={pokemon.detail}
          loading={pokemon.loading}
          navigateTo={this.navigateTo}
        />
      </div>
    );
  }
}
