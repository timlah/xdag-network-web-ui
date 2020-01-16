export const API_URL =
  process.env.NODE_ENV === 'development'
    ? 'http://192.168.99.100'
    : 'https://api.xdag.io';

export const MIN_20 = '20_minutes';
export const DAY = 'day';
export const WEEK = 'week';
export const MONTH = 'month';
export const LIVE = MIN_20;
