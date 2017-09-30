import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import config from 'config';
import HeaderDummy from 'components/HeaderDummy';

@connect()
export default class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  navigateTo = path => {
    const { dispatch } = this.props;
    dispatch(push(path));
  }

  render() {
    return (
      <HeaderDummy
        title={config.app.title}
        navigateTo={this.navigateTo}
      />
    );
  }
}
