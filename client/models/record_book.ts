import Seed from './seed/seed';

export default class RecordBook implements RecordBookInterface {
  seedMap: { [id: number] : Seed };
  lastTime: Date;

  constructor(recordBook: RecordBookInterface = null) {
    if (recordBook != null) {
      this.seedMap = {};
      Object.keys(recordBook.seedMap).map((seedId) => {
        this.seedMap[seedId] = new Seed(recordBook.seedMap[seedId]);
      });
      this.lastTime = new Date(recordBook.lastTime);
    }
    else {
      this.seedMap = {};
      this.lastTime = new Date(Date.now());
    }
  }

  getCultivarNames(familyName: string = null) {
    let cultivarNames = [];
    let cultivarNameInArray = {};
    Object.keys(this.seedMap).map((seedId) => {
      let seed = this.seedMap[seedId];
      if (familyName == null || seed.familyName == familyName) {
        if (cultivarNameInArray[seed.cultivarName] != true) {
          cultivarNames.push(seed.cultivarName);
          cultivarNameInArray[seed.cultivarName] = true;
        }
      }
    });
    return cultivarNames;
  }

  recordSeed(seed: Seed) {
    this.seedMap[seed.id] = seed;
  }
}

interface RecordBookInterface {
  seedMap: { [id: number] : Seed };
  lastTime: Date;
}
