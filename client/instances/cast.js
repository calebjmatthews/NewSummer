import Cast from '../models/cast';
import {seedTrader} from './travelers/seed_trader';

let cast = new Cast([
  seedTrader
]);

export {cast};
