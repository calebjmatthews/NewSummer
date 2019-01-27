import Cache from '../models/cache';
import Family from '../models/family';
import Trait from '../models/trait';

import {WILD_GRASS, wildGrass, GRAIN, grain} from './cultivars';

export const POACEAE = 'Poaceae';
const poaceae = new Family(POACEAE, 'Grasses', [
  new Trait('Seed Size', 3)
], [wildGrass, grain], GRAIN);

export const families = new Cache([
  poaceae
]);
