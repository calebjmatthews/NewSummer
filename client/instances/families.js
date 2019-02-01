import Cache from '../models/cache';
import Family from '../models/family';
import Stat from '../models/stat';

import {seedSize} from './traits';
import {SEED_QUALITY, GROWING_TIME} from './stats';
import {wildGrass, grain} from './cultivars';

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
      [grain, wildGrass]
    );
  }
}

const poaceae = new Poaceae();

export const families = new Cache([
  poaceae
]);
