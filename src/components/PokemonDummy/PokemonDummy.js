import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter, getTypeId } from 'helpers/polyfill';
import Chip from 'material-ui/Chip';
import Paper from 'material-ui/Paper';
import LoadingIndicator from 'components/LoadingIndicator';
import styles from './PokemonDummy.scss';

const spritesOrder = [
  'front_default',
  'front_shiny',
  'front_female',
  'front_shiny_female',
  'back_default',
  'back_shiny',
  'back_female',
  'back_shiny_female'
];

const detailsOrder = [
  'id',
  'name',
  'weight',
  'height'
];

export default class PokemonDummy extends Component {
  static propTypes = {
    navigateTo: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  mapType = type => (
    <Chip
      key={type.slot}
      className={styles.type}
      onClick={this.props.navigateTo(`/type/${getTypeId(type.type.url)}`)}
    >
      {type.type.name}
    </Chip>
  )

  mapSprites = sprites => sprite => {
    if (sprites[sprite]) {
      return (
        <img
          src={sprites[sprite] || '/pokemon-notfound.png'}
          alt={sprite}
          key={sprite}
        />
      );
    }
    return null;
  }

  mapDetails = pokemon => detail => (
    <tr key={detail}>
      <th>{capitalizeFirstLetter(detail)}</th>
      <td>{detail === 'name' ? capitalizeFirstLetter(pokemon[detail]) : pokemon[detail]}</td>
    </tr>
  )

  mapStats = stat => (
    <tr key={stat.stat.name}>
      <th>{stat.stat.name}</th>
      <td>{stat.base_stat}</td>
    </tr>
  )

  renderSprites = pokemon => {
    const sprites = pokemon.sprites;
    return spritesOrder.map(this.mapSprites(sprites));
  }

  render() {
    const { pokemon, loading } = this.props;
    return (
      <div className={styles.PokemonDummy}>
        {pokemon.name &&
          <article>
            <Helmet title={capitalizeFirstLetter(pokemon.name)} />
            <header>
              <div className={styles.sprites}>
                {this.renderSprites(pokemon)}
              </div>
              <div className={styles.typeContainer}>
                {pokemon.types.map(this.mapType)}
              </div>
            </header>
            <main>
              <Paper className={styles.paper}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Details</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {detailsOrder.map(this.mapDetails(pokemon))}
                  </tbody>
                </table>
              </Paper>
              <Paper className={styles.paper}>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Stats</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pokemon.stats.map(this.mapStats)}
                  </tbody>
                </table>
              </Paper>
            </main>
          </article>
        }
        <LoadingIndicator loading={loading} />
      </div>
    );
  }
}
