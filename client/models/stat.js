export default class Stat {
  constructor(name, defaultValue, adjectiveDefinitions) {
    this.name = name;
    this.defaultValue = defaultValue;
    this.value = defaultValue;
    console.log('adjectiveDefinitions');
    console.log(adjectiveDefinitions);
    this.adjectiveDefinitions = adjectiveDefinitions.slice();
  }
}
