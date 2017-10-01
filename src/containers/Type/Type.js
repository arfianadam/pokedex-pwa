import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { clearDetailType, loadDetailType } from 'redux/modules/type';
import TypeDummy from 'components/TypeDummy';

@connect(state => ({
  type: state.type
}))
export default class Type extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    params: PropTypes.object.isRequired,
    type: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    const { dispatch, params } = this.props;
    dispatch(loadDetailType(params.id));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(clearDetailType());
  }

  render() {
    const { type } = this.props;
    return (
      <TypeDummy
        type={type.detail}
        loading={type.loading}
      />
    );
  }
}
