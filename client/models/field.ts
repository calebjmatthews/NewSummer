import Seed from './seed/seed';
import Family from './seed/family';
import RealValueReturn from './seed/real_value_return';
import { StatNames } from './enums/stat_names';
import { utils } from './utils';
import { AGE_INTERVAL } from '../constants';

export default class Field implements FieldInterface {
  id: number;
  name: string;
  seedPlantedId: number;
  seedsNameLabel: string;
  seedsAge: number;
  seedsAgeLabel: string;
  harvestResult: RealValueReturn;

  temperature: number;
  moisture: number;
  fertility: number;
  pests: number;
  disease: number;

  constructor(field: FieldInterface) {
    Object.assign(this, field);
  }

  plantSeed(aSeed: Seed, seedMap: Map<number, Seed>) {
    this.seedPlantedId = aSeed.id;
    this.seedsNameLabel = this.getSeedsNameLabel(seedMap);
    this.seedsAgeLabel = this.getSeedsAgeLabel(seedMap);
  }

  ageSeed(duration: number = null, seedMap: Map<number, Seed>) {
    if (this.seedPlantedId != null) {
      let seed = seedMap.get(this.seedPlantedId);
      if (this.seedsAge < (seed.statMap.get(StatNames.GROWING_TIME).value * 1000)) {
        if (duration == null) {
          this.seedsAge += AGE_INTERVAL;
        }
        else {
          this.seedsAge += duration;
        }
        this.seedsAgeLabel = this.getSeedsAgeLabel(seedMap);
        if (this.seedsAge >= (seed.statMap.get(StatNames.GROWING_TIME).value * 1000)) {
          this.seedsAge = (seed.statMap.get(StatNames.GROWING_TIME).value * 1000);
        }
      }
    }
  }

  getSeedsNameLabel(seedMap: Map<number, Seed>) {
    let seed = seedMap.get(this.seedPlantedId);
    if (seed != null) {
      return seed.name;
    }
    else {
      return 'Nothing planted';
    }
  }

  getSeedsAgeLabel(seedMap: Map<number, Seed>) {
    if (this.seedPlantedId != null) {
      let seed = seedMap.get(this.seedPlantedId);
      let remainingTime = ((seed.statMap.get(StatNames.GROWING_TIME).value * 1000)
        - this.seedsAge);
      return (utils.formatDuration(remainingTime));
    }
    else {
      return '';
    }
  }

  harvestSeed(seedMap: Map<number, Seed>, families: Map<string, Family>) {
    let seed = seedMap.get(this.seedPlantedId);
    this.harvestResult = seed.determineRealValue(seed.statMap, this.temperature,
      this.moisture, this.fertility, this.pests, this.disease, families);
    this.seedPlantedId = null;
    this.seedsAge = 0;
    this.seedsNameLabel = this.getSeedsNameLabel(seedMap);
    this.seedsAgeLabel = '';
  }
}

function getGrowthStage(age, growingTime, durations) {
  let completion = age/growingTime;
  for (let index = 0; index < durations.length; index++) {
    if (completion < durations[index]) {
      return (index);
    }
  }
  return durations.length;
}

interface FieldInterface {
  id: number;
  name: string;
  seedPlantedId: number;
  seedsNameLabel: string;
  seedsAge: number;
  seedsAgeLabel: string;
  harvestResult: RealValueReturn;

  temperature: number;
  moisture: number;
  fertility: number;
  pests: number;
  disease: number;
}
