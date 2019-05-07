export default class RecordBook {
  constructor(familyDict = {}) {
    // Each seed is stored in a three layer dictionary, where family is the
    //  outermost, cultivar is the middle, and individual id is the innermost
    this.familyDict = {};
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
}
