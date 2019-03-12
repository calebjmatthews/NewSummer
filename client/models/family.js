import TraitTotal from './trait_total';
import Gene from './gene';

import {SWEETNESS, STARCH, PROTEIN, BITTERNESS, SOURNESS, SPICINESS, TOXICITY}
  from '../instances/traits';

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
      if (gene.completeDominance == true) {
        if (gene.genotype[0] == true || gene.genotype[1] == true) {
          genotypeCount = 2;
        }
      }
      else {
        if (gene.genotype[0] == true && gene.genotype[1] == false
         || gene.genotype[1] == true && gene.genotype[0] == false) {
          genotypeCount = 1;
        }
        else if (gene.genotype[0] == true && gene.genotype[1] == true) {
          genotypeCount = 2;
        }
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
  // The first cultivar in the list is the default, check all others for a
  //  match, with later matches overwriting those earlier
  determineCultivarNameFromTraits(traits) {
    let cultivars = this.cultivars.getAll();
    let cultivarName = cultivars[0].name;
    cultivars.slice(1, cultivars.length).map((cultivar) => {
      if (cultivar.areTraitsMatch(traits)) {
        cultivarName = cultivar.name;
      }
    })
    return cultivarName;
  }
  determineStatsFromTraitsAndCultivar(traitTotalDict, cultivarName) {
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
    });
    const cultivar = this.cultivars.getByProperty('name', cultivarName);
    if (cultivar.bonus != null) {
      for (let index = 0; index < cultivar.bonus.statNames.length; index++) {
        // Because bonuses are always treated as a dominant trait, express
        //  effect twice by default
        statDict[cultivar.bonus.statNames[index]].value *=
          (1+cultivar.bonus.statModifiers[index]);
        statDict[cultivar.bonus.statNames[index]].value *=
          (1+cultivar.bonus.statModifiers[index]);
      }
    }

    return statDict;
  }
  determineAdjectivesFromStats(stats, cultivarName) {
    let adjectives = [{word: 'Balanced', extent: 0}];

    Object.keys(stats).map((statKey) => {
      const stat = stats[statKey];
      let newStat = null;
      stat.definitions.map((definition) => {
        if (definition.comparitor == 'less than') {
          if (stat.value < definition.values[0]) {
            const extent = calcExtent(stat, definition);
            newStat = {
              word: definition.adjective, extent: extent
            }
          }
        }
        if (definition.comparitor == 'greater than') {
          if (stat.value > definition.values[0]) {
            const extent = calcExtent(stat, definition);
            newStat = {
              word: definition.adjective, extent: extent
            }
          }
        }
      });
      if (newStat != null) {
        adjectives.push(newStat);
      }
    });

    if (adjectives.length > 1) {
      adjectives.splice(0, 1);
    }

    adjectives.sort((a, b) => {
      return b.extent - a.extent;
    });

    return adjectives;
  }
  describeFromTraitsAndStats(traitTotalDict, stats) {
    let descriptions = [];

    Object.keys(stats).map((statKey) => {
      const stat = stats[statKey];
      let newDesc = null;
      stat.definitions.map((definition) => {
        if (definition.comparitor == 'less than') {
          if (stat.value < definition.values[0]) {
            const extent = calcExtent(stat, definition);
            newDesc = {
              title: stat.name,
              description: definition.description,
              iconType: definition.iconType, icon: definition.icon,
              iconStyle: definition.iconStyle, extent: extent
            }
          }
        }
        if (definition.comparitor == 'greater than') {
          if (stat.value > definition.values[0]) {
            const extent = calcExtent(stat, definition);
            newDesc = {
              title: stat.name,
              description: definition.description,
              iconType: definition.iconType, icon: definition.icon,
              iconStyle: definition.iconStyle, extent: extent
            }
          }
        }
      });
      if (newDesc != null) {
        descriptions.push(newDesc);
      }
    });

    descriptions.sort((a, b) => {
      return b.extent - a.extent;
    });

    let flavorTraits = [SWEETNESS, STARCH, PROTEIN, BITTERNESS, SOURNESS,
      SPICINESS, TOXICITY];
    let highFlavor = [];
    let mediumFlavor = [];
    let lowFlavor = [];
    // 0 1,2 3,4 5,6
    flavorTraits.map((traitName) => {
      let frac = (traitTotalDict[traitName].numerator /
        traitTotalDict[traitName].denominator)
      switch (Math.round(frac * 3)) {
        case 3:
          highFlavor.push(traitName);
        case 2:
          mediumFlavor.push(traitName);
        case 1:
          lowFlavor.push(traitName);
      }
    });
    console.log('highFlavor');
    console.log(highFlavor);
    console.log('mediumFlavor');
    console.log(mediumFlavor);
    console.log('lowFlavor');
    console.log(lowFlavor);

    return descriptions;
  }
}

function calcExtent(stat, definition) {
  const defValue = definition.values[0];
  return ((Math.abs(stat.value - defValue)) / defValue)
    + definition.bonus;
}
