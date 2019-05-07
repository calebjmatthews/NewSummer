import Cultivar from '../models/cultivar';
import Trait from '../models/trait';
import {SEED_COVERING, BRANCHING, STEM_FOCUS, SEED_SIZE, GROWTH_SPEED,
  TOUGHNESS, SEEDS_ON_TOP, SWEETNESS, STARCH, PROTEIN, BITTERNESS, SOURNESS,
  SPICINESS, TOXICITY } from './traits';
import {SEED_QUANTITY, PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE,
  DISEASE_RESISTANCE, STEM_THICKNESS, STEM_HEIGHT, NITROGEN_REQUIREMENT, TEMP_TOLERANCE, MOIS_TOLERANCE} from './stats';

export const GRAIN = 'Grain';
export const grain = new Cultivar(GRAIN, null, null);

export const CANE = 'Cane';
export const cane = new Cultivar(CANE, [
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [0]}
], null)

export const WILD_CANE = 'Wild Cane';
export const wildCane = new Cultivar(WILD_CANE, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [0]},
  {trait: SEED_SIZE, comparitor: 'less than', values: [4]},
  {trait: TEMP_TOLERANCE, comparitor: 'equal to', values: [3]},
  {trait: MOIS_TOLERANCE, comparitor: 'equal to', values: [3]},
  {trait: GROWTH_SPEED, comparitor: 'less than', values: [3]},
  {trait: NITROGEN_REQUIREMENT, comparitor: 'less than', values: [3]},
  {trait: TOUGHNESS, comparitor: 'between', values: [2, 4]},
  {trait: STEM_HEIGHT, comparitor: 'between', values: [2, 4]},
  {trait: SEEDS_ON_TOP, comparitor: 'equal to', values: [1]},
  {trait: SWEETNESS, comparitor: 'less than', values: [1]},
  {trait: STARCH, comparitor: 'less than', values: [1]},
  {trait: PROTEIN, comparitor: 'equal to', values: [0]},
  {trait: BITTERNESS, comparitor: 'less than', values: [3]},
  {trait: SOURNESS, comparitor: 'equal to', values: [0]},
  {trait: SPICINESS, comparitor: 'equal to', values: [0]},
  {trait: STARCH, comparitor: 'equal to', values: [0]},
  {trait: TOXICITY, comparitor: 'equal to', values: [0]}
], new Trait(
  (WILD_CANE + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME],
  [-0.8, -0.7]
));

export const WILD_GRASS = 'Wild Grass';
export const wildGrass = new Cultivar(WILD_GRASS, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'less than', values: [4]},
  {trait: TEMP_TOLERANCE, comparitor: 'equal to', values: [3]},
  {trait: MOIS_TOLERANCE, comparitor: 'equal to', values: [3]},
  {trait: GROWTH_SPEED, comparitor: 'less than', values: [3]},
  {trait: NITROGEN_REQUIREMENT, comparitor: 'less than', values: [3]},
  {trait: TOUGHNESS, comparitor: 'between', values: [2, 4]},
  {trait: STEM_HEIGHT, comparitor: 'between', values: [2, 4]},
  {trait: SEEDS_ON_TOP, comparitor: 'equal to', values: [1]},
  {trait: SWEETNESS, comparitor: 'less than', values: [1]},
  {trait: STARCH, comparitor: 'less than', values: [1]},
  {trait: PROTEIN, comparitor: 'equal to', values: [0]},
  {trait: BITTERNESS, comparitor: 'less than', values: [3]},
  {trait: SOURNESS, comparitor: 'equal to', values: [0]},
  {trait: SPICINESS, comparitor: 'equal to', values: [0]},
  {trait: STARCH, comparitor: 'equal to', values: [0]},
  {trait: TOXICITY, comparitor: 'equal to', values: [0]}
], new Trait(
  (WILD_GRASS + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME],
  [-0.8, -0.7]
));

export const CORN = 'Corn';
export const corn = new Cultivar(CORN, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [0]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'greater than', values: [4]}
], new Trait(
  (CORN + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME, NITROGEN_REQUIREMENT],
  [0.5, -0.1, 0.5]
));
