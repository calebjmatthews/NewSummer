import Seed from '../models/seed';
import Gene from '../models/gene';

import {POACEAE} from './families';
import {WILD_GRASS} from './cultivars';

export const seedDemo1 = new Seed(POACEAE, WILD_GRASS, 'Discovered');
console.log('seedDemo1');
console.log(seedDemo1);

export const seedDemo2 = new Seed(POACEAE, WILD_GRASS, 'Discovered');
console.log('seedDemo2');
console.log(seedDemo2);
