import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { translate } from 'react-i18next';

import detectTabUse from '../detectTabUse';
import ErrorBoundary from './errorBoundary';
import StateHandler from './stateHandler';
import style from './app.scss';

const cx = classNames.bind(style);

const App = ({ isUsingTab }) => {
  const appClassName = cx({
    app: true,
    isUsingTab
  });

  return (
    <div className={appClassName}>
      <ErrorBoundary>
        <StateHandler />
      </ErrorBoundary>
    </div>
  );
};

App.propTypes = {
  isUsingTab: PropTypes.bool.isRequired
};

export default translate()(detectTabUse(App));
