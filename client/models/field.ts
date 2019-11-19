import Seed from './seed/seed';
import Family from './seed/family';
import RealValueReturn from './seed/real_value_return';
import { StatNames } from './enums/stat_names';
import { utils } from './utils';
import { families } from '../instances/families';
import { AGE_INTERVAL } from '../constants';

export default class Field implements FieldInterface {
  id: number;
  name: string;
  seedPlantedId: number;
  seedsNameLabel: string;
  seedsAge: number;
  seedMature: boolean;
  seedsAgeLabel: string;
  harvestResult: RealValueReturn;
  harvestedSeedId: number;

  temperature: number;
  moisture: number;
  fertility: number;
  pests: number;
  disease: number;

  constructor(field: FieldInterface = null) {
    if (field != null) {
      Object.assign(this, field);
    }
  }

  plantSeed(aSeed: Seed, seedMap: { [id: number] : Seed }) {
    this.seedPlantedId = aSeed.id;
    this.seedsAge = 0;
    this.seedMature = false;
    this.seedsNameLabel = this.getSeedsNameLabel(seedMap);
    this.seedsAgeLabel = this.getSeedsAgeLabel(seedMap);
  }

  ageSeed(duration: number = null, seedMap: { [id: number] : Seed }) {
    if (this.seedPlantedId != null) {
      let seed = seedMap[this.seedPlantedId];
      if (this.seedsAge < (seed.statMap[StatNames.GROWING_TIME].value * 1000)) {
        if (duration == null) {
          this.seedsAge += AGE_INTERVAL;
        }
        else {
          this.seedsAge += duration;
        }
        this.seedsAgeLabel = this.getSeedsAgeLabel(seedMap);
        if (this.seedsAge >= (seed.statMap[StatNames.GROWING_TIME].value * 1000)) {
          this.seedsAge = (seed.statMap[StatNames.GROWING_TIME].value * 1000);
          this.seedMature = true;
        }
      }
      else {
        this.seedMature = true;
      }
    }
  }

  getSeedsNameLabel(seedMap: { [id: number] : Seed }) {
    let seed = seedMap[this.seedPlantedId];
    if (seed != null) {
      return seed.name;
    }
    else {
      return 'Nothing planted';
    }
  }

  getSeedsAgeLabel(seedMap: { [id: number] : Seed }) {
    if (this.seedPlantedId != null) {
      let seed = seedMap[this.seedPlantedId];
      let remainingTime = ((seed.statMap[StatNames.GROWING_TIME].value * 1000)
        - this.seedsAge);
      let ageLabel = utils.formatDuration(remainingTime);
      if (ageLabel != '0s ') {
        return ageLabel;
      }
      else {
        return 'Mature';
      }
    }
    else {
      return '';
    }
  }

  harvestSeed(seedMap: { [id: number] : Seed }) {
    let seed = seedMap[this.seedPlantedId];
    this.harvestResult = seed.determineRealValue(seed.statMap, this.temperature,
      this.moisture, this.fertility, this.pests, this.disease);
    this.harvestedSeedId = this.seedPlantedId;
    this.seedPlantedId = null;
    this.seedsAge = 0;
    this.seedMature = false;
    this.seedsNameLabel = this.getSeedsNameLabel(seedMap);
    this.seedsAgeLabel = '';

    return this.harvestResult;
  }
}

interface FieldInterface {
  id: number;
  name: string;
  seedPlantedId: number;
  seedsNameLabel: string;
  seedsAge: number;
  seedMature: boolean;
  seedsAgeLabel: string;
  harvestResult: RealValueReturn;
  harvestedSeedId: number;

  temperature: number;
  moisture: number;
  fertility: number;
  pests: number;
  disease: number;
}
