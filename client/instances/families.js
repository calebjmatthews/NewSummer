import Cache from '../models/cache';
import Family from '../models/family';
import TraitTotal from '../models/trait_total';
import Stat from '../models/stat';

import {seedSize} from './traits';
import {SEED_QUALITY, GROWING_TIME} from './stats';
import {wildGrass, GRAIN, grain} from './cultivars';

const traitCache = new Cache([seedSize]);
const statCache = new Cache([
  new Stat(SEED_QUALITY, 50),
  new Stat(GROWING_TIME, 300)
])

export const POACEAE = 'Poaceae';
class Poaceae extends Family {
  constructor() {
    super(
      POACEAE,
      'Grasses',
      traitCache,
      statCache,
      [wildGrass, grain],
      GRAIN
    );
  }
  determineNameFromGenome(genome) {
    const name = 'Wild Wheat';
    return name;
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
}

const poaceae = new Poaceae();

export const families = new Cache([
  poaceae
]);
