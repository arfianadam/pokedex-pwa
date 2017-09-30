import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import config from 'config';
import { loadListPokemon } from 'redux/modules/pokemon';

import Header from 'containers/Header';

@connect(state => ({
  pokemon: state.pokemon
}))
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
    pokemon: PropTypes.object.isRequired
  };

  componentDidMount() {
    const { dispatch, pokemon } = this.props;
    if (!pokemon.allLoaded) {
      dispatch(loadListPokemon(1, 60, true));
    }
  }

  render() {
    const { children, location } = this.props;
    const styles = require('./App.scss');

    return (
      <MuiThemeProvider>
        <div className={styles.app}>
          <Helmet {...config.app.head} />
          <Header path={location.pathname} />
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}
