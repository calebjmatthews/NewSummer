import Cache from './cache';

export default class Storehouse {
  constructor() {
    this.dollars = 1000;
    this.timeBells = 0;
    this.seeds = new Cache([]);
  }
  gainDollars(dollarsGained) {
    this.dollars = (this.dollars + dollarsGained).toFixed(2);
  }
  spendDollars(dollarsSpent) {
    if (this.dollars <= dollarsSpent) {
      return false;
    }
    else {
      this.dollars = (this.dollars - dollarsSpent).toFixed(2);
      return true;
    }
  }
  addSeed(seed) {
    this.seeds.add(seed);
  }
}
