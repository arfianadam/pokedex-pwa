import React, { Component } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { capitalizeFirstLetter } from 'helpers/polyfill';
import PokemonList from 'containers/PokemonList';
import LoadingIndicator from 'components/LoadingIndicator';
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
          <article>
            <Helmet title={capitalizeFirstLetter(type.name)} />
            <PokemonList pokemon={type.pokemon} />
          </article>
        }
        <LoadingIndicator loading={loading} />
      </div>
    );
  }
}
