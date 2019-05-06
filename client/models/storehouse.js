import Cache from './cache';
import Seed from './seed';

export default class Storehouse {
  constructor(aStorehouse = null) {
    if (aStorehouse != null) {
      this.dollars = aStorehouse.dollars;
      this.timeBells = aStorehouse.timeBells;

      let newSeeds = [];
      aStorehouse.seeds.members.map((seed) => {
        let newSeed = new Seed(seed.familyName, seed.givenCultivarName,
          seed.genome);
        Object.keys(seed).map((key) => {
          newSeed[key] = seed[key];
        });
        newSeeds.push(newSeed);
      });
      this.seeds = new Cache(newSeeds);
    }
    else {
      this.dollars = 1000;
      this.timeBells = 0;
      this.seeds = new Cache([]);
    }
  }
  gainDollars(dollarsGained) {
    console.log(dollars);
    console.log(typeof(dollars));
    console.log(dollarsGained);
    console.log(typeof(dollarsGained));
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
