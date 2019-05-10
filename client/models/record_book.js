import Seed from './seed';

export default class RecordBook {
  constructor(familyDict = {}) {
    this.familyDict = {};
    // Each seed is stored in a three layer dictionary, where family is the
    //  outermost, cultivar is the middle, and individual id is the innermost
    Object.keys(familyDict).map((familyName) => {
      let cultivarDict = familyDict[familyName];
      Object.keys(familyDict[familyName]).map((cultivarName) => {
        let seedDict = cultivarDict[cultivarName];
        Object.keys(cultivarDict[cultivarName]).map((seedId) => {
          let seed = seedDict[seedId];
          seedDict[seedId] = new Seed(seed.familyName, seed.cultivarName,
            seed.methodObtained, seed.dateObtained, null, seed.parentIds,
            seed.id, seed.genome);
        });
      });
    });
    this.familyDict = familyDict;
  }

  recordSeed(aSeed) {
    if (this.familyDict[aSeed.familyName] == undefined) {
      this.familyDict[aSeed.familyName] = {};
    }
    let familyDict = this.familyDict[aSeed.familyName];
    if (familyDict[aSeed.cultivarName] == undefined) {
      familyDict[aSeed.cultivarName] = {};
    }
    let cultivarDict = familyDict[aSeed.cultivarName];
    cultivarDict[aSeed.id] = aSeed;
  }

  getCultivarsUnlocked(familyName) {
    let cultivarsUnlocked = [];
    Object.keys(this.familyDict[familyName]).map((cultivarName) => {
      cultivarsUnlocked.push(cultivarName);
    });
    return cultivarsUnlocked;
  }
}
