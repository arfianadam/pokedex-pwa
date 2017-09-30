import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import { List, ListItem } from 'material-ui/List';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import ActionSearch from 'material-ui/svg-icons/action/search';
import styles from './HeaderDummy.scss';

export default class HeaderDummy extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    navigateTo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false
    };
  }

  getDrawerIcon = () => (
    <IconButton
      onClick={this.toggleDrawer}
    >
      <NavigationMenu />
    </IconButton>
  )

  getSearchIcon = () => (
    <IconButton
      onClick={this.goToSearch}
    >
      <ActionSearch />
    </IconButton>
  )

  toggleDrawer = (nextState) => {
    this.setState(prevState => (
      {
        ...prevState,
        isDrawerOpen: nextState || !prevState.isDrawerOpen
      }
    ));
  }

  goToSearch = () => {
    const { navigateTo } = this.props;
    navigateTo('/search');
  }

  render() {
    const { title } = this.props;
    const { isDrawerOpen } = this.state;
    return (
      <div className={styles.HeaderDummy}>
        <AppBar
          title={title}
          iconElementLeft={this.getDrawerIcon()}
          iconElementRight={this.getSearchIcon()}
          style={{
            position: 'fixed',
            top: 0
          }}
        />
        <Drawer
          docked={false}
          open={isDrawerOpen}
          onRequestChange={this.toggleDrawer}
        >
          <List>
            <ListItem primaryText="Janet Perkins Bennet" />
            <ListItem primaryText="Peter Carlsson" />
          </List>
        </Drawer>
      </div>
    );
  }
}
