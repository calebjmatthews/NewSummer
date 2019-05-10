import Seed from '../models/seed';
import Gene from '../models/gene';

import {POACEAE} from './families';
import {WILD_GRASS} from './cultivars';
import {recordBook} from './record_book';

export const seedDemo1 = new Seed(POACEAE, WILD_GRASS, 'Discovered');
export const seedDemo2 = new Seed(POACEAE, WILD_GRASS, 'Discovered');

recordBook.recordSeed(seedDemo1);
recordBook.recordSeed(seedDemo2);
