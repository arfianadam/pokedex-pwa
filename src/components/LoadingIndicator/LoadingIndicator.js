import React, { Component } from 'react';
import PropTypes from 'prop-types';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import styles from './LoadingIndicator.scss';

export default class LoadingIndicator extends Component {
  static propTypes = {
    loading: PropTypes.bool.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { loading } = this.props;
    return (
      <div className={styles.LoadingIndicator}>
        <div className={styles.loadingWrapper}>
          <RefreshIndicator
            left={-20}
            top={80}
            status={loading ? 'loading' : 'hide'}
          />
        </div>
      </div>
    );
  }
}
