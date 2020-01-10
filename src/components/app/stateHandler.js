import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';

import appStore from '../../stores/app';
import liveStats from '../../stores/stats/live';
import pools from '../../stores/pools';
import Loader from './loader';

// Break JS bundle into parts so we can display the user
// a loading screen before the entire app has loaded

// Preload component
const mainLayoutPromise = import('../layout/main');
const MainLayout = lazy(() => mainLayoutPromise);

const StateHandler = ({ t }) => {
  if (appStore.hasError) {
    throw appStore.errorMessage;
  }

  if (pools.initialLoadSuccess && liveStats.initialLoadSuccess) {
    return (
      <Suspense
        fallback={<Loader message={'Loading UI...'} />}
      >
        <MainLayout />
      </Suspense>
    );
  }

  return <Loader message={'Connecting to API...'} />;
};

StateHandler.propTypes = {
  t: PropTypes.func.isRequired
};

export default (observer(StateHandler));
