export default class TraitTotal {
  constructor(traitName, numerator) {
    this.traitName = traitName;
    this.numerator = numerator;
    this.denominator = 2;
  }
  addGenotypeCount(genotypeCount) {
    this.numerator += genotypeCount;
    this.denominator += 2;
  }
}
