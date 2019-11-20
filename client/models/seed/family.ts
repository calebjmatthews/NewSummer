import Trait from './trait';
import TraitTotal from './trait_total';
import Gene from './gene';
import Stat from './stat';
import Cultivar from './cultivar';
import Adjective from './adjective';
import StatDefinition from './stat_definition';
import SeedDescription from './seed_description';
import RealValueReturn from './real_value_return';
import MultiplierDescriptionSet from './multiplier_description_set';
import MultiplierDescription from './multiplier_description';
import { utils } from '../utils';

import { TraitNames } from '../enums/trait_names';
import { StatNames } from '../enums/stat_names';
import { Comparitors } from '../enums/comparitors';

export default class Family implements FamilyInterface {
  nameScientific: string;
  nameCommon: string;
  description: string;
  traitsMap: Map<string, Trait>;
  stats: Stat[];
  cultivars: Cultivar[];

  constructor(family: FamilyInterface) {
    Object.assign(this, family);
  }

  determineTraitsFromGenome(genome: Gene[]): Map<string, TraitTotal> {
    let traitTotalMap: Map<string, TraitTotal> = new Map();
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

      const matchingTrait = this.traitsMap.get(gene.traitName);
      if (traitTotalMap.get(matchingTrait.name) != undefined) {
        traitTotalMap.get(matchingTrait.name).addGenotypeCount(genotypeCount);
      }
      else {
        traitTotalMap.set(matchingTrait.name, new TraitTotal(
          {traitName: matchingTrait.name, numerator: genotypeCount}
        ));
      }
    });
    return traitTotalMap;
  }

  // The first cultivar in the list is the default, check all others for a
  //  match, with later matches overwriting those earlier
  determineCultivarNameFromGenome(genome: Gene[]): string {
    let cultivarName = this.cultivars[0].name;
    this.cultivars.slice(1, this.cultivars.length).map((cultivar) => {
      if (cultivar.isGenomeMatch(genome)) {
        cultivarName = cultivar.name;
      }
    });
    return cultivarName;
  }

  determineStatsFromTraits(traitTotalMap: Map<string, TraitTotal>):
    { [id: string] : Stat } {
    let statMap: { [id: string] : Stat } = {};

    this.stats.map((stat) => {
      statMap[stat.name] = utils.shallowClone(stat);
    })

    for (let traitName of traitTotalMap.keys()) {
      const matchingTrait = this.traitsMap.get(traitName);
      const traitTotal = traitTotalMap.get(traitName).numerator;
      for (let index = 0; index < matchingTrait.statNames.length; index++) {
        for (let iter = 0; iter < traitTotal; iter++) {
          statMap[matchingTrait.statNames[index]].value *=
            (1+matchingTrait.statModifiers[index]);
        }
      }
    }

    return statMap;
  }

  determineAdjectivesFromStats(statMap: { [id: string] : Stat }, cultivarName: string):
    Adjective[] {
    let adjectives: Adjective[] = [new Adjective({word: 'Common', extent: 0})];


    Object.keys(statMap).map((statName) => {
      const stat = statMap[statName];
      let adjective: Adjective = null;
      stat.definitions.map((definition) => {
        if (definition.comparitor == 'less than') {
          if (stat.value < definition.values[0]) {
            const extent = calcExtent(stat, definition);
            adjective = new Adjective({
              word: definition.adjective, extent: extent
            });
          }
        }
        if (definition.comparitor == 'greater than') {
          if (stat.value > definition.values[0]) {
            const extent = calcExtent(stat, definition);
            adjective = new Adjective({
              word: definition.adjective, extent: extent
            });
          }
        }
        if (definition.comparitor == 'between') {
          if (stat.value > definition.values[0]
            && stat.value <= definition.values[1]) {
            const extent = calcBetweenExtent(stat, definition);
            adjective = new Adjective({
              word: definition.adjective, extent: extent
            });
          }
        }
      });
      if (adjective != null) {
        adjectives.push(adjective);
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

  applyCultivarToStats(statMap: { [id: string] : Stat }, cultivarName: string):
    { [id: string] : Stat } {
    let cultivar: Cultivar = null;
    this.cultivars.map((mCultivar) => {
      if (mCultivar.name == cultivarName) {
        cultivar = mCultivar;
      }
    });
    if (cultivar.bonus != null) {
      for (let index = 0; index < cultivar.bonus.statNames.length; index++) {
        // Because bonuses are always treated as a dominant trait, express
        //  effect twice by default
        statMap[cultivar.bonus.statNames[index]].value *=
          (1+cultivar.bonus.statModifiers[index]);
        statMap[cultivar.bonus.statNames[index]].value *=
          (1+cultivar.bonus.statModifiers[index]);
      }
    }

    return statMap;
  }

  determineIdealValueFromStats(statMap: { [id: string] : Stat }): number {
    let value = (statMap[StatNames.PLANT_QUALITY].value *
      statMap[StatNames.SEED_QUANTITY].value);
    return value;
  }

  determineRealValue(statMap: { [id: string] : Stat }, temperature: number,
    moisture: number, fertility: number, pests: number, disease: number):
    RealValueReturn {
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
      //            0    1    2    3    4    5    6
      temperature: [100, 110, 121, 133, 146, 161, 177],
      moisture:    [100, 110, 121, 133, 146, 161, 177],
      fertility:   [ 75,  98, 127, 165, 214, 278, 362],
      pests:       [ 80, 108, 146, 197, 266, 359, 484],
      disease:     [ 80, 108, 146, 197, 266, 359, 484]
    }
    let baseValue = (statMap[StatNames.PLANT_QUALITY].value
      * statMap[StatNames.SEED_QUANTITY].value);
    // Stat categories
    let statCats: StatFactor = new StatFactor();
    statCats.temperature = setCats(statMap[StatNames.TEMP_TOLERANCE].value,
      boundaries.temperature);
    statCats.moisture = setCats(statMap[StatNames.MOIS_TOLERANCE].value,
      boundaries.moisture);
    statCats.fertility = setCats(statMap[StatNames.NITROGEN_REQUIREMENT].value,
      boundaries.fertility);
    statCats.pests = setCats(statMap[StatNames.PEST_RESISTANCE].value,
      boundaries.pests);
    statCats.disease = setCats(statMap[StatNames.DISEASE_RESISTANCE].value,
      boundaries.disease);
    let multipliers: StatFactor = {
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
    let descriptions = describeMultipliers(baseValue, multipliers, statCats);
    let comment = commentOnDescriptions(descriptions);
    return new RealValueReturn({baseValue: baseValue, value: value,
      descriptions: descriptions, comment: comment});

    function setCats(value: number, boundary: number[]): number {
      if (value <= boundary[0]) { return 0; }
      else if (value <= boundary[1]) { return 1; }
      else if (value <= boundary[2]) { return 2; }
      else if (value <= boundary[3]) { return 3; }
      else if (value <= boundary[4]) { return 4; }
      else if (value <= boundary[5]) { return 5; }
      return 6;
    }

    function describeMultipliers(baseValue: number, multipliers: StatFactor,
      statCats: StatFactor): MultiplierDescriptionSet {
      let descriptions: MultiplierDescriptionSet = new MultiplierDescriptionSet();
      let climateProps = ['temperature', 'moisture', 'fertility', 'pests',
        'disease'];
      climateProps.map((prop) => {
        if (multipliers[prop] > 0) {
          descriptions[prop] = {};
          descriptions[prop].sign = 'positive';
          descriptions[prop].value = '+' + (multipliers[prop] * 100) + '%';
          descriptions[prop].result = '+'
            + utils.formatMoney(baseValue * multipliers[prop]);
        }
        else if (multipliers[prop] < 0) {
          descriptions[prop] = {};
          descriptions[prop].sign = 'negative';
          descriptions[prop].value = '' + (multipliers[prop] * 100) + '%';
          descriptions[prop].result = utils.formatMoney(baseValue * multipliers[prop]);
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

    function commentOnDescriptions(descriptions: MultiplierDescriptionSet): string {
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

  describeFromTraitsAndStats(traitTotalMap: Map<string, TraitTotal>,
    statMap: { [id: string] : Stat }): SeedDescription[] {
    let descriptions = [];

    Object.keys(statMap).map((statName) => {
      const stat = statMap[statName];
      let newDesc = null;
      stat.definitions.map((definition) => {
        let match = false;
        if (definition.comparitor == Comparitors.LESS_THAN) {
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
        if (definition.comparitor == Comparitors.GREATER_THAN) {
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
        if (definition.comparitor == Comparitors.BETWEEN) {
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

    let flavorDescription = getFlavorDescription(traitTotalMap);
    descriptions.push(flavorDescription);

    return descriptions;
  }
}

function getFlavorDescription(traitTotalMap: Map<string, TraitTotal>):
  SeedDescription {
  let flavorDescription: SeedDescription = new SeedDescription(null);
  if (traitTotalMap.get(TraitNames.TOXICITY).numerator > 0) {
    flavorDescription.title = 'Flavor';
    flavorDescription.icon = 'skull-crossbones';
    flavorDescription.iconStyle = 'negative';
    let frac = (traitTotalMap.get(TraitNames.TOXICITY).numerator /
      traitTotalMap.get(TraitNames.TOXICITY).denominator)
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

  let flavorTraits: FlavorTrait[] = [
    new FlavorTrait({name: TraitNames.SWEETNESS, adjective: 'sweet', icon: 'ice-cream',
      iconType: 'fontawesome', iconStyle: 'positive',}),
    new FlavorTrait({name: TraitNames.STARCH, adjective: 'starchy', icon: 'bread-slice',
      iconType: 'fontawesome', iconStyle: 'positive'}),
    new FlavorTrait({name: TraitNames.PROTEIN, adjective: 'savory', icon: 'carrot',
      iconType: 'fontawesome', iconStyle: 'positive'}),
    new FlavorTrait({name: TraitNames.BITTERNESS, adjective: 'bitter',
      icon: 'holly-berry', iconType: 'fontawesome', iconStyle: 'negative'}),
    new FlavorTrait({name: TraitNames.SOURNESS, adjective: 'sour', icon: 'lemon',
      iconType: 'fontawesome', iconStyle: 'neutral'}),
    new FlavorTrait({name: TraitNames.SPICINESS, adjective: 'spicy', icon: 'fire-alt',
      iconType: 'fontawesome', iconStyle: 'neutral'})];
  let highFlavors: TraitExtent[] = [];
  let mediumFlavors: TraitExtent[] = [];
  let lowFlavors: TraitExtent[] = [];
  let allFlavors: TraitExtent[] = [];
  flavorTraits.map((trait) => {
    if (traitTotalMap.get(trait.name).numerator > 0) {
      allFlavors.push(new TraitExtent({
        trait: trait, extent: traitTotalMap.get(trait.name).numerator
      }));
    }
    let frac = (traitTotalMap.get(trait.name).numerator /
      traitTotalMap.get(trait.name).denominator);
    switch (Math.round(frac * 3)) {
      case 3:
        highFlavors.push(new TraitExtent({
          trait: trait, extent: traitTotalMap.get(trait.name).numerator
        }));
        break;
      case 2:
        mediumFlavors.push(new TraitExtent({
          trait: trait, extent: traitTotalMap.get(trait.name).numerator
        }));
        break;
      case 1:
        lowFlavors.push(new TraitExtent({
          trait: trait, extent: traitTotalMap.get(trait.name).numerator
        }));
        break;
    }
  });

  function flavorSort(a: TraitExtent, b: TraitExtent) {
    return b.extent - a.extent;
  }
  highFlavors.sort(flavorSort);
  mediumFlavors.sort(flavorSort);
  lowFlavors.sort(flavorSort);
  let dominantFlavors = calcDominantFlavors(highFlavors, mediumFlavors,
    lowFlavors);
  let positivity = calcPositivity(allFlavors);
  return calcFlavorDescription(dominantFlavors, positivity);

  function calcDominantFlavors(highFlavors: TraitExtent[],
    mediumFlavors: TraitExtent[], lowFlavors: TraitExtent[]): DominantFlavors {
    let dominantFlavors: DominantFlavors = new DominantFlavors();
    if (highFlavors.length > 2) {
      return new DominantFlavors({ count: 'many', flavors: highFlavors,
        intensities: ['high'] });
    }
    else if (highFlavors.length == 2) {
      return new DominantFlavors({ count: 'two', flavors: highFlavors,
        intensities: ['high', 'high'] });
    }
    else if (highFlavors.length == 1) {
      dominantFlavors =
        addFlavorIfNotFull(dominantFlavors, highFlavors[0], 'high');
    }
    if (mediumFlavors.length > 2 && dominantFlavors.count == undefined) {
      return new DominantFlavors({ count: 'many', flavors: mediumFlavors,
        intensities: ['medium'] });
    }
    else if (mediumFlavors.length == 2 && dominantFlavors.count == undefined) {
      return new DominantFlavors({ count: 'two', flavors: mediumFlavors,
        intensities: ['medium', 'medium'] });
    }
    else if (mediumFlavors.length > 0) {
      dominantFlavors =
        addFlavorIfNotFull(dominantFlavors, mediumFlavors[0], 'medium');
    }
    if (lowFlavors.length > 2 && dominantFlavors.count == undefined) {
      return new DominantFlavors({ count: 'many', flavors: lowFlavors,
        intensities: ['low'] });
    }
    else if (lowFlavors.length == 2 && dominantFlavors.count == undefined) {
      return new DominantFlavors({ count: 'two', flavors: lowFlavors,
        intensities: ['low', 'low'] });
    }
    else if (lowFlavors.length > 0) {
      dominantFlavors =
        addFlavorIfNotFull(dominantFlavors, lowFlavors[0], 'low');
    }

    return dominantFlavors;

    function addFlavorIfNotFull(dominantFlavors: DominantFlavors,
      newFlavor: TraitExtent, intensity: string) {
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

  function calcPositivity(traitExtents: TraitExtent[]): number {
    let positivityScore = 0;
    if (traitExtents.length == 0) { return 0; }
    traitExtents.map((intensity) => {
      if (intensity.trait.iconStyle == 'positive') {
        positivityScore += intensity.extent;
      }
      if (intensity.trait.iconStyle == 'negative') {
        positivityScore -= intensity.extent;
      }
    });
    return  Math.round(positivityScore / traitExtents.length);
  }

  function calcFlavorDescription(dominantFlavors: DominantFlavors,
    positivity: number): SeedDescription {
    let flavorDescription: SeedDescription = new SeedDescription({
      title: 'Flavor', description: 'Tastes bland', iconType: 'fontawesome',
      icon: 'square', iconStyle: 'neutral', extent: 0
    });
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

function calcExtent(stat: Stat, definition: StatDefinition): number {
  const defValue = definition.values[0];
  return ((Math.abs(stat.value - defValue)) / defValue)
    + definition.bonus;
}

// 100 - 200, stat value is 120; 120 - 100 / 100 = .2; 120 - 200 / 200 = .8
// 1 / .2 * 1 / .8 = 5 * 1.25 = 6.25; 1 / 6.25 = .16 * 2 = .32
// 1 / .5 * 1 / .5 = 2 * 2 = 4; 1 / 4 = .25 * 2 = .5
// Designed so that in "between" comparitor conditions, stat values that are
//  in the middle produce a higher resulting extent
function calcBetweenExtent(stat: Stat, definition: StatDefinition) {
  const defValues = definition.values;
  let basicExtentMin = ((Math.abs(stat.value - defValues[0])) / defValues[0]);
  let basicExtentMax = ((Math.abs(stat.value - defValues[1])) / defValues[1]);
  return (1 / ((1 / basicExtentMax) * (1 / basicExtentMin))) * 2;
}

interface FamilyInterface {
  nameScientific: string;
  nameCommon: string;
  description: string;
  traitsMap: Map<string, Trait>;
  stats: Stat[];
  cultivars: Cultivar[];
}

class StatFactor {
  temperature: number;
  moisture: number;
  fertility: number;
  pests: number;
  disease: number;
}

class FlavorTrait {
  name: string;
  adjective: string;
  icon: string;
  iconType: string;
  iconStyle: string;

  constructor(flavorTrait: FlavorTrait) {
    Object.assign(this, flavorTrait);
  }
}

class TraitExtent {
  trait: FlavorTrait;
  extent: number;

  constructor(traitExtent: TraitExtent) {
    Object.assign(this, traitExtent);
  }
}

class DominantFlavors {
  count: string;
  flavors: TraitExtent[];
  intensities: string[];

  constructor(dominantFlavors: DominantFlavors = null) {
    Object.assign(this, dominantFlavors);
  }
}
