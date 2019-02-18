import React, { Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { translate } from 'react-i18next';

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
        fallback={<Loader message={t('loading_UI', 'Loading UI...')} />}
      >
        <MainLayout />
      </Suspense>
    );
  }

  return <Loader message={t('connecting_to_API', 'Connecting to API...')} />;
};

StateHandler.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate()(observer(StateHandler));
