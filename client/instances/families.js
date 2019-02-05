import Cache from '../models/cache';
import Family from '../models/family';
import Stat from '../models/stat';

import {seedSize, sweetness, chemicalDefense} from './traits';
import {SEED_QUALITY, GROWING_TIME, PEST_RESISTANCE, DISEASE_RESISTANCE}
  from './stats';
import {wildGrass, grain} from './cultivars';

const traitCache = new Cache([seedSize, sweetness, chemicalDefense]);
const statCache = new Cache([
  new Stat(SEED_QUALITY, 100),
  new Stat(GROWING_TIME, 300),
  new Stat(PEST_RESISTANCE, 100),
  new Stat(DISEASE_RESISTANCE, 100)
])

export const POACEAE = 'Poaceae';
class Poaceae extends Family {
  constructor() {
    super(
      POACEAE,
      'Grasses',
      traitCache,
      statCache,
      [grain, wildGrass]
    );
  }
}

const poaceae = new Poaceae();

export const families = new Cache([
  poaceae
]);
