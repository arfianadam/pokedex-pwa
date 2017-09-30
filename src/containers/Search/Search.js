import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import Fuse from 'fuse.js';
import PokemonType from 'containers/PokemonType';
import PokemonList from 'containers/PokemonList';
import styles from './Search.scss';

const options = {
  keys: ['name']
};

@connect(state => ({
  search: state.search,
  pokemon: state.pokemon
}))
export default class Search extends Component {
  static propTypes = {
    search: PropTypes.object.isRequired,
    pokemon: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  shouldComponentUpdate(nextProps) {
    const { search } = this.props;
    return search.searchQuery !== nextProps.searchQuery;
  }

  render() {
    const { search, pokemon } = this.props;
    const fuse = new Fuse(pokemon.pokemon, options);
    const filteredPokemon = fuse.search(search.searchQuery);
    return (
      <div className={styles.Search}>
        <Helmet title="Search" />
        {search.searchQuery === '' &&
          <PokemonType />
        }
        {search.searchQuery !== '' &&
          <PokemonList pokemon={filteredPokemon} />
        }
      </div>
    );
  }
}
