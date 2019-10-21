import Seed from './seed';
import RecordBook from './record_book';
import { utils } from './utils';
import { AGE_INTERVAL } from '../constants';

export default class Homestead implements HomesteadInterface {
  dollars: number;
  maxSeeds: number;
  experimentalGardenSize: number;
  seedIds: number[];
  intermediateSeed: number;
  seedsBred: number[];
  breedingTimeRemaining: number;
  breedingAgeLabel: string;

  constructor(homestead: HomesteadInterface = null) {
    if (homestead != null) {
      Object.assign(this, homestead);
    }
    else {
      this.dollars = 10;
      this.maxSeeds = 4;
      this.experimentalGardenSize = 2;
      this.seedIds = [];
      this.intermediateSeed = null;
      this.seedsBred = [];
      this.breedingTimeRemaining = 0;
      this.breedingAgeLabel = '';
    }
  }

  isCultivarFull(cultivarName: string, recordBook: RecordBook) {
    let count = this.getCultivarCount(cultivarName, recordBook);
    if (count >= this.maxSeeds) {
      return true;
    }
    else {
      return false;
    }
  }

  getCultivarCount(cultivarName: string, recordBook: RecordBook) {
    let count = 0;
    this.seedIds.map((seedId) => {
      let seed = recordBook.getSeed(seedId);
      if (seed.cultivarName == cultivarName)  {
        count++;
      }
    });
    return count;
  }

  gainDollars(dollarsGained: number) {
    this.dollars = this.dollars + dollarsGained;
  }
  spendDollarsIfPossible(dollarsSpent: number) {
    if (this.dollars <= dollarsSpent) {
      return false;
    }
    else {
      this.dollars = this.dollars - dollarsSpent;
      return true;
    }
  }

  addSeed(seed: Seed) {
    this.seedIds.push(seed.id);
  }

  removeSeed(seed: Seed) {
    return this.seedIds.filter((seedId) => {
      if (seedId == seed.id) { return false; }
      else { return true; }
    });
  }

  breedSeeds(seedA: Seed, seedB: Seed) {
    return seedA.breedWith(seedB);
  }

  ageBreeding(duration: number = null) {
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
      return (utils.formatDuration(this.breedingTimeRemaining * 1000));
    }
    else {
      return '';
    }
  }
}

interface HomesteadInterface {
  dollars: number;
  maxSeeds: number;
  experimentalGardenSize: number;
  seedIds: number[];
  intermediateSeed: number;
  seedsBred: number[];
  breedingTimeRemaining: number;
  breedingAgeLabel: string;
}
