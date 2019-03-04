import Cultivar from '../models/cultivar';
import Trait from '../models/trait';
import {SEED_COVERING, BRANCHING, STEM_FOCUS, SEED_SIZE, SWEETNESS,
  CHEMICAL_DEFENSE} from './traits';
import {SEED_QUANTITY, PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE,
  DISEASE_RESISTANCE, NITROGEN_REQUIREMENT, STEM_THICKNESS}
  from './stats';

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
], 2, new Trait(
  (WILD_CANE + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME],
  [-0.95, -0.9]
));

export const WILD_GRASS = 'Wild Grass';
export const wildGrass = new Cultivar(WILD_GRASS, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'less than', values: [4]},
  {trait: SWEETNESS, comparitor: 'less than', values: [3]},
  {trait: CHEMICAL_DEFENSE, comparitor: 'less than', values: [3]}
], 2, new Trait(
  (WILD_GRASS + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME],
  [-0.95, -0.9]
));

export const CORN = 'Corn';
export const corn = new Cultivar(CORN, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [0]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'greater than', values: [4]}
], 1, new Trait(
  (CORN + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME, NITROGEN_REQUIREMENT],
  [0.5, -0.25, 0.5]
));
