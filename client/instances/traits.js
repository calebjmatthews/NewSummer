import Trait from '../models/trait';
import {SEED_QUANTITY, PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE,
  DISEASE_RESISTANCE, NITROGEN_REQUIREMENT, STEM_THICKNESS}
  from './stats';

// 2 = hull, 1 = floret, 0 = husk; husk requires 'aaaa' genotype
export const SEED_COVERING = 'Seed Covering';
export const seedCovering = new Trait(
  SEED_COVERING,
  2,
  true,
  [PLANT_QUALITY, NITROGEN_REQUIREMENT],
  [-0.1, -0.1]
);

export const BRANCHING = 'Branching';
export const branching = new Trait(
  BRANCHING,
  1,
  true,
  [SEED_QUANTITY, GROWING_TIME],
  [0.4, 0.1]
)

export const STEM_FOCUS = 'Stem Focus';
export const stemFocus = new Trait(
  STEM_FOCUS,
  1,
  true,
  [PLANT_QUALITY, SEED_QUANTITY, STEM_THICKNESS, PEST_RESISTANCE],
  [-1, -1, 2, 0.4]
)

export const SEED_SIZE = 'Seed Cluster Size';
export const seedSize = new Trait(
  SEED_SIZE,
  3,
  false,
  [SEED_QUANTITY, GROWING_TIME],
  [0.2, 0.05]
);

export const SWEETNESS = 'Sweetness';
export const sweetness = new Trait(
  SWEETNESS,
  2,
  false,
  [PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE],
  [0.1, 0.01, -0.025]
)

export const CHEMICAL_DEFENSE = 'Chemical Defense';
export const chemicalDefense = new Trait(
  CHEMICAL_DEFENSE,
  2,
  false,
  [PEST_RESISTANCE, DISEASE_RESISTANCE, PLANT_QUALITY, GROWING_TIME],
  [0.2, 0.1, -0.01, 0.01]
)
