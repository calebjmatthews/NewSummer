import Cache from './cache';
import Seed from './seed';
import { formatDuration, formatMoney } from '../functions/utils';
import {AGE_INTERVAL} from '../constants';

export default class Storehouse {
  constructor(aStorehouse = null) {
    if (aStorehouse != null) {
      this.dollars = aStorehouse.dollars;
      this.maxSeeds = aStorehouse.maxSeeds;
      this.experimentalGardenSize = aStorehouse.experimentalGardenSize;

      let newSeeds = [];
      aStorehouse.seeds.members.map((seed) => {
        let newSeed = new Seed(seed.id, seed.familyName,
          null, seed.methodObtained, seed.dateObtained,
          null, seed.parentsIds, seed.genome);
        Object.keys(seed).map((key) => {
          newSeed[key] = seed[key];
        });
        newSeeds.push(newSeed);
      });
      this.seeds = new Cache(newSeeds);

      if (aStorehouse.intermediateSeed != null) {
        let seed = aStorehouse.intermediateSeed;
        this.intermediateSeed = new Seed(seed.id, seed.familyName,
          null, seed.methodObtained, seed.dateObtained,
          null, seed.parentsIds, seed.genome);
      }

      this.seedsBred = [];
      if (aStorehouse.seedsBred.length > 0) {
        aStorehouse.seedsBred.map((seed) => {
          this.seedsBred.push(new Seed(seed.id, seed.familyName,
            null, seed.methodObtained, seed.dateObtained,
            null, seed.parentsIds, seed.genome));
        });
      }
      else {
        this.seedsBred = [];
      }
      this.breedingTimeRemaining = aStorehouse.breedingTimeRemaining;
      this.breedingAgeLabel = aStorehouse.breedingAgeLabel;

    }
    else {
      this.dollars = 10;
      this.maxSeeds = 4;
      this.experimentalGardenSize = 2;
      this.seeds = new Cache([]);
      this.intermediateSeed = null;
      this.seedsBred = [];
      this.breedingTimeRemaining = 0;
      this.breedingAgeLabel = '';
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
    this.dollars = this.dollars + parseFloat(dollarsGained);
  }
  spendDollars(dollarsSpent) {
    if (this.dollars <= dollarsSpent) {
      return false;
    }
    else {
      this.dollars = this.dollars - parseFloat(dollarsSpent);
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
  ageBreeding(duration = null) {
    if (this.seedsBred.length > 0 && this.breedingTimeRemaining > 0) {
      if (duration != null) {
        this.breedingTimeRemaining -= duration;
      }
      else {
        this.breedingTimeRemaining -= AGE_INTERVAL;
      }
      this.breedingAgeLabel = this.getBreedingAgeLabel();
      if (this.breedingTimeRemaining < 0) {
        this.breedingTimeRemaining = 0;
        this.breedingAgeLabel = this.getBreedingAgeLabel();
      }
    }
  }
  getBreedingAgeLabel() {
    if (this.seedsBred.length > 0) {
      return (formatDuration(this.breedingTimeRemaining * 1000));
    }
    else {
      return '';
    }
  }
}
