import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import config from 'config';
import { searchNow } from 'redux/modules/search';
import { capitalizeFirstLetter } from 'helpers/polyfill';
import SearchInput from 'containers/SearchInput';
import HeaderDummy from 'components/HeaderDummy';

@connect(state => ({
  search: state.search,
  type: state.type.detail,
  pokemon: state.pokemon.detail
}))
export default class Header extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired,
    path: PropTypes.string.isRequired,
    type: PropTypes.object.isRequired,
    pokemon: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  getTitle = () => {
    const { path, type, pokemon } = this.props;
    switch (true) {
      case /\/search/.test(path):
        return (
          <SearchInput />
        );
      case /\/type\//.test(path):
        return `Type ${type.name || '...'}`;
      case /\/pokemon\//.test(path):
        return pokemon.name ? capitalizeFirstLetter(pokemon.name) : 'Pokemon ...';
      default:
        return config.app.title;
    }
  }

  navigateTo = path => {
    const { dispatch } = this.props;
    dispatch(push(path));
  }

  search = () => {
    const { dispatch, search } = this.props;
    dispatch(searchNow(search.value));
  }

  render() {
    const { path } = this.props;
    return (
      <HeaderDummy
        title={this.getTitle()}
        path={path}
        navigateTo={this.navigateTo}
        search={this.search}
      />
    );
  }
}
