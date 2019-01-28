import {SEED_QUALITY, GROWING_TIME} from '../instances/stats';

export default class Field {
  constructor(fieldId, name) {
    this.fieldId = fieldId;
    this.name = name;
    this.seedPlanted = null;
    this.seedAge = 0;
  }
  plantSeed(aSeed) {
    this.seedPlanted = aSeed;
  }
  ageSeed() {
    if (this.seedPlanted != null) {
      this.seedAge += 0.25;
    }
    if (this.seedAge >= this.seedPlanted.stats[GROWING_TIME].value) {
      this.seedAge = this.seedPlanted.stats[GROWING_TIME].value;
    }
  }
  seedIsMature() {
    return ((this.seedAge
      / this.seedPlanted.stats[GROWING_TIME].value) >= 1);
  }
  getSeedName() {
    if (this.seedPlanted) {
      return 'Name: ' + this.seedPlanted.name;
    }
    else {
      return 'Nothing planted';
    }
  }
  getSeedsAge() {
    if (this.seedPlanted) {
      let age = ((this.seedAge
        / this.seedPlanted.stats[GROWING_TIME].value) * 100).toFixed(2);
      return ('(' + age + '%)');
    }
    else {
      return '';
    }
  }
  getSeedsState() {
    if (this.seedPlanted) {
      let seedsState = '';
      let growthNumber = Math.floor((this.seedAge
        / this.seedPlanted.stats[GROWING_TIME].value)*5);
      switch (growthNumber) {
        case 0:
          seedsState = 'Seed';
          break;
        case 1:
          seedsState = 'Seedling';
          break;
        case 2:
          seedsState = 'Wee Grass';
          break;
        case 3:
          seedsState = 'Knee High';
          break;
        case 4:
          seedsState = 'Proud Grass';
          break;
        case 5:
          seedsState = 'Mature';
          break;
      }
      return 'Age: ' + seedsState;
    }
    else {
      return '';
    }
  }

  harvestSeed() {
    let seedQuality = this.seedPlanted.stats[SEED_QUALITY];
    this.seedPlanted = null;
    return seedQuality;
  }
}
