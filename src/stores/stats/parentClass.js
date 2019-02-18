import { action, runInAction, observable } from 'mobx';

import {
  request,
  parseNetworkStatsEntry,
  parsePoolStatsEntry
} from '../../utils';

export default class StatsStore {
  @observable initialLoadSuccess = false;

  @observable isLoading = false;

  @observable poolsData = [];

  @observable networkData = [];

  constructor() {
    this.request = null;
  }

  @action.bound
  initStats(timeframe) {
    this.registerStats(timeframe, () => {
      this.initialLoadSuccess = true;
    });
  }

  @action.bound
  async registerStats(timeframe, onSuccess) {
    this.isLoading = true;

    try {
      const data = await request.stats(timeframe);
      runInAction(() => {
        this.networkData = data.network.map(parseNetworkStatsEntry);
        this.poolsData = data.pools.map(pool => ({
          id: pool.id,
          stats: pool.stats.map(parsePoolStatsEntry)
        }));
        onSuccess();
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}
