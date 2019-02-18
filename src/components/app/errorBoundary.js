import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { FiCloudOff } from 'react-icons/fi';

import style from './app.scss';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: '',
      hasError: false
    };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    return {
      error,
      hasError: true
    };
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className={style.stateContainer}>
          <IconContext.Provider value={{ size: 80, color: '#E91E63' }}>
            <FiCloudOff />
          </IconContext.Provider>
          <div className={style.stateMessage}>{error.toString()}</div>
        </div>
      );
    }

    return children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.element.isRequired
};

export default ErrorBoundary;
