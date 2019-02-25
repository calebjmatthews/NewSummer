import {SEED_QUALITY, GROWING_TIME} from '../instances/stats';

export default class Field {
  constructor(id, index, name) {
    this.id = id;
    this.index = index;
    this.name = name;
    this.seedPlanted = null;
    this.seedsAge = 0;
    this.seedsName = 'Nothing planted';
    this.seedsAgeLabel = '';
    this.seedsState = '';
  }
  plantSeed(aSeed) {
    this.seedPlanted = aSeed;
    this.seedsName = this.getSeedsName();
    this.seedsAgeLabel = this.getSeedsAgeLabel();
    this.seedsState = this.getSeedsState();
  }
  ageSeed() {
    if (this.seedPlanted != null
      && this.seedsAge < this.seedPlanted.stats[GROWING_TIME].value) {
      this.seedsAge += 0.25;
      this.seedsAgeLabel = this.getSeedsAgeLabel();
      this.seedsState = this.getSeedsState();
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
    if (this.seedPlanted) {
      return 'Name: ' + this.seedPlanted.name;
    }
    else {
      return 'Nothing planted';
    }
  }
  getSeedsAgeLabel() {
    if (this.seedPlanted) {
      let age = parseFloat((this.seedsAge
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
      let growthNumber = Math.floor((this.seedsAge
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
    let seedQuality = this.seedPlanted.stats[SEED_QUALITY].value;
    this.seedPlanted = null;
    this.seedsAge = 0;
    this.seedsName = this.getSeedsName();
    this.seedsState = this.getSeedsState();
    return seedQuality;
  }
}
