import MultiplierDescriptions from './multiplier_description_set';
import HarvestStack from './harvest_stack';

export default class RealValueReturn {
  baseValue: number;
  value: number;
  harvestStack: HarvestStack;
  descriptions: MultiplierDescriptions;
  comment: string;

  constructor(realValueReturn: RealValueReturn) {
    Object.assign(this, realValueReturn);
  }
}
