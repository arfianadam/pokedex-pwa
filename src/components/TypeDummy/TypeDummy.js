import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import PokemonList from 'containers/PokemonList';
import styles from './TypeDummy.scss';

export default class TypeDummy extends Component {
  static propTypes = {
    type: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { type, loading } = this.props;
    return (
      <div className={styles.TypeDummy}>
        {type.name &&
          <PokemonList pokemon={type.pokemon} />
        }
        <div className={styles.loadingContainer}>
          <div className={styles.loadingWrapper}>
            <RefreshIndicator
              left={-20}
              top={80}
              status={loading ? 'loading' : 'hide'}
            />
          </div>
        </div>
      </div>
    );
  }
}
