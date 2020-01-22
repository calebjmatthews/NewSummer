import Seed from './seed/seed';
import { utils } from './utils';
import { TravelerRoles } from './enums/traveler_roles';

export default class RecordBook implements RecordBookInterface {
  seedMap: { [id: number] : Seed };
  dialogueHistories: {[travelerRole: string]: {[id: number]: number}};
  requestHistories: {[travelerRole: string]: {[id: number]: number}};
  lastTime: Date;

  constructor(recordBook: RecordBookInterface = null) {
    if (recordBook != null) {
      this.seedMap = {};
      Object.keys(recordBook.seedMap).map((seedId) => {
        this.seedMap[seedId] = new Seed(recordBook.seedMap[seedId]);
      });
      this.dialogueHistories = recordBook.dialogueHistories;
      this.requestHistories = recordBook.requestHistories;
      this.lastTime = new Date(recordBook.lastTime);
    }
    else {
      this.seedMap = {};
      this.dialogueHistories = {};
      this.lastTime = new Date(Date.now());
    }
    this.dialogueHistories = this.initDialogueHistories(this.dialogueHistories);
  }

  initDialogueHistories(dialogueHistories: {[travelerRole: string]:
    {[id: number]: number}}): {[travelerRole: string]: {[id: number]: number}} {
    Object.keys(TravelerRoles).map((key) => {
      let travelerRole = TravelerRoles[key];
      if (dialogueHistories[travelerRole] == undefined) {
        dialogueHistories[travelerRole] = {};
      }
    });
    return dialogueHistories;
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
    let seedNew = this.isSeedNew(seed);

    let numeralRes = this.getSeedNumeral(seed);
    seed.numeral = numeralRes.numeral;
    seed.name = seed.adjectives[0].word + ' ' + seed.cultivarName
      + (seed.numeral.length > 0 ? (' ' + seed.numeral) : '');
    this.seedMap[seed.id] = seed;

    if (numeralRes.alsoChangedId != null) {
      let alsoChanged = this.seedMap[numeralRes.alsoChangedId];
      alsoChanged.numeral = 'I';
      alsoChanged.name += ' I';
      this.seedMap[alsoChanged.id] = alsoChanged;
    }

    return seedNew
  }

  isSeedNew(seed: Seed) {
    let familyNew: any = true;
    let cultivarNew: any = true;
    Object.keys(this.seedMap).map((seedId) => {
      let mSeed = this.seedMap[seedId];
      if (seed.familyName == mSeed.familyName) {
        familyNew = false;
      }
      if (seed.cultivarName == mSeed.cultivarName) {
        cultivarNew = false;
      }
    });
    return {familyNew: familyNew, cultivarNew: cultivarNew};
  }

  getSeedNumeral(seed: Seed) {
    let numeral = '';

    const nameBase = seed.adjectives[0].word + seed.cultivarName;
    let highest = null;
    let alsoChangedId = null;
    Object.keys(this.seedMap).map((seedId) => {
      let mSeed = this.seedMap[seedId];
      if (nameBase == mSeed.adjectives[0].word + mSeed.cultivarName) {
        const romanConverted = utils.romanToNumber(mSeed.numeral);
        if (romanConverted > highest) {
          highest = romanConverted;
        }
        // If the matching name currently has a numeral of '' this represents 1, as
        //  the seed is the first of its name
        if (romanConverted == 0) {
          alsoChangedId = seedId;
          highest = 1;
        }
      }
    });
    if (highest != null) {
      numeral = utils.numberToRoman(highest + 1);
    }

    return {numeral: numeral, alsoChangedId: alsoChangedId};
  }

  getDialogueCount(travelerRole: string, dialogueId: number) {
    return this.dialogueHistories[travelerRole][dialogueId];
  }

  recordInDialogueHistory(travelerRole: string, dialogueId: number) {
    if (this.dialogueHistories[travelerRole][dialogueId] == undefined) {
      this.dialogueHistories[travelerRole][dialogueId] = 0;
    }
    this.dialogueHistories[travelerRole][dialogueId]++;
    return this.dialogueHistories[travelerRole][dialogueId]++;
  }
}

interface RecordBookInterface {
  seedMap: { [id: number] : Seed };
  dialogueHistories: {[travelerRole: string]: {[id: number]: number}};
  requestHistories: {[travelerRole: string]: {[id: number]: number}};
  lastTime: Date;
}
