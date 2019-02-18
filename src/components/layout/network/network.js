import React from 'react';
import { observer } from 'mobx-react';
import PropTypes from 'prop-types';
import { translate } from 'react-i18next';
import { format } from 'd3-format-mod';

import { LIVE, DAY, MONTH } from '../../../constants';
import stats from '../../../stores/stats/timeframe';
import liveStats from '../../../stores/stats/live';
import DataSwitcher from '../../dataSwitcher';
import ChartWithStat from '../../chartWithStat';
import Stat from '../../stat';
import Title from '../../title';
import Globe from '../../globe';

import style from './network.scss';

const NetworkLayout = ({ t }) => (
  <section className={style.container}>
    <div className={style.mainContainer}>
      <Title>{t('network_status', 'Network status')}</Title>
      <span className={style.dataSwitcherContainer}>
        <DataSwitcher
          legend={t('data_timeframe', 'Data timeframe')}
          action={stats.useTimeframe}
          activeTimeframe={stats.timeframe}
          options={[
            { value: LIVE, text: '20 minutes' },
            { value: DAY, text: 'Day' },
            { value: MONTH, text: 'Month' }
          ]}
          isLoading={stats.isLoading || liveStats.isLoading}
        />
      </span>
      <div className={style.grid}>
        <div className={style.gridItem}>
          <ChartWithStat
            height={150}
            data={stats.getNetworkData()}
            type="bar"
            xValue="date"
            yValue="hashrate"
            yFormat={format('.4~s')}
            crosshairFormat={format('.8~s')}
            suffix="H/s"
            statisticName={t('network_hashrate', 'Network hashrate')}
            statisticValue={stats.getNetworkStat('hashrate')}
            statisticFormat={format('.4~s')}
          />
        </div>
        <div className={style.gridItem}>
          <ChartWithStat
            height={150}
            data={stats.getNetworkData()}
            type="bar"
            xValue="date"
            yValue="chainDifficulty"
            yFormat={format('.0e')}
            crosshairFormat={format('.14~s')}
            statisticName={t('network_difficulty', 'Network difficulty')}
            statisticValue={stats.getNetworkStat('chainDifficulty')}
            statisticFormat={format('.9~s')}
          />
        </div>
        <div className={style.gridItem}>
          <ChartWithStat
            height={150}
            data={stats.getNetworkData()}
            type="bar"
            xValue="date"
            yValue="hosts"
            statisticName={t('network_hosts', 'Network hosts')}
            statisticValue={stats.getNetworkStat('hosts')}
          />
        </div>
      </div>
    </div>

    <div className={style.sideContainer}>
      {[
        { name: t('blocks', 'Blocks'), statistic: 'blocks' },
        { name: t('main_blocks', 'Main blocks'), statistic: 'mainBlocks' },
        { name: t('supply', 'Supply'), statistic: 'supply' }
      ].map(({ name, statistic }) => (
        <Stat
          name={name}
          className={style.sideStat}
          value={stats.getNetworkStat(statistic)}
          key={statistic}
          format={format(',')}
        />
      ))}
      <Globe />
    </div>
  </section>
);

NetworkLayout.propTypes = {
  t: PropTypes.func.isRequired
};

export default translate()(observer(NetworkLayout));
