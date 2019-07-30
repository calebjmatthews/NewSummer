import {GROWING_TIME} from '../instances/stats';
import {pixiHandler} from '../instances/pixi/handler';
import {pixiStore} from '../instances/pixi/store';
import {formatDuration} from '../functions/utils';
import {families} from '../instances/families';

export default class Field {
  constructor(id, index, name, temperature, moisture, fertility, pests,
    disease, currentEvent = null, harvestResult = null) {
    this.id = id;
    this.index = index;
    this.name = name;
    this.temperature = temperature;
    this.moisture = moisture;
    this.fertility = fertility;
    this.pests = pests;
    this.disease = disease;
    this.currentEvent = currentEvent;
    this.harvestResult = harvestResult;

    this.seedPlanted = null;
    this.seedsAge = 0;
    this.seedsName = 'Nothing planted';
    this.seedsAgeLabel = '';
    this.seedsGrowthStage = null;
  }
  plantSeed(aSeed) {
    this.seedPlanted = aSeed;
    this.seedsName = this.getSeedsName();
    this.seedsAgeLabel = this.getSeedsAgeLabel();

    this.checkSeedsState();
  }
  ageSeed() {
    if (this.seedPlanted != null
      && this.seedsAge < this.seedPlanted.stats[GROWING_TIME].value) {
      this.seedsAge += 0.25;
      this.seedsAgeLabel = this.getSeedsAgeLabel();
      this.checkSeedsState();
      if (this.seedsAge >= this.seedPlanted.stats[GROWING_TIME].value) {
        this.seedsAge = this.seedPlanted.stats[GROWING_TIME].value;
      }
    }
  }
  seedIsMature() {
    return ((this.seedsAge
      / this.seedPlanted.stats[GROWING_TIME].value) >= 1);
  }
  getSeedsName() {
    if (this.seedPlanted != null) {
      return this.seedPlanted.name;
    }
    else {
      return 'Nothing planted';
    }
  }
  getSeedsAgeLabel() {
    if (this.seedPlanted) {
      let remainingTime = (this.seedPlanted.stats[GROWING_TIME].value
        - this.seedsAge) * 1000;
      return (formatDuration(remainingTime));
    }
    else {
      return '';
    }
  }
  restoreSeedState() {
    if (pixiStore.cardContainer != null) {
      let spriteArray = families.getByProperty('nameScientific',
        this.seedPlanted.familyName).spriteArray;
      let growthStage = getGrowthStage(this.seedsAge,
        this.seedPlanted.stats[GROWING_TIME].value, spriteArray.durations);
      pixiHandler.setPlantAppearance(this.index,
        spriteArray.spriteNames[growthStage]);
      this.seedsGrowthStage = growthStage;
      return true;
    }
    else {
      return setTimeout(() => this.restoreSeedState(), 50);
    }
  }
  checkSeedsState() {
    if (this.seedPlanted != null) {
      let spriteArray = families.getByProperty('nameScientific',
        this.seedPlanted.familyName).spriteArray;
      let growthStage = getGrowthStage(this.seedsAge,
        this.seedPlanted.stats[GROWING_TIME].value, spriteArray.durations);
      if (growthStage != this.seedsGrowthStage) {
        pixiHandler.setPlantAppearance(this.index,
          spriteArray.spriteNames[growthStage]);
        this.seedsGrowthStage = growthStage;
      }
    }
    else {
      pixiHandler.setPlantAppearance(this.index, null);
    }
  }

  harvestSeed() {
    this.harvestResult = this.seedPlanted.determineRealValue(
      this.seedPlanted.stats, this.temperature, this.moisture,
      this.fertility, this.pests, this.disease);
    this.seedPlanted = null;
    this.seedsAge = 0;
    this.seedsName = this.getSeedsName();
    this.seedsAgeLabel = '';
    this.seedsGrowthStage = null;
    this.checkSeedsState();
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
