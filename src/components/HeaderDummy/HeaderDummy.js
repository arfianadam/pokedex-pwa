import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import styles from './HeaderDummy.scss';

export default class HeaderDummy extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired
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

  toggleDrawer = (nextState) => {
    this.setState(prevState => (
      {
        ...prevState,
        isDrawerOpen: nextState || !prevState.isDrawerOpen
      }
    ));
  }

  render() {
    const { title } = this.props;
    const { isDrawerOpen } = this.state;
    return (
      <div className={styles.HeaderDummy}>
        <AppBar
          title={title}
          iconElementLeft={this.getDrawerIcon()}
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
