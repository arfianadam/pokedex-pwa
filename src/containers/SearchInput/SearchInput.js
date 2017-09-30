import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearSearchInput, editSearchInput } from 'redux/modules/search';
import TextField from 'material-ui/TextField';
// import styles from './SearchInput.scss';

@connect(state => ({
  search: state.search
}))
export default class SearchInput extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    search: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(clearSearchInput());
  }

  componentDidMount() {
    this.input.focus();
  }

  onChange = e => {
    const { dispatch } = this.props;
    e.persist();
    dispatch(editSearchInput(e.target.value));
  }

  render() {
    const { search } = this.props;
    return (
      <TextField
        value={search.value}
        hintText="Search pokemon..."
        hintStyle={{
          color: 'rgba(255, 255, 255, 0.4)'
        }}
        inputStyle={{
          color: 'white'
        }}
        ref={input => { this.input = input; }}
        onChange={this.onChange}
      />
    );
  }
}
