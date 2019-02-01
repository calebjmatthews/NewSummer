import TraitTotal from '../models/trait_total';

export default class Family {
  constructor(nameScientific, nameCommon, traits, stats, cultivars,
    defaultCultivar) {
    this.nameScientific = nameScientific;
    this.nameCommon = nameCommon;
    this.traits = traits;
    this.stats = stats;
    // Cultivars listed in order of most basal to most cultivated, with the
    //  default listed first
    this.cultivars = cultivars;
  }

  determineTraitsFromGenome(genome) {
    let traitTotalDict = {}
    genome.map((gene) => {
      let genotypeCount = 0;
      if (gene.genotype[0] == true && gene.genotype[1] == false
       || gene.genotype[1] == true && gene.genotype[0] == false) {
        genotypeCount = 1;
      }
      else if (gene.genotype[0] == true && gene.genotype[1] == true) {
        genotypeCount = 2;
      }

      const matchingTrait =
        this.traits.getByProperty('name', gene.traitName);
      if (traitTotalDict[matchingTrait.name] != undefined) {
        traitTotalDict[matchingTrait.name].addGenotypeCount(genotypeCount);
      }
      else {
        traitTotalDict[matchingTrait.name] =
          new TraitTotal(matchingTrait.name, genotypeCount);
      }
    })
    return traitTotalDict;
  }
  determineStatsFromTraits(traitTotalDict) {
    let statDict = {};
    const stats = this.stats.getAll();
    stats.map((stat) => {
      statDict[stat.name] = Object.create(stat);
    })
    const traitNames = Object.keys(traitTotalDict);
    traitNames.map((traitName) => {
      const matchingTrait =
        this.traits.getByProperty('name', traitName);
      const traitTotal = traitTotalDict[traitName].numerator;
      for (let index = 0; index < matchingTrait.statNames.length; index++) {
        for (let iter = 0; iter < traitTotal; iter++) {
          statDict[matchingTrait.statNames[index]].value *=
            (1+matchingTrait.statModifiers[index]);
        }
      }
    })
    return statDict;
  }
  // The first cultivar in the list is the default, check all others for a
  //  match, with later matches overwriting those earlier
  determineCultivarNameFromTraits(traits) {
    let cultivarName = this.cultivars[0].name;
    this.cultivars.slice(1, this.cultivars.length).map((cultivar) => {
      if (cultivar.areTraitsMatch(traits)) {
        cultivarName = cultivar.name;
      }
    })
    return cultivarName;
  }
  determineNameFromTraits(traits, cultivarName) {
    const name = cultivarName;
    return name;
  }
}
