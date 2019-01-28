export default class Family {
  constructor(nameScientific, nameCommon, traits, stats, cultivars,
    defaultCultivar) {
    this.nameScientific = nameScientific;
    this.nameCommon = nameCommon;
    this.traits = traits;
    this.stats = stats;
    this.cultivars = cultivars;
    this.defaultCultivar = defaultCultivar;
  }
}
