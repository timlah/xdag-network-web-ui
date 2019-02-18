import React from 'react';
import PropTypes from 'prop-types';

import style from './spinner.scss';

const Spinner = ({ size }) => (
  <span className={style.container}>
    <svg
      className={style.spinner}
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        className={style.circle}
        fill="none"
        strokeWidth={size / 12}
        strokeLinecap="round"
        cx={size / 2}
        cy={size / 2}
        r={size / 2 - 4}
      />
    </svg>
  </span>
);

Spinner.propTypes = {
  size: PropTypes.number
};

Spinner.defaultProps = {
  size: 50
};

export default Spinner;
