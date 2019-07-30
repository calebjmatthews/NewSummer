import TraitTotal from './trait_total';
import Gene from './gene';
import { formatMoney } from '../functions/utils';

import {SWEETNESS, STARCH, PROTEIN, BITTERNESS, SOURNESS, SPICINESS, TOXICITY}
  from '../instances/traits';
import {PLANT_QUALITY, SEED_QUANTITY, TEMP_TOLERANCE, MOIS_TOLERANCE,
  NITROGEN_REQUIREMENT, PEST_RESISTANCE, DISEASE_RESISTANCE}
  from '../instances/stats';

export default class Family {
  constructor(nameScientific, nameCommon, traits, stats, cultivars,
    spriteArray) {
    this.nameScientific = nameScientific;
    this.nameCommon = nameCommon;
    this.traits = traits;
    this.stats = stats;
    // Cultivars listed in order of most basal to most cultivated, with the
    //  default listed first
    this.cultivars = cultivars;
    this.spriteArray = spriteArray;
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
    });

    return statDict;
  }
  determineAdjectivesFromStats(stats, cultivarName) {
    let adjectives = [{word: 'Common', extent: 0}];

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
        if (definition.comparitor == 'between') {
          if (stat.value > definition.values[0]
            && stat.value <= definition.values[1]) {
            const extent = calcBetweenExtent(stat, definition);
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
  applyCultivarToStats(stats, cultivarName) {
    const cultivar = this.cultivars.getByProperty('name', cultivarName);
    if (cultivar.bonus != null) {
      for (let index = 0; index < cultivar.bonus.statNames.length; index++) {
        // Because bonuses are always treated as a dominant trait, express
        //  effect twice by default
        stats[cultivar.bonus.statNames[index]].value *=
          (1+cultivar.bonus.statModifiers[index]);
        stats[cultivar.bonus.statNames[index]].value *=
          (1+cultivar.bonus.statModifiers[index]);
      }
    }

    return stats;
  }
  determineIdealValueFromStats(stats) {
    let value = (stats[PLANT_QUALITY].value * stats[SEED_QUANTITY].value);
    return value;
  }
  determineRealValue(stats, temperature, moisture, fertility, pests,
    disease) {
    // Rows are the climate conditions of the field,
    //  columns are the plant's stat fit into a category
    const suitabilityMoisTemp = {
      0: [ 0.00,-0.10,-0.25,-0.50,-0.25,-0.50,-0.90],
      1: [ 0.10, 0.00,-0.10,-0.25,-0.10,-0.25,-0.50],
      2: [ 0.00, 0.00, 0.00,-0.10, 0.00,-0.10,-0.25],
      3: [-0.10, 0.00, 0.00, 0.25, 0.00, 0.00,-0.10],
      4: [-0.25,-0.10, 0.00,-0.10, 0.00, 0.00, 0.00],
      5: [-0.50,-0.25,-0.10,-0.25,-0.10, 0.00, 0.10],
      6: [-0.90,-0.50,-0.25,-0.50,-0.25,-0.10, 0.00]
    }
    const suitabilityFert = {
      0: [ 0.00, 0.00,-0.10,-0.25,-0.50,-0.75,-0.90],
      1: [ 0.00, 0.00, 0.00, 0.00,-0.10,-0.25,-0.50],
      2: [ 0.00, 0.00, 0.00, 0.00, 0.00, 0.00,-0.10],
      3: [ 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
      4: [ 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
      5: [-0.05, 0.00, 0.00, 0.00, 0.00, 0.00, 0.05],
      6: [-0.10,-0.05, 0.00, 0.00, 0.00, 0.05, 0.10]
    }
    const suitabilityPestDise = {
      0: [ 0.00, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
    	1: [-0.05, 0.00, 0.00, 0.00, 0.00, 0.00, 0.00],
    	2: [-0.10,-0.05, 0.00, 0.00, 0.00, 0.00, 0.00],
    	3: [-0.15,-0.10,-0.05, 0.00, 0.00, 0.00, 0.00],
    	4: [-0.25,-0.15,-0.10,-0.05, 0.00, 0.00, 0.00],
    	5: [-0.75,-0.50,-0.35,-0.20,-0.10, 0.00, 0.00],
    	6: [-0.90,-0.75,-0.50,-0.35,-0.20,-0.10, 0.00]
    }
    const boundaries = {
      //          0    1    2    3    4    5    6
      temperature: [100, 110, 121, 133, 146, 161, 177],
      moisture:    [100, 110, 121, 133, 146, 161, 177],
      fertility:   [ 75,  98, 127, 165, 214, 278, 362],
      pests:       [ 80, 108, 146, 197, 266, 359, 484],
      disease:     [ 80, 108, 146, 197, 266, 359, 484]
    }
    let baseValue = (stats[PLANT_QUALITY].value * stats[SEED_QUANTITY].value);
    // Stat categories
    let statCats = {};
    statCats.temperature = setCats(stats[TEMP_TOLERANCE].value,
      boundaries.temperature);
    statCats.moisture = setCats(stats[MOIS_TOLERANCE].value,
      boundaries.moisture);
    statCats.fertility = setCats(stats[NITROGEN_REQUIREMENT].value,
      boundaries.fertility);
    statCats.pests = setCats(stats[PEST_RESISTANCE].value,
      boundaries.pests);
    statCats.disease = setCats(stats[DISEASE_RESISTANCE].value,
      boundaries.disease);
    let multipliers = {
      temperature: suitabilityMoisTemp[temperature][statCats.temperature],
      moisture: suitabilityMoisTemp[moisture][statCats.moisture],
      fertility: suitabilityFert[fertility][statCats.fertility],
      pests: suitabilityPestDise[pests][statCats.pests],
      disease: suitabilityPestDise[disease][statCats.disease]
    }
    let value = baseValue;
    value += baseValue * multipliers.temperature;
    value +=  baseValue * multipliers.moisture;
    value +=  baseValue * multipliers.fertility;
    value +=  baseValue * multipliers.pests;
    value +=  baseValue * multipliers.disease;
    let descriptions = describeMultipliers(baseValue, multipliers, statCats,
      temperature, moisture, fertility);
    let comment = commentOnDescriptions(descriptions);
    return {baseValue: baseValue, value: value, descriptions: descriptions,
      comment: comment};

    function setCats(value, boundary) {
      if (value <= boundary[0]) { return 0; }
      else if (value <= boundary[1]) { return 1; }
      else if (value <= boundary[2]) { return 2; }
      else if (value <= boundary[3]) { return 3; }
      else if (value <= boundary[4]) { return 4; }
      else if (value <= boundary[5]) { return 5; }
      return 6;
    }

    function describeMultipliers(baseValue, multipliers, statCats, temperature, moisture,
      fertility) {
      let descriptions = {};
      let climateProps = ['temperature', 'moisture', 'fertility', 'pests',
        'disease'];
      climateProps.map((prop) => {
        if (multipliers[prop] > 0) {
          descriptions[prop] = {};
          descriptions[prop].sign = 'positive';
          descriptions[prop].value = '+' + (multipliers[prop] * 100) + '%';
          descriptions[prop].result = '+'
            + formatMoney(baseValue * multipliers[prop]);
        }
        else if (multipliers[prop] < 0) {
          descriptions[prop] = {};
          descriptions[prop].sign = 'negative';
          descriptions[prop].value = '' + (multipliers[prop] * 100) + '%';
          descriptions[prop].result =
            formatMoney(baseValue * multipliers[prop]);
        }
      });

      if (multipliers.temperature < 0 && (statCats.temperature < 3
        || (statCats.temperature == 3 && temperature > 3))) {
        descriptions.temperature.message = 'Too hot';
      }
      else if (multipliers.temperature < 0 && (statCats.temperature > 3
        || (statCats.temperature == 3 && temperature < 3))) {
        descriptions.temperature.message = 'Too cold';
      }
      else if (multipliers.temperature > 0) {
        descriptions.temperature.message = 'The temperature is perfect';
      }

      if (multipliers.moisture < 0 && (statCats.moisture < 3
        || (statCats.moisture == 3 && moisture > 3))) {
        descriptions.moisture.message = 'Too wet';
      }
      else if (multipliers.moisture < 0 && (statCats.moisture > 3
        || (statCats.moisture == 3 && moisture < 3))) {
        descriptions.moisture.message = 'Too dry';
      }
      else if (multipliers.moisture > 0) {
        descriptions.moisture.message = 'The moisture is perfect';
      }

      if (multipliers.fertility < 0 && (statCats.fertility < 3
        || (statCats.fertility == 3 && fertility > 3))) {
        descriptions.fertility.message = 'The soil is too rich';
      }
      else if (multipliers.fertility < 0 && (statCats.fertility > 3
        || (statCats.fertility == 3 && fertility < 3))) {
        descriptions.fertility.message = 'The soil isn\'t fertile enough';
      }
      else if (multipliers.fertility > 0) {
        descriptions.fertility.message = 'The soil fertility is perfect';
      }

      if (multipliers.pests < 0) {
        descriptions.pests.message = 'Too many pests';
      }

      if (multipliers.disease < 0) {
        descriptions.disease.message = 'Too much disease';
      }

      return descriptions;
    }
    function commentOnDescriptions(descriptions) {
      if (Object.keys(descriptions).length == 0) {
        return 'Perfect!';
      }
      let allPositive = true;
      Object.keys(descriptions).map((prop) => {
        if (descriptions[prop].sign == 'negative') {
          allPositive = false;
        }
      });
      if (allPositive == true) {
        return 'Superb!!!';
      }
      return null;
    }
  }
  describeFromTraitsAndStats(traitTotalDict, stats) {
    let descriptions = [];

    Object.keys(stats).map((statKey) => {
      const stat = stats[statKey];
      let newDesc = null;
      stat.definitions.map((definition) => {
        let match = false;
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
        if (definition.comparitor == 'between') {
          if (stat.value > definition.values[0]
            && stat.value <= definition.values[1]) {
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
    flavorDescription.title = 'Flavor';
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
      else if (dominantFlavors.intensities[0] == 'medium') {
        description += 'A mild ';
      }
      else if (dominantFlavors.intensities[0] == 'low') {
        description += 'A delicate ';
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

// 100 - 200, stat value is 120; 120 - 100 / 100 = .2; 120 - 200 / 200 = .8
// 1 / .2 * 1 / .8 = 5 * 1.25 = 6.25; 1 / 6.25 = .16 * 2 = .32
// 1 / .5 * 1 / .5 = 2 * 2 = 4; 1 / 4 = .25 * 2 = .5
// Designed so that in "between" comparitor conditions, stat values that are
//  in the middle result in a higher resulting extent
function calcBetweenExtent(stat, definition) {
  const defValues = definition.values;
  let basicExtentMin = ((Math.abs(stat.value - defValues[0])) / defValues[0]);
  let basicExtentMax = ((Math.abs(stat.value - defValues[1])) / defValues[1]);
  return (1 / ((1 / basicExtentMax) * (1 / basicExtentMin))) * 2;
}
