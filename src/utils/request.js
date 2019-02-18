import { get } from 'axios';

import { API_ROOT, MIN_20, DAY, MONTH } from '../constants';
import appState from '../stores/app';

const request = async path => {
  const { data } = await get(`${API_ROOT}/${path}`);

  if (data.status !== 'ok') {
    throw `API ${data.status}: ${data.message}`;
  }

  return data.result;
};

const stats = async timeframe => {
  const route = 'stats';
  let data;

  try {
    switch (timeframe) {
      case MIN_20:
        data = await request(`${route}/`);
        break;
      case DAY:
        data = await request(`${route}/day`);
        break;
      case MONTH:
        data = await request(`${route}/month`);
        break;
      default:
        data = await request(`${route}/`);
    }
  } catch (error) {
    appState.setError('API connection failed. Please try again later.');
  }

  return data;
};

const pools = async () => {
  let data;

  try {
    data = await request('pools');
  } catch (error) {
    appState.setError('API connection failed. Please try again later.');
  }

  return data;
};

export default {
  stats,
  pools
};
