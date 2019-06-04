import Trait from '../models/trait';
import {SEED_QUANTITY, PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE,
  DISEASE_RESISTANCE, STEM_THICKNESS, STEM_HEIGHT, NITROGEN_REQUIREMENT,
  TEMP_TOLERANCE, MOIS_TOLERANCE} from './stats';

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
  [0.4, 0.3]
);

export const STEM_FOCUS = 'Stem Focus';
export const stemFocus = new Trait(
  STEM_FOCUS,
  1,
  true,
  [PLANT_QUALITY, SEED_QUANTITY, STEM_THICKNESS, PEST_RESISTANCE],
  [-0.5, -0.5, 0.75, 0.25]
);

export const SEED_SIZE = 'Seed Cluster Size';
export const seedSize = new Trait(
  SEED_SIZE,
  3,
  false,
  [SEED_QUANTITY, GROWING_TIME],
  [0.175, 0.1]
);

export const tempTolerance = new Trait(
  TEMP_TOLERANCE,
  3,
  false,
  [TEMP_TOLERANCE],
  [0.1]
);

export const moisTolerance = new Trait(
  MOIS_TOLERANCE,
  3,
  false,
  [MOIS_TOLERANCE],
  [0.1]
);

export const GROWTH_SPEED = 'Growth Speed';
export const growthSpeed = new Trait(
  GROWTH_SPEED,
  3,
  false,
  [GROWING_TIME, SEED_QUANTITY, NITROGEN_REQUIREMENT],
  [-0.2, -0.075, 0.125]
)

export const nitrogenRequirement = new Trait(
  NITROGEN_REQUIREMENT,
  3,
  false,
  [NITROGEN_REQUIREMENT, PLANT_QUALITY],
  [0.125, 0.175]
);

export const TOUGHNESS = 'Toughness';
export const toughness = new Trait(
  TOUGHNESS,
  3,
  false,
  [STEM_THICKNESS, PEST_RESISTANCE, DISEASE_RESISTANCE, GROWING_TIME],
  [0.2, 0.175, 0.1, 0.05]
);

export const stemHeight = new Trait(
  STEM_HEIGHT,
  3,
  false,
  [STEM_HEIGHT, GROWING_TIME],
  [0.3, 0.075]
);

export const SEEDS_ON_TOP = 'Seeds On Top';
export const seedsOnTop = new Trait(
  SEEDS_ON_TOP,
  1,
  true,
  [SEED_QUANTITY, GROWING_TIME, NITROGEN_REQUIREMENT],
  [0.5, 0.25, 0.4]
);

export const SWEETNESS = 'Sweetness';
export const sweetness = new Trait(
  SWEETNESS,
  3,
  false,
  [PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE, DISEASE_RESISTANCE],
  [0.125, 0.025, -0.05, -0.05]
);

export const STARCH = 'Starch';
export const starch = new Trait(
  STARCH,
  3,
  false,
  [PLANT_QUALITY, GROWING_TIME],
  [0.075, 0.025]
);

export const PROTEIN = 'Protein';
export const protein = new Trait(
  PROTEIN,
  3,
  false,
  [PLANT_QUALITY, NITROGEN_REQUIREMENT],
  [0.075, 0.05]
)

export const BITTERNESS = 'Bitterness';
export const bitterness = new Trait(
  BITTERNESS,
  3,
  false,
  [PEST_RESISTANCE, DISEASE_RESISTANCE, PLANT_QUALITY, GROWING_TIME],
  [0.15, 0.2, -0.1, 0.025]
);

export const SOURNESS = 'Sourness';
export const sourness = new Trait(
  SOURNESS,
  3,
  false,
  [PEST_RESISTANCE, DISEASE_RESISTANCE, PLANT_QUALITY, GROWING_TIME],
  [0.05, 0.075, -0.025, 0.025]
);

export const SPICINESS = 'Spiciness';
export const spiciness = new Trait(
  SPICINESS,
  3,
  false,
  [PEST_RESISTANCE, DISEASE_RESISTANCE, PLANT_QUALITY, GROWING_TIME],
  [0.05, 0.075, -0.025, 0.025]
);

export const TOXICITY = 'Toxicity';
export const toxicity = new Trait(
  TOXICITY,
  2,
  false,
  [PEST_RESISTANCE, DISEASE_RESISTANCE, PLANT_QUALITY, GROWING_TIME],
  [0.75, 1, -0.5, 0.1]
);
