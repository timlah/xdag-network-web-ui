import React from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import style from './app.scss';

const Loader = ({ message }) => (
  <div className={style.stateContainer}>
    <Spinner size={80} />
    <div className={style.stateMessage}>{message}</div>
  </div>
);

Loader.propTypes = {
  message: PropTypes.string.isRequired
};

export default Loader;
