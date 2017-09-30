import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import config from 'config';
import SearchInput from 'containers/SearchInput';
import HeaderDummy from 'components/HeaderDummy';

@connect()
export default class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    path: PropTypes.string.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  getTitle = () => {
    const { path } = this.props;
    switch (path) {
      case '/':
        return config.app.title;
      case '/search':
        return (
          <SearchInput />
        );
      default:
        return config.app.title;
    }
  }

  navigateTo = path => {
    const { dispatch } = this.props;
    dispatch(push(path));
  }

  render() {
    const { path } = this.props;
    return (
      <HeaderDummy
        title={this.getTitle()}
        path={path}
        navigateTo={this.navigateTo}
      />
    );
  }
}
