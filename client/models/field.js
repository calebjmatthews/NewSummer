export default class Field {
  constructor(fieldId, name) {
    this.fieldId = fieldId;
    this.name = name;
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
