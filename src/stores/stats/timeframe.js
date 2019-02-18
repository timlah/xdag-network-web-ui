import { action, observable } from 'mobx';

import StatsStore from './parentClass';
import liveStats from './live';
import { LIVE } from '../../constants';

class TimeframeStatsStore extends StatsStore {
  @observable timeframe;

  constructor(timeframe) {
    super();
    this.timeframe = timeframe;
  }

  getIsLoading() {
    return this.timeframe === LIVE ? liveStats.isLoading : this.isLoading;
  }

  getState() {
    return this.timeframe === LIVE ? liveStats.state : this.state;
  }

  getNetworkData() {
    return this.timeframe === LIVE ? liveStats.networkData : this.networkData;
  }

  getNetworkStat(key) {
    const stats = this.getNetworkData();
    return stats[stats.length - 1][key];
  }

  getPoolsData() {
    return this.timeframe === LIVE ? liveStats.poolsData : this.poolsData;
  }

  getPoolStat(poolId, key) {
    const { stats } = this.getPoolsData().find(pool => pool.id === poolId);

    return stats[stats.length - 1][key];
  }

  @action.bound
  useTimeframe(timeframe) {
    /* eslint-disable no-unused-expressions */
    timeframe === LIVE
      ? (this.timeframe = timeframe)
      : this.registerStats(timeframe, () => {
          this.timeframe = timeframe;
        });
  }
}

export default new TimeframeStatsStore(LIVE);
