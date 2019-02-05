import Cache from '../models/cache';
import Family from '../models/family';
import Stat from '../models/stat';

import {seedSize, sweetness, chemicalDefense} from './traits';
import {SEED_QUALITY, GROWING_TIME, PEST_RESISTANCE, DISEASE_RESISTANCE}
  from './stats';
import {wildGrass, grain} from './cultivars';

const traitCache = new Cache([seedSize, sweetness, chemicalDefense]);
const statCache = new Cache([
  new Stat(SEED_QUALITY, 100, [
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
    {comparitor: 'greater than', values: [350], adjective: 'Tough', bonus: 0}
  ]),
  new Stat(DISEASE_RESISTANCE, 100, [
    {comparitor: 'less than', values: [90], adjective: 'Susceptible',
      bonus: 0},
    {comparitor: 'greater than', values: [350], adjective: 'Resistant',
      bonus: 0}
  ])
])

export const POACEAE = 'Poaceae';
class Poaceae extends Family {
  constructor() {
    super(
      POACEAE,
      'Grasses',
      traitCache,
      statCache,
      [grain, wildGrass]
    );
  }
}

const poaceae = new Poaceae();

export const families = new Cache([
  poaceae
]);
