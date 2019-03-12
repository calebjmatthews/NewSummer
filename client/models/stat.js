export default class Stat {
  constructor(name, defaultValue, definitions) {
    this.name = name;
    this.defaultValue = defaultValue;
    this.value = defaultValue;
    this.definitions = definitions.slice();
  }
}
