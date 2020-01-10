import React from 'react';
import ReactDOM from 'react-dom';

import './publicPath';
import App from './components/app';

const init = ({ rootNodeId }) => {
  ReactDOM.render(<App />, document.getElementById(rootNodeId));
};

export default init;
