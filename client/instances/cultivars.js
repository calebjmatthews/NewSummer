import Cultivar from '../models/cultivar';
import {SEED_COVERING, BRANCHING, STEM_FOCUS, SEED_SIZE, SWEETNESS,
  CHEMICAL_DEFENSE} from './traits';

export const GRAIN = 'Grain';
export const grain = new Cultivar(GRAIN, null, 0, null);

export const CANE = 'Cane';
export const cane = new Cultivar(CANE, [
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [0]}
], 0, null)

export const WILD_CANE = 'Wild Cane';
export const wildCane = new Cultivar(WILD_CANE, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [0]},
  {trait: SEED_SIZE, comparitor: 'less than', values: [4]},
  {trait: SWEETNESS, comparitor: 'less than', values: [3]},
  {trait: CHEMICAL_DEFENSE, comparitor: 'less than', values: [3]}
], 2, null);

export const WILD_GRASS = 'Wild Grass';
export const wildGrass = new Cultivar(WILD_GRASS, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'less than', values: [4]},
  {trait: SWEETNESS, comparitor: 'less than', values: [3]},
  {trait: CHEMICAL_DEFENSE, comparitor: 'less than', values: [3]}
], 2, null);

export const CORN = 'Corn';
export const corn = new Cultivar(CORN, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [0]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'greater than', values: [4]}
], 1, null);
