import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Card, CardTitle } from 'material-ui/Card';
import { capitalizeFirstLetter } from 'helpers/polyfill';
import styles from './PokemonListCard.scss';

export default class PokemonListCard extends Component {
  static propTypes = {
    pokemon: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { pokemon } = this.props;
    return (
      <div className={styles.PokemonListCard}>
        <Card>
          <CardTitle title={capitalizeFirstLetter(pokemon.name)} />
        </Card>
      </div>
    );
  }
}
