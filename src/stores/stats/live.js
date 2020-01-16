import { action } from 'mobx';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import jsonBig from 'json-bigint';

import {
  arrayShiftPush,
  parseNetworkStatsEntry,
  parsePoolStatsEntry
} from '../../utils';
import StatsStore from './parentClass';
import { MIN_20, API_URL } from '../../constants';

const EventSource = NativeEventSource || EventSourcePolyfill;
const jsonBigString = jsonBig({ storeAsString: true });

class LiveStatsStore extends StatsStore {
  constructor(timeframe, minDataLength) {
    super();
    this.initStats(timeframe);
    this.minDataLength = minDataLength; // how many data entries there should be before each update starts removing the oldest one
    this.initLiveUpdates();
  }

  getNetworkStat(key) {
    const stats = this.networkData;
    return stats[stats.length - 1][key];
  }

  getPoolStat(poolId, key) {
    const { stats } = this.poolsData.find(({ id }) => id === poolId);
    return stats[stats.length - 1][key];
  }

  @action.bound
  async initLiveUpdates() {
    this.eventSource = new EventSource(`${API_URL}/stats/live`);
    this.eventSource.addEventListener('net_stats_upd', e => {
      this.updateNetworkData(jsonBigString.parse(e.data));
    });
    this.eventSource.addEventListener('pool_stats_upd', e => {
      this.updatePoolsData(
        new Map(e.data.split('\n').map(pool => jsonBigString.parse(pool)))
      );
    });
  }

  @action.bound
  updatePoolsData(newData) {
    this.poolsData = this.poolsData.map(pool => {
      const newStats = newData.get(pool.id);
      return {
        ...pool,
        stats: newStats
          ? arrayShiftPush(
              pool.stats,
              parsePoolStatsEntry(newStats),
              this.minDataLength
            )
          : pool.stats
      };
    });
  }

  @action.bound
  updateNetworkData(entry) {
    this.networkData = arrayShiftPush(
      this.networkData,
      parseNetworkStatsEntry(entry),
      this.minDataLength
    );
  }
}

export default new LiveStatsStore(MIN_20, 20);
