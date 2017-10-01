import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LoadingIndicator from 'components/LoadingIndicator';
import styles from './PokemonDummy.scss';

export default class PokemonDummy extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pokemon, loading } = this.props;
    return (
      <div className={styles.PokemonDummy}>
        {pokemon.name}
        <LoadingIndicator loading={loading} />
      </div>
    );
  }
}
