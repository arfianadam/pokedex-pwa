import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Chip from 'material-ui/Chip';

import styles from './PokemonTypeDummy.scss';

export default class PokemonTypeDummy extends Component {
  static propTypes = {
    type: PropTypes.array.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  handleClick = id => () => {
    console.log(id);
  }

  mapType = type => (
    <Chip
      key={type.id}
      className={styles.chip}
      onClick={this.handleClick(type.id)}
    >
      {type.name}
    </Chip>
  );

  render() {
    const { type } = this.props;
    return (
      <div className={styles.PokemonTypeDummy}>
        {type.map(this.mapType)}
      </div>
    );
  }
}
