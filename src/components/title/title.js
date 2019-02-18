import React from 'react';
import PropTypes from 'prop-types';

import style from './title.scss';

const Title = ({ children, Node }) => (
  <Node className={style.title}>{children}</Node>
);

Title.propTypes = {
  Node: PropTypes.oneOf(['h1', 'h2', 'h3', 'h4', 'h5', 'h6']),
  children: PropTypes.node.isRequired
};

Title.defaultProps = {
  Node: 'h1'
};

export default Title;
