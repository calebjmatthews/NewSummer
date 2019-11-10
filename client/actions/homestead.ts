import Seed from '../models/seed/seed';
import Homestead from '../models/homestead';
import RecordBook from '../models/record_book';
import { recordSeed } from './record_book';

export const ADD_SEED = 'ADD_SEED';
export function addAndRecordSeed(seed: Seed, homestead: Homestead,
  recordBook: RecordBook) {
  return function(dispatch: any) {
    dispatch(recordSeed(seed, recordBook));
    dispatch({
      type: ADD_SEED,
      seed: seed,
      homestead: homestead
    });
  }
}

export const GAIN_DOLLARS = 'GAIN_DOLLARS';
export function gainDollars(dollars: number, homestead: Homestead) {
  return {
    type: GAIN_DOLLARS,
    dollars: dollars,
    homestead: homestead
  }
}