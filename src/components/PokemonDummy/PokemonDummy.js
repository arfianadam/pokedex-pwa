import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter, getTypeId, removeUnderscore } from 'helpers/polyfill';
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
  'height',
  'base_experience',
  'abilities'
];

const speciesOrder = [
  'capture_rate',
  'base_happiness',
  'habitat',
  'color',
  'shape',
  'generation',
  'growth_rate'
];

const speciesDirectValue = [
  speciesOrder[0],
  speciesOrder[1]
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

  mapDetails = pokemon => detail => {
    let detailValue = pokemon[detail];
    if (detail === 'weight') {
      detailValue = `${detailValue / 10} Kg`;
    } else if (detail === 'height') {
      detailValue = `${detailValue / 10} Meters`;
    } else if (detail === 'abilities') {
      const abilitiesArray = detailValue.map(ability => capitalizeFirstLetter(ability.ability.name));
      detailValue = abilitiesArray.join(', ');
    }
    return (
      <tr key={detail}>
        <th>{capitalizeFirstLetter(removeUnderscore(detail))}</th>
        <td>{detail === 'name' ? capitalizeFirstLetter(detailValue) : detailValue}</td>
      </tr>
    );
  }

  mapSpecies = species => detail => {
    let detailValue = species[detail].name;
    if (speciesDirectValue.indexOf(detail) > -1) {
      detailValue = species[detail];
    } else {
      detailValue = capitalizeFirstLetter(detailValue);
    }
    return (
      <tr key={detail}>
        <th>{capitalizeFirstLetter(removeUnderscore(detail))}</th>
        <td>{detailValue}</td>
      </tr>
    );
  }

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
                <h3>Info</h3>
                <table className="table table-striped">
                  <tbody>
                    {detailsOrder.map(this.mapDetails(pokemon))}
                  </tbody>
                </table>
              </Paper>
              <Paper className={styles.paper}>
                <h3>More Details</h3>
                <table className="table table-striped">
                  <tbody>
                    {speciesOrder.map(this.mapSpecies(pokemon.species))}
                  </tbody>
                </table>
              </Paper>
              <Paper className={styles.paper}>
                <h3>Stats</h3>
                <table className="table table-striped">
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
