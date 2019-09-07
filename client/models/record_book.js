import Seed from './seed';

export default class RecordBook {
  constructor(recordBook = null) {
    this.familyDict = {};
    this.lastDatetime = new Date(Date.now()).valueOf();
    if (recordBook != null) {
      let familyDict = recordBook.familyDict;
      // Each seed is stored in a three layer dictionary, where family is the
      //  outermost, cultivar is the middle, and individual id is the innermost
      Object.keys(familyDict).map((familyName) => {
        let cultivarDict = familyDict[familyName];
        Object.keys(familyDict[familyName]).map((cultivarName) => {
          let seedDict = cultivarDict[cultivarName];
          Object.keys(cultivarDict[cultivarName]).map((seedId) => {
            let seed = seedDict[seedId];
            seedDict[seedId] = new Seed(seedId, seed.familyName,
              null, seed.methodObtained, seed.dateObtained, null, seed.parentsIds, seed.genome);
          });
        });
      });
      this.familyDict = familyDict;

      this.lastDatetime = recordBook.lastDatetime;
    }
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
    let familyArray = this.familyDict[familyName];
    if (familyArray != undefined) {
      Object.keys(familyArray).map((cultivarName) => {
        cultivarsUnlocked.push(cultivarName);
      });
    }
    return cultivarsUnlocked;
  }

  refreshDatetime() {
    this.lastDatetime = new Date(Date.now()).valueOf();
  }
}
