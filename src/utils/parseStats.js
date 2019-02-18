import { BigNumber } from 'bignumber.js';
import shortid from 'shortid';

export const parseNetworkStatsEntry = entry => {
  const hashrate =
    entry[1] !== null ? BigNumber(entry[1] * 1000000).toString(10) : null; // mega (n^6) to none
  return {
    id: shortid.generate(),
    date: entry[0] * 1000, // seconds to milliseconds
    hashrate,
    supply: entry[2],
    blocks: entry[3],
    mainBlocks: entry[4],
    hosts: entry[5],
    chainDifficulty: entry[6]
  };
};

export const parsePoolStatsEntry = entry => {
  const hashrate =
    entry[1] !== null ? BigNumber(entry[1] * 1000000).toString(10) : null; // mega (n^6) to none
  return {
    id: shortid.generate(),
    date: entry[0] * 1000, // seconds to milliseconds
    hashrate,
    state: entry[2],
    orphanBlocks: entry[3],
    waitSyncBlocks: entry[4],
    hosts: entry[5]
  };
};
