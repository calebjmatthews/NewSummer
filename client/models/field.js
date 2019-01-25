export default class Field {
  constructor(fieldId, fieldName) {
    this.fieldId = 0;
    this.fieldName = 'Stone Row';
    this.cropPlanted = {name: 'Wild Wheat'};
    this.cropAge = 0;
  }
  ageCrop() {
    this.cropAge++;
  }
}
