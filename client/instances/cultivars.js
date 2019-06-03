import Cultivar from '../models/cultivar';
import Trait from '../models/trait';
import {SEED_COVERING, BRANCHING, STEM_FOCUS, SEED_SIZE, GROWTH_SPEED,
  TOUGHNESS, SEEDS_ON_TOP, SWEETNESS, STARCH, PROTEIN, BITTERNESS, SOURNESS,
  SPICINESS, TOXICITY } from './traits';
import {SEED_QUANTITY, PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE,
  DISEASE_RESISTANCE, STEM_THICKNESS, STEM_HEIGHT, NITROGEN_REQUIREMENT, TEMP_TOLERANCE, MOIS_TOLERANCE} from './stats';

export const GRAIN = 'Grain';
export const grain = new Cultivar(GRAIN, null, null, [
  {trait: SEED_COVERING, comparitor: 'greater than', values: [0]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'less than', values: [4]},
  {trait: TEMP_TOLERANCE, comparitor: 'between', values: [1, 3]},
  {trait: MOIS_TOLERANCE, comparitor: 'between', values: [1, 3]},
  {trait: GROWTH_SPEED, comparitor: 'less than', values: [3]},
  {trait: SEEDS_ON_TOP, comparitor: 'equal to', values: [1]},
  {trait: SWEETNESS, comparitor: 'less than', values: [3]},
  {trait: STARCH, comparitor: 'less than', values: [3]},
  {trait: PROTEIN, comparitor: 'equal to', values: [0]},
  {trait: BITTERNESS, comparitor: 'less than', values: [4]},
  {trait: SOURNESS, comparitor: 'equal to', values: [0]},
  {trait: SPICINESS, comparitor: 'equal to', values: [0]},
  {trait: TOXICITY, comparitor: 'equal to', values: [0]}
]);

export const CANE = 'Cane';
export const cane = new Cultivar(CANE, [
  {trait: SEED_COVERING, comparitor: 'greater than', values: [0]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [0]},
  {trait: SEED_SIZE, comparitor: 'less than', values: [4]},
  {trait: TEMP_TOLERANCE, comparitor: 'between', values: [1, 3]},
  {trait: MOIS_TOLERANCE, comparitor: 'between', values: [1, 3]},
  {trait: GROWTH_SPEED, comparitor: 'less than', values: [3]},
  {trait: SEEDS_ON_TOP, comparitor: 'equal to', values: [1]},
  {trait: SWEETNESS, comparitor: 'less than', values: [3]},
  {trait: STARCH, comparitor: 'less than', values: [3]},
  {trait: PROTEIN, comparitor: 'equal to', values: [0]},
  {trait: BITTERNESS, comparitor: 'less than', values: [4]},
  {trait: SOURNESS, comparitor: 'equal to', values: [0]},
  {trait: SPICINESS, comparitor: 'equal to', values: [0]},
  {trait: TOXICITY, comparitor: 'equal to', values: [0]}
], null)

export const WILD_CANE = 'Wild Cane';
export const wildCane = new Cultivar(WILD_CANE, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [0]},
  {trait: SEED_SIZE, comparitor: 'less than', values: [4]},
  {trait: TEMP_TOLERANCE, comparitor: 'equal to', values: [2]},
  {trait: MOIS_TOLERANCE, comparitor: 'equal to', values: [2]},
  {trait: GROWTH_SPEED, comparitor: 'less than', values: [3]},
  {trait: NITROGEN_REQUIREMENT, comparitor: 'less than', values: [3]},
  {trait: TOUGHNESS, comparitor: 'between', values: [2, 4]},
  {trait: STEM_HEIGHT, comparitor: 'between', values: [2, 4]},
  {trait: SEEDS_ON_TOP, comparitor: 'equal to', values: [1]},
  {trait: SWEETNESS, comparitor: 'less than', values: [2]},
  {trait: STARCH, comparitor: 'less than', values: [2]},
  {trait: PROTEIN, comparitor: 'equal to', values: [0]},
  {trait: BITTERNESS, comparitor: 'less than', values: [3]},
  {trait: SOURNESS, comparitor: 'equal to', values: [0]},
  {trait: SPICINESS, comparitor: 'equal to', values: [0]},
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
  {trait: TEMP_TOLERANCE, comparitor: 'equal to', values: [2]},
  {trait: MOIS_TOLERANCE, comparitor: 'equal to', values: [2]},
  {trait: GROWTH_SPEED, comparitor: 'less than', values: [3]},
  {trait: NITROGEN_REQUIREMENT, comparitor: 'less than', values: [3]},
  {trait: TOUGHNESS, comparitor: 'between', values: [2, 4]},
  {trait: STEM_HEIGHT, comparitor: 'between', values: [2, 4]},
  {trait: SEEDS_ON_TOP, comparitor: 'equal to', values: [1]},
  {trait: SWEETNESS, comparitor: 'less than', values: [2]},
  {trait: STARCH, comparitor: 'less than', values: [2]},
  {trait: PROTEIN, comparitor: 'equal to', values: [0]},
  {trait: BITTERNESS, comparitor: 'less than', values: [3]},
  {trait: SOURNESS, comparitor: 'equal to', values: [0]},
  {trait: SPICINESS, comparitor: 'equal to', values: [0]},
  {trait: TOXICITY, comparitor: 'equal to', values: [0]}
], new Trait(
  (WILD_GRASS + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME],
  [-0.8, -0.7]
));

