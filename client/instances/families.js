import Cache from '../models/cache';
import Family from '../models/family';
import Stat from '../models/stat';
import Seed from '../models/seed';

import {seedCovering, branching, stemFocus, seedSize, sweetness,
  bitterness} from './traits';
import {SEED_QUANTITY, PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE,
  DISEASE_RESISTANCE, NITROGEN_REQUIREMENT, STEM_THICKNESS}
  from './stats';
import {grain, cane, wildCane, wildGrass} from './cultivars';

const traitCache = new Cache([
  seedCovering, branching, stemFocus, seedSize, sweetness, bitterness
]);
const statCache = new Cache([
  new Stat(SEED_QUANTITY, 100, [
    {comparitor: 'less than', values: [90], adjective: 'Thin', bonus: 0},
    {comparitor: 'greater than', values: [180], adjective: 'Plentiful',
      bonus: 0},
    {comparitor: 'greater than', values: [220], adjective: 'Abundant',
      bonus: 0.5}
  ]),
  new Stat(PLANT_QUALITY, 100, [
    {comparitor: 'less than', values: [90], adjective: 'Shabby', bonus: 0},
    {comparitor: 'greater than', values: [180], adjective: 'Appetizing',
      bonus: 0},
    {comparitor: 'greater than', values: [220], adjective: 'Exceptional',
      bonus: 0.5}
  ]),
  new Stat(GROWING_TIME, 300, [
    {comparitor: 'less than', values: [250], adjective: 'Fast-Growing',
      bonus: 0},
    {comparitor: 'greater than', values: [350], adjective: 'Slow-Growing',
      bonus: 0}
  ]),
  new Stat(PEST_RESISTANCE, 100, [
    {comparitor: 'less than', values: [90], adjective: 'Vulnerable', bonus: 0},
    {comparitor: 'greater than', values: [120], adjective: 'Hearty', bonus: 0}
  ]),
  new Stat(DISEASE_RESISTANCE, 100, [
    {comparitor: 'less than', values: [90], adjective: 'Susceptible',
      bonus: 0},
    {comparitor: 'greater than', values: [120], adjective: 'Resistant',
      bonus: 0}
  ]),
  new Stat(NITROGEN_REQUIREMENT, 100, [
    {comparitor: 'less than', values: [90], adjective: 'Feisty',
      bonus: 0},
    {comparitor: 'greater than', values: [120], adjective: 'Difficult',
      bonus: 0}
  ]),
  new Stat(STEM_THICKNESS, 100, [])
])

export const POACEAE = 'Poaceae';
class Poaceae extends Family {
  constructor() {
    super(
      POACEAE,
      'Grasses',
      traitCache,
      statCache,
      new Cache([grain, cane, wildCane, wildGrass])
    );
  }
}

const poaceae = new Poaceae();

export const families = new Cache([
  poaceae
]);
