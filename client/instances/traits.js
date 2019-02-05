import Trait from '../models/trait';
import {SEED_QUALITY, GROWING_TIME, PEST_RESISTANCE, DISEASE_RESISTANCE}
  from './stats';

export const SEED_SIZE = 'Seed Size';
export const seedSize = new Trait(
  SEED_SIZE,
  3,
  [SEED_QUALITY, GROWING_TIME],
  [0.2, 0.05]
);

export const SWEETNESS = 'Sweetness';
export const sweetness = new Trait(
  SWEETNESS,
  2,
  [SEED_QUALITY, GROWING_TIME, PEST_RESISTANCE],
  [0.1, 0.01, -0.025]
)

export const CHEMICAL_DEFENSE = 'Chemical Defense';
export const chemicalDefense = new Trait(
  CHEMICAL_DEFENSE,
  2,
  [PEST_RESISTANCE, DISEASE_RESISTANCE, SEED_QUALITY, GROWING_TIME],
  [0.2, 0.1, -0.01, 0.01]
)
