import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Chart from '../chart';
import Stat from '../stat';
import style from './chartWithStat.scss';

const ChartWithStat = ({
  statisticName,
  statisticValue,
  statisticFormat,
  suffix,
  ...props
}) => (
  <Fragment>
    <div className={style.miniStat}>
      {statisticValue !== null ? statisticValue : 'unavailable'}
    </div>
    <Stat
      className={style.statistic}
      name={statisticName}
      value={Number(statisticValue)}
      format={statisticFormat}
      suffix={suffix}
    />
    <Chart ySuffix={suffix} {...props} />
  </Fragment>
);

ChartWithStat.propTypes = {
  statisticName: PropTypes.string.isRequired,
  statisticValue: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  statisticFormat: PropTypes.func
};

ChartWithStat.defaultProps = {
  statisticValue: null,
  statisticFormat: undefined
};

export default ChartWithStat;
