import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import AnimatedNumber from '../animatedNumber';

import style from './stat.scss';

const Stat = ({ animate, name, value, format, suffix, className }) => {
  const renderValue = () => {
    if (animate && !Number.isNaN(value)) {
      return (
        <Fragment>
          <AnimatedNumber value={value} format={format} />
          {suffix}
        </Fragment>
      );
    }
    return (
      <Fragment>
        {format ? format(value) : value}
        {suffix}
      </Fragment>
    );
  };

  return (
    <span className={className}>
      <span className={style.name}>{name}</span>
      <span className={style.value}>
        {value === null ? 'unavailable' : renderValue()}
      </span>
    </span>
  );
};

Stat.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  animate: PropTypes.bool,
  format: PropTypes.func,
  suffix: PropTypes.string,
  className: PropTypes.string
};

Stat.defaultProps = {
  value: null,
  animate: true,
  format: undefined,
  suffix: undefined,
  className: undefined
};

export default Stat;
