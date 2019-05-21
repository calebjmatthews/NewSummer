export default class FieldEvent{
  constructor(seeds, text) {
    this.seeds = seeds;
    this.text = text;
    this.gatheredDict = {};
  }
  setSeedIds(idBatch) {
    this.seeds.map((seed, index) => {
      seed.id = idBatch[index];
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
