import React, { memo } from 'react';
import PropTypes from 'prop-types';
import {
  FiHelpCircle,
  FiAlertTriangle,
  FiPower,
  FiActivity
} from 'react-icons/fi';

import style from './stateIcon.scss';

const StateIcon = ({ type, includeText }) => {
  const Icon = () => {
    switch (type) {
      case 'ON':
        return (
          <span style={{ color: '#8bf457' }}>
            <span className={style.icon}>
              <FiPower />
            </span>
            {includeText && <span className={style.text}>Operational</span>}
          </span>
        );
      case 'SYNC':
        return (
          <span style={{ color: 'rgb(117, 234, 255)' }}>
            <span className={style.icon}>
              <FiActivity />
            </span>
            {includeText && <span className={style.text}>Synchronizing</span>}
          </span>
        );
      case 'MAINTENANCE':
        return (
          <span style={{ color: '#ffcf00' }}>
            <span className={style.icon}>
              <FiAlertTriangle />
            </span>
            {includeText && <span className={style.text}>Maintenance</span>}
          </span>
        );
      case 'NO_RESPONSE':
        return (
          <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            <span className={style.icon}>
              <FiHelpCircle />
            </span>
            {includeText && <span className={style.text}>No response</span>}
          </span>
        );
      case 'UNKNOWN':
        return (
          <span style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
            <span className={style.icon}>
              <FiHelpCircle />
            </span>
            {includeText && <span className={style.text}>Unknown</span>}
          </span>
        );
      case 'OFFLINE':
        return (
          <span style={{ color: '#E91E63' }}>
            <span className={style.icon}>
              <FiPower />
            </span>
            {includeText && <span className={style.text}>Offline</span>}
          </span>
        );
      default:
        return <FiHelpCircle />;
    }
  };

  return <Icon />;
};

StateIcon.propTypes = {
  includeText: PropTypes.bool,
  type: PropTypes.string.isRequired
};

StateIcon.defaultProps = {
  includeText: false
};

export default memo(StateIcon);
