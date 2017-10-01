import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PokemonListCard from 'components/PokemonListCard';
import styles from './PokemonListDummy.scss';

const PER_PAGE = 20;

export default class PokemonListDummy extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    pokemon: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      isSlicing: false
    };
  }

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll, false);
  }

  componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    if (page !== prevState.page) {
      this.setState(() => ({ // eslint-disable-line
        isSlicing: false
      }));
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const { pokemon } = this.props;
    const { page, isSlicing } = this.state;
    if ((((page + 1) * PER_PAGE) - pokemon.length) < PER_PAGE) {
      if (!isSlicing) {
        if (window.innerHeight + window.scrollY > document.body.offsetHeight - 400) {
          this.setState(() => ({
            isSlicing: true
          }), () => {
            this.setState(() => ({
              page: page + 1
            }));
          });
        }
      }
    }
  }

  renderCard = pokemon => (
    <PokemonListCard key={pokemon.name} pokemon={pokemon} navigateTo={this.props.navigateTo} />
  )

  render() {
    const { pokemon } = this.props;
    const { page } = this.state;
    const slicedPokemon = pokemon.slice(0, page * PER_PAGE);
    return (
      <div className={styles.PokemonListDummy} ref={ref => { this.list = ref; }}>
        {slicedPokemon.map(this.renderCard)}
        {slicedPokemon.length === pokemon.length &&
          <p>All pokemons loaded.</p>
        }
      </div>
    );
  }
}
