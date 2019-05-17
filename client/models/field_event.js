export default class FieldEvent{
  constructor(seeds, text) {
    this.seeds = seeds;
    this.text = text;
    this.gatheredDict = {};
    seeds.map((seed) => {
      this.gatheredDict[seed.id] = false;
    });
  }
  gatherSeed(seed) {
    this.gatheredDict[seed.id] = true;
  }
  eventCompleted() {
    let completed = true;
    this.seeds.map((seed) => {
      if (this.gatheredDict[seed.id] == false) {
        completed = false;
      }
    });
    return completed;
  }
}
