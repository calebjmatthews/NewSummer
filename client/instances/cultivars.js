import Cultivar from '../models/cultivar';
import {SEED_SIZE} from './traits';

export const WILD_GRASS = 'Wild Grass';
export const wildGrass = new Cultivar(WILD_GRASS, [
  {trait: SEED_SIZE, comparitor: 'less than', values: [3]}
], null)

export const GRAIN = 'Grain';
export const grain = new Cultivar(GRAIN, null, null);
