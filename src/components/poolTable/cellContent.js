import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { format } from 'd3-format-mod';
import { FiX } from 'react-icons/fi';

import Checkbox from '../checkbox';
import AnimatedNumber from '../animatedNumber';
import StateIcon from '../stateIcon';
import statsStore from '../../stores/stats/timeframe';
import liveStatsStore from '../../stores/stats/live';
import poolsStore from '../../stores/pools';

import style from './poolList.scss';

const formatNumbers = format('.3~s');

const CellContent = ({ pool, header, suffix }) => {
  const handleVisibilityToggle = bool => {
    poolsStore.setChartVisibility(pool.id, bool);
  };

  let value;

  switch (header) {
    case 'isVisibleInCharts':
      return (
        <Checkbox
          toggle={handleVisibilityToggle}
          active={pool.isVisibleInCharts}
          color={pool.color}
          screenReaderText={'Display pool data in charts'}
        />
      );

    case 'hashrate':
    case 'hosts':
    case 'waitSyncBlocks':
    case 'orphanBlocks':
      value = statsStore.getPoolStat(pool.id, header);
      return value !== null ? (
        <Fragment>
          <AnimatedNumber value={Number(value)} format={formatNumbers} />
          <span>{suffix}</span>
        </Fragment>
      ) : (
        <FiX />
      );

    case 'state':
      return (
        <div className={style.stateContainer}>
          <StateIcon
            size="15px"
            type={liveStatsStore.getPoolStat(pool.id, header)}
            includeText
          />
        </div>
      );

    case 'location':
      return pool[header];

    case 'mining_address':
      return pool[header].map(address => <div key={address}>{address}</div>);

    case 'payment_pool':
    case 'payment_finder':
    case 'payment_contributor':
    case 'payment_community':
    case 'payment_all':
      return `${pool[header]} %`;

    case 'name':
      return pool.website ? (
        <a
          className={style.link}
          href={pool.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {pool[header]}
        </a>
      ) : (
        pool[header]
      );

    default:
      return pool[header] || null;
  }
};

CellContent.propTypes = {
  pool: PropTypes.objectOf(PropTypes.shape).isRequired,
  header: PropTypes.string.isRequired,
  suffix: PropTypes.string
};

CellContent.defaultProps = {
  suffix: null
};

export default observer(CellContent);
