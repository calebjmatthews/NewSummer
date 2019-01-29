import Cache from './cache';

export default class Storehouse {
  constructor() {
    this.dollars = 0;
    this.timeBells = 0;
    this.seeds = new Cache([]);
  }
  gainDollars(dollarsGained) {
    this.dollars += dollarsGained;
  }
  spendDollars(dollarsSpent) {
    if (this.dollars <= dollarsSpent) {
      return false;
    }
    else {
      this.dollars -= dollarsSpent;
      return true;
    }
  }
  addSeed(seed) {
    this.seeds.add(seed);
  }
}
