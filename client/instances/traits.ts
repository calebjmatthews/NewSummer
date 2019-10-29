import Trait from '../models/trait';
import { TraitNames } from '../models/enums/trait_names';
import { StatNames} from '../models/enums/stat_names';

// 2 = hull, 1 = floret, 0 = husk; husk requires 'aaaa' genotype
export const SEED_COVERING = 'Seed Covering';
export const seedCovering = new Trait({
  name: TraitNames.SEED_COVERING,
  loci: 2,
  completeDominance: true,
  statNames: [StatNames.PLANT_QUALITY, StatNames.NITROGEN_REQUIREMENT],
  statModifiers: [-0.1, -0.1]
});

export const BRANCHING = 'Branching';
export const branching = new Trait({
  name: TraitNames.BRANCHING,
  loci: 1,
  completeDominance: true,
  statNames: [StatNames.SEED_QUANTITY, StatNames.GROWING_TIME],
  statModifiers: [0.4, 0.45]
});

export const STEM_FOCUS = 'Stem Focus';
export const stemFocus = new Trait({
  name: TraitNames.STEM_FOCUS,
  loci: 1,
  completeDominance: true,
  statNames: [StatNames.PLANT_QUALITY, StatNames.SEED_QUANTITY,
    StatNames.STEM_THICKNESS, StatNames.PEST_RESISTANCE],
  statModifiers: [-0.5, -0.5, 0.75, 0.25]
});

export const SEED_SIZE = 'Seed Cluster Size';
export const seedSize = new Trait({
  name: TraitNames.SEED_SIZE,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.SEED_QUANTITY, StatNames.GROWING_TIME],
  statModifiers: [0.175, 0.15]
});

export const tempTolerance = new Trait({
  name: TraitNames.TEMP_TOLERANCE,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.TEMP_TOLERANCE],
  statModifiers: [0.1]
});

export const moisTolerance = new Trait({
  name: TraitNames.MOIS_TOLERANCE,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.MOIS_TOLERANCE],
  statModifiers: [0.1]
});

export const GROWTH_SPEED = 'Growth Speed';
export const growthSpeed = new Trait({
  name: TraitNames.GROWTH_SPEED,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.GROWING_TIME, StatNames.SEED_QUANTITY,
    StatNames.NITROGEN_REQUIREMENT],
  statModifiers: [-0.3, -0.075, 0.125]
});

export const nitrogenRequirement = new Trait({
  name: TraitNames.NITROGEN_REQ,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.NITROGEN_REQUIREMENT, StatNames.PLANT_QUALITY],
  statModifiers: [0.125, 0.175]
});

export const TOUGHNESS = 'Toughness';
export const toughness = new Trait({
  name: TraitNames.TOUGHNESS,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.STEM_THICKNESS, StatNames.PEST_RESISTANCE,
    StatNames.DISEASE_RESISTANCE, StatNames.GROWING_TIME],
  statModifiers: [0.2, 0.175, 0.1, 0.075]
});

export const stemHeight = new Trait({
  name: TraitNames.STEM_HEIGHT,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.STEM_HEIGHT, StatNames.GROWING_TIME],
  statModifiers: [0.3, 0.125]
});

export const SEEDS_ON_TOP = 'Seeds On Top';
export const seedsOnTop = new Trait({
  name: TraitNames.SEEDS_ON_TOP,
  loci: 1,
  completeDominance: true,
  statNames: [StatNames.SEED_QUANTITY, StatNames.GROWING_TIME,
    StatNames.NITROGEN_REQUIREMENT],
  statModifiers: [0.5, 0.35, 0.4]
});

export const SWEETNESS = 'Sweetness';
export const sweetness = new Trait({
  name: TraitNames.SWEETNESS,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.PLANT_QUALITY, StatNames.GROWING_TIME,
    StatNames.PEST_RESISTANCE, StatNames.DISEASE_RESISTANCE],
  statModifiers: [0.125, 0.04, -0.05, -0.05]
});

export const STARCH = 'Starch';
export const starch = new Trait({
  name: TraitNames.STARCH,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.PLANT_QUALITY, StatNames.GROWING_TIME],
  statModifiers: [0.075, 0.04]
});

export const PROTEIN = 'Protein';
export const protein = new Trait({
  name: TraitNames.PROTEIN,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.PLANT_QUALITY, StatNames.NITROGEN_REQUIREMENT],
  statModifiers: [0.075, 0.05]
});

export const BITTERNESS = 'Bitterness';
export const bitterness = new Trait({
  name: TraitNames.BITTERNESS,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.PEST_RESISTANCE, StatNames.DISEASE_RESISTANCE,
    StatNames.PLANT_QUALITY, StatNames.GROWING_TIME],
  statModifiers: [0.15, 0.2, -0.1, 0.04]
});

export const SOURNESS = 'Sourness';
export const sourness = new Trait({
  name: TraitNames.SOURNESS,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.PEST_RESISTANCE, StatNames.DISEASE_RESISTANCE,
    StatNames.PLANT_QUALITY, StatNames.GROWING_TIME],
  statModifiers: [0.05, 0.075, -0.025, 0.04]
});

export const SPICINESS = 'Spiciness';
export const spiciness = new Trait({
  name: TraitNames.SPICINESS,
  loci: 3,
  completeDominance: false,
  statNames: [StatNames.PEST_RESISTANCE, StatNames.DISEASE_RESISTANCE,
    StatNames.PLANT_QUALITY, StatNames.GROWING_TIME],
  statModifiers: [0.05, 0.075, -0.025, 0.04]
});

export const TOXICITY = 'Toxicity';
export const toxicity = new Trait({
  name: TraitNames.TOXICITY,
  loci: 2,
  completeDominance: false,
  statNames: [StatNames.PEST_RESISTANCE, StatNames.DISEASE_RESISTANCE,
    StatNames.PLANT_QUALITY, StatNames.GROWING_TIME],
  statModifiers: [0.75, 1, -0.5, 0.15]
});
