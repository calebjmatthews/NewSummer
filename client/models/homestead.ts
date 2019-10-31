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

  isCultivarFull(cultivarName: string, seedMap: Map<number, Seed>): boolean {
    let count = this.getCultivarCount(cultivarName, seedMap);
    if (count >= this.maxSeeds) {
      return true;
    }
    else {
      return false;
    }
  }

  getCultivarCount(cultivarName: string, seedMap: Map<number, Seed>): number {
    let count = 0;
    this.seedIds.map((seedId) => {
      let seed = seedMap.get(seedId);
      if (seed.cultivarName == cultivarName)  {
        count++;
      }
    });
    return count;
  }

  gainDollars(dollarsGained: number): void {
    this.dollars = this.dollars + dollarsGained;
  }

  spendDollarsIfPossible(dollarsSpent: number): boolean {
    if (this.dollars <= dollarsSpent) {
      return false;
    }
    else {
      this.dollars = this.dollars - dollarsSpent;
      return true;
    }
  }

  addSeed(seed: Seed): void {
    this.seedIds.push(seed.id);
  }

  removeSeed(seed: Seed): number[] {
    return this.seedIds.filter((seedId) => {
      if (seedId == seed.id) { return false; }
      else { return true; }
    });
  }

  breedSeeds(seedA: Seed, seedB: Seed): Seed {
    return seedA.breedWith(seedB);
  }

  ageBreeding(duration: number = null): void {
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

  getBreedingAgeLabel(): string {
    if (this.seedsBred.length > 0) {
      return (utils.formatDuration(this.breedingTimeRemaining * 1000));
    }
    else {
      return '';
    }
  }

  getAllSeeds(seedMap: Map<number, Seed>): Seed[] {
    let seeds: Seed[] = []
    this.seedIds.map((seedId) => {
      seeds.push(seedMap.get(seedId));
    });
    return seeds;
  }

  getAllMatchingSeeds(cultivarName: string, seedMap: Map<number, Seed>): Seed[] {
    let matchingSeeds: Seed[] = []
    this.seedIds.map((seedId) => {
      let seed = seedMap.get(seedId);
      if (seed.cultivarName == cultivarName) {
        matchingSeeds.push(seed);
      }
    });
    return matchingSeeds;
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
