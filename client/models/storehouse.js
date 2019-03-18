import Cache from './cache';

export default class Storehouse {
  constructor(aStorehouse = null) {
    if (aStorehouse != null) {
      this.dollars = aStorehouse.dollars;
      this.timeBells = aStorehouse.timeBells;
      this.seeds = new Cache([]);
      this.seeds.fromCache(aStorehouse.seeds);
      console.log('this.seeds');
      console.log(this.seeds);
    }
    else {
      this.dollars = 1000;
      this.timeBells = 0;
      this.seeds = new Cache([]);
    }
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
