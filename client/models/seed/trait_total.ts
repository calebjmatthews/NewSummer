export default class TraitTotal implements TraitTotalInterface {
  traitName: string;
  numerator: number;
  denominator: number;

  constructor(trait: TraitTotalInterface) {
    Object.assign(this, trait);

    this.denominator = 2;
  }
  addGenotypeCount(genotypeCount: number) {
    this.numerator += genotypeCount;
    this.denominator += 2;
  }
}

interface TraitTotalInterface {
  traitName: string;
  numerator: number;
  denominator?: number;
}
