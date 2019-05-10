export default class AutoIncrement {
  constructor(autoIncrement = {}) {
    Object.keys(autoIncrement).map((fieldName) => {
      let field = autoIncrement[fieldName];
      if (typeof(field) == 'number') {
        this[fieldName] = field;
      }
    });
  }

  set(autoIncrement) {
    Object.keys(autoIncrement).map((fieldName) => {
      let field = autoIncrement[fieldName];
      if (typeof(field) == 'number') {
        this[fieldName] = field;
      }
    });
  }

  genId(fieldName) {
    if (this[fieldName] == undefined) {
      this[fieldName] = 0;
    }
    let newId = this[fieldName];
    this[fieldName]++;
    return newId;
  }
}
