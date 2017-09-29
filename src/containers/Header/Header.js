import React, { Component } from 'react';
import config from 'config';
import HeaderDummy from 'components/HeaderDummy';

export default class Header extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <HeaderDummy
        title={config.app.title}
      />
    );
  }
}
