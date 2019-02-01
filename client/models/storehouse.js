import Cache from './cache';

export default class Storehouse {
  constructor() {
    this.dollars = 1000;
    this.timeBells = 0;
    this.seeds = new Cache([]);
  }
  gainDollars(dollarsGained) {
    this.dollars = parseFloat((this.dollars + dollarsGained).toFixed(2));
  }
  spendDollars(dollarsSpent) {
    if (this.dollars <= dollarsSpent) {
      return false;
    }
    else {
      this.dollars = parseFloat((this.dollars - dollarsSpent).toFixed(2));
      return true;
    }
  }
  addSeed(seed) {
    this.seeds.add(seed);
  }
  breedSeeds(seedA, seedB) {
    return seedA.breedWith(seedB);
  }
}
