import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonListCard from 'components/PokemonListCard';
import styles from './PokemonListDummy.scss';

const PER_PAGE = 40;

export default class PokemonListDummy extends Component {
  static propTypes = {
    pokemon: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1
    };
  }

  renderCard = pokemon => (
    <PokemonListCard key={pokemon.name} pokemon={pokemon} />
  )

  render() {
    const { pokemon } = this.props;
    const { page } = this.state;
    const slicedPokemon = pokemon.slice((page - 1) * PER_PAGE, page * PER_PAGE);
    return (
      <div className={styles.PokemonListDummy}>
        {slicedPokemon.map(this.renderCard)}
      </div>
    );
  }
}
