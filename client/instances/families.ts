import Family from '../models/seed/family';
import Stat from '../models/seed/stat';
import StatDefinition from '../models/seed/stat_definition';
import Seed from '../models/seed/seed';
import Trait from '../models/seed/trait';
import Cultivar from '../models/seed/cultivar';
import { TraitNames } from '../models/enums/trait_names';
import { StatNames} from '../models/enums/stat_names';
import { CultivarNames } from '../models/enums/cultivar_names';
import { FamilyNames } from '../models/enums/family_names';

import { grain, cane, wildGrass, wildCane, sugarCane, bamboo, oats, millet, sorghum,
  rye, rice, wheat, corn } from './cultivars';
import { seedCovering, seedScattering, branching, stemFocus, seedSize, tempTolerance,
  moisTolerance, growthSpeed, nitrogenRequirement, toughness, stemHeight,
  seedsOnTop, sweetness, starch, protein, bitterness, sourness, spiciness,
  toxicity } from './traits';

/* seedCovering, branching, stemFocus, seedSize, tempTolerance,
  moisTolerance, growthSpeed, nitrogenRequirement, toughness, stemHeight,
  seedsOnTop, sweetness, starch, protein, bitterness, sourness, spiciness,
  toxicity */

let traitsMap: Map<string, Trait> = new Map();
traitsMap.set(TraitNames.SEED_COVERING, seedCovering);
traitsMap.set(TraitNames.SEED_SCATTERING, seedScattering);
traitsMap.set(TraitNames.BRANCHING, branching);
traitsMap.set(TraitNames.STEM_FOCUS, stemFocus);
traitsMap.set(TraitNames.SEED_SIZE, seedSize);
traitsMap.set(TraitNames.TEMP_TOLERANCE, tempTolerance);
traitsMap.set(TraitNames.MOIS_TOLERANCE, moisTolerance);
traitsMap.set(TraitNames.GROWTH_SPEED, growthSpeed);
traitsMap.set(TraitNames.NITROGEN_REQ, nitrogenRequirement);
traitsMap.set(TraitNames.TOUGHNESS, toughness);
traitsMap.set(TraitNames.STEM_HEIGHT, stemHeight);
traitsMap.set(TraitNames.SEEDS_ON_TOP, seedsOnTop);
traitsMap.set(TraitNames.SWEETNESS, sweetness);
traitsMap.set(TraitNames.STARCH, starch);
traitsMap.set(TraitNames.PROTEIN, protein);
traitsMap.set(TraitNames.BITTERNESS, bitterness);
traitsMap.set(TraitNames.SOURNESS, sourness);
traitsMap.set(TraitNames.SPICINESS, spiciness);
traitsMap.set(TraitNames.TOXICITY, toxicity);

