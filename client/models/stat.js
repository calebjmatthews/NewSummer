export default class Stat {
  constructor(name, defaultValue, adjectiveDefinitions) {
    this.name = name;
    this.defaultValue = defaultValue;
    this.value = defaultValue;
    this.adjectiveDefinitions = adjectiveDefinitions.slice();
  }
}
