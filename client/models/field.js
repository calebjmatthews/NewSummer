export default class Field {
  constructor(fieldId, fieldName) {
    this.fieldId = fieldId;
    this.fieldName = fieldName;
    this.seedPlanted = null;
    this.seedAge = 0;
  }
  plantSeed(aSeed) {
    this.seedPlanted = aSeed;
  }
  ageSeed() {
    if (this.seedPlanted != null) {
      this.seedAge++;
    }
  }
}