const stats = [
  new Stat({
    name: StatNames.SEED_QUANTITY, defaultValue: 100, definitions: [
    {comparitor: 'less than', values: [90], adjective: 'Thin', bonus: 0,
      description: 'Seeds are scarce', iconType: 'fontawesome',
      icon: 'dot-circle', iconStyle: 'negative'},
    {comparitor: 'greater than', values: [180], adjective: 'Plentiful',
      bonus: 0, description: 'Seeds are somewhat plentiful',
      iconType: 'fontawesome', icon: 'dot-circle', iconStyle: 'positive'},
    {comparitor: 'greater than', values: [360], adjective: 'Abundant',
      bonus: 2, description: 'Seeds are abundant',
      iconType: 'fontawesome', icon: 'dot-circle', iconStyle: 'positive'}
  ]}),
  new Stat({name: StatNames.PLANT_QUALITY, defaultValue: 1, definitions: []}),
  new Stat({name: StatNames.GROWING_TIME, defaultValue: 60, definitions: [
    {comparitor: 'less than', values: [250], adjective: 'Fast-Growing',
      bonus: 0},
    {comparitor: 'greater than', values: [1200], adjective: 'Slow-Growing',
      bonus: 0}
  ]}),
  new Stat({name: StatNames.PEST_RESISTANCE, defaultValue: 100, definitions: [
    {comparitor: 'less than', values: [120], adjective: 'Vulnerable',
      bonus: 0, description: 'Herbavores find it delicious',
      iconType: 'fontawesome', icon: 'bug', iconStyle: 'negative'},
    {comparitor: 'greater than', values: [350], adjective: 'Hearty',
      bonus: 0, description: 'Herbavores find it intimidating',
      iconType: 'fontawesome', icon: 'bug', iconStyle: 'positive'}
  ]}),
  new Stat({name: StatNames.DISEASE_RESISTANCE, defaultValue: 100, definitions: [
    {comparitor: 'less than', values: [120], adjective: 'Susceptible',
      bonus: 0, description: 'Easily sick',
      iconType: 'fontawesome', icon: 'splotch', iconStyle: 'negative'},
    {comparitor: 'greater than', values: [350], adjective: 'Resistant',
      bonus: 0, description: 'Rarely sick',
      iconType: 'fontawesome', icon: 'splotch', iconStyle: 'positive'}
  ]}),
  new Stat({name: StatNames.NITROGEN_REQUIREMENT, defaultValue: 100, definitions: [
    {comparitor: 'less than', values: [90], adjective: 'Feisty',
      bonus: 0, description: 'Grows well in poor soils',
      iconType: 'fontawesome', icon: 'globe-europe', iconStyle: 'positive'},
    {comparitor: 'greater than', values: [200], adjective: 'Difficult',
      bonus: 0, description: 'Requires rich soil to grow well',
      iconType: 'fontawesome', icon: 'globe-europe', iconStyle: 'negative'}
  ]}),
  new Stat({name: StatNames.STEM_HEIGHT, defaultValue: 100, definitions: [
    {comparitor: 'less than', values: [145], adjective: 'Short',
      bonus: 0},
    {comparitor: 'greater than', values: [300], adjective: 'Tall',
      bonus: 0}
  ]}),
  new Stat({name: StatNames.TEMP_TOLERANCE, defaultValue: 100, definitions: [
    {comparitor: 'less than', values: [111], adjective: 'Winter',
      bonus: 1, description: 'Grows well in the cold',
      iconType: 'fontawesome', icon: 'snowflake', iconStyle: 'neutral'},
    {comparitor: 'between', values: [121, 133], adjective: 'Spring',
      bonus: 1, description: 'Needs mild temperatures to grow well',
      iconType: 'fontawesome', icon: 'cloud-sun', iconStyle: 'neutral'},
    {comparitor: 'greater than', values: [145], adjective: 'Summer',
      bonus: 1, description: 'Grows well in the heat',
      iconType: 'fontawesome', icon: 'sun', iconStyle: 'neutral'}
  ]}),
  new Stat({name: StatNames.MOIS_TOLERANCE, defaultValue: 100, definitions: [
    {comparitor: 'less than', values: [111], adjective: 'Desert',
      bonus: 1, description: 'Grows well in dry conditions',
      iconType: 'fontawesome', icon: 'wind', iconStyle: 'neutral'},
    {comparitor: 'between', values: [121, 133], adjective: 'Temperate',
      bonus: 1, description: 'Needs moderate moisture to grow well',
      iconType: 'fontawesome', icon: 'fill-drip', iconStyle: 'neutral'},
    {comparitor: 'greater than', values: [145], adjective: 'Wetland',
      bonus: 1, description: 'Grows well in wet conditions',
      iconType: 'fontawesome', icon: 'tint', iconStyle: 'neutral'}
  ]}),
  new Stat({name: StatNames.STEM_THICKNESS, defaultValue: 100, definitions: []})
];

let cultivars = [grain, cane, wildGrass, wildCane, sugarCane, bamboo, oats, millet,
  sorghum, rye, rice, wheat, corn];

class Poaceae extends Family {
  constructor() {
    super({
      nameScientific: FamilyNames.POACEAE,
      nameCommon: 'Grasses',
      traitsMap: traitsMap,
      stats: stats,
      cultivars: cultivars
    });
  }
}

const poaceae = new Poaceae();

let familyMap: Map<string, Family> = new Map();
familyMap.set(FamilyNames.POACEAE, poaceae);

export let families = familyMap;
