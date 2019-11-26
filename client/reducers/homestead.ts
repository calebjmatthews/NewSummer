import {
  ADD_SEED, SET_DOLLARS, SET_BREEDING, SET_HOMESTEAD, SET_BREEDING_AGE, SET_INTER_SEED,
  REMOVE_SEED, SET_HARVEST_STACK_MAP
} from '../actions/homestead';
import Homestead from '../models/homestead';

let startingHomestead: Homestead = new Homestead();

export default function
  (homestead: Homestead = startingHomestead,
    action = null) {
	switch(action.type) {
    case ADD_SEED:
      return Object.assign(new Homestead(), homestead, {
        seedIds: [...homestead.seedIds, action.seed.id]
      });
    case REMOVE_SEED:
      return Object.assign(new Homestead(), homestead, {
        seedIds: homestead.seedIds.filter((seedId) => {
          if (seedId == action.seed.id) { return false; }
          else { return true; }
        })
      });
    case SET_DOLLARS:
      return Object.assign(new Homestead(), homestead, {
        dollars: action.dollars
      });
    case SET_BREEDING:
      return Object.assign(new Homestead(), homestead, {
        seedsBred: action.seedsBred,
        breedingTimeRemaining: action.breedingTimeRemaining,
        breedingAgeLabel: action.breedingAgeLabel
      });
    case SET_BREEDING_AGE:
      return Object.assign(new Homestead(), homestead, {
        breedingTimeRemaining: action.breedingTimeRemaining,
        breedingAgeLabel: action.breedingAgeLabel
      });
    case SET_INTER_SEED:
      return Object.assign(new Homestead(), homestead, {
        intermediateSeed: action.intermediateSeed
      });
    case SET_HARVEST_STACK_MAP:
      return Object.assign(new Homestead(), homestead, {
        harvestStackMap: action.harvestStackMap
      })
    case SET_HOMESTEAD:
      return new Homestead(action.homestead);
		default:
			return homestead;
	}
};
