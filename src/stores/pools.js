import { action, runInAction, observable } from 'mobx';
import { interpolateRainbow } from 'd3-scale-chromatic';
import { scaleLinear } from 'd3-scale';

import { arrayShuffle, request } from '../utils';

const handleVisibility = (entry, i) => ({
  // enable on random, but make sure at least one is visible
  isVisibleInCharts: i === 0 ? true : Math.random() > 0.7,
  ...entry
});

const parsePoolEntry = (entry, i, pools) => ({
  // give each pool a unique color for identification
  color: interpolateRainbow(
    scaleLinear()
      .domain([0, pools.length])
      .range([1, 0.15])(i)
  ),
  payment_all:
    100 -
    (entry.payment_pool +
      entry.payment_community +
      entry.payment_contributor +
      entry.payment_finder),
  ...entry
});

class PoolsStore {
  @observable initialLoadSuccess = false;

  @observable isLoading = true;

  @observable data = [];

  constructor() {
    this.registerPools();
  }

  @action.bound
  setChartVisibility(id, isVisibleInCharts) {
    this.data = this.data.map(pool =>
      pool.id === id
        ? {
            ...pool,
            isVisibleInCharts
          }
        : pool
    );
  }

  @action.bound
  async registerPools() {
    this.isLoading = true;

    try {
      const data = await request.pools();
      runInAction(() => {
        this.data = arrayShuffle(data.map(parsePoolEntry)).map(
          handleVisibility
        );
        this.initialLoadSuccess = true;
        this.isLoading = false;
      });
    } catch (err) {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }
}

const store = new PoolsStore();

export default store;
