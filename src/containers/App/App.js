import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import config from 'config';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired
  };

  render() {
    const { children } = this.props;
    const styles = require('./App.scss');

    return (
      <MuiThemeProvider>
        <div className={styles.app}>
          <Helmet {...config.app.head} />
          <AppBar
            title={config.app.title}
            iconClassNameRight="muidocs-icon-navigation-expand-more"
          />
          {children}
        </div>
      </MuiThemeProvider>
    );
  }
}
