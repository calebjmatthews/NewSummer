import Cache from './cache';
import Seed from './seed';

export default class Storehouse {
  constructor(aStorehouse = null) {
    if (aStorehouse != null) {
      this.dollars = aStorehouse.dollars;
      this.maxSeeds = aStorehouse.maxSeeds;

      let newSeeds = [];
      aStorehouse.seeds.members.map((seed) => {
        let newSeed = new Seed(seed.id, seed.familyName,
          seed.givenCultivarName, seed.methodObtained, seed.dateObtained,
          null, seed.parents, seed.genome);
        Object.keys(seed).map((key) => {
          newSeed[key] = seed[key];
        });
        newSeeds.push(newSeed);
      });
      this.seeds = new Cache(newSeeds);

      if (aStorehouse.intermediateSeed != null) {
        let seed = aStorehouse.intermediateSeed;
        this.intermediateSeed = new Seed(seed.familyName,
          seed.givenCultivarName, seed.methodObtained, seed.dateObtained,
          null, seed.parents, seed.id, seed.genome);
      }
    }
    else {
      this.dollars = 10000;
      this.maxSeeds = 4;
      this.seeds = new Cache([]);
      this.intermediateSeed = null;
    }
  }

  isCultivarFull(cultivarName) {
    let count = this.getCultivarCount(cultivarName);
    if (count >= this.maxSeeds) {
      return true;
    }
    else {
      return false;
    }
  }
  getCultivarCount(cultivarName) {
    let count = 0;
    this.seeds.members.map((seed) => {
      if (seed.cultivarName == cultivarName)  {
        count++;
      }
    });
    return count;
  }
  getCultivarNames() {
    let cultivarNames = [];
    let cultivarNameInArray = {};
    this.seeds.members.map((seed) => {
      if (cultivarNameInArray[seed.cultivarName] != true) {
        cultivarNames.push(seed.cultivarName);
        cultivarNameInArray[seed.cultivarName] = true;
      }
    });
    return cultivarNames;
  }


  gainDollars(dollarsGained) {
    this.dollars = parseFloat((this.dollars + parseFloat(dollarsGained)).toFixed(2));
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
  removeSeed(seed) {
    this.seeds.remove(seed);
  }
  breedSeeds(seedA, seedB) {
    return seedA.breedWith(seedB);
  }
}
