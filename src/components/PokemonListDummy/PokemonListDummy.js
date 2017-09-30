import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonListCard from 'components/PokemonListCard';
import styles from './PokemonListDummy.scss';

export default class PokemonListDummy extends Component {
  static propTypes = {
    pokemon: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  renderCard = pokemon => (
    <PokemonListCard pokemon={pokemon} />
  )

  render() {
    const { pokemon } = this.props;
    return (
      <div className={styles.PokemonListDummy}>
        {pokemon.map(this.renderCard)}
      </div>
    );
  }
}
