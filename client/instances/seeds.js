import Seed from '../models/seed';
import Gene from '../models/gene';

import {POACEAE} from './families';
import {WILD_GRASS} from './cultivars';

export const seedDemo1 = new Seed(POACEAE, WILD_GRASS);

export const seedDemo2 = new Seed(POACEAE, WILD_GRASS);
