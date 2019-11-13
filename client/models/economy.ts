export default class Economy implements EconomyInterface {
  intermediateSpend: number;

  constructor(economy: EconomyInterface) {
    Object.assign(this, economy);
  }
}

interface EconomyInterface {
  intermediateSpend: number;
}
