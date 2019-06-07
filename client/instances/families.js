import Cache from '../models/cache';
import Family from '../models/family';
import Stat from '../models/stat';
import Seed from '../models/seed';

import {seedCovering, branching, stemFocus, seedSize, tempTolerance,
  moisTolerance, growthSpeed, nitrogenRequirement, toughness, stemHeight,
  seedsOnTop, sweetness, starch, protein, bitterness, sourness, spiciness,
  toxicity} from './traits';
import {SEED_QUANTITY, PLANT_QUALITY, GROWING_TIME, PEST_RESISTANCE,
  DISEASE_RESISTANCE, NITROGEN_REQUIREMENT, STEM_THICKNESS, STEM_HEIGHT,
  TEMP_TOLERANCE, MOIS_TOLERANCE} from './stats';
import {grain, cane, wildCane, wildGrass} from './cultivars';

const traitCache = new Cache([
  seedCovering, branching, stemFocus, seedSize, tempTolerance,
  moisTolerance, growthSpeed, nitrogenRequirement, toughness, stemHeight,
  seedsOnTop, sweetness, starch, protein, bitterness, sourness, spiciness,
  toxicity
]);
const statCache = new Cache([
  new Stat(SEED_QUANTITY, 100, [
    {comparitor: 'less than', values: [90], adjective: 'Thin', bonus: 0,
      description: 'Seeds are scarce', iconType: 'fontawesome',
      icon: 'dot-circle', iconStyle: 'negative'},
    {comparitor: 'greater than', values: [180], adjective: 'Plentiful',
      bonus: 0, description: 'Seeds are somewhat plentiful',
      iconType: 'fontawesome', icon: 'dot-circle', iconStyle: 'positive'},
    {comparitor: 'greater than', values: [360], adjective: 'Abundant',
      bonus: 2, description: 'Seeds are abundant',
      iconType: 'fontawesome', icon: 'dot-circle', iconStyle: 'positive'}
  ]),
  new Stat(PLANT_QUALITY, 100, []),
  new Stat(GROWING_TIME, 300, [
    {comparitor: 'less than', values: [250], adjective: 'Fast-Growing',
      bonus: 0},
    {comparitor: 'greater than', values: [1200], adjective: 'Slow-Growing',
      bonus: 0}
  ]),
  new Stat(PEST_RESISTANCE, 100, [
    {comparitor: 'less than', values: [120], adjective: 'Vulnerable',
      bonus: 0, description: 'Herbavores find it delicious',
      iconType: 'fontawesome', icon: 'bug', iconStyle: 'negative'},
    {comparitor: 'greater than', values: [350], adjective: 'Hearty',
      bonus: 0, description: 'Herbavores find it intimidating',
      iconType: 'fontawesome', icon: 'bug', iconStyle: 'positive'}
  ]),
  new Stat(DISEASE_RESISTANCE, 100, [
    {comparitor: 'less than', values: [120], adjective: 'Susceptible',
      bonus: 0, description: 'Easily sick',
      iconType: 'fontawesome', icon: 'splotch', iconStyle: 'negative'},
    {comparitor: 'greater than', values: [350], adjective: 'Resistant',
      bonus: 0, description: 'Rarely sick',
      iconType: 'fontawesome', icon: 'splotch', iconStyle: 'positive'}
  ]),
  new Stat(NITROGEN_REQUIREMENT, 100, [
    {comparitor: 'less than', values: [90], adjective: 'Feisty',
      bonus: 0, description: 'Grows well in poor soils',
      iconType: 'fontawesome', icon: 'globe-europe', iconStyle: 'positive'},
    {comparitor: 'greater than', values: [200], adjective: 'Difficult',
      bonus: 0, description: 'Requires rich soil to grow well',
      iconType: 'fontawesome', icon: 'globe-europe', iconStyle: 'negative'}
  ]),
  new Stat(STEM_HEIGHT, 100, [
    {comparitor: 'less than', values: [145], adjective: 'Short',
      bonus: 0},
    {comparitor: 'greater than', values: [300], adjective: 'Tall',
      bonus: 0}
  ]),
  new Stat(TEMP_TOLERANCE, 100, [
    {comparitor: 'less than', values: [125], adjective: 'Winter',
      bonus: 1, description: 'Grows well in the cold',
      iconType: 'fontawesome', icon: 'snowflake', iconStyle: 'neutral'},
    {comparitor: 'greater than', values: [142], adjective: 'Summer',
      bonus: 1, description: 'Grows well in the heat',
      iconType: 'fontawesome', icon: 'sun', iconStyle: 'neutral'}
  ]),
  new Stat(MOIS_TOLERANCE, 100, [
    {comparitor: 'less than', values: [125], adjective: 'Desert',
      bonus: 1, description: 'Grows well in dry conditions',
      iconType: 'fontawesome', icon: 'wind', iconStyle: 'neutral'},
    {comparitor: 'greater than', values: [142], adjective: 'Wetland',
      bonus: 1, description: 'Grows well in wet conditions',
      iconType: 'fontawesome', icon: 'tint', iconStyle: 'neutral'}
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
