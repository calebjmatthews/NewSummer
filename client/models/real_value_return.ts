import MultiplierDescriptions from './multiplier_description_set';

export default class RealValueReturn {
  baseValue: number;
  value: number;
  descriptions: MultiplierDescriptions;
  comment: string;

  constructor(realValueReturn: RealValueReturn) {
    Object.assign(this, realValueReturn);
  }
}
