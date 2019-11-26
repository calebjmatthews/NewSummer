export default class HarvestStack implements HarvestStackInterface {
  seedId: number;
  quality: string;
  quantity: number;
  totalValue: number;

  constructor(harvestStack: HarvestStackInterface) {
    Object.assign(this, harvestStack);
  }

  combineWith(harvestStack: HarvestStack): HarvestStack {
    return new HarvestStack({
      seedId: this.seedId,
      quality: this.quality,
      quantity: (this.quantity + harvestStack.quantity),
      totalValue: (this.totalValue + harvestStack.totalValue)
    });
  }
}

interface HarvestStackInterface {
  seedId: number;
  quantity: number;
  quality: string;
  totalValue: number;
}
