import React, { memo } from 'react';
import PropTypes from 'prop-types';

import Spinner from '../spinner';
import Option from './option';
import style from './dataSwitcher.scss';

const DataSwitcher = memo(
  ({ legend, activeTimeframe, action, options, isLoading }) => (
    <fieldset className={style.fieldset}>
      <legend className={style.legend}>{legend}</legend>
      {options.map(({ value, text }) => (
        <Option
          text={text}
          value={value}
          activate={action}
          checked={activeTimeframe === value}
          key={value}
        />
      ))}
      <span className={style.loaderContainer}>
        {isLoading && <Spinner size={15} stroke={1} />}
      </span>
    </fieldset>
  )
);

DataSwitcher.propTypes = {
  legend: PropTypes.string.isRequired,
  activeTimeframe: PropTypes.string.isRequired,
  action: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired
};

export default DataSwitcher;
