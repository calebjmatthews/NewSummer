import Cultivar from '../models/cultivar';

export const WILD_GRASS = 'Wild Grass';
export const wildGrass = new Cultivar('Wild Grass', [
  {stat: 'Seed Quality', comparitor: 'less than', values: [80.0]}
], null)

export const GRAIN = 'Grain';
export const grain = new Cultivar(GRAIN, null, null);
