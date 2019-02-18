import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { IconContext } from 'react-icons';
import { FiCheckSquare, FiSquare } from 'react-icons/fi';

import style from './checkbox.scss';

const Checkbox = memo(({ toggle, color, active, screenReaderText }) => {
  const handleChange = ({ target }) => {
    toggle(target.checked);
  };

  return (
    <label className={style.container}>
      <span className={style.hidden}>{screenReaderText}</span>
      {active ? (
        <IconContext.Provider value={{ color }}>
          <FiCheckSquare />
        </IconContext.Provider>
      ) : (
        <IconContext.Provider value={{ color: 'rgba(255, 255, 255, 0.5)' }}>
          <FiSquare />
        </IconContext.Provider>
      )}
      <input
        className={style.hidden}
        type="checkbox"
        checked={active}
        onChange={handleChange}
      />
    </label>
  );
});

Checkbox.propTypes = {
  toggle: PropTypes.func.isRequired,
  active: PropTypes.bool.isRequired,
  color: PropTypes.string,
  screenReaderText: PropTypes.string
};

Checkbox.defaultProps = {
  color: '#fff',
  screenReaderText: undefined
};

export default Checkbox;
