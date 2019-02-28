import Seed from '../models/seed';
import Gene from '../models/gene';

import {POACEAE} from './families';
import {SEED_SIZE, seedSize, SWEETNESS, sweetness, CHEMICAL_DEFENSE,
  chemicalDefense} from './traits';
import {WILD_GRASS, GRAIN} from './cultivars';

export const seedDemo1 = new Seed(POACEAE, WILD_GRASS);

export const seedDemo2 = new Seed(POACEAE, GRAIN);
