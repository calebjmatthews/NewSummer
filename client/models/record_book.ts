import Seed from './seed';

export default class RecordBook implements RecordBookInterface {
  seedMap: Map<number, Seed>;
  lastTime: Date;

  constructor(recordBook: RecordBookInterface = null) {
    if (recordBook != null) {
      Object.assign(this, recordBook);
    }
    else {
      this.seedMap = new Map();
      this.lastTime = new Date(Date.now());
    }
  }

  getSeed(seedId: number) {
    return this.seedMap.get(seedId);
  }

  getCultivarNames() {
    let cultivarNames = [];
    let cultivarNameInArray = {};
    this.seedMap.forEach((seed) => {
      if (cultivarNameInArray[seed.cultivarName] != true) {
        cultivarNames.push(seed.cultivarName);
        cultivarNameInArray[seed.cultivarName] = true;
      }
    });
    return cultivarNames;
  }
}

interface RecordBookInterface {
  seedMap: Map<number, Seed>;
  lastTime: Date;
}
