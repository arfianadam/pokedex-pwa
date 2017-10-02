import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import IconButton from 'material-ui/IconButton';
import NavigationMenu from 'material-ui/svg-icons/navigation/menu';
import NavigationBack from 'material-ui/svg-icons/navigation/arrow-back';
import ActionSearch from 'material-ui/svg-icons/action/search';
import styles from './HeaderDummy.scss';

export default class HeaderDummy extends Component {
  static propTypes = {
    title: PropTypes.node.isRequired,
    navigateTo: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired,
    search: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false
    };
  }

  getLeftIcon = () => {
    const { path, goBack } = this.props;
    if (path === '/') {
      return (
        <IconButton
          onClick={this.toggleDrawer}
        >
          <NavigationMenu />
        </IconButton>
      );
    }
    return (
      <IconButton
        onClick={goBack}
      >
        <NavigationBack />
      </IconButton>
    );
  }

  getRightIcon = () => {
    const { path } = this.props;
    switch (path) {
      case '/':
        return (
          <IconButton
            onClick={this.navigateTo('/search')}
          >
            <ActionSearch />
          </IconButton>
        );
      case '/search':
        return (
          <IconButton
            onClick={this.search}
          >
            <ActionSearch />
          </IconButton>
        );
      default:
        return null;
    }
  }

  search = () => {
    const { search } = this.props;
    search();
  }

  toggleDrawer = (nextState) => {
    this.setState(prevState => (
      {
        ...prevState,
        isDrawerOpen: (typeof nextState === 'boolean') ? nextState : !prevState.isDrawerOpen
      }
    ));
  }

  navigateTo = path => () => {
    const { navigateTo } = this.props;
    navigateTo(path);
  }

  render() {
    const { title } = this.props;
    const { isDrawerOpen } = this.state;
    return (
      <div className={styles.HeaderDummy}>
        <AppBar
          title={title}
          iconElementLeft={this.getLeftIcon()}
          iconElementRight={this.getRightIcon()}
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
          <img
            src="/logo.png"
            alt="logo"
            className={styles.drawerImg}
          />
          <p>By Arfian Adam</p>
        </Drawer>
      </div>
    );
  }
}
