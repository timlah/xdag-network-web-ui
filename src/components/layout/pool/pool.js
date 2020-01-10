import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import { format } from 'd3-format-mod';

import Chart from '../../chart';
import PoolTable from '../../poolTable';
import Title from '../../title';
import timeframeStats from '../../../stores/stats/timeframe';
import pools from '../../../stores/pools';
import style from './pool.scss';

const PoolLayout = () => {
  const visualizedPools = timeframeStats
    .getPoolsData()
    .reduce((result, poolDataGroup) => {
      const targetPool = pools.data.find(pool => pool.id === poolDataGroup.id);
      const { isVisibleInCharts, color, name } = targetPool;

      if (isVisibleInCharts) {
        result.push({ ...poolDataGroup, color, name });
      }

      return result;
    }, []);

  return (
    <section className={style.container}>
      <div className={style.chartContainer}>
        <div className={style.grid}>
          <div className={style.gridItem}>
            <div className={style.chartTitle}>Pool hashrate</div>
            <Chart
              data={visualizedPools}
              isDataGroup
              height={225}
              dataKey="stats"
              type="line"
              xValue="date"
              yValue="hashrate"
              yFormat={format('.4~s')}
              ySuffix="H/S"
              crosshairGroupIdentifier="name"
              crosshairFormat={format('.4~s')}
            />
          </div>
          <div className={style.gridItem}>
            <div className={style.chartTitle}>Pool orphan blocks</div>
            <Chart
              data={visualizedPools}
              isDataGroup
              height={225}
              dataKey="stats"
              type="line"
              xValue="date"
              yValue="orphanBlocks"
              yFormat={format('.4~s')}
              crosshairGroupIdentifier="name"
            />
          </div>
          <div className={style.gridItem}>
            <div className={style.chartTitle}>Pool wait sync blocks</div>
            <Chart
              data={visualizedPools}
              isDataGroup
              height={225}
              dataKey="stats"
              type="line"
              xValue="date"
              yValue="waitSyncBlocks"
              yFormat={format('.4~s')}
              crosshairGroupIdentifier="name"
            />
          </div>
        </div>
      </div>
      <div className={style.listContainer}>
        <Title>featured mining pools</Title>
        <div>
          <PoolTable />
          <p className={style.poolInfo}>
            All the pools featured here donate a percentage of block rewards to
            the community fund.
            <span className={style.poolInfoSpacer}>
              The complete list of community approved pools can be found on
              our&nbsp;
              <a href="https://github.com/XDagger/xdag/wiki/White-List">wiki</a>
              .
            </span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default observer(PoolLayout);
