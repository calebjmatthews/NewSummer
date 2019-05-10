import TraitTotal from './trait_total';
import Gene from './gene';

import {SWEETNESS, STARCH, PROTEIN, BITTERNESS, SOURNESS, SPICINESS, TOXICITY}
  from '../instances/traits';
import {PLANT_QUALITY, SEED_QUANTITY} from '../instances/stats';

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
  determineCultivarNameFromGenome(genome) {
    let cultivars = this.cultivars.getAll();
    let cultivarName = cultivars[0].name;
    cultivars.slice(1, cultivars.length).map((cultivar) => {
      if (cultivar.isGenomeMatch(genome)) {
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
  determineIdealValueFromStats(stats) {
    let value = (stats[PLANT_QUALITY].value * stats[SEED_QUANTITY].value);
    return value.toFixed(2);
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
        if (newDesc.description != undefined) {
          descriptions.push(newDesc);
        }
      }
    });

    descriptions.sort((a, b) => {
      return b.extent - a.extent;
    });

    let flavorDescription = getFlavorDescription(traitTotalDict);
    descriptions.push(flavorDescription);

    return descriptions;
  }
}

function getFlavorDescription(traitTotalDict) {
  let flavorDescription = {};
  if (traitTotalDict[TOXICITY].numerator > 0) {
    flavorDescription.icon = 'skull-crossbones';
    flavorDescription.iconStyle = 'negative';
    let frac = (traitTotalDict[TOXICITY].numerator /
      traitTotalDict[TOXICITY].denominator)
    switch (Math.round(frac * 3)) {
      case 3:
        flavorDescription.description = 'Tastes like concentrated death';
        break;
      case 2:
        flavorDescription.description = 'Tastes dangerously poisonous';
        break;
      case 1:
        flavorDescription.description = 'Tastes acrid and foul';
        break;
    }
    return flavorDescription;
  }

  let flavorTraits = [
    {name: SWEETNESS, adjective: 'sweet', icon: 'ice-cream',
      iconType: 'fontawesome', iconStyle: 'positive',},
    {name: STARCH, adjective: 'starchy', icon: 'bread-slice',
      iconType: 'fontawesome', iconStyle: 'positive'},
    {name: PROTEIN, adjective: 'savory', icon: 'carrot',
      iconType: 'fontawesome', iconStyle: 'positive'},
    {name: BITTERNESS, adjective: 'bitter', icon: 'holly-berry',
      iconType: 'fontawesome', iconStyle: 'negative'},
    {name: SOURNESS, adjective: 'sour', icon: 'lemon',
      iconType: 'fontawesome', iconStyle: 'neutral'},
    {name: SPICINESS, adjective: 'spicy', icon: 'fire-alt',
      iconType: 'fontawesome', iconStyle: 'neutral'}];
  let highFlavors = [];
  let mediumFlavors = [];
  let lowFlavors = [];
  let allFlavors = [];
  flavorTraits.map((trait) => {
    if (traitTotalDict[trait.name].numerator > 0) {
      allFlavors.push({
        trait: trait, extent:traitTotalDict[trait.name].numerator
      });
    }
    let frac = (traitTotalDict[trait.name].numerator /
      traitTotalDict[trait.name].denominator);
    switch (Math.round(frac * 3)) {
      case 3:
        highFlavors.push({
          trait: trait, extent:traitTotalDict[trait.name].numerator
        });
        break;
      case 2:
        mediumFlavors.push({
          trait: trait, extent:traitTotalDict[trait.name].numerator
        });
        break;
      case 1:
        lowFlavors.push({
          trait: trait, extent:traitTotalDict[trait.name].numerator
        });
        break;
    }
  });

  function flavorSort(a,b) {
    return b.extent - a.extent;
  }
  highFlavors.sort(flavorSort);
  mediumFlavors.sort(flavorSort);
  lowFlavors.sort(flavorSort);
  let dominantFlavors = calcDominantFlavors(highFlavors, mediumFlavors,
    lowFlavors);
  let positivity = calcPositivity(allFlavors);
  return calcFlavorDescription(dominantFlavors, positivity);

  function calcDominantFlavors(highFlavors, mediumFlavors, lowFlavors) {
    let dominantFlavors = {};
    if (highFlavors.length > 2) {
      return { count: 'many', flavors: highFlavors,
        intensities: ['high'] };
    }
    else if (highFlavors.length == 2) {
      return { count: 'two', flavors: highFlavors,
        intensities: ['high', 'high'] };
    }
    else if (highFlavors.length == 1) {
      dominantFlavors =
        addFlavorIfNotFull(dominantFlavors, highFlavors[0], 'high');
    }
    if (mediumFlavors.length > 2 && dominantFlavors.count == undefined) {
      return { count: 'many', flavors: mediumFlavors,
        intensities: ['medium'] };
    }
    else if (mediumFlavors.length == 2 && dominantFlavors.count == undefined) {
      return { count: 'two', flavors: mediumFlavors,
        intensities: ['medium', 'medium'] };
    }
    else if (mediumFlavors.length > 0) {
      dominantFlavors =
        addFlavorIfNotFull(dominantFlavors, mediumFlavors[0], 'medium');
    }
    if (lowFlavors.length > 2 && dominantFlavors.count == undefined) {
      return { count: 'many', flavors: lowFlavors,
        intensities: ['low'] };
    }
    else if (lowFlavors.length == 2 && dominantFlavors.count == undefined) {
      return { count: 'two', flavors: lowFlavors,
        intensities: ['low', 'low'] };
    }
    else if (lowFlavors.length > 0) {
      dominantFlavors =
        addFlavorIfNotFull(dominantFlavors, lowFlavors[0], 'low');
    }

    return dominantFlavors;

    function addFlavorIfNotFull(dominantFlavors, newFlavor, intensity) {
      if (dominantFlavors.count == undefined) {
        dominantFlavors = { count: 'one', flavors: [newFlavor],
          intensities: [intensity] }
      }
      else if (dominantFlavors.count == 'one') {
        dominantFlavors.count = 'two';
        dominantFlavors.flavors.push(newFlavor);
        dominantFlavors.intensities.push(intensity);
      }
      return dominantFlavors;
    }
  }

  function calcPositivity(intensities) {
    let positivityScore = 0;
    if (intensities.length == 0) { return 0; }
    intensities.map((intensity) => {
      if (intensity.trait.iconStyle == 'positive') {
        positivityScore += intensity.extent;
      }
      if (intensity.trait.iconStyle == 'negative') {
        positivityScore -= intensity.extent;
      }
    });
    return  Math.round(positivityScore / intensities.length);
  }

  function calcFlavorDescription(dominantFlavors, positivity) {
    let flavorDescription = {
      title: 'Flavor', description: 'Tastes bland', iconType: 'fontawesome',
      icon: 'square', iconStyle: 'neutral'
    }
    if (dominantFlavors.count == 'one') {
      if (positivity > 0) {
        flavorDescription.iconStyle = 'positive';
      }
      else if (positivity < 0) {
        flavorDescription.iconStyle = 'negative';
      }
      else {
        flavorDescription.iconStyle = 'neutral';
      }
      let description = '';
      if (dominantFlavors.intensities[0] == 'high') {
        description += 'Intensely ';
      }
      else if (dominantFlavors.intensities[0] == 'medium') {
        description += 'Moderately ';
      }
      else if (dominantFlavors.intensities[0] == 'low') {
        description += 'Slightly ';
      }
      description += dominantFlavors.flavors[0].trait.adjective;
      flavorDescription.description = description;
      flavorDescription.iconType = dominantFlavors.flavors[0].trait.iconType;
      flavorDescription.icon = dominantFlavors.flavors[0].trait.icon;
    }
    else if (dominantFlavors.count == 'two') {
      let description = '';
      if (positivity > 0) {
        flavorDescription.iconStyle = 'positive';
        description += 'A delicious ';
      }
      else if (positivity < 0) {
        flavorDescription.iconStyle = 'negative';
        description += 'An unpleasant ';
      }
      else {
        flavorDescription.iconStyle = 'neutral';
        description += 'A curioius ';
      }
      description += 'blend of ';
      for (let index = 0; index < dominantFlavors.flavors.length; index++) {
        let flavor = dominantFlavors.flavors[index];
        if (dominantFlavors.intensities[index] == 'high') {
          description += 'intensely ';
        }
        else if (dominantFlavors.intensities[index] == 'medium') {
          description += 'moderately ';
        }
        if (dominantFlavors.intensities[index] == 'low') {
          description += 'slightly ';
        }
        description += (flavor.trait.adjective + ' and ');
      }
      description = description.slice(0, -4);
      description += 'flavors';
      flavorDescription.description = description;
      flavorDescription.iconType = 'fontawesome';
      flavorDescription.icon = 'mortar-pestle';
    }
    else if (dominantFlavors.count == 'many') {
      let description = '';
      if (dominantFlavors.intensities[0] == 'high') {
        description += 'An intense ';
      }
      else if (dominantFlavors.intensities[1] == 'medium') {
        dsecription += 'A mild ';
      }
      else if (dominantFlavors.intensities[1] == 'low') {
        dsecription += 'A delicate ';
      }
      if (positivity > 0) {
        flavorDescription.iconStyle = 'positive';
        description += 'and delicious ';
      }
      else if (positivity < 0) {
        flavorDescription.iconStyle = 'negative';
        description += 'and unpleasant ';
      }
      else {
        flavorDescription.iconStyle = 'neutral';
        description += 'and curioius ';
      }
      description += 'blend of many flavors';
      flavorDescription.description = description;
      flavorDescription.iconType = 'fontawesome';
      flavorDescription.icon = 'compress';
    }
    return flavorDescription;
  }
}

function calcExtent(stat, definition) {
  const defValue = definition.values[0];
  return ((Math.abs(stat.value - defValue)) / defValue)
    + definition.bonus;
}