export const SUGAR_CANE = 'Sugar Cane';
export const sugar_cane = new Cultivar(SUGAR_CANE, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [0]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [0]},
  {trait: SWEETNESS, comparitor: 'greater than', values: [4]}
], new Trait(
  (SUGAR_CANE + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE, DISEASE_RESISTANCE],
  [0.125, 0.025, -0.05, -0.05]
));

export const BAMBOO = 'Bamboo';
export const bamboo = new Cultivar(BAMBOO, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [1]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: TOUGHNESS, comparitor: 'greater than', values: [4]}
], new Trait(
  (BAMBOO + ' Bonus'), 0, null,
  [STEM_THICKNESS, GROWING_TIME],
  [0.1, -0.15]
));

export const OATS = 'Oats';
export const oats = new Cultivar(OATS, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [1]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'equal to', values: [0]}
], new Trait(
  (OATS + ' Bonus'), 0, null,
  [MOIS_TOLERANCE, PEST_RESISTANCE, DISEASE_RESISTANCE],
  [0.5, 0.05, 0.05]
));

export const MILLET = 'Millet';
export const millet = new Cultivar(MILLET, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'between', values: [1, 2]}
], new Trait(
  (MILLET + ' Bonus'), 0, null,
  [MOIS_TOLERANCE, TEMP_TOLERANCE],
  [-0.5, 0.5]
));

export const SORGHUM = 'Sorghum';
export const sorghum = new Cultivar(SORGHUM, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [0]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'between', values: [3, 4]}
], new Trait(
  (SORGHUM + ' Bonus'), 0, null,
  [MOIS_TOLERANCE, TEMP_TOLERANCE, PLANT_QUALITY, GROWING_TIME,
    PEST_RESISTANCE, DISEASE_RESISTANCE],
  [-0.25, 0.25, 0.125, 0.025, -0.05, -0.05]
));

export const RYE = 'Rye';
export const rye = new Cultivar(RYE, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'equal to', values: [0]}
], new Trait(
  (RYE + ' Bonus'), 0, null,
  [NITROGEN_REQUIREMENT],
  [-0.5]
));

export const RICE = 'Rice';
export const rice = new Cultivar(RICE, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [1]},
  {trait: BRANCHING, comparitor: 'equal to', values: [0]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'between', values: [1, 2]}
], new Trait(
  (RICE + ' Bonus'), 0, null,
  [MOIS_TOLERANCE],
  [1]
));

export const WHEAT = 'Wheat';
export const wheat = new Cultivar(WHEAT, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [2]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'between', values: [1, 2]}
], new Trait(
  (WHEAT + ' Bonus'), 0, null,
  [SEED_QUANTITY, PEST_RESISTANCE, DISEASE_RESISTANCE],
  [0.15, -0.1, -0.1]
));

export const CORN = 'Corn';
export const corn = new Cultivar(CORN, [
  {trait: SEED_COVERING, comparitor: 'equal to', values: [0]},
  {trait: BRANCHING, comparitor: 'equal to', values: [1]},
  {trait: STEM_FOCUS, comparitor: 'equal to', values: [1]},
  {trait: SEED_SIZE, comparitor: 'greater than', values: [4]}
], new Trait(
  (CORN + ' Bonus'), 0, null,
  [PLANT_QUALITY, GROWING_TIME, NITROGEN_REQUIREMENT],
  [0.25, -0.1, 0.25]
));
